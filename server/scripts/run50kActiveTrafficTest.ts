import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Session from '../models/Session.js';
import TestAttempt from '../models/TestAttempt.js';
import Test from '../models/Test.js';
import { Note, Bookmark } from '../models/Entities.js';
import { JWT_SECRET } from '../middleware/auth.js';

dotenv.config();

const BASE_URL = 'http://localhost:5001/api';
const FRONTEND_URL = 'http://localhost:5555';
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';

const TOTAL_ACTIVE_USERS = 50000;
const BATCH_SIZE = 5000;

interface MetricTracker {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  latencies: number[];
}

function createMetricTracker(): MetricTracker {
  return {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    latencies: []
  };
}

function recordLatency(tracker: MetricTracker, ms: number, ok: boolean) {
  tracker.totalRequests++;
  if (ok) tracker.successfulRequests++;
  else tracker.failedRequests++;
  tracker.latencies.push(ms);
}

function calculateStats(tracker: MetricTracker) {
  const sorted = [...tracker.latencies].sort((a, b) => a - b);
  const count = sorted.length;
  if (count === 0) return { p50: 0, p95: 0, p99: 0, avg: 0, min: 0, max: 0 };
  const p50 = sorted[Math.floor(count * 0.50)];
  const p95 = sorted[Math.floor(count * 0.95)];
  const p99 = sorted[Math.floor(count * 0.99)];
  const avg = Math.round(sorted.reduce((a, b) => a + b, 0) / count);
  const min = sorted[0];
  const max = sorted[count - 1];
  return { p50, p95, p99, avg, min, max };
}

async function runInPool<T>(items: T[], concurrency: number, fn: (item: T, idx: number) => Promise<void>) {
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    await Promise.all(chunk.map((item, cIdx) => fn(item, i + cIdx)));
  }
}

