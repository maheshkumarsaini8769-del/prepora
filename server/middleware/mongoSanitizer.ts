import { Request, Response, NextFunction } from 'express';

/**
 * Recursively strips MongoDB query selector keys (starting with $ or containing .)
 * from request bodies, query params, and route parameters (Task.md Section 50).
 */
function sanitizeInPlace(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitizeInPlace(obj[i]);
    }
    return obj;
  }

  for (const key of Object.keys(obj)) {
    // Prohibit keys starting with $ or containing . (NoSQL operator injection)
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object') {
      obj[key] = sanitizeInPlace(obj[key]);
    }
  }
  return obj;
}

export const mongoSanitizer = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body && typeof req.body === 'object') {
    sanitizeInPlace(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeInPlace(req.query);
  }
  if (req.params && typeof req.params === 'object') {
    sanitizeInPlace(req.params);
  }
  next();
};
