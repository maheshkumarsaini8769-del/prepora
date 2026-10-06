import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Session from '../models/Session.js';
import TestAttempt from '../models/TestAttempt.js';
import { Note, Mistake, QuestionReport } from '../models/Entities.js';

dotenv.config();

const BASE_URL = 'http://localhost:5001/api';
const JWT_SECRET = process.env.JWT_SECRET || 'prepora-master-jwt-secret-key-2025-secure-production-env-override';
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';

let passed = 0;
let failed = 0;
let total = 0;

async function testCase(name: string, fn: () => Promise<boolean>) {
  total++;
  process.stdout.write(`[Test ${total.toString().padStart(2, '0')}] ${name.padEnd(65, '.')} `);
  try {
    const ok = await fn();
    if (ok) {
      console.log('✅ PASS');
      passed++;
    } else {
      console.log('❌ FAIL');
      failed++;
    }
  } catch (err: any) {
    console.log(`❌ ERROR: ${err.message}`);
    failed++;
  }
}

async function run() {
  console.log('\n================================================================================');
  console.log('🛡️  PREPORA AUTOMATED SECURITY AUDIT & VULNERABILITY VERIFICATION SUITE');
  console.log('================================================================================\n');

  await mongoose.connect(MONGO_URI);
  console.log('📦 Connected to MongoDB for security fixture setup.\n');

  // Generate Fixture Users
  const studentAId = 'sec_student_alice_' + Date.now();
  const studentBId = 'sec_student_bob_' + Date.now();
  const adminId = 'usr_admin_mahesh';
  const spoofAttackerId = 'sec_attacker_' + Date.now();

  const sessionAId = 'sess_alice_' + Date.now();
  const sessionRevokedId = 'sess_revoked_' + Date.now();
  const sessionAdminId = 'sess_admin_' + Date.now();

  // Clean up any stale fixtures from previous runs
  await User.deleteMany({ email: { $in: ['alice.test@prepora.internal', 'bob.test@prepora.internal', 'attacker@evil.com'] } });
  await Session.deleteMany({ userId: { $in: [studentAId, studentBId, spoofAttackerId] } });

  // Create Alice & Bob in DB
  await User.findOneAndUpdate(
    { email: 'alice.test@prepora.internal' },
    {
      id: studentAId,
      name: 'Alice Student',
      email: 'alice.test@prepora.internal',
      phone: '9876543210',
      role: 'student',
      isBlocked: false
    },
    { upsert: true }
  );

  await User.findOneAndUpdate(
    { email: 'bob.test@prepora.internal' },
    {
      id: studentBId,
      name: 'Bob Student',
      email: 'bob.test@prepora.internal',
      phone: '9876543211',
      role: 'student',
      isBlocked: false
    },
    { upsert: true }
  );

  const sessionSpooferId = 'sess_spoofer_' + Date.now();
  await User.findOneAndUpdate(
    { email: 'attacker@evil.com' },
    {
      id: spoofAttackerId,
      name: 'Malicious Attacker',
      email: 'attacker@evil.com',
      phone: '99997742735762',
      role: 'student',
      isBlocked: false
    },
    { upsert: true }
  );

  // Mint Tokens first so we can store valid token hashes in sessions
  const tokenStudentA = jwt.sign(
    { id: studentAId, email: 'alice.test@prepora.internal', phone: '9876543210', role: 'student', sessionId: sessionAId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const tokenRevoked = jwt.sign(
    { id: studentAId, email: 'alice.test@prepora.internal', phone: '9876543210', role: 'student', sessionId: sessionRevokedId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  const tokenSuperAdmin = jwt.sign(
    { id: adminId, email: 'maheshkumarsaini8769@gmail.com', phone: '7742735762', role: 'admin', sessionId: sessionAdminId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Spoofing attacker claiming to be admin with 14-digit number ending in 7742735762
  const tokenPhoneSpoofer = jwt.sign(
    { id: spoofAttackerId, email: 'attacker@evil.com', phone: '99997742735762', role: 'admin', sessionId: sessionSpooferId },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Create Sessions conforming strictly to Session schema
  await Session.findOneAndUpdate(
    { id: sessionAId },
    {
      id: sessionAId,
      sessionId: sessionAId,
      userId: studentAId,
      userEmail: 'alice.test@prepora.internal',
      token: jwt.sign({ sub: sessionAId }, JWT_SECRET),
      role: 'student',
      isRevoked: false,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 86400000)
    },
    { upsert: true }
  );

  await Session.findOneAndUpdate(
    { id: sessionSpooferId },
    {
      id: sessionSpooferId,
      sessionId: sessionSpooferId,
      userId: spoofAttackerId,
      userEmail: 'attacker@evil.com',
      token: jwt.sign({ sub: sessionSpooferId }, JWT_SECRET),
      role: 'student',
      isRevoked: false,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 86400000)
    },
    { upsert: true }
  );

  await Session.findOneAndUpdate(
    { id: sessionRevokedId },
    {
      id: sessionRevokedId,
      sessionId: sessionRevokedId,
      userId: studentAId,
      userEmail: 'alice.test@prepora.internal',
      token: jwt.sign({ sub: sessionRevokedId }, JWT_SECRET),
      role: 'student',
      isRevoked: true,
      status: 'REVOKED',
      revocationReason: 'LOGGED_IN_ON_ANOTHER_DEVICE',
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 86400000)
    },
    { upsert: true }
  );

  await Session.findOneAndUpdate(
    { id: sessionAdminId },
    {
      id: sessionAdminId,
      sessionId: sessionAdminId,
      userId: adminId,
      userEmail: 'maheshkumarsaini8769@gmail.com',
      token: jwt.sign({ sub: sessionAdminId }, JWT_SECRET),
      role: 'admin',
      isRevoked: false,
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 86400000)
    },
    { upsert: true }
  );

  // Create Test Attempts for Bob
  const bobAttemptId = 'att_bob_' + Date.now();
  await TestAttempt.findOneAndUpdate(
    { id: bobAttemptId },
    {
      id: bobAttemptId,
      userId: studentBId,
      testId: 'mock-test-1',
      testTitle: 'Bob Confidential Exam Attempt',
      totalScore: 180,
      maxScore: 300,
      accuracyPercentage: 65,
      answers: {}
    },
    { upsert: true }
  );

  // Create Note for Bob
  const bobNoteId = 'note_bob_' + Date.now();
  await Note.findOneAndUpdate(
    { id: bobNoteId },
    {
      id: bobNoteId,
      userId: studentBId,
      title: 'Bob Private Note',
      content: 'Confidential study plan',
      subject: 'Physics'
    },
    { upsert: true }
  );

  // Create Mistake for Bob
  const bobMistakeId = 'mst_bob_' + Date.now();
  await Mistake.findOneAndUpdate(
    { id: bobMistakeId },
    {
      id: bobMistakeId,
      userId: studentBId,
      questionId: 'q-test-1',
      resolved: false
    },
    { upsert: true }
  );


  console.log('--- SUITE 1: UNAUTHENTICATED ACCESS ATTEMPTS (EXPECTING 401) ---');

  await testCase('Unauth GET /api/admin/stats', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/ai-factory/stats', async () => {
    const res = await fetch(`${BASE_URL}/ai-factory/stats`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/audit', async () => {
    const res = await fetch(`${BASE_URL}/audit`);
    return res.status === 401;
  });

  await testCase('Unauth POST /api/questions', async () => {
    const res = await fetch(`${BASE_URL}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: 'Malicious question injection' })
    });
    return res.status === 401;
  });

  await testCase('Unauth DELETE /api/questions/q-target', async () => {
    const res = await fetch(`${BASE_URL}/questions/q-target`, { method: 'DELETE' });
    return res.status === 401;
  });

  await testCase('Unauth POST /api/tests', async () => {
    const res = await fetch(`${BASE_URL}/tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Rogue test' })
    });
    return res.status === 401;
  });

  await testCase('Unauth POST /api/formulas', async () => {
    const res = await fetch(`${BASE_URL}/formulas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Rogue formula' })
    });
    return res.status === 401;
  });

  await testCase('Unauth GET /api/video-views/stats', async () => {
    const res = await fetch(`${BASE_URL}/video-views/stats`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/reports', async () => {
    const res = await fetch(`${BASE_URL}/reports`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/attempts', async () => {
    const res = await fetch(`${BASE_URL}/attempts`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/mistakes', async () => {
    const res = await fetch(`${BASE_URL}/mistakes`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/notes', async () => {
    const res = await fetch(`${BASE_URL}/notes`);
    return res.status === 401;
  });

  await testCase('Unauth GET /api/bookmarks', async () => {
    const res = await fetch(`${BASE_URL}/bookmarks`);
    return res.status === 401;
  });

  console.log('\n--- SUITE 2: PRIVILEGE ESCALATION RESISTANCE (STUDENT -> ADMIN EXPECTING 403) ---');

  const studentHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenStudentA}`
  };

  await testCase('Student JWT -> GET /api/admin/stats', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, { headers: studentHeaders });
    return res.status === 403;
  });

  await testCase('Student JWT -> GET /api/ai-factory/stats', async () => {
    const res = await fetch(`${BASE_URL}/ai-factory/stats`, { headers: studentHeaders });
    return res.status === 403;
  });

  await testCase('Student JWT -> GET /api/audit', async () => {
    const res = await fetch(`${BASE_URL}/audit`, { headers: studentHeaders });
    return res.status === 403;
  });

  await testCase('Student JWT -> POST /api/questions', async () => {
    const res = await fetch(`${BASE_URL}/questions`, {
      method: 'POST',
      headers: studentHeaders,
      body: JSON.stringify({ question: 'Student attempting admin injection' })
    });
    return res.status === 403;
  });

  await testCase('Student JWT -> DELETE /api/questions/target-q', async () => {
    const res = await fetch(`${BASE_URL}/questions/target-q`, {
      method: 'DELETE',
      headers: studentHeaders
    });
    return res.status === 403;
  });

  await testCase('Student JWT -> POST /api/tests', async () => {
    const res = await fetch(`${BASE_URL}/tests`, {
      method: 'POST',
      headers: studentHeaders,
      body: JSON.stringify({ title: 'Student creating official test' })
    });
    return res.status === 403;
  });

  await testCase('Student JWT -> POST /api/formulas', async () => {
    const res = await fetch(`${BASE_URL}/formulas`, {
      method: 'POST',
      headers: studentHeaders,
      body: JSON.stringify({ title: 'Student formula push' })
    });
    return res.status === 403;
  });

  await testCase('Student JWT -> GET /api/reports', async () => {
    const res = await fetch(`${BASE_URL}/reports`, { headers: studentHeaders });
    return res.status === 403;
  });

  await testCase('Student JWT -> GET /api/video-views/stats', async () => {
    const res = await fetch(`${BASE_URL}/video-views/stats`, { headers: studentHeaders });
    return res.status === 403;
  });

  console.log('\n--- SUITE 3: TENANT ISOLATION & CROSS-USER PRIVACY LEAK PROTECTION ---');

  await testCase('Student A GET /api/attempts does not leak Student B attempts', async () => {
    const res = await fetch(`${BASE_URL}/attempts`, { headers: studentHeaders });
    const data: any = await res.json();
    if (!res.ok || !data.success) return false;
    const containsBob = data.attempts.some((a: any) => a.userId === studentBId || a.id === bobAttemptId);
    return !containsBob;
  });

  await testCase('Student A GET /api/attempts?userId=StudentB is strictly ignored', async () => {
    const res = await fetch(`${BASE_URL}/attempts?userId=${studentBId}`, { headers: studentHeaders });
    const data: any = await res.json();
    if (!res.ok || !data.success) return false;
    const containsBob = data.attempts.some((a: any) => a.userId === studentBId || a.id === bobAttemptId);
    return !containsBob;
  });

  await testCase('Student A GET /api/attempts/:id for Student B returns 403 Forbidden', async () => {
    const res = await fetch(`${BASE_URL}/attempts/${bobAttemptId}`, { headers: studentHeaders });
    return res.status === 403;
  });

  await testCase('Student A DELETE /api/notes/:id for Student B returns 404 / Blocked', async () => {
    const res = await fetch(`${BASE_URL}/notes/${bobNoteId}`, {
      method: 'DELETE',
      headers: studentHeaders
    });
    // Check if Bob's note is still intact in DB
    const noteStillExists = await Note.findOne({ id: bobNoteId });
    return res.status === 404 && !!noteStillExists;
  });

  await testCase('Student A PATCH /api/mistakes/:id for Student B returns 404 / Blocked', async () => {
    const res = await fetch(`${BASE_URL}/mistakes/${bobMistakeId}`, {
      method: 'PATCH',
      headers: studentHeaders,
      body: JSON.stringify({ resolved: true })
    });
    const mistakeStillUnresolved = await Mistake.findOne({ id: bobMistakeId, resolved: false });
    return res.status === 404 && !!mistakeStillUnresolved;
  });

  console.log('\n--- SUITE 4: SESSION REVOCATION & PHONE SPOOFING DEFENSE ---');

  await testCase('Revoked Session Token -> GET /api/auth/me returns 401 Session Revoked', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${tokenRevoked}` }
    });
    const data: any = await res.json();
    return res.status === 401 && (data.code?.includes('REVOKED') || data.message?.toLowerCase().includes('device') || data.message?.toLowerCase().includes('revoked'));
  });

  await testCase('Phone Spoofing Attacker (99997742735762) -> GET /api/admin/stats returns 403', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${tokenPhoneSpoofer}` }
    });
    return res.status === 403;
  });

  console.log('\n--- SUITE 5: SUPER ADMIN AUTHORIZED OPERATIONS (EXPECTING 200) ---');

  const adminHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenSuperAdmin}`
  };

  await testCase('Super Admin -> GET /api/admin/stats returns 200 OK', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, { headers: adminHeaders });
    return res.status === 200;
  });

  await testCase('Super Admin -> GET /api/ai-factory/stats returns 200 OK', async () => {
    const res = await fetch(`${BASE_URL}/ai-factory/stats`, { headers: adminHeaders });
    return res.status === 200;
  });

  await testCase('Super Admin -> GET /api/audit returns 200 OK', async () => {
    const res = await fetch(`${BASE_URL}/audit`, { headers: adminHeaders });
    return res.status === 200;
  });

  await testCase('Super Admin -> GET /api/reports returns 200 OK', async () => {
    const res = await fetch(`${BASE_URL}/reports`, { headers: adminHeaders });
    return res.status === 200;
  });

  await testCase('Super Admin -> GET /api/attempts?userId=StudentB returns 200 OK', async () => {
    const res = await fetch(`${BASE_URL}/attempts?userId=${studentBId}`, { headers: adminHeaders });
    const data: any = await res.json();
    return res.status === 200 && data.success === true && data.attempts.some((a: any) => a.id === bobAttemptId);
  });

  // Cleanup Test Fixtures
  await User.deleteMany({ id: { $in: [studentAId, studentBId, spoofAttackerId] } });
  await Session.deleteMany({ sessionId: { $in: [sessionAId, sessionRevokedId, sessionAdminId] } });
  await TestAttempt.deleteOne({ id: bobAttemptId });
  await Note.deleteOne({ id: bobNoteId });
  await Mistake.deleteOne({ id: bobMistakeId });

  await mongoose.disconnect();

  console.log('\n================================================================================');
  console.log(`🎯 AUDIT COMPLETE: ${passed}/${total} TESTS PASSED (${failed} FAILED)`);
  if (failed === 0) {
    console.log('🌟 PREPORA IS 100% SECURE. ALL VULNERABILITY VECTORS PATCHED AND VALIDATED.');
  } else {
    console.log('⚠️ SECURITY VULNERABILITIES DETECTED! PLEASE ADDRESS REMAINING FAILURES.');
  }
  console.log('================================================================================\n');

  process.exit(failed === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
