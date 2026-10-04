import mongoose, { Schema, Document } from 'mongoose';

export interface IVideoWatchLog extends Document {
  id: string;
  userId: string;
  userEmail?: string;
  subject: string;
  chapter: string;
  videoId: string;
  videoTitle: string;
  channelName: string;
  watchedAt: Date;
}

const VideoWatchLogSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    userEmail: { type: String, default: '' },
    subject: { type: String, required: true, index: true },
    chapter: { type: String, required: true, index: true },
    videoId: { type: String, required: true },
    videoTitle: { type: String, required: true },
    channelName: { type: String, default: 'Curated Educator' },
    watchedAt: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

export default mongoose.model<IVideoWatchLog>('VideoWatchLog', VideoWatchLogSchema);
