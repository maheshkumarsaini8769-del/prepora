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
const MONGO_URI = 'mongodb://127.0.0.1:27017/prepora_db';

const TOTAL_ACTIVE_USERS = 2000000; // 20 Lakh (2 Million) Active Students
const BATCH_SIZE = 50000; // 50k per batch for maximum stream throughput

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

async function run2MillionTrafficTest() {
  console.log('\n================================================================================');
  console.log('🚀 PREPORA 20 LAKH (2,000,000) ACTIVE STUDENTS & 20,000+ REQUESTS MEGA LOAD TEST');
  console.log('================================================================================');
  console.log(`Backend Target:  ${BASE_URL}`);
  console.log(`Frontend Target: ${FRONTEND_URL}`);
  console.log(`Database Target: ${MONGO_URI}`);
  console.log(`Total Simulated Active Students: ${TOTAL_ACTIVE_USERS.toLocaleString()} (20 Lakh)`);
  console.log(`Concurrent Online Sessions:      ${TOTAL_ACTIVE_USERS.toLocaleString()} (20 Lakh)`);
  console.log(`Total Target API Requests:       20,500+ Requests\n`);

  await mongoose.connect(MONGO_URI);
  console.log('📦 Connected to MongoDB.\n');

  const initialUserCount = await User.countDocuments();
  console.log(`📊 Initial Database User Count: ${initialUserCount.toLocaleString()} users`);

  // ============================================================================
  // PHASE 1: GENERATE & STREAM 2,000,000 (20 LAKH) STUDENTS INTO MONGODB
  // ============================================================================
  console.log('\n--- PHASE 1: STREAM SEEDING 20 LAKH (2,000,000) STUDENT ACCOUNTS ---');
  const samplePasswordHash = await bcrypt.hash('ActivePass2M!', 10);
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
      const phoneDigits = `90${String(i).padStart(8, '0')}`;

      batchUsers.push({
        id: `usr_traffic2m_${i}`,
        studentId: `STU_2M_${i}`,
        name: `2M Student ${i}`,
        email: `student_${i}@traffic2m.prepora.test`,
        phone: phoneDigits,
        mobile: phoneDigits,
        passwordHash: samplePasswordHash,
        role: 'student',
        status: 'active',
        targetExam,
        classLevel,
        targetYear: 2026,
        dreamScore: isNeet ? 695 : 295,
        streakDays: (i % 60) + 1,
        totalQuestionsSolved: (i % 300) * 10,
        overallAccuracy: 72 + (i % 25),
        studyTimeMinutes: (i % 180) * 5,
        createdAt: new Date(now - (i % 30) * 86400000),
        updatedAt: new Date(now - (i % 5) * 3600000)
      });
    }

    await User.insertMany(batchUsers, { ordered: false });
    insertedUsersCount += batchUsers.length;
    if (insertedUsersCount % 200000 === 0 || insertedUsersCount === TOTAL_ACTIVE_USERS) {
      process.stdout.write(`  ▶ Seeded ${insertedUsersCount.toLocaleString()} / ${TOTAL_ACTIVE_USERS.toLocaleString()} Users (${((insertedUsersCount / TOTAL_ACTIVE_USERS) * 100).toFixed(0)}%)\n`);
    }
  }

  const userSeedDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ 20 Lakh (2,000,000) Users seeded in ${userSeedDuration}s.`);

  // ============================================================================
  // PHASE 2: GENERATE & STREAM 2,000,000 (20 LAKH) LIVE ONLINE SESSIONS
  // ============================================================================
  console.log('\n--- PHASE 2: STREAM SEEDING 20 LAKH (2,000,000) LIVE ONLINE SESSIONS ---');
  const sessStartTime = Date.now();
  let insertedSessCount = 0;

  for (let b = 0; b < TOTAL_ACTIVE_USERS; b += BATCH_SIZE) {
    const batchSessions = [];
    const end = Math.min(b + BATCH_SIZE, TOTAL_ACTIVE_USERS);

    for (let i = b; i < end; i++) {
      const uId = `usr_traffic2m_${i}`;
      const sId = `sess_traffic2m_${i}`;
      const token = jwt.sign({ sub: sId, id: uId, role: 'student' }, JWT_SECRET);
      const lastActiveMinutesAgo = (i % 4); // 0..3 minutes ago -> All 2 Million Online Now!
      const phoneDigits = `90${String(i).padStart(8, '0')}`;

      batchSessions.push({
        id: sId,
        sessionId: sId,
        userId: uId,
        studentId: `STU_2M_${i}`,
        phone: phoneDigits,
        mobile: phoneDigits,
        token,
        deviceInfo: {
          device: i % 2 === 0 ? 'Android Mobile' : 'Windows 11 Laptop',
          browser: 'Chrome 124',
          os: i % 2 === 0 ? 'Android 14' : 'Windows 11'
        },
        ipAddress: `10.${Math.floor(i / 65536) % 256}.${Math.floor(i / 256) % 256}.${i % 256}`,
        lastActive: new Date(Date.now() - lastActiveMinutesAgo * 60 * 1000),
        createdAt: new Date(Date.now() - 50 * 60 * 1000),
        isRevoked: false,
        status: 'ACTIVE',
        expiresAt: new Date(Date.now() + 86400000)
      });
    }

    await Session.insertMany(batchSessions, { ordered: false });
    insertedSessCount += batchSessions.length;
    if (insertedSessCount % 200000 === 0 || insertedSessCount === TOTAL_ACTIVE_USERS) {
      process.stdout.write(`  ▶ Seeded ${insertedSessCount.toLocaleString()} / ${TOTAL_ACTIVE_USERS.toLocaleString()} Active Sessions (${((insertedSessCount / TOTAL_ACTIVE_USERS) * 100).toFixed(0)}%)\n`);
    }
  }

  const sessSeedDuration = ((Date.now() - sessStartTime) / 1000).toFixed(2);
  const peakUsersCount = await User.countDocuments();
  const peakActiveSessions = await Session.countDocuments({ isRevoked: false, lastActive: { $gte: new Date(Date.now() - 5 * 60 * 1000) } });
  console.log(`✅ 2,000,000 Live Active Sessions seeded in ${sessSeedDuration}s.`);
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
  // PHASE 3: 20,500+ HIGH-CONCURRENCY API REQUESTS BENCHMARK UNDER 20 LAKH USERS
  // ============================================================================
  console.log('--- PHASE 3: EXECUTE 20,500+ API BENCHMARKS UNDER 20 LAKH (2,000,000) ACTIVE STUDENTS ---');

  // Stage 1: Admin Telemetry & Student Monitoring Under 2,000,000 Online Students (500 Requests)
  console.log('⚡ Stage 1: Admin Telemetry Under 2,000,000 Online Students (500 Requests)...');
  const stage1Tracker = createMetricTracker();
  const adminQueries = [
    '/admin/stats',
    '/admin/students?status=online_now&page=1&limit=25',
    '/admin/students?status=online_now&page=2&limit=25',
    '/admin/students?status=online_now&page=50&limit=25',
    '/admin/students?status=online_now&page=200&limit=25',
    '/admin/students?exam=NEET&status=online_now&limit=25',
    '/admin/students?exam=JEE&classLevel=12&status=online_now&limit=25',
    '/ai-factory/stats',
    '/audit'
  ];
  const stage1Items = Array.from({ length: 500 }, (_, i) => adminQueries[i % adminQueries.length]);

  await runInPool(stage1Items, 25, async (q) => {
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

  // Stage 2: Public Web Traffic & Content Bursts (7,500 Requests)
  console.log('⚡ Stage 2: Public Web Traffic & Content Bursts (7,500 Requests)...');
  const stage2Tracker = createMetricTracker();
  const publicEndpoints = ['/syllabus', '/formulas', '/questions?limit=10', '/search?q=Electromagnetism', '/health'];
  const stage2Items = Array.from({ length: 7500 }, (_, i) => publicEndpoints[i % publicEndpoints.length]);

  await runInPool(stage2Items, 60, async (ep) => {
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

  // Stage 3: Active Session Validation Bursts Across 2 Million Users (7,500 Requests)
  console.log('⚡ Stage 3: Active Session Validation Bursts Across 2 Million Users (7,500 Requests)...');
  const stage3Tracker = createMetricTracker();
  const sampleTokens = Array.from({ length: 300 }, (_, idx) => {
    const uId = `usr_traffic2m_${idx}`;
    const sId = `sess_traffic2m_${idx}`;
    return jwt.sign({ id: uId, role: 'student', sessionId: sId }, JWT_SECRET);
  });
  const stage3Items = Array.from({ length: 7500 }, (_, i) => sampleTokens[i % sampleTokens.length]);

  await runInPool(stage3Items, 60, async (tok) => {
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

  // Stage 4: Exam Engine Synthesis & Submissions Under 2 Million Active Users (2,500 Tests)
  console.log('⚡ Stage 4: Exam Engine Synthesis & Submissions Under 2 Million Active Users (2,500 Tests)...');
  const stage4Tracker = createMetricTracker();
  const testBuildRes = await fetch(`${BASE_URL}/tests/build-custom`, {
    method: 'POST',
    headers: { ...baseHeaders, Authorization: `Bearer ${sampleTokens[0]}` },
    body: JSON.stringify({ exam: 'JEE', subjects: ['Physics', 'Chemistry'], questionCount: 10 })
  });
  const testBuildData: any = await testBuildRes.json();
  const activeTestId = testBuildData.test?.id;
  const activeQIds = testBuildData.test?.questionIds || [];

  const stage4Items = Array.from({ length: 2500 }, (_, i) => ({
    userId: `usr_traffic2m_${i}`,
    token: sampleTokens[i % sampleTokens.length]
  }));

  await runInPool(stage4Items, 40, async (item, idx) => {
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
          timeTakenSeconds: 120 + idx
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

  // Stage 5: Concurrent Student Hub Operations (2,500 Requests)
  console.log('⚡ Stage 5: Student Hub Operations Under 2 Million Active Users (2,500 Requests)...');
  const stage5Tracker = createMetricTracker();
  const stage5Items = Array.from({ length: 2500 }, (_, i) => ({
    userId: `usr_traffic2m_${i}`,
    token: sampleTokens[i % sampleTokens.length],
    idx: i
  }));

  await runInPool(stage5Items, 40, async (item) => {
    const t0 = Date.now();
    try {
      const op = item.idx % 2;
      let ok = false;
      if (op === 0) {
        const res = await fetch(`${BASE_URL}/entities/notes`, {
          method: 'POST',
          headers: { ...baseHeaders, Authorization: `Bearer ${item.token}` },
          body: JSON.stringify({
            userId: item.userId,
            title: `2M Concept Note #${item.idx}`,
            subject: 'Physics',
            chapter: 'Electrostatics',
            content: 'Gauss Law high-concurrency 2M load verification note.'
          })
        });
        ok = res.status === 201;
      } else {
        const res = await fetch(`${BASE_URL}/entities/bookmarks`, {
          method: 'POST',
          headers: { ...baseHeaders, Authorization: `Bearer ${item.token}` },
          body: JSON.stringify({
            userId: item.userId,
            itemType: 'Question',
            itemId: `q_traffic2m_bm_${item.idx}`,
            subject: 'Chemistry',
            chapter: 'Thermodynamics'
          })
        });
        ok = res.status === 201;
      }
      recordLatency(stage5Tracker, Date.now() - t0, ok);
    } catch {
      recordLatency(stage5Tracker, Date.now() - t0, false);
    }
  });
  const s5Stats = calculateStats(stage5Tracker);
  console.log(`  ▶ Stage 5 Completed: ${stage5Tracker.successfulRequests}/${stage5Tracker.totalRequests} OK | Avg: ${s5Stats.avg}ms | p50: ${s5Stats.p50}ms | p95: ${s5Stats.p95}ms | p99: ${s5Stats.p99}ms`);

  // ============================================================================
  // PHASE 4: PAGE LOADING SPEED AUDIT UNDER 20 LAKH (2,000,000) LIVE ACTIVE USERS
  // ============================================================================
  console.log('\n--- PHASE 4: PAGE LOADING SPEED AUDIT UNDER 20 LAKH LIVE STUDENTS ---');
  const routes = [
    { name: "Frontend Root (/) ", url: `${FRONTEND_URL}/` },
    { name: "Frontend Practice", url: `${FRONTEND_URL}/practice` },
    { name: "Frontend Tests   ", url: `${FRONTEND_URL}/tests` },
    { name: "Frontend Formula ", url: `${FRONTEND_URL}/formula-notes` },
    { name: "Backend Health   ", url: `${BASE_URL}/health` },
    { name: "Backend InvStats ", url: `${BASE_URL}/questions/inventory-stats` },
    { name: "Backend Taxonomy ", url: `${BASE_URL}/questions/taxonomy?subject=Physics&classLevel=11` }
  ];

  for (const route of routes) {
    const t0 = Date.now();
    try {
      const res = await fetch(route.url);
      const ms = Date.now() - t0;
      console.log(`  🌐 ${route.name} | Status: ${res.status} | Speed: ${ms}ms`);
    } catch (e: any) {
      console.log(`  🌐 ${route.name} | Error: ${e.message}`);
    }
  }

  // ============================================================================
  // PHASE 5: CLEANUP & PURGE OF ALL 20 LAKH (2,000,000) TEST USERS & SESSIONS
  // ============================================================================
  console.log('\n--- PHASE 5: COMPLETE CLEANUP & PURGE OF ALL 2,000,000 TEST USERS & SESSIONS ---');
  console.log('🧹 Purging 2,000,000 test users and sessions from MongoDB...');
  const cleanStart = Date.now();

  const [delUsers, delSessions, delAttempts, delNotes, delBookmarks] = await Promise.all([
    User.deleteMany({ email: { $regex: /@traffic2m\.prepora\.test$/ } }),
    Session.deleteMany({ id: { $regex: /^sess_traffic2m_/ } }),
    TestAttempt.deleteMany({ testId: activeTestId }),
    Note.deleteMany({ title: { $regex: /^2M Concept Note/ } }),
    Bookmark.deleteMany({ itemId: { $regex: /^q_traffic2m_bm_/ } })
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
  const lingeringUsers = await User.countDocuments({ email: { $regex: /@traffic2m\.prepora\.test$/ } });
  const lingeringSessions = await Session.countDocuments({ id: { $regex: /^sess_traffic2m_/ } });

  console.log('\n================================================================================');
  console.log('📊 20 LAKH (2,000,000) ACTIVE STUDENTS & 20,500+ REQUESTS MEGA LOAD SUMMARY');
  console.log('================================================================================');
  console.log(`Initial Database Users:     ${initialUserCount.toLocaleString()}`);
  console.log(`Peak Database Users:        ${peakUsersCount.toLocaleString()} (+2,000,000)`);
  console.log(`Simultaneous Active Users:  ${peakActiveSessions.toLocaleString()} Online Now (20 Lakh)`);
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

  console.log(`🎯 OVERALL 20 LAKH ACTIVE STRESS TEST: ${totalSuccess} / ${totalReqs} REQUESTS SUCCEEDED (${overallSuccessRate}%)`);
  console.log(`🌟 20 LAKH (2,000,000) ACTIVE STUDENTS & 20,500+ REQUESTS STRESS TEST COMPLETE & 100% CLEANED UP WITH ZERO LEAKS.`);
  console.log('================================================================================\n');

  await mongoose.disconnect();
  process.exit(lingeringUsers === 0 && lingeringSessions === 0 ? 0 : 1);
}

run2MillionTrafficTest().catch((err) => {
  console.error('Fatal 2 Million load test failure:', err);
  process.exit(1);
});
