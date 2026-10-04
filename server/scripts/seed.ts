import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Question from '../models/Question.js';
import Test from '../models/Test.js';
import User from '../models/User.js';
import { mockQuestions } from '../../src/data/mockQuestions.js';
import { mockTests } from '../../src/data/mockData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment.');
  process.exit(1);
}

function loadAllQuestions(): any[] {
  const allQs: any[] = [];
  const serverDataDir = path.resolve(process.cwd(), 'server/data/questions');
  
  if (fs.existsSync(serverDataDir)) {
    const files = ['physicsBank.json', 'chemistryBank.json', 'mathBank.json', 'biologyBank.json'];
    for (const f of files) {
      const fullPath = path.join(serverDataDir, f);
      if (fs.existsSync(fullPath)) {
        try {
          const fileData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          if (Array.isArray(fileData)) {
            allQs.push(...fileData);
            console.log(`[Seed] Loaded ${fileData.length} questions from ${f}`);
          }
        } catch (err: any) {
          console.warn(`[Seed] Warning loading ${f}:`, err?.message);
        }
      }
    }
  }

  // Also merge in starter mock questions to ensure test-referenced IDs exist
  const idSet = new Set(allQs.map(q => q.id));
  for (const mq of mockQuestions) {
    if (!idSet.has(mq.id)) {
      allQs.push(mq);
      idSet.add(mq.id);
    }
  }

  return allQs.length > 0 ? allQs : mockQuestions;
}

async function seed() {
  console.log('[Seed] Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI as string);
  console.log('[Seed] Connected successfully.');

  // 1. Seed Demo User
  console.log('[Seed] Upserting demo user...');
  await User.findOneAndUpdate(
    { id: 'usr-default' },
    {
      $set: {
        id: 'usr-default',
        name: 'Aman Sharma',
        email: 'aman.sharma@example.com',
        targetExam: 'JEE',
        classLevel: '12',
        targetYear: 2026,
        dreamScore: 280,
        streakDays: 14,
        totalQuestionsSolved: 128,
        overallAccuracy: 78,
        testsCompleted: 6,
        studyTimeMinutes: 520
      }
    },
    { upsert: true }
  );

  // 2. High-Performance Bulk Seeding of Questions
  const questionsToSeed = loadAllQuestions();
  console.log(`[Seed] Preparing bulk write for ${questionsToSeed.length} questions...`);

  const BATCH_SIZE = 500;
  for (let i = 0; i < questionsToSeed.length; i += BATCH_SIZE) {
    const chunk = questionsToSeed.slice(i, i + BATCH_SIZE);
    const operations = chunk.map(q => ({
      updateOne: {
        filter: { id: q.id },
        update: {
          $set: {
            ...q,
            status: 'Approved',
            recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
          }
        },
        upsert: true
      }
    }));

    await Question.bulkWrite(operations, { ordered: false });
    const progress = Math.min(i + BATCH_SIZE, questionsToSeed.length);
    console.log(`[Seed] Processed ${progress}/${questionsToSeed.length} questions...`);
  }

  console.log(`[Seed] Successfully bulk-upserted ${questionsToSeed.length} questions.`);

  // 3. Seed Tests
  console.log(`[Seed] Seeding ${mockTests.length} tests...`);
  const testOps = mockTests.map(t => ({
    updateOne: {
      filter: { id: t.id },
      update: {
        $set: {
          id: t.id,
          title: t.title,
          exam: t.exam,
          classLevel: t.classLevel,
          subjects: t.subjects,
          chapters: t.chapters || [],
          totalQuestions: t.totalQuestions,
          durationMinutes: t.durationMinutes,
          difficulty: t.difficulty,
          questionIds: t.questionIds,
          category: t.category,
          maxScore: t.maxScore,
          negativeMarking: t.negativeMarking ?? true,
          calculatorEnabled: t.calculatorEnabled ?? false,
          subjectTimePlan: t.subjectTimePlan || {}
        }
      },
      upsert: true
    }
  }));

  await Test.bulkWrite(testOps as any, { ordered: false });
  console.log(`[Seed] Successfully upserted ${mockTests.length} tests.`);

  console.log('[Seed] Database seeding completed successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('[Seed] Error during seeding:', err);
  process.exit(1);
});
