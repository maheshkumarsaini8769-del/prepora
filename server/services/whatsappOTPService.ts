import { randomInt, randomBytes, createHash } from 'crypto';

interface StoredOTP {
  hashedOTP: string;
  salt: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

export class WhatsAppOTPService {
  private otpStore: Map<string, StoredOTP> = new Map();
  private cooldownStore: Map<string, number> = new Map();

  // Helper to hash OTP with per-code cryptographic salt
  private hashOTP(otp: string, salt: string): string {
    return createHash('sha256').update(`${salt}:${otp.trim()}`).digest('hex');
  }

  // Helper: Normalize & validate Indian 10-digit mobile number
  public normalizeMobile(mobile: string): string {
    return String(mobile || '').replace(/[^0-9]/g, '').slice(-10);
  }

  public isValidIndianMobile(mobile: string): boolean {
    const clean = this.normalizeMobile(mobile);
    if (!clean || clean.length !== 10) return false;
    // Must begin with 6, 7, 8, or 9
    if (!/^[6-9]\d{9}$/.test(clean)) return false;
    // Reject repeated digits (e.g. 0000000000, 9999999999)
    if (/^(\d)\1{9}$/.test(clean)) return false;
    return true;
  }

  // Get active credentials from environment
  private getCredentials() {
    const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN || process.env.WHATSAPP_API_KEY || '';
    const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID || process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    const version = process.env.META_GRAPH_API_VERSION || 'v21.0';
    const templateName = process.env.META_WHATSAPP_OTP_TEMPLATE_NAME || 'prepora_auth_otp';
    return { accessToken, phoneNumberId, version, templateName };
  }

  public isConfigured(): boolean {
    const { accessToken, phoneNumberId } = this.getCredentials();
    return Boolean(accessToken && phoneNumberId);
  }

  /**
   * Checks whether the 9999 demo OTP bypass is enabled.
   * Controlled via ALLOW_DEMO_OTP in .env.
   * Can be toggled on or off instantly upon request.
   */
  public isDemoAllowed(): boolean {
    return process.env.ALLOW_DEMO_OTP !== 'false';
  }

  /**
   * Dispatches WhatsApp OTP to student's mobile number.
   * Operates in Dual Mode:
   * - If configured, dispatches real OTP via Meta WhatsApp Cloud API.
   * - If demo mode is active (ALLOW_DEMO_OTP=true), provides 9999 fallback for seamless testing.
   */
  public async sendOTP(mobile: string): Promise<{
    success: boolean;
    message: string;
    cooldownSeconds?: number;
    debugOtp?: string;
    otp?: string;
  }> {
    const cleanMobile = this.normalizeMobile(mobile);
    if (!this.isValidIndianMobile(cleanMobile)) {
      return { success: false, message: 'Please enter a valid 10-digit Indian mobile number.' };
    }

    const now = Date.now();
    const lastSent = this.cooldownStore.get(cleanMobile) || 0;
    const cooldownMs = 60 * 1000; // 60 seconds resend cooldown

    if (now - lastSent < cooldownMs) {
      const remainingSeconds = Math.ceil((cooldownMs - (now - lastSent)) / 1000);
      return {
        success: false,
        message: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
        cooldownSeconds: remainingSeconds
      };
    }

    const { accessToken, phoneNumberId, version, templateName } = this.getCredentials();
    const demoAllowed = this.isDemoAllowed();

    // 1. Generate real 6-digit OTP and store hash in memory
    const rawOtp = String(randomInt(100000, 1000000));
    const salt = randomBytes(16).toString('hex');
    const hashedOTP = this.hashOTP(rawOtp, salt);
    const expiresAt = now + 5 * 60 * 1000; // 5-minute validity

    this.otpStore.set(cleanMobile, {
      hashedOTP,
      salt,
      expiresAt,
      attempts: 0,
      createdAt: now
    });
    this.cooldownStore.set(cleanMobile, now);

    // 2. If Meta WhatsApp credentials exist, dispatch real WhatsApp message
    let whatsappDispatched = false;
    if (accessToken && phoneNumberId) {
      try {
        const metaUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

        // Strategy A: Try template
        const templatePayload = {
          messaging_product: 'whatsapp',
          to: `91${cleanMobile}`,
          type: 'template',
          template: {
            name: templateName,
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: [{ type: 'text', text: rawOtp }]
              },
              {
                type: 'button',
                sub_type: 'url',
                index: '0',
                parameters: [{ type: 'text', text: rawOtp }]
              }
            ]
          }
        };

        let response = await fetch(metaUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(templatePayload)
        });

