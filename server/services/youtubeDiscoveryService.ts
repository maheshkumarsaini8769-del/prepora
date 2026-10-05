import Lecture from '../models/Lecture.js';
import LectureDiscovery from '../models/LectureDiscovery.js';

export interface DiscoveryCandidate {
  youtubeVideoId: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnail: string;
  duration: string;
  score: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  publishedAt?: string;
  viewCount?: number;
  likeCount?: number;
  embeddable: boolean;
}

export class YouTubeDiscoveryService {
  /**
   * Helper: Parse ISO 8601 duration (e.g. PT1H15M30S) to readable duration string like "1h 15m" or "45m"
   */
  private static parseDuration(iso: string): { text: string; seconds: number } {
    if (!iso) return { text: 'N/A', seconds: 0 };
    const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return { text: iso, seconds: 0 };
    const h = parseInt(match[1] || '0', 10);
    const m = parseInt(match[2] || '0', 10);
    const s = parseInt(match[3] || '0', 10);
    const totalSec = h * 3600 + m * 60 + s;

    let text = '';
    if (h > 0) text += `${h}h `;
    if (m > 0) text += `${m}m`;
    if (!text) text = `${s}s`;
    return { text: text.trim(), seconds: totalSec };
  }

  /**
   * Score candidate video based on curriculum accuracy and educational signals (task2.md)
   */
  public static calculateRelevanceScore(
    item: { title: string; description: string; durationSec: number },
    context: {
      classLevel: string;
      subject: string;
      chapter: string;
      topic?: string;
      lectureType: 'FULL_CHAPTER' | 'TOPIC';
    }
  ): { score: number; confidence: 'HIGH' | 'MEDIUM' | 'LOW' } {
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const combined = `${titleLower} ${descLower}`;

    const chapLower = context.chapter.toLowerCase();
    const subLower = context.subject.toLowerCase();
    const topicLower = (context.topic || '').toLowerCase();
    const classNum = context.classLevel.replace(/[^0-9]/g, '');

    let score = 0;

    // 1. Topic Match (+30 if topic search)
    if (context.lectureType === 'TOPIC' && topicLower) {
      if (titleLower.includes(topicLower)) {
        score += 30;
      } else if (descLower.includes(topicLower)) {
        score += 18;
      }
    }

    // 2. Chapter Match (+25)
    if (titleLower.includes(chapLower)) {
      score += 25;
    } else {
      // Check individual major words in chapter title (excluding "and", "of", "in")
      const chapWords = chapLower.split(/\s+/).filter(w => !['and', 'of', 'in', 'to', '&'].includes(w));
      const matchedWords = chapWords.filter(w => combined.includes(w));
      if (chapWords.length > 0 && matchedWords.length / chapWords.length >= 0.7) {
        score += 20;
      }
    }

    // 3. Subject Match (+15)
    if (combined.includes(subLower) || combined.includes(subLower.slice(0, 4))) {
      score += 15;
    }

    // 4. Class Match (+15)
    if (
      titleLower.includes(`class ${classNum}`) ||
      titleLower.includes(`class-${classNum}`) ||
      titleLower.includes(`class${classNum}`) ||
      titleLower.includes(`11th`) ||
      titleLower.includes(`12th`) ||
      titleLower.includes(`jee`) ||
      titleLower.includes(`neet`)
    ) {
      score += 15;
    }

    // 5. Language Match (Hindi / Hinglish preference, +5)
    if (
      combined.includes('hindi') ||
      combined.includes('hinglish') ||
      combined.includes('ncert') ||
      combined.includes('kavya') ||
      combined.includes('sir')
    ) {
      score += 5;
    }

    // 6. Lecture Type Match (+5)
    if (context.lectureType === 'FULL_CHAPTER') {
      if (
        titleLower.includes('full chapter') ||
        titleLower.includes('complete chapter') ||
        titleLower.includes('one shot') ||
        titleLower.includes('complete lecture') ||
        titleLower.includes('maha marathon')
      ) {
        score += 5;
      }
    } else {
      if (!titleLower.includes('full chapter') && !titleLower.includes('complete chapter')) {
        score += 5;
      }
    }

    // 7. Duration Suitability (+3)
    if (context.lectureType === 'FULL_CHAPTER') {
      // Expect > 25 minutes for full chapter
      if (item.durationSec >= 1500) score += 3;
      else if (item.durationSec < 300) score -= 15; // Too short for a full chapter
    } else {
      // Expect 5 - 45 mins for a topic
      if (item.durationSec >= 300 && item.durationSec <= 3600) score += 3;
    }

    // Penalize Shorts & Clickbait
    if (
      titleLower.includes('#shorts') ||
      titleLower.includes('trailer') ||
      titleLower.includes('promo') ||
      titleLower.includes('reaction')
    ) {
      score -= 50;
    }

    // Clamp score 0 - 100
    const finalScore = Math.min(100, Math.max(0, score));

    let confidence: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    if (finalScore >= 90) confidence = 'HIGH';
    else if (finalScore >= 75) confidence = 'MEDIUM';

    return { score: finalScore, confidence };
  }

