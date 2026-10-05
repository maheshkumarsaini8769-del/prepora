import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Lecture } from '../models/Lecture.js';
import { Formula } from '../models/Formula.js';
import { CURATED_CHAPTER_VIDEOS } from '../../src/data/videoLectures.js';
import { comprehensiveFormulaNotes } from '../../src/data/comprehensiveFormulaNotes.js';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!uri) {
  console.error('No MONGODB_URI found.');
  process.exit(1);
}

async function seed() {
  await mongoose.connect(uri!);
  console.log('Connected to MongoDB for seeding lectures & formulas...');

  // 1. Seed Curated Lectures
  console.log('Seeding curated video lectures...');
  const existingLectureCount = await Lecture.countDocuments();
  if (existingLectureCount < 50) {
    const lectureDocs = Object.values(CURATED_CHAPTER_VIDEOS).map((v) => ({
      id: v.id || `lec_${v.youtubeId}`,
      classLevel: '11',
      subject: v.subject,
      chapter: v.chapter,
      topic: '',
      type: 'FULL_CHAPTER',
      youtubeVideoId: v.youtubeId,
      title: v.title,
      description: v.description,
      channelTitle: v.channelName,
      thumbnail: `https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`,
      duration: v.duration,
      language: 'Hindi',
      source: 'CURATED',
      priority: 15,
      isFeatured: true,
      isRecommended: true,
      isActive: true,
      approvalStatus: 'APPROVED',
      score: 98,
      confidence: 'HIGH'
    }));

    // Deduplicate by youtubeVideoId and chapter
    const seen = new Set<string>();
    const uniqueDocs = lectureDocs.filter((doc) => {
      const key = `${doc.subject}:${doc.chapter}:${doc.youtubeVideoId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    for (const doc of uniqueDocs) {
      await Lecture.findOneAndUpdate(
        { subject: doc.subject, chapter: doc.chapter, type: 'FULL_CHAPTER' },
        { $set: doc },
        { upsert: true }
      );
    }
    console.log(`Successfully seeded ${uniqueDocs.length} curated lectures!`);
  } else {
    console.log(`Lectures collection already has ${existingLectureCount} documents.`);
  }

  // 2. Seed Formulas
  console.log('Seeding formulas...');
  const existingFormulaCount = await Formula.countDocuments();
  if (existingFormulaCount < 30) {
    let formulaInsertCount = 0;
    for (const item of comprehensiveFormulaNotes) {
      for (const f of item.formulas) {
        const id = `fml_${item.subject.toLowerCase()}_${item.chapter.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${f.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`.slice(0, 50);
        await Formula.findOneAndUpdate(
          { id },
          {
            $set: {
              id,
              classLevel: item.classLevel,
              subject: item.subject,
              chapter: item.chapter,
              topic: item.topic,
              title: f.name,
              formula: f.formula,
              variables: f.variables,
              explanation: item.concept,
              example: '',
              examTip: f.examTip,
              trap: f.trap || '',
              tags: [item.subject, item.chapter, item.topic, 'Revision'],
              importance: item.weightage,
              order: 0,
              isActive: true
            }
          },
          { upsert: true }
        );
        formulaInsertCount++;
      }
    }
    console.log(`Successfully seeded ${formulaInsertCount} formulas!`);
  } else {
    console.log(`Formulas collection already has ${existingFormulaCount} documents.`);
  }

  console.log('Seeding completed successfully!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
