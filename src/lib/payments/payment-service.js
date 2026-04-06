import crypto from "crypto";

import { assertValidTransition } from "@/lib/payments/payment-state-machine";
import { getPaymentRepository } from "@/lib/payments/payment-repository";
import { getIciciConfig } from "@/lib/payments/icici/config";
import { IciciClient } from "@/lib/payments/icici/client";
import { buildInitiateHashFields, buildInboundHashFields, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
import { buildRedirectUrl, mapStatusToState, sanitizeForLogs } from "@/lib/payments/icici/mapper";
import { normalizeKeyValues, validateInitiatePaymentInput } from "@/lib/payments/icici/types";

export class PaymentService {
  constructor() {
    this.repository = getPaymentRepository();
    this.config = getIciciConfig();
    this.client = new IciciClient();
    this.hashAdapter = new HmacSha256HashAdapter(this.config.merchantKey);
  }

  async initiatePayment(input) {
    const trusted = validateInitiatePaymentInput(input);
    const merchantTxnNo = generateMerchantTxnNo(trusted.orderId);

    const attempt = await this.repository.createAttempt({
      id: crypto.randomUUID(),
      orderId: trusted.orderId,
      registrationId: trusted.registrationId,
      planId: trusted.planId,
      merchantTxnNo,
      amountPaise: trusted.amountPaise,
      customerName: trusted.customerName,
      customerEmail: trusted.customerEmail,
      customerMobile: trusted.customerMobile,
      metadata: trusted.metadata,
      state: "CREATED",
    });

    await this.transition(attempt, "INITIATED", "attempt.initiated", trusted);

    const amount = formatPaise(trusted.amountPaise);
    const reqBody = {
      merchantId: this.config.merchantId,
      aggregatorId: this.config.aggregatorId,
      merchantTxnNo,
      amount,
      currencyCode: "356",
      payType: "0",
      customerEmailID: trusted.customerEmail,
      transactionType: "SALE",
      returnURL: this.config.returnUrl,
      txnDate: formatTxnDate(new Date()),
      customerMobileNo: trusted.customerMobile,
      customerName: trusted.customerName,
      addlParam1: trusted.registrationId,
      addlParam2: trusted.planId,
      secureHash: "",
    };
    reqBody.secureHash = this.hashAdapter.sign(buildInitiateHashFields(reqBody));

    const response = await this.client.initiateSale(reqBody);
    await this.repository.appendAuditLog(merchantTxnNo, "gateway.initiate.response", sanitizeForLogs(response));

    if (!["0", "00", "SUCCESS", "R1000"].includes(String(response.responseCode || "").trim().toUpperCase())) {
      await this.repository.updateAttempt(merchantTxnNo, {
        state: "FAILED",
        gatewayResponseCode: response.responseCode,
        gatewayResponseMessage: response.responseMessage,
        rawInitiateRequest: sanitizeForLogs(reqBody),
        rawInitiateResponse: sanitizeForLogs(response),
      });
      throw new Error(`Gateway initiate failed: ${response.responseCode}${response.responseMessage ? ` (${response.responseMessage})` : ""}`);
    }

    if (!response.redirectURI || !response.tranCtx) throw new Error("Gateway initiate succeeded but redirectURI/tranCtx missing");

    const redirectUrl = buildRedirectUrl({ redirectURI: response.redirectURI, tranCtx: response.tranCtx });
    const updated = await this.repository.updateAttempt(merchantTxnNo, {
      state: "REDIRECTED",
      redirectUrl,
      rawInitiateRequest: sanitizeForLogs(reqBody),
      rawInitiateResponse: sanitizeForLogs(response),
      gatewayResponseCode: response.responseCode,
      gatewayResponseMessage: response.responseMessage,
    });

    return { merchantTxnNo: updated.merchantTxnNo, redirectUrl, state: updated.state };
  }

  async processCallback(rawPayload) {
    const payload = normalizeKeyValues(rawPayload);
    verifyInboundHash(this.hashAdapter, payload);

    const attempt = await this.requireAttempt(payload.merchantTxnNo);
    const nextState = mapStatusToState({ responseCode: payload.responseCode, status: payload.status, responseMessage: payload.responseMessage });

    return this.transition(attempt, nextState, "callback.received", sanitizeForLogs(payload), {
      rawCallbackPayload: sanitizeForLogs(payload),
      gatewayTxnRef: payload.bankTxnNo,
      gatewayResponseCode: payload.responseCode,
      gatewayResponseMessage: payload.responseMessage,
    });
  }

  async processAdvice(rawPayload) {
    const payload = normalizeKeyValues(rawPayload);
    verifyInboundHash(this.hashAdapter, payload);

    const attempt = await this.requireAttempt(payload.merchantTxnNo);
    const nextState = mapStatusToState({ responseCode: payload.responseCode, status: payload.status, responseMessage: payload.responseMessage });

    return this.transition(attempt, nextState, "advice.received", sanitizeForLogs(payload), {
      rawAdvicePayload: sanitizeForLogs(payload),
      gatewayTxnRef: payload.bankTxnNo,
      gatewayResponseCode: payload.responseCode,
      gatewayResponseMessage: payload.responseMessage,
    });
  }

  async reconcilePending(limit = 50) {
    const pending = await this.repository.findPendingForReconciliation(limit);
    const results = [];

    for (const item of pending) {
      await this.transition(item, "RECONCILING", "reconcile.started", {});
      const secureHash = this.hashAdapter.sign([this.config.merchantId, item.merchantTxnNo]);
      const status = await this.client.transactionStatus({ merchantId: this.config.merchantId, merchantTxnNo: item.merchantTxnNo, secureHash });
      const nextState = mapStatusToState(status);
      const updated = await this.transition(item, nextState, "reconcile.updated", sanitizeForLogs(status), {
        reconciledAt: new Date().toISOString(),
        gatewayTxnRef: status.bankTxnNo,
        gatewayResponseCode: status.responseCode,
        gatewayResponseMessage: status.responseMessage,
      });
      results.push({ merchantTxnNo: updated.merchantTxnNo, state: updated.state });
    }

    return results;
  }

  async getStatus(merchantTxnNo) {
    return this.repository.findByMerchantTxnNo(merchantTxnNo);
  }

  async requireAttempt(merchantTxnNo) {
    const attempt = await this.repository.findByMerchantTxnNo(merchantTxnNo);
    if (!attempt) throw new Error(`Unknown merchantTxnNo: ${merchantTxnNo}`);
    return attempt;
  }

  async transition(current, nextState, event, eventPayload, update = {}) {
    assertValidTransition(current.state, nextState);
    const updated = await this.repository.updateAttempt(current.merchantTxnNo, { ...update, state: nextState });
    await this.repository.appendAuditLog(current.merchantTxnNo, event, eventPayload);
    return updated;
  }
}

export function generateMerchantTxnNo(orderId) {
  const prefix = String(orderId || "ORD").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10).toUpperCase() || "ORD";
  const random = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `${prefix}${Date.now().toString().slice(-8)}${random}`.slice(0, 30);
}

function formatPaise(amountPaise) {
  return (amountPaise / 100).toFixed(2);
}

function formatTxnDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function verifyInboundHash(hashAdapter, payload) {
  const fields = buildInboundHashFields(payload);
  if (!hashAdapter.verify(fields, payload.secureHash)) throw new Error("Inbound secure hash mismatch");
}