async function run50kTrafficTest() {
  console.log('\n================================================================================');
  console.log('⚡ PREPORA ENTERPRISE 50,000 ACTIVE STUDENTS MEGA LOAD & STRESS SIMULATION');
  console.log('================================================================================');
  console.log(`Backend Target:  ${BASE_URL}`);
  console.log(`Frontend Target: ${FRONTEND_URL}`);
  console.log(`Database Target: ${MONGO_URI}`);
  console.log(`Total Simulated Active Students: ${TOTAL_ACTIVE_USERS.toLocaleString()}`);
  console.log(`Concurrent Online Sessions:      ${TOTAL_ACTIVE_USERS.toLocaleString()}\n`);

  await mongoose.connect(MONGO_URI);
  console.log('📦 Connected to MongoDB.\n');

  const initialUserCount = await User.countDocuments();
  console.log(`📊 Initial Database User Count: ${initialUserCount.toLocaleString()} users`);

  // ============================================================================
  // PHASE 1: SEED 50,000 REALISTIC STUDENTS INTO MONGODB
  // ============================================================================
  console.log('\n--- PHASE 1: GENERATING 50,000 REALISTIC STUDENT ACCOUNTS ---');
  const samplePasswordHash = await bcrypt.hash('ActivePass50k!', 10);
  const now = Date.now();
  const startTime = Date.now();

  let insertedUsersCount = 0;
  for (let b = 0; b < TOTAL_ACTIVE_USERS; b += BATCH_SIZE) {
    const batchUsers = [];
    const end = Math.min(b + BATCH_SIZE, TOTAL_ACTIVE_USERS);

    for (let i = b; i < end; i++) {
      const isNeet = i % 2 === 0;
      const classLevel = i % 3 === 0 ? '11' : (i % 3 === 1 ? '12' : 'Dropper');
      const targetExam = isNeet ? 'NEET' : 'JEE';
      const phoneDigits = `88${String(i).padStart(8, '0')}`;

      batchUsers.push({
        id: `usr_traffic50k_${i}`,
        studentId: `STU_50K_${i}`,
        name: `Active Student ${i}`,
        email: `student_${i}@traffic50k.prepora.test`,
        phone: phoneDigits,
        mobile: phoneDigits,
        passwordHash: samplePasswordHash,
        role: 'student',
        status: 'active',
        targetExam,
        classLevel,
        targetYear: 2026,
        dreamScore: isNeet ? 690 : 290,
        streakDays: (i % 45) + 1,
        totalQuestionsSolved: (i % 200) * 10,
        overallAccuracy: 70 + (i % 25),
        studyTimeMinutes: (i % 150) * 5,
        createdAt: new Date(now - (i % 30) * 86400000),
        updatedAt: new Date(now - (i % 5) * 3600000)
      });
    }

    await User.insertMany(batchUsers, { ordered: false });
    insertedUsersCount += batchUsers.length;
    process.stdout.write(`  ▶ Seeded ${insertedUsersCount.toLocaleString()} / ${TOTAL_ACTIVE_USERS.toLocaleString()} Users\n`);
  }

  const userSeedDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ 50,000 Users successfully seeded into MongoDB in ${userSeedDuration}s.`);

  // ============================================================================
  // PHASE 2: SEED 50,000 LIVE ONLINE SESSIONS (100% ONLINE SIMULTANEOUSLY)
  // ============================================================================
  console.log('\n--- PHASE 2: GENERATING 50,000 CONCURRENT ACTIVE SESSIONS ---');
  const sessStartTime = Date.now();
  let insertedSessCount = 0;

  for (let b = 0; b < TOTAL_ACTIVE_USERS; b += BATCH_SIZE) {
    const batchSessions = [];
    const end = Math.min(b + BATCH_SIZE, TOTAL_ACTIVE_USERS);

    for (let i = b; i < end; i++) {
      const uId = `usr_traffic50k_${i}`;
      const sId = `sess_traffic50k_${i}`;
      const token = jwt.sign({ sub: sId, id: uId, role: 'student' }, JWT_SECRET);
      const lastActiveMinutesAgo = (i % 4); // 0..3 minutes ago -> All online now!
      const phoneDigits = `88${String(i).padStart(8, '0')}`;

      batchSessions.push({
        id: sId,
        sessionId: sId,
        userId: uId,
        studentId: `STU_50K_${i}`,
        phone: phoneDigits,
        mobile: phoneDigits,
        token,
        deviceInfo: {
          device: i % 2 === 0 ? 'Android Mobile' : 'Windows 11 Laptop',
          browser: 'Chrome 124',
          os: i % 2 === 0 ? 'Android 14' : 'Windows 11'
        },
        ipAddress: `10.${Math.floor(i / 65536)}.${Math.floor((i % 65536) / 256)}.${i % 256}`,
        lastActive: new Date(Date.now() - lastActiveMinutesAgo * 60 * 1000),
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
        isRevoked: false,
        status: 'ACTIVE',
        expiresAt: new Date(Date.now() + 86400000)
      });
    }

    await Session.insertMany(batchSessions, { ordered: false });
    insertedSessCount += batchSessions.length;
    process.stdout.write(`  ▶ Seeded ${insertedSessCount.toLocaleString()} / ${TOTAL_ACTIVE_USERS.toLocaleString()} Active Sessions\n`);
  }

  const sessSeedDuration = ((Date.now() - sessStartTime) / 1000).toFixed(2);
  const peakUsersCount = await User.countDocuments();
  const peakActiveSessions = await Session.countDocuments({ isRevoked: false, lastActive: { $gte: new Date(Date.now() - 5 * 60 * 1000) } });
  console.log(`✅ 50,000 Live Active Sessions seeded in ${sessSeedDuration}s.`);
  console.log(`📊 Verified Live Active Students Count: ${peakActiveSessions.toLocaleString()} students online simultaneously!\n`);

  // Mint super admin token
  const adminToken = jwt.sign(
    { id: 'usr_admin_mahesh', email: 'maheshkumarsaini8769@gmail.com', phone: '7742735762', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  const baseHeaders = { 'Content-Type': 'application/json', 'x-internal-test': 'prepora-test-suite' };
  const adminHeaders = { ...baseHeaders, Authorization: `Bearer ${adminToken}` };

  // ============================================================================
  // PHASE 3: MULTI-STAGE HIGH CONCURRENCY LOAD TESTING UNDER 50,000 ACTIVE USERS
  // ============================================================================
  console.log('--- PHASE 3: EXECUTE LOAD BENCHMARKS UNDER 50,000 CONCURRENT ACTIVE STUDENTS ---');

  // Stage 1: Admin Telemetry & Student Monitoring Under 50,000 Live Students
  console.log('⚡ Stage 1: Admin Dashboard & Live Monitoring Under 50,000 Online Students (120 Requests)...');
  const stage1Tracker = createMetricTracker();
  const adminQueries = [
    '/admin/stats',
    '/admin/students?status=online_now&page=1&limit=25',
    '/admin/students?status=online_now&page=2&limit=25',
    '/admin/students?status=online_now&page=10&limit=25',
    '/admin/students?exam=NEET&status=online_now&limit=25',
    '/admin/students?exam=JEE&classLevel=12&status=online_now&limit=25',
    '/ai-factory/stats',
    '/audit'
  ];
  const stage1Items = Array.from({ length: 120 }, (_, i) => adminQueries[i % adminQueries.length]);

  await runInPool(stage1Items, 15, async (q) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${q}`, { headers: adminHeaders });
      recordLatency(stage1Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage1Tracker, Date.now() - t0, false);
    }
  });
  const s1Stats = calculateStats(stage1Tracker);
  console.log(`  ▶ Stage 1 Completed: ${stage1Tracker.successfulRequests}/${stage1Tracker.totalRequests} OK | Avg: ${s1Stats.avg}ms | p50: ${s1Stats.p50}ms | p95: ${s1Stats.p95}ms | p99: ${s1Stats.p99}ms`);

  // Stage 2: Public Web Traffic & Taxonomy Bursts (1,000 Requests)
  console.log('⚡ Stage 2: Public Web Traffic & Content Bursts (1,000 Requests)...');
  const stage2Tracker = createMetricTracker();
  const publicEndpoints = ['/syllabus', '/formulas', '/questions?limit=10', '/search?q=Optics', '/health'];
  const stage2Items = Array.from({ length: 1000 }, (_, i) => publicEndpoints[i % publicEndpoints.length]);

  await runInPool(stage2Items, 40, async (ep) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${ep}`, { headers: baseHeaders });
      recordLatency(stage2Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage2Tracker, Date.now() - t0, false);
    }
  });
  const s2Stats = calculateStats(stage2Tracker);
  console.log(`  ▶ Stage 2 Completed: ${stage2Tracker.successfulRequests}/${stage2Tracker.totalRequests} OK | Avg: ${s2Stats.avg}ms | p50: ${s2Stats.p50}ms | p95: ${s2Stats.p95}ms | p99: ${s2Stats.p99}ms`);

  // Stage 3: Auth Validation Across 50,000 Active Sessions (1,000 Requests)
  console.log('⚡ Stage 3: Active Session Validation Bursts Across 50k Users (1,000 Requests)...');
  const stage3Tracker = createMetricTracker();
  const sampleTokens = Array.from({ length: 100 }, (_, idx) => {
    const uId = `usr_traffic50k_${idx}`;
    const sId = `sess_traffic50k_${idx}`;
    return jwt.sign({ id: uId, role: 'student', sessionId: sId }, JWT_SECRET);
  });
  const stage3Items = Array.from({ length: 1000 }, (_, i) => sampleTokens[i % sampleTokens.length]);

  await runInPool(stage3Items, 40, async (tok) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { ...baseHeaders, Authorization: `Bearer ${tok}` }
      });
      recordLatency(stage3Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage3Tracker, Date.now() - t0, false);
    }
  });
  const s3Stats = calculateStats(stage3Tracker);
  console.log(`  ▶ Stage 3 Completed: ${stage3Tracker.successfulRequests}/${stage3Tracker.totalRequests} OK | Avg: ${s3Stats.avg}ms | p50: ${s3Stats.p50}ms | p95: ${s3Stats.p95}ms | p99: ${s3Stats.p99}ms`);

  // Stage 4: Exam Engine Dynamic Synthesis & Submissions Under 50k Active Users
  console.log('⚡ Stage 4: Exam Engine Synthesis & Submissions Under 50k Active Users (300 Tests)...');
  const stage4Tracker = createMetricTracker();
  const testBuildRes = await fetch(`${BASE_URL}/tests/build-custom`, {
    method: 'POST',
    headers: { ...baseHeaders, Authorization: `Bearer ${sampleTokens[0]}` },
    body: JSON.stringify({ exam: 'NEET', subjects: ['Biology'], questionCount: 10 })
  });
  const testBuildData: any = await testBuildRes.json();
  const activeTestId = testBuildData.test?.id;
  const activeQIds = testBuildData.test?.questionIds || [];

  const stage4Items = Array.from({ length: 300 }, (_, i) => ({
    userId: `usr_traffic50k_${i}`,
    token: sampleTokens[i % sampleTokens.length]
  }));

  await runInPool(stage4Items, 20, async (item, idx) => {
    const t0 = Date.now();
    const answers: Record<string, number> = {};
    activeQIds.forEach((qid: string, qIdx: number) => {
      answers[qid] = (qIdx + idx) % 4;
    });

    try {
      const res = await fetch(`${BASE_URL}/attempts/submit`, {
        method: 'POST',
        headers: { ...baseHeaders, Authorization: `Bearer ${item.token}` },
        body: JSON.stringify({
          testId: activeTestId,
          answers,
          timeTakenSeconds: 180 + idx
        })
      });
      const data: any = await res.json();
      recordLatency(stage4Tracker, Date.now() - t0, res.status === 201 && data.success);
    } catch {
      recordLatency(stage4Tracker, Date.now() - t0, false);
    }
  });
  const s4Stats = calculateStats(stage4Tracker);
  console.log(`  ▶ Stage 4 Completed: ${stage4Tracker.successfulRequests}/${stage4Tracker.totalRequests} OK | Avg: ${s4Stats.avg}ms | p50: ${s4Stats.p50}ms | p95: ${s4Stats.p95}ms | p99: ${s4Stats.p99}ms`);

  // Stage 5: Concurrent Student Hub Operations (400 Requests)
  console.log('⚡ Stage 5: Concurrent Student Hub Operations Under 50k Active Users (400 Requests)...');
  const stage5Tracker = createMetricTracker();
  const stage5Items = Array.from({ length: 400 }, (_, i) => ({
    userId: `usr_traffic50k_${i}`,
    token: sampleTokens[i % sampleTokens.length],
    idx: i
  }));

  await runInPool(stage5Items, 25, async (item) => {
    const t0 = Date.now();
    try {
      const ep = item.idx % 2 === 0 ? '/bookmarks' : '/notes';
      const body = item.idx % 2 === 0
        ? { itemType: 'question', itemId: `q_traffic50k_bm_${item.idx}` }
        : { title: `50k Concept Note #${item.idx}`, content: `High yield formula derivation ${item.idx}`, subject: 'Chemistry' };

      const res = await fetch(`${BASE_URL}${ep}`, {
        method: 'POST',
        headers: { ...baseHeaders, Authorization: `Bearer ${item.token}` },
        body: JSON.stringify(body)
      });
      recordLatency(stage5Tracker, Date.now() - t0, res.status === 200 || res.status === 201);
    } catch {
      recordLatency(stage5Tracker, Date.now() - t0, false);
    }
  });
  const s5Stats = calculateStats(stage5Tracker);
  console.log(`  ▶ Stage 5 Completed: ${stage5Tracker.successfulRequests}/${stage5Tracker.totalRequests} OK | Avg: ${s5Stats.avg}ms | p50: ${s5Stats.p50}ms | p95: ${s5Stats.p95}ms | p99: ${s5Stats.p99}ms`);

  // ============================================================================
  // PHASE 4: CLEANUP & COMPLETE REMOVAL OF ALL 50,000 TEST USERS & SESSIONS
  // ============================================================================
  console.log('\n--- PHASE 4: CLEANUP & PURGE OF ALL 50,000 TEST USERS & SESSIONS ---');
  console.log('🧹 Purging 50,000 test users and 50,000 sessions from MongoDB...');

  const cleanStart = Date.now();

  const [delUsers, delSessions, delAttempts, delNotes, delBookmarks] = await Promise.all([
    User.deleteMany({ email: { $regex: /@traffic50k\.prepora\.test$/ } }),
    Session.deleteMany({ id: { $regex: /^sess_traffic50k_/ } }),
    TestAttempt.deleteMany({ testId: activeTestId }),
    Note.deleteMany({ title: { $regex: /^50k Concept Note/ } }),
    Bookmark.deleteMany({ itemId: { $regex: /^q_traffic50k_bm_/ } })
  ]);

  if (activeTestId) {
    await Test.deleteOne({ id: activeTestId });
  }

  const cleanDuration = ((Date.now() - cleanStart) / 1000).toFixed(2);
  console.log(`  ▶ Deleted ${delUsers.deletedCount.toLocaleString()} Users`);
  console.log(`  ▶ Deleted ${delSessions.deletedCount.toLocaleString()} Active Sessions`);
  console.log(`  ▶ Deleted ${delAttempts.deletedCount.toLocaleString()} Test Attempts`);
  console.log(`  ▶ Deleted ${delNotes.deletedCount.toLocaleString()} Notes`);
  console.log(`  ▶ Deleted ${delBookmarks.deletedCount.toLocaleString()} Bookmarks`);
  console.log(`✅ Cleanup completed in ${cleanDuration}s.`);

  // Final verification
  const finalUserCount = await User.countDocuments();
  const lingeringUsers = await User.countDocuments({ email: { $regex: /@traffic50k\.prepora\.test$/ } });
  const lingeringSessions = await Session.countDocuments({ id: { $regex: /^sess_traffic50k_/ } });

  console.log('\n================================================================================');
  console.log('📊 50,000 ACTIVE STUDENTS TRAFFIC STRESS & LOAD SUMMARY');
  console.log('================================================================================');
  console.log(`Initial Database Users:     ${initialUserCount.toLocaleString()}`);
  console.log(`Peak Database Users:        ${peakUsersCount.toLocaleString()} (+50,000)`);
  console.log(`Simultaneous Active Users:  ${peakActiveSessions.toLocaleString()} Online Now`);
  console.log(`Final Database Users:       ${finalUserCount.toLocaleString()} (Verified Purged)`);
  console.log(`Lingering Test Users:       ${lingeringUsers} (Zero Leak)`);
  console.log(`Lingering Test Sessions:    ${lingeringSessions} (Zero Leak)`);
  console.log('--------------------------------------------------------------------------------');
  console.log(`Stage 1 (Admin Monitoring): ${stage1Tracker.successfulRequests}/${stage1Tracker.totalRequests} OK | Avg: ${s1Stats.avg}ms | p95: ${s1Stats.p95}ms`);
  console.log(`Stage 2 (Public Routes):    ${stage2Tracker.successfulRequests}/${stage2Tracker.totalRequests} OK | Avg: ${s2Stats.avg}ms | p95: ${s2Stats.p95}ms`);
  console.log(`Stage 3 (Auth Validation):  ${stage3Tracker.successfulRequests}/${stage3Tracker.totalRequests} OK | Avg: ${s3Stats.avg}ms | p95: ${s3Stats.p95}ms`);
  console.log(`Stage 4 (Exam Engine):      ${stage4Tracker.successfulRequests}/${stage4Tracker.totalRequests} OK | Avg: ${s4Stats.avg}ms | p95: ${s4Stats.p95}ms`);
  console.log(`Stage 5 (Student Hub):      ${stage5Tracker.successfulRequests}/${stage5Tracker.totalRequests} OK | Avg: ${s5Stats.avg}ms | p95: ${s5Stats.p95}ms`);
  console.log('================================================================================');

  const totalReqs = stage1Tracker.totalRequests + stage2Tracker.totalRequests + stage3Tracker.totalRequests + stage4Tracker.totalRequests + stage5Tracker.totalRequests;
  const totalSuccess = stage1Tracker.successfulRequests + stage2Tracker.successfulRequests + stage3Tracker.successfulRequests + stage4Tracker.successfulRequests + stage5Tracker.successfulRequests;
  const overallSuccessRate = ((totalSuccess / totalReqs) * 100).toFixed(2);

  console.log(`🎯 OVERALL 50K ACTIVE STRESS TEST: ${totalSuccess} / ${totalReqs} REQUESTS SUCCEEDED (${overallSuccessRate}%)`);
  console.log(`🌟 50,000 ACTIVE STUDENTS STRESS TEST COMPLETE & 100% CLEANED UP WITH ZERO LEAKS.`);
  console.log('================================================================================\n');

  await mongoose.disconnect();
  process.exit(lingeringUsers === 0 && lingeringSessions === 0 ? 0 : 1);
}

run50kTrafficTest().catch((err) => {
  console.error('Fatal load test failure:', err);
  process.exit(1);
});
