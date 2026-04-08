import crypto from "crypto";

export class HmacSha256HashAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  sign(fields) {
    const payload = fields.join("");
    return crypto.createHmac("sha256", this.secret).update(payload, "utf8").digest("hex");
  }

  verify(fields, receivedHash) {
    if (!receivedHash) return false;
    const expected = normalizeHashValue(this.sign(fields));
    const received = normalizeHashValue(receivedHash);
    return constantTimeCompare(expected, received);
  }
}

function normalizeHashValue(hash) {
  return String(hash || "")
    .trim()
    .toLowerCase();
}

export function constantTimeCompare(a, b) {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function buildInitiateHashFields(input) {
  return [
    input.addlParam1,
    input.addlParam2,
    input.aggregatorID,
    input.amount,
    input.currencyCode,
    input.customerEmailID,
    input.customerMobileNo,
    input.customerName,
    input.merchantId,
    input.merchantTxnNo,
    input.payType,
    input.returnURL,
    input.transactionType,
    input.txnDate,
  ];
}

export function buildInboundHashFields(payload) {
  const responseOrStatus = payload.responseCode ?? payload.status ?? "";
  return [payload.merchantTxnNo ?? "", responseOrStatus, payload.amount ?? "", payload.bankTxnNo ?? ""];
}

export function buildStatusRequestHashFields(input) {
  return [
    input.aggregatorID,
    input.merchantId,
    input.merchantTxnNo,
    input.originalTxnNo,
    input.transactionType,
  ];
}

export function buildInboundHashCandidates(payload) {
  const sanitizedEntries = Object.entries(payload || {}).filter(([key, value]) => {
    if (!key) return false;
    if (key.toLowerCase() === "securehash") return false;
    if (value == null) return false;
    return true;
  });

  const dynamicFieldsInReceivedOrder = sanitizedEntries.map(([, value]) => String(value));
  const dynamicFieldsInSortedOrder = [...sanitizedEntries]
    .sort(([leftKey], [rightKey]) => compareInboundHashKeys(leftKey, rightKey))
    .map(([, value]) => String(value));

  const legacyFixedFields = buildInboundHashFields(payload);

  const uniqueCandidates = new Map();
  for (const fields of [dynamicFieldsInReceivedOrder, dynamicFieldsInSortedOrder, legacyFixedFields]) {
    const signature = fields.join("\u0001");
    if (!uniqueCandidates.has(signature)) uniqueCandidates.set(signature, fields);
  }

  return [...uniqueCandidates.values()];
}

function compareInboundHashKeys(leftKey, rightKey) {
  const leftStartsUppercase = startsWithUppercase(leftKey);
  const rightStartsUppercase = startsWithUppercase(rightKey);
  if (leftStartsUppercase !== rightStartsUppercase) return leftStartsUppercase ? -1 : 1;

  const alphaCompare = leftKey.localeCompare(rightKey, "en", { sensitivity: "base" });
  if (alphaCompare !== 0) return alphaCompare;

  return leftKey.localeCompare(rightKey);
}

function startsWithUppercase(key) {
  const firstChar = String(key || "").charAt(0);
  return firstChar >= "A" && firstChar <= "Z";
}
