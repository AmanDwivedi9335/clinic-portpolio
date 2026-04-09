import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";
import {
  recordPatientPayment,
  registerPatient,
  toPatientMidPayload,
  toPatientRegisterPayload,
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

    const registerResponse = draft.externalApiResponse || await registerPatient(toPatientRegisterPayload(draft));
    const patientUuid =
      draft.patientUuid ||
      registerResponse?.patient?.uuid ||
      registerResponse?.patient?.user_uuid;
    if (!patientUuid) throw new Error("Patient API register response did not include patient uuid");

    const midPayload = toPatientMidPayload({ attempt, callbackPayload: {} });
    const midResponse = await recordPatientPayment(patientUuid, midPayload);

    await saveRegistrationDraft(attempt.registrationId, {
      ...draft,
      flowStatus: "FINALIZED",
      finalizedAt: new Date().toISOString(),
      externalApiResponse: registerResponse,
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
