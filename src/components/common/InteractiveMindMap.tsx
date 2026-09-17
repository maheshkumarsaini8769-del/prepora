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
        conceptNotes: `Governing physical relations and vector resolution for ${subName}. Ensure standard SI unit consistency before algebraic substitution.`,
        keyFormula: sIdx % 2 === 0 ? 'v = u + at,  s = ut + ½at²' : 'R = (u² sin 2θ) / g,  H = (u² sin²θ) / 2g'
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
        return 'border-emerald-500/80 bg-emerald-50/70 text-emerald-950 ring-emerald-500/20';
      case 'Learning':
        return 'border-blue-500/80 bg-blue-50/70 text-blue-950 ring-blue-500/20';
      case 'Weak':
        return 'border-rose-500/80 bg-rose-50/70 text-rose-950 ring-rose-500/20';
      default:
        return 'border-slate-300 bg-slate-50 text-slate-800 ring-slate-300/20';
    }
  };

  const getStatusBadge = (st: MindMapNode['status']) => {
    switch (st) {
      case 'Mastered':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">🟢 Mastered</span>;
      case 'Learning':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">🟡 Learning</span>;
      case 'Weak':
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">🔴 Weak Concept</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">⚪ Not Started</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Mind Map Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              Interactive Concept Mind Map
            </h3>
            <p className="text-[11px] text-slate-500">
              Click any node to inspect concept telemetry, formulas, and launch targeted practice.
            </p>
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(1.4, prev + 0.1))}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-white transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono font-bold text-slate-700 px-1.5">
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
      <div className="flex flex-wrap items-center gap-3 px-2 text-xs text-slate-600">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Legend:</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &gt;75% Mastered
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 50-75% Practicing
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &lt;50% Weak Bottleneck
        </span>
      </div>

      {/* Mind Map Canvas */}
      <div className="bg-slate-900/5 rounded-3xl p-6 border border-slate-200 overflow-x-auto min-h-[460px] flex items-center justify-start sm:justify-center">
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
          <div className="hidden md:block w-8 h-0.5 bg-slate-300" />

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
                      <div className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center shrink-0 font-black text-xs text-slate-800">
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
                        className="p-1 rounded-lg hover:bg-black/5 text-slate-600 transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Subtopics Children Nodes */}
                  {isExpanded && top.children && (
                    <div className="pl-6 border-l-2 border-dashed border-purple-300/80 space-y-2 pt-1 ml-4">
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
                              <span className="px-1.5 py-0.5 rounded bg-rose-200/80 text-rose-900 font-bold text-[10px]">
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
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mastery</span>
                <span className="text-lg font-black text-purple-700">{selectedNode.mastery}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-lg font-black text-emerald-700">{selectedNode.accuracy}%</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mistakes</span>
                <span className={`text-lg font-black ${selectedNode.mistakesCount > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                  {selectedNode.mistakesCount}
                </span>
              </div>
            </div>

            {/* Concept Summary */}
            {selectedNode.conceptNotes && (
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-purple-900 text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Concept Summary</span>
                </div>
                <p className="text-xs text-purple-950 leading-relaxed">
                  {selectedNode.conceptNotes}
                </p>
              </div>
            )}

            {/* Key Formula */}
            {selectedNode.keyFormula && (
              <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block">
                  Governing Equation
                </span>
                <div className="font-mono text-xs text-amber-300 font-bold">
                  {selectedNode.keyFormula}
                </div>
              </div>
            )}

            {/* Action Recommendations */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
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
