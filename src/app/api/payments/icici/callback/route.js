import { NextResponse } from "next/server";

import { getIciciConfig } from "@/lib/payments/icici/config";
import { buildInboundHashCandidateDetails, HmacSha256HashAdapter } from "@/lib/payments/icici/hash";
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
  let payload = {};
  let rawInboundPayload = null;

  try {
    const inbound = await parseInboundPayload(request);
    payload = normalizeKeyValues(inbound.parsedPayload);
    rawInboundPayload = inbound.rawInboundPayload;
    verifyInboundSecureHash(payload, config.merchantKey, rawInboundPayload);

    const attempt = await service.processCallback(payload);
    const redirect = new URL(config.frontendStatusUrl);
    redirect.searchParams.set("merchantTxnNo", attempt.merchantTxnNo);
    redirect.searchParams.set("paymentState", attempt.state);
    redirect.searchParams.set("paymentStatus", attempt.state === "SUCCESS" ? "success" : "failed");
    return NextResponse.redirect(redirect, { status: 303 });
  } catch (error) {
    const redirect = new URL(config.frontendStatusUrl);
    const callbackError = classifyCallbackError(error);
    redirect.searchParams.set("error", callbackError.code);
    redirect.searchParams.set("errorStage", callbackError.stage);
    if (callbackError.detail) redirect.searchParams.set("errorDetail", callbackError.detail);
    if (payload?.merchantTxnNo) redirect.searchParams.set("merchantTxnNo", payload.merchantTxnNo);
    return NextResponse.redirect(redirect, { status: 303 });
  }
}

function classifyCallbackError(error) {
  const message = error instanceof Error ? error.message : "Unknown callback failure";

  if (message.includes("Inbound secure hash mismatch")) {
    const debugDetail = error && typeof error === "object" ? error.debugDetail : null;
    const detail = debugDetail
      ? JSON.stringify({
          message: "Secure hash validation failed for callback payload.",
          receivedSecureHash: debugDetail.receivedSecureHash,
          hashInputCandidates: debugDetail.hashInputCandidates,
          payloadReceivedFromIcici: debugDetail.payload,
          rawInboundPayload: debugDetail.rawInboundPayload || null,
        })
      : "Secure hash validation failed for callback payload.";

    return {
      code: "callback_hash_mismatch",
      stage: "verify_hash",
      detail,
    };
  }

  if (message.includes("Unknown merchantTxnNo")) {
    return {
      code: "callback_unknown_transaction",
      stage: "lookup_attempt",
      detail: "merchantTxnNo from callback was not found in payment repository.",
    };
  }

  if (message.includes("Invalid payment state transition")) {
    return {
      code: "callback_invalid_state_transition",
      stage: "state_transition",
      detail: "Gateway status could not be applied from current payment state.",
    };
  }

  if (message.includes("Missing ICICI config") || message.includes("ICICI_ENV_MODE must be UAT or PROD")) {
    return {
      code: "callback_config_error",
      stage: "config_load",
      detail: "ICICI callback configuration is incomplete or invalid.",
    };
  }

  return {
    code: "callback_processing_failed",
    stage: "unknown",
    detail: message.slice(0, 140),
  };
}

function verifyInboundSecureHash(payload, merchantKey, rawInboundPayload) {
  const secureHash = payload.secureHash || payload.SecureHash;
  const hashAdapter = new HmacSha256HashAdapter(merchantKey);
  const candidateDetails = buildInboundHashCandidateDetails(payload);
  const isValid = candidateDetails.some((candidate) => hashAdapter.verify(candidate.fields, secureHash));

  if (!isValid) {
    const hashInputCandidates = candidateDetails.map((candidate) => ({
      strategy: candidate.strategy,
      fieldKeys: candidate.fieldKeys,
      payloadString: candidate.fields.join(""),
      generatedSecureHash: hashAdapter.sign(candidate.fields),
    }));
    const debugPayload = { ...payload };
    delete debugPayload.secureHash;
    delete debugPayload.SecureHash;

    console.error("ICICI callback secure hash mismatch", {
      receivedSecureHash: secureHash || null,
      hashInputCandidates,
      payload: debugPayload,
      rawInboundPayload,
    });

    const error = new Error("Inbound secure hash mismatch");
    error.debugDetail = {
      receivedSecureHash: secureHash || "",
      hashInputCandidates,
      payload: debugPayload,
      rawInboundPayload,
    };
    throw error;
  }
}

async function parseInboundPayload(request) {
  const requestUrl = new URL(request.url);
  const queryParams = Object.fromEntries(requestUrl.searchParams.entries());
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
  if (ct.includes("application/x-www-form-urlencoded")) {
    const rawBody = await request.text();
    const form = new URLSearchParams(rawBody);
    return {
      parsedPayload: {
        ...queryParams,
        ...Object.fromEntries(form.entries()),
      },
      rawInboundPayload: {
        method: request.method,
        contentType: ct,
        queryString,
        body: rawBody,
      },
    };
  }

  if (ct.includes("multipart/form-data")) {
    const form = await request.formData();
    const parsedForm = Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
    return {
      parsedPayload: {
        ...queryParams,
        ...parsedForm,
      },
      rawInboundPayload: {
        method: request.method,
        contentType: ct,
        queryString,
        body: "[multipart/form-data body is not available as raw text via Request.formData()]",
      },
    };
  }

  if (ct.includes("application/json")) {
    const rawBody = await request.text();
    const json = rawBody ? JSON.parse(rawBody) : {};
    return {
      parsedPayload: { ...queryParams, ...Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)])) },
      rawInboundPayload: {
        method: request.method,
        contentType: ct,
        queryString,
        body: rawBody,
      },
    };
  }

  const text = await request.text();
  if (!text.trim()) {
    return {
      parsedPayload: queryParams,
      rawInboundPayload: {
        method: request.method,
        contentType: ct,
        queryString,
        body: "",
      },
    };
  }

  try {
    const json = JSON.parse(text);
    if (json && typeof json === "object") {
      return {
        parsedPayload: { ...queryParams, ...Object.fromEntries(Object.entries(json).map(([k, v]) => [k, String(v)])) },
        rawInboundPayload: {
          method: request.method,
          contentType: ct,
          queryString,
          body: text,
        },
      };
    }
  } catch (_error) {
    // fallback to URL encoded parsing below
  }

  const fromEncodedBody = Object.fromEntries(new URLSearchParams(text).entries());
  return {
    parsedPayload: { ...queryParams, ...fromEncodedBody },
    rawInboundPayload: {
      method: request.method,
      contentType: ct,
      queryString,
      body: text,
    },
  };
}
