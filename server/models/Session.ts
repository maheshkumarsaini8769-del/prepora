import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  id: string;
  userId: string;
  token: string;
  deviceInfo: {
    device: string; // e.g. 'Windows PC', 'iPhone 15', 'Android Phone'
    browser: string; // e.g. 'Chrome 124', 'Safari Mobile'
    os: string; // e.g. 'Windows 11', 'Android 14'
  };
  ipAddress: string;
  userAgent: string;
  lastActive: Date;
  isRevoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, index: true }, // Stored as SHA-256 hash
    deviceInfo: {
      device: { type: String, default: 'Desktop Computer' },
      browser: { type: String, default: 'Web Browser' },
      os: { type: String, default: 'Unknown OS' }
    },
    ipAddress: { type: String, default: '127.0.0.1' },
    userAgent: { type: String, default: '' },
    lastActive: { type: Date, default: Date.now },
    isRevoked: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

SessionSchema.index({ userId: 1, isRevoked: 1 });

export default mongoose.model<ISession>('Session', SessionSchema);
