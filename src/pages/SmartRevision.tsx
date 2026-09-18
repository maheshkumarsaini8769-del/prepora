import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCw,
  CheckCircle2,
  Clock,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  Repeat
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { SubjectName } from '../types';

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

export const SmartRevision: React.FC = () => {
  const navigate = useNavigate();
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
  const items = progressService.getRevisionItems();
  const dueTodayItems = items.filter((i) => i.status === 'due-today');
  const upcomingItems = items.filter((i) => i.status === 'upcoming');
  const completedItems = items.filter((i) => i.status === 'completed');

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
    if (selectedSubject !== 'All' && c.subject !== selectedSubject) return false;
    return true;
  });

  const masteredCount = filteredCards.filter((c) => masteredCards[c.id]).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Revision</h1>
          <p className="text-sm text-slate-500 mt-1">
            Maintain long-term retention with spaced repetition and high-yield formula review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSection('due')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'due'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Due Today ({dueTodayItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('flashcards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSection === 'flashcards'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Formula Flashcards
          </button>
        </div>
      </div>

      {activeSection === 'due' ? (
        /* Primary Focus: What to Revise Now */
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Due Today</h2>
                <p className="text-xs text-slate-500">
                  Topics calculated by your memory curve for review today.
                </p>
              </div>

              {dueTodayItems.length > 0 && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate('/practice/session?count=5')}
                  className="text-xs font-semibold py-1.5 px-3 bg-slate-900 hover:bg-black text-white flex items-center gap-1.5"
                >
                  <span>Revise All ({dueTodayItems.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>

            {dueTodayItems.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-800 text-sm">All Caught Up for Today!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  No topics currently pending revision. Continue with fresh practice or review upcoming schedules below.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {dueTodayItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[11px]">
                          {index + 1}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{item.topic}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{item.subject}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] pl-7">
                        Why due: Interval Stage {item.intervalStage} • Scheduled for {item.nextDueDate}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pl-7 sm:pl-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkComplete(item.id)}
                        className="text-xs font-medium py-1 px-2.5 text-slate-700"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" /> Mark Done
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() =>
                          navigate(
                            `/practice?chapter=${encodeURIComponent(item.chapter)}&topic=${encodeURIComponent(item.topic)}`
                          )
                        }
                        className="text-xs font-semibold py-1 px-3 bg-slate-900 hover:bg-black text-white"
                      >
                        Revise
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Progressive Disclosure: Upcoming & Completed Revisions */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3">
            <button
              type="button"
              onClick={() => setShowUpcoming(!showUpcoming)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900"
            >
              <span>Upcoming & Completed Revisions ({upcomingItems.length} Upcoming, {completedItems.length} Done)</span>
              {showUpcoming ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showUpcoming && (
              <div className="pt-3 border-t border-slate-100 space-y-4 text-xs">
                {upcomingItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2 uppercase tracking-wider text-[11px]">Upcoming Queue</h4>
                    <div className="space-y-2">
                      {upcomingItems.map((item) => (
                        <div key={item.id} className="p-3 rounded-lg border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-800">{item.topic}</div>
                            <div className="text-[11px] text-slate-400">{item.subject} • Scheduled: {item.nextDueDate}</div>
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500">Day {item.intervalStage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {completedItems.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-slate-600 mb-2 uppercase tracking-wider text-[11px]">Recently Completed</h4>
                    <div className="space-y-2">
                      {completedItems.map((item) => (
                        <div key={item.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between opacity-75">
                          <div className="font-medium text-slate-700">{item.topic} ({item.subject})</div>
                          <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white">
            <div className="text-xs">
              <span className="font-bold text-slate-900">{masteredCount} of {filteredCards.length}</span>
              <span className="text-slate-500"> formulas mastered</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'] as (SubjectName | 'All')[]).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Flashcard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => {
              const isFlipped = Boolean(flippedCards[card.id]);
              const isMastered = Boolean(masteredCards[card.id]);

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className={`cursor-pointer rounded-xl p-5 border transition-all select-none ${
                    isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold">
                      <span className="text-slate-900">{card.subject}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{card.chapter}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleMastered(card.id, e)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>

                  {!isFlipped ? (
                    <div className="space-y-3 min-h-[120px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-1">{card.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">{card.frontPrompt}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Click to flip
                        </span>
                        <span className="font-mono uppercase text-[10px]">Front</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 min-h-[120px]">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                          Formula
                        </span>
                        <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs font-semibold">
                          {card.formula}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-800">Variables: </span>
                        {card.variables}
                      </div>

                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                        <span className="font-semibold text-amber-800">Exam Tip: </span>
                        {card.examTip}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Click to flip back
                        </span>
                        <span className="font-mono uppercase text-[10px]">Back</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
