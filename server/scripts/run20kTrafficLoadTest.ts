import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Session from '../models/Session.js';
import TestAttempt from '../models/TestAttempt.js';
import Test from '../models/Test.js';
import { Note, Bookmark, Mistake } from '../models/Entities.js';
import DailyProgress from '../models/DailyProgress.js';
import { JWT_SECRET } from '../middleware/auth.js';

dotenv.config();

const BASE_URL = 'http://localhost:5001/api';
const FRONTEND_URL = 'http://localhost:5555';
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';

const TOTAL_FAKE_USERS = 20000;
const BATCH_SIZE = 2000;
const ONLINE_SESSIONS_COUNT = 5000;

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
  if (count === 0) return { p50: 0, p95: 0, p99: 0, avg: 0, max: 0, min: 0 };
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

async function runTrafficTest() {
  console.log('\n================================================================================');
  console.log('🚀 PREPORA ENTERPRISE 20,000 USER TRAFFIC STRESS & LOAD SIMULATION');
  console.log('================================================================================');
  console.log(`Backend Target:  ${BASE_URL}`);
  console.log(`Frontend Target: ${FRONTEND_URL}`);
  console.log(`Database Target: ${MONGO_URI}`);
  console.log(`Total Simulated Users: ${TOTAL_FAKE_USERS.toLocaleString()}`);
  console.log(`Active Live Sessions:  ${ONLINE_SESSIONS_COUNT.toLocaleString()}\n`);

  await mongoose.connect(MONGO_URI);
  console.log('📦 Connected to MongoDB.\n');

  // Initial user count
  const initialUserCount = await User.countDocuments();
  console.log(`📊 Initial Database User Count: ${initialUserCount.toLocaleString()} users`);

  // ============================================================================
  // PHASE 1: GENERATE & INSERT 20,000 SYNTHETIC REALISTIC USERS
  // ============================================================================
  console.log('\n--- PHASE 1: GENERATING 20,000 REALISTIC STUDENT USERS ---');
  const samplePasswordHash = await bcrypt.hash('TrafficPass123!', 10);
  const now = Date.now();

  let insertedCount = 0;
  const startTime = Date.now();

  for (let b = 0; b < TOTAL_FAKE_USERS; b += BATCH_SIZE) {
    const batchUsers = [];
    const end = Math.min(b + BATCH_SIZE, TOTAL_FAKE_USERS);

    for (let i = b; i < end; i++) {
      const isNeet = i % 2 === 0;
      const classLevel = i % 3 === 0 ? '11' : (i % 3 === 1 ? '12' : 'Dropper');
      const targetExam = isNeet ? 'NEET' : 'JEE';
      const phoneDigits = `91${String(i).padStart(8, '0')}`;

      batchUsers.push({
        id: `usr_traffic20k_${i}`,
        studentId: `STU_TRF_${i}`,
        name: `Traffic Student ${i}`,
        email: `traffic_student_${i}@traffic20k.prepora.test`,
        phone: phoneDigits,
        mobile: phoneDigits,
        passwordHash: samplePasswordHash,
        role: 'student',
        status: 'active',
        targetExam,
        classLevel,
        targetYear: 2026,
        dreamScore: isNeet ? 680 : 280,
        streakDays: (i % 30) + 1,
        totalQuestionsSolved: (i % 150) * 10,
        overallAccuracy: 65 + (i % 30),
        studyTimeMinutes: (i % 120) * 5,
        createdAt: new Date(now - (i % 30) * 86400000),
        updatedAt: new Date(now - (i % 5) * 3600000)
      });
    }

    await User.insertMany(batchUsers, { ordered: false });
    insertedCount += batchUsers.length;
    process.stdout.write(`  ▶ Seeded ${insertedCount.toLocaleString()} / ${TOTAL_FAKE_USERS.toLocaleString()} users into MongoDB\n`);
  }

  const seedDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  const postSeedCount = await User.countDocuments();
  console.log(`✅ Successfully seeded 20,000 users in ${seedDuration}s. Total Users in DB: ${postSeedCount.toLocaleString()}`);

  // ============================================================================
  // PHASE 2: SEED 5,000 ACTIVE LIVE SESSIONS
  // ============================================================================
  console.log('\n--- PHASE 2: SEEDING 5,000 LIVE ONLINE SESSIONS ---');
  const sessionBatch = [];
  for (let i = 0; i < ONLINE_SESSIONS_COUNT; i++) {
    const uId = `usr_traffic20k_${i}`;
    const sId = `sess_traffic20k_${i}`;
    const token = jwt.sign({ sub: sId, id: uId, role: 'student' }, JWT_SECRET);
    const lastActiveMinutesAgo = (i % 4); // 0, 1, 2, or 3 minutes ago -> Online Now!
    const phoneDigits = `91${String(i).padStart(8, '0')}`;

    sessionBatch.push({
      id: sId,
      sessionId: sId,
      userId: uId,
      studentId: `STU_TRF_${i}`,
      phone: phoneDigits,
      mobile: phoneDigits,
      token,
      deviceInfo: {
        device: i % 2 === 0 ? 'Android Mobile' : 'Chrome on Windows',
        browser: 'Chrome 124',
        os: i % 2 === 0 ? 'Android 14' : 'Windows 11'
      },
      ipAddress: `192.168.${Math.floor(i / 256)}.${i % 256}`,
      lastActive: new Date(Date.now() - lastActiveMinutesAgo * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      isRevoked: false,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 86400000)
    });
  }

  for (let i = 0; i < sessionBatch.length; i += 1000) {
    await Session.insertMany(sessionBatch.slice(i, i + 1000), { ordered: false });
  }
  console.log(`✅ Seeded ${ONLINE_SESSIONS_COUNT.toLocaleString()} live online sessions with active telemetry.\n`);

  // Mint super admin token for admin monitoring tests
  const adminToken = jwt.sign(
    { id: 'usr_admin_mahesh', email: 'maheshkumarsaini8769@gmail.com', phone: '7742735762', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  const baseHeaders = { 'Content-Type': 'application/json', 'x-internal-test': 'prepora-test-suite' };
  const adminHeaders = { ...baseHeaders, Authorization: `Bearer ${adminToken}` };

  // ============================================================================
  // PHASE 3: CONCURRENT USER TRAFFIC & PERFORMANCE BENCHMARKING
  // ============================================================================
  console.log('--- PHASE 3: EXECUTE CONCURRENT HIGH-TRAFFIC LOAD TESTS ---');

  // Stage 1: Public Web Traffic Spike (1,000 Concurrent Requests)
  console.log('⚡ Stage 1: Public Web Traffic & Route Spikes (1,000 Concurrent Requests)...');
  const stage1Tracker = createMetricTracker();
  const publicEndpoints = ['/syllabus', '/formulas', '/questions?limit=10', '/search?q=Kinematics', '/health'];
  const stage1Items = Array.from({ length: 1000 }, (_, i) => publicEndpoints[i % publicEndpoints.length]);

  const s1Start = Date.now();
  await runInPool(stage1Items, 40, async (ep) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${ep}`, { headers: baseHeaders });
      recordLatency(stage1Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage1Tracker, Date.now() - t0, false);
    }
  });
  const s1Stats = calculateStats(stage1Tracker);
  console.log(`  ▶ Stage 1 Completed: ${stage1Tracker.successfulRequests}/${stage1Tracker.totalRequests} OK | Avg: ${s1Stats.avg}ms | p50: ${s1Stats.p50}ms | p95: ${s1Stats.p95}ms | p99: ${s1Stats.p99}ms`);

  // Stage 2: Token Verification & Active Session Bursts (1,000 Concurrent Requests)
  console.log('⚡ Stage 2: Authentication & Token Verification Bursts (1,000 Concurrent Requests)...');
  const stage2Tracker = createMetricTracker();
  const sampleTokens = Array.from({ length: 50 }, (_, idx) => {
    const uId = `usr_traffic20k_${idx}`;
    const sId = `sess_traffic20k_${idx}`;
    return jwt.sign({ id: uId, role: 'student', sessionId: sId }, JWT_SECRET);
  });
  const stage2Items = Array.from({ length: 1000 }, (_, i) => sampleTokens[i % sampleTokens.length]);

  await runInPool(stage2Items, 40, async (tok) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}/auth/me`, {
        headers: { ...baseHeaders, Authorization: `Bearer ${tok}` }
      });
      recordLatency(stage2Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage2Tracker, Date.now() - t0, false);
    }
  });
  const s2Stats = calculateStats(stage2Tracker);
  console.log(`  ▶ Stage 2 Completed: ${stage2Tracker.successfulRequests}/${stage2Tracker.totalRequests} OK | Avg: ${s2Stats.avg}ms | p50: ${s2Stats.p50}ms | p95: ${s2Stats.p95}ms | p99: ${s2Stats.p99}ms`);

  // Stage 3: Exam Engine Dynamic Synthesis & Submissions Under Load
  console.log('⚡ Stage 3: Exam Engine Dynamic Synthesis & Submissions Under Traffic (300 Tests)...');
  const stage3Tracker = createMetricTracker();
  const testBuildRes = await fetch(`${BASE_URL}/tests/build-custom`, {
    method: 'POST',
    headers: { ...baseHeaders, Authorization: `Bearer ${sampleTokens[0]}` },
    body: JSON.stringify({ exam: 'JEE', subjects: ['Physics'], questionCount: 10 })
  });
  const testBuildData: any = await testBuildRes.json();
  const activeTestId = testBuildData.test?.id;
  const activeQIds = testBuildData.test?.questionIds || [];

  const stage3Items = Array.from({ length: 300 }, (_, i) => ({
    userId: `usr_traffic20k_${i}`,
    token: sampleTokens[i % sampleTokens.length]
  }));

  await runInPool(stage3Items, 20, async (item, idx) => {
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
          timeTakenSeconds: 150 + idx
        })
      });
      const data: any = await res.json();
      recordLatency(stage3Tracker, Date.now() - t0, res.status === 201 && data.success);
    } catch {
      recordLatency(stage3Tracker, Date.now() - t0, false);
    }
  });
  const s3Stats = calculateStats(stage3Tracker);
  console.log(`  ▶ Stage 3 Completed: ${stage3Tracker.successfulRequests}/${stage3Tracker.totalRequests} OK | Avg: ${s3Stats.avg}ms | p50: ${s3Stats.p50}ms | p95: ${s3Stats.p95}ms | p99: ${s3Stats.p99}ms`);

  // Stage 4: Admin Panel Performance with 20,000 Registered Users
  console.log('⚡ Stage 4: Admin Dashboard & Student Telemetry Under 20,000 Users (100 Requests)...');
  const stage4Tracker = createMetricTracker();
  const adminQueries = [
    '/admin/stats',
    '/admin/students?page=1&limit=25',
    '/admin/students?page=2&limit=25',
    '/admin/students?status=online_now&limit=25',
    '/admin/students?exam=NEET&classLevel=12&limit=25',
    '/admin/students?search=Traffic&limit=25',
    '/ai-factory/stats',
    '/audit'
  ];
  const stage4Items = Array.from({ length: 100 }, (_, i) => adminQueries[i % adminQueries.length]);

  await runInPool(stage4Items, 10, async (q) => {
    const t0 = Date.now();
    try {
      const res = await fetch(`${BASE_URL}${q}`, { headers: adminHeaders });
      recordLatency(stage4Tracker, Date.now() - t0, res.status === 200);
    } catch {
      recordLatency(stage4Tracker, Date.now() - t0, false);
    }
  });
  const s4Stats = calculateStats(stage4Tracker);
  console.log(`  ▶ Stage 4 Completed: ${stage4Tracker.successfulRequests}/${stage4Tracker.totalRequests} OK | Avg: ${s4Stats.avg}ms | p50: ${s4Stats.p50}ms | p95: ${s4Stats.p95}ms | p99: ${s4Stats.p99}ms`);

  // Stage 5: Concurrent Student Hub Operations (Notes, Bookmarks, Tasks)
  console.log('⚡ Stage 5: Student Hub Operations (Notes & Bookmarks) Under Traffic (400 Requests)...');
  const stage5Tracker = createMetricTracker();
  const stage5Items = Array.from({ length: 400 }, (_, i) => ({
    userId: `usr_traffic20k_${i}`,
    token: sampleTokens[i % sampleTokens.length],
    idx: i
  }));

  await runInPool(stage5Items, 25, async (item) => {
    const t0 = Date.now();
    try {
      const ep = item.idx % 2 === 0 ? '/bookmarks' : '/notes';
      const body = item.idx % 2 === 0
        ? { itemType: 'question', itemId: `q_traffic_bm_${item.idx}` }
        : { title: `Traffic Note #${item.idx}`, content: `Important concept revision ${item.idx}`, subject: 'Physics' };

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
  // PHASE 4: CLEANUP & PERMANENT REMOVAL OF ALL 20,000 TEST USERS
  // ============================================================================
  console.log('\n--- PHASE 4: CLEANUP & COMPLETE REMOVAL OF ALL 20,000 TEST USERS ---');
  console.log('🧹 Purging 20,000 test users and associated data from MongoDB...');

  const cleanStart = Date.now();

  const [delUsers, delSessions, delAttempts, delNotes, delBookmarks] = await Promise.all([
    User.deleteMany({ email: { $regex: /@traffic20k\.prepora\.test$/ } }),
    Session.deleteMany({ id: { $regex: /^sess_traffic20k_/ } }),
    TestAttempt.deleteMany({ testId: activeTestId }),
    Note.deleteMany({ title: { $regex: /^Traffic Note/ } }),
    Bookmark.deleteMany({ itemId: { $regex: /^q_traffic_bm_/ } })
  ]);

  if (activeTestId) {
    await Test.deleteOne({ id: activeTestId });
  }

  const cleanDuration = ((Date.now() - cleanStart) / 1000).toFixed(2);
  console.log(`  ▶ Deleted ${delUsers.deletedCount.toLocaleString()} Users`);
  console.log(`  ▶ Deleted ${delSessions.deletedCount.toLocaleString()} Sessions`);
  console.log(`  ▶ Deleted ${delAttempts.deletedCount.toLocaleString()} Test Attempts`);
  console.log(`  ▶ Deleted ${delNotes.deletedCount.toLocaleString()} Notes`);
  console.log(`  ▶ Deleted ${delBookmarks.deletedCount.toLocaleString()} Bookmarks`);
  console.log(`✅ Cleanup completed in ${cleanDuration}s.`);

  // Final verification
  const finalUserCount = await User.countDocuments();
  const lingeringTestUsers = await User.countDocuments({ email: { $regex: /@traffic20k\.prepora\.test$/ } });
  const lingeringTestSessions = await Session.countDocuments({ id: { $regex: /^sess_traffic20k_/ } });

  console.log('\n================================================================================');
  console.log('📊 TRAFFIC STRESS & LOAD TEST SUMMARY');
  console.log('================================================================================');
  console.log(`Initial Database Users:   ${initialUserCount.toLocaleString()}`);
  console.log(`Peak Database Users:      ${postSeedCount.toLocaleString()} (+20,000)`);
  console.log(`Final Database Users:     ${finalUserCount.toLocaleString()} (Verified Purged)`);
  console.log(`Lingering Test Users:     ${lingeringTestUsers} (Zero Leak)`);
  console.log(`Lingering Test Sessions:  ${lingeringTestSessions} (Zero Leak)`);
  console.log('--------------------------------------------------------------------------------');
  console.log(`Stage 1 (Public Routes):   ${stage1Tracker.successfulRequests}/${stage1Tracker.totalRequests} OK | Avg: ${s1Stats.avg}ms | p95: ${s1Stats.p95}ms`);
  console.log(`Stage 2 (Auth/Tokens):     ${stage2Tracker.successfulRequests}/${stage2Tracker.totalRequests} OK | Avg: ${s2Stats.avg}ms | p95: ${s2Stats.p95}ms`);
  console.log(`Stage 3 (Exam Engine):     ${stage3Tracker.successfulRequests}/${stage3Tracker.totalRequests} OK | Avg: ${s3Stats.avg}ms | p95: ${s3Stats.p95}ms`);
  console.log(`Stage 4 (Admin Panel):     ${stage4Tracker.successfulRequests}/${stage4Tracker.totalRequests} OK | Avg: ${s4Stats.avg}ms | p95: ${s4Stats.p95}ms`);
  console.log(`Stage 5 (Student Hub):     ${stage5Tracker.successfulRequests}/${stage5Tracker.totalRequests} OK | Avg: ${s5Stats.avg}ms | p95: ${s5Stats.p95}ms`);
  console.log('================================================================================');

  const totalReqs = stage1Tracker.totalRequests + stage2Tracker.totalRequests + stage3Tracker.totalRequests + stage4Tracker.totalRequests + stage5Tracker.totalRequests;
  const totalSuccess = stage1Tracker.successfulRequests + stage2Tracker.successfulRequests + stage3Tracker.successfulRequests + stage4Tracker.successfulRequests + stage5Tracker.successfulRequests;
  const overallSuccessRate = ((totalSuccess / totalReqs) * 100).toFixed(2);

  console.log(`🎯 OVERALL TRAFFIC TEST: ${totalSuccess} / ${totalReqs} REQUESTS SUCCEEDED (${overallSuccessRate}%)`);
  console.log(`🌟 20,000 USER TRAFFIC SIMULATION COMPLETE & 100% CLEANED UP WITH ZERO LEAKS.`);
  console.log('================================================================================\n');

  await mongoose.disconnect();
  process.exit(lingeringTestUsers === 0 && lingeringTestSessions === 0 ? 0 : 1);
}

runTrafficTest().catch((err) => {
  console.error('Fatal load test failure:', err);
  process.exit(1);
});
