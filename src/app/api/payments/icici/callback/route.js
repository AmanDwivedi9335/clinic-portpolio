import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  const service = new PaymentService();
  const config = getIciciConfig();

  try {
    const payload = await parseInboundPayload(request);
    const attempt = await service.processCallback(payload);
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("merchantTxnNo", attempt.merchantTxnNo);
    return NextResponse.redirect(redirect, { status: 303 });
  } catch (_error) {
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("error", "callback_processing_failed");
    return NextResponse.redirect(redirect, { status: 303 });
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
