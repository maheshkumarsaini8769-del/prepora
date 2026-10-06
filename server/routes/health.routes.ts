import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  let connectError = null;
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err: any) {
      connectError = err?.message || String(err);
    }
  }

  const dbState = mongoose.connection.readyState;
  const statusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const rawUri = process.env.MONGODB_URI || '';
  const uriType = rawUri.includes('mongodb+srv://')
    ? 'mongodb+srv'
    : rawUri.includes('127.0.0.1') || rawUri.includes('localhost')
    ? 'local'
    : rawUri ? 'custom' : 'fallback-atlas';

  res.json({
    api: 'ok',
    database: statusMap[dbState] || 'unknown',
    uriType,
    hasMongoEnv: !!process.env.MONGODB_URI,
    error: connectError,
    timestamp: new Date().toISOString()
  });
});

export default router;
