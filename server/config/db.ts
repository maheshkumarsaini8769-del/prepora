import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if not permitted
}

dotenv.config();

const ATLAS_FALLBACK_URI = 'mongodb+srv://maheshkumarsaini8769_db_user:ZsucNN15OKdnprGO@cluster0.1khkuyi.mongodb.net/prepora_students_db?retryWrites=true&w=majority&appName=Cluster0';
const LOCAL_FALLBACK_URI = 'mongodb://127.0.0.1:27017/prepora_db';

let isConnected = false;
let connectionPromise: Promise<void> | null = null;

// Fail fast on buffering queries instead of locking requests for 10+ seconds
mongoose.set('bufferTimeoutMS', 5000);

const getTargetUri = (): string => {
  let uri = process.env.MONGODB_URI;
  const isLocalHost = uri && (uri.includes('localhost') || uri.includes('127.0.0.1'));
  if (!uri || (process.env.NODE_ENV === 'production' && isLocalHost) || (process.env.VERCEL && isLocalHost)) {
    uri = ATLAS_FALLBACK_URI;
  }
  return uri;
};

const mongooseOptions: mongoose.ConnectOptions = {
  maxPoolSize: 30, // Optimized for MongoDB Atlas connection limits
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  serverSelectionTimeoutMS: 6000,
  socketTimeoutMS: 30000,
  heartbeatFrequencyMS: 10000,
  family: 4 // IPv4 first to prevent DNS resolution delays
};

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  // If a connection attempt is already in flight, reuse the promise instead of spawning duplicate attempts
  if (mongoose.connection.readyState === 2 && connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    const primaryUri = getTargetUri();

    try {
      const conn = await mongoose.connect(primaryUri, mongooseOptions);
      isConnected = true;
      console.log(`[MongoDB] Connected successfully (Active Pool): ${conn.connection.host}/${conn.connection.name}`);
    } catch (error: any) {
      isConnected = false;
      console.error(`[MongoDB] Primary connection error: ${error?.message || error}`);

      // Attempt fallback connection if primary Atlas fails
      if ((mongoose.connection.readyState as number) !== 1) {
        try {
          console.log('[MongoDB] Attempting connection to local database fallback...');
          await mongoose.disconnect().catch(() => {});
          const localConn = await mongoose.connect(LOCAL_FALLBACK_URI, {
            ...mongooseOptions,
            serverSelectionTimeoutMS: 3000
          });
          isConnected = true;
          console.log(`[MongoDB] Connected successfully via Local Fallback: ${localConn.connection.host}/${localConn.connection.name}`);
        } catch (localErr: any) {
          isConnected = false;
          console.error(`[MongoDB] Local Fallback error: ${localErr?.message || localErr}`);
        }
      }
    } finally {
      connectionPromise = null;
    }
  })();

  return connectionPromise;
};

export const ensureDBConnected = async (timeoutMs = 4000): Promise<boolean> => {
  if (mongoose.connection.readyState === 1) return true;
  try {
    await Promise.race([
      connectDB(),
      new Promise<void>((_, reject) => setTimeout(() => reject(new Error('DB connection wait timeout')), timeoutMs))
    ]);
    return mongoose.connection.readyState === 1;
  } catch {
    return mongoose.connection.readyState === 1;
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[MongoDB] Connection lost. Attempting auto-reconnect...');
  setTimeout(() => {
    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      connectDB().catch(() => {});
    }
  }, 2000);
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.info('[MongoDB] Reconnected successfully.');
});

export default connectDB;
