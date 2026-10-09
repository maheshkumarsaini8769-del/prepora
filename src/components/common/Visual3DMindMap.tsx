import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  Compass,
  Download,
  Info
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { Button } from './UIComponents';
import { SubjectName } from '../../types';

export interface Visual3DMindMapItem {
  id: string;
  subject: SubjectName;
  exam: 'NEET & JEE' | 'NEET-UG' | 'JEE Main & Advanced';
  chapterTitle: string;
  subtitle: string;
  imageSrc: string;
  accentColor: string; // Tailwind color name like 'purple', 'emerald', 'sky', 'amber'
  summary: string;
  branches: {
    id: string;
    title: string;
    tag: 'Core Concept' | 'Formula' | 'Relationship' | 'Process' | 'Trap' | 'Must Know';
    description: string;
    formula?: string;
    variables?: string;
    trap?: string;
    mustKnow?: string;
  }[];
}

export const VISUAL_3D_MINDMAPS: Visual3DMindMapItem[] = [
  {
    id: 'physics-dual-nature',
    subject: 'Physics',
    exam: 'NEET & JEE',
    chapterTitle: 'Dual Nature of Radiation & Matter',
    subtitle: 'Photoelectric Effect • Matter Waves • Einstein Equation • de Broglie',
    imageSrc: '/assets/mindmaps/physics_dual_nature_3d.jpg',
    accentColor: 'indigo',
    summary:
      'Complete 3D visual mastery map covering Einstein photoelectric equation, de Broglie matter waves, threshold frequency, stopping potential curves, and experimental observations.',
    branches: [
      {
        id: 'p-1',
        title: 'Einstein Photoelectric Equation',
        tag: 'Formula',
        description:
          'Energy of an incident photon is split between metal work function and maximum kinetic energy of emitted photoelectrons.',
        formula: 'K_{\\max} = h\\nu - \\Phi_0 = eV_0',
        variables: 'h = Planck constant, \\nu = incident frequency, \\Phi_0 = work function, V_0 = stopping potential',
        trap: 'Intensity determines rate of photoelectron emission (saturation current), NOT the maximum kinetic energy or stopping potential.',
        mustKnow: 'Work function (\\Phi_0 = h\\nu_0) is purely a metal property. Independent of incident frequency or intensity.'
      },
      {
        id: 'p-2',
        title: 'de Broglie Matter Wavelength',
        tag: 'Formula',
        description:
          'Every moving particle displays wave properties with wavelength inversely proportional to its linear momentum.',
        formula: '\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mE}}',
        variables: 'm = mass, v = velocity, E = kinetic energy = qV',
        trap: 'For an accelerated electron through potential V in volts: \\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} (NOT Å unless multiplied by 10).',
        mustKnow: 'If an electron and proton have equal kinetic energy, the proton has shorter \\lambda because \\lambda \\propto 1/\\sqrt{m}.'
      },
      {
        id: 'p-3',
        title: 'Stopping Potential & Cut-off Frequency',
        tag: 'Relationship',
        description:
          'Retarding potential required to reduce photocurrent to zero regardless of light intensity.',
        formula: 'V_0 = \\left(\\frac{h}{e}\\right)\\nu - \\frac{\\Phi_0}{e}',
        variables: 'Slope of V_0 \\text{ vs } \\nu graph is always \\frac{h}{e} (universal constant for all metals)',
        trap: 'Slope of the V_0 vs \\nu graph NEVER changes between metals; only the intercept (-\\Phi_0/e) shifts.',
        mustKnow: 'No emission occurs if \\nu < \\nu_0 (threshold frequency), even if intensity is arbitrarily high.'
      },
      {
        id: 'p-4',
        title: 'Photon Properties & Momentum',
        tag: 'Core Concept',
        description:
          'Photons travel at speed c in vacuum, have zero rest mass, and exert radiation pressure on reflecting and absorbing surfaces.',
        formula: 'E = h\\nu = pc \\implies p = \\frac{h}{\\lambda}',
        variables: 'Radiation force on complete absorber = \\frac{I A}{c}, on complete reflector = \\frac{2 I A}{c}',
        mustKnow: 'When light changes medium, frequency \\nu remains constant while wavelength \\lambda and speed v change.'
      }
    ]
  },
  {
    id: 'chem-bonding',
    subject: 'Chemistry',
    exam: 'NEET & JEE',
    chapterTitle: 'Chemical Bonding & Molecular Structure',
    subtitle: 'VSEPR Geometries • Hybridization • Molecular Orbital Theory • Dipole Moment',
    imageSrc: '/assets/mindmaps/chemistry_bonding_3d.jpg',
    accentColor: 'emerald',
    summary:
      '3D architecture map of chemical bonding: VSEPR shapes, orbital hybridization, MOT energy order, dipole vectors, and octet exceptions.',
    branches: [
      {
        id: 'c-1',
        title: 'Molecular Orbital Theory (MOT)',
        tag: 'Formula',
        description:
          'Atomic orbitals combine to form bonding (\\sigma, \\pi) and antibonding (\\sigma^*, \\pi^*) molecular orbitals.',
        formula: '\\text{Bond Order} = \\frac{N_b - N_a}{2}',
        variables: 'N_b = electrons in bonding MOs, N_a = electrons in antibonding MOs',
        trap: 'For \\le 14 electrons (B_2, C_2, N_2), \\pi 2p_x = \\pi 2p_y are lower in energy than \\sigma 2p_z due to s-p mixing.',
        mustKnow: 'O_2 has Bond Order 2 and is PARAMAGNETIC due to 2 unpaired electrons in \\pi^* 2p_x and \\pi^* 2p_y.'
      },
      {
        id: 'c-2',
        title: 'VSEPR Theory & Lone Pair Repulsion',
        tag: 'Core Concept',
        description:
          'Repulsion order: Lone Pair-Lone Pair > Lone Pair-Bond Pair > Bond Pair-Bond Pair. Lone pairs distort ideal geometry.',
        formula: '\\text{Steric Number} = \\text{Bond Pairs} + \\text{Lone Pairs}',
        trap: 'XeF_4 has Steric No. 6 (4 BP + 2 LP) \\implies Octahedral electron geometry, but SQUARE PLANAR molecular shape.',
        mustKnow: 'In trigonal bipyramidal (sp^3d), lone pairs occupy EQUATORIAL positions to minimize 90° repulsions (e.g., ClF_3 is T-shaped, SF_4 is See-saw).'
      },
      {
        id: 'c-3',
        title: 'Dipole Moment & Vector Cancellation',
        tag: 'Relationship',
        description:
          'Product of magnitude of charge and distance between centres of positive and negative charge.',
        formula: '\\mu = q \\times d \\quad (1\\text{ Debye} = 3.336 \\times 10^{-30}\\text{ C}\\cdot\\text{m})',
        trap: 'NH_3 (1.47 D) has higher dipole moment than NF_3 (0.23 D) because in NH_3 the lone pair moment reinforces N-H bond dipoles, while in NF_3 it opposes.',
        mustKnow: 'Symmetrical molecules like BF_3, CCl_4, SF_6, and CO_2 have zero net dipole moment (\\mu = 0) despite polar bonds.'
      },
      {
        id: 'c-4',
        title: 'Exceptions to Octet Rule',
        tag: 'Trap',
        description:
          'Incomplete octet (LiCl, BeH_2, BCl_3), Odd-electron molecules (NO, NO_2), and Expanded octet (PCl_5, SF_6, H_2SO_4).',
        trap: 'PCl_5 in solid state exists as [PCl_4]^+ (tetrahedral) and [PCl_6]^- (octahedral), NOT trigonal bipyramidal!',
        mustKnow: 'Axial bonds in gaseous PCl_5 are longer and weaker than equatorial bonds due to greater repulsion from 3 equatorial bonds.'
      }
    ]
  },
  {
    id: 'bio-inheritance',
    subject: 'Biology',
    exam: 'NEET-UG',
    chapterTitle: 'Molecular Basis of Inheritance',
    subtitle: 'DNA Replication • Lac Operon • Genetic Code • Transcription & Translation',
    imageSrc: '/assets/mindmaps/biology_inheritance_3d.jpg',
    accentColor: 'rose',
    summary:
      'High-yield NCERT Biology mind map: DNA packaging in nucleosomes, Meselson-Stahl semiconservative replication, transcription mechanisms, and inducible Lac Operon.',
    branches: [
      {
        id: 'b-1',
        title: 'DNA Packaging & Nucleosome',
        tag: 'Core Concept',
        description:
          'Positively charged basic histone octamer (two each of H2A, H2B, H3, H4 rich in Lysine and Arginine) wrapped by 200 bp negatively charged DNA.',
        formula: '\\text{Human DNA length} = 6.6 \\times 10^9\\text{ bp} \\times 0.34\\text{ nm} = 2.2\\text{ m}',
        trap: 'H1 histone is NOT part of the octamer core; it acts as a linker histone binding the entry/exit DNA.',
        mustKnow: 'Euchromatin is loosely packed, lightly stained, and transcriptionally ACTIVE. Heterochromatin is dense, dark, and INACTIVE.'
      },
      {
        id: 'b-2',
        title: 'Semiconservative DNA Replication',
        tag: 'Process',
        description:
          'Meselson & Stahl (1958) proved using 15N heavy isotope in E. coli. DNA polymerase synthesizes only in 5\' \\to 3\' direction.',
        trap: 'Leading strand is synthesized continuously towards replication fork; Lagging strand is synthesized discontinuously producing Okazaki fragments joined by DNA Ligase.',
        mustKnow: 'Taylor and colleagues demonstrated semiconservative replication on chromosomes in Vicia faba using radioactive thymidine.'
      },
      {
        id: 'b-3',
        title: 'Lac Operon Regulation',
        tag: 'Must Know',
        description:
          'Jacob and Monod: Polycistronic structural genes (z: \\beta-galactosidase, y: permease, a: transacetylase) regulated by lacI repressor.',
        trap: 'Lac operon default state is OFF (repressed). Allolactose/Lactose acts as INDUCER that inactivates the repressor.',
        mustKnow: 'Permease is needed to enter lactose into cell; therefore, very low basal level expression of lac operon must always be present.'
      },
      {
        id: 'b-4',
        title: 'Genetic Code & Wobble Hypothesis',
        tag: 'Core Concept',
        description:
          '64 codons: 61 code for 20 amino acids, 3 stop codons (UAA, UAG, UGA). Universal, unambiguous, non-overlapping, and degenerate.',
        trap: 'AUG has dual function: Codes for Methionine (Met) AND acts as the initiator codon.',
        mustKnow: 'Crick proposed the adapter molecule (tRNA) with anticodon loop that reads the mRNA in 5\' \\to 3\' polarity.'
      }
    ]
  },
  {
    id: 'math-integrals',
    subject: 'Mathematics',
    exam: 'JEE Main & Advanced',
    chapterTitle: 'Definite Integrals & Properties',
    subtitle: 'King & Queen Rules • Newton-Leibnitz Theorem • Limit of Sum • Symmetry',
    imageSrc: '/assets/mindmaps/mathematics_integrals_3d.jpg',
    accentColor: 'amber',
    summary:
      'Rigorous JEE 3D visual guide to definite integration: Kings property transformations, differentiation under integral sign, limits of Riemann sums, and piecewise function analysis.',
    branches: [
      {
        id: 'm-1',
        title: 'King\'s Property & Symmetry',
        tag: 'Formula',
        description:
          'Most powerful transformation in JEE definite integrals: variable substitution x \\to a + b - x.',
        formula: '\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx',
        trap: 'Always check that f(x) has no discontinuity in [a, b] before applying King\'s property.',
        mustKnow: 'If f(a + b - x) + f(x) = C (constant), then \\int_a^b f(x)\\,dx = \\frac{C(b - a)}{2}.'
      },
      {
        id: 'm-2',
        title: 'Newton-Leibnitz Differentiation Rule',
        tag: 'Formula',
        description:
          'Differentiating an integral with variable limits with respect to the parameter x.',
        formula: '\\frac{d}{dx} \\left[ \\int_{g(x)}^{h(x)} f(t)\\,dt \\right] = f(h(x))\\cdot h\'(x) - f(g(x))\\cdot g\'(x)',
        trap: 'Do not forget to multiply by the derivatives h\'(x) and g\'(x) (chain rule factor).',
        mustKnow: 'Used extensively in 0/0 or \\infty/\\infty L\'Hôpital questions in JEE Advanced.'
      },
      {
        id: 'm-3',
        title: 'Queen\'s Property & Periodic Functions',
        tag: 'Relationship',
        description:
          'Symmetry rule for \\int_0^{2a} f(x)\\,dx. Yields 2\\int_0^a f(x)\\,dx if f(2a-x) = f(x), or 0 if f(2a-x) = -f(x).',
        formula: '\\int_0^{2a} f(x)\\,dx = \\int_0^a [f(x) + f(2a - x)]\\,dx',
        mustKnow: 'If f(x) is periodic with period T: \\int_0^{nT} f(x)\\,dx = n\\int_0^T f(x)\\,dx, and \\int_a^{a + T} f(x)\\,dx = \\int_0^T f(x)\\,dx.'
      },
      {
        id: 'm-4',
        title: 'Definite Integral as Limit of a Sum',
        tag: 'Core Concept',
        description:
          'Converting infinite series into standard Riemann integrals by mapping r/n \\to x and 1/n \\to dx.',
        formula: '\\lim_{n \\to \\infty} \\frac{1}{n} \\sum_{r=1}^{pn} f\\left(\\frac{r}{n}\\right) = \\int_0^p f(x)\\,dx',
        trap: 'Ensure factors like 1/n are factored out completely before setting up the integral.',
        mustKnow: 'Limits of integration are \\lim_{n \\to \\infty} \\frac{r_{\\min}}{n} to \\lim_{n \\to \\infty} \\frac{r_{\\max}}{n}.'
      }
    ]
  }
];

