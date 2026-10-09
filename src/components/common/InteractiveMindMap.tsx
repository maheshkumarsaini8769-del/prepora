import React, { useState, useMemo } from 'react';
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
  Layers,
  RotateCcw,
  Zap,
  Play,
  Tv,
  GitBranch,
  ListTree,
  Box
} from 'lucide-react';
import { Button, Modal } from './UIComponents';
import { MathRenderer } from './MathRenderer';
import { Visual3DMindMap } from './Visual3DMindMap';
import { ecosystemService } from '../../services/ecosystemService';
import { questionService } from '../../services/questionService';
import { userService } from '../../services/userService';
import { comprehensiveFormulaNotes } from '../../data/comprehensiveFormulaNotes';
import { getFormulaItemsForChapter } from '../../utils/formulaKnowledgeBase';
import { SubjectName } from '../../types';

export interface MindMapNode {
  id: string;
  name: string;
  type: 'chapter' | 'topic' | 'subtopic' | 'formula';
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
  variables?: string;
  trap?: string;
  proTip?: string;
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
  const [viewStyle, setViewStyle] = useState<'graph' | 'tree' | '3d'>('graph');

  const masteryData = ecosystemService.getChapterMastery(chapterName);
  const mistakes = userService.getMistakes().filter(
    (m) => m.chapter.toLowerCase() === chapterName.toLowerCase()
  );

  // 1. Retrieve canonical and formula-rich data for this chapter using alias resolver
  const matchingFormulaItems = useMemo(() => {
    const list = getFormulaItemsForChapter(chapterName, subject);
    if (list.length > 0) return list;

    const qLower = chapterName.toLowerCase().trim();
    return comprehensiveFormulaNotes.filter((item) => {
      const itLower = item.chapter.toLowerCase().trim();
      return itLower === qLower || itLower.includes(qLower) || qLower.includes(itLower);
    });
  }, [chapterName, subject]);

