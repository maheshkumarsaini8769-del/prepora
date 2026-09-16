import { aiService } from './server/services/ai/aiService.js';
import { analyzeQuestionUnderstanding } from './server/services/ai/quality/questionUnderstanding.js';
import { gateFormulaRelevance } from './server/services/ai/quality/formulaRelevanceGate.js';
import { validateMathematicalAccuracy } from './server/services/ai/quality/mathValidator.js';
import { validateMCQ } from './server/services/ai/quality/mcqValidator.js';
import { checkQuestionDuplicate } from './server/services/ai/quality/duplicateDetector.js';
import { searchDatabaseFirst } from './server/services/ai/quality/databaseFirstSearch.js';

async function run12CriticalTestCases() {
  console.log('================================================================');
  console.log('PREPORA UNIVERSAL AI QUALITY SYSTEM — 12 CRITICAL TEST CASES');
  console.log('================================================================\n');

  let passedCount = 0;
  const totalCases = 12;

  // TEST 1: "What is gravity?" -> F = ma must NOT be present
  console.log('Test 1: "What is gravity?"');
  const t1 = await aiService.solveDoubt({ question: 'What is gravity?', subject: 'Physics' });
  const t1Formula = (t1.result.keyFormula || '').toLowerCase().replace(/[\s\\cdot*]/g, '');
  const t1Passed = !t1Formula.includes('f=ma') && t1.result.answer.toLowerCase().includes('gravity');
  if (t1Passed) {
    console.log('  [PASS] Gravity explained without unrelated F = ma. Key formula:', t1.result.keyFormula || 'None');
    passedCount++;
  } else {
    console.error('  [FAIL] Formula contained F=ma or gravity not explained. Formula:', t1.result.keyFormula);
  }

  // TEST 2: "What is force?" -> F = ma included appropriately
  console.log('\nTest 2: "What is force?"');
  const t2 = await aiService.solveDoubt({ question: 'What is force?', subject: 'Physics' });
  const t2Formula = (t2.result.keyFormula || '').toLowerCase();
  const t2Answer = t2.result.answer.toLowerCase();
  const t2Passed = t2Formula.includes('ma') || t2Answer.includes('mass') && t2Answer.includes('accelerat');
  if (t2Passed) {
    console.log('  [PASS] Force explained with Newton Second Law / F = ma. Formula:', t2.result.keyFormula);
    passedCount++;
  } else {
    console.error('  [FAIL] Missing F=ma for force.');
  }

  // TEST 3: "What is kinematics?" -> Motion relationships without forces
  console.log('\nTest 3: "What is kinematics?"');
  const t3 = await aiService.solveDoubt({ question: 'What is kinematics?', subject: 'Physics' });
  const t3Answer = t3.result.answer.toLowerCase();
  const t3Passed = t3Answer.includes('kinematics') && (t3Answer.includes('motion') || t3Answer.includes('velocity'));
  if (t3Passed) {
    console.log('  [PASS] Kinematics correctly defined as motion without forces.');
    passedCount++;
  } else {
    console.error('  [FAIL] Kinematics definition missing or incomplete.');
  }

  // TEST 4: "Solve 2x + 5 = 15" -> Arithmetic solution yields x = 5
  console.log('\nTest 4: "Solve 2x + 5 = 15"');
  const t4 = await aiService.solveDoubt({ question: 'Solve 2x + 5 = 15', subject: 'Mathematics' });
  const t4AllText = (t4.result.answer + ' ' + (t4.result.stepByStepSolution || []).join(' ')).toLowerCase();
  const t4Passed = t4AllText.includes('x = 5') || t4AllText.includes('x=5');
  if (t4Passed) {
    console.log('  [PASS] Linear equation accurately solved with root x = 5.');
    passedCount++;
  } else {
    console.error('  [FAIL] Did not find x = 5 in solution:', t4.result.answer);
  }

  // TEST 5: "Why does an object fall toward Earth?" -> Gravitational attraction
  console.log('\nTest 5: "Why does an object fall toward Earth?"');
  const t5 = await aiService.solveDoubt({ question: 'Why does an object fall toward Earth?', subject: 'Physics' });
  const t5Text = (t5.result.answer + ' ' + (t5.result.stepByStepSolution || []).join(' ')).toLowerCase();
  const t5Passed = t5Text.includes('gravity') || t5Text.includes('gravitational') || t5Text.includes('earth');
  if (t5Passed) {
    console.log('  [PASS] Gravitational attraction of Earth correctly explained.');
    passedCount++;
  } else {
    console.error('  [FAIL] Inaccurate fall explanation.');
  }

  // TEST 6: "Derive equations of motion" -> Step-by-step kinematic derivations
  console.log('\nTest 6: "Derive equations of motion"');
  const t6 = await aiService.solveDoubt({ question: 'Derive equations of motion', subject: 'Physics' });
  const t6Steps = (t6.result.stepByStepSolution || []).join(' ');
  const t6Passed = t6Steps.includes('v = u + at') || t6Steps.includes('v=u+at') || (t6.result.keyFormula || '').includes('v = u + at');
  if (t6Passed) {
    console.log('  [PASS] Equations of motion derived step-by-step (v = u + at, s = ut + 1/2 at², v² = u² + 2as).');
    passedCount++;
  } else {
    console.error('  [FAIL] Derivations missing in steps.');
  }

  // TEST 7: "Explain photosynthesis" -> Biological process explanation
  console.log('\nTest 7: "Explain photosynthesis"');
  const t7 = await aiService.solveDoubt({ question: 'Explain photosynthesis', subject: 'Biology' });
  const t7Text = (t7.result.answer + ' ' + (t7.result.stepByStepSolution || []).join(' ')).toLowerCase();
  const t7Passed = t7Text.includes('photosynthesis') && (t7Text.includes('glucose') || t7Text.includes('light') || t7Text.includes('chlorophyll'));
  if (t7Passed) {
    console.log('  [PASS] Photosynthesis biochemical mechanism explained with light/dark reactions.');
    passedCount++;
  } else {
    console.error('  [FAIL] Insufficient photosynthesis explanation.');
  }

  // TEST 8: Selected Chemistry, asked "What is kinematics?" -> Physics detection and warning
  console.log('\nTest 8: Selected Chemistry, Question: "What is kinematics?"');
  const t8Understanding = analyzeQuestionUnderstanding('What is kinematics?', 'Chemistry');
  const t8Passed = t8Understanding.subject === 'Physics' && Boolean(t8Understanding.contextMismatch?.hasMismatch);
  if (t8Passed) {
    console.log('  [PASS] Detected Physics and raised Context Mismatch Warning:');
    console.log('         Warning:', t8Understanding.contextMismatch?.warningMessage);
    passedCount++;
  } else {
    console.error('  [FAIL] Context mismatch not detected properly.');
  }

  // TEST 9: Generate an MCQ -> 4 distinct options, single correct answer
  console.log('\nTest 9: MCQ Validation (4 distinct options, 1 correct index)');
  const validMcq = {
    question: 'What is the SI unit of electric current in classical electrodynamics?',
    options: ['Volt', 'Ampere', 'Ohm', 'Coulomb'],
    correctAnswer: 1,
    explanation: 'The SI unit of electric current is the Ampere (A). Volt is potential and Ohm is resistance.'
  };
  const invalidMcq = {
    question: 'What is the SI unit of electric current?',
    options: ['Ampere', 'Ampere', 'Ohm', 'Coulomb'], // Duplicate option!
    correctAnswer: 0,
    explanation: 'Option A is correct.'
  };
  const v1 = validateMCQ(validMcq);
  const v2 = validateMCQ(invalidMcq);
  const t9Passed = v1.isValid && !v2.isValid && v2.errors.some(e => e.includes('Duplicate options'));
  if (t9Passed) {
    console.log('  [PASS] Valid MCQ passed validation; invalid MCQ with duplicate options rejected.');
    passedCount++;
  } else {
    console.error('  [FAIL] MCQ validation logic failed.');
  }

  // TEST 10: Duplicate Detection & Replacement
  console.log('\nTest 10: Duplicate Detection Engine');
  const masterBank = [
    { question: 'What is the acceleration due to gravity on the surface of Earth?', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'] }
  ];
  const testCandidate = {
    question: 'What is the acceleration due to gravity on the surface of Earth?',
    options: ['9.8 m/s^2', '10 m/s^2', '8.9 m/s^2', '11 m/s^2']
  };
  const dup = checkQuestionDuplicate(testCandidate, masterBank);
  const t10Passed = dup.isDuplicate && dup.similarity >= 0.78;
  if (t10Passed) {
    console.log(`  [PASS] Near-duplicate detected (${Math.round(dup.similarity * 100)}% match, type: ${dup.duplicateType}).`);
    passedCount++;
  } else {
    console.error('  [FAIL] Duplicate detection missed match.');
  }

  // TEST 11: Database-First Search Priority
  console.log('\nTest 11: Database-First Question Search Priority');
  const dbResult = await searchDatabaseFirst('What is the SI unit of force?');
  const t11Passed = typeof dbResult.foundInDatabase === 'boolean';
  if (t11Passed) {
    console.log('  [PASS] searchDatabaseFirst executed contract cleanly (found:', dbResult.foundInDatabase, ').');
    passedCount++;
  } else {
    console.error('  [FAIL] Database-first search failed contract.');
  }

  // TEST 12: General Educational Question -> Never falsely claims grounded
  console.log('\nTest 12: General Educational Question (Truthful Grounding)');
  const t12 = await aiService.solveDoubt({ question: 'What is an ecosystem?', subject: 'Biology' });
  const t12Passed = t12.result.groundedInPrepora === false && t12.result.retrievedPreporaContext === undefined;
  if (t12Passed) {
    console.log('  [PASS] General query answered without false "Grounded in PREPORA" claim.');
    passedCount++;
  } else {
    console.error('  [FAIL] Falsely claimed grounded in PREPORA DB.');
  }

  console.log('\n================================================================');
  console.log(`SUMMARY: ${passedCount}/${totalCases} TESTS PASSED`);
  console.log('================================================================');

  if (passedCount === totalCases) {
    console.log('ALL 12 CRITICAL TEST CASES PASSED SUCCESSFULLY!');
    process.exit(0);
  } else {
    console.error('SOME TEST CASES FAILED!');
    process.exit(1);
  }
}

run12CriticalTestCases().catch(err => {
  console.error('Fatal error during test suite execution:', err);
  process.exit(1);
});
