import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";
import {
  recordPatientPayment,
  toPatientMidPayload,
} from "@/lib/server/patientApiService";
import { getRegistrationDraft, saveRegistrationDraft } from "@/lib/server/tempRegistrationStore";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const merchantTxnNo = String(body.merchantTxnNo || "").trim();
    if (!merchantTxnNo) {
      return NextResponse.json({ success: false, message: "merchantTxnNo is required" }, { status: 400 });
    }

    const paymentService = new PaymentService();
    const attempt = await paymentService.getStatus(merchantTxnNo);
    if (!attempt) return NextResponse.json({ success: false, message: "Payment attempt not found" }, { status: 404 });

    if (attempt.state !== "SUCCESS") {
      return NextResponse.json({ success: false, message: `Payment state is ${attempt.state}` }, { status: 400 });
    }

    const draft = await getRegistrationDraft(attempt.registrationId);
    if (!draft) {
      return NextResponse.json({ success: false, message: "Registration draft expired or missing" }, { status: 404 });
    }

    if (draft.flowStatus === "FINALIZED" && draft.midResponse) {
      return NextResponse.json({ success: true, message: "Registration already completed", data: draft.midResponse });
    }

    const patientUuid = draft.patientUuid;
    if (!patientUuid) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient is not registered yet. Please restart registration.",
        },
        { status: 400 },
      );
    }

    const midPayload = toPatientMidPayload({ attempt, callbackPayload: {} });
    const midResponse = await recordPatientPayment(patientUuid, midPayload);

    await saveRegistrationDraft(attempt.registrationId, {
      ...draft,
      flowStatus: "FINALIZED",
      finalizedAt: new Date().toISOString(),
      patientUuid,
      midRequestPayload: midPayload,
      midResponse,
    });
    return NextResponse.json({
      success: true,
      message: "Registration completed successfully",
      data: midResponse,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to complete registration",
      },
      { status: 500 },
    );
  }
}
