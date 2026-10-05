import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  BookOpen,
  Sparkles,
  Target,
  AlertCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Zap,
  Award
} from 'lucide-react';
import { Badge, Button, Modal } from './UIComponents';
import { ecosystemService } from '../../services/ecosystemService';
import { questionService } from '../../services/questionService';
import { userService } from '../../services/userService';
import { SubjectName } from '../../types';

export interface MindMapNode {
  id: string;
  name: string;
  type: 'chapter' | 'topic' | 'subtopic' | 'concept';
  mastery: number;
  questionsCount: number;
  accuracy: number;
  mistakesCount: number;
  hardQuestionsCount: number;
  lastPracticed: string;
  nextRevision: string;
  status: 'Mastered' | 'Learning' | 'Weak' | 'Not Started';
  conceptNotes?: string;
  keyFormula?: string;
  children?: MindMapNode[];
}

interface InteractiveMindMapProps {
  chapterName: string;
  subject?: SubjectName;
}

export const InteractiveMindMap: React.FC<InteractiveMindMapProps> = ({
  chapterName,
  subject = 'Physics'
}) => {
  const navigate = useNavigate();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const masteryData = ecosystemService.getChapterMastery(chapterName);
  const mistakes = userService.getMistakes().filter(m => m.chapter.toLowerCase() === chapterName.toLowerCase());

  // Generate structured tree from topics & questions
  const topics = questionService.getTopics(chapterName);
  const effectiveTopics = topics.length > 0 ? topics : [
    '1D Rectilinear Motion',
    'Velocity & Acceleration Graphs',
    '2D Projectile Motion',
    'Relative Motion & Frame Analysis'
  ];

  const getSubjectFormula = (subj: SubjectName, ch: string, subName: string, idx: number): string => {
    const chLower = ch.toLowerCase();
    if (subj === 'Chemistry') {
      if (chLower.includes('thermo')) return idx % 2 === 0 ? 'ΔG° = ΔH° - TΔS°,  ΔG = -nFE°_cell' : 'ΔU = q + w,  w = -P_ext ΔV';
      if (chLower.includes('equilibrium')) return idx % 2 === 0 ? 'K_p = K_c (RT)^Δn_g,  pH = -log₁₀[H⁺]' : 'pH = pK_a + log([Salt]/[Acid])';
      if (chLower.includes('kinetics')) return idx % 2 === 0 ? 'k = (2.303/t) log([A]₀/[A]_t),  t₁/₂ = 0.693/k' : 'k = A e^(-Ea / RT)';
      if (chLower.includes('bonding')) return idx % 2 === 0 ? 'Bond Order = ½(N_b - N_a)' : 'μ = q × d (Dipole Moment in Debye)';
      if (chLower.includes('atom')) return idx % 2 === 0 ? 'r_n = 0.529 (n²/Z) Å,  E_n = -13.6 (Z²/n²) eV' : 'λ = h / (m v) = h / p';
      if (chLower.includes('solution') || chLower.includes('mole')) return idx % 2 === 0 ? 'P_A = P_A° X_A,  ΔT_b = K_b · m · i' : 'π = i C R T,  ΔT_f = K_f · m · i';
      if (chLower.includes('electrochem')) return idx % 2 === 0 ? 'E_cell = E°_cell - (0.0591/n) log Q' : 'Λ_m = (κ × 1000) / Molarity';
      return idx % 2 === 0 ? 'n = Mass / Molar Mass,  PV = nRT' : 'K_eq = [Products]^c / [Reactants]^a';
    }

    if (subj === 'Mathematics') {
      if (chLower.includes('calculus') || chLower.includes('diff') || chLower.includes('limit')) {
        return idx % 2 === 0 ? 'd/dx(u/v) = (v u\' - u v\') / v²' : 'lim_{x→0} (sin x)/x = 1,  d/dx(e^x) = e^x';
      }
      if (chLower.includes('integ')) return idx % 2 === 0 ? '∫ u v dx = u ∫v dx - ∫ (u\' ∫v dx) dx' : '∫ (1 / √(a² - x²)) dx = sin⁻¹(x/a) + C';
      if (chLower.includes('matrix') || chLower.includes('determ')) return idx % 2 === 0 ? 'A · adj(A) = |A| I,  A⁻¹ = adj(A) / |A|' : 'det(AB) = det(A) · det(B)';
      if (chLower.includes('quad') || chLower.includes('complex')) return idx % 2 === 0 ? 'x = (-b ± √(b² - 4ac)) / (2a)' : '|z| = √(x² + y²),  z = r(cos θ + i sin θ)';
      if (chLower.includes('progression') || chLower.includes('series')) return idx % 2 === 0 ? 'T_n = a + (n-1)d,  S_n = (n/2)[2a + (n-1)d]' : 'S_∞ = a / (1 - r) for |r| < 1';
      if (chLower.includes('vector') || chLower.includes('3d')) return idx % 2 === 0 ? 'a · b = |a||b| cos θ,  |a × b| = |a||b| sin θ' : 'cos²α + cos²β + cos²γ = 1';
      if (chLower.includes('prob')) return idx % 2 === 0 ? 'P(A|B) = P(A ∩ B) / P(B)' : 'P(E) = n(E) / n(S),  P(A∪B) = P(A)+P(B)-P(A∩B)';
      return idx % 2 === 0 ? '(a + b)ⁿ = ∑ ⁿC_r aⁿ⁻ʳ bʳ' : 'sin²θ + cos²θ = 1,  tan 2θ = 2 tan θ / (1 - tan²θ)';
    }

    if (subj === 'Biology') {
      if (chLower.includes('genetics') || chLower.includes('inher')) return idx % 2 === 0 ? 'Mendelian Dihybrid Ratio: 9:3:3:1' : 'Chargaff Rule: A=T (2 H-bonds), G≡C (3 H-bonds)';
      if (chLower.includes('cell')) return idx % 2 === 0 ? 'Fluid Mosaic Model: Phospholipid bilayer' : 'Cell Cycle: G1 → S (Replication) → G2 → M Phase';
      if (chLower.includes('photo')) return idx % 2 === 0 ? '6CO₂ + 12H₂O + Light → C₆H₁₂O₆ + 6O₂ + 6H₂O' : 'Calvin Cycle: Rubisco fixes CO₂ in C3 pathway';
      if (chLower.includes('respir')) return idx % 2 === 0 ? 'Glycolysis: Net 2 ATP + 2 NADH from 1 Glucose' : 'TCA Cycle: Mitochondrial matrix oxidation';
      if (chLower.includes('human') || chLower.includes('physio')) return idx % 2 === 0 ? 'Cardiac Output = Stroke Volume × Heart Rate ≈ 5 L/min' : 'GFR ≈ 125 mL/min (180 L/day)';
      return idx % 2 === 0 ? 'NCERT Core Theorem: Structure-function unity' : 'Key Biological Classification: Domain → Kingdom → Phylum';
    }

    // Physics
    if (chLower.includes('electrostat') || chLower.includes('potential')) return idx % 2 === 0 ? 'F = (1/4πε₀) · (q₁q₂ / r²),  V = (1/4πε₀)(q/r)' : 'C = ε₀A / d,  U = ½ C V² = Q² / (2C)';
    if (chLower.includes('current')) return idx % 2 === 0 ? 'V = I R,  P = I²R = V²/R,  R = ρ L / A' : 'Wheatstone: P/Q = R/S (balanced), Kirchhoff: ∑I = 0';
    if (chLower.includes('magnet')) return idx % 2 === 0 ? 'F = q(v × B) + qE (Lorentz),  r = mv / (qB)' : 'Biot-Savart: dB = (μ₀/4π) · (I dl × r̂) / r²';
    if (chLower.includes('optic')) return idx % 2 === 0 ? '1/f = 1/v - 1/u (Lens),  1/f = (μ-1)(1/R₁ - 1/R₂)' : 'Snell Law: μ₁ sin i = μ₂ sin r,  β = λ D / d';
    if (chLower.includes('modern') || chLower.includes('atom') || chLower.includes('photo')) return idx % 2 === 0 ? 'E = hν = hc/λ,  K_max = hν - Φ' : 'λ_deBroglie = h / p = h / √(2mE)';
    if (chLower.includes('rotat')) return idx % 2 === 0 ? 'τ = I α,  L = I ω,  K_rot = ½ I ω²' : 'Parallel Axis: I = I_cm + Md²';
    if (chLower.includes('gravit')) return idx % 2 === 0 ? 'F = G m₁m₂ / r²,  g = GM / R²' : 'v_escape = √(2GM / R),  v_orbital = √(GM / r)';
    if (chLower.includes('thermo')) return idx % 2 === 0 ? 'ΔQ = ΔU + ΔW,  ΔW = P ΔV' : 'Carnot Efficiency: η = 1 - T_c / T_h';

    return idx % 2 === 0 ? 'v = u + at,  s = ut + ½at²,  v² = u² + 2as' : 'F = m a,  p = m v,  Work = F · d cos θ';
  };

  const subtopicMap: Record<string, string[]> = {
    '1D Rectilinear Motion': ['Distance & Displacement', 'Average Speed & Velocity', 'Uniform Acceleration Equations', 'Free Fall under Gravity'],
    'Velocity & Acceleration Graphs': ['x-t Graph Slopes & Tangents', 'v-t Graph Area (Displacement)', 'a-t Graph Integrals', 'Curvature & Inflection'],
    '2D Projectile Motion': ['Ground-to-Ground Projectile', 'Horizontal Projection from Height', 'Inclined Plane Trajectory', 'Complementary Angle Symmetry'],
    'Relative Motion & Frame Analysis': ['1D Relative Velocity', 'Rain-Umbrella Vector Triangles', 'River-Boat Crossing Minimal Time', 'Wind-Airplane Drift']
  };

  const topicNodes: MindMapNode[] = effectiveTopics.map((topName, tIdx) => {
    const topMistakes = mistakes.filter(m => m.topic.toLowerCase().includes(topName.toLowerCase())).length;
    const topMastery = Math.max(35, Math.min(95, 80 - topMistakes * 15 + (tIdx % 2 === 0 ? 8 : -10)));
    const status: MindMapNode['status'] = topMastery >= 75 ? 'Mastered' : topMastery >= 50 ? 'Learning' : topMastery >= 35 ? 'Weak' : 'Not Started';

    const subList = subtopicMap[topName] || [
      `${topName} Fundamentals`,
      `${topName} Problem Solving`,
      `${topName} Advanced Applications`
    ];

    const subNodes: MindMapNode[] = subList.map((subName, sIdx) => {
      const subMastery = Math.max(30, Math.min(96, topMastery + (sIdx % 2 === 0 ? 5 : -7)));
      const subStatus: MindMapNode['status'] = subMastery >= 75 ? 'Mastered' : subMastery >= 50 ? 'Learning' : 'Weak';
      return {
        id: `node-${tIdx}-${sIdx}`,
        name: subName,
        type: 'subtopic',
        mastery: subMastery,
        questionsCount: 12 + sIdx * 4,
        accuracy: subMastery,
        mistakesCount: subStatus === 'Weak' ? 4 : subStatus === 'Learning' ? 2 : 0,
        hardQuestionsCount: 4 + sIdx,
        lastPracticed: sIdx === 0 ? 'Yesterday' : '3 days ago',
        nextRevision: subStatus === 'Weak' ? 'Today' : 'in 4 days',
        status: subStatus,
        conceptNotes: `Governing academic principles and key problem-solving heuristics for ${subName} in ${subject} (${chapterName}). Master core NCERT definitions and standard formula variants.`,
        keyFormula: getSubjectFormula(subject, chapterName, subName, sIdx)
      };
    });

    return {
      id: `top-${tIdx}`,
      name: topName,
      type: 'topic',
      mastery: topMastery,
      questionsCount: subNodes.reduce((acc, c) => acc + c.questionsCount, 0),
      accuracy: topMastery,
      mistakesCount: topMistakes,
      hardQuestionsCount: subNodes.reduce((acc, c) => acc + c.hardQuestionsCount, 0),
      lastPracticed: '2 days ago',
      nextRevision: topMastery < 60 ? 'Today' : 'in 5 days',
      status,
      conceptNotes: `Core conceptual framework of ${topName} for ${subject} examinations.`,
      children: subNodes
    };
  });

  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (st: MindMapNode['status']) => {
    switch (st) {
      case 'Mastered':
        return 'border-emerald-500/80 dark:border-emerald-500/60 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-emerald-500/20';
      case 'Learning':
        return 'border-blue-500/80 dark:border-blue-500/60 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 ring-blue-500/20';
      case 'Weak':
        return 'border-rose-500/80 dark:border-rose-500/60 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 ring-rose-500/20';
      default:
        return 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 ring-slate-300/20';
    }
  };

  const getStatusBadge = (st: MindMapNode['status']) => {
    switch (st) {
      case 'Mastered':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 px-2 py-0.5 rounded-full">🟢 Mastered</span>;
      case 'Learning':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-800/80 px-2 py-0.5 rounded-full">🟡 Learning</span>;
      case 'Weak':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800/80 px-2 py-0.5 rounded-full">🔴 Weak Concept</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full">⚪ Not Started</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Mind Map Toolbar */}
      <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Interactive Concept Mind Map
            </h3>
            <p className="text-[11px] text-slate-500">
              Click any node to inspect concept telemetry, formulas, and launch targeted practice.
            </p>
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-white transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 px-1.5">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(0.7, prev - 0.1))}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-white transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-white transition-all cursor-pointer"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 px-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Legend:</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &gt;75% Mastered
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 50-75% Practicing
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &lt;50% Weak Bottleneck
        </span>
      </div>

      {/* Mind Map Canvas */}
      <div className="bg-slate-900/5 dark:bg-[#070c12] rounded-3xl p-6 border border-slate-200 dark:border-slate-800/80 overflow-x-auto min-h-[460px] flex items-center justify-start sm:justify-center">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 flex flex-col md:flex-row items-center gap-8 py-4 px-2"
        >
          {/* Chapter Root Node */}
          <div
            onClick={() => setSelectedNode({
              id: 'root',
              name: chapterName,
              type: 'chapter',
              mastery: masteryData.overallMastery,
              questionsCount: masteryData.topics.reduce((acc, t) => acc + (t.questionsAttempted ?? 0), 0),
              accuracy: masteryData.accuracyMastery || 68,
              mistakesCount: mistakes.length,
              hardQuestionsCount: 14,
              lastPracticed: 'Yesterday',
              nextRevision: 'Today',
              status: masteryData.overallMastery >= 75 ? 'Mastered' : masteryData.overallMastery >= 50 ? 'Learning' : 'Weak',
              conceptNotes: `Comprehensive chapter encompassing ${effectiveTopics.length} primary topics in ${subject}.`
            })}
            className="cursor-pointer bg-purple-900 text-white rounded-3xl p-5 border-2 border-purple-500 shadow-xl max-w-xs text-center space-y-2 hover:scale-105 transition-all"
          >
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-purple-200">
              Chapter Root
            </span>
            <h2 className="text-xl font-black text-white">{chapterName}</h2>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-200">
              <span>{masteryData.overallMastery}% Mastery</span>
              <span>•</span>
              <span>{effectiveTopics.length} Topics</span>
            </div>
            <div className="w-full bg-purple-950 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${masteryData.overallMastery}%` }} />
            </div>
          </div>

          {/* Connecting Spine */}
          <div className="hidden md:block w-8 h-0.5 bg-slate-300 dark:bg-slate-700" />

          {/* Topics & Subtopics Hierarchy */}
          <div className="flex flex-col gap-4 max-w-xl w-full">
            {topicNodes.map(top => {
              const isExpanded = expandedTopics[top.id] ?? true;
              return (
                <div key={top.id} className="space-y-2">
                  {/* Topic Node Card */}
                  <div
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 ${getStatusColor(top.status)}`}
                  >
                    <div
                      onClick={() => setSelectedNode(top)}
                      className="flex items-center gap-3 flex-1 min-w-0"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 font-black text-xs text-slate-800 dark:text-slate-100">
                        {top.mastery}%
                      </div>
                      <div className="truncate">
                        <div className="font-black text-sm truncate">{top.name}</div>
                        <div className="text-[11px] opacity-75 font-medium">
                          {top.questionsCount} Qs • {top.accuracy}% Accuracy {top.mistakesCount > 0 ? `• ${top.mistakesCount} Mistakes` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {getStatusBadge(top.status)}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTopic(top.id);
                        }}
                        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Subtopics Children Nodes */}
                  {isExpanded && top.children && (
                    <div className="pl-6 border-l-2 border-dashed border-purple-300/80 dark:border-purple-700/60 space-y-2 pt-1 ml-4">
                      {top.children.map(sub => (
                        <div
                          key={sub.id}
                          onClick={() => setSelectedNode(sub)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer hover:scale-[1.01] transition-all flex items-center justify-between gap-2 shadow-2xs ${getStatusColor(sub.status)}`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                            <span className="font-bold truncate">{sub.name}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-[11px]">{sub.mastery}%</span>
                            {sub.mistakesCount > 0 && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-200/80 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800/60 font-bold text-[10px]">
                                {sub.mistakesCount} err
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Node Inspector Modal */}
      {selectedNode && (
        <Modal
          isOpen={Boolean(selectedNode)}
          onClose={() => setSelectedNode(null)}
          title={`${selectedNode.name}`}
          maxWidth="max-w-lg"
          footer={
            <div className="flex flex-wrap gap-2 justify-end w-full">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedNode(null);
                  navigate(`/practice?chapter=${encodeURIComponent(chapterName)}&topic=${encodeURIComponent(selectedNode.name)}`);
                }}
              >
                <Target className="w-4 h-4 mr-1 text-emerald-600" />
                <span>Practice Questions</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedNode(null);
                  navigate(`/weakness`);
                }}
                className="font-bold text-xs"
              >
                <Zap className="w-4 h-4 mr-1 text-amber-300" />
                <span>Fix Weakness</span>
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                {selectedNode.type.toUpperCase()} TELEMETRY
              </span>
              {getStatusBadge(selectedNode.status)}
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mastery</span>
                <span className="text-lg font-black text-purple-700 dark:text-purple-400">{selectedNode.mastery}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">{selectedNode.accuracy}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mistakes</span>
                <span className={`text-lg font-black ${selectedNode.mistakesCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {selectedNode.mistakesCount}
                </span>
              </div>
            </div>

            {/* Concept Summary */}
            {selectedNode.conceptNotes && (
              <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900/50 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Concept Summary</span>
                </div>
                <p className="text-xs text-purple-950 dark:text-purple-200 leading-relaxed">
                  {selectedNode.conceptNotes}
                </p>
              </div>
            )}

            {/* Key Formula */}
            {selectedNode.keyFormula && (
              <div className="p-3.5 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-slate-700 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block">
                  Governing Equation
                </span>
                <div className="font-mono text-xs text-amber-300 font-bold">
                  {selectedNode.keyFormula}
                </div>
              </div>
            )}

            {/* Action Recommendations */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Spaced Repetition: </span>
                <span>Scheduled for review {selectedNode.nextRevision}. Last practiced {selectedNode.lastPracticed}.</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
