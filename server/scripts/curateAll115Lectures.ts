import fs from 'fs';
import path from 'path';
import https from 'https';

interface RawLecture {
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

interface YTSearchResult {
  id: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
  viewCountNum: number;
  durationSec: number;
}

const CONSENT_COOKIE =
  'SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwMTEwLjA2X3AwGgJlbiACGgYIgLCnngY; PREF=hl=en&gl=IN;';

function parseDurationSec(durationStr: string): number {
  if (!durationStr) return 0;
  const parts = durationStr.split(':').map((p) => parseInt(p, 10) || 0);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

function parseViewCount(viewStr: string): number {
  if (!viewStr) return 0;
  const numStr = viewStr.replace(/[^0-9]/g, '');
  return parseInt(numStr, 10) || 0;
}

function extractYtInitialData(html: string): any {
  const marker = 'ytInitialData = ';
  const idx = html.indexOf(marker);
  if (idx === -1) return null;
  const start = html.indexOf('{', idx);
  if (start === -1) return null;
  const scriptEnd = html.indexOf('</script>', start);
  if (scriptEnd !== -1) {
    let str = html.slice(start, scriptEnd).trim();
    if (str.endsWith(';')) str = str.slice(0, -1).trim();
    try {
      return JSON.parse(str);
    } catch {}
  }

  // Fallback: match braces
  let depth = 0;
  for (let i = start; i < Math.min(start + 2500000, html.length); i++) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(html.slice(start, i + 1));
        } catch {}
        break;
      }
    }
  }
  return null;
}

async function fetchUrl(url: string, redirectCount = 0): Promise<string> {
  if (redirectCount > 3) return '';
  return new Promise((resolve) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          Cookie: CONSENT_COOKIE,
        },
      },
      (res) => {
        if (
          (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) &&
          res.headers.location
        ) {
          const nextUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : `https://www.youtube.com${res.headers.location}`;
          return fetchUrl(nextUrl, redirectCount + 1).then(resolve);
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    ).on('error', () => resolve(''));
  });
}

async function searchYouTube(query: string): Promise<YTSearchResult[]> {
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const data = await fetchUrl(url);
  if (!data) return [];

  const json = extractYtInitialData(data);
  if (!json) return [];

  try {
    const sectionList =
      json.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer
        ?.contents || [];
    const results: YTSearchResult[] = [];

    for (const section of sectionList) {
      const contents = section.itemSectionRenderer?.contents || [];
      for (const item of contents) {
        const v = item.videoRenderer;
        if (v && v.videoId && v.lengthText) {
          const durStr = v.lengthText?.simpleText || '';
          const title = v.title?.runs?.[0]?.text || '';
          const channel = v.ownerText?.runs?.[0]?.text || '';
          const views = v.viewCountText?.simpleText || '';
          const durationSec = parseDurationSec(durStr);
          const viewCountNum = parseViewCount(views);

          // Exclude shorts, trailers, and micro-clips under 12 minutes
          if (
            durationSec >= 720 &&
            durationSec <= 50000 &&
            !title.toLowerCase().includes('#shorts') &&
            !title.toLowerCase().includes('trailer')
          ) {
            results.push({
              id: v.videoId,
              title,
              channel,
              duration: durStr,
              views,
              viewCountNum,
              durationSec,
            });
          }
        }
      }
    }
    return results;
  } catch {
    return [];
  }
}

