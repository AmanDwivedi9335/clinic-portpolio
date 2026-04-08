import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { buildInboundHashFields, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
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

  try {
    const payload = normalizeKeyValues(await parseInboundPayload(request));
    verifyInboundSecureHash(payload, config.merchantKey);

    const attempt = await service.processCallback(payload);
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("merchantTxnNo", attempt.merchantTxnNo);
    redirect.searchParams.set("paymentState", attempt.state);
    redirect.searchParams.set("paymentStatus", attempt.state === "SUCCESS" ? "success" : "failed");
    return NextResponse.redirect(redirect, { status: 303 });
  } catch (_error) {
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("error", "callback_processing_failed");
    return NextResponse.redirect(redirect, { status: 303 });
  }
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
