import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RotateCw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Repeat,
  AlertTriangle,
  Flame,
  BookMarked,
  Sparkles,
  Zap,
  Target,
  BookOpen
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { userService } from '../services/userService';
import { syllabusService } from '../services/syllabusService';
import { SubjectName } from '../types';
import { getAllowedSubjectsForExam, isSubjectAllowedForExam } from '../utils/examUtils';
import { canonicalSyllabus } from '../data/canonicalSyllabusData';

interface Flashcard {
  id: string;
  subject: SubjectName;
  chapter: string;
  title: string;
  frontPrompt: string;
  formula: string;
  variables: string;
  examTip: string;
  examTarget: 'JEE' | 'NEET' | 'Both';
}

const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-phy-1',
    subject: 'Physics',
    chapter: 'Kinematics',
    title: '2D Projectile Range & Apex',
    frontPrompt: 'What are the formulas for Horizontal Range (R), Max Height (H), and Flight Time (T) on level ground?',
    formula: 'R = (u^2 * sin(2θ)) / g,  H = (u^2 * sin^2(θ)) / (2g),  T = (2u * sinθ) / g',
    variables: 'u = Initial speed, θ = Launch angle, g = Acceleration due to gravity (9.8 m/s²)',
    examTip: 'Complementary launch angles (θ and 90° - θ) produce the exact same horizontal range for identical launch speed.',
    examTarget: 'Both'
  },
  {
    id: 'fc-phy-2',
    subject: 'Physics',
    chapter: 'Work, Energy & Power',
    title: 'Work-Energy Theorem',
    frontPrompt: 'State the work-energy relation for a particle under conservative and non-conservative forces.',
    formula: 'W_total = ΔK = K_final - K_initial = (1/2)m(v_f^2 - v_i^2)',
    variables: 'W_total = Work by all forces (gravity, normal, friction, spring), m = Mass, v = Speed',
    examTip: 'Work done by static friction can be positive, negative, or zero; work done by kinetic friction is always non-positive for the relative contact.',
    examTarget: 'Both'
  },
  {
    id: 'fc-phy-3',
    subject: 'Physics',
    chapter: 'Thermodynamics',
    title: 'Carnot Engine Maximum Efficiency',
    frontPrompt: 'What is the theoretical maximum thermal efficiency of a reversible heat engine operating between two temperatures?',
    formula: 'η = 1 - (T_cold / T_hot) = (T_hot - T_cold) / T_hot',
    variables: 'T_cold = Sink temp (Kelvin), T_hot = Source temp (Kelvin)',
    examTip: 'ALWAYS convert Celsius to Kelvin (K = °C + 273.15). Using Celsius is the #1 negative marking trap in thermodynamics!',
    examTarget: 'Both'
  },
  {
    id: 'fc-phy-4',
    subject: 'Physics',
    chapter: 'Modern Physics',
    title: 'Einstein Photoelectric Equation',
    frontPrompt: 'What is the relation between incident photon energy, work function, and maximum kinetic energy of emitted photoelectrons?',
    formula: 'hν = Φ + K_max = hν_0 + e * V_0',
    variables: 'h = Planck constant, ν = Frequency, Φ = Work function, V_0 = Stopping potential',
    examTip: 'Slope of Stopping Potential (V_0) vs Frequency (ν) graph is ALWAYS constant (h/e), independent of the metal cathode material.',
    examTarget: 'Both'
  },
  {
    id: 'fc-chem-1',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    title: 'Gibbs Free Energy & Spontaneity',
    frontPrompt: 'What is the thermodynamic criterion for reaction spontaneity at constant Temperature and Pressure?',
    formula: 'ΔG = ΔH - TΔS  (ΔG < 0 => Spontaneous, ΔG = 0 => Equilibrium)',
    variables: 'ΔG = Gibbs energy change, ΔH = Enthalpy change, T = Temp (K), ΔS = Entropy change',
    examTip: 'Watch units! ΔH is usually reported in kJ/mol, while ΔS is in J/(K·mol). Multiply ΔH by 1000 before subtracting TΔS.',
    examTarget: 'Both'
  },
  {
    id: 'fc-chem-2',
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    title: 'Nernst Equation for Cell Potential',
    frontPrompt: 'How does cell potential depend on ion concentration and temperature?',
    formula: 'E_cell = E°_cell - (0.0591 / n) * log10(Q)   [at 298 K]',
    variables: 'E° = Standard EMF, n = Moles of electrons transferred, Q = Reaction quotient',
    examTip: 'Pure solids and pure liquids have activity = 1; do NOT include them in the reaction quotient Q.',
    examTarget: 'Both'
  },
  {
    id: 'fc-chem-3',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    title: 'First-Order Integrated Rate Law',
    frontPrompt: 'What is the integrated rate equation and half-life for a first-order chemical reaction?',
    formula: 'k = (2.303 / t) * log10([A]_0 / [A]_t),   t_1/2 = 0.693 / k',
    variables: 'k = Rate constant (s⁻¹), [A]_0 = Initial conc, [A]_t = Conc at time t, t_1/2 = Half-life',
    examTip: 'Half-life for first-order reaction is completely independent of initial reactant concentration [A]_0.',
    examTarget: 'Both'
  },
  {
    id: 'fc-bio-1',
    subject: 'Biology',
    chapter: 'The Living World',
    title: '7 Obligate Taxonomic Hierarchy',
    frontPrompt: 'List the 7 obligate taxonomical hierarchy ranks from broadest to most specific unit.',
    formula: 'Kingdom -> Phylum / Division -> Class -> Order -> Family -> Genus -> Species',
    variables: 'Mnemonic: King Philip Came Over For Good Soup (Phylum for animals, Division for plants)',
    examTip: 'As we move ascending from Species to Kingdom, the number of shared common characteristics decreases.',
    examTarget: 'NEET'
  },
  {
    id: 'fc-bio-2',
    subject: 'Biology',
    chapter: 'The Living World',
    title: 'Binomial Nomenclature Rules (ICBN/ICZN)',
    frontPrompt: 'What are the 4 fundamental universal rules of binomial nomenclature formulated by Carolus Linnaeus?',
    formula: 'Format: Genus (Capitalized) + specific_epithet (lowercase) + Author (abbreviated)',
    variables: 'Example: Mangifera indica Linn. Latin origin, italicized in print or separately underlined by hand.',
    examTip: 'Tautonyms (identical Genus and species, e.g. Naja naja) are valid in animal taxonomy (ICZN) but strictly disallowed in plant taxonomy (ICBN).',
    examTarget: 'NEET'
  },
  {
    id: 'fc-bio-3',
    subject: 'Biology',
    chapter: 'Genetics',
    title: 'Hardy-Weinberg Principle',
    frontPrompt: 'What is the mathematical equation describing genetic equilibrium in a random mating population without evolutionary influences?',
    formula: 'p + q = 1,   p^2 + 2pq + q^2 = 1',
    variables: 'p = Dominant allele frequency, q = Recessive allele frequency, 2pq = Heterozygous genotype freq',
    examTip: 'If homozygous recessive percentage is 9%, then q^2 = 0.09 => q = 0.3, p = 0.7, Carrier (2pq) = 2(0.7)(0.3) = 42%.',
    examTarget: 'NEET'
  },
  {
    id: 'fc-math-1',
    subject: 'Mathematics',
    chapter: 'Calculus',
    title: 'Integration by Parts',
    frontPrompt: 'What is the product rule of integration and how are functions prioritized?',
    formula: "∫ u·v dx = u·∫v dx - ∫ [u'·(∫v dx)] dx",
    variables: 'Priority Rule (ILATE): Inverse, Logarithmic, Algebraic, Trigonometric, Exponential',
    examTip: 'Choose u as the function that comes first in ILATE because its derivative simplifies faster.',
    examTarget: 'JEE'
  },
  {
    id: 'fc-math-2',
    subject: 'Mathematics',
    chapter: 'Probability',
    title: 'Bayes Theorem Conditional Probability',
    frontPrompt: 'What is the formula for calculating reverse conditional probability given mutually exclusive prior events?',
    formula: 'P(A_i | B) = [P(B | A_i) * P(A_i)] / [Σ P(B | A_k) * P(A_k)]',
    variables: 'P(A_i) = Prior probability, P(B | A_i) = Likelihood, P(A_i | B) = Posterior probability',
    examTip: 'Denominator is the Total Probability Theorem. Always ensure the sum of all prior probabilities Σ P(A_k) = 1.',
    examTarget: 'JEE'
  }
];

