const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);

function getRedisConfig() {
  const baseUrl =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    "";
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    "";
  return {
    baseUrl: baseUrl.trim().replace(/\/+$/, ""),
    token: token.trim(),
  };
}

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

function isRedisConfigured() {
  const { baseUrl, token } = getRedisConfig();
  return Boolean(baseUrl && token);
}

async function callRedisRestCommand(command, args) {
  const { baseUrl, token } = getRedisConfig();
  if (!baseUrl || !token) return null;

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([String(command || "").toUpperCase(), ...args]),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis REST request failed (${response.status}): ${text}`);
  }

  return response.json();
}

function assertRedisResponse(command, redisResult) {
  if (!redisResult || typeof redisResult !== "object") {
    throw new Error(`Redis is configured but ${command} did not return a valid response.`);
  }

  if ("error" in redisResult && redisResult.error) {
    throw new Error(`Redis ${command} failed: ${redisResult.error}`);
  }
}

function shouldFallbackToMemory(error) {
  const message = String(error?.message || "").toLowerCase();
  return message.includes("fetch failed") || message.includes("network") || message.includes("econn") || message.includes("enotfound") || message.includes("timed out");
}

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const payload = {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };

  const key = buildDraftKey(registrationId);
  if (isRedisConfigured()) {
    try {
      const redisResult = await callRedisRestCommand("set", [key, JSON.stringify(payload), "EX", String(ttlSeconds)]);
      assertRedisResponse("set", redisResult);
      return payload;
    } catch (error) {
      if (!shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while saving registration draft, using in-memory fallback.", error);
    }
  }

  inMemoryStore.set(key, { value: payload, expiresAt: Date.now() + ttlSeconds * 1000 });
  return payload;
}

export async function getRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  if (isRedisConfigured()) {
    try {
      const redisResult = await callRedisRestCommand("get", [key]);
      assertRedisResponse("get", redisResult);

      const raw = redisResult.result;
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      if (!shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while reading registration draft, using in-memory fallback.", error);
    }
  }

  const stored = inMemoryStore.get(key);
  if (!stored) return null;
  if (stored.expiresAt < Date.now()) {
    inMemoryStore.delete(key);
    return null;
  }
  return stored.value;
}

export async function deleteRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  if (isRedisConfigured()) {
    try {
      const redisResult = await callRedisRestCommand("del", [key]);
      assertRedisResponse("del", redisResult);
      return true;
    } catch (error) {
      if (!shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while deleting registration draft, using in-memory fallback.", error);
    }
  }
  return inMemoryStore.delete(key);
}
