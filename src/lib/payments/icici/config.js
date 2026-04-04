let cache = null;

export function getIciciConfig() {
  if (cache) return cache;

  const config = {
    mode: process.env.ICICI_ENV_MODE,
    baseUrl: process.env.ICICI_BASE_URL,
    merchantId: process.env.ICICI_MERCHANT_ID,
    aggregatorId: process.env.ICICI_AGGREGATOR_ID,
    merchantKey: process.env.ICICI_MERCHANT_KEY,
    hashVersion: process.env.ICICI_HASH_VERSION || "v1",
    initiateSalePath: process.env.ICICI_INITIATE_PATH || "/pg/api/v2/initiateSale",
    transactionStatusPath: process.env.ICICI_TXN_STATUS_PATH || "/pg/api/v2/transactionStatus",
    returnUrl: process.env.ICICI_RETURN_URL,
    paymentAdviceUrl: process.env.ICICI_PAYMENT_ADVICE_URL,
    frontendStatusUrl: process.env.NEXT_PUBLIC_PAYMENT_STATUS_BASE_URL,
    requestTimeoutMs: Number(process.env.ICICI_TIMEOUT_MS || 15000),
    reconcileMaxAttempts: Number(process.env.ICICI_RECONCILE_MAX_ATTEMPTS || 5),
  };

  if (!config.mode || !["UAT", "PROD"].includes(config.mode)) throw new Error("ICICI_ENV_MODE must be UAT or PROD");
  for (const key of ["baseUrl", "merchantId", "aggregatorId", "merchantKey", "returnUrl", "frontendStatusUrl"]) {
    if (!config[key]) throw new Error(`Missing ICICI config: ${key}`);
  }

  assertIciciConfigLooksReal(config);

  cache = config;
  return cache;
}

function assertIciciConfigLooksReal(config) {
  const placeholderPrefixes = ["YOUR_", "your_"];
  const fields = [
    ["merchantId", config.merchantId],
    ["aggregatorId", config.aggregatorId],
    ["merchantKey", config.merchantKey],
  ];

  for (const [field, value] of fields) {
    const text = String(value || "").trim();
    if (!text || placeholderPrefixes.some((prefix) => text.startsWith(prefix))) {
      throw new Error(`ICICI config ${field} looks like a placeholder. Update .env.local with real ICICI credentials.`);
    }
  }

  for (const [field, value] of [["returnUrl", config.returnUrl], ["frontendStatusUrl", config.frontendStatusUrl]]) {
    const text = String(value || "").trim();
    if (!text || text.includes("your-domain.com")) {
      throw new Error(`ICICI config ${field} uses example domain. Update .env.local with a real URL.`);
    }
    try {
      const parsed = new URL(text);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error();
      }
    } catch {
      throw new Error(`ICICI config ${field} must be a valid http/https URL.`);
    }
  }
}
