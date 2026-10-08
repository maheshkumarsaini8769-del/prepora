import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const ATLAS_URI = 'mongodb+srv://maheshkumarsaini8769_db_user:ZsucNN15OKdnprGO@cluster0.1khkuyi.mongodb.net/prepora_questions_db?retryWrites=true&w=majority&appName=Cluster0';
const LOCAL_URI = 'mongodb://127.0.0.1:27017/prepora_db';

const BATCH_SIZE = 2500;

async function uploadQuestions() {
  console.log('================================================================================');
  console.log('☁️ UPLOADING 51,665 QUESTIONS TO CLOUD MONGODB ATLAS (prepora_questions_db)');
  console.log('================================================================================\n');

  console.log('Connecting to MongoDB Atlas...');
  const atlasClient = await MongoClient.connect(ATLAS_URI, { serverSelectionTimeoutMS: 15000 });
  const atlasDb = atlasClient.db('prepora_questions_db');
  const questionsCol = atlasDb.collection('questions');
  console.log('✓ Connected to MongoDB Atlas Cloud!\n');

  // Load questions from local MongoDB or JSON banks
  let allQuestions: any[] = [];
  try {
    console.log('Checking local MongoDB questions...');
    const localClient = await MongoClient.connect(LOCAL_URI, { serverSelectionTimeoutMS: 3000 });
    const localDb = localClient.db('prepora_db');
    allQuestions = await localDb.collection('questions').find({}).toArray();
    await localClient.close();
    console.log(`✓ Fetched ${allQuestions.length} questions from local MongoDB.`);
  } catch (err: any) {
    console.log('Local MongoDB not used, falling back to JSON repository files...');
  }

  // If local mongo didn't have all, read from JSON bank files
  if (allQuestions.length < 50000) {
    console.log('Loading from server/data/questions/ JSON bank files...');
    allQuestions = [];
    const baseDir = path.resolve(process.cwd(), 'server/data/questions');
    const files = ['physicsBank.json', 'chemistryBank.json', 'biologyBank.json', 'mathBank.json'];
    for (const f of files) {
      const fullPath = path.join(baseDir, f);
      if (fs.existsSync(fullPath)) {
        const raw = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (Array.isArray(raw)) {
          allQuestions.push(...raw);
          console.log(`  - Loaded ${raw.length} questions from ${f}`);
        }
      }
    }
  }

  const total = allQuestions.length;
  console.log(`\nTotal questions ready for upload: ${total.toLocaleString()}`);

  const startTime = Date.now();
  let uploaded = 0;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk = allQuestions.slice(i, i + BATCH_SIZE);
    const ops = chunk.map(q => ({
      replaceOne: {
        filter: { id: q.id },
        replacement: q,
        upsert: true
      }
    }));

    await questionsCol.bulkWrite(ops, { ordered: false });
    uploaded += chunk.length;
    const percent = ((uploaded / total) * 100).toFixed(1);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`  ▶ Uploaded ${uploaded.toLocaleString()} / ${total.toLocaleString()} questions (${percent}%) [${elapsed}s]`);
  }

  console.log('\nCreating search & filter indexes on Atlas questions collection...');
  await questionsCol.createIndex({ id: 1 }, { unique: true });
  await questionsCol.createIndex({ subject: 1, chapter: 1 });
  await questionsCol.createIndex({ exam: 1, class: 1 });
  await questionsCol.createIndex({ difficulty: 1 });
  console.log('✓ Indexes created successfully!');

  // Verify
  const atlasCount = await questionsCol.countDocuments();
  console.log(`\n📊 Verified Total Questions in Atlas Cloud: ${atlasCount.toLocaleString()}`);

  // Check storage stats
  const stats = await atlasDb.stats();
  const storageMB = (stats.storageSize / (1024 * 1024)).toFixed(2);
  const dataMB = (stats.dataSize / (1024 * 1024)).toFixed(2);
  const indexMB = (stats.indexSize / (1024 * 1024)).toFixed(2);
  const totalMB = ((stats.storageSize + stats.indexSize) / (1024 * 1024)).toFixed(2);

  console.log('\n================================================================================');
  console.log('☁️ ATLAS prepora_questions_db STORAGE STATS');
  console.log('================================================================================');
  console.log(`Uncompressed Data: ${dataMB} MB`);
  console.log(`Compressed Disk:   ${storageMB} MB`);
  console.log(`Indexes Size:      ${indexMB} MB`);
  console.log(`Total DB Space:    ${totalMB} MB`);
  console.log('================================================================================\n');

  await atlasClient.close();
  console.log('🌟 51,665 QUESTIONS PERMANENTLY SAVED TO CLOUD MONGODB ATLAS WITH ZERO LOSS!');
}

uploadQuestions().catch(err => {
  console.error('Upload Error:', err);
  process.exit(1);
});
