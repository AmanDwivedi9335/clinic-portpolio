import { getIciciConfig } from "./config";
import { validateIciciInitiateRequest } from "./types";

export class IciciClient {
  constructor() {
    this.config = getIciciConfig();
  }

  async initiateSale(input) {
    const payload = validateIciciInitiateRequest(input);
    return this.postJson(this.config.initiateSalePath, payload);
  }

  async transactionStatus(input) {
    if (!input?.merchantId || !input?.merchantTxnNo || !input?.secureHash) {
      throw new Error("Invalid transaction status request");
    }
    return this.postJson(this.config.transactionStatusPath, input);
  }

  async postJson(path, body) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
    try {
      const response = await fetch(new URL(path, this.config.baseUrl), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const raw = await response.json().catch(() => {
        throw new Error(`ICICI API non-JSON response: ${response.status}`);
      });
      if (!response.ok) throw new Error(`ICICI API error ${response.status}: ${JSON.stringify(raw)}`);
      return raw;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") throw new Error(`ICICI API timeout after ${this.config.requestTimeoutMs}ms`);
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