interface Visual3DMindMapProps {
  initialSubject?: SubjectName;
  onSelectChapter?: (chapter: string, subject: SubjectName) => void;
}

export const Visual3DMindMap: React.FC<Visual3DMindMapProps> = ({
  initialSubject = 'Physics',
  onSelectChapter
}) => {
  const navigate = useNavigate();

  // Pick initial map matching the initial subject if possible
  const matchingIndex = VISUAL_3D_MINDMAPS.findIndex(
    (m) => m.subject.toLowerCase() === initialSubject.toLowerCase()
  );
  const [selectedMapId, setSelectedMapId] = useState<string>(
    matchingIndex !== -1 ? VISUAL_3D_MINDMAPS[matchingIndex].id : VISUAL_3D_MINDMAPS[0].id
  );

  const [activeFilter, setActiveFilter] = useState<'all' | 'mustKnow' | 'trap' | 'formula'>('all');
  const [isZoomedModalOpen, setIsZoomedModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Visual3DMindMapItem['branches'][0] | null>(null);

  const currentMap =
    VISUAL_3D_MINDMAPS.find((m) => m.id === selectedMapId) || VISUAL_3D_MINDMAPS[0];

  const filteredBranches = currentMap.branches.filter((b) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'mustKnow') return b.mustKnow !== undefined;
    if (activeFilter === 'trap') return b.trap !== undefined || b.tag === 'Trap';
    if (activeFilter === 'formula') return b.formula !== undefined || b.tag === 'Formula';
    return true;
  });

  const getSubjectIcon = (sub: SubjectName) => {
    switch (sub) {
      case 'Physics':
        return <Atom className="w-4 h-4 text-sky-400" />;
      case 'Chemistry':
        return <FlaskConical className="w-4 h-4 text-emerald-400" />;
      case 'Biology':
        return <Dna className="w-4 h-4 text-rose-400" />;
      case 'Mathematics':
        return <Calculator className="w-4 h-4 text-amber-400" />;
      default:
        return <Compass className="w-4 h-4 text-purple-400" />;
    }
  };

  const getTagBadge = (tag: Visual3DMindMapItem['branches'][0]['tag']) => {
    switch (tag) {
      case 'Formula':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
            🧮 Formula
          </span>
        );
      case 'Trap':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
            ⚠️ Examiner Trap
          </span>
        );
      case 'Must Know':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">
            ⭐ Must Know
          </span>
        );
      case 'Process':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">
            🔄 Process
          </span>
        );
      case 'Relationship':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
            🔗 Relationship
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            📚 Core Concept
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Subject Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/90 dark:bg-[#070d14] rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          {VISUAL_3D_MINDMAPS.map((map) => {
            const isSelected = map.id === selectedMapId;
            return (
              <button
                key={map.id}
                type="button"
                onClick={() => {
                  setSelectedMapId(map.id);
                  if (onSelectChapter) {
                    onSelectChapter(map.chapterTitle, map.subject);
                  }
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/50 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                {getSubjectIcon(map.subject)}
                <span>{map.subject}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-black/40 text-slate-300">
                  {map.exam}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Premium 3D Visual Notes</span>
          </span>
        </div>
      </div>

      {/* 2. Main 3D Educational Infographic Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: High-Res 3D Rendered Mind Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-2xl space-y-4 relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar with Chapter Info and Actions */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {currentMap.subject} • {currentMap.exam}
                </span>
                <span className="text-[11px] font-bold text-slate-400">
                  NCERT & NTA Syllabus Verified
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentMap.chapterTitle}
              </h2>
              <p className="text-xs text-slate-300/90 mt-0.5">{currentMap.subtitle}</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomedModalOpen(true)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white transition shadow-sm border border-slate-700/60 cursor-pointer"
                title="View Full Resolution 3D Map"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* High-Res 3D Visual Rendering Display */}
          <div
            onClick={() => setIsZoomedModalOpen(true)}
            className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 cursor-zoom-in group/img shadow-inner"
          >
            <img
              src={currentMap.imageSrc}
              alt={currentMap.chapterTitle}
              className="w-full h-auto object-cover transform group-hover/img:scale-[1.015] transition-transform duration-300 select-none"
            />
            {/* Interactive Overlay Callout */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white drop-shadow-sm">
                  Click to inspect high-definition 3D details
                </span>
              </div>
              <span className="text-[11px] font-mono text-purple-200 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                HD 3D Model
              </span>
            </div>
          </div>

          {/* Quick Syllabus Summary */}
          <p className="text-xs text-slate-300/80 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80">
            {currentMap.summary}
          </p>
        </div>

        {/* Right Column: Interactive 3D Concept Breakdown & Traps (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filter Chips Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Branches ({currentMap.branches.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('mustKnow')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'mustKnow'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⭐ Must Know
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('trap')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'trap'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ⚠️ Traps
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('formula')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeFilter === 'formula'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🧮 Formulas
              </button>
            </div>
          </div>

          {/* Cards Stack */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredBranches.map((branch) => {
              const isSelected = selectedBranch?.id === branch.id;
              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(isSelected ? null : branch)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-br from-slate-900 to-purple-950/70 border-purple-500 shadow-lg shadow-purple-900/20'
                      : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-black text-white">{branch.title}</h3>
                    {getTagBadge(branch.tag)}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                    {branch.description}
                  </p>

                  {/* Formula block if exists */}
                  {branch.formula && (
                    <div className="p-2.5 rounded-xl bg-black/60 border border-slate-800 text-amber-300 my-2 text-xs">
                      <div className="font-mono text-center">
                        <MathRenderer displayMode={true} content={branch.formula} />
                      </div>
                      {branch.variables && (
                        <p className="text-[11px] text-slate-400 mt-1.5 italic border-t border-slate-800/80 pt-1">
                          {branch.variables}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Must Know Callout */}
                  {branch.mustKnow && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/50 text-purple-200 text-xs mt-2">
                      <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300 font-bold block text-[11px]">
                          NEET/JEE MUST KNOW:
                        </strong>
                        <span>{branch.mustKnow}</span>
                      </div>
                    </div>
                  )}

                  {/* Trap Warning */}
                  {branch.trap && (
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs mt-2">
                      <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-rose-400 font-bold block text-[11px]">
                          COMMON EXAMINER TRAP:
                        </strong>
                        <span>{branch.trap}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Action Hub */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-700/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                Ready to Test Your Mastery?
              </h4>
              <p className="text-[11px] text-purple-200">
                Solve curated NEET & JEE questions for {currentMap.chapterTitle}.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                navigate(
                  `/chapters/${encodeURIComponent(currentMap.chapterTitle)}?subject=${encodeURIComponent(
                    currentMap.subject
                  )}`
                )
              }
              className="w-full sm:w-auto text-xs font-bold py-2 px-3 bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Practice Questions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen / High-Resolution Zoom Modal */}
      {isZoomedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                {getSubjectIcon(currentMap.subject)}
                <div>
                  <h3 className="text-sm font-black text-white">
                    {currentMap.chapterTitle} — High-Res 3D Mind Map
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {currentMap.subject} • {currentMap.exam}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentMap.imageSrc}
                  download={`${currentMap.id}.jpg`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsZoomedModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with Scroll */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
              <img
                src={currentMap.imageSrc}
                alt={currentMap.chapterTitle}
                className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl border border-slate-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
