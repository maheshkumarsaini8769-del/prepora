import mongoose, { Schema, Document } from 'mongoose';

export interface IPushSubscription extends Document {
  id: string;
  userId?: string;
  studentId?: string;
  phone?: string;
  targetExam?: string;
  subscription: {
    endpoint: string;
    expirationTime?: number | null;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PushSubscriptionSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, sparse: true, index: true },
    studentId: { type: String, sparse: true, index: true },
    phone: { type: String, sparse: true, index: true },
    targetExam: { type: String, default: 'ALL' },
    subscription: {
      endpoint: { type: String, required: true, unique: true, index: true },
      expirationTime: { type: Number, default: null },
      keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true }
      }
    },
    userAgent: { type: String, default: '' }
  },
  { timestamps: true }
);

PushSubscriptionSchema.index({ targetExam: 1 });

export default mongoose.model<IPushSubscription>('PushSubscription', PushSubscriptionSchema);
