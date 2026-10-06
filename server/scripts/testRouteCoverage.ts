import app from '../index.js';

interface RouteInfo {
  path: string;
  methods: string[];
}

function getRoutes(app: any): RouteInfo[] {
  const routes: RouteInfo[] = [];

  function print(path: string[], layer: any) {
    if (layer.route) {
      routes.push({
        path: path.concat(split(layer.route.path)).filter(Boolean).join('/'),
        methods: Object.keys(layer.route.methods).map(m => m.toUpperCase())
      });
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach((subLayer: any) => {
        print(path.concat(split(layer.regexp.source)), subLayer);
      });
    }
  }

  function split(thing: any) {
    if (typeof thing === 'string') {
      return thing.split('/');
    } else if (thing.fast_slash) {
      return '';
    } else {
      const match = thing
        .toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^\\\/([^$]+)\\\$\//);
      return match ? match[1].replace(/\\\//g, '/').split('/') : '';
    }
  }

  if (app._router && app._router.stack) {
    app._router.stack.forEach((layer: any) => {
      print([], layer);
    });
  }

  return routes;
}

const registered = getRoutes(app);
console.log(`Discovered ${registered.length} registered routes.`);

// Let's test calling all critical client endpoints
const clientCalls = [
  // Auth
  { method: 'POST', path: '/api/auth/login' },
  { method: 'GET', path: '/api/auth/me' },
  { method: 'POST', path: '/api/auth/register' },
  { method: 'POST', path: '/api/auth/send-otp' },
  { method: 'POST', path: '/api/auth/verify-otp' },
  { method: 'GET', path: '/api/auth/sessions' },
  { method: 'POST', path: '/api/auth/logout' },
  { method: 'POST', path: '/api/auth/logout-other-devices' },
  { method: 'POST', path: '/api/auth/forgot-password' },
  { method: 'POST', path: '/api/auth/forgot-password/send-otp' },
  { method: 'POST', path: '/api/auth/forgot-password/verify-reset' },
  { method: 'POST', path: '/api/auth/set-password' },
  { method: 'POST', path: '/api/auth/change-password' },
  // Content & Study
  { method: 'GET', path: '/api/bookmarks' },
  { method: 'GET', path: '/api/mistakes' },
  { method: 'GET', path: '/api/lectures' },
  { method: 'GET', path: '/api/lectures/discovery' },
  { method: 'GET', path: '/api/lectures/health' },
  { method: 'GET', path: '/api/formulas' },
  { method: 'GET', path: '/api/syllabus' },
  { method: 'GET', path: '/api/search?q=physics' },
  { method: 'GET', path: '/api/search/suggestions?q=kin' },
  { method: 'GET', path: '/api/papers' },
  { method: 'GET', path: '/api/questions?limit=5' },
  { method: 'GET', path: '/api/attempts' },
  { method: 'GET', path: '/api/planner' },
  // Reports
  { method: 'GET', path: '/api/reports/question' },
  { method: 'GET', path: '/api/reports/technical' },
  { method: 'GET', path: '/api/reports/feedback' },
  // Admin
  { method: 'GET', path: '/api/admin/stats' },
  { method: 'GET', path: '/api/admin/students' },
  { method: 'GET', path: '/api/admin/hierarchy' },
  { method: 'GET', path: '/api/admin/flashcards' },
  { method: 'GET', path: '/api/admin/papers' },
  { method: 'GET', path: '/api/admin/security/roles' },
  { method: 'GET', path: '/api/admin/authorities' },
  { method: 'GET', path: '/api/admin/settings' },
  { method: 'GET', path: '/api/admin/sessions' },
  { method: 'GET', path: '/api/admin/analytics/aggregate' },
  { method: 'GET', path: '/api/admin/tests/monitoring' },
  { method: 'GET', path: '/api/admin/users-overview' },
  { method: 'GET', path: '/api/audit' }
];

async function testAll() {
  console.log('\n--- VERIFYING ALL CLIENT ENDPOINTS AGAINST RUNNING BACKEND (PORT 5001) ---');
  let failures: any[] = [];
  let successes: any[] = [];

  for (const call of clientCalls) {
    try {
      const url = `http://localhost:5001${call.path}`;
      const res = await fetch(url, {
        method: call.method,
        headers: { 'Content-Type': 'application/json' },
        ...(call.method === 'POST' ? { body: JSON.stringify({}) } : {})
      });

      // 404 means the route does NOT exist at all!
      if (res.status === 404) {
        failures.push({ ...call, status: 404, message: 'Route Not Found (404)' });
        console.error(`❌ [404 NOT FOUND] ${call.method} ${call.path}`);
      } else {
        successes.push({ ...call, status: res.status });
        console.log(`✓ [${res.status}] ${call.method.padEnd(5)} ${call.path}`);
      }
    } catch (err: any) {
      failures.push({ ...call, status: 'ERROR', message: err.message });
      console.error(`❌ [CONNECTION ERROR] ${call.method} ${call.path}:`, err.message);
    }
  }

  console.log(`\n======================================================`);
  console.log(`Total Endpoints Tested: ${clientCalls.length}`);
  console.log(`Existing Endpoints:    ${successes.length}`);
  console.log(`Broken / 404 Endpoints: ${failures.length}`);
  console.log(`======================================================`);

  if (failures.length > 0) {
    console.error('\nFound broken endpoints:', failures);
    process.exit(1);
  }
}

testAll();
