import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Atom,
  Globe,
  Box,
  Layers,
  Calculator,
  Target,
  Dna,
  FlaskConical,
  Compass,
  Microscope,
  Ruler,
  Lightbulb,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowRight,
  ShieldAlert,
  Flame,
  BookOpen,
  Info,
  CheckCircle2,
  X,
  ExternalLink,
  Table,
  HelpCircle,
  Download
} from 'lucide-react';
import { MathRenderer } from './MathRenderer';
import { Button } from './UIComponents';
import { SubjectName, ClassLevel } from '../../types';
import {
  HorizontalMindMapData,
  MindMapMajorBranch,
  MindMapSubtopicItem,
  MindMapDetailItem,
  MindMapFloatingCard,
  getCanonicalMindMap,
  resolveChapterIllustration
} from '../../data/canonicalMindMaps';
import { comprehensiveFormulaNotes } from '../../data/comprehensiveFormulaNotes';
import { sortChapterNamesCanonical } from '../../utils/chapterOrder';
import { questionService } from '../../services/questionService';

interface Horizontal3DMindMapProps {
  initialSubject?: SubjectName;
  selectedChapter?: string;
  selectedClass?: ClassLevel | 'All';
  onSelectChapter?: (chapter: string, subject: SubjectName) => void;
}

