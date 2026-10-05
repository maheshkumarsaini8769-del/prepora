import mongoose, { Schema, Document } from 'mongoose';

export interface ILectureDiscovery extends Document {
  id: string;
  classLevel: string;
  subject: string;
  chapter: string;
  topic?: string;
  lectureType: 'FULL_CHAPTER' | 'TOPIC';
  query: string;
  candidates: Array<{
    youtubeVideoId: string;
    title: string;
    description: string;
    channelTitle: string;
    thumbnail: string;
    duration: string;
    score: number;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    publishedAt?: string;
    viewCount?: number;
    likeCount?: number;
    embeddable: boolean;
  }>;
  discoveredAt: Date;
  expiresAt: Date;
}

const LectureDiscoverySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    classLevel: { type: String, default: '11' },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    topic: { type: String, default: '' },
    lectureType: { type: String, enum: ['FULL_CHAPTER', 'TOPIC'], default: 'FULL_CHAPTER' },
    query: { type: String, required: true },
    candidates: { type: [Schema.Types.Mixed], default: [] },
    discoveredAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: { expires: 0 } } // MongoDB TTL index auto deletes expired
  },
  { timestamps: true }
);

LectureDiscoverySchema.index({ subject: 1, chapter: 1, topic: 1, lectureType: 1 });

export const LectureDiscovery = mongoose.model<ILectureDiscovery>('LectureDiscovery', LectureDiscoverySchema);
export default LectureDiscovery;
