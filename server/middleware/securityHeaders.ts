import { Request, Response, NextFunction } from 'express';

/**
 * Production Security Headers Middleware (Task.md Sections 51, 52, 53)
 * Enforces Anti-Clickjacking, MIME Sniffing Prevention, HSTS, and Content Security Policy.
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent Clickjacking - do not allow framing anywhere
  res.setHeader('X-Frame-Options', 'DENY');

  // Disable browser XSS auditor in favor of CSP (OWASP recommended)
  res.setHeader('X-XSS-Protection', '0');

  // Referrer Policy: only send origin on cross-origin requests
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser features and device sensors
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // HSTS: Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content-Security-Policy frame-ancestors to prevent clickjacking
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none';");

  next();
};
