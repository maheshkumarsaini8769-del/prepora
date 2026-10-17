import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if not permitted
}

dotenv.config();

const QUESTION_DB_ATLAS_URI = 'mongodb+srv://maheshkumarsaini8769_db_user:BJF9QCgdvWliHs02@cluster0.077ex67.mongodb.net/prepore_db?retryWrites=true&w=majority&appName=Cluster0';
const LOCAL_FALLBACK_URI = 'mongodb://127.0.0.1:27017/prepora_db';

const targetUri = process.env.QUESTION_DB_URI || QUESTION_DB_ATLAS_URI;

export const questionConnection = mongoose.createConnection();

// Fail fast on buffering queries instead of hanging requests for 10+ seconds
questionConnection.set('bufferTimeoutMS', 5000);

(async () => {
  try {
    await questionConnection.openUri(targetUri, {
      maxPoolSize: 20,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      family: 4
    });
    console.log(`[QuestionDB] Connected successfully to Project 1: ${questionConnection.host}/${questionConnection.name}`);
  } catch (err: any) {
    console.warn('[QuestionDB] Project 1 failed, connecting to Local Fallback (51,665 Questions)...', err?.message || err);
    try {
      await questionConnection.openUri(LOCAL_FALLBACK_URI, {
        maxPoolSize: 30,
        minPoolSize: 2,
        serverSelectionTimeoutMS: 3000,
        socketTimeoutMS: 30000,
        family: 4
      });
      console.log(`[QuestionDB] Connected to Local Fallback successfully (${questionConnection.host}/${questionConnection.name})`);
    } catch (localErr: any) {
      console.error('[QuestionDB] Local fallback error:', localErr?.message || localErr);
    }
  }
})();

export default questionConnection;
