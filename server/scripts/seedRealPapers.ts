import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import Paper from '../models/Paper.js';
import Question from '../models/Question.js';
import fs from 'fs';

async function seed() {
  await connectDB();
  try {
    await Paper.collection.dropIndexes();
  } catch (e) {}
  await Paper.syncIndexes();

  const raw = fs.readFileSync('./server/data/realPapers.json', 'utf8');
  const papers = JSON.parse(raw);
  console.log('Seeding', papers.length, 'real papers...');

  let updated = 0;
  for (const p of papers) {
    const query: any = {};
    if (p.exam) query.exam = p.exam === 'JEE Advanced' ? 'JEE' : p.exam;
    if (p.subject && p.subject !== 'Full Syllabus' && p.subject !== 'All') {
      query.subject = p.subject;
    }

    const targetLimit = Math.max(10, Math.min(p.totalQuestions || 30, 50));
    let matchedQuestions = await Question.find({
      ...query,
      $or: [{ year: p.year }, { sourceYear: p.year }, { source: 'PYQ' }]
    }).limit(targetLimit).select('id');

    if (matchedQuestions.length < 5) {
      matchedQuestions = await Question.find(query).limit(targetLimit).select('id');
    }

    const questionIds = matchedQuestions.map(q => q.id);

    await Paper.findOneAndUpdate(
      { id: p.id },
      {
        ...p,
        questionIds: questionIds.length > 0 ? questionIds : p.questionIds || [],
        totalQuestions: questionIds.length > 0 ? questionIds.length : (p.totalQuestions || 25),
        status: 'Published'
      },
      { upsert: true, new: true }
    );
    updated++;
  }

  const total = await Paper.countDocuments();
  console.log(`Successfully seeded ${updated} papers! Total papers in DB now: ${total}`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
