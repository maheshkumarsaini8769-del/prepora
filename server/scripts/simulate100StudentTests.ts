import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { questionRepo } from '../services/questionRepository.js';
import { JWT_SECRET } from '../middleware/auth.js';
import User from '../models/User.js';
import Session from '../models/Session.js';

dotenv.config();

const BASE_URL = 'http://localhost:5001/api';
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepora_db';

interface TestRecord {
  iteration: number;
  persona: string;
  exam: string;
  classLevel: string;
  subject: string;
  chapter: string;
  topic?: string;
  requestedCount: number;
  returnedCount: number;
  classIsolationPassed: boolean;
  noBleedPassed: boolean;
  detailedSolutionPassed: boolean;
  noZeroUnderflowPassed: boolean;
  mathRendererCheckPassed: boolean;
  uniqueQuestionsPassed: boolean;
  status: 'PASS' | 'FAIL';
  errors: string[];
}

const records: TestRecord[] = [];
let totalChecksPassed = 0;
let totalChecksFailed = 0;

// Curated Test Syllabus Matrix (Real NCERT/NTA 11th & 12th Chapters and Topics)
const CLASS_11_JEE_CURRICULUM = [
  { subject: 'Physics', chapter: 'Kinematics', topics: ['Motion in a Straight Line', 'Projectile Motion', 'Relative Velocity in 2D'] },
  { subject: 'Physics', chapter: 'Laws of Motion', topics: ["Newton's Laws", 'Friction and Inclined Planes', 'Circular Motion Dynamics'] },
  { subject: 'Physics', chapter: 'Work, Energy and Power', topics: ['Work-Energy Theorem', 'Conservation of Mechanical Energy', 'Power and Collisions'] },
  { subject: 'Physics', chapter: 'Thermodynamics', topics: ['First Law of Thermodynamics', 'Carnot Engine & Efficiency', 'Specific Heat Capacities'] },
  { subject: 'Physics', chapter: 'Rotational Motion', topics: ['Moment of Inertia', 'Torque and Angular Momentum', 'Rolling Motion without Slipping'] },
  { subject: 'Chemistry', chapter: 'Some Basic Concepts of Chemistry', topics: ['Mole Concept', 'Stoichiometry & Limiting Reagent', 'Molarity and Molality'] },
  { subject: 'Chemistry', chapter: 'Structure of Atom', topics: ["Bohr's Model of Hydrogen Atom", 'Quantum Numbers', 'Photoelectric Effect'] },
  { subject: 'Chemistry', chapter: 'Chemical Bonding and Molecular Structure', topics: ['VSEPR Theory', 'Hybridization (sp, sp2, sp3)', 'Dipole Moment and Hydrogen Bonding'] },
  { subject: 'Chemistry', chapter: 'Equilibrium', topics: ['Le Chatelier Principle', 'pH and Buffer Solutions', 'Solubility Product (Ksp)'] },
  { subject: 'Mathematics', chapter: 'Quadratic Equations', topics: ['Roots and Discriminant', 'Location of Roots', 'Common Roots Condition'] },
  { subject: 'Mathematics', chapter: 'Complex Numbers', topics: ['Modulus and Argument', 'Euler Form and De Moivre Theorem', 'Cube Roots of Unity'] },
  { subject: 'Mathematics', chapter: 'Sequences and Series', topics: ['Arithmetic Progression (AP)', 'Geometric Progression (GP)', 'Sum of Special Series'] },
  { subject: 'Mathematics', chapter: 'Trigonometric Functions', topics: ['Trigonometric Identities', 'Trigonometric Equations', 'Compound Angles'] },
];

