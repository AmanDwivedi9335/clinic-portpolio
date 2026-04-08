import crypto from "crypto";

export class HmacSha256HashAdapter {
  constructor(secret) {
    this.secret = secret;
  }

  sign(fields) {
    const payload = fields.join("|");
    return crypto.createHmac("sha256", this.secret).update(payload, "utf8").digest("hex");
  }

  verify(fields, receivedHash) {
    if (!receivedHash) return false;
    const expected = this.sign(fields);
    return constantTimeCompare(expected, receivedHash);
  }
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
  return [payload.merchantTxnNo || "", payload.responseCode || payload.status || "", payload.amount || "", payload.bankTxnNo || ""];
}
