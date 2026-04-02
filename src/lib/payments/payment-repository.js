import crypto from "crypto";

const attempts = new Map();
const audits = new Map();

export class InMemoryPaymentRepository {
  async createAttempt(input) {
    const now = new Date().toISOString();
    const attempt = { ...input, createdAt: now, updatedAt: now, id: input.id || crypto.randomUUID() };
    attempts.set(attempt.merchantTxnNo, attempt);
    return attempt;
  }

  async findByMerchantTxnNo(merchantTxnNo) {
    return attempts.get(merchantTxnNo) || null;
  }

  async updateAttempt(merchantTxnNo, update) {
    const current = attempts.get(merchantTxnNo);
    if (!current) throw new Error(`Attempt not found for ${merchantTxnNo}`);
    const next = { ...current, ...update, merchantTxnNo, updatedAt: new Date().toISOString() };
    attempts.set(merchantTxnNo, next);
    return next;
  }

  async appendAuditLog(merchantTxnNo, event, payload) {
    const row = { at: new Date().toISOString(), event, payload };
    const current = audits.get(merchantTxnNo) || [];
    current.push(row);
    audits.set(merchantTxnNo, current);
  }

  async findPendingForReconciliation(limit) {
    return Array.from(attempts.values())
      .filter((a) => ["PENDING", "REDIRECTED", "RECONCILING", "INITIATED"].includes(a.state))
      .slice(0, limit);
  }
}

let singleton = null;
export function getPaymentRepository() {
  if (!singleton) singleton = new InMemoryPaymentRepository();
  return singleton;
}
