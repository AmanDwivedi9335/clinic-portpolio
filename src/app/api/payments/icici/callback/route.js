import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { buildInboundHashFields, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
import { normalizeKeyValues } from "@/lib/payments/icici/types";
import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  const service = new PaymentService();
  const config = getIciciConfig();

  try {
    const payload = normalizeKeyValues(await parseInboundPayload(request));
    verifyInboundSecureHash(payload, config.merchantKey);

    const attempt = await service.processCallback(payload);
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("merchantTxnNo", attempt.merchantTxnNo);
    redirect.searchParams.set("paymentState", attempt.state);
    redirect.searchParams.set("paymentStatus", toPaymentStatus(attempt.state));
    return NextResponse.redirect(redirect, { status: 303 });
  } catch (_error) {
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("error", "callback_processing_failed");
    return NextResponse.redirect(redirect, { status: 303 });
  }
}

function toPaymentStatus(state) {
  if (state === "SUCCESS") return "success";
  if (state === "FAILED" || state === "CANCELLED") return "failed";
  return "pending";
}

function verifyInboundSecureHash(payload, merchantKey) {
  const secureHash = payload.secureHash || payload.SecureHash;
  const hashAdapter = new HmacSha256HashAdapter(merchantKey);
  const fields = buildInboundHashFields(payload);

  if (!hashAdapter.verify(fields, secureHash)) {
    throw new Error("Inbound secure hash mismatch");
  }
}

async function parseInboundPayload(request) {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
  }
  const json = await request.json();
  return Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)]));
}
