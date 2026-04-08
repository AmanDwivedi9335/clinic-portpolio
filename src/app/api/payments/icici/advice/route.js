import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { buildInboundHashCandidates, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
import { normalizeKeyValues } from "@/lib/payments/icici/types";
import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  const service = new PaymentService();
  const config = getIciciConfig();

  try {
    const payload = normalizeKeyValues(await parseInboundPayload(request));
    verifyInboundSecureHash(payload, config.merchantKey);

    const result = await service.processAdvice(payload);
    return NextResponse.json({
      success: true,
      merchantTxnNo: result.merchantTxnNo,
      paymentState: result.state,
      paymentStatus: result.state === "SUCCESS" ? "success" : "failed",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "advice failed" }, { status: 400 });
  }
}

function verifyInboundSecureHash(payload, merchantKey) {
  const secureHash = payload.secureHash || payload.SecureHash;
  const hashAdapter = new HmacSha256HashAdapter(merchantKey);
  const candidates = buildInboundHashCandidates(payload);
  const isValid = candidates.some((fields) => hashAdapter.verify(fields, secureHash));

  if (!isValid) {
    throw new Error("Inbound secure hash mismatch");
  }
}

async function parseInboundPayload(request) {
  const ct = request.headers.get("content-type") || "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    return Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
  }
  if (ct.includes("application/json")) {
    const json = await request.json();
    return Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)]));
  }

  const raw = await request.text();
  if (!raw.trim()) return {};
  try {
    const json = JSON.parse(raw);
    if (json && typeof json === "object") {
      return Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)]));
    }
  } catch (_error) {
    // fallback to parsing url encoded payload
  }

  return Object.fromEntries(new URLSearchParams(raw).entries());
}
