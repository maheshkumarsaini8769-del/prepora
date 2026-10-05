import mongoose, { Schema, Document } from 'mongoose';

export type LoginEventType =
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILED'
  | 'SESSION_REVOKED'
  | 'LOGOUT'
  | 'FORCE_LOGOUT'
  | 'PASSWORD_RESET';

export interface ILoginHistory extends Document {
  id: string;
  studentId: string;
  eventType: LoginEventType;
  deviceInfo?: {
    device?: string;
    browser?: string;
    os?: string;
  };
  userAgent?: string;
  ipAddress?: string;
  timestamp: Date;
  reason?: string;
}

const LoginHistorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    eventType: { type: String, required: true, index: true },
    deviceInfo: {
      device: { type: String, default: 'Desktop PC' },
      browser: { type: String, default: 'Web Browser' },
      os: { type: String, default: 'Unknown OS' }
    },
    userAgent: { type: String, default: '' },
    ipAddress: { type: String, default: '127.0.0.1' },
    timestamp: { type: Date, default: Date.now, index: true },
    reason: { type: String, default: null }
  },
  { timestamps: true }
);

LoginHistorySchema.index({ studentId: 1, timestamp: -1 });

export default mongoose.model<ILoginHistory>('LoginHistory', LoginHistorySchema);
