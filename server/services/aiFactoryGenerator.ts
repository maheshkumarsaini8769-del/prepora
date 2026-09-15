import {
  AIFactoryJob,
  IAIFactoryQuestion,
  SourceDocument,
  ChapterKnowledgeMap,
  AIProviderConfig
} from '../models/AIFactory.js';
import Question from '../models/Question.js';
import { jaccardSimilarity } from '../utils/similarity.js';
import { BIOLOGY_CHAPTER_1_TOPICS, getBiologyQuestion } from './biologyChapter1Bank.js';
import { calculateQuestionAllocation } from './topicWeightService.js';
import { generateRealQuestionFromPdf } from './pdfKnowledgeExtractor.js';
import { generateQuestionsWithGemini } from './geminiService.js';

// =========================================================================
// 1. QUESTION SYNTHESIZER FOR SOURCE CHAPTERS (SECTION 4, 5, 6, 7, 8, 9, 10)
// =========================================================================

export function synthesizeQuestionItem(
  subject: string,
  chapter: string,
  classLevel: string,
  topic: string,
  qIndex: number,
  jobId: string,
  doc?: any,
  variantOverride?: number,
  topicIndexOverride?: number
): IAIFactoryQuestion {
  // If source document has text, synthesize strictly from the real PDF content!
  if (doc?.rawTextSnippet || doc?.filename) {
    const variant = variantOverride ?? (qIndex - 1);
    return generateRealQuestionFromPdf(topic, variant, qIndex, jobId, doc);
  }

  const isBiology = subject === 'Biology' && chapter.toLowerCase().includes('living');
  if (isBiology) {
    let topicIndex = topicIndexOverride;
    if (topicIndex === undefined || topicIndex === -1) {
      topicIndex = BIOLOGY_CHAPTER_1_TOPICS.findIndex(
        (t) => t.toLowerCase() === topic.toLowerCase()
      );
      if (topicIndex === -1) {
        topicIndex = BIOLOGY_CHAPTER_1_TOPICS.findIndex(
          (t) => topic.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(topic.toLowerCase())
        );
      }
    }
    if (topicIndex === -1) {
      topicIndex = (qIndex - 1) % BIOLOGY_CHAPTER_1_TOPICS.length;
    }
    const variant = variantOverride ?? Math.floor((qIndex - 1) / BIOLOGY_CHAPTER_1_TOPICS.length);
    return getBiologyQuestion(topicIndex, variant, qIndex, jobId, doc);
  }

  // For any other subject/chapter, generate realistic questions from knowledge extractor
  const variant = variantOverride ?? (qIndex - 1);
  return generateRealQuestionFromPdf(topic, variant, qIndex, jobId, doc);
}

// =========================================================================
// 2. QUESTION QUALITY & FORMAT VALIDATION (SECTION 16)
// =========================================================================

