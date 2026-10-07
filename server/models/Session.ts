import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  id: string;
  sessionId?: string;
  userId: string;
  studentId?: string;
  phone?: string;
  mobile?: string;
  token: string;
  deviceInfo: {
    device: string; // e.g. 'Windows PC', 'iPhone 15', 'Android Phone'
    browser: string; // e.g. 'Chrome 124', 'Safari Mobile'
    os: string; // e.g. 'Windows 11', 'Android 14'
  };
  ipAddress: string;
  userAgent: string;
  lastActive: Date;
  lastActiveAt?: Date;
  expiresAt?: Date;
  isRevoked: boolean;
  revokedAt?: Date;
  revocationReason?: string;
  status: 'ACTIVE' | 'REVOKED';
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    sessionId: { type: String, sparse: true, index: true },
    userId: { type: String, required: true, index: true },
    studentId: { type: String, sparse: true, index: true },
    phone: { type: String, sparse: true, index: true },
    mobile: { type: String, sparse: true, index: true },
    token: { type: String, required: true, index: true }, // Stored as SHA-256 hash
    deviceInfo: {
      device: { type: String, default: 'Desktop Computer' },
      browser: { type: String, default: 'Web Browser' },
      os: { type: String, default: 'Unknown OS' }
    },
    ipAddress: { type: String, default: '127.0.0.1' },
    userAgent: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now },
    lastActiveAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    isRevoked: { type: Boolean, default: false, index: true },
    revokedAt: { type: Date, default: null },
    revocationReason: { type: String, default: null },
    status: { type: String, enum: ['ACTIVE', 'REVOKED'], default: 'ACTIVE', index: true }
  },
  { timestamps: true }
);

SessionSchema.index({ userId: 1, isRevoked: 1 });
SessionSchema.index({ studentId: 1, status: 1 });
SessionSchema.index({ phone: 1, isRevoked: 1 });
SessionSchema.index({ isRevoked: 1, lastActive: -1 });

export default mongoose.model<ISession>('Session', SessionSchema);
