/**
 * In-memory rate limiter — sliding window per IP.
 * Suitable for a single serverless instance or local dev. For production
 * at scale, replace with Upstash Redis or Vercel KV.
 */

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

// Periodic cleanup to avoid memory growth
let lastSweep = Date.now();
const SWEEP_EVERY = 5 * 60_000;

type Options = {
  /** Max requests per window */
  limit: number;
  /** Window size in ms */
  windowMs: number;
};

export function rateLimit(key: string, { limit, windowMs }: Options) {
  const now = Date.now();

  // Sweep stale buckets periodically
  if (now - lastSweep > SWEEP_EVERY) {
    for (const [k, b] of buckets) {
      b.timestamps = b.timestamps.filter((t) => now - t < windowMs);
      if (b.timestamps.length === 0) buckets.delete(k);
    }
    lastSweep = now;
  }

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= limit) {
    const resetAt = bucket.timestamps[0] + windowMs;
    buckets.set(key, bucket);
    return {
      ok: false as const,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((resetAt - now) / 1000)),
    };
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return {
    ok: true as const,
    remaining: limit - bucket.timestamps.length,
    retryAfterSec: 0,
  };
}

/** Extract best-effort client IP from a Request */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
