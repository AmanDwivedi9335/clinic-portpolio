import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";
import {
  getStatusTokenFromRequest,
  verifyStatusAccessToken,
} from "@/lib/payments/status-access";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const service = new PaymentService();
  const attempt = await service.getStatus(params.merchantTxnNo);

  if (!attempt) {
    return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });
  }

  const token = getStatusTokenFromRequest(request);
  const isAuthorized = verifyStatusAccessToken({
    token,
    merchantTxnNo: attempt.merchantTxnNo,
    registrationId: attempt.registrationId,
  });

  if (!isAuthorized) {
    return NextResponse.json({ success: false, message: "Unauthorized payment status access" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    data: {
      merchantTxnNo: attempt.merchantTxnNo,
      state: attempt.state,
      amountPaise: attempt.amountPaise,
      updatedAt: attempt.updatedAt,
    },
  });
}
