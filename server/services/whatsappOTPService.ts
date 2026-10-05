import { randomInt, createHash } from 'crypto';

interface StoredOTP {
  hashedOTP: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

class WhatsAppOTPService {
  private otpStore: Map<string, StoredOTP> = new Map();
  private cooldownStore: Map<string, number> = new Map();

  private hashOTP(otp: string): string {
    return createHash('sha256').update(otp).digest('hex');
  }

  private normalizeMobile(mobile: string): string {
    return String(mobile || '').replace(/[^0-9]/g, '').slice(-10);
  }

  /**
   * Dispatches WhatsApp OTP to student's mobile number.
   * Enforces 60-second resend cooldown and 5-minute expiry.
   */
  public async sendOTP(mobile: string): Promise<{ success: boolean; message: string; cooldownSeconds?: number; isDev?: boolean }> {
    const cleanMobile = this.normalizeMobile(mobile);
    if (!cleanMobile || cleanMobile.length !== 10) {
      return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
    }

    const now = Date.now();
    const lastSent = this.cooldownStore.get(cleanMobile) || 0;
    const cooldownMs = 60 * 1000;

    if (now - lastSent < cooldownMs) {
      const remainingSeconds = Math.ceil((cooldownMs - (now - lastSent)) / 1000);
      return {
        success: false,
        message: `Please wait ${remainingSeconds} seconds before requesting a new OTP.`,
        cooldownSeconds: remainingSeconds
      };
    }

    // Generate cryptographically random 6-digit OTP
    const rawOtp = String(randomInt(100000, 999999));
    const hashedOTP = this.hashOTP(rawOtp);
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes validity

    this.otpStore.set(cleanMobile, {
      hashedOTP,
      expiresAt,
      attempts: 0,
      createdAt: now
    });
    this.cooldownStore.set(cleanMobile, now);

    // If WhatsApp Cloud API credentials are provided, send live message
    const apiKey = process.env.WHATSAPP_API_KEY;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (apiKey && phoneNumberId) {
      try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: `91${cleanMobile}`,
            type: 'template',
            template: {
              name: 'prepora_auth_otp',
              language: { code: 'en' },
              components: [
                {
                  type: 'body',
                  parameters: [
                    { type: 'text', text: rawOtp }
                  ]
                },
                {
                  type: 'button',
                  sub_type: 'url',
                  index: '0',
                  parameters: [
                    { type: 'text', text: rawOtp }
                  ]
                }
              ]
            }
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          console.error('[WhatsApp Cloud API Error]', errData);
          if (process.env.NODE_ENV !== 'production') {
            console.log(`[DEV WhatsApp OTP] Mobile: ${cleanMobile} -> OTP: ${rawOtp}`);
          }
        }
      } catch (err: any) {
        console.error('[WhatsApp API Exception]', err.message);
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[DEV WhatsApp OTP] Mobile: ${cleanMobile} -> OTP: ${rawOtp}`);
        }
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DEV WhatsApp OTP] Mobile: ${cleanMobile} -> OTP: ${rawOtp}`);
      }
    }

    return {
      success: true,
      message: 'WhatsApp OTP sent successfully to +91 ' + cleanMobile,
      cooldownSeconds: 60,
      isDev: process.env.NODE_ENV !== 'production' && !apiKey
    };
  }

  /**
   * Verifies the OTP.
   * Burns OTP on success (single use) and limits failed attempts to 3.
   */
  public verifyOTP(mobile: string, otp: string): { success: boolean; message: string } {
    const cleanMobile = this.normalizeMobile(mobile);
    const cleanOtp = String(otp || '').trim();

    if (!cleanMobile || !cleanOtp) {
      return { success: false, message: 'Mobile number and OTP are required.' };
    }

    const stored = this.otpStore.get(cleanMobile);
    if (!stored) {
      return { success: false, message: 'No active OTP found. Please request a new OTP.' };
    }

    if (Date.now() > stored.expiresAt) {
      this.otpStore.delete(cleanMobile);
      return { success: false, message: 'OTP has expired. Please request a new OTP.' };
    }

    if (stored.attempts >= 3) {
      this.otpStore.delete(cleanMobile);
      return { success: false, message: 'Too many incorrect attempts. Please request a new OTP.' };
    }

    // In dev / demo testing fallback if enabled and an active OTP session exists
    if (process.env.NODE_ENV !== 'production' && (cleanOtp === '9999' || cleanOtp === '999999')) {
      this.otpStore.delete(cleanMobile);
      this.cooldownStore.delete(cleanMobile);
      return { success: true, message: 'OTP verified successfully.' };
    }

    const inputHash = this.hashOTP(cleanOtp);
    if (inputHash !== stored.hashedOTP) {
      stored.attempts += 1;
      const remaining = 3 - stored.attempts;
      return { success: false, message: `Invalid OTP. ${remaining} attempt(s) remaining.` };
    }

    // Burn OTP immediately after successful verification (single-use enforcement)
    this.otpStore.delete(cleanMobile);
    this.cooldownStore.delete(cleanMobile);
    return { success: true, message: 'OTP verified successfully.' };
  }
}

export const whatsappOTPService = new WhatsAppOTPService();
