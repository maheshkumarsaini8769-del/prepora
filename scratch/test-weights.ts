import { calculateQuestionAllocation, normalizeTopicWeights } from '../server/services/topicWeightService.js';

console.log('=== TEST: 19 Topics x 15% Normalization Rule ===');
// User's example: 19 topics with 15% raw weight
const nineteenTopics = Array.from({ length: 19 }, (_, i) => ({
  name: `NCERT Topic ${i + 1}`,
  rawWeight: 15,
  supported: true
}));

const normalized19 = normalizeTopicWeights(nineteenTopics);
const sum19 = normalized19.reduce((sum, t) => sum + t.normalizedWeight, 0);
console.log(`Input: 19 topics x 15% (Raw sum = 285%)`);
console.log(`Normalized each to: ${normalized19[0].normalizedWeight}%`);
console.log(`Total Normalized Sum: ${sum19.toFixed(2)}% (Rule: Exactly 100%)`);

console.log('\n=== TEST: Source Content Verification & 5-Factor Question Allocation ===');
const sampleTopics = [
  { name: 'What is Living - Growth Twins & Characteristics', rawWeight: 15 },
  { name: 'What is Living - Reproduction & Living Exceptions', rawWeight: 15 },
  { name: 'What is Living - Metabolism & In Vitro Reactions', rawWeight: 15 },
  { name: 'Binomial Nomenclature System & Carolus Linnaeus', rawWeight: 15 },
  { name: 'Taxonomic Categories & 7 Obligate Hierarchy Ranks', rawWeight: 15 },
  { name: 'Organism Classification - Photosynthesis & Light Reactions', rawWeight: 15 }, // Missing from Chapter 1!
  { name: 'Quantum Optics & Laser Diffraction', rawWeight: 15 } // Missing from Chapter 1!
];

const alloc = calculateQuestionAllocation({
  targetCount: 100,
  chapter: 'The Living World',
  subject: 'Biology',
  topics: sampleTopics
});

console.log('Allocations Breakdown:');
alloc.forEach((a) => {
  console.log(
    `[${a.sourceStatus}] ${a.topic.padEnd(55)} | Raw: ${a.rawWeight}% | Norm: ${String(a.normalizedWeight + '%').padEnd(7)} | Target: ${a.targetQuestions} questions`
  );
  if (a.sourceStatus === 'SOURCE CONTENT NOT FOUND') {
    console.log(`   -> Reason: ${a.unsupportedReason}`);
  }
});

const totalAllocated = alloc.reduce((sum, a) => sum + a.targetQuestions, 0);
const totalNormalized = alloc.reduce((sum, a) => sum + a.normalizedWeight, 0);
console.log(`\nTotal Questions Allocated: ${totalAllocated}/100`);
console.log(`Total Normalized Weight: ${totalNormalized.toFixed(2)}%`);
