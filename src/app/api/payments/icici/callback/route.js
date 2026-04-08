import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { buildInboundHashCandidates, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
import { normalizeKeyValues } from "@/lib/payments/icici/types";
import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  return handleCallback(request);
}

export async function GET(request) {
  return handleCallback(request);
}

async function handleCallback(request) {
  const service = new PaymentService();
  const config = getIciciConfig();
  let payload = {};

  try {
    payload = normalizeKeyValues(await parseInboundPayload(request));
    verifyInboundSecureHash(payload, config.merchantKey);

    const attempt = await service.processCallback(payload);
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("merchantTxnNo", attempt.merchantTxnNo);
    redirect.searchParams.set("paymentState", attempt.state);
    redirect.searchParams.set("paymentStatus", attempt.state === "SUCCESS" ? "success" : "failed");
    return NextResponse.redirect(redirect, { status: 303 });
  } catch (error) {
    const redirect = new URL(config.frontendStatusUrl);
    const callbackError = classifyCallbackError(error);
    redirect.searchParams.set("error", callbackError.code);
    redirect.searchParams.set("errorStage", callbackError.stage);
    if (callbackError.detail) redirect.searchParams.set("errorDetail", callbackError.detail);
    if (payload?.merchantTxnNo) redirect.searchParams.set("merchantTxnNo", payload.merchantTxnNo);
    return NextResponse.redirect(redirect, { status: 303 });
  }
}

function classifyCallbackError(error) {
  const message = error instanceof Error ? error.message : "Unknown callback failure";

  if (message.includes("Inbound secure hash mismatch")) {
    const debugDetail = error && typeof error === "object" ? error.debugDetail : null;
    const detailParts = ["Secure hash validation failed for callback payload."];
    if (debugDetail?.receivedSecureHash) detailParts.push(`receivedSecureHash=${debugDetail.receivedSecureHash}`);
    if (debugDetail?.candidatePayloads?.length) {
      detailParts.push(`candidatePayloads=${debugDetail.candidatePayloads.join(" || ")}`);
    }
    if (debugDetail?.candidateHashes?.length) {
      detailParts.push(`candidateHashes=${debugDetail.candidateHashes.join(" || ")}`);
    }

    return {
      code: "callback_hash_mismatch",
      stage: "verify_hash",
      detail: detailParts.join(" "),
    };
  }

  if (message.includes("Unknown merchantTxnNo")) {
    return {
      code: "callback_unknown_transaction",
      stage: "lookup_attempt",
      detail: "merchantTxnNo from callback was not found in payment repository.",
    };
  }

  if (message.includes("Invalid payment state transition")) {
    return {
      code: "callback_invalid_state_transition",
      stage: "state_transition",
      detail: "Gateway status could not be applied from current payment state.",
    };
  }

  if (message.includes("Missing ICICI config") || message.includes("ICICI_ENV_MODE must be UAT or PROD")) {
    return {
      code: "callback_config_error",
      stage: "config_load",
      detail: "ICICI callback configuration is incomplete or invalid.",
    };
  }

  return {
    code: "callback_processing_failed",
    stage: "unknown",
    detail: message.slice(0, 140),
  };
}

function verifyInboundSecureHash(payload, merchantKey) {
  const secureHash = payload.secureHash || payload.SecureHash;
  const hashAdapter = new HmacSha256HashAdapter(merchantKey);
  const candidates = buildInboundHashCandidates(payload);
  const isValid = candidates.some((fields) => hashAdapter.verify(fields, secureHash));

  if (!isValid) {
    const candidatePayloads = candidates.map((fields) => fields.join("|"));
    const candidateHashes = candidates.map((fields) => hashAdapter.sign(fields));
    console.error("ICICI callback secure hash mismatch", {
      receivedSecureHash: secureHash || null,
      candidatePayloads,
      candidateHashes,
      payload,
    });

    const error = new Error("Inbound secure hash mismatch");
    error.debugDetail = {
      receivedSecureHash: secureHash || "",
      candidatePayloads,
      candidateHashes,
    };
    throw error;
  }
}

async function parseInboundPayload(request) {
  const queryParams = Object.fromEntries(new URL(request.url).searchParams.entries());
  if (request.method === "GET") return queryParams;

  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return {
      ...queryParams,
      ...Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)])),
    };
  }

  if (ct.includes("application/json")) {
    const json = await request.json();
    return { ...queryParams, ...Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)])) };
  }

  const text = await request.text();
  if (!text.trim()) return queryParams;

  try {
    const json = JSON.parse(text);
    if (json && typeof json === "object") {
      return { ...queryParams, ...Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)])) };
    }
  } catch (_error) {
    // fallback to URL encoded parsing below
  }

  const fromEncodedBody = Object.fromEntries(new URLSearchParams(text).entries());
  return { ...queryParams, ...fromEncodedBody };
}
