import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

interface LectureItem {
  id: string;
  classLevel: string;
  subject: string;
  chapter: string;
  topic?: string;
  type: string;
  youtubeVideoId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  language: string;
  source: string;
  priority: number;
  isFeatured: boolean;
  isRecommended: boolean;
  isActive: boolean;
  approvalStatus: string;
  score: number;
  confidence: string;
}

function normalizeChapterName(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim().replace(/\s+/g, ' ');
}

async function main() {
  const jsonPath = path.resolve('server/data/curatedLectures.json');
  const lectures: LectureItem[] = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  console.log(`Loaded ${lectures.length} curated lectures from JSON.`);

  // 1. Build videoLectures.ts
  let tsCode = `export interface VideoResource {
  id: string;
  chapter: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Biology" | string;
  title: string;
  youtubeId: string;
  channelName: string;
  duration: string;
  description: string;
}

// Curated high-yield one-shot lectures from India's top educators for every single syllabus chapter
export const CURATED_CHAPTER_VIDEOS: Record<string, VideoResource> = {\n`;

  const writtenKeys = new Set<string>();

  for (const lec of lectures) {
    const subLower = lec.subject.toLowerCase();
    const chapLower = lec.chapter.toLowerCase();
    const normKey = normalizeChapterName(lec.chapter);

    const keysToAdd = [
      `${subLower}:${chapLower}`,
      chapLower,
      `${subLower}:${normKey}`,
      normKey,
    ];

    const entryObj = {
      id: lec.id,
      chapter: lec.chapter,
      subject: lec.subject,
      title: lec.title,
      youtubeId: lec.youtubeVideoId,
      channelName: lec.channelTitle,
      duration: lec.duration,
      description: lec.description,
    };

    const entryJson = JSON.stringify(entryObj, null, 4);

    for (const k of keysToAdd) {
      if (!writtenKeys.has(k)) {
        writtenKeys.add(k);
        tsCode += `  ${JSON.stringify(k)}: ${entryJson},\n`;
      }
    }
  }

  tsCode += `};\n\n`;

  // Append helper functions and defaults
  tsCode += `// Default fallbacks for each subject
export const DEFAULT_SUBJECT_VIDEOS: Record<string, { youtubeId: string; channelName: string; duration: string }> = {
  Physics: {
    youtubeId: "tx76BJIqOd4",
    channelName: "Prashant Kirad 11th & 12th",
    duration: "1h 54m",
  },
  Chemistry: {
    youtubeId: "V7IhNvWMO0A",
    channelName: "Pankaj Sir Chemistry",
    duration: "1h 30m",
  },
  Mathematics: {
    youtubeId: "nQMOsm2WIYA",
    channelName: "JEE Nexus by Unacademy",
    duration: "3h 38m",
  },
  Biology: {
    youtubeId: "3WbIqrPEKIc",
    channelName: "Sankalp NEET Vedantu",
    duration: "1h 49m",
  },
};

function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\\s+/g, " ");
}

export function getVideoForChapter(subjectName: string, chapterName: string): VideoResource {
  if (!chapterName) {
    const defaultSubject = DEFAULT_SUBJECT_VIDEOS[subjectName] || DEFAULT_SUBJECT_VIDEOS["Physics"];
    return {
      id: "vid-" + (subjectName || "subject").toLowerCase() + "-overview",
      chapter: chapterName || subjectName,
      subject: subjectName,
      title: (subjectName || "Subject") + " — Complete High-Yield Concept Revision",
      youtubeId: defaultSubject.youtubeId,
      channelName: defaultSubject.channelName,
      duration: defaultSubject.duration,
      description: "Comprehensive NCERT theory and problem-solving one shot."
    };
  }

  const subLower = (subjectName || "").toLowerCase().trim();
  const chapLower = chapterName.toLowerCase().trim();
  const normKey = normalizeString(chapterName);

  // 1. Exact Subject + Chapter match
  const specificKey = subLower + ":" + chapLower;
  if (CURATED_CHAPTER_VIDEOS[specificKey]) {
    return CURATED_CHAPTER_VIDEOS[specificKey];
  }

  // 2. Exact Chapter match
  if (CURATED_CHAPTER_VIDEOS[chapLower]) {
    return CURATED_CHAPTER_VIDEOS[chapLower];
  }

  // 3. Normalized string match
  const cleanSpecificKey = subLower + ":" + normKey;
  if (CURATED_CHAPTER_VIDEOS[cleanSpecificKey]) {
    return CURATED_CHAPTER_VIDEOS[cleanSpecificKey];
  }
  if (CURATED_CHAPTER_VIDEOS[normKey]) {
    return CURATED_CHAPTER_VIDEOS[normKey];
  }

  // 4. Partial match strictly matching requested subject
  for (const [key, resource] of Object.entries(CURATED_CHAPTER_VIDEOS)) {
    if (resource.subject && resource.subject.toLowerCase() !== subLower) {
      continue;
    }
    const cleanKeyIter = normalizeString(key.includes(":") ? key.split(":")[1] : key);
    if (normKey.includes(cleanKeyIter) || cleanKeyIter.includes(normKey)) {
      return {
        ...resource,
        chapter: chapterName,
        title: chapterName + " — High-Yield One-Shot Revision"
      };
    }
  }

  // 5. Fallback
  const defaultSubject = DEFAULT_SUBJECT_VIDEOS[subjectName] || DEFAULT_SUBJECT_VIDEOS["Physics"];
  return {
    id: "vid-fallback-" + normKey.slice(0, 15).replace(/\\s+/g, "-"),
    chapter: chapterName,
    subject: subjectName,
    title: chapterName + " — High-Yield Concept Revision",
    youtubeId: defaultSubject.youtubeId,
    channelName: defaultSubject.channelName,
    duration: defaultSubject.duration,
    description: "Curated comprehensive one-shot theory, derivations, and exam shortcuts for " + chapterName + "."
  };
}

export function getChapterVideo(chapterName: string, subjectName: string = 'Physics'): VideoResource {
  return getVideoForChapter(subjectName, chapterName);
}

export function getAllCuratedVideos(): VideoResource[] {
  const map = new Map<string, VideoResource>();
  for (const v of Object.values(CURATED_CHAPTER_VIDEOS)) {
    if (!map.has(v.id)) {
      map.set(v.id, v);
    }
  }
  return Array.from(map.values());
}
`;

  const targetTs = path.resolve('src/data/videoLectures.ts');
  fs.writeFileSync(targetTs, tsCode, 'utf8');
  console.log(`Updated ${targetTs} successfully with ${lectures.length} unique chapters and ${writtenKeys.size} lookup keys.`);

  // 2. Re-seed MongoDB lectures
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora';
  try {
    await mongoose.connect(uri);
    const col = mongoose.connection.collection('lectures');
    await col.deleteMany({});
    await col.insertMany(lectures);
    const dbCount = await col.countDocuments();
    console.log(`Re-seeded MongoDB 'lectures' collection: ${dbCount} documents inserted.`);
    await mongoose.disconnect();
  } catch (err: any) {
    console.warn('MongoDB seed warning:', err?.message || err);
  }

  console.log('Sync finished successfully!');
}

main().catch(console.error);
