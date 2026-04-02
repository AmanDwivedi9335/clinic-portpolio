import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const input = {
      registrationId: String(body.registrationId || "").trim(),
      planId: String(body.planId || "").trim(),
      amountPaise: Number(body.amountPaise),
      customerName: String(body.customerName || "").trim(),
      customerEmail: String(body.customerEmail || "").trim(),
      customerMobile: String(body.customerMobile || "").replace(/\D/g, "").slice(-10),
    };

    const service = new PaymentService();
    const result = await service.initiatePayment({
      orderId: `REG-${input.registrationId}-${input.planId}`,
      registrationId: input.registrationId,
      planId: input.planId,
      amountPaise: input.amountPaise,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerMobile: input.customerMobile,
      metadata: { source: "registration_checkout" },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "initiate failed" }, { status: 400 });
  }
}
