import fs from 'fs';
import path from 'path';
import { CURATED_CHAPTER_VIDEOS } from '../../src/data/videoLectures.js';
import { comprehensiveFormulaNotes } from '../../src/data/comprehensiveFormulaNotes.js';

// 1. Export Lectures
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

const seen = new Set();
const uniqueLectures = lectureDocs.filter((doc) => {
  const key = `${doc.subject}:${doc.chapter}:${doc.youtubeVideoId}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

fs.writeFileSync(path.resolve('server/data/curatedLectures.json'), JSON.stringify(uniqueLectures, null, 2));
console.log('Saved', uniqueLectures.length, 'lectures to server/data/curatedLectures.json');

// 2. Export Formulas
const formulas = [];
for (const item of comprehensiveFormulaNotes) {
  for (const f of item.formulas) {
    const id = `fml_${item.subject.toLowerCase()}_${item.chapter.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${f.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`.slice(0, 50);
    formulas.push({
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
    });
  }
}

fs.writeFileSync(path.resolve('server/data/canonicalFormulas.json'), JSON.stringify(formulas, null, 2));
console.log('Saved', formulas.length, 'formulas to server/data/canonicalFormulas.json');
