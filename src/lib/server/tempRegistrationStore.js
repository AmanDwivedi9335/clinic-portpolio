import net from "net";
import tls from "tls";

const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);
const REDIS_SOCKET_TIMEOUT_MS = Number(process.env.REDIS_SOCKET_TIMEOUT_MS || 4000);

function getRedisConfig() {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL || "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN || "";
  return {
    baseUrl: String(baseUrl || "").trim(),
    token: String(token || "").trim(),
  };
}

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

function isRedisConfigured() {
  const { baseUrl, token } = getRedisConfig();
  return Boolean(baseUrl && token);
}

function normalizeRestBaseUrl(baseUrl) {
  if (!baseUrl) return "";
  if (/^https?:\/\//i.test(baseUrl)) return baseUrl.replace(/\/+$/, "");
  return `https://${baseUrl.replace(/\/+$/, "")}`;
}

function buildRespCommand(parts) {
  const segments = [`*${parts.length}\r\n`];
  for (const part of parts) {
    const value = String(part ?? "");
    segments.push(`$${Buffer.byteLength(value)}\r\n${value}\r\n`);
  }
  return segments.join("");
}

function parseRespValue(buffer, startIndex = 0) {
  const prefix = String.fromCharCode(buffer[startIndex]);
  const lineEnd = buffer.indexOf("\r\n", startIndex);
  if (lineEnd === -1) return null;

  if (prefix === "+") {
    return { value: buffer.toString("utf8", startIndex + 1, lineEnd), next: lineEnd + 2 };
  }

  if (prefix === ":") {
    return { value: Number(buffer.toString("utf8", startIndex + 1, lineEnd)), next: lineEnd + 2 };
  }

  if (prefix === "$") {
    const length = Number(buffer.toString("utf8", startIndex + 1, lineEnd));
    if (Number.isNaN(length)) throw new Error("Invalid Redis bulk response length");
    if (length === -1) return { value: null, next: lineEnd + 2 };

    const dataStart = lineEnd + 2;
    const dataEnd = dataStart + length;
    if (buffer.length < dataEnd + 2) return null;
    return { value: buffer.toString("utf8", dataStart, dataEnd), next: dataEnd + 2 };
  }

  if (prefix === "-") {
    const message = buffer.toString("utf8", startIndex + 1, lineEnd);
    throw new Error(`Redis command error: ${message}`);
  }

  throw new Error(`Unsupported Redis RESP prefix: ${prefix}`);
}

function parseHostPort(baseUrl) {
  const normalized = String(baseUrl || "").trim();
  if (!normalized) return null;

  if (normalized.includes("://")) {
    const parsed = new URL(normalized);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || (parsed.protocol === "rediss:" ? 6380 : 6379)),
      tlsPreferred: parsed.protocol === "rediss:",
    };
  }

  const [host, portText] = normalized.split(":");
  if (!host || !portText) return null;
  return {
    host,
    port: Number(portText),
    tlsPreferred: true,
  };
}

function shouldUseRestApi(baseUrl) {
  return /^https?:\/\//i.test(baseUrl);
}

function executeTcpRedisCommand(host, port, token, command, args, useTls) {
  return new Promise((resolve, reject) => {
    const transport = useTls ? tls : net;
    const socket = transport.connect(
      useTls
        ? { host, port, servername: host }
        : { host, port },
    );

    let settled = false;
    let raw = Buffer.alloc(0);
    let values = [];

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(new Error("Redis socket timed out"));
    }, REDIS_SOCKET_TIMEOUT_MS);

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      socket.end();
      fn(value);
    };

    socket.on("error", (error) => finish(reject, error));

    socket.on("data", (chunk) => {
      raw = Buffer.concat([raw, chunk]);
      try {
        let cursor = 0;
        const parsed = [];
        while (cursor < raw.length) {
          const tokenized = parseRespValue(raw, cursor);
          if (!tokenized) break;
          parsed.push(tokenized.value);
          cursor = tokenized.next;
        }

        if (cursor > 0) {
          values = values.concat(parsed);
          raw = raw.slice(cursor);
        }

        if (values.length >= 2) {
          finish(resolve, { result: values[1] });
        }
      } catch (error) {
        finish(reject, error);
      }
    });

    socket.on("connect", () => {
      const authCmd = buildRespCommand(["AUTH", token]);
      const commandCmd = buildRespCommand([command.toUpperCase(), ...args]);
      socket.write(`${authCmd}${commandCmd}`);
    });
  });
}

async function callRedisRestCommand(command, args) {
  const { baseUrl, token } = getRedisConfig();
  if (!baseUrl || !token) return null;

  const restBase = normalizeRestBaseUrl(baseUrl);
  const pathArgs = args.map((item) => encodeURIComponent(String(item))).join("/");
  const response = await fetch(`${restBase}/${command}/${pathArgs}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis REST request failed (${response.status}): ${text}`);
  }

  return response.json();
}

async function callRedisCommand(command, args) {
  const { baseUrl, token } = getRedisConfig();
  if (!baseUrl || !token) return null;

  if (shouldUseRestApi(baseUrl)) {
    return callRedisRestCommand(command, args);
  }

  const endpoint = parseHostPort(baseUrl);
  if (!endpoint) {
    throw new Error("REDIS_REST_URL is invalid. Expected http(s) URL or host:port format.");
  }

  const tlsPreference = process.env.REDIS_TLS;
  const tryTlsFirst = tlsPreference === undefined ? endpoint.tlsPreferred : tlsPreference !== "false";

  if (tryTlsFirst) {
    try {
      return await executeTcpRedisCommand(endpoint.host, endpoint.port, token, command, args, true);
    } catch (tlsError) {
      if (tlsPreference === "true") throw tlsError;
      return executeTcpRedisCommand(endpoint.host, endpoint.port, token, command, args, false);
    }
  }

  return executeTcpRedisCommand(endpoint.host, endpoint.port, token, command, args, false);
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

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const payload = {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };

  const key = buildDraftKey(registrationId);
  if (isRedisConfigured()) {
    try {
      const redisResult = await callRedisCommand("set", [key, JSON.stringify(payload), "EX", String(ttlSeconds)]);
      if (!redisResult) {
        throw new Error("Redis is configured but set command did not return a response.");
      }
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
      const redisResult = await callRedisCommand("get", [key]);
      if (!redisResult) {
        throw new Error("Redis is configured but get command did not return a response.");
      }

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
      const redisResult = await callRedisCommand("del", [key]);
      if (!redisResult) {
        throw new Error("Redis is configured but del command did not return a response.");
      }
      return true;
    } catch (error) {
      if (!shouldFallbackToMemory(error)) throw error;
      console.warn("Redis unavailable while deleting registration draft, using in-memory fallback.", error);
    }
  }
  return inMemoryStore.delete(key);
}
