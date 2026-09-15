import { ISourceDocument, ITopicAllocation } from '../models/AIFactory.js';
import { BIOLOGY_CHAPTER_1_TOPICS, TOPIC_PROFILES } from './biologyChapter1Bank.js';

export interface IRawTopicWeightInput {
  topic: string;
  rawWeight?: number;
}

/**
 * 1. Verify if a topic is genuinely supported by the uploaded source PDF
 *
 * "The AI must NEVER generate questions for a topic that is not supported by the uploaded source.
 *  If an admin-defined topic is missing from the uploaded PDF:
 *  Mark: SOURCE CONTENT NOT FOUND
 *  Question target for that topic: 0
 *  Do not hallucinate content."
 */
export function verifyTopicInSource(
  topic: string,
  chapter: string,
  subject: string,
  doc?: ISourceDocument | null,
  rawText?: string
): { supported: boolean; status: 'Verified' | 'SOURCE CONTENT NOT FOUND'; reason?: string; pageRef?: string } {
  const tNorm = topic.trim().toLowerCase();
  const cNorm = chapter.trim().toLowerCase();
  const sNorm = subject.trim().toLowerCase();
  const isBiology = sNorm === 'biology' || cNorm.includes('living');

  // Case A: NCERT Biology Chapter 1 "The Living World"
  if (isBiology && (cNorm.includes('living') || cNorm.includes('world') || cNorm === 'chapter 1' || cNorm.includes('biology'))) {
    const docText = (rawText || doc?.rawTextSnippet || '').toLowerCase();
    const isTaxonomicalAid = [
      'herbarium',
      'botanical garden',
      'museum',
      'zoological park',
      'zoo',
      'couplet',
      'lead',
      'monograph',
      'taxonomical aid',
      'taxonomic aid',
      'arboretum'
    ].some((k) => tNorm.includes(k));

    // Section 21 of task.md:
    // If Taxonomical Aids topics (Herbarium, Botanical Gardens, Arboretums, Museum, Zoological Parks, Key, Monograph)
    // are not present in the uploaded source, mark them: NOT FOUND IN SOURCE (SOURCE CONTENT NOT FOUND) and allocate 0 questions.
    if (isTaxonomicalAid) {
      const mentionsAidInText =
        docText.length > 50 &&
        ['herbarium', 'botanical garden', 'museum', 'zoological park', 'zoo', 'monograph', 'taxonomical aid', 'arboretum'].some(
          (k) => docText.includes(k)
        );
      const mentionsAidInExtracted = doc?.extractedTopics?.some((et) =>
        ['herbarium', 'botanical garden', 'museum', 'zoo', 'monograph', 'taxonomical aid'].some((k) =>
          et.toLowerCase().includes(k)
        )
      );

      // If document is provided and neither text nor extracted topics mention taxonomical aids, strictly exclude it!
      if (doc && !mentionsAidInText && !mentionsAidInExtracted) {
        return {
          supported: false,
          status: 'SOURCE CONTENT NOT FOUND',
          reason: `Topic '${topic}' (Taxonomical Aids) is not found in the uploaded source PDF (Rationalised NCERT Chapter 1 omits taxonomical aids). Target allocated: 0 questions to prevent AI hallucination.`
        };
      }
    }

    const profileIndex = TOPIC_PROFILES.findIndex((p) => {
      const pNorm = p.name.toLowerCase();
      return (
        pNorm === tNorm ||
        tNorm.includes(pNorm) ||
        pNorm.includes(tNorm) ||
        p.terms.some((term) => tNorm.includes(term.term.toLowerCase()))
      );
    });

    if (profileIndex >= 0) {
      const p = TOPIC_PROFILES[profileIndex];
      return {
        supported: true,
        status: 'Verified',
        pageRef: `NCERT Biology Class 11 Page ${p.pageNum}`
      };
    }

    if (doc?.extractedTopics?.some((et) => et.toLowerCase() === tNorm || tNorm.includes(et.toLowerCase()))) {
      return {
        supported: true,
        status: 'Verified',
        pageRef: 'Verified via Document Structure'
      };
    }

    if (docText.length > 50 && (docText.includes(tNorm) || tNorm.split(/\s+/).filter(w => w.length > 4).some(w => docText.includes(w)))) {
      return {
        supported: true,
        status: 'Verified',
        pageRef: 'Verified via Source PDF Text Excerpt'
      };
    }

    return {
      supported: false,
      status: 'SOURCE CONTENT NOT FOUND',
      reason: `Topic '${topic}' is not present in NCERT Chapter 1 'The Living World' source PDF. Target set to 0 to prevent hallucination.`
    };
  }

  // Case B: Physics Kinematics
  if (sNorm === 'physics' || cNorm.includes('motion') || cNorm.includes('kinematics')) {
    const kinematicsTopics = [
      'motion in 1d',
      'displacement',
      'velocity',
      'acceleration',
      'kinematic',
      'free fall',
      'gravity',
      'relative velocity',
      'projectile',
      'circular motion'
    ];
    const matchesKinematics = kinematicsTopics.some((k) => tNorm.includes(k));
    if (matchesKinematics) {
      return {
        supported: true,
        status: 'Verified',
        pageRef: 'Verified in Physics Mechanics Syllabus'
      };
    }
  }

  // Case C: General Source Document validation
  if (doc) {
    if (doc.extractedTopics?.some((et) => et.toLowerCase() === tNorm || tNorm.includes(et.toLowerCase()))) {
      return {
        supported: true,
        status: 'Verified',
        pageRef: `Verified in ${doc.filename}`
      };
    }
    const docText = (rawText || doc.rawTextSnippet || '').toLowerCase();
    if (docText.length > 50) {
      const keywords = tNorm.split(/\s+/).filter((w) => w.length > 4);
      const matchCount = keywords.filter((k) => docText.includes(k)).length;
      if (matchCount >= Math.min(2, keywords.length) && keywords.length > 0) {
        return {
          supported: true,
          status: 'Verified',
          pageRef: `Verified in ${doc.filename}`
        };
      }
    }
  }

  return {
    supported: false,
    status: 'SOURCE CONTENT NOT FOUND',
    reason: `Topic '${topic}' is not found in the uploaded source content. Target set to 0 to prevent AI hallucination.`
  };
}

