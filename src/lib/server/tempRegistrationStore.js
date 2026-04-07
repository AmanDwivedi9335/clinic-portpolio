const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);
const MEMORY_FALLBACK_ENABLED = process.env.REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK === "true" || process.env.NODE_ENV !== "production";

function getRedisConfig() {
  const baseUrl =
    process.env.REDIS_CLOUD_REST_URL ||
    process.env.REDIS_REST_URL ||
    process.env.REDIS_API_URL ||
    process.env.KV_REST_API_URL ||
    "";

  const token =
    process.env.REDIS_CLOUD_REST_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    process.env.REDIS_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.REDIS_CLOUD_API_KEY ||
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

function resolveStorageBackend() {
  if (isRedisConfigured()) return "redis";
  if (MEMORY_FALLBACK_ENABLED) return "memory";
  throw new Error(
    "Redis draft storage is not configured. Set REDIS_CLOUD_REST_URL and REDIS_CLOUD_REST_TOKEN (or enable REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK=true).",
  );
}

async function postRedisRequest(url, token, body) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
}

async function callRedisRestCommand(command, args) {
  const { baseUrl, token } = getRedisConfig();
  if (!baseUrl || !token) return null;

  const normalizedCommand = String(command || "").toUpperCase();
  const candidates = [
    {
      label: "array-command",
      url: baseUrl,
      body: [normalizedCommand, ...args],
    },
    {
      label: "object-command",
      url: `${baseUrl}/command`,
      body: { command: normalizedCommand, args },
    },
  ];

  const errors = [];

  for (const candidate of candidates) {
    try {
      const response = await postRedisRequest(candidate.url, token, candidate.body);
      if (!response.ok) {
        const text = await response.text();
        errors.push(`${candidate.label} -> HTTP ${response.status}: ${text}`);
        continue;
      }

      const result = await response.json();
      if (result && typeof result === "object") {
        return result;
      }
      errors.push(`${candidate.label} -> invalid JSON payload from Redis Cloud REST API.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error || "Unknown fetch error");
      errors.push(`${candidate.label} -> ${errorMessage}`);
    }
  }

  throw new Error(
    `Redis Cloud REST ${normalizedCommand} failed for ${baseUrl}. Tried ${candidates.length} request format(s). ${errors.join(" | ")}`,
  );
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

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS, options = {}) {
  const { requireRedis = false } = options;
  const payload = {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };

  const key = buildDraftKey(registrationId);
  const storageBackend = resolveStorageBackend();

  if (requireRedis && storageBackend !== "redis") {
    throw new Error("Registration draft storage must use Redis. Please configure REDIS_CLOUD_REST_URL and REDIS_CLOUD_REST_TOKEN and try again.");
  }
  if (storageBackend === "redis") {
    try {
      const redisResult = await callRedisRestCommand("set", [key, JSON.stringify(payload), "EX", String(ttlSeconds)]);
      assertRedisResponse("set", redisResult);
      return payload;
    } catch (error) {
      if (requireRedis || !MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while saving registration draft, using in-memory fallback.", error);
    }
  }

  inMemoryStore.set(key, { value: payload, expiresAt: Date.now() + ttlSeconds * 1000 });
  return payload;
}

export async function getRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  if (resolveStorageBackend() === "redis") {
    try {
      const redisResult = await callRedisRestCommand("get", [key]);
      assertRedisResponse("get", redisResult);

      const raw = redisResult.result;
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error) {
      if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
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
  if (resolveStorageBackend() === "redis") {
    try {
      const redisResult = await callRedisRestCommand("del", [key]);
      assertRedisResponse("del", redisResult);
      return true;
    } catch (error) {
      if (!MEMORY_FALLBACK_ENABLED || !shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while deleting registration draft, using in-memory fallback.", error);
    }
  }
  return inMemoryStore.delete(key);
}

export function getRegistrationDraftStorageBackend() {
  return resolveStorageBackend();
}
