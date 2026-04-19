export type RateLimitResult = {
  limited: boolean;
  count: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

export interface RateLimitStore {
  increment(key: string, windowMs: number): Promise<{ count: number; resetAt: number }>;
}

type MemoryRateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, MemoryRateLimitEntry>;
};

class MemoryRateLimitStore implements RateLimitStore {
  private store =
    globalForRateLimit.__contactRateLimitStore ?? new Map<string, MemoryRateLimitEntry>();

  constructor() {
    globalForRateLimit.__contactRateLimitStore = this.store;
  }

  async increment(key: string, windowMs: number) {
    const now = Date.now();
    const existing = this.store.get(key);

    if (!existing || existing.resetAt <= now) {
      const next = {
        count: 1,
        resetAt: now + windowMs,
      };
      this.store.set(key, next);
      return next;
    }

    existing.count += 1;
    this.store.set(key, existing);
    return existing;
  }
}

export const contactRateLimitStore: RateLimitStore = new MemoryRateLimitStore();

export async function consumeRateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
  store?: RateLimitStore;
}): Promise<RateLimitResult> {
  const store = params.store ?? contactRateLimitStore;
  const current = await store.increment(params.key, params.windowMs);
  const limited = current.count > params.limit;
  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - Date.now()) / 1000));

  return {
    limited,
    count: current.count,
    remaining: Math.max(0, params.limit - current.count),
    resetAt: current.resetAt,
    retryAfterSeconds,
  };
}
