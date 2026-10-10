import { Request, Response, NextFunction } from 'express';
import { telemetryMetrics } from '../services/telemetryMetrics.js';

interface CacheEntry {
  data: any;
  contentType: string;
  statusCode: number;
  expiry: number;
}

const memoryCache = new Map<string, CacheEntry>();
const MAX_CACHE_ENTRIES = 2000;

/**
 * Cache middleware with TTL in seconds
 * Ideal for syllabus, questions, formulas, static catalog, and health checks
 */
export const highScaleCache = (ttlSeconds: number = 60) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const startHr = process.hrtime.bigint();
    const cacheKey = `${req.originalUrl || req.url}`;
    const cached = memoryCache.get(cacheKey);
    const now = Date.now();

    if (cached && cached.expiry > now) {
      const endHr = process.hrtime.bigint();
      const latencyMs = Number(endHr - startHr) / 1_000_000;
      telemetryMetrics.recordRequest(latencyMs, true);

      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Response-Time', `${latencyMs.toFixed(2)}ms`);
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=120`);
      res.setHeader('Content-Type', cached.contentType);
      return res.status(cached.statusCode).send(cached.data);
    }

    // Intercept response to store in cache
    const originalSend = res.send.bind(res);

    res.send = (body: any): Response => {
      const endHr = process.hrtime.bigint();
      const latencyMs = Number(endHr - startHr) / 1_000_000;
      telemetryMetrics.recordRequest(latencyMs, false);

      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Response-Time', `${latencyMs.toFixed(2)}ms`);
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=120`);

      // Only cache successful 200 responses
      if (res.statusCode === 200 && body) {
        // Enforce cache size bounds (LRU eviction of oldest entry)
        if (memoryCache.size >= MAX_CACHE_ENTRIES) {
          const oldestKey = memoryCache.keys().next().value;
          if (oldestKey) memoryCache.delete(oldestKey);
        }

        memoryCache.set(cacheKey, {
          data: body,
          contentType: (res.getHeader('Content-Type') as string) || 'application/json',
          statusCode: res.statusCode,
          expiry: now + (ttlSeconds * 1000)
        });
      }

      return originalSend(body);
    };

    next();
  };
};

/**
 * Performance tracker middleware for all non-cached requests
 */
export const requestMetricsTracker = (req: Request, res: Response, next: NextFunction) => {
  const startHr = process.hrtime.bigint();

  res.on('finish', () => {
    // If not already recorded by cache middleware
    if (!res.getHeader('X-Cache')) {
      const endHr = process.hrtime.bigint();
      const latencyMs = Number(endHr - startHr) / 1_000_000;
      telemetryMetrics.recordRequest(latencyMs, false);
    }
  });

  next();
};

/**
 * Invalidate cache programmatically (e.g. after question creation or admin edits)
 */
export const invalidateCache = (prefix?: string) => {
  if (!prefix) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.includes(prefix)) {
      memoryCache.delete(key);
    }
  }
};
