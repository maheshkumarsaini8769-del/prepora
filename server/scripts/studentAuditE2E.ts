import { chromium } from 'playwright';

const CHROME_PATH = '/home/mahesh/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
const BASE_URL = 'http://localhost:5555';
const API_URL = 'http://localhost:5001/api';

export interface AuditIssue {
  phase: string;
  page: string;
  viewport?: string;
  severity: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  description: string;
  element?: string;
}

const issues: AuditIssue[] = [];

async function runStudentAudit() {
  console.log('======================================================================');
  console.log('👨‍🎓 PREPORA COMPREHENSIVE HUMAN STUDENT AUDIT — AUTOMATED BROWSER QA');
  console.log('======================================================================\n');

  // Step 1: Login via API to get valid token & session
  console.log('1. Authenticating test student via API...');
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
  });
  const loginData = await loginRes.json();
  if (!loginData.success || !loginData.token) {
    throw new Error('Failed to obtain student token: ' + JSON.stringify(loginData));
  }
  const token = loginData.token;
  const user = loginData.user;
  console.log(`Authenticated as: ${user.name} (${user.email}) | Session: ${loginData.sessionId}\n`);

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  const context = await browser.newContext();

  const setupPageListeners = (p: any) => {
    p.on('console', (msg: any) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('favicon') && !text.includes('Failed to load resource') && !text.includes('ERR_CONNECTION_REFUSED')) {
          console.warn(`[CONSOLE ERROR] on ${p.url()}:`, text.substring(0, 160));
          issues.push({
            phase: 'Console Log Audit',
            page: p.url(),
            severity: 'P2',
            description: `Console error: ${text.substring(0, 150)}`
          });
        }
      }
    });

    p.on('pageerror', (err: any) => {
      console.error(`[PAGE CRASH] on ${p.url()}:`, err.message);
      issues.push({
        phase: 'Page Execution Error',
        page: p.url(),
        severity: 'P0',
        description: `Uncaught Page Error: ${err.message}`
      });
    });
  };

  // Initialize authentication in the browser context
  const initPage = await context.newPage();
  setupPageListeners(initPage);
  await initPage.goto(`${BASE_URL}/login`);
  await initPage.evaluate(({ token, user }) => {
    const fullUser = {
      ...user,
      preparationProfile: {
        ...(user.preparationProfile || {}),
        onboardingCompleted: true,
        preparationType: 'JEE',
        exam: 'JEE_MAIN',
        classLevel: '12',
        subjects: ['PHYSICS', 'CHEMISTRY', 'MATHEMATICS']
      }
    };
    localStorage.setItem('prepora_auth_token', token);
    localStorage.setItem('prepora_user', JSON.stringify(fullUser));
    localStorage.setItem('prepora_onboarding_completed', 'true');
    localStorage.setItem('prepora_preparation_profile', JSON.stringify(fullUser.preparationProfile));
  }, { token, user });

  await initPage.goto(`${BASE_URL}/`);
  await initPage.waitForLoadState('networkidle');
  console.log('Initial page loaded:', initPage.url(), 'Title:', await initPage.title());
  await initPage.close();

  // -------------------------------------------------------------
  // PHASE 3: MULTI-VIEWPORT RESPONSIVENESS & HORIZONTAL OVERFLOW
  // -------------------------------------------------------------
  console.log('\n======================================================================');
  console.log('📱 PHASE 3: MULTI-VIEWPORT RESPONSIVENESS & OVERFLOW CHECKS');
  console.log('======================================================================');

  const viewports = [
    { width: 320, height: 640, label: '320px (iPhone SE)' },
    { width: 360, height: 740, label: '360px (Android compact)' },
    { width: 375, height: 667, label: '375px (iPhone 8/SE)' },
    { width: 390, height: 844, label: '390px (iPhone 14/15)' },
    { width: 412, height: 915, label: '412px (Samsung/Pixel)' },
    { width: 768, height: 1024, label: '768px (Tablet portrait)' },
    { width: 1024, height: 768, label: '1024px (Tablet landscape/Laptop)' },
    { width: 1280, height: 800, label: '1280px (Standard laptop)' },
    { width: 1440, height: 900, label: '1440px (Desktop Full HD)' }
  ];

  const studentPages = [
    { path: '/', name: 'Home Dashboard' },
    { path: '/practice', name: 'Practice Hub' },
    { path: '/tests', name: 'Test Center' },
    { path: '/doubts', name: 'AI Doubt Center' },
    { path: '/mistakes', name: 'Mistake Book' },
    { path: '/lectures', name: 'One-Shot Lectures' },
    { path: '/formula-sheet', name: 'Formula Notes Hub' },
    { path: '/search', name: 'Study Search' },
    { path: '/performance', name: 'Performance Analytics' },
    { path: '/revision', name: 'Smart Revision' },
    { path: '/mind-map', name: 'Concept Mind Map' },
    { path: '/papers', name: 'Previous Year Papers' },
    { path: '/planner', name: 'Study Planner' },
    { path: '/daily-plan', name: 'Daily Plan' },
    { path: '/tutor', name: 'AI Teacher' },
    { path: '/syllabus', name: 'Syllabus Tracker' },
    { path: '/readiness', name: 'Exam Readiness' }
  ];

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.label} (${vp.width}x${vp.height})...`);
    const vpPage = await context.newPage();
    setupPageListeners(vpPage);
    await vpPage.setViewportSize({ width: vp.width, height: vp.height });

    for (const p of studentPages) {
      try {
        await vpPage.goto(`${BASE_URL}${p.path}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await vpPage.waitForTimeout(150);

        // Check for horizontal overflow
        const overflow = await vpPage.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const innerWidth = window.innerWidth;
          const hasOverflow = scrollWidth > innerWidth + 3; // 3px tolerance
          let overflowingElement = '';
          if (hasOverflow) {
            const all = document.querySelectorAll('*');
            for (const el of all) {
              const rect = el.getBoundingClientRect();
              if (rect.right > innerWidth + 5 && (el as HTMLElement).offsetWidth > 0) {
                overflowingElement = `${el.tagName.toLowerCase()}.${Array.from(el.classList).slice(0, 3).join('.')}`;
                break;
              }
            }
          }
          return {
            hasOverflow,
            scrollWidth,
            innerWidth,
            diff: scrollWidth - innerWidth,
            overflowingElement
          };
        });

        if (overflow.hasOverflow) {
          console.warn(`  ⚠️ OVERFLOW on ${p.name} (${p.path}) at ${vp.width}px: +${overflow.diff}px (Element: ${overflow.overflowingElement})`);
          issues.push({
            phase: 'Responsive Design (Overflow)',
            page: p.path,
            viewport: vp.label,
            severity: 'P2',
            description: `Horizontal overflow: scrollWidth=${overflow.scrollWidth}px vs innerWidth=${overflow.innerWidth}px (+${overflow.diff}px)`,
            element: overflow.overflowingElement
          });
        }

        // Check for broken text placeholders
        const badStrings = await vpPage.evaluate(() => {
          const text = document.body.innerText || '';
          const found = [];
          if (/\bundefined\b/.test(text)) found.push('undefined');
          if (/\bnull\b/.test(text) && !/null\s*hypothesis/i.test(text)) found.push('null');
          if (/\bNaN\b/.test(text)) found.push('NaN');
          if (/\[object Object\]/.test(text)) found.push('[object Object]');
          return found;
        });

        if (badStrings.length > 0) {
          console.warn(`  ⚠️ BAD STRING on ${p.name} (${p.path}): ${badStrings.join(', ')}`);
          issues.push({
            phase: 'Data Rendering',
            page: p.path,
            viewport: vp.label,
            severity: 'P2',
            description: `Unrendered data placeholder: ${badStrings.join(', ')}`
          });
        }
      } catch (err: any) {
        console.error(`  ❌ Failed checking ${p.path} at ${vp.width}px:`, err.message);
      }
    }
    await vpPage.close();
  }

  // -------------------------------------------------------------
  // PHASE 4-29: DEEP FUNCTIONAL WORKFLOW AUDIT
  // -------------------------------------------------------------
  console.log('\n======================================================================');
  console.log('🧪 PHASES 4-29: DEEP FUNCTIONAL WORKFLOW AUDIT');
  console.log('======================================================================');
  const page = await context.newPage();
  setupPageListeners(page);
  await page.setViewportSize({ width: 1280, height: 800 });

  // 1. Home Dashboard Checklist & Actions (Phases 5, 8)
  console.log('\nTesting Home Dashboard (Today\'s Plan, Countdown, Navigation)...');
  await page.goto(`${BASE_URL}/`);
  await page.waitForTimeout(600);

  const countdownText = await page.evaluate(() => {
    const el = document.body;
    return el?.innerText.includes('JEE') || el?.innerText.includes('NEET') || false;
  });
  console.log('  Exam countdown badge rendered:', countdownText);

  // Toggle Today's Plan task
  const taskCheckbox = await page.$('input[type="checkbox"]');
  if (taskCheckbox) {
    const isCheckedBefore = await taskCheckbox.isChecked();
    await taskCheckbox.click();
    await page.waitForTimeout(300);
    const isCheckedAfter = await taskCheckbox.isChecked();
    console.log(`  Today's plan checklist toggle: ${isCheckedBefore} -> ${isCheckedAfter}`);
  }

  // 2. Practice Flow: Question Solver & Answer Checking (Phase 12)
  console.log('\nTesting Practice Solver Flow...');
  await page.goto(`${BASE_URL}/practice/session`);
  await page.waitForTimeout(1000);

  // Target the actual option button inside question card
  const optionBtn = page.locator('button.w-full:has(span.rounded-xl)').first();
  if (await optionBtn.isVisible()) {
    console.log('  Clicking question option A...');
    await optionBtn.click();
    await page.waitForTimeout(400);

    const checkBtn = page.locator('button:has-text("Check Answer")');
    if (await checkBtn.isVisible() && await checkBtn.isEnabled()) {
      await checkBtn.click();
      await page.waitForTimeout(600);
      console.log('  Check Answer clicked successfully!');

      // Check if explanation or Next Question button appeared
      const nextBtn = page.locator('button:has-text("Next Question")');
      const hasNext = await nextBtn.isVisible();
      console.log('  Next Question button visible:', hasNext);
      if (hasNext) {
        await nextBtn.click();
        await page.waitForTimeout(500);
        console.log('  Moved to next question successfully.');
      }
    }
  }

  // 2B. Continue Learning (Phase 7)
  console.log('\nTesting Continue Learning (Phase 7)...');
  await page.goto(`${BASE_URL}/`);
  await page.waitForTimeout(800);
  const continueCard = page.locator('div:has-text("Continue Learning")').first();
  const hasContinueCard = await continueCard.isVisible();
  console.log('  Continue Learning card visible on Home:', hasContinueCard);
  if (hasContinueCard) {
    const resumeBtn = page.locator('button:has-text("Resume Learning")').first();
    if (await resumeBtn.isVisible()) {
      await resumeBtn.click();
      await page.waitForTimeout(800);
      console.log('  Resume Learning navigated back to:', page.url());
    }
  }

  // 3. Test Center: Test Instructions & Start (Phase 13)
  console.log('\nTesting Test Center...');
  await page.goto(`${BASE_URL}/tests`);
  await page.waitForTimeout(800);
  const takeTestBtn = page.locator('button:has-text("Take Test"), a:has-text("Take Test")').first();
  if (await takeTestBtn.isVisible()) {
    console.log('  Clicking Take Test CTA button on Test Center...');
    await takeTestBtn.click().catch(() => null);
    await page.waitForTimeout(800);
    console.log('  Navigated to:', page.url());
  }

  // 4. Mistake Book & Weak Topics (Phases 6, 14)
  console.log('\nTesting Mistake Book...');
  await page.goto(`${BASE_URL}/mistakes`);
  await page.waitForTimeout(800);
  const mistakePageHeading = await page.$('h1:has-text("Mistake"), h2:has-text("Mistake")');
  console.log('  Mistake book heading exists:', !!mistakePageHeading);

  // 5. Formula Sheet Drill-Down & KaTeX Math (Phase 15)
  console.log('\nTesting Formula Notes Hub...');
  await page.goto(`${BASE_URL}/formula-sheet`);
  await page.waitForTimeout(800);
  const kinematicsAccordion = page.locator('button:has-text("Kinematics")').first();
  if (await kinematicsAccordion.isVisible()) {
    await kinematicsAccordion.click();
    await page.waitForTimeout(500);
    console.log('  Kinematics accordion expanded.');
  }
  const mathFormula = await page.$('.katex, [data-katex]');
  console.log('  KaTeX math equations present in Formula Sheet:', !!mathFormula);

  // 6. Video Lectures (Phase 16)
  console.log('\nTesting Video Lectures...');
  await page.goto(`${BASE_URL}/lectures`);
  await page.waitForTimeout(800);
  const videoCards = await page.$$('iframe, button:has-text("Watch"), a:has-text("Watch")');
  console.log(`  Video cards/players found: ${videoCards.length}`);

  // 7. Universal Search (Phase 17)
  console.log('\nTesting Universal Search with "Kinematics"...');
  await page.goto(`${BASE_URL}/search?q=Kinematics`);
  await page.waitForTimeout(800);
  const searchResultsText = await page.evaluate(() => document.body.innerText);
  const hasKinematics = searchResultsText.toLowerCase().includes('kinematics');
  console.log('  Universal search returned relevant results for "Kinematics":', hasKinematics);

  // Test no-result search (Phase 17)
  console.log('Testing Universal Search with no-result query "xyzabc123"...');
  await page.goto(`${BASE_URL}/search?q=xyzabc123`);
  await page.waitForTimeout(800);
  const noResultClean = await page.evaluate(() => {
    const text = document.body.innerText.toLowerCase();
    return text.includes('no result') || text.includes('found 0') || text.includes('not found') || text.includes('koi');
  });
  console.log('  Clean no-result state returned for bogus query:', noResultClean);

  // 8. AI Doubt Solver (Phase 18)
  console.log('\nTesting AI Doubt Center...');
  await page.goto(`${BASE_URL}/doubts`);
  await page.waitForTimeout(800);
  const doubtInput = await page.$('textarea, input[placeholder*="doubt" i]');
  console.log('  AI doubt input box found:', !!doubtInput);

  // 9. Floating Feedback Modal
  console.log('\nTesting Student Feedback Floating Trigger & Modal...');
  const feedbackBtn = await page.$('aside button:has-text("Feedback"), aside button:has-text("Report")');
  if (feedbackBtn) {
    await feedbackBtn.click();
    await page.waitForTimeout(500);
    const feedbackModalHeading = await page.$('h3:has-text("PREPORA")');
    console.log('  Feedback modal opened cleanly:', !!feedbackModalHeading);
    if (feedbackModalHeading) {
      const closeBtn = await page.$('div button:has(svg), button:has-text("X")');
      if (closeBtn) await closeBtn.click({ timeout: 2000 }).catch(() => null);
    }
  }

  // 10. Concept Mind Map
  console.log('\nTesting Concept Mind Map...');
  await page.goto(`${BASE_URL}/mind-map`);
  await page.waitForTimeout(1000);
  const mindMapCanvas = await page.$('svg, .mindmap-canvas, div:has-text("Node"), button:has-text("Physics")');
  console.log('  Mind Map controls & canvas loaded:', !!mindMapCanvas);

  // 11. Single Active Session Security Enforcement (Phase 20)
  console.log('\nTesting Multi-Device Concurrent Session Support (Phone + Laptop)...');
  // Simulate login on another device for Aarav
  const secondLoginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'aarav.student@prepora.test', password: 'Password123!' })
  });
  const secondLoginData = await secondLoginRes.json();
  console.log('  Second device login succeeded. New Session ID:', secondLoginData.sessionId);

  // Now trigger an authenticated API call in the first browser window - verify it is STILL active and NOT kicked out!
  const sessionCheck = await page.evaluate(async () => {
    const t = localStorage.getItem('prepora_auth_token');
    const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } });
    const json = await res.json().catch(() => null);
    return { status: res.status, json };
  });
  console.log('  First device API response after second login (Must be 200 OK):', sessionCheck.status);

  // Verify second device is also active
  const secondDeviceCheck = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${secondLoginData.token}` }
  });
  console.log('  Second device API response (Must be 200 OK):', secondDeviceCheck.status);

  if (sessionCheck.status !== 200 || secondDeviceCheck.status !== 200) {
    issues.push({
      phase: 'Multi-Device Sessions',
      page: '/api/auth/me',
      severity: 'P1',
      description: `Cross-device concurrent session failed: first device=${sessionCheck.status}, second device=${secondDeviceCheck.status}`
    });
  } else {
    console.log('  ✓ Multi-device concurrent session verified: Both phone and laptop remain authenticated simultaneously!');
  }

  await browser.close();

  // -------------------------------------------------------------
  // AUDIT SUMMARY & ISSUES CONSOLIDATION
  // -------------------------------------------------------------
  console.log('\n======================================================================');
  console.log('📊 AUDIT SUMMARY: ALL TEST PHASES COMPLETE');
  console.log('======================================================================');
  console.log(`Total Issues Discovered: ${issues.length}\n`);

  issues.forEach((iss, i) => {
    console.log(`[${iss.severity}] #${i + 1} (${iss.phase}) on ${iss.page} ${iss.viewport ? `[${iss.viewport}]` : ''}:`);
    console.log(`     ${iss.description}`);
    if (iss.element) console.log(`     Element: ${iss.element}`);
  });

  return issues;
}

runStudentAudit()
  .then(res => {
    console.log(`\nAudit completed with ${res.length} findings.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal audit failure:', err);
    process.exit(1);
  });
