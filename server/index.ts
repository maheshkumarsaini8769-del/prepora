import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & middlewares
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai-factory', aiFactoryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api', entitiesRoutes);

// Root fallback
app.get('/', (req, res) => {
  res.json({
    name: 'PREPORA Backend API',
    status: 'Running',
    version: '1.0.0',
    docs: '/api/health'
  });
});

if (process.env.NODE_ENV !== 'production' || process.env.RENDER || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[PREPORA Server] API listening on port ${PORT}`);
  });
}

export default app;
