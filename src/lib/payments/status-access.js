import crypto from "crypto";

const VERSION = "v1";

function getSecret() {
  const secret = process.env.PAYMENT_STATUS_TOKEN_SECRET || process.env.ICICI_MERCHANT_KEY || "";
  if (!secret) {
    throw new Error("Missing PAYMENT_STATUS_TOKEN_SECRET (or ICICI_MERCHANT_KEY fallback)");
  }
  return secret;
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createStatusAccessToken({ merchantTxnNo, registrationId }) {
  const payloadObj = {
    v: VERSION,
    m: String(merchantTxnNo || "").trim(),
    r: String(registrationId || "").trim(),
  };

  const payload = base64UrlEncode(JSON.stringify(payloadObj));
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifyStatusAccessToken({ token, merchantTxnNo, registrationId }) {
  const raw = String(token || "").trim();
  if (!raw.includes(".")) return false;

  const [payload, providedSignature] = raw.split(".");
  if (!payload || !providedSignature) return false;

  const expectedSignature = sign(payload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return false;
  }

  let decoded;
  try {
    decoded = JSON.parse(base64UrlDecode(payload));
  } catch {
    return false;
  }

  return (
    decoded?.v === VERSION &&
    decoded?.m === String(merchantTxnNo || "").trim() &&
    decoded?.r === String(registrationId || "").trim()
  );
}

export function getStatusTokenFromRequest(request) {
  const headerToken = request.headers.get("x-payment-status-token") || "";
  if (headerToken.trim()) return headerToken.trim();

  const requestUrl = new URL(request.url);
  const queryToken = requestUrl.searchParams.get("statusToken") || "";
  return queryToken.trim();
}
