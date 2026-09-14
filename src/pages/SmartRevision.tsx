import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Repeat,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Play,
  RotateCw,
  Layers,
  Award,
  Filter,
  Check,
  Zap,
  Bookmark
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
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
  // Physics
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

  // Chemistry
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

  // Biology
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

  // Mathematics
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
  const [viewMode, setViewMode] = useState<'flashcards' | 'drills'>('flashcards');
  const [activeTab, setActiveTab] = useState<'due-today' | 'upcoming' | 'completed'>('due-today');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');
  
  // Flashcard state
  const [cards, setCards] = useState<Flashcard[]>(INITIAL_FLASHCARDS);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('prepora_mastered_flashcards');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const items = progressService.getRevisionItems();
  const filteredDrills = items.filter(i => i.status === activeTab);
  const dueTodayCount = items.filter(i => i.status === 'due-today').length;

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('prepora_mastered_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  const filteredCards = cards.filter(c => {
    if (selectedSubject !== 'All' && c.subject !== selectedSubject) return false;
    return true;
  });

  const totalFiltered = filteredCards.length;
  const masteredCount = filteredCards.filter(c => masteredCards[c.id]).length;
  const masteryPercentage = totalFiltered > 0 ? Math.round((masteredCount / totalFiltered) * 100) : 0;

  const [drillRefresh, setDrillRefresh] = useState(0);

  const handleMarkComplete = (id: string) => {
    progressService.completeRevisionItem(id);
    setDrillRefresh(prev => prev + 1);
  };

  const handleStartRevisionDrill = () => {
    navigate('/practice/session?count=5');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-2">
            <Repeat className="w-3.5 h-3.5" />
            <span>Spaced Repetition & High-Yield Flashcards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Smart Revision</h1>
          <p className="text-sm text-slate-500 mt-1">
            Permanent memory locking using 3D interactive formula flashcards and Ebbinghaus forgetting curve drills.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant={viewMode === 'flashcards' ? 'primary' : 'outline'}
            onClick={() => setViewMode('flashcards')}
            className="text-xs font-bold"
          >
            <Layers className="w-3.5 h-3.5 mr-1" /> Formula Flashcards
          </Button>
          <Button
            variant={viewMode === 'drills' ? 'primary' : 'outline'}
            onClick={() => setViewMode('drills')}
            className="text-xs font-bold"
          >
            <Repeat className="w-3.5 h-3.5 mr-1" /> Spaced Drills ({dueTodayCount})
          </Button>
        </div>
      </div>

      {viewMode === 'flashcards' ? (
        /* Formula Flashcard Deck */
        <div className="space-y-6">
          {/* Deck Stats & Subject Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-200 uppercase tracking-wider block">Deck Mastery</span>
                <div className="text-xl font-black">{masteredCount} of {totalFiltered} Cards Mastered ({masteryPercentage}%)</div>
              </div>
            </div>

            {/* Subject Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'] as (SubjectName | 'All')[]).map(sub => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-white text-purple-950 font-black shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Flashcards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map(card => {
              const isFlipped = Boolean(flippedCards[card.id]);
              const isMastered = Boolean(masteredCards[card.id]);

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 select-none shadow-xs hover:shadow-md ${
                    isMastered
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-slate-200 bg-white hover:border-purple-300'
                  }`}
                >
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        {card.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {card.chapter}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                        {card.examTarget}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleMastered(card.id, e)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                    </button>
                  </div>

                  {/* Card Content (Front vs Back) */}
                  {!isFlipped ? (
                    /* Front of Card */
                    <div className="space-y-4 min-h-[140px] flex flex-col justify-between pt-1">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 mb-2">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {card.frontPrompt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-purple-600 font-bold pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" /> Click card to reveal formula & derivation
                        </span>
                        <span className="text-slate-400 font-mono">FRONT</span>
                      </div>
                    </div>
                  ) : (
                    /* Back of Card */
                    <div className="space-y-3.5 min-h-[140px] pt-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Governing Mathematical Formulation
                        </span>
                        <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm font-bold shadow-inner">
                          {card.formula}
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1">
                        <strong className="text-slate-800 font-semibold block text-[11px]">Variable Definitions:</strong>
                        <p className="font-medium text-[11px] leading-relaxed text-slate-500">{card.variables}</p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium leading-relaxed">
                        <strong className="font-bold text-amber-800 block mb-0.5">⚡ High-Yield Exam Tip:</strong>
                        {card.examTip}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-purple-600 font-bold pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <RotateCw className="w-3.5 h-3.5" /> Click to flip back
                        </span>
                        <span className="text-slate-400 font-mono">BACK</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Spaced Repetition Drills */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={activeTab === 'due-today' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('due-today')}
                className="text-xs font-bold"
              >
                Due Today ({dueTodayCount})
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'upcoming' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('upcoming')}
                className="text-xs font-bold"
              >
                Upcoming
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'completed' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('completed')}
                className="text-xs font-bold"
              >
                Completed
              </Button>
            </div>

            {dueTodayCount > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleStartRevisionDrill}
                className="font-bold text-xs shadow-md shadow-purple-500/20"
              >
                <Play className="w-3.5 h-3.5 mr-1 fill-white" /> Start Due Drill ({dueTodayCount})
              </Button>
            )}
          </div>

          {filteredDrills.length === 0 ? (
            <Card className="text-center py-16">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-base">All Caught Up!</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                No mistakes due for review in this queue. Great job staying on top of your memory curve!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDrills.map(item => (
                <Card key={item.id} className="p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                        {item.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Interval: Day {item.intervalStage}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.topic}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.chapter}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      Scheduled: {item.nextDueDate}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkComplete(item.id)}
                      className="text-xs font-bold"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" /> Mark Mastered
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