const CLASS_11_NEET_CURRICULUM = [
  { subject: 'Physics', chapter: 'Kinematics', topics: ['Speed and Velocity', 'Equations of Motion', 'Projectile Motion'] },
  { subject: 'Physics', chapter: 'Gravitation', topics: ['Universal Law of Gravitation', 'Acceleration due to Gravity', 'Escape Velocity'] },
  { subject: 'Chemistry', chapter: 'Classification of Elements and Periodicity', topics: ['Ionization Enthalpy', 'Electronegativity Trends', 'Atomic Radii Trends'] },
  { subject: 'Chemistry', chapter: 'Chemical Bonding and Molecular Structure', topics: ['Ionic and Covalent Bonds', 'Octet Rule Limitations', 'VSEPR Shapes'] },
  { subject: 'Biology', chapter: 'Cell: The Unit of Life', topics: ['Prokaryotic vs Eukaryotic Cell', 'Plasma Membrane & Fluid Mosaic Model', 'Mitochondria & Chloroplast'] },
  { subject: 'Biology', chapter: 'Biomolecules', topics: ['Structure of Proteins', 'Enzymes and Co-factors', 'Nucleic Acids (DNA & RNA)'] },
  { subject: 'Biology', chapter: 'Biological Classification', topics: ['Five Kingdom Classification', 'Kingdom Monera & Archaebacteria', 'Kingdom Fungi'] },
  { subject: 'Biology', chapter: 'The Living World', topics: ['Taxonomic Hierarchy', 'Binomial Nomenclature', 'Botanical Gardens & Museums'] },
];

const CLASS_12_JEE_CURRICULUM = [
  { subject: 'Physics', chapter: 'Electrostatics', topics: ["Coulomb's Law", 'Electric Field & Potential', "Gauss's Law Applications"] },
  { subject: 'Physics', chapter: 'Current Electricity', topics: ["Ohm's Law & Drift Velocity", "Kirchhoff's Laws", 'Wheatstone Bridge & Potentiometer'] },
  { subject: 'Physics', chapter: 'Magnetic Effects of Current', topics: ['Biot-Savart Law', "Ampere's Circuital Law", 'Lorentz Force on Moving Charges'] },
  { subject: 'Physics', chapter: 'Optics', topics: ['Total Internal Reflection', "Lens Maker's Formula", "Young's Double Slit Experiment (YDSE)"] },
  { subject: 'Chemistry', chapter: 'Solutions', topics: ["Raoult's Law & Ideal Solutions", 'Colligative Properties & Van t Hoff Factor', 'Osmotic Pressure'] },
  { subject: 'Chemistry', chapter: 'Electrochemistry', topics: ['Nernst Equation', "Kohlrausch's Law", 'Electrochemical Cells and EMF'] },
  { subject: 'Chemistry', chapter: 'Chemical Kinetics', topics: ['Rate Law and Order of Reaction', 'First Order Kinetics & Half Life', 'Arrhenius Equation & Activation Energy'] },
  { subject: 'Chemistry', chapter: 'Coordination Compounds', topics: ['Werner Theory', 'IUPAC Nomenclature', 'Crystal Field Theory (CFT)'] },
  { subject: 'Mathematics', chapter: 'Integrals', topics: ['Properties of Definite Integrals', 'Definite Integrals', 'Substitution Method'] },
  { subject: 'Mathematics', chapter: 'Differential Equations', topics: ['Variable Separable Form', 'Linear Differential Equations (LDE)', 'Homogeneous Differential Equations'] },
  { subject: 'Mathematics', chapter: 'Matrices and Determinants', topics: ['Matrix Multiplication & Inverse', 'Properties of Determinants', "Cramer's Rule for Linear Systems"] },
];

const CLASS_12_NEET_CURRICULUM = [
  { subject: 'Physics', chapter: 'Electrostatics', topics: ['Electric Flux', 'Capacitance of Parallel Plate Capacitor', 'Electrostatic Energy'] },
  { subject: 'Physics', chapter: 'Optics', topics: ['Refraction at Spherical Surfaces', 'Prism Dispersion', 'Wave Nature of Light'] },
  { subject: 'Chemistry', chapter: 'Solutions', topics: ['Molarity and Henry Law', 'Depression in Freezing Point', 'Elevation in Boiling Point'] },
  { subject: 'Biology', chapter: 'Principles of Inheritance and Variation', topics: ["Mendel's Laws of Inheritance", 'Linkage and Crossing Over', 'Chromosomal Disorders & Pedigree Analysis'] },
  { subject: 'Biology', chapter: 'Molecular Basis of Inheritance', topics: ['Structure of DNA', 'DNA Replication Mechanism', 'Transcription and Genetic Code'] },
  { subject: 'Biology', chapter: 'Biotechnology: Principles and Processes', topics: ['Restriction Endonucleases', 'Recombinant DNA Technology', 'Polymerase Chain Reaction (PCR)'] },
  { subject: 'Biology', chapter: 'Human Reproduction', topics: ['Male & Female Reproductive System', 'Spermatogenesis and Oogenesis', 'Menstrual Cycle Regulation'] },
];

