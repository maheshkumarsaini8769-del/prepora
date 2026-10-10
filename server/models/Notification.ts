import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  id: string;
  targetType: 'BROADCAST' | 'SPECIFIC_USER';
  targetUserId?: string;
  targetUserPhone?: string;
  title: string;
  message: string;
  type: 'announcement' | 'practice' | 'revision' | 'test' | 'support_reply' | 'achievement';
  actionUrl?: string;
  senderAdminEmail: string;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    targetType: {
      type: String,
      enum: ['BROADCAST', 'SPECIFIC_USER'],
      default: 'BROADCAST',
      index: true
    },
    targetUserId: { type: String, default: '', index: true },
    targetUserPhone: { type: String, default: '', index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['announcement', 'practice', 'revision', 'test', 'support_reply', 'achievement'],
      default: 'announcement',
      index: true
    },
    actionUrl: { type: String, default: '' },
    senderAdminEmail: { type: String, default: 'admin@prepora.internal' },
    readBy: { type: [String], default: [] }
  },
  { timestamps: true }
);

NotificationSchema.index({ targetType: 1, createdAt: -1 });
NotificationSchema.index({ targetUserPhone: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', NotificationSchema);
