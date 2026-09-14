import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

  // 2. Seed Questions
  console.log(`[Seed] Seeding ${mockQuestions.length} questions...`);
  let qCount = 0;
  for (const q of mockQuestions) {
    await Question.findOneAndUpdate(
      { id: q.id },
      {
        $set: {
          ...q,
          status: 'Approved',
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        }
      },
      { upsert: true }
    );
    qCount++;
  }
  console.log(`[Seed] Successfully upserted ${qCount} questions.`);

  // 3. Seed Tests
  console.log(`[Seed] Seeding ${mockTests.length} tests...`);
  let tCount = 0;
  for (const t of mockTests) {
    await Test.findOneAndUpdate(
      { id: t.id },
      {
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
      { upsert: true }
    );
    tCount++;
  }
  console.log(`[Seed] Successfully upserted ${tCount} tests.`);

  console.log('[Seed] Database seeding completed successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('[Seed] Error during seeding:', err);
  process.exit(1);
});
