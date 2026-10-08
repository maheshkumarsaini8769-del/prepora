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
  console.log(`Seeding ${papers.length} real papers with full question bank integration...`);

  // Track question offset per subject to distribute diverse questions across papers
  const subjectOffsets: Record<string, number> = {
    Physics_JEE: 0,
    Chemistry_JEE: 0,
    Mathematics_JEE: 0,
    Biology_NEET: 0,
    Physics_NEET: 0,
    Chemistry_NEET: 0,
    Physics_Board: 0,
    Chemistry_Board: 0,
    Mathematics_Board: 0,
    Biology_Board: 0,
  };

  let updated = 0;
  for (let idx = 0; idx < papers.length; idx++) {
    const p = papers[idx];
    
    // Determine accurate target total questions
    let targetTotal = p.totalQuestions;
    const isJee = p.exam === 'JEE' || p.canonicalExam === 'JEE_MAIN' || p.canonicalExam === 'JEE_ADVANCED';
    const isNeet = p.exam === 'NEET' || p.canonicalExam === 'NEET_UG';
    const isFullSyllabus = !p.subject || p.subject === 'Full Syllabus' || p.subject === 'All';

    if (isJee && isFullSyllabus) {
      if (!targetTotal || targetTotal === 50 || targetTotal === 6) {
        targetTotal = 75; // Standard JEE Main format
      }
    } else if (isNeet && isFullSyllabus) {
      if (!targetTotal || targetTotal === 50 || targetTotal === 6) {
        targetTotal = 200; // Standard NEET UG format (or 180)
      }
    } else if (!targetTotal || targetTotal === 6) {
      targetTotal = 50;
    }

    let assembledQuestionIds: string[] = [];

    if (isJee && isFullSyllabus) {
      // Balanced distribution: Physics, Chemistry, Mathematics
      const phyCount = Math.round(targetTotal / 3);
      const chemCount = Math.round(targetTotal / 3);
      const mathCount = targetTotal - phyCount - chemCount;

      const pKey = 'Physics_JEE';
      const cKey = 'Chemistry_JEE';
      const mKey = 'Mathematics_JEE';

      const phyQs = await Question.find({ exam: 'JEE', subject: 'Physics' })
        .skip(subjectOffsets[pKey])
        .limit(phyCount)
        .select('id');
      subjectOffsets[pKey] = (subjectOffsets[pKey] + phyCount) % 5000;

      const chemQs = await Question.find({ exam: 'JEE', subject: 'Chemistry' })
        .skip(subjectOffsets[cKey])
        .limit(chemCount)
        .select('id');
      subjectOffsets[cKey] = (subjectOffsets[cKey] + chemCount) % 5000;

      const mathQs = await Question.find({ exam: 'JEE', subject: 'Mathematics' })
        .skip(subjectOffsets[mKey])
        .limit(mathCount)
        .select('id');
      subjectOffsets[mKey] = (subjectOffsets[mKey] + mathCount) % 5000;

      assembledQuestionIds = [
        ...phyQs.map(q => q.id),
        ...chemQs.map(q => q.id),
        ...mathQs.map(q => q.id)
      ];
    } else if (isNeet && isFullSyllabus) {
      // Balanced distribution: 25% Physics, 25% Chemistry, 50% Biology
      const phyCount = Math.round(targetTotal * 0.25);
      const chemCount = Math.round(targetTotal * 0.25);
      const bioCount = targetTotal - phyCount - chemCount;

      const pKey = 'Physics_NEET';
      const cKey = 'Chemistry_NEET';
      const bKey = 'Biology_NEET';

      const phyQs = await Question.find({ exam: 'NEET', subject: 'Physics' })
        .skip(subjectOffsets[pKey])
        .limit(phyCount)
        .select('id');
      subjectOffsets[pKey] = (subjectOffsets[pKey] + phyCount) % 2500;

      const chemQs = await Question.find({ exam: 'NEET', subject: 'Chemistry' })
        .skip(subjectOffsets[cKey])
        .limit(chemCount)
        .select('id');
      subjectOffsets[cKey] = (subjectOffsets[cKey] + chemCount) % 2500;

      const bioQs = await Question.find({ exam: 'NEET', subject: 'Biology' })
        .skip(subjectOffsets[bKey])
        .limit(bioCount)
        .select('id');
      subjectOffsets[bKey] = (subjectOffsets[bKey] + bioCount) % 8000;

      assembledQuestionIds = [
        ...phyQs.map(q => q.id),
        ...chemQs.map(q => q.id),
        ...bioQs.map(q => q.id)
      ];
    } else {
      // Single Subject Paper (e.g. RBSE Class 12 Physics, CBSE Mathematics)
      const sub = p.subject || 'Physics';
      const examVal = (p.exam === 'CBSE' || p.exam === 'RBSE' || p.exam === 'Board') ? 'Board' : p.exam;
      const key = `${sub}_${examVal}`;
      if (!subjectOffsets[key]) subjectOffsets[key] = 0;

      let qs = await Question.find({
        $or: [{ exam: examVal }, { exam: 'Board' }, { exam: 'JEE' }, { exam: 'NEET' }],
        subject: sub
      })
        .skip(subjectOffsets[key])
        .limit(targetTotal)
        .select('id');

      if (qs.length < targetTotal) {
        qs = await Question.find({ subject: sub }).limit(targetTotal).select('id');
      }

      subjectOffsets[key] = (subjectOffsets[key] + targetTotal) % 2000;
      assembledQuestionIds = qs.map(q => q.id);
    }

    // Fallback if DB query was short
    if (assembledQuestionIds.length === 0 && p.questionIds && p.questionIds.length > 0) {
      assembledQuestionIds = p.questionIds;
    }

    p.questionIds = assembledQuestionIds;
    p.totalQuestions = assembledQuestionIds.length > 0 ? assembledQuestionIds.length : targetTotal;

    await Paper.findOneAndUpdate(
      { id: p.id },
      {
        ...p,
        questionIds: assembledQuestionIds,
        totalQuestions: p.totalQuestions,
        status: 'Published'
      },
      { upsert: true, new: true }
    );
    updated++;
  }

  // Persist updated questionIds and totalQuestions into server/data/realPapers.json
  fs.writeFileSync('./server/data/realPapers.json', JSON.stringify(papers, null, 2), 'utf8');

  // Also persist into src/data/realPapersData.ts so client bundle has matching IDs
  const tsContent = `import { Paper } from '../types';\n\nexport const realPapers: Paper[] = ${JSON.stringify(papers, null, 2)};\n`;
  fs.writeFileSync('./src/data/realPapersData.ts', tsContent, 'utf8');

  const total = await Paper.countDocuments();
  console.log(`Successfully seeded all ${updated} papers with full question counts! Total papers in DB: ${total}`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
