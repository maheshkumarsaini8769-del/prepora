if (typeof (globalThis as any).DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {};
}
if (typeof (globalThis as any).Path2D === 'undefined') {
  (globalThis as any).Path2D = class Path2D {};
}

let appInstance: any = null;

export default async function handler(req: any, res: any) {
  try {
    if (!appInstance) {
      const serverModule = await import('../server/index.js');
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