  // 2. Build structured Mind Map Nodes
  const topicNodes: MindMapNode[] = useMemo(() => {
    if (matchingFormulaItems.length > 0) {
      return matchingFormulaItems.map((item, tIdx) => {
        const topMistakes = mistakes.filter((m) =>
          m.topic.toLowerCase().includes(item.topic.toLowerCase())
        ).length;
        const topMastery = Math.max(
          35,
          Math.min(95, 78 - topMistakes * 16 + (tIdx % 2 === 0 ? 8 : -8))
        );
        const status: MindMapNode['status'] =
          topMastery >= 75
            ? 'Mastered'
            : topMastery >= 50
            ? 'Learning'
            : 'Weak';

        // Child sub-nodes: formulas and concept points
        const childNodes: MindMapNode[] = item.formulas.map((f, fIdx) => {
          const fMastery = Math.max(30, Math.min(96, topMastery + (fIdx % 2 === 0 ? 6 : -6)));
          const fStatus: MindMapNode['status'] =
            fMastery >= 75 ? 'Mastered' : fMastery >= 50 ? 'Learning' : 'Weak';
          return {
            id: `sub-${tIdx}-${fIdx}`,
            name: f.name,
            type: 'formula',
            mastery: fMastery,
            questionsCount: 10 + fIdx * 3,
            accuracy: fMastery,
            mistakesCount: fStatus === 'Weak' ? 3 : fStatus === 'Learning' ? 1 : 0,
            hardQuestionsCount: 3 + fIdx,
            lastPracticed: fIdx === 0 ? 'Yesterday' : '3 days ago',
            nextRevision: fStatus === 'Weak' ? 'Today' : 'in 4 days',
            status: fStatus,
            conceptNotes: item.concept,
            keyFormula: f.formula,
            variables: f.variables,
            proTip: f.examTip,
            trap: f.trap
          };
        });

        // Add an additional concept node if available
        if (item.shortNotes && item.shortNotes.length > 0) {
          childNodes.unshift({
            id: `concept-${tIdx}`,
            name: `${item.topic} Fundamentals`,
            type: 'subtopic',
            mastery: Math.min(95, topMastery + 5),
            questionsCount: 8,
            accuracy: Math.min(95, topMastery + 5),
            mistakesCount: 0,
            hardQuestionsCount: 2,
            lastPracticed: '2 days ago',
            nextRevision: 'in 5 days',
            status: topMastery >= 70 ? 'Mastered' : 'Learning',
            conceptNotes: item.shortNotes[0]
          });
        }

        return {
          id: `top-${tIdx}`,
          name: item.topic,
          type: 'topic',
          mastery: topMastery,
          questionsCount: childNodes.reduce((acc, c) => acc + c.questionsCount, 0),
          accuracy: topMastery,
          mistakesCount: topMistakes,
          hardQuestionsCount: childNodes.reduce((acc, c) => acc + c.hardQuestionsCount, 0),
          lastPracticed: '2 days ago',
          nextRevision: topMastery < 60 ? 'Today' : 'in 5 days',
          status,
          conceptNotes: item.concept,
          children: childNodes
        };
      });
    }

    // Fallback: standard topics from questionService
    const fallbackTopics = questionService.getTopics(chapterName);
    const topicsToUse =
      fallbackTopics.length > 0
        ? fallbackTopics
        : ['Core Principles', 'Equations & Derivations', 'Applications & Traps', 'Advanced Numerical Analysis'];

    return topicsToUse.map((topName, tIdx) => {
      const topMistakes = mistakes.filter((m) =>
        m.topic.toLowerCase().includes(topName.toLowerCase())
      ).length;
      const topMastery = Math.max(35, Math.min(95, 75 - topMistakes * 14 + (tIdx % 2 === 0 ? 6 : -6)));
      const status: MindMapNode['status'] =
        topMastery >= 75 ? 'Mastered' : topMastery >= 50 ? 'Learning' : 'Weak';

      const subList = [
        `${topName} Core Theory`,
        `${topName} Key Formula & Substitution`,
        `${topName} Exam Applications`
      ];

      const children: MindMapNode[] = subList.map((subName, sIdx) => {
        const subMastery = Math.max(30, Math.min(96, topMastery + (sIdx % 2 === 0 ? 5 : -7)));
        return {
          id: `sub-${tIdx}-${sIdx}`,
          name: subName,
          type: 'subtopic',
          mastery: subMastery,
          questionsCount: 12 + sIdx * 3,
          accuracy: subMastery,
          mistakesCount: subMastery < 50 ? 3 : 0,
          hardQuestionsCount: 3 + sIdx,
          lastPracticed: sIdx === 0 ? 'Yesterday' : '4 days ago',
          nextRevision: subMastery < 60 ? 'Today' : 'in 4 days',
          status: subMastery >= 75 ? 'Mastered' : subMastery >= 50 ? 'Learning' : 'Weak',
          conceptNotes: `Conceptual principles for ${subName} in ${chapterName}.`
        };
      });

      return {
        id: `top-${tIdx}`,
        name: topName,
        type: 'topic',
        mastery: topMastery,
        questionsCount: children.reduce((acc, c) => acc + c.questionsCount, 0),
        accuracy: topMastery,
        mistakesCount: topMistakes,
        hardQuestionsCount: children.reduce((acc, c) => acc + c.hardQuestionsCount, 0),
        lastPracticed: '2 days ago',
        nextRevision: topMastery < 60 ? 'Today' : 'in 5 days',
        status,
        conceptNotes: `Framework covering ${topName} for ${chapterName}.`,
        children
      };
    });
  }, [matchingFormulaItems, chapterName, mistakes]);

  const toggleTopic = (id: string) => {
    setExpandedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    topicNodes.forEach((t) => {
      all[t.id] = true;
    });
    setExpandedTopics(all);
  };

