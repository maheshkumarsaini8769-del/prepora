import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if not permitted
}

dotenv.config();

let isConnected = false;

const ATLAS_FALLBACK_URI = 'mongodb+srv://maheshkumarsaini8769_db_user:ZsucNN15OKdnprGO@cluster0.1khkuyi.mongodb.net/prepora_students_db?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB = async (): Promise<void> => {
  let uri = process.env.MONGODB_URI;
  const isLocalHost = uri && (uri.includes('localhost') || uri.includes('127.0.0.1'));
  if (!uri || (process.env.NODE_ENV === 'production' && isLocalHost) || (process.env.VERCEL && isLocalHost)) {
    uri = ATLAS_FALLBACK_URI;
  }

  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error: any) {
    console.error(`[MongoDB] Connection error: ${error?.message || error}`);
    // If local failed and uri wasn't fallback, try fallback Atlas once
    if (uri !== ATLAS_FALLBACK_URI && mongoose.connection.readyState !== 1) {
      try {
        console.log('[MongoDB] Retrying connection to Atlas cluster...');
        const fallbackConn = await mongoose.connect(ATLAS_FALLBACK_URI, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 8000,
          socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log(`[MongoDB] Connected successfully via Atlas: ${fallbackConn.connection.host}`);
      } catch (fallbackErr: any) {
        console.error(`[MongoDB] Atlas Fallback error: ${fallbackErr?.message || fallbackErr}`);
      }
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection lost. Reconnecting...');
});

mongoose.connection.on('reconnected', () => {
  console.info('[MongoDB] Reconnected successfully.');
});

export default connectDB;
