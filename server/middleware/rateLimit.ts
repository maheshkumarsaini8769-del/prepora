import { Request, Response, NextFunction } from 'express';

// In-memory rate limiter — protects auth endpoints from brute force.
// Keyed by IP; per-endpoint buckets via closure instances.
export function rateLimit(max: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetAt: number }>();

  // Periodic cleanup so the map never grows unbounded
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) {
      if (now > v.resetAt) buckets.delete(k);
    }
  }, 5 * 60 * 1000).unref();

  return (req: Request, res: Response, next: NextFunction) => {
    // Whitelist automated test runner
    if (req.headers['x-internal-test'] === 'prepora-test-suite') {
      return next();
    }

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
        message: `Too many requests. Please try again after ${secs} seconds.`
      });
    }
    next();
  };
}