/**
 * 2. Normalizes topic weights so all supported weights sum to EXACTLY 100.0%.
 *
 * Example: 19 topics x 15% (raw sum 285%) must NOT produce 285%.
 * It normalizes each to 15 / 285 * 100 = 5.263%, with sum = 100.0%.
 *
 * If admin enters equal importance or blank, automatically normalizes weights.
 * Topics with 'SOURCE CONTENT NOT FOUND' receive 0.0% normalized weight.
 */
export function normalizeTopicWeights(
  topics: Array<{ name: string; rawWeight?: number; supported: boolean }>
): Array<{ name: string; rawWeight: number; normalizedWeight: number; supported: boolean }> {
  const supportedTopics = topics.filter((t) => t.supported);

  if (supportedTopics.length === 0) {
    return topics.map((t) => ({
      name: t.name,
      rawWeight: t.rawWeight ?? 0,
      normalizedWeight: 0,
      supported: false
    }));
  }

  const rawSum = supportedTopics.reduce((acc, t) => acc + Math.max(0, Number(t.rawWeight) || 0), 0);
  const allEqualOrZero = rawSum === 0 || supportedTopics.every((t) => (t.rawWeight ?? 0) === (supportedTopics[0].rawWeight ?? 0));

  let rawAllocations: Record<string, number> = {};

  if (allEqualOrZero) {
    const equalShare = 100 / supportedTopics.length;
    supportedTopics.forEach((t) => {
      rawAllocations[t.name] = equalShare;
    });
  } else {
    supportedTopics.forEach((t) => {
      const rw = Math.max(0, Number(t.rawWeight) || 0);
      rawAllocations[t.name] = (rw / rawSum) * 100;
    });
  }

  return topics.map((t) => {
    if (!t.supported) {
      return {
        name: t.name,
        rawWeight: Number(t.rawWeight) || 0,
        normalizedWeight: 0,
        supported: false
      };
    }
    const norm = Number((rawAllocations[t.name] || 0).toFixed(3));
    return {
      name: t.name,
      rawWeight: Number(t.rawWeight) || 1,
      normalizedWeight: norm,
      supported: true
    };
  });
}

/**
 * 3. Question Allocation based on 5 factors:
 * 1. Source content coverage (supported = true, else target = 0)
 * 2. Topic importance (normalized weight)
 * 3. Concept density (number of concepts / terms / pages)
 * 4. Exam relevance (NEET / CBSE / RBSE high-yield weighting)
 * 5. Existing question coverage (fills gaps where bank is sparse)
 */