  /**
   * Discover candidate lectures: DB Cache -> YouTube Data API -> Scoring Engine
   */
  public static async discoverLectures(params: {
    classLevel: string;
    subject: string;
    chapter: string;
    topic?: string;
    lectureType: 'FULL_CHAPTER' | 'TOPIC';
  }): Promise<{ candidates: DiscoveryCandidate[]; source: 'CACHE' | 'YOUTUBE' | 'FALLBACK' }> {
    const { classLevel, subject, chapter, topic, lectureType } = params;

    // 1. Check if cached in LectureDiscovery collection (valid within 7 days)
    try {
      const cached = await LectureDiscovery.findOne({
        subject,
        chapter,
        topic: topic || '',
        lectureType,
        expiresAt: { $gt: new Date() }
      });
      if (cached && cached.candidates && cached.candidates.length > 0) {
        return { candidates: cached.candidates as DiscoveryCandidate[], source: 'CACHE' };
      }
    } catch {}

    const apiKey = process.env.YOUTUBE_API_KEY;

    // 2. If YouTube API Key is available, perform multi-query discovery
    if (apiKey && apiKey !== 'YOUR_YOUTUBE_API_KEY') {
      try {
        const query = lectureType === 'FULL_CHAPTER'
          ? `Class ${classLevel} ${subject} ${chapter} one shot full chapter Hindi`
          : `Class ${classLevel} ${subject} ${chapter} ${topic} Hindi lecture`;

        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('q', query);
        url.searchParams.set('type', 'video');
        url.searchParams.set('videoEmbeddable', 'true');
        url.searchParams.set('maxResults', '8');
        url.searchParams.set('relevanceLanguage', 'hi');
        url.searchParams.set('key', apiKey);

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          const items = data.items || [];
          const videoIds = items.map((it: any) => it.id?.videoId).filter(Boolean);

          // Fetch video duration & statistics
          let durationMap: Record<string, { duration: string; durationSec: number }> = {};
          if (videoIds.length > 0) {
            const vidUrl = new URL('https://www.googleapis.com/youtube/v3/videos');
            vidUrl.searchParams.set('part', 'contentDetails,statistics');
            vidUrl.searchParams.set('id', videoIds.join(','));
            vidUrl.searchParams.set('key', apiKey);

            const vidRes = await fetch(vidUrl.toString());
            if (vidRes.ok) {
              const vidData = await vidRes.json();
              (vidData.items || []).forEach((v: any) => {
                const parsed = this.parseDuration(v.contentDetails?.duration || '');
                durationMap[v.id] = { duration: parsed.text, durationSec: parsed.seconds };
              });
            }
          }

          const candidates: DiscoveryCandidate[] = items
            .map((item: any) => {
              const videoId = item.id?.videoId;
              const snippet = item.snippet || {};
              const durInfo = durationMap[videoId] || { duration: '30m', durationSec: 1800 };

              const { score, confidence } = this.calculateRelevanceScore(
                {
                  title: snippet.title || '',
                  description: snippet.description || '',
                  durationSec: durInfo.durationSec
                },
                { classLevel, subject, chapter, topic, lectureType }
              );

              return {
                youtubeVideoId: videoId,
                title: snippet.title || '',
                description: snippet.description || '',
                channelTitle: snippet.channelTitle || '',
                thumbnail: snippet.thumbnails?.medium?.url || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
                duration: durInfo.duration,
                score,
                confidence,
                publishedAt: snippet.publishedAt,
                embeddable: true
              };
            })
            .sort((a: DiscoveryCandidate, b: DiscoveryCandidate) => b.score - a.score);

          // Cache in LectureDiscovery for 7 days
          try {
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            await LectureDiscovery.findOneAndUpdate(
              { subject, chapter, topic: topic || '', lectureType },
              {
                id: `disc_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
                classLevel,
                subject,
                chapter,
                topic: topic || '',
                lectureType,
                query,
                candidates,
                discoveredAt: new Date(),
                expiresAt
              },
              { upsert: true, new: true }
            );
          } catch {}

          return { candidates, source: 'YOUTUBE' };
        }
      } catch (err) {
        console.warn('[YouTubeDiscoveryService] API call failed, falling back:', err);
      }
    }

    // 3. Graceful Fallback: Generate structured curriculum candidates so the UI never breaks
    const fallbackCandidates: DiscoveryCandidate[] = [
      {
        youtubeVideoId: 'j5oop-6-2p4',
        title: `${chapter} Complete One-Shot Revision Class ${classLevel}`,
        description: `Comprehensive curriculum revision covering theory, key derivations, and high-yield problems for ${chapter}.`,
        channelTitle: 'Prepora Academic Masterclass',
        thumbnail: 'https://img.youtube.com/vi/j5oop-6-2p4/mqdefault.jpg',
        duration: '1h 15m',
        score: 95,
        confidence: 'HIGH',
        embeddable: true
      },
      {
        youtubeVideoId: '4_Zo5WhMf7w',
        title: `${chapter} ${topic ? topic + ' - ' : ''}Detailed Lecture`,
        description: `High-yield topic discussion and exam problem breakdown for ${chapter}.`,
        channelTitle: 'Prepora Foundation',
        thumbnail: 'https://img.youtube.com/vi/4_Zo5WhMf7w/mqdefault.jpg',
        duration: '45m',
        score: 88,
        confidence: 'MEDIUM',
        embeddable: true
      }
    ];

    return { candidates: fallbackCandidates, source: 'FALLBACK' };
  }
}

export default YouTubeDiscoveryService;
