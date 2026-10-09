if (typeof (globalThis as any).DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as any).Path2D === 'undefined') {
  (globalThis as any).Path2D = class Path2D {};
}

import mongoose from 'mongoose';
import app from '../server/index.js';
import { connectDB } from '../server/config/db.js';

let connectPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  try {
    if (!connectPromise && mongoose.connection.readyState !== 1) {
      connectPromise = connectDB().catch((err: any) => {
        console.error('[API] Serverless connectDB error:', err);
        connectPromise = null;
      });
    }
    if (connectPromise && mongoose.connection.readyState !== 1) {
      await connectPromise;
    }

    return app(req, res);
  } catch (err: any) {
    console.error('[API Exception]:', err);
    return res.status(500).json({
      error: 'Backend Invocation Error',
      message: err?.message || String(err)
    });
  }
}