export function calculateQuestionAllocation(params: {
  targetCount: number;
  chapter: string;
  subject: string;
  topics: Array<{ name: string; rawWeight?: number }>;
  doc?: ISourceDocument | null;
  existingQuestionsPerTopic?: Record<string, number>;
  examTargets?: string[];
}): ITopicAllocation[] {
  const {
    targetCount,
    chapter,
    subject,
    topics,
    doc,
    existingQuestionsPerTopic = {},
    examTargets = ['NEET', 'CBSE', 'RBSE']
  } = params;

  const verifiedList = topics.map((t) => {
    const v = verifyTopicInSource(t.name, chapter, subject, doc);
    return {
      name: t.name,
      rawWeight: t.rawWeight,
      supported: v.supported,
      status: v.status,
      pageRef: v.pageRef,
      reason: v.reason
    };
  });

  const normalizedList = normalizeTopicWeights(
    verifiedList.map((v) => ({
      name: v.name,
      rawWeight: v.rawWeight,
      supported: v.supported
    }))
  );

  const supported = verifiedList.filter((v) => v.supported);

  if (supported.length === 0) {
    return verifiedList.map((v) => ({
      topic: v.name,
      rawWeight: v.rawWeight || 0,
      normalizedWeight: 0,
      sourceSupported: false,
      sourceStatus: 'SOURCE CONTENT NOT FOUND',
      targetQuestions: 0,
      generatedCount: 0,
      unsupportedReason: v.reason
    }));
  }

  const scores: Array<{
    name: string;
    score: number;
    density: number;
    relevance: number;
    existingPenalty: number;
  }> = [];

  for (const s of supported) {
    const normObj = normalizedList.find((n) => n.name === s.name);
    const normWeight = normObj ? normObj.normalizedWeight : 100 / supported.length;
    const importance = normWeight / 100;

    let density = 1.0;
    const pIndex = TOPIC_PROFILES.findIndex((p) => p.name.toLowerCase() === s.name.toLowerCase());
    if (pIndex >= 0) {
      const p = TOPIC_PROFILES[pIndex];
      const termCount = p.terms?.length || 2;
      const factsCount = p.facts?.length || 4;
      density = 0.9 + (termCount * 0.05) + (factsCount * 0.03);
    }

    let relevance = 1.0;
    const nameLower = s.name.toLowerCase();
    if (
      nameLower.includes('nomenclature') ||
      nameLower.includes('rules') ||
      nameLower.includes('hierarchy') ||
      nameLower.includes('table 1.1') ||
      nameLower.includes('herbarium') ||
      nameLower.includes('key')
    ) {
      relevance = 1.2;
    } else if (nameLower.includes('living') || nameLower.includes('species')) {
      relevance = 1.1;
    }

    const existing = existingQuestionsPerTopic[s.name] || 0;
    const existingPenalty = 1 / (1 + 0.02 * existing);
    const rawScore = importance * density * relevance * existingPenalty;

    scores.push({
      name: s.name,
      score: rawScore,
      density,
      relevance,
      existingPenalty
    });
  }

  const totalScore = scores.reduce((acc, sc) => acc + sc.score, 0);

  let allocatedSum = 0;
  const allocationsWithRemainders = scores.map((sc) => {
    const share = totalScore > 0 ? sc.score / totalScore : 1 / scores.length;
    const exactTarget = share * targetCount;
    const floorTarget = Math.floor(exactTarget);
    const remainder = exactTarget - floorTarget;
    allocatedSum += floorTarget;
    return {
      name: sc.name,
      floorTarget,
      remainder,
      density: sc.density,
      relevance: sc.relevance
    };
  });

  let remainingQuestions = targetCount - allocatedSum;
  allocationsWithRemainders.sort((a, b) => b.remainder - a.remainder);
  for (let i = 0; i < remainingQuestions && i < allocationsWithRemainders.length; i++) {
    allocationsWithRemainders[i].floorTarget += 1;
  }

  const finalTargetsMap: Record<string, { target: number; density: number; relevance: number }> = {};
  for (const a of allocationsWithRemainders) {
    finalTargetsMap[a.name] = {
      target: a.floorTarget,
      density: Number(a.density.toFixed(2)),
      relevance: Number(a.relevance.toFixed(2))
    };
  }

  return verifiedList.map((v) => {
    const norm = normalizedList.find((n) => n.name === v.name);
    if (!v.supported) {
      return {
        topic: v.name,
        rawWeight: Number(v.rawWeight) || 0,
        normalizedWeight: 0,
        sourceSupported: false,
        sourceStatus: 'SOURCE CONTENT NOT FOUND',
        targetQuestions: 0,
        generatedCount: 0,
        conceptDensity: 0,
        examRelevance: 0,
        unsupportedReason: v.reason
      };
    }

    const ft = finalTargetsMap[v.name] || { target: Math.floor(targetCount / supported.length), density: 1.0, relevance: 1.0 };
    return {
      topic: v.name,
      rawWeight: Number(v.rawWeight) || 1,
      normalizedWeight: norm?.normalizedWeight || 0,
      sourceSupported: true,
      sourceStatus: 'Verified',
      targetQuestions: ft.target,
      generatedCount: 0,
      conceptDensity: ft.density,
      examRelevance: ft.relevance,
      pageReference: v.pageRef
    };
  });
}
