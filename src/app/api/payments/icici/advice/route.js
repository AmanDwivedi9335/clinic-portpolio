import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  const service = new PaymentService();

  try {
    const payload = await parseInboundPayload(request);
    const result = await service.processAdvice(payload);
    return NextResponse.json({ success: true, merchantTxnNo: result.merchantTxnNo });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "advice failed" }, { status: 400 });
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
