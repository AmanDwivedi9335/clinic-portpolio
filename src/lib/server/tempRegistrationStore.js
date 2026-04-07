import tls from "tls";

const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);
const MEMORY_FALLBACK_ENABLED = process.env.REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK === "true" || process.env.NODE_ENV !== "production";

function normalizeRedisUrl(rawUrl) {
  const sanitized = String(rawUrl || "")
    .trim()
    .replace(/\\n/g, "")
    .replace(/\/+$/, "");

  if (!sanitized) return "";
  if (/^rediss?:\/\//i.test(sanitized)) return sanitized;
  if (/^https?:\/\//i.test(sanitized)) return sanitized.replace(/^https?/i, "rediss");
  return `rediss://${sanitized}`;
}

function getRedisConfig() {
  const redisUrl =
    process.env.REDIS_URL ||
    process.env.REDIS_CLOUD_URL ||
    process.env.REDIS_TLS_URL ||
    process.env.REDIS_CONNECTION_STRING ||
    process.env.REDIS_CLOUD_REST_URL ||
    process.env.REDIS_REST_URL ||
    process.env.REDIS_API_URL ||
    process.env.KV_REST_API_URL ||
    "";

  return {
    url: normalizeRedisUrl(redisUrl),
  };
}

function parseRedisConnectionUrl(redisUrl) {
  const url = new URL(redisUrl);
  const port = Number(url.port || (url.protocol === "rediss:" ? 6380 : 6379));

  return {
    host: url.hostname,
    port,
    tlsEnabled: url.protocol === "rediss:",
    username: decodeURIComponent(url.username || ""),
    password: decodeURIComponent(url.password || ""),
    db: Number((url.pathname || "/0").replace("/", "") || 0),
  };
}

function encodeRespCommand(parts) {
  const encoded = parts
    .map((part) => {
      const value = String(part);
      return `$${Buffer.byteLength(value)}\r\n${value}\r\n`;
    })
    .join("");

  return `*${parts.length}\r\n${encoded}`;
}

function parseRespValue(payload) {
  if (!payload) return null;

  const prefix = payload[0];
  if (prefix === "+") return payload.slice(1).split("\r\n")[0];
  if (prefix === "-") throw new Error(`Redis error: ${payload.slice(1).split("\r\n")[0]}`);
  if (prefix === ":") return Number(payload.slice(1).split("\r\n")[0]);
  if (prefix === "$") {
    const [lengthLine, rest] = payload.slice(1).split("\r\n", 2);
    const length = Number(lengthLine);
    if (length === -1) return null;
    return rest.slice(0, length);
  }

  throw new Error("Unsupported Redis RESP response.");
}

async function sendRedisCommand(parts) {
  const { url } = getRedisConfig();
  if (!url) return null;

  const connection = parseRedisConnectionUrl(url);

  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: connection.host,
        port: connection.port,
        servername: connection.host,
        minVersion: "TLSv1.2",
      },
      async () => {
        try {
          if (connection.password) {
            const authParts = connection.username
              ? ["AUTH", connection.username, connection.password]
              : ["AUTH", connection.password];
            const authResponse = await writeAndRead(socket, authParts);
            if (authResponse !== "OK") throw new Error("Redis AUTH failed.");
          }

          if (Number.isInteger(connection.db) && connection.db > 0) {
            const selectResponse = await writeAndRead(socket, ["SELECT", String(connection.db)]);
            if (selectResponse !== "OK") throw new Error(`Redis SELECT ${connection.db} failed.`);
          }

          const response = await writeAndRead(socket, parts);
          socket.end();
          resolve(response);
        } catch (error) {
          socket.destroy();
          reject(error);
        }
      },
    );

    socket.once("error", (error) => {
      reject(error);
    });
  });
}

function writeAndRead(socket, parts) {
  return new Promise((resolve, reject) => {
    let responseBuffer = "";

    const onData = (chunk) => {
      responseBuffer += chunk.toString("utf8");
      try {
        const parsed = parseRespValue(responseBuffer);
        cleanup();
        resolve(parsed);
      } catch (error) {
        if (String(error?.message || "").startsWith("Redis error:")) {
          cleanup();
          reject(error);
        }
      }
    };

    const onError = (error) => {
      cleanup();
      reject(error);
    };

    const onClose = () => {
      cleanup();
      if (!responseBuffer) reject(new Error("Redis connection closed before response."));
    };

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);

    socket.write(encodeRespCommand(parts));
  });
}

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

function isRedisConfigured() {
  const { url } = getRedisConfig();
  return Boolean(url);
}

function resolveStorageBackend() {
  if (isRedisConfigured()) return "redis";
  if (MEMORY_FALLBACK_ENABLED) return "memory";
  throw new Error(
    "Redis draft storage is not configured. Set REDIS_URL to a rediss:// connection string (or enable REGISTRATION_DRAFT_ALLOW_MEMORY_FALLBACK=true).",
  );
}

function shouldFallbackToMemory(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("econn") ||
    message.includes("enotfound") ||
    message.includes("timed out") ||
    message.includes("socket") ||
    message.includes("tls")
  );
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
    throw new Error("Registration draft storage must use Redis. Please configure REDIS_URL (rediss://...) and try again.");
  }

  if (storageBackend === "redis") {
    try {
      const result = await sendRedisCommand(["SET", key, JSON.stringify(payload), "EX", String(ttlSeconds)]);
      if (result !== "OK") throw new Error("Redis SET failed.");
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
      const raw = await sendRedisCommand(["GET", key]);
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
      await sendRedisCommand(["DEL", key]);
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
