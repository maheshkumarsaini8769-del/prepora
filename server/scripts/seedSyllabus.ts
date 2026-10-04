import mongoose from 'mongoose';
import dotenv from 'dotenv';
import SyllabusChapter from '../models/Syllabus.js';
import { canonicalSyllabus } from '../../src/data/canonicalSyllabusData.js';

dotenv.config();

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';
  await mongoose.connect(uri);
  console.log('Seeding syllabus chapters from canonical data...');
  
  const ops = canonicalSyllabus.map(chap => ({
    updateOne: {
      filter: { id: chap.id },
      update: {
        $set: {
          ...chap,
          status: 'active',
          verificationStatus: 'VERIFIED'
        }
      },
      upsert: true
    }
  }));

  const res = await SyllabusChapter.bulkWrite(ops);
  console.log(`Seeded ${res.upsertedCount + res.modifiedCount} syllabus chapters!`);
  const total = await SyllabusChapter.countDocuments();
  console.log(`Total syllabus chapters in DB: ${total}`);
  await mongoose.disconnect();
}

run().catch(console.error);
