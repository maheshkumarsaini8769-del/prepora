import mongoose, { Schema, Document } from 'mongoose';

export interface ILecture extends Document {
  id: string;
  classLevel: string;
  subject: string;
  chapter: string;
  topic?: string;
  type: 'FULL_CHAPTER' | 'TOPIC';
  youtubeVideoId: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  channelTitle?: string;
  language: string;
  source: 'YOUTUBE' | 'CURATED' | 'MANUAL';
  priority: number;
  isFeatured: boolean;
  isRecommended: boolean;
  isActive: boolean;
  isBackup?: boolean;
  approvalStatus: 'AUTO_DISCOVERED' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
  score?: number;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: Date;
  updatedAt: Date;
}

const LectureSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    classLevel: { type: String, default: '11', index: true },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, default: '', index: true },
    type: { type: String, enum: ['FULL_CHAPTER', 'TOPIC'], default: 'FULL_CHAPTER', index: true },
    youtubeVideoId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    duration: { type: String, default: '' },
    channelTitle: { type: String, default: '' },
    language: { type: String, default: 'Hindi' },
    source: { type: String, enum: ['YOUTUBE', 'CURATED', 'MANUAL'], default: 'CURATED' },
    priority: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: true, index: true },
    isActive: { type: Boolean, default: true, index: true },
    isBackup: { type: Boolean, default: false },
    approvalStatus: {
      type: String,
      enum: ['AUTO_DISCOVERED', 'PENDING_REVIEW', 'APPROVED', 'REJECTED'],
      default: 'APPROVED',
      index: true
    },
    score: { type: Number, default: 95 },
    confidence: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'HIGH' }
  },
  { timestamps: true }
);

LectureSchema.index({ subject: 1, chapter: 1, type: 1, isRecommended: 1 });
LectureSchema.index({ subject: 1, chapter: 1, topic: 1 });
LectureSchema.index({ title: 'text', chapter: 'text', topic: 'text' }, { default_language: 'none', language_override: 'none' });

export const Lecture = mongoose.model<ILecture>('Lecture', LectureSchema);
export default Lecture;
