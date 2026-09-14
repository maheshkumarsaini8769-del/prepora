import mongoose, { Schema, Document } from 'mongoose';

export interface ITechnicalReport extends Document {
  id: string;
  userId?: string;
  userEmail?: string;
  reason: 'Test submission failed' | 'Page not loading' | 'Login problem' | 'Question not loading' | 'Timer problem' | 'Payment problem' | 'Other';
  description: string;
  screenshotUrl?: string;
  route: string;
  testId?: string;
  questionId?: string;
  context: {
    browser: string;
    os: string;
    deviceType: string;
    appVersion: string;
    userAgent: string;
    timestamp: string;
    errorId?: string;
  };
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Investigating' | 'Resolved' | 'Closed';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechnicalReportSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, default: 'anonymous' },
    userEmail: { type: String },
    reason: {
      type: String,
      required: true,
      enum: [
        'Test submission failed',
        'Page not loading',
        'Login problem',
        'Question not loading',
        'Timer problem',
        'Payment problem',
        'Other'
      ],
      index: true
    },
    description: { type: String, required: true },
    screenshotUrl: { type: String },
    route: { type: String, default: '/' },
    testId: { type: String },
    questionId: { type: String },
    context: {
      browser: { type: String, default: 'Unknown' },
      os: { type: String, default: 'Unknown' },
      deviceType: { type: String, default: 'Desktop' },
      appVersion: { type: String, default: '1.0.0' },
      userAgent: { type: String, default: '' },
      timestamp: { type: String, default: () => new Date().toISOString() },
      errorId: { type: String }
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
      index: true
    },
    status: {
      type: String,
      enum: ['Open', 'Investigating', 'Resolved', 'Closed'],
      default: 'Open',
      index: true
    },
    adminNotes: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<ITechnicalReport>('TechnicalReport', TechnicalReportSchema);
