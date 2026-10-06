if (typeof (globalThis as any).DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as any).Path2D === 'undefined') {
  (globalThis as any).Path2D = class Path2D {};
}

let appInstance: any = null;
let connectPromise: Promise<void> | null = null;

export default async function handler(req: any, res: any) {
  try {
    // 1. Ensure MongoDB connection is initialized and awaited for serverless execution
    if (!connectPromise) {
      let dbModule: any;
      try {
        dbModule = await import('../server/config/db.js');
      } catch {
        const dbPath = '../server/config/db';
        dbModule = await import(dbPath);
      }
      const connectDB = dbModule.default || dbModule.connectDB;
      if (typeof connectDB === 'function') {
        connectPromise = connectDB().catch((err: any) => {
          console.error('[API] Serverless connectDB error:', err);
          connectPromise = null;
        });
      }
    }
    if (connectPromise) {
      await connectPromise;
    }

    if (!appInstance) {
      let serverModule: any;
      try {
        serverModule = await import('../server/index.js');
      } catch {
        const serverPath = '../server/index';
        serverModule = await import(serverPath);
      }
      appInstance = serverModule.default || serverModule;
    }
    return appInstance(req, res);
  } catch (err: any) {
    console.error('[API Exception]:', err);
    return res.status(500).json({
      error: 'Backend Invocation Error',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : (err?.message || String(err))
    });
  }
}