function scoreCandidate(video: YTSearchResult, chapter: string, subject: string): number {
  let score = 0;
  const title = video.title.toLowerCase();
  const chapWords = chapter
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => !['and', 'of', 'in', 'to', 'the', 'for', 'a', 'an', 'part', 'complete', 'properties'].includes(w));

  // Word matches
  let matched = 0;
  for (const w of chapWords) {
    if (title.includes(w)) matched++;
  }
  if (chapWords.length > 0) {
    score += (matched / chapWords.length) * 50;
  }

  // Exact chapter name phrase match bonus
  if (title.includes(chapter.toLowerCase())) {
    score += 35;
  }

  // One shot / full chapter keywords
  if (title.includes('one shot') || title.includes('oneshot')) score += 15;
  if (title.includes('full chapter') || title.includes('complete chapter')) score += 15;
  if (title.includes('revision') || title.includes('marathon')) score += 10;

  // Premium Indian educator / channel bonus
  const ch = video.channel.toLowerCase();
  if (
    ch.includes('eduniti') ||
    ch.includes('physics galaxy') ||
    ch.includes('pankaj sir') ||
    ch.includes('bharat panchal') ||
    ch.includes('chemistry guruji') ||
    ch.includes('vedantu') ||
    ch.includes('wallah') ||
    ch.includes('sankalp') ||
    ch.includes('unacademy') ||
    ch.includes('mohit tyagi') ||
    ch.includes('prashant kirad') ||
    ch.includes('ashu') ||
    ch.includes('next toppers') ||
    ch.includes('learn and share') ||
    ch.includes('ashish') ||
    ch.includes('arvind kalia') ||
    ch.includes('neha agrawal') ||
    ch.includes('ozone') ||
    ch.includes('garima') ||
    ch.includes('doubtnut') ||
    ch.includes('seep pahuja') ||
    ch.includes('competishun')
  ) {
    score += 20;
  }

  // Subject match bonus
  if (title.includes(subject.toLowerCase())) {
    score += 10;
  }

  // Duration bonus (ideal 30m - 6h)
  if (video.durationSec >= 1800 && video.durationSec <= 21600) score += 15;

  // View count bonus
  if (video.viewCountNum > 50000) score += 5;
  if (video.viewCountNum > 200000) score += 5;

  return score;
}

