import { jaccardSimilarity } from '../server/utils/similarity.js';

// Let's test a sample of stems across angles
const angles = [
  "Which of the following are recognized as the twin characteristics of growth in living organisms?",
  "Consider the statements regarding growth: Statement I: In plants, growth by cell division occurs continuously. Statement II: In animals, growth ceases after maturity.",
  "Assertion (A): Growth cannot be taken as an absolute defining property of living organisms. Reason (R): Non-living objects like mountains and sand dunes also grow by external accumulation.",
  "Which of the following statements is INCORRECT regarding biological growth mechanisms?",
  "During a laboratory examination of cell division in unicellular culture, how is somatic growth recorded?",
  "How does indeterminate growth in perennial botanical trees differ fundamentally from determinate animal development?",
  "In biological taxonomy, the technical distinction between intrinsic cellular growth and extrinsic mass accumulation is based on:",
  "According to NCERT Chapter 1 principles, why is growth in multicellular organisms mutually exclusive from reproduction?",
  "Match the growth characteristics in Column I with their taxonomic occurrences in Column II:",
  "An investigator observes mass accumulation on a sand mound. What category of growth does this represent?",
  "What is the primary twin criterion defining growth across biological kingdoms according to standard treatises?",
  "Examine statements (i), (ii), and (iii) regarding living vs non-living physical mass accretion:",
  "Assertion (A): Mountains and boulders exhibit extrinsic increase in physical dimensions. Reason (R): Materials deposit on their exterior surfaces over geological eras.",
  "Which criterion represents the essential prerequisite before cellular enlargement can occur in living tissues?",
  "Which of the following natural geological structures serves as a classic textbook example of non-living external growth?"
];

function normalize(txt) {
  return new Set(
    txt
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3)
  );
}

let maxSim = 0;
let collisions = 0;
for (let i = 0; i < angles.length; i++) {
  for (let j = i + 1; j < angles.length; j++) {
    const sim = jaccardSimilarity(normalize(angles[i]), normalize(angles[j]));
    if (sim > maxSim) maxSim = sim;
    if (sim >= 0.65) {
      collisions++;
      console.log(`COLLISION between ${i} and ${j}: ${(sim * 100).toFixed(1)}%`);
      console.log(`  A: ${angles[i]}`);
      console.log(`  B: ${angles[j]}`);
    }
  }
}

console.log(`Max similarity across all angle pairs: ${(maxSim * 100).toFixed(1)}%`);
console.log(`Total collisions (>=65%): ${collisions}`);
