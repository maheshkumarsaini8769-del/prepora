import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentFeedback extends Document {
  id: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  type: 'SUGGESTION' | 'MISTAKE' | 'GENERAL';
  category: string;
  title: string;
  description: string;
  pageUrl?: string;
  screenshotUrl?: string;
  status: 'Pending' | 'In Review' | 'Resolved' | 'Rejected';
  adminNotes?: string;
  adminReply?: string;
  repliedAt?: Date;
  adminEmail?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const StudentFeedbackSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, default: 'anonymous', index: true },
    userName: { type: String, default: 'Student' },
    userEmail: { type: String, default: '' },
    userPhone: { type: String, default: '' },
    type: {
      type: String,
      enum: ['SUGGESTION', 'MISTAKE', 'GENERAL'],
      default: 'SUGGESTION',
      index: true
    },
    category: { type: String, default: 'General' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    pageUrl: { type: String, default: '' },
    screenshotUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'In Review', 'Resolved', 'Rejected'],
      default: 'Pending',
      index: true
    },
    adminNotes: { type: String, default: '' },
    adminReply: { type: String, default: '' },
    repliedAt: { type: Date },
    adminEmail: { type: String, default: '' },
    resolvedAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model<IStudentFeedback>('StudentFeedback', StudentFeedbackSchema);