  const collapseAll = () => {
    setExpandedTopics({});
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
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0">
            🟢 Mastered
          </span>
        );
      case 'Learning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-800/80 px-2 py-0.5 rounded-full shrink-0">
            🟡 Practicing
          </span>
        );
      case 'Weak':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800/80 px-2 py-0.5 rounded-full shrink-0">
            🔴 Weak Area
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-full shrink-0">
            ⚪ Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Mind Map Toolbar */}
      <div className="bg-white dark:bg-[#0c131a] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              {chapterName} — Interactive Mind Map
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {topicNodes.length} Topics • Click any node to open formulas, concepts & practice
            </p>
          </div>
        </div>

        {/* View Switcher, Expand/Collapse & Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewStyle('3d')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewStyle === '3d'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs font-black'
                  : 'text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3D Mind Map</span>
            </button>
            <button
              type="button"
              onClick={() => setViewStyle('graph')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                viewStyle === 'graph'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Tree View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewStyle('tree')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                viewStyle === 'tree'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <ListTree className="w-3.5 h-3.5" />
              <span>List Map</span>
            </button>
          </div>

          {/* Expand/Collapse All */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title="Expand All"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title="Collapse All"
            >
              Collapse
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(1.3, prev + 0.1))}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.1))}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition cursor-pointer"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {viewStyle === '3d' ? (
        <Visual3DMindMap initialSubject={subject} selectedChapter={chapterName} />
      ) : (
        <>
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
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &lt;50% Weak Area
            </span>
          </div>

          {/* Mind Map Canvas */}
          <div className="bg-slate-50 dark:bg-[#070c12] rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800/80 overflow-x-auto min-h-[460px]">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
              className="transition-transform duration-200 py-2 min-w-[340px]"
            >
          {viewStyle === 'graph' ? (
            /* Layout: Tree with Central Spine and Horizontal Connectors */
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
              {/* Chapter Root Node */}
              <div
                onClick={() =>
                  setSelectedNode({
                    id: 'root',
                    name: chapterName,
                    type: 'chapter',
                    mastery: masteryData.overallMastery,
                    questionsCount: masteryData.topics.reduce(
                      (acc, t) => acc + (t.questionsAttempted ?? 0),
                      0
                    ),
                    accuracy: masteryData.accuracyMastery || 68,
                    mistakesCount: mistakes.length,
                    hardQuestionsCount: 14,
                    lastPracticed: 'Yesterday',
                    nextRevision: 'Today',
                    status:
                      masteryData.overallMastery >= 75
                        ? 'Mastered'
                        : masteryData.overallMastery >= 50
                        ? 'Learning'
                        : 'Weak',
                    conceptNotes: `Full curriculum syllabus for ${chapterName} (${subject}).`
                  })
                }
                className="w-full lg:w-72 shrink-0 cursor-pointer bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-5 border-2 border-purple-500 shadow-xl space-y-2.5 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider text-purple-200">
                    Chapter Root
                  </span>
                  <span className="text-[11px] font-bold text-purple-300">{subject}</span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">{chapterName}</h2>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-200">
                  <span>{masteryData.overallMastery}% Mastery</span>
                  <span>•</span>
                  <span>{topicNodes.length} Topics</span>
                </div>
                <div className="w-full bg-purple-950/80 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${masteryData.overallMastery}%` }}
                  />
                </div>
              </div>

              {/* Topics Branch */}
              <div className="flex-1 w-full space-y-3">
                {topicNodes.map((top) => {
                  const isExpanded = expandedTopics[top.id] ?? true;
                  return (
                    <div
                      key={top.id}
                      className="rounded-2xl border-2 transition-all bg-white dark:bg-[#0c141d] shadow-2xs overflow-hidden"
                    >
                      {/* Topic Header Card */}
                      <div
                        className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${getStatusColor(
                          top.status
                        )}`}
                      >
                        <div
                          onClick={() => setSelectedNode(top)}
                          className="flex items-center gap-3 flex-1 min-w-0"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 font-black text-xs text-slate-800 dark:text-slate-100">
                            {top.mastery}%
                          </div>
                          <div className="truncate">
                            <div className="font-black text-xs sm:text-sm truncate">
                              {top.name}
                            </div>
                            <div className="text-[10px] opacity-75 font-medium flex items-center gap-2">
                              <span>{top.questionsCount} Qs</span>
                              <span>•</span>
                              <span>{top.accuracy}% Accuracy</span>
                              {top.mistakesCount > 0 && (
                                <span className="text-rose-600 font-bold">
                                  • {top.mistakesCount} Mistakes
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {getStatusBadge(top.status)}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTopic(top.id);
                            }}
                            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Sub-branches / Formula Cards with Tree Branch Line */}
                      {isExpanded && top.children && (
                        <div className="p-3 sm:p-4 space-y-2 bg-slate-50/60 dark:bg-slate-900/30 border-t border-slate-100 dark:border-slate-800 border-l-4 border-l-purple-500/50 pl-3 sm:pl-5">
                          {top.children.map((sub) => (
                            <div
                              key={sub.id}
                              onClick={() => setSelectedNode(sub)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer hover:border-purple-400 dark:hover:border-purple-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white dark:bg-[#0e1620] shadow-2xs ${getStatusColor(
                                sub.status
                              )}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                                <span className="font-bold truncate text-slate-900 dark:text-white">
                                  {sub.name}
                                </span>
                                {sub.type === 'formula' && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 shrink-0">
                                    Equation
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                                {sub.keyFormula && (
                                  <div className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-200 max-w-[200px] overflow-x-auto truncate">
                                    <MathRenderer content={`$${sub.keyFormula}$`} />
                                  </div>
                                )}
                                <span className="font-mono font-bold text-[11px] text-slate-700 dark:text-slate-200">
                                  {sub.mastery}%
                                </span>
                                {sub.mistakesCount > 0 && (
                                  <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-bold text-[10px]">
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
          ) : (
            /* Layout: Hierarchical Tree List Mode */
            <div className="space-y-3">
              {topicNodes.map((top) => {
                const isExpanded = expandedTopics[top.id] ?? true;
                return (
                  <div
                    key={top.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c141d] p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div
                        onClick={() => setSelectedNode(top)}
                        className="cursor-pointer min-w-0 flex-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {top.name}
                          </span>
                          <span className="text-xs font-bold text-purple-600">
                            {top.mastery}% Mastery
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {top.conceptNotes}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(top.status)}
                        <button
                          type="button"
                          onClick={() => toggleTopic(top.id)}
                          className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {isExpanded && top.children && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {top.children.map((sub) => (
                          <div
                            key={sub.id}
                            onClick={() => setSelectedNode(sub)}
                            className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-purple-400 bg-slate-50 dark:bg-slate-900/60 cursor-pointer space-y-1.5 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {sub.name}
                              </span>
                              <span className="font-mono text-[10px] font-bold text-purple-600">
                                {sub.mastery}%
                              </span>
                            </div>
                            {sub.keyFormula && (
                              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-300 truncate">
                                {sub.keyFormula}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )}

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
                  navigate(
                    `/practice?chapter=${encodeURIComponent(
                      chapterName
                    )}&topic=${encodeURIComponent(selectedNode.name)}`
                  );
                }}
                className="text-xs font-bold"
              >
                <Target className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span>Practice Questions</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedNode(null);
                  navigate(`/weakness`);
                }}
                className="font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-300" />
                <span>Fix Weakness</span>
              </Button>
            </div>
          }
        >
          <div className="space-y-4 py-1 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                {selectedNode.type.toUpperCase()} TELEMETRY
              </span>
              {getStatusBadge(selectedNode.status)}
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Mastery
                </span>
                <span className="text-lg font-black text-purple-700 dark:text-purple-400">
                  {selectedNode.mastery}%
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Accuracy
                </span>
                <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  {selectedNode.accuracy}%
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Mistakes
                </span>
                <span
                  className={`text-lg font-black ${
                    selectedNode.mistakesCount > 0
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
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

            {/* Key Formula with KaTeX MathRenderer */}
            {selectedNode.keyFormula && (
              <div className="p-3.5 rounded-2xl bg-slate-900 dark:bg-black border border-slate-800 dark:border-slate-700 text-white space-y-2 overflow-x-auto text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block text-left">
                  Governing Equation
                </span>
                <div className="text-amber-300 font-bold py-1">
                  <MathRenderer displayMode={true} content={`$$${selectedNode.keyFormula}$$`} />
                </div>
                {selectedNode.variables && (
                  <div className="text-[11px] text-slate-300 text-left pt-1 border-t border-slate-800">
                    <strong className="text-purple-300">Variables: </strong>
                    <span>{selectedNode.variables}</span>
                  </div>
                )}
              </div>
            )}

            {/* Pro Tip */}
            {selectedNode.proTip && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exam Shortcut: </span>
                  <span>{selectedNode.proTip}</span>
                </div>
              </div>
            )}

            {/* Trap Warning */}
            {selectedNode.trap && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Common Trap: </span>
                  <span>{selectedNode.trap}</span>
                </div>
              </div>
            )}

            {/* Spaced Review */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Spaced Repetition: </span>
                <span>
                  Scheduled for review {selectedNode.nextRevision}. Last practiced{' '}
                  {selectedNode.lastPracticed}.
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
