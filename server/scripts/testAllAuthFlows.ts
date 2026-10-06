const BASE_URL = 'http://localhost:5001/api';

async function testAuth() {
  console.log('================================================================');
  console.log('🔒 PREPORA 100% COMPLETE AUTHENTICATION FLOW VERIFICATION');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  async function check(name: string, fn: () => Promise<boolean>) {
    total++;
    process.stdout.write(`[${total}] Testing: ${name}... `);
    try {
      const ok = await fn();
      if (ok) {
        console.log('✅ PASSED');
        passed++;
      } else {
        console.log('❌ FAILED');
      }
    } catch (e: any) {
      console.log(`❌ ERROR: ${e.message}`);
    }
  }

  // 1. Student Login via Email
  let studentToken = '';
  await check('Student Login via Email (aarav.student@prepora.test)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
    });
    const data: any = await res.json();
    if (res.ok && data.success && data.token) {
      studentToken = data.token;
      return true;
    }
    return false;
  });

  // 2. Student Login with Invalid Password (Must be 401 with clear message)
  await check('Student Login with Invalid Password (401 expected)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'WrongPassword999!' })
    });
    const data: any = await res.json();
    return res.status === 401 && data.success === false && data.message.includes('password');
  });

  // 3. WhatsApp OTP Dispatch (/auth/send-otp)
  const testPhone = '9876543210';
  let receivedOtp = '';
  await check('WhatsApp OTP Dispatch for Mobile (/auth/send-otp)', async () => {
    const res = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: testPhone })
    });
    const data: any = await res.json();
    if (res.ok && data.success) {
      receivedOtp = data.debugOtp || data.otp || '9999';
      return true;
    }
    return false;
  });

  // 4. WhatsApp OTP Verify & Auto-Register (/auth/verify-otp)
  let phoneUserToken = '';
  await check('WhatsApp OTP Verify & Register (/auth/verify-otp)', async () => {
    const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mobile: testPhone,
        otp: receivedOtp,
        name: 'Priya Sharma',
        targetExam: 'NEET'
      })
    });
    const data: any = await res.json();
    if (res.ok && data.success && data.token) {
      phoneUserToken = data.token;
      return true;
    }
    return false;
  });

  // 5. Set Password for Phone User (/auth/set-password)
  const phonePassword = 'PriyaPassword2026!';
  await check('Set Password for Phone User (/auth/set-password)', async () => {
    const res = await fetch(`${BASE_URL}/auth/set-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${phoneUserToken}`
      },
      body: JSON.stringify({ newPassword: phonePassword })
    });
    const data: any = await res.json();
    return res.ok && data.success;
  });

  // 6. Student Login via Phone + Password
  await check('Student Login via Phone + Password (9876543210)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: testPhone, password: phonePassword })
    });
    const data: any = await res.json();
    return res.ok && data.success && !!data.token;
  });

  // 7. Admin Login via Email
  await check('Admin Login via Email (admin@prepora.com)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@prepora.com', password: 'mahesh99830' })
    });
    const data: any = await res.json();
    return res.ok && data.success && data.token && data.user.role === 'admin';
  });

  // 8. Super Admin Login via Owner Phone (7742735762)
  await check('Super Admin Login via Owner Phone (7742735762)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '7742735762', password: 'mahesh99830' })
    });
    const data: any = await res.json();
    return res.ok && data.success && !!data.token && data.user.role === 'admin';
  });

  // 9. Token Validation (/auth/me) with student token
  await check('Active Session Token Check (/auth/me)', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const data: any = await res.json();
    return res.ok && data.success && data.user.email === 'aarav.student@prepora.test';
  });

  // 10. Token Validation (/auth/me) with invalid token (Must be 401)
  await check('Forged / Fake Token Check (401 expected)', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer fake_forged_jwt_token_123` }
    });
    return res.status === 401;
  });

  // 11. Forgot Password via Email (/auth/forgot-password)
  await check('Forgot Password via Email (/auth/forgot-password)', async () => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test' })
    });
    const data: any = await res.json();
    return res.ok && data.success;
  });

  // 12. Forgot Password via WhatsApp Mobile (/auth/forgot-password/send-otp)
  await check('Forgot Password via WhatsApp Mobile (/auth/forgot-password/send-otp)', async () => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: testPhone })
    });
    const data: any = await res.json();
    return res.ok && data.success;
  });

  // 13. Multi-Device Concurrent Active Sessions
  await check('Multi-Device Concurrency (Device 1 + Device 2 simultaneously active)', async () => {
    // Device 1 login
    const d1 = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
    }).then(r => r.json());

    // Device 2 login
    const d2 = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
    }).then(r => r.json());

    // Both must be 200 OK
    const chk1 = await fetch(`${BASE_URL}/auth/me`, { headers: { Authorization: `Bearer ${d1.token}` } });
    const chk2 = await fetch(`${BASE_URL}/auth/me`, { headers: { Authorization: `Bearer ${d2.token}` } });

    return chk1.status === 200 && chk2.status === 200;
  });

  // 14. Active Sessions List (/auth/sessions)
  await check('Student Active Sessions List (/auth/sessions)', async () => {
    const res = await fetch(`${BASE_URL}/auth/sessions`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const data: any = await res.json();
    return res.ok && data.success && Array.isArray(data.sessions);
  });

  // 15. Logout (/auth/logout)
  await check('Single Session Logout (/auth/logout)', async () => {
    // Temporary login to logout
    const temp = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
    }).then(r => r.json());

    const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${temp.token}` }
    });
    const logoutData: any = await logoutRes.json();

    // Verify logged-out session now returns 401
    const verifyRevoked = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${temp.token}` }
    });

    return logoutRes.ok && logoutData.success && verifyRevoked.status === 401;
  });

  console.log('\n================================================================');
  console.log(`AUTH TEST RESULTS: ${passed}/${total} PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('================================================================');

  if (passed !== total) process.exit(1);
}

testAuth();