export function validateQuestion(q: IAIFactoryQuestion): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!q.question || q.question.trim().length < 15) {
    issues.push('Question statement is too short or empty');
  }
  if (!q.options || q.options.length !== 4) {
    issues.push('Question must have exactly 4 options');
  } else {
    const uniqueOptions = new Set(q.options.map((o) => o.trim()));
    if (uniqueOptions.size < 4) {
      issues.push('Options must be mutually distinct');
    }
  }
  if (q.correctAnswer === undefined || q.correctAnswer < 0 || q.correctAnswer > 3) {
    issues.push('Correct answer must be an index between 0 and 3');
  }
  if (!q.explanation || q.explanation.trim().length < 20) {
    issues.push('Explanation is missing or insufficient');
  }
  if (!q.topic || q.topic.trim().length < 2) {
    issues.push('Question lacks valid topic assignment');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

// =========================================================================
// 3. DUPLICATE DETECTION ENGINE (SECTION 12 & 24)
// =========================================================================

const wordsCache = new WeakMap<object, Set<string>>();

export function detectDuplicate(
  q: { question: string; options?: string[] },
  existingMasterQuestions: any[],
  currentJobQuestions: IAIFactoryQuestion[]
): { status: 'Unique' | 'Possible Duplicate' | 'Duplicate'; similarity: number; matchRef?: string } {
  const getCachedWords = (item: any): Set<string> => {
    if (!item) return new Set();
    if (typeof item === 'object') {
      const cached = wordsCache.get(item);
      if (cached instanceof Set) return cached;
    }
    const fullText = (item.question || '') + ' ' + (item.options ? item.options.join(' ') : '');
    const set = new Set(
      fullText
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
    if (typeof item === 'object') {
      try {
        wordsCache.set(item, set);
      } catch {}
    }
    return set;
  };

  const wordsA = getCachedWords(q);
  let maxSim = 0;
  let matchRef: string | undefined;

  // Compare with master database questions
  for (const eq of existingMasterQuestions) {
    const wordsB = getCachedWords(eq);
    const sim = jaccardSimilarity(wordsA, wordsB);
    if (sim > maxSim) {
      maxSim = sim;
      matchRef = (eq.question || '').substring(0, 55) + '...';
      if (maxSim >= 0.95) break; // Early exit on near-identical match
    }
  }

  // Compare with already synthesized questions in the current job
  for (const cq of currentJobQuestions) {
    const wordsB = getCachedWords(cq);
    const sim = jaccardSimilarity(wordsA, wordsB);
    if (sim > maxSim) {
      maxSim = sim;
      matchRef = (cq.question || '').substring(0, 55) + '...';
      if (maxSim >= 0.95) break;
    }
  }

  // Thresholds aligned with Section 12 of task2.md (Duplicate: >= 85%, Possible Duplicate: >= 75%)
  if (maxSim >= 0.85) {
    return { status: 'Duplicate', similarity: Math.round(maxSim * 100), matchRef };
  } else if (maxSim >= 0.75) {
    return { status: 'Possible Duplicate', similarity: Math.round(maxSim * 100), matchRef };
  }
  return { status: 'Unique', similarity: Math.round(maxSim * 100) };
}

// =========================================================================
// 4. BATCHED QUESTION GENERATION ENGINE (SECTION 1, 2, 3, 13, 14, 25, 26)
// =========================================================================

export async function runBatchedGeneration(jobId: string) {
  try {
    const job = await AIFactoryJob.findOne({ id: jobId });
    if (!job) return;

    let doc = null;
    if (job.sourceDocumentId) {
      doc = await SourceDocument.findOne({ id: job.sourceDocumentId });
    }

    const chapter = job.chapterTitle;
    const subject = job.subject;
    const classLevel = job.classLevel;
    const targetCount = job.requestedCount;
    const batchSize = job.batchSize || 20;

    // Determine comprehensive topic list
    let topics: string[] = doc?.extractedTopics?.length ? doc.extractedTopics : [];
    if (topics.length === 0) {
      const kmap = await ChapterKnowledgeMap.findOne({ chapter });
      if (kmap && kmap.topics?.length) {
        topics = kmap.topics.map((t: any) => t.name || t);
      }
    }
    if (topics.length === 0 || chapter.toLowerCase().includes('living') || subject === 'Biology') {
      if (chapter.toLowerCase().includes('living') || subject === 'Biology') {
        topics = BIOLOGY_CHAPTER_1_TOPICS;
      } else {
        topics = [
          'Motion in 1D & Displacement-Time Graphs',
          'Uniform Acceleration & Kinematic Equations',
          'Free Fall Under Gravity & Vertical Motion',
          'Relative Velocity in 1D & 2D',
          'Projectile Motion & Trajectory Analysis',
          'Horizontal Range, Max Height & Flight Time',
          'Calculus Formulations of Velocity & Acceleration',
          'Uniform Circular Motion & Centripetal Acceleration'
        ];
      }
    }

    // Enforce Rule: The AI must NEVER generate questions for a topic that is not supported by the uploaded source.
    // If an admin-defined topic is missing from the uploaded PDF:
    // Mark: SOURCE CONTENT NOT FOUND, Question target for that topic: 0. Do not hallucinate content.
    let topicAllocations = job.topicAllocations;
    if (!topicAllocations || topicAllocations.length === 0) {
      topicAllocations = calculateQuestionAllocation({
        targetCount,
        chapter,
        subject,
        topics: topics.map((t) => ({ name: t, rawWeight: 15 })),
        doc
      });
      job.topicAllocations = topicAllocations;
      await job.save();
    }

    // Supported topics with target > 0
    const supportedTopics = topicAllocations.filter((t) => t.sourceSupported && t.targetQuestions > 0);
    const activeTopics = supportedTopics.length > 0 ? supportedTopics.map((t) => t.topic) : topics;

    const topicTargets: Record<string, number> = {};
    for (const t of topicAllocations) {
      topicTargets[t.topic] = t.sourceSupported ? t.targetQuestions : 0;
    }

    for (const u of topicAllocations.filter((t) => !t.sourceSupported)) {
      console.log(`[Batch Engine] SKIPPED: Topic '${u.topic}' marked SOURCE CONTENT NOT FOUND. Target: 0 (No hallucination).`);
    }

    // Existing master questions for duplicate comparison
    const existingMasterQuestions = await Question.find({ subject: subject as any, chapter })
      .limit(250)
      .select('question options');

    // Cross-Job Duplicate Prevention: Retrieve questions from all other existing jobs for this chapter
    const pastJobs = await AIFactoryJob.find({
      id: { $ne: jobId },
      chapterTitle: chapter
    }).select('generatedQuestions');

    const pastChapterQuestions: IAIFactoryQuestion[] = [];
    for (const pj of pastJobs) {
      if (pj.generatedQuestions && Array.isArray(pj.generatedQuestions)) {
        for (const pq of pj.generatedQuestions) {
          pastChapterQuestions.push(pq);
        }
      }
    }

    const allComparisonBank = [...existingMasterQuestions, ...pastChapterQuestions.slice(-300)];

    let allGeneratedQuestions: IAIFactoryQuestion[] = [...job.generatedQuestions];
    let validQuestions = allGeneratedQuestions.filter(
      (q) => q.duplicateStatus === 'Unique' && q.qualityScore >= 75
    );

    const totalBatches = Math.ceil(targetCount / batchSize);
    job.totalBatches = totalBatches;

    // Track valid questions count and attempt counts per topic for proportional chapter coverage
    const topicValidCounts: Record<string, number> = {};
    const topicAttemptCounts: Record<string, number> = {};

    // Seed topicAttemptCounts with past questions so new jobs start strictly with fresh variant offsets!
    for (const pq of pastChapterQuestions) {
      if (pq.topic) {
        topicAttemptCounts[pq.topic] = (topicAttemptCounts[pq.topic] || 0) + 1;
      }
    }

    for (const q of allGeneratedQuestions) {
      topicAttemptCounts[q.topic] = (topicAttemptCounts[q.topic] || 0) + 1;
    }
    for (const q of validQuestions) {
      topicValidCounts[q.topic] = (topicValidCounts[q.topic] || 0) + 1;
    }

    // Safety cap to prevent infinite loop (Section 14)
    const maxBatches = Math.ceil(targetCount / batchSize) * 2 + 10;
    let batchNum = job.currentBatch || 0;
    let attempts = 0;

    console.log(`[Batch Engine] Starting job ${jobId} -> Target: ${targetCount}, BatchSize: ${batchSize}, Past Questions Count: ${pastChapterQuestions.length}`);

    while (validQuestions.length < targetCount && attempts < maxBatches) {
      // Re-fetch job to check if admin paused or killed it (Section 20 & 21)
      const freshJob = await AIFactoryJob.findOne({ id: jobId });
      if (!freshJob || freshJob.status === 'Paused') {
        console.log(`[Batch Engine] Job ${jobId} is currently paused.`);
        return;
      }

      attempts++;
      batchNum++;
      const neededCount = targetCount - validQuestions.length;
      const currentBatchCount = Math.min(batchSize, neededCount);
      const batchTopic = activeTopics[(batchNum - 1) % activeTopics.length];

      job.currentBatch = batchNum;
      job.currentTopic = `Batch ${batchNum}/${totalBatches}: ${batchTopic}`;
      job.status = 'Generating';
      await job.save();

      // Synthesize questions for current batch with allocation-guided topic distribution
      for (let i = 0; i < currentBatchCount; i++) {
        // Pick the supported topic that has the largest remaining unfulfilled target (deficit)
        let chosenTopic = activeTopics[0];
        let maxDeficit = -Infinity;
        for (const t of activeTopics) {
          const target = topicTargets[t] ?? Math.ceil(targetCount / activeTopics.length);
          const currentValid = topicValidCounts[t] || 0;
          const deficit = target - currentValid;
          if (deficit > maxDeficit) {
            maxDeficit = deficit;
            chosenTopic = t;
          }
        }

        const qIndex = allGeneratedQuestions.length + 1;
        let topicIndex = BIOLOGY_CHAPTER_1_TOPICS.findIndex(
          (t) => t.toLowerCase() === chosenTopic.toLowerCase()
        );
        if (topicIndex === -1) {
          topicIndex = BIOLOGY_CHAPTER_1_TOPICS.findIndex(
            (t) => chosenTopic.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(chosenTopic.toLowerCase())
          );
        }
        if (topicIndex === -1) topicIndex = (qIndex - 1) % BIOLOGY_CHAPTER_1_TOPICS.length;

        const initialVariant = topicAttemptCounts[chosenTopic] || 0;
        let chosenCandidate: IAIFactoryQuestion | null = null;
        let chosenDup: any = null;

        // Try candidate variants (up to 4 attempts) until a truly unique question is found
        for (let attempt = 0; attempt < 4; attempt++) {
          const tryVariant = initialVariant + attempt;
          const candidateQ = synthesizeQuestionItem(
            subject,
            chapter,
            classLevel,
            chosenTopic,
            qIndex,
            jobId,
            doc,
            tryVariant,
            topicIndex
          );

          // Quality check
          const val = validateQuestion(candidateQ);
          if (!val.valid) {
            candidateQ.qualityScore = 50;
            candidateQ.qualityFlags.push(...val.issues);
            candidateQ.reviewStatus = 'Rejected';
            candidateQ.rejectReason = val.issues.join(', ');
          }

          // Duplicate check against master bank, past jobs questions, and current job questions
          const dup = detectDuplicate(candidateQ, allComparisonBank, allGeneratedQuestions);
          candidateQ.duplicateStatus = dup.status;
          candidateQ.duplicateSimilarity = dup.similarity;
          candidateQ.duplicateQuestionRef = dup.matchRef;

          if (dup.status === 'Unique' && val.valid) {
            chosenCandidate = candidateQ;
            chosenDup = dup;
            topicAttemptCounts[chosenTopic] = tryVariant + 1;
            break;
          }

          if (attempt === 3) {
            chosenCandidate = candidateQ;
            chosenDup = dup;
            topicAttemptCounts[chosenTopic] = tryVariant + 1;
          }
        }

        const rawQuestion = chosenCandidate!;
        const dup = chosenDup!;

        if (dup.status === 'Duplicate') {
          rawQuestion.qualityScore = Math.min(rawQuestion.qualityScore, 40);
          rawQuestion.qualityFlags.push(`Duplicate with existing question (${dup.similarity}%)`);
          rawQuestion.reviewStatus = 'Rejected';
          rawQuestion.rejectReason = 'Duplicate question detected';
        } else if (dup.status === 'Possible Duplicate') {
          rawQuestion.qualityScore = Math.min(rawQuestion.qualityScore, 70);
          rawQuestion.qualityFlags.push(`Possible similarity overlap (${dup.similarity}%)`);
        }

        allGeneratedQuestions.push(rawQuestion);
        if (rawQuestion.duplicateStatus === 'Unique' && rawQuestion.qualityScore >= 75) {
          validQuestions.push(rawQuestion);
          topicValidCounts[chosenTopic] = (topicValidCounts[chosenTopic] || 0) + 1;
          const allocItem = topicAllocations.find((a) => a.topic === chosenTopic);
          if (allocItem) {
            allocItem.generatedCount = topicValidCounts[chosenTopic];
          }
        }
      }

      // Update state in MongoDB
      const duplicateCount = allGeneratedQuestions.filter((q) => q.duplicateStatus !== 'Unique').length;
      const rejectedCount = allGeneratedQuestions.filter((q) => q.reviewStatus === 'Rejected').length;

      job.generatedQuestions = allGeneratedQuestions;
      job.topicAllocations = topicAllocations;
      job.generatedCount = allGeneratedQuestions.length;
      job.validCount = validQuestions.length;
      job.duplicateCount = duplicateCount;
      job.rejectedCount = rejectedCount;
      job.progress = Math.min(99, Math.round((validQuestions.length / targetCount) * 100));
      await job.save();

      // Yield event loop with a brief delay for progressive frontend polling
      await new Promise((r) => setTimeout(r, 120));
    }

    // Finalize Job
    job.progress = 100;
    job.status = 'ReadyForReview';
    job.validCount = validQuestions.length;
    job.currentTopic = 'Batch generation and quality validation complete.';

    if (validQuestions.length < targetCount) {
      job.error = `Generated ${validQuestions.length} valid unique questions from this source. Maximum safe question capacity reached without concept repetition.`;
    }

    await job.save();

    // Increment today's questions generated count in config
    await AIProviderConfig.findOneAndUpdate(
      { key: 'ai_provider_config' },
      { $inc: { questionsGeneratedToday: validQuestions.length } },
      { upsert: true }
    );

    // Update Knowledge Map coverage
    await ChapterKnowledgeMap.findOneAndUpdate(
      { chapter },
      {
        $set: {
          overallCoverage: Math.min(100, Math.round((validQuestions.length / targetCount) * 100)),
          currentQuestions: validQuestions.length
        }
      }
    );

    console.log(`[Batch Engine] Job ${jobId} completed successfully with ${validQuestions.length} valid questions.`);
  } catch (err: any) {
    console.error(`[Batch Engine Error] Job ${jobId}:`, err);
    await AIFactoryJob.findOneAndUpdate(
      { id: jobId },
      { status: 'Failed', error: err.message }
    );
  }
}
