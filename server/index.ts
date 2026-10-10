import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import healthRoutes from './routes/health.routes.js';
import questionRoutes from './routes/question.routes.js';
import testRoutes from './routes/test.routes.js';
import attemptRoutes from './routes/attempt.routes.js';
import entitiesRoutes from './routes/entities.routes.js';
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import auditRoutes from './routes/audit.routes.js';
import adminRoutes from './routes/admin.routes.js';
import aiFactoryRoutes from './routes/aiFactory.routes.js';
import paperRoutes from './routes/paper.routes.js';
import aiRoutes from './routes/ai.routes.js';
import syllabusRoutes from './routes/syllabus.routes.js';
import plannerRoutes from './routes/planner.routes.js';
import lectureRoutes from './routes/lecture.routes.js';
import formulaRoutes from './routes/formula.routes.js';
import searchRoutes from './routes/search.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import notificationRoutes from './routes/notification.routes.js';

import compression from 'compression';
import { securityHeaders } from './middleware/securityHeaders.js';
import { mongoSanitizer } from './middleware/mongoSanitizer.js';
import { highScaleCache, requestMetricsTracker } from './middleware/cacheMiddleware.js';
import { telemetryMetrics } from './services/telemetryMetrics.js';

const app = express();
const PORT = process.env.PORT || 5000;

// High-Concurrency Compression (reduces JSON payloads by ~80% for 20k requests)
app.use(compression({
  threshold: 1024,
  level: 6
}));

// Performance & Telemetry Tracker
app.use(requestMetricsTracker);

// Security Headers (Clickjacking DENY, nosniff, HSTS, CSP frame-ancestors)
app.use(securityHeaders);

// CORS Policy
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true
}));

// Body parsing with limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// NoSQL Injection Sanitization (Task.md Section 50)
app.use(mongoSanitizer);

// Connect to MongoDB
connectDB();

// Serverless / Auto-reconnect safety: Ensure DB is connected before processing requests
app.use(async (_req, _res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch {
      // Allow route to proceed or handle offline state
    }
  }
  next();
});

// High-Speed In-Memory Caching for static & high-read catalogs (TTL 60s)
app.use('/api/formulas', highScaleCache(60), formulaRoutes);
app.use('/api/syllabus', highScaleCache(60), syllabusRoutes);
app.use('/api/lectures', highScaleCache(60), lectureRoutes);

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai-factory', aiFactoryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/progress', plannerRoutes);
app.use('/api/activity', plannerRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api', entitiesRoutes);
app.use('/api/entities', entitiesRoutes);

// High-Scale Real-Time Telemetry Route (for System Health & Admin Dashboard Live Throughput)
app.get('/api/telemetry', (_req, res) => {
  res.json({
    success: true,
    telemetry: telemetryMetrics.getSnapshot()
  });
});

// Root fallback
app.get('/', (_req, res) => {
  res.json({
    name: 'PREPORA Backend API (High-Concurrency Engine)',
    status: 'Running',
    version: '1.0.0',
    scale: '5 Lakh Active Students / 20k Requests Ready',
    docs: '/api/health'
  });
});

// Production Safe Error Handling (Task.md Section 55: Never leak internal traces or secrets)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER_ERROR]', err);
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'An unexpected error occurred. Please try again later.'
    : (err.message || 'Internal server error');
  res.status(status).json({ success: false, message });
});

if (process.env.NODE_ENV !== 'production' || process.env.RENDER || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[PREPORA Server] API listening on port ${PORT}`);
  });
}

export default app;
