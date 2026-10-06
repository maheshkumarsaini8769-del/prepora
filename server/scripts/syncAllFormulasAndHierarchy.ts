import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { comprehensiveFormulaNotes } from '../../src/data/comprehensiveFormulaNotes.js';
import Formula from '../models/Formula.js';
import { ContentHierarchy, Flashcard } from '../models/Admin.js';

function cleanText(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').slice(0, 30);
}

async function run() {
  console.log('=== SYNCING ALL FORMULAS & CONTENT HIERARCHY ===');

  // 1. Build 922 Canonical Formulas from comprehensiveFormulaNotes
  const allFormulas: any[] = [];
  const allFlashcards: any[] = [];

  let formulaGlobalIdx = 0;

  comprehensiveFormulaNotes.forEach((item, itemIdx) => {
    if (!item.formulas || item.formulas.length === 0) return;

    item.formulas.forEach((f, fIdx) => {
      formulaGlobalIdx++;
      const fId = `fml_${cleanText(item.subject)}_${itemIdx}_${fIdx}_${formulaGlobalIdx}`;
      
      allFormulas.push({
        id: fId,
        classLevel: item.classLevel || '11',
        subject: item.subject,
        chapter: item.chapter,
        topic: item.topic,
        title: f.name,
        formula: f.formula,
        variables: f.variables || '',
        explanation: item.concept || (item.shortNotes ? item.shortNotes[0] : ''),
        examTip: f.examTip || (item.keyPoints ? item.keyPoints[0] : ''),
        trap: f.trap || '',
        tags: [
          item.subject,
          item.chapter,
          item.topic,
          item.weightage === 'High' ? 'High Yield' : 'Revision'
        ],
        importance: item.weightage || 'High',
        order: fIdx,
        isActive: true
      });

      // Create matching flashcard for admin flashcards repository
      allFlashcards.push({
        id: `fc_${cleanText(item.subject)}_${itemIdx}_${fIdx}_${formulaGlobalIdx}`,
        type: 'formula',
        subject: item.subject,
        chapter: item.chapter,
        topic: item.topic,
        front: f.name,
        back: `${f.formula}\n\nVariables: ${f.variables || 'Standard physical units'}`,
        explanation: f.examTip ? `Exam Tip: ${f.examTip}` : item.concept,
        difficulty: item.weightage === 'High' ? 'Hard' : 'Medium',
        tags: [item.subject, item.chapter, item.topic, 'High Yield Formula']
      });
    });
  });

  console.log(`Generated ${allFormulas.length} formulas across ${comprehensiveFormulaNotes.length} topics.`);

  // Write to server/data/canonicalFormulas.json
  const jsonPath = path.resolve('server/data/canonicalFormulas.json');
  fs.writeFileSync(jsonPath, JSON.stringify(allFormulas, null, 2), 'utf-8');
  console.log(`Saved ${allFormulas.length} formulas to ${jsonPath}.`);

  // 2. Build Content Hierarchy nodes across JEE, NEET, Board
  const hierarchyNodes: any[] = [];
  let nodeIndex = 0;

  comprehensiveFormulaNotes.forEach((item, itemIdx) => {
    const exams = item.subject === 'Biology'
      ? ['NEET', 'Board']
      : item.subject === 'Mathematics'
      ? ['JEE', 'Board']
      : ['JEE', 'NEET', 'Board'];

    exams.forEach((exam) => {
      nodeIndex++;
      hierarchyNodes.push({
        id: `hier_${exam.toLowerCase()}_${cleanText(item.subject)}_${itemIdx}_${nodeIndex}`,
        exam,
        classLevel: item.classLevel || '11',
        board: 'CBSE',
        subject: item.subject,
        chapter: item.chapter,
        topic: item.topic,
        orderIndex: nodeIndex,
        status: 'Published'
      });
    });
  });

  console.log(`Generated ${hierarchyNodes.length} hierarchy nodes for Content & Hierarchy Manager.`);

  // 3. Connect to MongoDB and seed
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';
  console.log('Connecting to MongoDB at:', mongoUri);
  await mongoose.connect(mongoUri);

  // Clear and insert formulas
  await Formula.deleteMany({});
  await Formula.insertMany(allFormulas);
  console.log(`MongoDB Formula collection seeded with ${await Formula.countDocuments()} formulas.`);

  // Clear and insert content hierarchy
  await ContentHierarchy.deleteMany({});
  await ContentHierarchy.insertMany(hierarchyNodes);
  console.log(`MongoDB ContentHierarchy collection seeded with ${await ContentHierarchy.countDocuments()} nodes.`);

  // Clear and insert flashcards
  await Flashcard.deleteMany({});
  await Flashcard.insertMany(allFlashcards);
  console.log(`MongoDB Flashcard collection seeded with ${await Flashcard.countDocuments()} flashcards.`);

  console.log('=== SYNC COMPLETE! ALL 922 FORMULAS & 1299 HIERARCHY NODES PERSISTED ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
