import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { canonicalSyllabus } from '../../src/data/canonicalSyllabusData.js';
import QuestionModel from '../models/Question.js';

dotenv.config();

function norm(s: string) {
  return String(s || '')
    .toLowerCase()
    .replace(/\bsome\b/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function findCanonicalChapter(chapterName: string, subjectName: string) {
  const chLower = chapterName.trim().toLowerCase();
  const subLower = subjectName.trim().toLowerCase();
  const chNorm = norm(chapterName);

  // 1. Exact name + subject
  let match = canonicalSyllabus.find(c => 
    c.name.toLowerCase() === chLower && 
    c.subjectName.toLowerCase() === subLower
  );
  if (match) return match;

  // 2. Normalized name + subject
  match = canonicalSyllabus.find(c => 
    c.subjectName.toLowerCase() === subLower && 
    norm(c.name) === chNorm
  );
  if (match) return match;

  // 3. Contains name + subject
  match = canonicalSyllabus.find(c => 
    c.subjectName.toLowerCase() === subLower && 
    (c.name.toLowerCase().includes(chLower) || chLower.includes(c.name.toLowerCase()))
  );
  if (match) return match;

  // 4. Any subject with normalized name
  match = canonicalSyllabus.find(c => norm(c.name) === chNorm);
  if (match) return match;

  // 5. Any subject with fuzzy contains
  match = canonicalSyllabus.find(c => 
    c.name.toLowerCase().includes(chLower) || chLower.includes(c.name.toLowerCase())
  );
  return match;
}

const dummyRegex = /High Yield Application|Core Concept Drill|Reaction & Synthesis|Mechanism & Analysis|Calculus & Geometry|Analytic Problem/i;

async function remapAll() {
  const files = [
    { path: 'src/data/questions/physicsBank.json', subject: 'Physics' },
    { path: 'src/data/questions/chemistryBank.json', subject: 'Chemistry' },
    { path: 'src/data/questions/mathBank.json', subject: 'Mathematics' },
    { path: 'server/data/questions/physicsBank.json', subject: 'Physics' },
    { path: 'server/data/questions/chemistryBank.json', subject: 'Chemistry' },
    { path: 'server/data/questions/mathBank.json', subject: 'Mathematics' }
  ];

  const remappedQuestionIds: { id: string; topic: string; concept: string }[] = [];

  for (const file of files) {
    const fullPath = path.resolve(file.path);
    if (!fs.existsSync(fullPath)) continue;

    const questions: any[] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    let remapCount = 0;

    const chapterGroups: Record<string, any[]> = {};
    questions.forEach((q: any) => {
      if (dummyRegex.test(q.topic || '')) {
        if (!chapterGroups[q.chapter]) chapterGroups[q.chapter] = [];
        chapterGroups[q.chapter].push(q);
      }
    });

    for (const [chName, qList] of Object.entries(chapterGroups)) {
      const can = findCanonicalChapter(chName, file.subject);
      if (!can || !can.topics || can.topics.length === 0) {
        console.warn(`[WARN] No canonical topics for "${chName}" in ${file.path}`);
        continue;
      }
      const topicNames = can.topics.map((t: any) => t.name);
      qList.forEach((q, idx) => {
        const assignedTopic = topicNames[idx % topicNames.length];
        q.topic = assignedTopic;
        if (!q.concept || dummyRegex.test(q.concept) || q.concept.includes(chName)) {
          q.concept = assignedTopic;
        }
        remapCount++;
        remappedQuestionIds.push({ id: q.id, topic: assignedTopic, concept: q.concept });
      });
    }

    fs.writeFileSync(fullPath, JSON.stringify(questions, null, 2), 'utf8');
    console.log(`[FILE] ${file.path}: Successfully remapped ${remapCount} questions to real canonical topics.`);
  }

  // Update MongoDB if connected
  const uri = process.env.MONGODB_URI;
  if (uri) {
    try {
      console.log('[DB] Connecting to MongoDB to update Question collection...');
      await mongoose.connect(uri);
      let dbUpdated = 0;

      // Group by ID to deduplicate
      const uniqueUpdates = new Map<string, { topic: string; concept: string }>();
      for (const item of remappedQuestionIds) {
        uniqueUpdates.set(item.id, { topic: item.topic, concept: item.concept });
      }

      const bulkOps = Array.from(uniqueUpdates.entries()).map(([id, data]) => ({
        updateOne: {
          filter: { id },
          update: { $set: { topic: data.topic, concept: data.concept } }
        }
      }));

      if (bulkOps.length > 0) {
        const res = await QuestionModel.bulkWrite(bulkOps);
        dbUpdated = (res.modifiedCount || 0) + (res.upsertedCount || 0);
        console.log(`[DB] Successfully updated ${dbUpdated} questions in MongoDB.`);
      }

      // Check if any dummy topics remain in DB
      const remainingDummy = await QuestionModel.countDocuments({
        topic: dummyRegex
      });
      console.log(`[DB] Remaining questions with dummy topics in MongoDB: ${remainingDummy}`);

      await mongoose.disconnect();
    } catch (err) {
      console.error('[DB] Error updating MongoDB:', err);
    }
  }

  console.log('Done remapping all dummy topics!');
}

remapAll().catch(console.error);
