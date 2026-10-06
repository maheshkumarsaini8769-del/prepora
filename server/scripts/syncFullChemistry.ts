import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Formula from '../models/Formula.js';

dotenv.config();

// Load the complete high-yield Chemistry modules
import { fullChemistryData } from './chemistryDataDefinition.js';

async function main() {
  console.log(`[Chemistry Sync] Total authentic Chemistry modules to inject: ${fullChemistryData.length}`);

  // 1. Update src/data/comprehensiveFormulaNotes.ts
  const formulaNotesPath = path.resolve('src/data/comprehensiveFormulaNotes.ts');
  if (fs.existsSync(formulaNotesPath)) {
    console.log(`[Chemistry Sync] Updating ${formulaNotesPath}...`);
    // Read existing file
    const content = fs.readFileSync(formulaNotesPath, 'utf8');
    // Extract non-chemistry entries (Physics, Mathematics, Biology)
    // We can evaluate or filter existing items
    const match = content.match(/export const comprehensiveFormulaNotes:\s*TopicRevisionItem\[\]\s*=\s*(\[[\s\S]*\]);/);
    if (match) {
      const existingArray = eval(match[1]);
      const nonChemArray = existingArray.filter((it: any) => it.subject !== 'Chemistry');
      const mergedArray = [...nonChemArray, ...fullChemistryData];
      
      const newContent = `import { SubjectName, ClassLevel } from '../types';

export interface TopicFormula {
  name: string;
  formula: string;
  variables: string;
  examTip: string;
  trap?: string;
}

export interface TopicRevisionItem {
  id: string;
  subject: SubjectName;
  classLevel: ClassLevel;
  chapter: string;
  topic: string;
  weightage: 'High' | 'Medium' | 'Low';
  examTarget: 'JEE' | 'NEET' | 'Both';
  concept: string;
  shortNotes: string[];
  formulas: TopicFormula[];
  keyPoints: string[];
}

export const comprehensiveFormulaNotes: TopicRevisionItem[] = ${JSON.stringify(mergedArray, null, 2)};
`;
      fs.writeFileSync(formulaNotesPath, newContent, 'utf8');
      console.log(`[Chemistry Sync] Successfully updated comprehensiveFormulaNotes.ts (Total entries: ${mergedArray.length})`);
    }
  }

  // 2. Update server/data/canonicalFormulas.json
  const canonicalFormulasPath = path.resolve('server/data/canonicalFormulas.json');
  if (fs.existsSync(canonicalFormulasPath)) {
    console.log(`[Chemistry Sync] Updating ${canonicalFormulasPath}...`);
    const existingFormulas = JSON.parse(fs.readFileSync(canonicalFormulasPath, 'utf8'));
    const nonChemFormulas = existingFormulas.filter((f: any) => f.subject !== 'Chemistry');

    // Convert fullChemistryData into Canonical Formula items
    const newChemFormulas: any[] = [];
    let formulaCounter = 1;
    fullChemistryData.forEach((item: any) => {
      item.formulas.forEach((f: any, fIdx: number) => {
        newChemFormulas.push({
          id: `fml_chem_${item.classLevel}_${item.id}_${fIdx}_${formulaCounter++}`,
          classLevel: item.classLevel,
          subject: 'Chemistry',
          chapter: item.chapter,
          topic: item.topic,
          title: f.name,
          formula: f.formula,
          variables: f.variables,
          explanation: item.concept,
          examTip: f.examTip,
          trap: f.trap || 'Watch for sign conventions and standard state conditions.',
          tags: ['Chemistry', item.chapter, item.topic, 'High Yield'],
          importance: item.weightage === 'High' ? 'High' : 'Medium',
          order: fIdx,
          isActive: true
        });
      });
    });

    const mergedFormulas = [...nonChemFormulas, ...newChemFormulas];
    fs.writeFileSync(canonicalFormulasPath, JSON.stringify(mergedFormulas, null, 2), 'utf8');
    console.log(`[Chemistry Sync] Successfully updated canonicalFormulas.json (Total formulas: ${mergedFormulas.length}, Chem formulas: ${newChemFormulas.length})`);
  }

  // 3. Update server/data/chapterNotes.json
  const chapterNotesPath = path.resolve('server/data/chapterNotes.json');
  if (fs.existsSync(chapterNotesPath)) {
    console.log(`[Chemistry Sync] Updating ${chapterNotesPath}...`);
    const existingNotes = JSON.parse(fs.readFileSync(chapterNotesPath, 'utf8'));
    const nonChemNotes = existingNotes.filter((n: any) => n.subject !== 'Chemistry');

    const newChemNotes = fullChemistryData.map((item: any) => ({
      id: item.id,
      title: `${item.topic} — ${item.chapter}`,
      chapter: item.chapter,
      topic: item.topic,
      subject: 'Chemistry',
      classLevel: item.classLevel,
      weightage: item.weightage,
      content: item.concept,
      bullets: item.shortNotes,
      keyPoints: item.keyPoints,
      type: 'curriculum'
    }));

    const mergedNotes = [...nonChemNotes, ...newChemNotes];
    fs.writeFileSync(chapterNotesPath, JSON.stringify(mergedNotes, null, 2), 'utf8');
    console.log(`[Chemistry Sync] Successfully updated chapterNotes.json (Total notes: ${mergedNotes.length})`);
  }

  // 4. Update MongoDB Atlas Formula collection
  try {
    await connectDB();
    console.log(`[Chemistry Sync] Connected to MongoDB. Syncing Chemistry formulas into Atlas...`);
    const allFormulas = JSON.parse(fs.readFileSync(canonicalFormulasPath, 'utf8'));
    
    // Perform bulk upsert in batches of 200
    const batchSize = 200;
    for (let i = 0; i < allFormulas.length; i += batchSize) {
      const batch = allFormulas.slice(i, i + batchSize);
      const bulkOps = batch.map((f: any) => ({
        updateOne: {
          filter: { id: f.id },
          update: { $set: f },
          upsert: true
        }
      }));
      await Formula.bulkWrite(bulkOps);
    }
    const finalCount = await Formula.countDocuments();
    console.log(`[Chemistry Sync] MongoDB Atlas Formula collection synced! Total documents in DB: ${finalCount}`);
  } catch (err: any) {
    console.warn(`[Chemistry Sync] MongoDB sync notice:`, err.message);
  }

  console.log(`[Chemistry Sync] All targets updated successfully!`);
  process.exit(0);
}

main().catch(err => {
  console.error('[Chemistry Sync Fatal Error]:', err);
  process.exit(1);
});
