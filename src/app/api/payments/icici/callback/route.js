import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import {
  buildInboundHashFieldsFromPayload,
  HmacSha256HashAdapter,
} from "@/lib/payments/icici/hash";
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

  let rawCallbackPayload = {};
  let normalizedPayload = {};
  let rawInboundPayload = null;

  try {
    const inbound = await parseInboundPayload(request);

    rawCallbackPayload = { ...(inbound.parsedPayload || {}) };
    normalizedPayload = normalizeKeyValues(rawCallbackPayload);
    rawInboundPayload = inbound.rawInboundPayload;

    const hashDebug = verifyInboundSecureHash(
      rawCallbackPayload,
      config.merchantKey
    );

    const attempt = await service.processCallback(normalizedPayload);

    const redirect = new URL(config.frontendStatusUrl);

    redirect.searchParams.set(
      "merchantTxnNo",
      attempt.merchantTxnNo ||
        normalizedPayload.merchantTxnNo ||
        rawCallbackPayload.merchantTxnNo ||
        ""
    );

    redirect.searchParams.set("paymentState", attempt.state || "");
    redirect.searchParams.set(
      "paymentStatus",
      attempt.state === "SUCCESS" ? "success" : "failed"
    );

    redirect.searchParams.set("callbackHashStatus", "matched");
    redirect.searchParams.set(
      "callbackHashPayload",
      hashDebug.concatenatedPayloadString
    );
    redirect.searchParams.set(
      "generatedSecureHash",
      hashDebug.generatedSecureHash
    );
    redirect.searchParams.set(
      "receivedSecureHash",
      hashDebug.receivedSecureHash
    );

    return NextResponse.redirect(redirect, { status: 303 });
  } catch (error) {
    const redirect = new URL(config.frontendStatusUrl);

    const callbackError = classifyCallbackError(
      error,
      rawCallbackPayload,
      rawInboundPayload
    );

    redirect.searchParams.set("error", callbackError.code);
    redirect.searchParams.set("errorStage", callbackError.stage);

    const merchantTxnNo =
      rawCallbackPayload?.merchantTxnNo ||
      normalizedPayload?.merchantTxnNo ||
      "";

    if (merchantTxnNo) {
      redirect.searchParams.set("merchantTxnNo", merchantTxnNo);
    }

    if (callbackError.detail) {
      redirect.searchParams.set("errorDetail", callbackError.detail);
    }

    return NextResponse.redirect(redirect, { status: 303 });
  }
}

function verifyInboundSecureHash(rawCallbackPayload, merchantKey) {
  const receivedSecureHash =
    rawCallbackPayload.secureHash || rawCallbackPayload.SecureHash || "";

  const hashAdapter = new HmacSha256HashAdapter(merchantKey);

  const orderedFieldValues =
    buildInboundHashFieldsFromPayload(rawCallbackPayload);

  const concatenatedPayloadString = orderedFieldValues.join("");
  const generatedSecureHash = hashAdapter.sign(orderedFieldValues);

  const matched = hashAdapter.verify(
    orderedFieldValues,
    receivedSecureHash
  );

  if (!matched) {
    const debugPayload = { ...rawCallbackPayload };
    delete debugPayload.secureHash;
    delete debugPayload.SecureHash;

    const error = new Error("Inbound secure hash mismatch");
    error.debugDetail = {
      payload: debugPayload,
      concatenatedPayloadString,
      generatedSecureHash,
      receivedSecureHash,
    };
    throw error;
  }

  return {
    orderedFieldValues,
    concatenatedPayloadString,
    generatedSecureHash,
    receivedSecureHash,
  };
}

function classifyCallbackError(error, rawCallbackPayload, rawInboundPayload) {
  const message =
    error instanceof Error
      ? error.message
      : "Unknown callback failure";

  if (message.includes("Inbound secure hash mismatch")) {
    const debug = error?.debugDetail || {};

    return {
      code: "callback_hash_mismatch",
      stage: "verify_hash",
      detail: JSON.stringify(
        {
          message: "Secure hash validation failed",
          payload: debug.payload || rawCallbackPayload,
          concatenatedPayloadString:
            debug.concatenatedPayloadString || "",
          generatedSecureHash:
            debug.generatedSecureHash || "",
          receivedSecureHash:
            debug.receivedSecureHash || "",
          rawInboundPayload,
        },
        null,
        2
      ),
    };
  }

  if (message.includes("Unknown merchantTxnNo")) {
    return {
      code: "callback_unknown_transaction",
      stage: "lookup_attempt",
      detail: JSON.stringify(
        {
          payload: rawCallbackPayload,
          rawInboundPayload,
        },
        null,
        2
      ),
    };
  }

  if (message.includes("Invalid payment state transition")) {
    return {
      code: "callback_invalid_state_transition",
      stage: "state_transition",
      detail: JSON.stringify(
        {
          payload: rawCallbackPayload,
          rawInboundPayload,
        },
        null,
        2
      ),
    };
  }

  return {
    code: "callback_processing_failed",
    stage: "unknown",
    detail: JSON.stringify(
      {
        message,
        payload: rawCallbackPayload,
        rawInboundPayload,
      },
      null,
      2
    ),
  };
}

async function parseInboundPayload(request) {
  const requestUrl = new URL(request.url);

  const queryEntries = Array.from(requestUrl.searchParams.entries());
  const queryParams = Object.fromEntries(queryEntries);
  const queryString = requestUrl.searchParams.toString();

  if (request.method === "GET") {
    return {
      parsedPayload: queryParams,
      rawInboundPayload: {
        method: "GET",
        contentType: request.headers.get("content-type") || "",
        queryString,
      },
    };
  }

  const ct = request.headers.get("content-type") || "";
  const rawBody = await request.text();

  let parsed = {};

  try {
    parsed = JSON.parse(rawBody);
  } catch {
    parsed = Object.fromEntries(new URLSearchParams(rawBody).entries());
  }

  return {
    parsedPayload: {
      ...queryParams,
      ...parsed,
    },
    rawInboundPayload: {
      method: request.method,
      contentType: ct,
      queryString,
      body: rawBody,
    },
  };
}