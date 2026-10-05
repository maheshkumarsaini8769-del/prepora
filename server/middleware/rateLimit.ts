import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter — protects auth endpoints from brute force.
// Keyed by IP; per-endpoint buckets via closure instances.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(max: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip || req.socket.remoteAddress || 'unknown'}`;
    const now = Date.now();
    const entry = buckets.get(key);

    if (!entry || now > entry.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > max) {
      const secs = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader('Retry-After', String(secs));
      return res.status(429).json({
        success: false,
        message: `Bahut zyada requests. ${secs}s baad try karein.`
      });
    }
    next();
  };
}

// Periodic cleanup so the map never grows unbounded
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
}, 5 * 60 * 1000).unref();
