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

export const questionConnection = mongoose.createConnection(targetUri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 45000,
});

questionConnection.on('connected', () => {
  console.log(`[QuestionDB] Connected successfully to Project 1: ${questionConnection.host}/${questionConnection.name}`);
});

questionConnection.on('error', (err) => {
  console.error('[QuestionDB] Connection error:', err?.message || err);
});

export default questionConnection;
