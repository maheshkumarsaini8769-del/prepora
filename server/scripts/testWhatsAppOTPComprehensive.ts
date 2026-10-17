import 'dotenv/config';
import { whatsappOTPService } from '../services/whatsappOTPService.js';

/**
 * COMPREHENSIVE AUTOMATED TEST SUITE FOR DUAL-MODE WHATSAPP OTP SYSTEM
 * Verifies both:
 * 1. Demo Mode (9999 works for fast testing)
 * 2. Real Meta WhatsApp Cloud API integration
 * 3. Instant switchability between Demo & Live-Only modes
 */

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

async function runTest(name: string, fn: () => Promise<boolean | void> | boolean | void) {
  totalTests++;
  try {
    const res = await fn();
    if (res === false) {
      console.log(`❌ FAIL: ${name}`);
      failedTests++;
    } else {
      console.log(`✅ PASS: ${name}`);
      passedTests++;
    }
  } catch (err: any) {
    console.log(`❌ ERROR: ${name} -> ${err.message}`);
    failedTests++;
  }
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('🚀 RUNNING DUAL-MODE WHATSAPP OTP AUDIT & TESTS');
  console.log('====================================================\n');

  const testPhone = '7742735762';

  // TEST 1: DEMO MODE ACTIVE
  await runTest('Demo Mode: Entering 9999 must verify successfully when ALLOW_DEMO_OTP=true', () => {
    process.env.ALLOW_DEMO_OTP = 'true';
    const res = whatsappOTPService.verifyOTP(testPhone, '9999');
    return res.success === true && res.message.includes('Demo 9999 mode');
  });

  // TEST 2: SWITCHABILITY TEST (STRICT MODE ON DEMAND)
  await runTest('Instant Switch: When ALLOW_DEMO_OTP="false", 9999 is blocked', () => {
    process.env.ALLOW_DEMO_OTP = 'false';
    const res = whatsappOTPService.verifyOTP(testPhone, '9999');
    process.env.ALLOW_DEMO_OTP = 'true'; // Restore back to demo allowed
    return res.success === false;
  });

  // TEST 3: INVALID PHONE NUMBERS
  await runTest('Invalid Phone Number Rejection: Short numbers, non-Indian prefixes, repeated digits', () => {
    const invalidShort = whatsappOTPService.isValidIndianMobile('98765');
    const invalidPrefix = whatsappOTPService.isValidIndianMobile('1234567890');
    const invalidRepeated = whatsappOTPService.isValidIndianMobile('9999999999');
    const validNumber = whatsappOTPService.isValidIndianMobile(testPhone);

    return !invalidShort && !invalidPrefix && !invalidRepeated && validNumber;
  });

  // TEST 4: CREDENTIALS AVAILABILITY
  await runTest('Meta Credentials Availability: META_WHATSAPP_ACCESS_TOKEN and PHONE_NUMBER_ID loaded', () => {
    const isConfigured = whatsappOTPService.isConfigured();
    return isConfigured === true;
  });

  // TEST 5: COOLDOWN & OTP GENERATION
  const testPhone2 = '9876543210';
  await runTest('OTP Dispatch & 60s Resend Cooldown Enforcement', async () => {
    const firstSend = await whatsappOTPService.sendOTP(testPhone2);
    const secondSend = await whatsappOTPService.sendOTP(testPhone2);

    return (
      firstSend.success === true &&
      firstSend.debugOtp === '9999' &&
      secondSend.success === false &&
      typeof secondSend.cooldownSeconds === 'number' &&
      secondSend.cooldownSeconds > 0
    );
  });

  // TEST 6: CRYPTOGRAPHIC RECORD CREATED WITH SALT & EXPIRY
  await runTest('Server-Side Security: Real 6-digit OTP stored as SHA-256 hash with salt, 5-minute expiry', () => {
    const stored = whatsappOTPService._getStoredRecordForTesting(testPhone2);
    if (!stored) return false;

    const hasHash = typeof stored.hashedOTP === 'string' && stored.hashedOTP.length === 64;
    const hasSalt = typeof stored.salt === 'string' && stored.salt.length === 32;
    const ttlMs = stored.expiresAt - stored.createdAt;
    const is5Min = ttlMs === 5 * 60 * 1000;

    return hasHash && hasSalt && is5Min;
  });

  // TEST 7: INCORRECT OTP REJECTION & ATTEMPT COUNTING
  await runTest('Incorrect OTP Rejection: Mismatched code decrements attempts remaining', () => {
    const res = whatsappOTPService.verifyOTP(testPhone2, '112233');
    const stored = whatsappOTPService._getStoredRecordForTesting(testPhone2);

    return (
      res.success === false &&
      stored !== undefined &&
      stored.attempts === 1 &&
      res.message.includes('4 attempt(s) remaining')
    );
  });

  // TEST 8: MAX 5 ATTEMPTS BURNOUT
  await runTest('Max 5 Attempts Lockout: 5 failed attempts completely burns & deletes the OTP', () => {
    whatsappOTPService.verifyOTP(testPhone2, '111111'); // 2
    whatsappOTPService.verifyOTP(testPhone2, '222222'); // 3
    whatsappOTPService.verifyOTP(testPhone2, '333333'); // 4
    const finalFail = whatsappOTPService.verifyOTP(testPhone2, '444444'); // 5 -> Burn

    const stored = whatsappOTPService._getStoredRecordForTesting(testPhone2);
    return finalFail.success === false && stored === undefined;
  });

  // TEST 9: DUAL VERIFICATION: BOTH 9999 AND REAL OTP SUPPORTED CONCURRENTLY
  const testPhone3 = '9123456789';
  await runTest('Dual Support: 9999 works for quick login without interfering with real records', async () => {
    const verifyDemo = whatsappOTPService.verifyOTP(testPhone3, '9999');
    return verifyDemo.success === true;
  });

  // TEST 10: REAL META DISPATCH TO USER'S NUMBER
  console.log('\n--- Live Meta WhatsApp Cloud API Test ---');
  await runTest(`Live Meta API Dispatch to +91 ${testPhone}`, async () => {
    const res = await whatsappOTPService.sendOTP(testPhone);
    console.log('   Meta Dispatch Result:', res);
    return res.success === true;
  });

  console.log('\n====================================================');
  console.log(`SUMMARY: ${passedTests}/${totalTests} Tests Passed (${failedTests} Failed)`);
  console.log('====================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite();
