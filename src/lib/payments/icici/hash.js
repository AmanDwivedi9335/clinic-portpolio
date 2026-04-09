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
  return buildInboundHashCandidateDetails(payload).map((candidate) => candidate.fields);
}

export function buildInboundHashCandidateDetails(payload) {
  const sanitizedEntries = Object.entries(payload || {}).filter(([key, value]) => {
    if (!key) return false;
    if (key.toLowerCase() === "securehash") return false;
    if (value == null) return false;
    return true;
  });

  const dynamicWithCapitalizedKeysFirst = [...sanitizedEntries]
    .sort(([leftKey], [rightKey]) => compareIciciInboundKeys(leftKey, rightKey))
    .map(([key, value]) => [key, String(value)]);

  const dynamicInReceivedOrder = sanitizedEntries.map(([key, value]) => [key, String(value)]);
  const dynamicInSortedOrder = [...sanitizedEntries]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => [key, String(value)]);

  const legacyFixedFields = [
    ["merchantTxnNo", String(payload.merchantTxnNo ?? "")],
    [payload.responseCode != null ? "responseCode" : "status", String(payload.responseCode ?? payload.status ?? "")],
    ["amount", String(payload.amount ?? "")],
    ["bankTxnNo", String(payload.bankTxnNo ?? "")],
  ];

  const uniqueCandidates = new Map();
  for (const candidate of [
    { strategy: "dynamic_capitalized_keys_first", entries: dynamicWithCapitalizedKeysFirst },
    { strategy: "dynamic_received_order", entries: dynamicInReceivedOrder },
    { strategy: "dynamic_alphabetical_keys", entries: dynamicInSortedOrder },
    { strategy: "legacy_fixed_fields", entries: legacyFixedFields },
  ]) {
    const fields = candidate.entries.map(([, value]) => value);
    const signature = fields.join("\u0001");
    if (!uniqueCandidates.has(signature)) {
      uniqueCandidates.set(signature, {
        strategy: candidate.strategy,
        fieldKeys: candidate.entries.map(([key]) => key),
        fields,
      });
    }
  }

  return [...uniqueCandidates.values()];
}

function compareIciciInboundKeys(leftKey, rightKey) {
  const leftStartsWithUppercase = /^[A-Z]/.test(leftKey);
  const rightStartsWithUppercase = /^[A-Z]/.test(rightKey);

  if (leftStartsWithUppercase !== rightStartsWithUppercase) {
    return leftStartsWithUppercase ? -1 : 1;
  }

  return leftKey.localeCompare(rightKey);
}
