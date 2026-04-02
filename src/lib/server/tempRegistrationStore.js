const inMemoryStore = new Map();

const DEFAULT_TTL_SECONDS = Number(process.env.REGISTRATION_DRAFT_TTL_SECONDS || 60 * 60 * 6);

function getRedisConfig() {
  const baseUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL || "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN || "";
  return {
    baseUrl: baseUrl.trim(),
    token: token.trim(),
  };
}

function buildDraftKey(registrationId) {
  return `registration:draft:${registrationId}`;
}

async function callRedisRest(pathname, body) {
  const { baseUrl, token } = getRedisConfig();
  if (!baseUrl || !token) return null;

  const response = await fetch(`${baseUrl}${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Redis REST request failed (${response.status}): ${text}`);
  }

  return response.json();
}

export async function saveRegistrationDraft(registrationId, data, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const payload = {
    ...data,
    registrationId,
    updatedAt: new Date().toISOString(),
  };

  const key = buildDraftKey(registrationId);
  const redisResult = await callRedisRest("/set", [key, JSON.stringify(payload), { ex: ttlSeconds }]);
  if (redisResult) return payload;

  inMemoryStore.set(key, { value: payload, expiresAt: Date.now() + ttlSeconds * 1000 });
  return payload;
}

export async function getRegistrationDraft(registrationId) {
  const key = buildDraftKey(registrationId);
  const redisResult = await callRedisRest("/get", [key]);
  if (redisResult) {
    const raw = redisResult.result;
    if (!raw) return null;
    return JSON.parse(raw);
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
  const redisResult = await callRedisRest("/del", [key]);
  if (redisResult) return true;
  return inMemoryStore.delete(key);
}
