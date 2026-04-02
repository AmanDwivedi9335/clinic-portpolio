import crypto from "crypto";
import { NextResponse } from "next/server";

import { PaymentService } from "@/lib/payments/payment-service";
import { getRegistrationDraft, saveRegistrationDraft } from "@/lib/server/tempRegistrationStore";

export const runtime = "nodejs";

function parseGender(gender) {
  const lowered = String(gender || "").toLowerCase();
  if (lowered === "male") return "male";
  if (lowered === "female") return "female";
  return "other";
}

function toPatientApiPayload(draft) {
  return {
    email: draft.email,
    password: draft.password || crypto.randomBytes(8).toString("hex"),
    phone: draft.mobile,
    first_name: draft.firstName,
    last_name: draft.lastName,
    date_of_birth: draft.dob,
    gender: parseGender(draft.gender),
    mId: draft.registrationId,
    abha_id: draft.abhaId || "",
    city: draft.city,
    state: draft.state,
    pincode: draft.pincode || "000000",
    country: draft.country || "India",
  };
}

async function sendToPatientApi(payload) {
  const baseUrl = process.env.PATIENT_API_BASE_URL;
  const path = process.env.PATIENT_API_REGISTER_PATH || "/api/v1/patients/register";

  if (!baseUrl) throw new Error("PATIENT_API_BASE_URL is not configured");

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.PATIENT_API_TOKEN ? { Authorization: `Bearer ${process.env.PATIENT_API_TOKEN}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || `Patient API failed with status ${response.status}`);
  }

  return result;
}

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

    if (draft.flowStatus === "FINALIZED") {
      return NextResponse.json({ success: true, message: "Registration already completed", data: draft.externalApiResponse || {} });
    }

    const externalPayload = toPatientApiPayload({
      ...draft,
      selectedPlanId: attempt.planId,
      paymentRef: attempt.merchantTxnNo,
      paymentAmountPaise: attempt.amountPaise,
    });

    const externalResponse = await sendToPatientApi(externalPayload);

    await saveRegistrationDraft(attempt.registrationId, {
      ...draft,
      flowStatus: "FINALIZED",
      finalizedAt: new Date().toISOString(),
      externalApiResponse: externalResponse,
    });
    return NextResponse.json({
      success: true,
      message: "Registration completed successfully",
      data: externalResponse,
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
