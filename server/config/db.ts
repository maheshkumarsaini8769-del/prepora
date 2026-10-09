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
const LOCAL_FALLBACK_URI = 'mongodb://127.0.0.1:27017/prepora_db';

export const connectDB = async (): Promise<void> => {
  let uri = process.env.MONGODB_URI;
  const isLocalHost = uri && (uri.includes('localhost') || uri.includes('127.0.0.1'));
  if (!uri || (process.env.NODE_ENV === 'production' && isLocalHost) || (process.env.VERCEL && isLocalHost)) {
    uri = ATLAS_FALLBACK_URI;
  }

  if (mongoose.connection.readyState === 1) {
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
    isConnected = false;
    console.error(`[MongoDB] Connection error: ${error?.message || error}`);
    // If primary failed, try local fallback so platform never goes down
    if ((mongoose.connection.readyState as number) !== 1) {
      try {
        console.log('[MongoDB] Primary failed, attempting connection to local database fallback...');
        const localConn = await mongoose.connect(LOCAL_FALLBACK_URI, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 4000,
          socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log(`[MongoDB] Connected successfully via Local Fallback: ${localConn.connection.host}/${localConn.connection.name}`);
      } catch (localErr: any) {
        isConnected = false;
        console.error(`[MongoDB] Fallback error: ${localErr?.message || localErr}`);
      }
    }
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[MongoDB] Connection lost. Attempting auto-reconnect...');
  setTimeout(() => {
    if (mongoose.connection.readyState !== 1) {
      connectDB().catch(() => {});
    }
  }, 2000);
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.info('[MongoDB] Reconnected successfully.');
});

export default connectDB;
