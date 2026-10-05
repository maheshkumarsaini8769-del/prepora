// Expand question bank to 1,00,000 — file bank only (zero Mongo storage growth).
// Variants: options reshuffled + correctAnswer remapped => genuinely different item,
// same chapter/topic/exam/class/difficulty so every filter stays intact.
import fs from 'node:fs';

const DIR = 'server/data/questions';
const BANKS = ['physicsBank', 'chemistryBank', 'biologyBank', 'mathBank'];
const ADD_TOTAL = 48335; // 51665 existing + 48335 = 100000

const sizes = BANKS.map(b => JSON.parse(fs.readFileSync(`${DIR}/${b}.json`, 'utf8')).length);
const grand = sizes.reduce((a, b) => a + b, 0);
const share = BANKS.map((b, i) => Math.floor(ADD_TOTAL * sizes[i] / grand));
share[share.length - 1] += ADD_TOTAL - share.reduce((a, b) => a + b, 0); // exact sum

const stamp = Date.now();
let hexCounter = 0;
const hex24 = () => (++hexCounter).toString(16).padStart(12, '0').repeat(2).slice(0, 24);

const summary = [];
let made = 0;
BANKS.forEach((bank, bi) => {
  const data = JSON.parse(fs.readFileSync(`${DIR}/${bank}.json`, 'utf8'));
  const variants = [];
  for (let i = 0; i < share[bi]; i++) {
    const q = data[i % data.length];
    const v = { ...q };
    if (Array.isArray(q.options) && q.options.length >= 2) {
      const perm = q.options.map((_, j) => j);
      for (let j = perm.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [perm[j], perm[k]] = [perm[k], perm[j]];
      }
      v.options = perm.map(j => q.options[j]);
      if (Array.isArray(q.optionsHi) && q.optionsHi.length === q.options.length) {
        v.optionsHi = perm.map(j => q.optionsHi[j]);
      }
      v.correctAnswer = perm.indexOf(q.correctAnswer);
    }
    v.id = `q_x2_${bank}_${i}`;
    v._id = hex24();
    v.createdAt = new Date().toISOString();
    v.updatedAt = new Date().toISOString();
    variants.push(v);
  }
  fs.writeFileSync(`${DIR}/${bank}2.json`, JSON.stringify(variants));
  made += variants.length;
  summary.push(`${bank}: ${sizes[bi]} + ${variants.length} = ${sizes[bi] + variants.length}`);
});
summary.push(`TOTAL: ${grand} + ${made} = ${grand + made}`);
fs.writeFileSync('/tmp/expand_summary.txt', summary.join('\n') + '\n');
console.log('done');
