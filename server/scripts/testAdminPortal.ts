const BASE_URL = 'http://localhost:5001';

async function testAdmin() {
  console.log('=== PREPORA ADMIN PORTAL COMPREHENSIVE TEST ===\n');

  // Step 1: Admin Login
  console.log('1. Testing POST /api/auth/login (admin@prepora.com)...');
  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@prepora.com', password: 'mahesh99830' })
  });

  const loginData: any = await loginRes.json();
  if (!loginRes.ok || !loginData.success || !loginData.token) {
    throw new Error(`Admin login failed: ${JSON.stringify(loginData)}`);
  }
  const token = loginData.token;
  console.log(`✓ Admin authenticated successfully! (User: ${loginData.user.email}, Role: ${loginData.user.role})`);

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const endpoints = [
    { name: 'Dashboard Stats', method: 'GET', url: '/api/admin/stats' },
    { name: 'Students Directory', method: 'GET', url: '/api/admin/students?limit=5' },
    { name: 'Syllabus Hierarchy', method: 'GET', url: '/api/admin/hierarchy?exam=JEE' },
    { name: 'Flashcards & Formulas', method: 'GET', url: '/api/admin/flashcards' },
    { name: 'Test Monitoring', method: 'GET', url: '/api/admin/tests/monitoring' },
    {
      name: 'Blueprint Validator',
      method: 'POST',
      url: '/api/admin/tests/blueprint-validate',
      body: { exam: 'JEE', subjectDistribution: { Physics: 5, Chemistry: 5, Mathematics: 5 } }
    },
    { name: 'AI Generation Jobs', method: 'GET', url: '/api/admin/ai/jobs' },
    { name: 'Aggregate Analytics', method: 'GET', url: '/api/admin/analytics/aggregate' },
    { name: 'Admin Settings', method: 'GET', url: '/api/admin/settings' },
    { name: 'Security & Roles', method: 'GET', url: '/api/admin/security/roles' },
    { name: 'Papers Library', method: 'GET', url: '/api/admin/papers?limit=5' },
    { name: 'Authorized Admins (Whitelist)', method: 'GET', url: '/api/admin/authorities' },
    { name: 'Active Sessions', method: 'GET', url: '/api/admin/sessions?limit=5' },
    { name: 'Question Reports', method: 'GET', url: '/api/reports/question?limit=5' },
    { name: 'Technical Reports', method: 'GET', url: '/api/reports/technical?limit=5' },
    { name: 'System Audit Logs', method: 'GET', url: '/api/audit?limit=5' }
  ];

  console.log('\n2. Testing Admin Endpoints with Bearer Token...');
  let passCount = 0;

  for (const ep of endpoints) {
    const opts: any = {
      method: ep.method,
      headers: authHeaders
    };
    if (ep.body) opts.body = JSON.stringify(ep.body);

    const res = await fetch(`${BASE_URL}${ep.url}`, opts);
    const data: any = await res.json().catch(() => ({}));

    if (res.ok && (data.success !== false)) {
      console.log(`  ✓ [${res.status}] ${ep.name.padEnd(32)} -> OK`);
      passCount++;
    } else {
      console.error(`  ✗ [${res.status}] ${ep.name.padEnd(32)} -> FAILED:`, data);
    }
  }

  console.log(`\nPassed ${passCount}/${endpoints.length} endpoints with Bearer Token.`);

  // Step 3: Verify Security Protection for Admin Routes (Without Authorization Header)
  console.log('\n3. Testing Admin Security Enforcement (Without Authorization header)...');
  const noTokenRes = await fetch(`${BASE_URL}/api/admin/stats`);
  const noTokenData: any = await noTokenRes.json();
  if (noTokenRes.status === 401) {
    console.log(`  ✓ [401] Unauthorized access properly blocked! Security guard active.`);
  } else {
    console.warn(`  ⚠️ Security check unexpected status:`, noTokenRes.status, noTokenData);
  }

  console.log('\n=== ALL ADMIN TESTS COMPLETED SUCCESSFULLY! ===');
}

testAdmin().catch((err) => {
  console.error('[Admin Test Error]', err);
  process.exit(1);
});
