import { ClientError, GraphQLClient, type Variables } from "graphql-request";

const apiEndpoint = process.env.API_ENDPOINT;
const apiSecret = process.env.API_SECRET;
if (!apiEndpoint || !apiSecret) throw new Error("Something went wrong");

const client = new GraphQLClient(apiEndpoint, {
  headers: {
    Authorization: `Bearer ${apiSecret}`,
  },
});

// A static build renders every page and layout separately, and many of them ask Hygraph the same
// questions (years list, a year, departments). Sharing in-flight/recent results keeps the build under
// Hygraph's rate limit; the short TTL keeps on-demand renders reasonably fresh.
const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const cache = new Map<string, { expires: number; value: Promise<unknown> }>();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function isRetryable(error: unknown) {
  if (error instanceof ClientError) {
    const status = error.response.status;
    return status === 429 || status >= 500;
  }
  // Network errors (no response) are worth another try too.
  return !(error instanceof ClientError);
}

async function requestWithRetry<T>(query: string, variables?: Variables): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await client.request<T>(query, variables);
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS || !isRetryable(error)) throw error;
      // 1s, 2s, 4s, 8s plus jitter.
      await sleep(1000 * 2 ** (attempt - 1) + Math.random() * 250);
    }
  }
}

export function request<T>(query: string, variables?: Variables): Promise<T> {
  const key = JSON.stringify([query, variables ?? null]);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expires > now) return hit.value as Promise<T>;

  const value = requestWithRetry<T>(query, variables);
  cache.set(key, { expires: now + CACHE_TTL_MS, value });
  // Never keep a failure around: the next caller should try again.
  value.catch(() => cache.delete(key));
  return value;
}