function formatDurationText(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) {
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${m}m`;
}

// Previously duplicate generic IDs that MUST be replaced
const GENERIC_DUPLICATE_IDS = new Set([
  '7JlR8gNRQIs',
  'PyNboHgtYzM',
  'thnDxFdkzZs',
  '0RRVV4Diomg',
  'V7IhNvWMO0A',
  'CGA8sRwqIFg',
  'URUJD5NEXC8',
  'RTKuB9dHfIw',
  'gRHZwJ9O2Ow',
  'vWSu-O6MVBI',
  'f2hYBE7oEpk',
  '07DRdzSlWYw',
]);

// NCERT Class 12 chapter indicator
const CLASS_12_CHAPTERS = new Set([
  // Physics
  'electric charges and fields',
  'electrostatic potential and capacitance',
  'current electricity',
  'moving charges and magnetism',
  'magnetism and matter',
  'electromagnetic induction',
  'alternating current',
  'electromagnetic waves',
  'ray optics and optical instruments',
  'wave optics',
  'dual nature of radiation and matter',
  'atoms',
  'nuclei',
  'semiconductor electronics',
  // Chemistry
  'solutions',
  'electrochemistry',
  'chemical kinetics',
  'the d- and f-block elements',
  'coordination compounds',
  'haloalkanes and haloarenes',
  'alcohols, phenols and ethers',
  'aldehydes, ketones and carboxylic acids',
  'amines',
  'biomolecules',
  // Math
  'relations and functions',
  'inverse trigonometric functions',
  'matrices',
  'determinants',
  'continuity and differentiability',
  'application of derivatives',
  'integrals',
  'applications of integrals',
  'differential equations',
  'vector algebra',
  'three dimensional geometry',
  'linear programming',
  'probability',
  // Biology
  'sexual reproduction in flowering plants',
  'human reproduction',
  'reproductive health',
  'principles of inheritance and variation',
  'molecular basis of inheritance',
  'evolution',
  'human health and disease',
  'microbes in human welfare',
  'biotechnology: principles and processes',
  'biotechnology and its applications',
  'organisms and populations',
  'ecosystem',
  'biodiversity and conservation',
]);

async function main() {
  const curatedPath = path.resolve('server/data/curatedLectures.json');
  const lectures: RawLecture[] = JSON.parse(fs.readFileSync(curatedPath, 'utf8'));
  console.log(`Loaded ${lectures.length} curated lectures.`);

  const assignedVideoIds = new Set<string>();

  // Pre-seed legitimate non-generic IDs
  for (const lec of lectures) {
    if (!GENERIC_DUPLICATE_IDS.has(lec.youtubeVideoId)) {
      assignedVideoIds.add(lec.youtubeVideoId);
    }
  }

  for (let i = 0; i < lectures.length; i++) {
    const lec = lectures[i];
    const chapLower = lec.chapter.toLowerCase().trim();

    // Correct classLevel if needed
    const correctClass = CLASS_12_CHAPTERS.has(chapLower) ? '12' : '11';
    lec.classLevel = correctClass;

    // If already has a unique, high-scoring non-generic ID, skip
    if (!GENERIC_DUPLICATE_IDS.has(lec.youtubeVideoId)) {
      console.log(`[${i + 1}/${lectures.length}] Already curated: [${lec.subject}] "${lec.chapter}" (Class ${lec.classLevel}) -> [${lec.youtubeVideoId}] (${lec.channelTitle})`);
      continue;
    }

    console.log(`\n[${i + 1}/${lectures.length}] Curating: [${lec.subject}] "${lec.chapter}" (Class ${lec.classLevel})`);

    const cleanChapter = lec.chapter
      .replace(/One-Shot/gi, '')
      .replace(/Masterclass/gi, '')
      .replace(/Complete Concept Revision/gi, '')
      .replace(/Complete NCERT Decode/gi, '')
      .replace(/Super One-Shot/gi, '')
      .replace(/High-Yield/gi, '')
      .trim();

    const searchQueries = [
      `${cleanChapter} ${lec.subject} one shot`,
      `Class ${lec.classLevel} ${lec.subject} ${cleanChapter} one shot`,
      `${cleanChapter} class ${lec.classLevel} one shot hindi`,
      `${cleanChapter} full chapter revision`,
    ];

    let bestVideo: YTSearchResult | null = null;
    let highestScore = -1;

    for (const q of searchQueries) {
      const candidates = await searchYouTube(q);

      for (const cand of candidates) {
        if (assignedVideoIds.has(cand.id) || GENERIC_DUPLICATE_IDS.has(cand.id)) continue;

        const score = scoreCandidate(cand, cleanChapter, lec.subject);
        if (score > highestScore) {
          highestScore = score;
          bestVideo = cand;
        }
      }

      if (bestVideo && highestScore >= 45) {
        break;
      }
      await new Promise((r) => setTimeout(r, 600));
    }

    if (bestVideo) {
      assignedVideoIds.add(bestVideo.id);
      const formattedDuration = formatDurationText(bestVideo.durationSec);
      console.log(`  -> Selected: [${bestVideo.id}] "${bestVideo.title}" (${bestVideo.channel}, ${formattedDuration}, score: ${highestScore.toFixed(1)})`);

      lectures[i] = {
        ...lec,
        youtubeVideoId: bestVideo.id,
        title: `${lec.chapter} — Full Chapter High-Yield One-Shot`,
        description: `Complete NCERT and entrance exam theory, concept derivations, and high-yield problem solving for ${lec.chapter} (${lec.subject}). Taught by ${bestVideo.channel}.`,
        channelTitle: bestVideo.channel,
        thumbnail: `https://img.youtube.com/vi/${bestVideo.id}/hqdefault.jpg`,
        duration: formattedDuration,
        language: 'Hinglish / Hindi',
        priority: 25,
        score: Math.min(100, Math.round(highestScore)),
        confidence: highestScore >= 70 ? 'HIGH' : 'MEDIUM',
      };
    } else {
      console.warn(`  -> Could not find fresh unique candidate for "${lec.chapter}".`);
    }

    // Save checkpoint after every chapter
    fs.writeFileSync(curatedPath, JSON.stringify(lectures, null, 2));

    // Polite delay between chapters
    await new Promise((r) => setTimeout(r, 1000));
  }

  // Summary
  const finalIds = new Set(lectures.map((l) => l.youtubeVideoId));
  console.log(`\n======================================================`);
  console.log(`Finished Curating all ${lectures.length} lectures!`);
  console.log(`Unique YouTube Video IDs: ${finalIds.size} / ${lectures.length}`);
  console.log(`======================================================`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