export const Horizontal3DMindMap: React.FC<Horizontal3DMindMapProps> = ({
  initialSubject = 'Physics',
  selectedChapter: propChapter,
  selectedClass: propClass = 'All',
  onSelectChapter
}) => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>(propClass);
  const [chapterSearch, setChapterSearch] = useState('');
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewFormat, setViewFormat] = useState<'tree' | 'poster'>('tree');
  const [isPosterZoomModalOpen, setIsPosterZoomModalOpen] = useState(false);
  const [collapsedBranches, setCollapsedBranches] = useState<Record<string, boolean>>({});
  const [inspectModalNode, setInspectModalNode] = useState<{
    title: string;
    branchNumber?: number;
    colorTheme?: string;
    description?: string;
    formula?: string;
    variables?: string;
    trap?: string;
    examTip?: string;
    items?: string[];
    table?: { col1: string; col2: string }[];
  } | null>(null);

  // Sync incoming props
  useEffect(() => {
    if (initialSubject) setSelectedSubject(initialSubject);
  }, [initialSubject]);

  useEffect(() => {
    if (propClass) setSelectedClass(propClass);
  }, [propClass]);

  // Compute available chapters for current subject and class
  const availableChapters = useMemo(() => {
    const formulaChapters = new Set<string>();
    comprehensiveFormulaNotes.forEach((item) => {
      if (item.subject.toLowerCase() === selectedSubject.toLowerCase()) {
        if (selectedClass === 'All' || String(item.classLevel) === String(selectedClass)) {
          formulaChapters.add(item.chapter);
        }
      }
    });

    const canonicalList = sortChapterNamesCanonical(Array.from(formulaChapters), selectedSubject);
    if (canonicalList.length > 0) return canonicalList;

    const list = questionService.getChapters(selectedSubject, selectedClass);
    return list.length > 0 ? list : ['Units and Measurements', 'Laws of Motion', 'Work, Energy and Power'];
  }, [selectedSubject, selectedClass]);

  const [activeChapter, setActiveChapter] = useState<string>(() => {
    return propChapter || availableChapters[0] || 'Units and Measurements';
  });

  useEffect(() => {
    if (propChapter && propChapter !== activeChapter) {
      setActiveChapter(propChapter);
    }
  }, [propChapter]);

  useEffect(() => {
    if (availableChapters.length > 0 && !availableChapters.includes(activeChapter)) {
      const nextCh = availableChapters[0];
      setActiveChapter(nextCh);
      if (onSelectChapter) onSelectChapter(nextCh, selectedSubject);
    }
  }, [availableChapters, selectedSubject]);

  // Retrieve or synthesize canonical horizontal mind map data
  const mapData: HorizontalMindMapData = useMemo(() => {
    const classToUse = selectedClass === 'All' ? '11' : selectedClass;
    return getCanonicalMindMap(activeChapter, selectedSubject, classToUse as ClassLevel);
  }, [activeChapter, selectedSubject, selectedClass]);

  const filteredChapterList = useMemo(() => {
    if (!chapterSearch.trim()) return availableChapters;
    const q = chapterSearch.toLowerCase().trim();
    return availableChapters.filter((ch) => ch.toLowerCase().includes(q));
  }, [availableChapters, chapterSearch]);

  const handleSubjectSelect = (sub: SubjectName) => {
    setSelectedSubject(sub);
    setChapterSearch('');
    const subFormulaChapters = new Set<string>();
    comprehensiveFormulaNotes.forEach((item) => {
      if (item.subject.toLowerCase() === sub.toLowerCase()) {
        if (selectedClass === 'All' || String(item.classLevel) === String(selectedClass)) {
          subFormulaChapters.add(item.chapter);
        }
      }
    });
    const chList = sortChapterNamesCanonical(Array.from(subFormulaChapters), sub);
    const nextCh = chList[0] || 'Units and Measurements';
    setActiveChapter(nextCh);
    if (onSelectChapter) {
      onSelectChapter(nextCh, sub);
    }
  };

  const handleChapterSelect = (ch: string) => {
    setActiveChapter(ch);
    setIsChapterDropdownOpen(false);
    if (onSelectChapter) {
      onSelectChapter(ch, selectedSubject);
    }
  };

  const toggleBranch = (id: string) => {
    setCollapsedBranches((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => setCollapsedBranches({});
  const collapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    mapData.branches.forEach((b) => {
      allCollapsed[b.id] = true;
    });
    setCollapsedBranches(allCollapsed);
  };

  // Color theme palettes matching the reference image exactly
  const getBranchThemeStyles = (theme: MindMapMajorBranch['colorTheme']) => {
    switch (theme) {
      case 'blue':
        return {
          stroke: '#38bdf8',
          badgeBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
          badgeRing: 'ring-blue-400/40',
          cardBg: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700',
          cardBorder: 'border-blue-400/40',
          subtopicBorder: 'border-blue-400/30 bg-blue-950/40 text-blue-100',
          bulletColor: 'text-blue-400',
          glowShadow: 'shadow-blue-500/20'
        };
      case 'orange':
        return {
          stroke: '#fb923c',
          badgeBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
          badgeRing: 'ring-orange-400/40',
          cardBg: 'bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700',
          cardBorder: 'border-orange-400/40',
          subtopicBorder: 'border-orange-400/30 bg-orange-950/40 text-orange-100',
          bulletColor: 'text-orange-400',
          glowShadow: 'shadow-orange-500/20'
        };
      case 'green':
        return {
          stroke: '#34d399',
          badgeBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
          badgeRing: 'ring-emerald-400/40',
          cardBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700',
          cardBorder: 'border-emerald-400/40',
          subtopicBorder: 'border-emerald-400/30 bg-emerald-950/40 text-emerald-100',
          bulletColor: 'text-emerald-400',
          glowShadow: 'shadow-emerald-500/20'
        };
      case 'purple':
        return {
          stroke: '#c084fc',
          badgeBg: 'bg-gradient-to-br from-purple-500 to-violet-600',
          badgeRing: 'ring-purple-400/40',
          cardBg: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700',
          cardBorder: 'border-purple-400/40',
          subtopicBorder: 'border-purple-400/30 bg-purple-950/40 text-purple-100',
          bulletColor: 'text-purple-400',
          glowShadow: 'shadow-purple-500/20'
        };
      case 'red':
        return {
          stroke: '#f87171',
          badgeBg: 'bg-gradient-to-br from-rose-500 to-red-600',
          badgeRing: 'ring-rose-400/40',
          cardBg: 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700',
          cardBorder: 'border-rose-400/40',
          subtopicBorder: 'border-rose-400/30 bg-rose-950/40 text-rose-100',
          bulletColor: 'text-rose-400',
          glowShadow: 'shadow-rose-500/20'
        };
      case 'teal':
      default:
        return {
          stroke: '#2dd4bf',
          badgeBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
          badgeRing: 'ring-teal-400/40',
          cardBg: 'bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700',
          cardBorder: 'border-teal-400/40',
          subtopicBorder: 'border-teal-400/30 bg-teal-950/40 text-teal-100',
          bulletColor: 'text-teal-400',
          glowShadow: 'shadow-teal-500/20'
        };
    }
  };

  const getBranchIcon = (iconType: MindMapMajorBranch['iconType']) => {
    switch (iconType) {
      case 'cube':
        return <Box className="w-5 h-5 text-white drop-shadow" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-white drop-shadow" />;
      case 'atom':
        return <Atom className="w-5 h-5 text-white drop-shadow" />;
      case 'blocks':
        return <Layers className="w-5 h-5 text-white drop-shadow" />;
      case 'calculator':
        return <Calculator className="w-5 h-5 text-white drop-shadow" />;
      case 'target':
        return <Target className="w-5 h-5 text-white drop-shadow" />;
      case 'dna':
        return <Dna className="w-5 h-5 text-white drop-shadow" />;
      case 'flask':
        return <FlaskConical className="w-5 h-5 text-white drop-shadow" />;
      case 'microscope':
        return <Microscope className="w-5 h-5 text-white drop-shadow" />;
      default:
        return <Sparkles className="w-5 h-5 text-white drop-shadow" />;
    }
  };

  // Dynamic coordinates measurement for SVG branching curves
  const rootNodeRef = useRef<HTMLDivElement>(null);
  const branchRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const canvasRef = useRef<HTMLDivElement>(null);
  const [svgPaths, setSvgPaths] = useState<Array<{ id: string; d: string; color: string }>>([]);

  const updateConnectors = () => {
    if (!rootNodeRef.current || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const rootRect = rootNodeRef.current.getBoundingClientRect();

    // Source anchor: Right-center of the Root Node
    const startX = rootRect.right - canvasRect.left;
    const startY = rootRect.top + rootRect.height / 2 - canvasRect.top;

    const paths: Array<{ id: string; d: string; color: string }> = [];

    mapData.branches.forEach((branch) => {
      const branchEl = branchRefs.current[branch.id];
      if (branchEl) {
        const branchRect = branchEl.getBoundingClientRect();
        // Target anchor: Left-center of the Major Branch badge
        const endX = branchRect.left - canvasRect.left + 24; // center of circle
        const endY = branchRect.top + branchRect.height / 2 - canvasRect.top;

        const theme = getBranchThemeStyles(branch.colorTheme);

        // Smooth cubic bezier S-curve
        const dx = Math.max(40, (endX - startX) * 0.45);
        const pathData = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;
        paths.push({
          id: branch.id,
          d: pathData,
          color: theme.stroke
        });
      }
    });

    setSvgPaths(paths);
  };

  useEffect(() => {
    const timer = setTimeout(updateConnectors, 60);
    window.addEventListener('resize', updateConnectors);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateConnectors);
    };
  }, [mapData, zoomLevel, collapsedBranches]);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. Master Mind Map Toolbar (Subject, Class, Chapter Search, Zoom, Expand/Collapse) */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900/95 dark:bg-[#070d14] rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        {/* Subject Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['Physics', 'Chemistry', 'Biology', 'Mathematics'] as SubjectName[]).map((sub) => {
            const isSelected = sub.toLowerCase() === selectedSubject.toLowerCase();
            return (
              <button
                key={sub}
                type="button"
                onClick={() => handleSubjectSelect(sub)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40 border border-purple-400/50 scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span>{sub}</span>
              </button>
            );
          })}
        </div>

        {/* Class Filter & Chapter Selector & View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            {(['All', '11', '12'] as const).map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setSelectedClass(cls)}
                className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedClass === cls
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cls === 'All' ? 'All' : `C${cls}`}
              </button>
            ))}
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsChapterDropdownOpen(!isChapterDropdownOpen)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white shadow-sm transition max-w-[220px] sm:max-w-[260px] cursor-pointer"
            >
              <div className="flex items-center gap-1.5 truncate">
                <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="truncate">{activeChapter}</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                  isChapterDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isChapterDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 max-h-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 flex flex-col space-y-2 animate-in fade-in zoom-in-95">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={chapterSearch}
                    onChange={(e) => setChapterSearch(e.target.value)}
                    placeholder="Search chapter..."
                    className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto space-y-1 flex-1 max-h-60 pr-1">
                  {filteredChapterList.map((ch) => {
                    const isCur = ch === activeChapter;
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => handleChapterSelect(ch)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                          isCur
                            ? 'bg-purple-600 text-white'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{ch}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Expand / Collapse All */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-bold">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-0.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/70 transition cursor-pointer"
            >
              Expand
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-0.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/70 transition cursor-pointer"
            >
              Collapse
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(1.3, prev + 0.1))}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-slate-200 px-1">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(0.7, prev - 0.1))}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer"
              title="Reset 100%"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* View Format Switcher: Interactive Tree vs HD 3D Poster */}
      <div className="flex items-center justify-between flex-wrap gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-800/90 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setViewFormat('tree')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
              viewFormat === 'tree'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>🌿 Interactive Tree (Swipeable)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewFormat('poster')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition cursor-pointer ${
              viewFormat === 'poster'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
            <span>🖼️ 3D Infographic Poster (Mobile Fit)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-bold">
              HD Image
            </span>
          </button>
        </div>

        {mapData.rootIllustrationSrc && (
          <button
            type="button"
            onClick={() => setIsPosterZoomModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 cursor-pointer transition shadow-xs"
          >
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspect Fullscreen HD</span>
          </button>
        )}
      </div>

      {viewFormat === 'poster' ? (
        /* ========================================================================= */
        /* HD 3D INFOGRAPHIC POSTER VIEW (PERFECT FOR MOBILE AND DESKTOP)           */
        /* ========================================================================= */
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-[#060b16] rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden group">
            {/* Ambient glows */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {mapData.subject} • Class {mapData.classLevel}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {mapData.exam}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {mapData.chapterTitle} — High-Definition 3D Mind Map
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPosterZoomModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Tap to Zoom Fullscreen</span>
                </button>
                <a
                  href={mapData.rootIllustrationSrc || resolveChapterIllustration(mapData.chapterTitle, mapData.subject)}
                  download={`${mapData.chapterTitle.replace(/\s+/g, '_')}_mindmap.jpg`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Poster Image Container - perfectly responsive on mobile screens! */}
            <div
              onClick={() => setIsPosterZoomModalOpen(true)}
              className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 cursor-zoom-in group/img shadow-2xl"
            >
              <img
                src={mapData.rootIllustrationSrc || resolveChapterIllustration(mapData.chapterTitle, mapData.subject)}
                alt={mapData.chapterTitle}
                className="w-full h-auto max-h-[78vh] object-contain mx-auto transform group-hover/img:scale-[1.01] transition-transform duration-300 select-none"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white drop-shadow-sm">
                    Tap to inspect full-screen high definition details (Zoom & Pan)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-purple-200 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                  HD 3D Infographic
                </span>
              </div>
            </div>
          </div>

          {/* Quick Chapter Summary & Practice Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                Chapter Core Overview
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{mapData.summary}</p>
            </div>
            <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-800/40 flex items-center justify-between gap-4">
              <div className="text-xs text-purple-200">
                <span className="font-black text-white text-sm">Ready to practice?</span>
                <p className="text-[11px] text-slate-300">
                  Solve real NEET & JEE questions from {mapData.chapterTitle}.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  navigate(
                    `/practice?subject=${encodeURIComponent(
                      selectedSubject
                    )}&chapter=${encodeURIComponent(activeChapter)}`
                  )
                }
                className="text-xs font-bold px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shrink-0"
              >
                <span>Practice Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* INTERACTIVE HORIZONTAL SCROLL CANVAS                                     */
        /* ========================================================================= */
        <div className="space-y-4">
          {/* Mobile Swipe Guidance Hint */}
          <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800/80 sm:hidden">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <span>👉 Swipe horizontally</span>
            </div>
            {mapData.rootIllustrationSrc && (
              <button
                type="button"
                onClick={() => setViewFormat('poster')}
                className="text-[11px] font-bold text-sky-300 underline cursor-pointer"
              >
                🖼️ View 3D Poster Image
              </button>
            )}
          </div>

          {/* Prominent Mobile 3D Infographic Card (Guarantees image is prominently visible on phone screens!) */}
          {mapData.rootIllustrationSrc && (
            <div className="sm:hidden bg-[#060b16] rounded-2xl p-3 border border-indigo-500/40 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                  <span>🖼️</span> 3D Mind Map Infographic
                </span>
                <button
                  type="button"
                  onClick={() => setIsPosterZoomModalOpen(true)}
                  className="text-[10px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30"
                >
                  <ZoomIn className="w-3 h-3" /> Fullscreen HD
                </button>
              </div>

              <div
                onClick={() => setIsPosterZoomModalOpen(true)}
                className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-zoom-in group shadow-inner"
              >
                <img
                  src={mapData.rootIllustrationSrc}
                  alt={mapData.chapterTitle}
                  className="w-full h-44 object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-[11px] text-white">
                  <span className="font-semibold text-amber-300 flex items-center gap-1">
                    <ZoomIn className="w-3 h-3" /> Tap to zoom & pan HD image
                  </span>
                  <span className="text-[9px] font-mono text-purple-200 bg-black/70 px-1.5 py-0.5 rounded border border-white/10">
                    HD 3D Map
                  </span>
                </div>
              </div>
            </div>
          )}

          <div
            className="mindmap-viewport w-full overflow-x-auto overflow-y-visible rounded-3xl border border-slate-800/90 shadow-2xl relative select-none pb-4"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x pan-y'
            }}
          >
        <div
          ref={canvasRef}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left'
          }}
          className="mindmap-canvas min-w-[1360px] xl:min-w-[1480px] p-6 sm:p-8 bg-gradient-to-br from-[#060b16] via-[#091122] to-[#060b16] rounded-3xl relative text-slate-100 transition-transform duration-150"
        >
          {/* Subtle Canvas Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* SVG Overlay for Connecting Glowing Curved Branches */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <filter id="glow-branch" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {svgPaths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#glow-branch)"
                opacity="0.9"
              />
            ))}
          </svg>

          {/* MAIN HORIZONTAL FLEX CONTAINER: ROOT NODE ON LEFT, BRANCHES ON RIGHT */}
          <div className="relative z-10 flex items-center gap-14 sm:gap-20">
            {/* ================================================================= */}
            {/* COLUMN 1: CHAPTER ROOT NODE (LEFT SIDE)                          */}
            {/* ================================================================= */}
            <div
              ref={rootNodeRef}
              onClick={() => {
                setInspectModalNode({
                  title: mapData.chapterTitle,
                  description: mapData.summary,
                  items: [
                    `Subject: ${mapData.subject}`,
                    `Class Level: Class ${mapData.classLevel}`,
                    `Exam: ${mapData.exam}`,
                    `NCERT Syllabus 100% Verified`,
                    `${mapData.branches.length} Major Branches`
                  ]
                });
              }}
              className="w-72 sm:w-80 shrink-0 cursor-pointer rounded-3xl p-6 bg-gradient-to-b from-[#0c1833] via-[#0f1d3d] to-[#0a1428] border-2 border-indigo-500/50 shadow-2xl shadow-indigo-950/60 relative group hover:border-indigo-400 transition-all duration-300 transform hover:scale-[1.01]"
              style={{
                boxShadow: '0 20px 40px -15px rgba(30, 58, 138, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.15)'
              }}
            >
              {/* Scientific 3D Visual Illustration Header in Root Node */}
              {mapData.rootIllustrationSrc ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPosterZoomModalOpen(true);
                  }}
                  className="relative rounded-2xl overflow-hidden border border-indigo-400/40 bg-slate-950 cursor-pointer group/img shadow-md mb-4"
                >
                  <img
                    src={mapData.rootIllustrationSrc}
                    alt={mapData.chapterTitle}
                    className="w-full h-32 sm:h-36 object-cover object-top group-hover/img:scale-105 transition-transform duration-300 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end justify-between p-2 text-[10px] text-white">
                    <span className="font-bold flex items-center gap-1 text-amber-300">
                      <ZoomIn className="w-3.5 h-3.5" /> Tap for HD Poster
                    </span>
                    <span className="bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono border border-white/20">
                      HD 3D
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-indigo-950/90 p-4 border border-indigo-400/30 mb-4 shadow-inner text-center">
                  <div className="relative z-10 flex items-center justify-center py-2">
                    {mapData.subject === 'Physics' ? (
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                          <Ruler className="w-9 h-9 text-amber-200" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900/90 border border-amber-400/50">
                          <Box className="w-4 h-4 text-sky-300" />
                        </div>
                      </div>
                    ) : mapData.subject === 'Chemistry' ? (
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
                          <FlaskConical className="w-9 h-9 text-emerald-100" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900/90 border border-teal-400/50">
                          <Atom className="w-4 h-4 text-emerald-300" />
                        </div>
                      </div>
                    ) : mapData.subject === 'Biology' ? (
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-rose-900/50">
                          <Dna className="w-9 h-9 text-rose-100" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900/90 border border-rose-400/50">
                          <Microscope className="w-4 h-4 text-rose-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-purple-400 flex items-center justify-center text-white shadow-lg shadow-amber-900/50">
                          <Calculator className="w-9 h-9 text-amber-100" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900/90 border border-amber-400/50">
                          <Compass className="w-4 h-4 text-amber-300" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-wider text-indigo-300/90 mt-1">
                    Interactive Concept Root
                  </div>
                </div>
              )}

              {/* Chapter Name & Subject Hierarchy */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight leading-tight drop-shadow-md">
                  {mapData.chapterTitle}
                </h2>

                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-950/90 text-indigo-200 border border-indigo-700/60">
                    {mapData.subject} • Class {mapData.classLevel}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-900/40 border border-cyan-300/40">
                    {mapData.exam}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300/80 pt-2 leading-relaxed line-clamp-2">
                  {mapData.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-indigo-300 font-bold">
                <span>Click to inspect</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* ================================================================= */}
            {/* COLUMN 2+: MAJOR CONCEPT BRANCHES STACKED VERTICALLY             */}
            {/* ================================================================= */}
            <div className="flex-1 space-y-6 sm:space-y-8">
              {mapData.branches.map((branch) => {
                const theme = getBranchThemeStyles(branch.colorTheme);
                const isCollapsed = collapsedBranches[branch.id] ?? false;

                return (
                  <div
                    key={branch.id}
                    ref={(el) => {
                      branchRefs.current[branch.id] = el;
                    }}
                    className="relative flex items-center gap-4 sm:gap-6"
                  >
                    {/* MAJOR CONCEPT BADGE + CARD */}
                    <div
                      onClick={() => {
                        setInspectModalNode({
                          title: branch.title,
                          branchNumber: branch.branchNumber,
                          colorTheme: branch.colorTheme,
                          description: `Core NCERT syllabus branch for ${mapData.chapterTitle}.`,
                          items: branch.subtopics.map((s) => s.title)
                        });
                      }}
                      className={`relative flex items-center gap-2.5 px-4 py-3 rounded-2xl ${theme.cardBg} border ${theme.cardBorder} shadow-lg ${theme.glowShadow} cursor-pointer hover:scale-[1.015] transition-transform select-none shrink-0 min-w-[240px] sm:min-w-[270px] max-w-[290px]`}
                      style={{
                        boxShadow: '0 8px 24px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.25)'
                      }}
                    >
                      {/* Numbered Badge Circle */}
                      <div
                        className={`w-9 h-9 rounded-full ${theme.badgeBg} ring-2 ${theme.badgeRing} flex items-center justify-center font-black text-sm text-white shadow-md shrink-0`}
                      >
                        {branch.branchNumber}
                      </div>

                      {/* 3D Themed Icon Circle */}
                      <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                        {getBranchIcon(branch.iconType)}
                      </div>

                      {/* Branch Title */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h3 className="text-sm font-black text-white tracking-tight leading-snug">
                          {branch.title}
                        </h3>
                      </div>

                      {/* Expand / Collapse toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBranch(branch.id);
                        }}
                        className="w-6 h-6 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center text-white/90 transition cursor-pointer shrink-0"
                        title={isCollapsed ? 'Expand' : 'Collapse'}
                      >
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            !isCollapsed ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* HORIZONTAL CONNECTOR CONNECTOR LINES TO SUBTOPICS */}
                    {!isCollapsed && (
                      <div className="flex items-center gap-4 sm:gap-6 flex-1">
                        {/* SUBTOPICS COLUMN */}
                        <div className="flex flex-col gap-2.5 shrink-0 min-w-[190px] max-w-[240px]">
                          {branch.subtopics.map((sub) => (
                            <div
                              key={sub.id}
                              onClick={() => {
                                setInspectModalNode({
                                  title: sub.title,
                                  description: sub.details[0]?.description,
                                  formula: sub.details[0]?.formula,
                                  variables: sub.details[0]?.variables,
                                  trap: sub.details[0]?.trap,
                                  table: sub.details[0]?.table,
                                  items: sub.details[0]?.items
                                });
                              }}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${theme.subtopicBorder} shadow-sm backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors`}
                            >
                              <span className={`font-black text-xs ${theme.bulletColor}`}>▸</span>
                              <span className="text-xs font-bold text-white truncate">
                                {sub.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* DETAIL CARDS COLUMN (CRISP LIGHT-TONED HIGH-CONTRAST BOXES) */}
                        <div className="flex flex-col gap-2.5 flex-1 min-w-[280px]">
                          {branch.subtopics.map((sub) => (
                            <div key={`det-col-${sub.id}`} className="space-y-2">
                              {sub.details.map((det) => (
                                <div
                                  key={det.id}
                                  onClick={() => {
                                    setInspectModalNode({
                                      title: sub.title,
                                      description: det.description,
                                      formula: det.formula,
                                      variables: det.variables,
                                      trap: det.trap,
                                      table: det.table,
                                      items: det.items
                                    });
                                  }}
                                  className="p-3 rounded-2xl bg-white dark:bg-slate-100 text-slate-900 border border-slate-200 shadow-md hover:shadow-lg transition-all cursor-pointer space-y-1.5"
                                  style={{
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                  }}
                                >
                                  {det.description && (
                                    <div className="text-xs font-semibold text-slate-800 leading-snug">
                                      {det.description}
                                    </div>
                                  )}

                                  {det.formula && (
                                    <div className="py-1 px-2.5 rounded-lg bg-amber-50 border border-amber-200 text-slate-900 font-mono text-xs overflow-x-auto">
                                      <MathRenderer math={det.formula} />
                                    </div>
                                  )}

                                  {det.variables && (
                                    <div className="text-[11px] text-slate-600 italic">
                                      {det.variables}
                                    </div>
                                  )}

                                  {det.tags && det.tags.length > 0 && (
                                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                                      {det.tags.map((t, tIdx) => (
                                        <span
                                          key={tIdx}
                                          className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                                            t.color === 'pink'
                                              ? 'bg-pink-100 text-pink-700 border-pink-300'
                                              : t.color === 'teal'
                                              ? 'bg-teal-100 text-teal-800 border-teal-300'
                                              : t.color === 'green'
                                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                              : 'bg-blue-100 text-blue-800 border-blue-300'
                                          }`}
                                        >
                                          {t.text}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* 2-Column Table (e.g. SI Base Units) */}
                                  {det.table && det.table.length > 0 && (
                                    <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                                      {det.table.map((row, rIdx) => (
                                        <div
                                          key={rIdx}
                                          className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 border border-slate-200 font-semibold"
                                        >
                                          <span className="text-slate-700">{row.col1}</span>
                                          <span className="text-emerald-700 font-mono font-bold">
                                            {row.col2}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  {/* List of derived units or items */}
                                  {det.items && det.items.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] pt-1">
                                      {det.items.map((it, iIdx) => (
                                        <div
                                          key={iIdx}
                                          className="flex items-center gap-1.5 p-1 rounded-md bg-slate-50 text-slate-800 font-medium"
                                        >
                                          <span className="text-purple-600 font-bold">•</span>
                                          <span>{it}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}

                              {/* Inline Callout Box if present */}
                              {sub.callout && (
                                <div className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-slate-800 text-xs shadow-xs flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white">
                                      {sub.callout.title}
                                    </span>
                                    <span className="font-semibold text-slate-700">
                                      {Array.isArray(sub.callout.content)
                                        ? sub.callout.content.join(', ')
                                        : sub.callout.content}
                                    </span>
                                  </div>
                                  {sub.callout.icon && (
                                    <span className="text-sm shrink-0">{sub.callout.icon}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* COLUMN 5: FLOATING CALLOUT / ASIDE CARDS ON FAR RIGHT */}
                        {branch.floatingCards && branch.floatingCards.length > 0 && (
                          <div className="flex flex-col gap-2.5 shrink-0 w-64 sm:w-72">
                            {branch.floatingCards.map((fc) => (
                              <div
                                key={fc.id}
                                onClick={() => {
                                  setInspectModalNode({
                                    title: fc.title,
                                    description: fc.highlightText || fc.footerNote,
                                    items: fc.bullets
                                  });
                                }}
                                className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0e172a] to-[#131f38] border border-slate-700/80 shadow-lg space-y-2 cursor-pointer hover:border-slate-500 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1.5">
                                    {fc.badgeText && (
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                          fc.badgeColor === 'green'
                                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                            : fc.badgeColor === 'yellow'
                                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                            : fc.badgeColor === 'pink'
                                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                            : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                                        }`}
                                      >
                                        {fc.badgeText}
                                      </span>
                                    )}
                                    <h4 className="text-xs font-black text-white">{fc.title}</h4>
                                  </div>
                                  {fc.icon && <span className="text-base">{fc.icon}</span>}
                                </div>

                                {fc.highlightText && (
                                  <div className="text-xs font-black text-amber-300 bg-amber-950/40 p-2 rounded-xl border border-amber-500/30">
                                    {fc.highlightText}
                                  </div>
                                )}

                                {fc.bullets && fc.bullets.length > 0 && (
                                  <ul className="space-y-1 text-[11px] text-slate-300">
                                    {fc.bullets.map((b, bIdx) => (
                                      <li key={bIdx} className="flex items-start gap-1.5">
                                        <span className="text-emerald-400 font-bold shrink-0">•</span>
                                        <span>{b}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {fc.footerNote && (
                                  <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-800">
                                    {fc.footerNote}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )}

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE DEEP DIVE INSPECTION MODAL                                 */}
      {/* ========================================================================= */}
      {inspectModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 text-white">
            <button
              type="button"
              onClick={() => setInspectModalNode(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {selectedSubject} • Class {selectedClass}
              </span>
              <span className="text-xs text-slate-400">NCERT Syllabus</span>
            </div>

            <h3 className="text-xl font-black text-amber-300">{inspectModalNode.title}</h3>

            {inspectModalNode.description && (
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                {inspectModalNode.description}
              </p>
            )}

            {inspectModalNode.formula && (
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Governing Equation
                </div>
                <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/40 font-mono text-sm overflow-x-auto text-amber-100">
                  <MathRenderer math={inspectModalNode.formula} />
                </div>
              </div>
            )}

            {inspectModalNode.variables && (
              <div className="text-xs text-slate-400 italic">
                {inspectModalNode.variables}
              </div>
            )}

            {inspectModalNode.items && inspectModalNode.items.length > 0 && (
              <div className="space-y-1">
                <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  Key Points & Dimensions
                </div>
                <ul className="space-y-1 bg-slate-950/50 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
                  {inspectModalNode.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {inspectModalNode.table && inspectModalNode.table.length > 0 && (
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {inspectModalNode.table.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800"
                  >
                    <span className="text-slate-300">{row.col1}</span>
                    <span className="text-emerald-400 font-mono font-bold">{row.col2}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Direct Link to Chapter Practice Questions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInspectModalNode(null)}
                className="text-xs text-slate-300 border-slate-700"
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setInspectModalNode(null);
                  navigate(
                    `/practice?subject=${encodeURIComponent(
                      selectedSubject
                    )}&chapter=${encodeURIComponent(activeChapter)}`
                  );
                }}
                className="text-xs font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center gap-1.5"
              >
                <span>Practice Real Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Fullscreen HD Poster Lightbox Modal */}
      {isPosterZoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-6xl w-full max-h-[94vh] flex flex-col bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white">
                    {mapData.chapterTitle} — High-Definition 3D Mind Map
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    {mapData.subject} • Class {mapData.classLevel} • {mapData.exam}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mapData.rootIllustrationSrc || resolveChapterIllustration(mapData.chapterTitle, mapData.subject)}
                  download={`${mapData.chapterTitle.replace(/\s+/g, '_')}_mindmap.jpg`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsPosterZoomModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-slate-950">
              <img
                src={mapData.rootIllustrationSrc || resolveChapterIllustration(mapData.chapterTitle, mapData.subject)}
                alt={mapData.chapterTitle}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-800 select-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
