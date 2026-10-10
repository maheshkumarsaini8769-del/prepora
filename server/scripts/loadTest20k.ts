/**
 * Prepora High-Concurrency Stress Test Benchmark
 * Dispatches 20,000 requests to verify server throughput, low latency, and stability under heavy student traffic
 */

import http from 'http';

const TOTAL_REQUESTS = 20000;
const CONCURRENCY = 100; // 100 simultaneous concurrent workers
const SERVER_URL = process.env.TEST_SERVER_URL || 'http://127.0.0.1:5001';

const ENDPOINTS = [
  '/',
  '/api/health',
  '/api/formulas',
  '/api/syllabus',
  '/api/telemetry'
];

interface BenchmarkResult {
  total: number;
  successful: number;
  failed: number;
  latencies: number[];
  startTime: number;
  endTime: number;
}

const sendSingleRequest = (url: string): Promise<{ statusCode: number; latencyMs: number; cacheHit: boolean; size: number }> => {
  return new Promise((resolve) => {
    const start = process.hrtime.bigint();
    const req = http.get(url, {
      headers: {
        'Accept-Encoding': 'gzip, deflate',
        'User-Agent': 'Prepora-LoadTest-Runner/1.0'
      }
    }, (res) => {
      let bodyLength = 0;
      res.on('data', (chunk) => {
        bodyLength += chunk.length;
      });
      res.on('end', () => {
        const end = process.hrtime.bigint();
        const latencyMs = Number(end - start) / 1_000_000;
        const cacheHit = res.headers['x-cache'] === 'HIT';
        resolve({
          statusCode: res.statusCode || 0,
          latencyMs,
          cacheHit,
          size: bodyLength
        });
      });
    });

    req.on('error', (_err) => {
      const end = process.hrtime.bigint();
      const latencyMs = Number(end - start) / 1_000_000;
      resolve({
        statusCode: 500,
        latencyMs,
        cacheHit: false,
        size: 0
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ statusCode: 408, latencyMs: 10000, cacheHit: false, size: 0 });
    });
  });
};

async function runBenchmark() {
  console.log(`\n===============================================================`);
  console.log(`🚀 PREPORA HIGH-CONCURRENCY 20,000 REQUESTS BENCHMARK`);
  console.log(`===============================================================`);
  console.log(`Target Server:      ${SERVER_URL}`);
  console.log(`Total Requests:     ${TOTAL_REQUESTS.toLocaleString()}`);
  console.log(`Concurrency Limit:  ${CONCURRENCY} simultaneous connections`);
  console.log(`Simulation Target:  5 Lakh Active Students Scale`);
  console.log(`===============================================================\n`);

  const results: BenchmarkResult = {
    total: TOTAL_REQUESTS,
    successful: 0,
    failed: 0,
    latencies: [],
    startTime: Date.now(),
    endTime: 0
  };

  let completedCount = 0;
  let requestIndex = 0;

  // Worker loop
  async function worker() {
    while (requestIndex < TOTAL_REQUESTS) {
      const currentIdx = requestIndex++;
      const endpoint = ENDPOINTS[currentIdx % ENDPOINTS.length];
      const targetUrl = `${SERVER_URL}${endpoint}`;

      const res = await sendSingleRequest(targetUrl);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        results.successful++;
      } else {
        results.failed++;
      }
      results.latencies.push(res.latencyMs);

      completedCount++;
      if (completedCount % 4000 === 0 || completedCount === TOTAL_REQUESTS) {
        const pct = ((completedCount / TOTAL_REQUESTS) * 100).toFixed(0);
        const elapsed = (Date.now() - results.startTime) / 1000;
        const currentRps = (completedCount / elapsed).toFixed(0);
        console.log(`[Progress ${pct}%] ${completedCount.toLocaleString()} / ${TOTAL_REQUESTS.toLocaleString()} completed (${currentRps} req/sec)`);
      }
    }
  }

  // Launch CONCURRENCY workers simultaneously
  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  results.endTime = Date.now();
  const totalSeconds = (results.endTime - results.startTime) / 1000;
  const rps = results.total / totalSeconds;

  results.latencies.sort((a, b) => a - b);
  const minLatency = results.latencies[0] || 0;
  const maxLatency = results.latencies[results.latencies.length - 1] || 0;
  const avgLatency = results.latencies.reduce((a, b) => a + b, 0) / results.latencies.length;
  const p50 = results.latencies[Math.floor(results.latencies.length * 0.50)];
  const p95 = results.latencies[Math.floor(results.latencies.length * 0.95)];
  const p99 = results.latencies[Math.floor(results.latencies.length * 0.99)];
  const successRate = ((results.successful / results.total) * 100).toFixed(2);

  console.log(`\n===============================================================`);
  console.log(`📊 20,000 REQUESTS BENCHMARK REPORT`);
  console.log(`===============================================================`);
  console.log(`Total Requests:         ${results.total.toLocaleString()}`);
  console.log(`Successful (200 OK):    ${results.successful.toLocaleString()} (${successRate}%)`);
  console.log(`Failed / Errors:        ${results.failed}`);
  console.log(`Total Time Taken:       ${totalSeconds.toFixed(2)} seconds`);
  console.log(`Throughput (RPS):       ${rps.toFixed(1)} requests/second`);
  console.log(`Average Latency:        ${avgLatency.toFixed(2)} ms`);
  console.log(`Median (P50) Latency:   ${p50.toFixed(2)} ms`);
  console.log(`95th Percentile (P95):  ${p95.toFixed(2)} ms`);
  console.log(`99th Percentile (P99):  ${p99.toFixed(2)} ms`);
  console.log(`Min Latency:            ${minLatency.toFixed(2)} ms`);
  console.log(`Max Latency:            ${maxLatency.toFixed(2)} ms`);
  console.log(`===============================================================`);

  if (results.failed === 0) {
    console.log(`✅ VERIFICATION PASSED: Server handled 20,000 requests with 100% success rate!`);
  } else {
    console.log(`⚠️ Some requests failed. Review server error logs.`);
  }
}

runBenchmark().catch(console.error);