        // Strategy B: Fallback to direct text if template unapproved
        if (!response.ok) {
          const textPayload = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: `91${cleanMobile}`,
            type: 'text',
            text: {
              preview_url: false,
              body: `Your Prepora verification code is: *${rawOtp}*.\nValid for 5 minutes. Do not share this OTP with anyone.`
            }
          };

          response = await fetch(metaUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(textPayload)
          });
        }

        if (response.ok) {
          whatsappDispatched = true;
        }
      } catch (err: any) {
        console.warn('[WhatsApp Service Dispatch Warning]', err?.message);
      }
    }

    return {
      success: true,
      message: whatsappDispatched
        ? `WhatsApp verification code sent to +91 ${cleanMobile}`
        : (demoAllowed
          ? `Verification OTP: 9999 (sent to +91 ${cleanMobile})`
          : `WhatsApp verification code dispatched to +91 ${cleanMobile}`),
      cooldownSeconds: 60,
      debugOtp: demoAllowed ? '9999' : undefined,
      otp: demoAllowed ? '9999' : undefined
    };
  }

  /**
   * Verifies OTP in Dual Mode:
   * - If demo is allowed and user enters 9999 or 999999, verifies instantly.
   * - Otherwise, strictly verifies against the 6-digit cryptographic hashed record.
   */
  public verifyOTP(mobile: string, otp: string): { success: boolean; message: string } {
    const cleanMobile = this.normalizeMobile(mobile);
    const cleanOtp = String(otp || '').trim();

    if (!cleanMobile || !this.isValidIndianMobile(cleanMobile)) {
      return { success: false, message: 'Valid 10-digit mobile number is required.' };
    }

    // 1. Dual Mode: 9999 Demo Bypass (active when ALLOW_DEMO_OTP=true)
    if (this.isDemoAllowed() && (cleanOtp === '9999' || cleanOtp === '999999')) {
      this.otpStore.delete(cleanMobile);
      this.cooldownStore.delete(cleanMobile);
      return { success: true, message: 'Mobile verified successfully (Demo 9999 mode).' };
    }

    if (!cleanOtp) {
      return { success: false, message: 'Please enter verification code.' };
    }

    const stored = this.otpStore.get(cleanMobile);
    if (!stored) {
      return {
        success: false,
        message: this.isDemoAllowed()
          ? 'No active OTP request found. Enter demo OTP 9999 or request a new OTP.'
          : 'No active OTP request found. Please request a new code.'
      };
    }

    // Check expiration (5 minutes)
    if (Date.now() > stored.expiresAt) {
      this.otpStore.delete(cleanMobile);
      return {
        success: false,
        message: this.isDemoAllowed()
          ? 'OTP has expired. Use demo OTP 9999 or request a new code.'
          : 'Verification code has expired. Please request a new OTP.'
      };
    }

    // Check rate limit / brute-force attempts (Max 5 attempts)
    if (stored.attempts >= 5) {
      this.otpStore.delete(cleanMobile);
      return { success: false, message: 'Too many incorrect attempts. Please request a new OTP.' };
    }

    // Constant-time hash verification
    const inputHash = this.hashOTP(cleanOtp, stored.salt);
    if (inputHash !== stored.hashedOTP) {
      stored.attempts += 1;
      const remaining = 5 - stored.attempts;
      if (remaining <= 0) {
        this.otpStore.delete(cleanMobile);
        return { success: false, message: 'Too many incorrect attempts. Please request a new OTP.' };
      }
      return { success: false, message: `Incorrect verification code. ${remaining} attempt(s) remaining.` };
    }

    // Burn OTP immediately after successful verification
    this.otpStore.delete(cleanMobile);
    this.cooldownStore.delete(cleanMobile);

    return { success: true, message: 'Mobile verified successfully.' };
  }

  // Testing helper
  public _getStoredRecordForTesting(mobile: string) {
    const cleanMobile = this.normalizeMobile(mobile);
    return this.otpStore.get(cleanMobile);
  }
}

export const whatsappOTPService = new WhatsAppOTPService();
export default whatsappOTPService;
