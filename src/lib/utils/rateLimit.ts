/**
 * Minimal in-memory sliding-window rate limiter, scoped per server
 * instance. This is a "basic rate limit" per the build spec, sufficient to
 * blunt casual abuse; for stronger guarantees across multiple serverless
 * instances, replace with an Upstash/Redis-backed limiter before scaling up.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const existing = (hits.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
  existing.push(now);
  hits.set(key, existing);
  return existing.length > MAX_REQUESTS_PER_WINDOW;
}