export interface DynamicRevisionItem {
  id: string;
  subject: SubjectName;
  chapter: string;
  topic: string;
  type: 'mistake' | 'weakness' | 'spaced' | 'high_yield';
  priorityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  badgeText: string;
  reason: string;
  actionText: string;
  targetCount: number;
}

export const SmartRevision: React.FC = () => {
  const navigate = useNavigate();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);
  const subjects: (SubjectName | 'All')[] = ['All', ...allowedSubjects];

  const [activeSection, setActiveSection] = useState<'due' | 'flashcards'>('due');
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');

  // Flashcard states
  const [cards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('prepora_mastered_flashcards');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [, setDrillRefresh] = useState(0);

  // 1. Spaced Repetition items from storage
  const storedItems = progressService.getRevisionItems();
  const rawDueItems = storedItems.filter((i) => i.status === 'due-today');
  const upcomingItems = storedItems.filter((i) => i.status === 'upcoming');
  const completedItems = storedItems.filter((i) => i.status === 'completed');

  // 2. Compute dynamic actionable revision recommendations (What should I revise today?)
  const dynamicRevisionItems: DynamicRevisionItem[] = useMemo(() => {
    const list: DynamicRevisionItem[] = [];
    const seenTopics = new Set<string>();

    const mistakes = userService.getMistakes();
    const weaknesses = userService.getWeaknesses();

    // Group mistakes by topic/chapter
    const mistakeMap = new Map<string, { subject: SubjectName; chapter: string; topic: string; count: number }>();
    mistakes.forEach((m) => {
      if (!isSubjectAllowedForExam(m.subject, user.targetExam)) return;
      const key = `${m.subject}_${m.chapter}_${m.topic}`.toLowerCase();
      if (!mistakeMap.has(key)) {
        mistakeMap.set(key, { subject: m.subject, chapter: m.chapter, topic: m.topic, count: 0 });
      }
      mistakeMap.get(key)!.count++;
    });

    // A. Priority 1: Recent Mistakes (Fix error traps before next test)
    mistakeMap.forEach((val) => {
      // STRICT ISOLATION: A chapter must have been practiced to be in revision!
      const prog = syllabusService.getChapterProgress(val.chapter);
      if (prog.totalAttempts === 0 && val.count === 0) return; // Untouched chapter belongs in Backlog!

      const key = `${val.subject}_${val.chapter}_${val.topic}`.toLowerCase();
      seenTopics.add(key);
      list.push({
        id: `rev-mistake-${key}`,
        subject: val.subject,
        chapter: val.chapter,
        topic: val.topic,
        type: 'mistake',
        priorityLevel: 'CRITICAL',
        badgeText: '🔴 URGENT MISTAKE REVIEW',
        reason: `${val.count} wrong question${val.count > 1 ? 's' : ''} logged in recent practice • Eliminate conceptual error pattern`,
        actionText: 'Revise Mistakes (5 Qs)',
        targetCount: 5
      });
    });

    // B. Priority 2: Critical Weakness (<60% accuracy)
    weaknesses.forEach((w) => {
      if (!isSubjectAllowedForExam(w.subject, user.targetExam)) return;
      const prog = syllabusService.getChapterProgress(w.chapter);
      // Untouched chapters belong in Backlog, not Revision!
      if (prog.totalAttempts === 0 && (!w.totalAttempts || w.totalAttempts === 0)) return;

      const key = `${w.subject}_${w.chapter}_${w.topic}`.toLowerCase();
      if (!seenTopics.has(key) && w.accuracy < 65) {
        seenTopics.add(key);
        list.push({
          id: `rev-weakness-${key}`,
          subject: w.subject,
          chapter: w.chapter,
          topic: w.topic,
          type: 'weakness',
          priorityLevel: 'HIGH',
          badgeText: '🟡 LOW ACCURACY (<65%)',
          reason: `Current accuracy is ${w.accuracy}% • Vulnerable to negative marking in exam`,
          actionText: 'Strengthen Concept (5 Qs)',
          targetCount: 5
        });
      }
    });

    // C. Priority 3: Scheduled Spaced Repetition Due Today
    rawDueItems.forEach((it) => {
      if (!isSubjectAllowedForExam(it.subject, user.targetExam)) return;
      const key = `${it.subject}_${it.chapter}_${it.topic}`.toLowerCase();
      if (!seenTopics.has(key)) {
        seenTopics.add(key);
        list.push({
          id: it.id,
          subject: it.subject,
          chapter: it.chapter,
          topic: it.topic,
          type: 'spaced',
          priorityLevel: 'MEDIUM',
          badgeText: `🟢 SPACED REPETITION (STAGE ${it.intervalStage})`,
          reason: `Memory retention decay interval due today • Scheduled review`,
          actionText: 'Quick Recall (5 Qs)',
          targetCount: 5
        });
      }
    });

    // D. Priority 4: High-Yield Practiced Chapter Recall (if list is short)
    if (list.length < 3) {
      canonicalSyllabus.forEach((c) => {
        if (!isSubjectAllowedForExam(c.subjectName as SubjectName, user.targetExam)) return;
        if (c.weightage !== 'High') return;
        const prog = syllabusService.getChapterProgress(c.chapterId || c.name);
        if ((prog.totalAttempts || 0) > 0 && prog.status !== 'Not Started') {
          const firstTopic = c.topics?.[0]?.name || c.name;
          const key = `${c.subjectName}_${c.name}_${firstTopic}`.toLowerCase();
          if (!seenTopics.has(key) && list.length < 5) {
            seenTopics.add(key);
            list.push({
              id: `rev-highyield-${key}`,
              subject: c.subjectName as SubjectName,
              chapter: c.name,
              topic: firstTopic,
              type: 'high_yield',
              priorityLevel: 'HIGH',
              badgeText: '⚡ HIGH-YIELD EXAM RETENTION',
              reason: `High exam weightage (8–12 marks) • Keep recall sharp with 5 quick numericals`,
              actionText: 'Practice Recall (5 Qs)',
              targetCount: 5
            });
          }
        }
      });
    }

    return list;
  }, [user.targetExam, rawDueItems]);

  // 3. Count missed chapters to show in cross-link
  const missedChaptersCount = useMemo(() => {
    const examPrefix = user.targetExam === 'NEET' ? 'NEET' : user.targetExam === 'CBSE' ? 'CBSE' : user.targetExam === 'RBSE' ? 'RBSE' : 'JEE';
    const sum = syllabusService.getMasterySummary(examPrefix);
    return Math.max(0, sum.totalChapters - sum.practicedChapters);
  }, [user.targetExam]);

  // Filter dynamic items by subject
  const filteredRevisionItems = useMemo(() => {
    return dynamicRevisionItems.filter((item) => {
      if (selectedSubject !== 'All' && item.subject !== selectedSubject) return false;
      return true;
    });
  }, [dynamicRevisionItems, selectedSubject]);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('prepora_mastered_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  const handleMarkComplete = (id: string) => {
    progressService.completeRevisionItem(id);
    setDrillRefresh((prev) => prev + 1);
  };

  const filteredCards = cards.filter((c) => {
    if (!isSubjectAllowedForExam(c.subject, user.targetExam)) return false;
    if (selectedSubject !== 'All' && c.subject !== selectedSubject) return false;
    return true;
  });

  const masteredCount = filteredCards.filter((c) => masteredCards[c.id]).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header with Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Smart Revision</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Focus strictly on <strong>what to revise today</strong>: Recent mistakes, retention bottlenecks, and spaced memory curves.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('due')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'due'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            What to Revise Today ({filteredRevisionItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'flashcards'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
            }`}
          >
            Formula Flashcards
          </button>
        </div>
      </div>

      {/* 2. Clear Separation Banner: Revision vs Missed Chapters Backlog */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-brand-950 text-white border border-brand-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-white text-xs sm:text-sm">
              Untouched Syllabus? Check Missed Chapters Backlog ({missedChaptersCount} chapters)
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Revision is exclusively for chapters you have already studied. Chapters with 0 practice belong in your Backlog.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          onClick={() => navigate('/backlog')}
          className="shrink-0 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs"
        >
          <span>View Missed Chapters</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedSubject === sub
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {activeSection === 'due' ? (
        /* Primary Focus: What to Revise Now */
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Today's Targeted Revision Queue
                </h2>
                <p className="text-xs text-slate-500">
                  Priority-ordered topics based on mistake patterns, low accuracy, and memory curve decay.
                </p>
              </div>

              {filteredRevisionItems.length > 0 && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    const first = filteredRevisionItems[0];
                    navigate(
                      `/practice?subject=${first.subject}&chapter=${encodeURIComponent(first.chapter)}&topic=${encodeURIComponent(first.topic)}&count=5`
                    );
                  }}
                  className="text-xs font-semibold py-1.5 px-3 bg-brand-600 hover:bg-brand-700 text-white flex items-center gap-1.5 shadow-sm"
                >
                  <span>Start First Drill (5 Qs)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            {filteredRevisionItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    No Pending Revisions in this Subject!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You have no active mistakes or memory decays due today. Continue solving new questions or explore your missed chapters backlog.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <Button size="sm" onClick={() => navigate('/practice')}>
                    Practice Fresh Questions
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/backlog')}>
                    Catch Up Missed Chapters &rarr;
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRevisionItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
                      item.type === 'mistake'
                        ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20'
                        : item.type === 'weakness'
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a]'
                    }`}
                  >
                    <div className="space-y-1.5 max-w-lg">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold flex items-center justify-center text-[11px]">
                          {index + 1}
                        </span>
                        <span className="font-black text-slate-900 dark:text-white text-sm">
                          {item.topic}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{item.chapter}</span>
                        <Badge variant={item.subject === 'Physics' ? 'brand' : item.subject === 'Chemistry' ? 'warning' : 'info'}>
                          {item.subject}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 pl-7">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                          {item.badgeText}
                        </span>
                      </div>

                      <div className="text-slate-600 dark:text-slate-300 text-[11px] pl-7 leading-relaxed">
                        <strong>Why revise today:</strong> {item.reason}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-7 sm:pl-0 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/formula-sheet?subject=${item.subject}&chapter=${encodeURIComponent(item.chapter)}`)}
                        className="text-xs font-medium py-1 px-2.5 text-slate-700 dark:text-slate-200 hover:text-brand-600"
                        title="Review Formulas"
                      >
                        <BookMarked className="w-3.5 h-3.5 mr-1 text-brand-600" /> Formulas
                      </Button>

                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate(
                            `/practice?subject=${item.subject}&chapter=${encodeURIComponent(item.chapter)}&topic=${encodeURIComponent(item.topic)}&count=${item.targetCount}`
                          )
                        }
                        className="text-xs font-semibold py-1.5 px-3 bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
                      >
                        {item.actionText}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkComplete(item.id)}
                        className="text-xs font-medium py-1 px-2 text-slate-500 hover:text-emerald-600"
                        title="Mark as Revised"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Progressive Disclosure: Upcoming & Completed Spaced Revisions */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-white dark:bg-[#0c131a] space-y-3">
            <button
              type="button"
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900"
            >
              <span>Upcoming Memory Cycle Queue ({upcomingItems.length} Scheduled, {completedItems.length} Done)</span>
              {showUpcoming ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showUpcoming && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs">
                {upcomingItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider text-[11px]">Upcoming Queue</h4>
                    <div className="space-y-2">
                      {upcomingItems.map((item) => (
                        <div key={item.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-800 dark:text-slate-100">{item.topic}</div>
                            <div className="text-[11px] text-slate-400">{item.chapter} ({item.subject}) • Scheduled: {item.nextDueDate}</div>
                          </div>
                          <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">Day {item.intervalStage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {completedItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider text-[11px]">Recently Completed</h4>
                    <div className="space-y-2">
                      {completedItems.map((item) => (
                        <div key={item.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between opacity-80">
                          <div className="font-medium text-slate-700 dark:text-slate-200">{item.topic} ({item.subject})</div>
                          <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Completed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Formula Flashcards Deck */
        <div className="space-y-6">
          {/* Controls & Subject Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a]">
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{masteredCount} of {filteredCards.length}</span>
              <span className="text-slate-500"> formulas mastered</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => {
              const isFlipped = Boolean(flippedCards[card.id]);
              const isMastered = Boolean(masteredCards[card.id]);

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className={`min-h-[220px] rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between select-none ${
                    isMastered
                      ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                      : isFlipped
                      ? 'border-brand-300 dark:border-brand-800 bg-brand-50/40 dark:bg-brand-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant={card.subject === 'Physics' ? 'brand' : card.subject === 'Chemistry' ? 'warning' : 'info'}>
                          {card.subject}
                        </Badge>
                        <span className="text-[11px] text-slate-400">{card.chapter}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleMastered(card.id, e)}
                        className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                          isMastered
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        <Check className="w-3 h-3" />
                        <span>{isMastered ? 'Mastered' : 'Mark'}</span>
                      </button>
                    </div>

                    {!isFlipped ? (
                      <div className="space-y-2 pt-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{card.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{card.frontPrompt}</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-2">
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 font-mono text-xs text-brand-700 dark:text-brand-300 font-bold">
                          {card.formula}
                        </div>
                        <div className="text-[11px] text-slate-500">{card.variables}</div>
                        <div className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg">
                          💡 <strong>Exam Tip:</strong> {card.examTip}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-slate-400 font-semibold text-right pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>{isFlipped ? 'Answer revealed' : 'Prompt card'}</span>
                    <span className="text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      <Repeat className="w-3 h-3" /> Click to flip
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SmartRevision;
