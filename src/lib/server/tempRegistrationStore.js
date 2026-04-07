import { createClient } from "redis";

const SIX_HOURS_IN_SECONDS = 60 * 60 * 6;
const DEFAULT_TTL_SECONDS = resolveDefaultTtlSeconds();
const MEMORY_FALLBACK_ENABLED =
  process.env.NODE_ENV !== "production" &&
  process.env.REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK === "true";

const inMemoryStore = new Map();

function resolveDefaultTtlSeconds() {
  const parsed = Number.parseInt(process.env.REGISTRATION_DRAFT_TTL_SECONDS || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : SIX_HOURS_IN_SECONDS;
}

function getRedisUrl() {
  return String(process.env.REDIS_URL || "").trim();
}

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

function logStorageEvent(level, event, meta = {}) {
  const payload = {
    scope: "registration-draft-storage",
    event,
    ...meta,
  };

  if (level === "error") {
    console.error(JSON.stringify(payload));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(payload));
    return;
  }

  console.info(JSON.stringify(payload));
}

function getMemoryRecord(key) {
  const stored = inMemoryStore.get(key);
  if (!stored) return null;

  if (stored.expiresAt <= Date.now()) {
    inMemoryStore.delete(key);
    return null;
  }

  return stored.value;
}

function getMemoryBackendReason() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  if (!MEMORY_FALLBACK_ENABLED) {
    return null;
  }

  if (getRedisUrl()) {
    return null;
  }

  return "REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK=true in development and REDIS_URL is not set.";
}

function resolveStorageBackend() {
  const redisUrl = getRedisUrl();
  if (redisUrl) {
    return "redis";
  }

  const memoryReason = getMemoryBackendReason();
  if (memoryReason) {
    return "memory";
  }

  const baseError = "Registration draft storage is not configured.";
  if (process.env.NODE_ENV === "production") {
    throw new Error(`${baseError} REDIS_URL is required in production.`);
  }

  throw new Error(
    `${baseError} Set REDIS_URL or enable explicit development fallback with REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK=true.`,
  );
}

function getSharedRedisClientState() {
  const globalKey = "__registrationDraftRedisState";

  if (!globalThis[globalKey]) {
    globalThis[globalKey] = {
      client: null,
      connectPromise: null,
      configuredUrl: null,
      initLogged: false,
    };
  }

  return globalThis[globalKey];
}

async function getRedisClient() {
  const redisUrl = getRedisUrl();
  if (!redisUrl) {
    throw new Error("REDIS_URL is missing. Configure REDIS_URL with redis:// or rediss:// for Redis Cloud.");
  }

  const state = getSharedRedisClientState();

  if (!state.client || state.configuredUrl !== redisUrl) {
    state.client = createClient({ url: redisUrl });
    state.connectPromise = null;
    state.configuredUrl = redisUrl;

    state.client.on("error", (error) => {
      logStorageEvent("error", "redis-client-error", {
        backend: "redis",
        message: error?.message || "Unknown Redis client error",
      });
    });
  }

  if (!state.connectPromise && !state.client.isOpen) {
    state.connectPromise = state.client.connect().then(() => {
      if (!state.initLogged) {
        state.initLogged = true;
        logStorageEvent("info", "redis-client-connected", {
          backend: "redis",
          transport: redisUrl.startsWith("rediss://") ? "tls" : "tcp",
        });
      }
      return state.client;
    });
  }

  if (state.connectPromise) {
    try {
      await state.connectPromise;
    } catch (error) {
      state.connectPromise = null;
      throw new Error(
        `Failed to connect to Redis using REDIS_URL. Verify host, port, credentials, and TLS requirements. ${error?.message || ""}`.trim(),
      );
    }
  }

  return state.client;
}

function normalizeTtlSeconds(ttlSeconds) {
  const parsed = Number.parseInt(String(ttlSeconds ?? DEFAULT_TTL_SECONDS), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid TTL value: ${ttlSeconds}. Provide a positive number of seconds.`);
  }

  return parsed;
}

function serializeDraftPayload(registrationId, data) {
  return {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };
}

function parseDraftPayload(raw, key) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Stored draft for key ${key} is not valid JSON. ${error?.message || ""}`.trim());
  }
}

async function withRedisOperation(operationName, callback) {
  try {
    const client = await getRedisClient();
    return await callback(client);
  } catch (error) {
    throw new Error(
      `Redis ${operationName} failed for registration draft storage. ${error?.message || "Unknown Redis error."}`,
    );
  }
}

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const key = buildDraftKey(registrationId);
  const payload = serializeDraftPayload(registrationId, data);
  const ttl = normalizeTtlSeconds(ttlSeconds);
  const backend = resolveStorageBackend();

  if (backend === "memory") {
    inMemoryStore.set(key, { value: payload, expiresAt: Date.now() + ttl * 1000 });
    logStorageEvent("warn", "draft-saved-memory", { backend, key, ttl });
    return payload;
  }

  const serialized = JSON.stringify(payload);

  await withRedisOperation("set", async (client) => {
    await client.set(key, serialized, { EX: ttl });
  });

  logStorageEvent("info", "draft-saved-redis", { backend, key, ttl });
  return payload;
}

export async function getRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  const backend = resolveStorageBackend();

  if (backend === "memory") {
    const value = getMemoryRecord(key);
    logStorageEvent("warn", "draft-read-memory", { backend, key, found: Boolean(value) });
    return value;
  }

  const raw = await withRedisOperation("get", async (client) => client.get(key));

  if (raw == null) {
    logStorageEvent("info", "draft-read-redis", { backend, key, found: false });
    return null;
  }

  const value = parseDraftPayload(raw, key);
  logStorageEvent("info", "draft-read-redis", { backend, key, found: true });
  return value;
}

export async function deleteRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  const backend = resolveStorageBackend();

  if (backend === "memory") {
    const deleted = inMemoryStore.delete(key);
    logStorageEvent("warn", "draft-deleted-memory", { backend, key, deleted });
    return deleted;
  }

  const deletedCount = await withRedisOperation("del", async (client) => client.del(key));
  const deleted = deletedCount > 0;
  logStorageEvent("info", "draft-deleted-redis", { backend, key, deleted });
  return deleted;
}

export async function assertRegistrationDraftStorageHealthy() {
  const backend = resolveStorageBackend();

  if (backend === "memory") {
    const message =
      "Registration draft storage is running on in-memory fallback (development only). Redis health check skipped.";

    logStorageEvent("warn", "storage-health-memory", { backend, healthy: true, message });

    return {
      healthy: true,
      backend,
      message,
    };
  }

  const healthKey = buildDraftKey(`health:${Date.now()}:${Math.random().toString(16).slice(2)}`);
  const probeValue = JSON.stringify({ ok: true, checkedAt: new Date().toISOString() });

  await withRedisOperation("health-check", async (client) => {
    await client.set(healthKey, probeValue, { EX: 30 });
    const fetched = await client.get(healthKey);

    if (fetched !== probeValue) {
      throw new Error("Probe read value mismatch after write.");
    }

    await client.del(healthKey);
  });

  logStorageEvent("info", "storage-health-redis", { backend, healthy: true });

  return {
    healthy: true,
    backend,
  };
}

export function getRegistrationDraftStorageBackend() {
  return resolveStorageBackend();
}

export { buildDraftKey, getRedisUrl, resolveStorageBackend };