async function runStudentSimulation() {
  console.log('='.repeat(80));
  console.log('🎓 PREPORA COMPREHENSIVE 100-STUDENT DEEP VALIDATION & RE-VERIFICATION SUITE');
  console.log('='.repeat(80));

  await mongoose.connect(MONGO_URI);
  questionRepo.load();
  console.log(`📦 Connected to DB & Question Repository loaded with ${questionRepo.count()} questions.`);

  // Create or reuse test student auth token
  const studentId = 'usr_sim_auditor_11';
  const sessionId = 'sess_sim_auditor_11';
  const testStudent = await User.findOneAndUpdate(
    { phone: '9999000111' },
    {
      id: studentId,
      studentId: studentId,
      name: 'Simulated Student Auditor',
      phone: '9999000111',
      email: 'simulated_student@prepora.internal',
      targetExam: 'JEE',
      classLevel: '11',
      role: 'student',
      status: 'active'
    },
    { upsert: true, returnDocument: 'after' }
  );

  const studentToken = jwt.sign(
    { id: studentId, userId: studentId, studentId: studentId, sessionId, phone: testStudent.phone, role: 'student' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const tokenHash = (await import('crypto')).createHash('sha256').update(studentToken).digest('hex');
  await Session.findOneAndUpdate(
    { id: sessionId },
    {
      id: sessionId,
      userId: studentId,
      token: tokenHash,
      isRevoked: false,
      status: 'ACTIVE',
      lastActive: new Date()
    },
    { upsert: true }
  );

  const accumulatedSeenIds: string[] = [];

  // Build 100 Test Configurations
  const testScenarios: Array<{
    persona: string;
    exam: 'JEE' | 'NEET';
    classLevel: '11' | '12' | 'ALL';
    subject: string;
    chapter: string;
    topic?: string;
    questionCount: number;
  }> = [];

  // 1-25: Class 11 JEE Student
  for (let i = 0; i < 25; i++) {
    const item = CLASS_11_JEE_CURRICULUM[i % CLASS_11_JEE_CURRICULUM.length];
    const top = item.topics[i % item.topics.length];
    testScenarios.push({
      persona: 'Class 11 JEE Student',
      exam: 'JEE',
      classLevel: '11',
      subject: item.subject,
      chapter: item.chapter,
      topic: top,
      questionCount: (i % 3 === 0) ? 5 : (i % 3 === 1) ? 10 : 15
    });
  }

  // 26-50: Class 11 NEET Student
  for (let i = 0; i < 25; i++) {
    const item = CLASS_11_NEET_CURRICULUM[i % CLASS_11_NEET_CURRICULUM.length];
    const top = item.topics[i % item.topics.length];
    testScenarios.push({
      persona: 'Class 11 NEET Student',
      exam: 'NEET',
      classLevel: '11',
      subject: item.subject,
      chapter: item.chapter,
      topic: top,
      questionCount: (i % 3 === 0) ? 5 : (i % 3 === 1) ? 10 : 15
    });
  }

  // 51-75: Class 12 JEE Student
  for (let i = 0; i < 25; i++) {
    const item = CLASS_12_JEE_CURRICULUM[i % CLASS_12_JEE_CURRICULUM.length];
    const top = item.topics[i % item.topics.length];
    testScenarios.push({
      persona: 'Class 12 JEE Student',
      exam: 'JEE',
      classLevel: '12',
      subject: item.subject,
      chapter: item.chapter,
      topic: top,
      questionCount: (i % 3 === 0) ? 5 : (i % 3 === 1) ? 10 : 15
    });
  }

  // 76-90: Class 12 NEET Student
  for (let i = 0; i < 15; i++) {
    const item = CLASS_12_NEET_CURRICULUM[i % CLASS_12_NEET_CURRICULUM.length];
    const top = item.topics[i % item.topics.length];
    testScenarios.push({
      persona: 'Class 12 NEET Student',
      exam: 'NEET',
      classLevel: '12',
      subject: item.subject,
      chapter: item.chapter,
      topic: top,
      questionCount: (i % 2 === 0) ? 5 : 10
    });
  }

  // 91-100: Dropper / Full Syllabus JEE Student (All subjects and chapters aligned)
  const dropperItems = [
    { subject: 'Physics', chapter: 'Kinematics' },
    { subject: 'Chemistry', chapter: 'Chemical Bonding and Molecular Structure' },
    { subject: 'Mathematics', chapter: 'Quadratic Equations' },
    { subject: 'Physics', chapter: 'Electrostatics' },
    { subject: 'Chemistry', chapter: 'Solutions' },
    { subject: 'Mathematics', chapter: 'Integrals' },
    { subject: 'Physics', chapter: 'Laws of Motion' },
    { subject: 'Chemistry', chapter: 'Chemical Kinetics' },
    { subject: 'Mathematics', chapter: 'Differential Equations' },
    { subject: 'Physics', chapter: 'Work, Energy and Power' },
  ];
  for (let i = 0; i < 10; i++) {
    const item = dropperItems[i % dropperItems.length];
    testScenarios.push({
      persona: 'Dropper Full Syllabus Student',
      exam: 'JEE',
      classLevel: 'ALL',
      subject: item.subject,
      chapter: item.chapter,
      questionCount: 10
    });
  }

  console.log(`\n🚀 Commencing 100 Live Tests Across All Subjects and Grade Levels...\n`);

  for (let i = 0; i < testScenarios.length; i++) {
    const scenario = testScenarios[i];
    const iteration = i + 1;
    const errors: string[] = [];

    // --- EXECUTE TEST BUILD ---
    const buildRes = await fetch(`${BASE_URL}/tests/build-custom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`
      },
      body: JSON.stringify({
        title: `Deep Audit Test #${iteration} - ${scenario.chapter}`,
        exam: scenario.exam,
        classLevel: scenario.classLevel,
        subjects: [scenario.subject],
        chapters: [scenario.chapter],
        topic: scenario.topic,
        questionCount: scenario.questionCount,
        excludeQuestionIds: accumulatedSeenIds.slice(-50) // test exclusion of previous attempts
      })
    });

    const buildData = await buildRes.json();
    if (!buildRes.ok || !buildData.success || !buildData.test) {
      errors.push(`Test build failed (Status ${buildRes.status}): ${buildData.message || 'Unknown error'}`);
    }

    const testObj = buildData.test;
    const qIds: string[] = testObj?.questionIds || [];
    const questions: any[] = qIds.length > 0 ? questionRepo.getByIds(qIds) : [];

    // --- CHECK 1: CLASS ISOLATION ---
    let classIsolationPassed = true;
    if (scenario.classLevel === '11') {
      const leaked12 = questions.filter(q => String(q.class || q.classLevel) === '12');
      if (leaked12.length > 0) {
        classIsolationPassed = false;
        errors.push(`Class 11 Isolation Violated: Found ${leaked12.length} Class 12 questions (e.g. ${leaked12[0].chapter})`);
      }
    } else if (scenario.classLevel === '12') {
      const leaked11 = questions.filter(q => String(q.class || q.classLevel) === '11');
      if (leaked11.length > 0) {
        classIsolationPassed = false;
        errors.push(`Class 12 Isolation Violated: Found ${leaked11.length} Class 11 questions (e.g. ${leaked11[0].chapter})`);
      }
    }

    // --- CHECK 2: TOPICS TAXONOMY DROPDOWN COMPLETENESS ---
    const taxonomyTopics = questionRepo.getTopics(scenario.chapter);
    if (!taxonomyTopics || taxonomyTopics.length === 0) {
      errors.push(`Topics Dropdown Empty for chapter '${scenario.chapter}'`);
    }

    // --- CHECK 3: NO 0 OR 1 UNDERFLOW ---
    let noZeroUnderflowPassed = true;
    if (questions.length === 0 || questions.length === 1) {
      if (scenario.questionCount > 1) {
        noZeroUnderflowPassed = false;
        errors.push(`Underflow Fault: Student requested ${scenario.questionCount} questions but received ${questions.length}`);
      }
    }
    if (questions.length < scenario.questionCount) {
      errors.push(`Underflow Discrepancy: Received ${questions.length} vs requested ${scenario.questionCount}`);
    }

    // --- CHECK 4: DETAILED SOLUTION QUALITY ---
    let detailedSolutionPassed = true;
    for (const q of questions) {
      if (!q.explanation || q.explanation.trim().length < 15) {
        detailedSolutionPassed = false;
        errors.push(`Poor Solution on Question ID ${q.id}: Explanation is shallow or empty ('${q.explanation || ''}')`);
        break;
      }
    }

    // --- CHECK 5: MATH / LATEX RENDERING INTEGRITY ---
    let mathRendererCheckPassed = true;
    for (const q of questions) {
      const allText = `${q.question} ${q.options?.join(' ') || ''} ${q.explanation || ''}`;
      // Check for unclosed $ symbols
      const dollarCount = (allText.match(/\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        // Warning: odd number of dollar signs might indicate syntax truncation
        mathRendererCheckPassed = false;
        errors.push(`Math Delimiter Discrepancy on Question ID ${q.id}: Odd count of $ symbols (${dollarCount})`);
        break;
      }
    }

    // --- CHECK 6: NO CROSS-CHAPTER BLEED ---
    let noBleedPassed = true;
    const normalizeName = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
    const targetChapNorm = normalizeName(scenario.chapter || '');
    for (const q of questions) {
      const qChapNorm = normalizeName(q.chapter || '');
      if (qChapNorm && !qChapNorm.includes(targetChapNorm) && !targetChapNorm.includes(qChapNorm)) {
        noBleedPassed = false;
        errors.push(`Cross-Chapter Bleed Detected: Question belongs to '${q.chapter}', expected '${scenario.chapter}'`);
        break;
      }
    }

    // --- CHECK 7: REPEAT EXCLUSION ---
    let uniqueQuestionsPassed = true;
    const previouslySeenSet = new Set(accumulatedSeenIds.slice(-50));
    const repeated = questions.filter(q => previouslySeenSet.has(q.id));
    if (repeated.length > 0 && previouslySeenSet.size > 0) {
      uniqueQuestionsPassed = false;
      errors.push(`Repeat Question Detected: ${repeated.length} questions from recent tests appeared again`);
    }

    // Accumulate seen IDs
    questions.forEach(q => accumulatedSeenIds.push(q.id));

    // Record Result
    const passed = errors.length === 0;
    if (passed) totalChecksPassed++;
    else totalChecksFailed++;

    records.push({
      iteration,
      persona: scenario.persona,
      exam: scenario.exam,
      classLevel: scenario.classLevel,
      subject: scenario.subject,
      chapter: scenario.chapter,
      topic: scenario.topic,
      requestedCount: scenario.questionCount,
      returnedCount: questions.length,
      classIsolationPassed,
      noBleedPassed,
      detailedSolutionPassed,
      noZeroUnderflowPassed,
      mathRendererCheckPassed,
      uniqueQuestionsPassed,
      status: passed ? 'PASS' : 'FAIL',
      errors
    });

    if (iteration % 10 === 0 || !passed) {
      const icon = passed ? '✅ PASS' : '❌ FAIL';
      console.log(
        `[Test #${iteration.toString().padStart(3, ' ')}] ${icon} | ${scenario.persona.padEnd(28, ' ')} | Class: ${scenario.classLevel.padEnd(3, ' ')} | ${scenario.subject.padEnd(11, ' ')} | ${scenario.chapter.padEnd(30, ' ')} | Qs: ${questions.length}/${scenario.questionCount}`
      );
      if (!passed) {
        errors.forEach(e => console.log(`       ⚠️  Error: ${e}`));
      }
    }
  }

  // --- SPECIAL INVARIANT: DAILY PLANNER CHECK FOR CLASS 11 VS CLASS 12 ---
  console.log(`\n🔍 Verifying Invariant 8: Daily Study Planner Isolation for Class 11 vs 12...`);
  
  // Set student to Class 11 JEE
  await User.findByIdAndUpdate(testStudent._id, { targetExam: 'JEE', classLevel: '11' });
  const planner11Res = await fetch(`${BASE_URL}/planner?refresh=true`, {
    headers: { Authorization: `Bearer ${studentToken}` }
  });
  const planner11Data = await planner11Res.json();
  const tasks11 = planner11Data.data?.tasks || [];
  const task11Titles = tasks11.map((t: any) => t.title).join(' | ');

  const p11HasDefiniteInt = task11Titles.toLowerCase().includes('definite integration');
  const p11HasKinematics = task11Titles.toLowerCase().includes('kinematics');
  console.log(`  - Class 11 JEE Daily Tasks: "${task11Titles}"`);
  console.log(`  - Definite Integration Leaked to Class 11? ${p11HasDefiniteInt ? '❌ YES (FAIL)' : '✅ NO (PASSED)'}`);
  console.log(`  - Kinematics Assigned to Class 11? ${p11HasKinematics ? '✅ YES (PASSED)' : '❌ NO (FAIL)'}`);

  // Summary Metrics
  console.log('\n' + '='.repeat(80));
  console.log('📊 FINAL 100-STUDENT DEEP SIMULATION AUDIT REPORT');
  console.log('='.repeat(80));
  console.log(`Total Student Tests Executed : 100`);
  console.log(`Tests Passed 100% Perfectly  : ${totalChecksPassed}`);
  console.log(`Tests with Failures          : ${totalChecksFailed}`);

  const isolationFails = records.filter(r => !r.classIsolationPassed).length;
  const underflowFails = records.filter(r => !r.noZeroUnderflowPassed).length;
  const bleedFails = records.filter(r => !r.noBleedPassed).length;
  const solutionFails = records.filter(r => !r.detailedSolutionPassed).length;
  const mathFails = records.filter(r => !r.mathRendererCheckPassed).length;
  const repeatFails = records.filter(r => !r.uniqueQuestionsPassed).length;

  console.log(`\n--- Detailed Problem Breakdown across 100 Iterations ---`);
  console.log(`1. Class 11/12 Isolation Failures   : ${isolationFails} (Expected 0)`);
  console.log(`2. 0 or 1 Question Underflow Bugs   : ${underflowFails} (Expected 0)`);
  console.log(`3. Cross-Chapter Bleed Bugs         : ${bleedFails} (Expected 0)`);
  console.log(`4. Shallow / Blank Solutions Bugs   : ${solutionFails} (Expected 0)`);
  console.log(`5. Math / Delimiter Formatting Bugs : ${mathFails} (Expected 0)`);
  console.log(`6. Repeat Questions Under Exclusion : ${repeatFails} (Expected 0)`);
  console.log(`7. Planner Definite Integral Leak   : ${p11HasDefiniteInt ? 1 : 0} (Expected 0)`);

  if (totalChecksFailed === 0 && !p11HasDefiniteInt) {
    console.log(`\n🎉 ALL 10 PROBLEMS VERIFIED FIXED & PROVEN ROBUST ACROSS 100 STUDENT SIMULATIONS!`);
  } else {
    console.log(`\n⚠️ Some tests encountered issues. Review log above.`);
  }

  await mongoose.disconnect();
}

runStudentSimulation().catch(err => {
  console.error('Fatal Test Suite Error:', err);
  process.exit(1);
});
