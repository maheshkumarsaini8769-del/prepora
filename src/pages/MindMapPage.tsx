import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Layers, Sparkles, Tv, BrainCircuit } from 'lucide-react';
import { Button } from '../components/common/UIComponents';
import { InteractiveMindMap } from '../components/common/InteractiveMindMap';
import { Visual3DMindMap } from '../components/common/Visual3DMindMap';
import { questionService } from '../services/questionService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { SubjectName, ClassLevel } from '../types';
import { getAllowedSubjectsForExam, sanitizeSubjectForExam } from '../utils/examUtils';
import { comprehensiveFormulaNotes } from '../data/comprehensiveFormulaNotes';
import { sortChapterNamesCanonical } from '../utils/chapterOrder';

export const MindMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();
  const allowedSubjects = getAllowedSubjectsForExam(user.targetExam);

  const rawSubject = (searchParams.get('subject') as SubjectName) || allowedSubjects[0];
  const initialSubject = sanitizeSubjectForExam(rawSubject, user.targetExam);
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'All'>('All');
  const [activeMode, setActiveMode] = useState<'3d' | 'curriculum'>('3d');

  // Load authoritative curriculum chapters for this subject & class level with formula notes
  const chapters = useMemo(() => {
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
    return list.length > 0 ? list : ['Units and Measurements', 'Motion in a Straight Line', 'Laws of Motion'];
  }, [selectedSubject, selectedClass]);

  const initialChapter = searchParams.get('chapter') || chapters[0] || 'Units and Measurements';
  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapter);

  // Auto-sync selectedChapter when chapters change
  useEffect(() => {
    if (chapters.length > 0 && !chapters.includes(selectedChapter)) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters, selectedChapter]);

  const handleSubjectChange = (subj: SubjectName) => {
    setSelectedSubject(subj);
    const formulaChapters = new Set<string>();
    comprehensiveFormulaNotes.forEach((item) => {
      if (item.subject.toLowerCase() === subj.toLowerCase()) {
        if (selectedClass === 'All' || String(item.classLevel) === String(selectedClass)) {
          formulaChapters.add(item.chapter);
        }
      }
    });
    const chList = sortChapterNamesCanonical(Array.from(formulaChapters), subj);
    const newCh = chList[0] || 'Units and Measurements';
    setSelectedChapter(newCh);
    setSearchParams({ subject: subj, chapter: newCh });
  };

  const handleChapterChange = (ch: string) => {
    setSelectedChapter(ch);
    setSearchParams({ subject: selectedSubject, chapter: ch });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-16 animate-in fade-in duration-200">
      {/* 1. Top Hero Header */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-7 rounded-3xl shadow-lg border border-purple-800/40 space-y-2 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-md mb-2">
              <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
              <span>Interactive Visual Concept Tree</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Concept Mind Map
            </h1>
            <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl">
              Visual knowledge graph connecting topics, subtopics, and mathematical equations. Click any node to inspect associated formulas, telemetry, and direct practice questions.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/chapters/${encodeURIComponent(selectedChapter)}?subject=${encodeURIComponent(selectedSubject)}`)}
              className="text-xs font-bold py-2 px-3 text-white border-white/30 hover:bg-white/10 flex items-center gap-1.5"
            >
              <span>Chapter Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Mode Selector: 3D Studio vs Curriculum Tree */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white dark:bg-[#0e1620] p-2 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveMode('3d')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeMode === '3d'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>3D Mind Map Studio (NEET & JEE)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
              HD 3D
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('curriculum')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'curriculum'
                ? 'bg-purple-600 text-white shadow-md font-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curriculum Topic Tree</span>
          </button>
        </div>

        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 hidden sm:block">
          {activeMode === '3d'
            ? '⭐ High-Resolution 3D Infographics with NCERT formulas & traps'
            : '🌿 Full curriculum syllabus hierarchy and mastery telemetry'}
        </div>
      </div>

      {/* 3. Conditional Content View */}
      {activeMode === '3d' ? (
        <div className="bg-white dark:bg-[#0c141e] rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <Visual3DMindMap
            initialSubject={selectedSubject}
            selectedChapter={selectedChapter}
            selectedClass={selectedClass}
            onSelectChapter={(ch, subj) => {
              setSelectedSubject(subj);
              setSelectedChapter(ch);
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Control Bar: Subject Tabs, Class Level & Chapter Selector */}
          <div className="bg-white dark:bg-[#0e1620] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Subject Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
              {allowedSubjects.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleSubjectChange(sub)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-purple-600 text-white shadow-xs font-black'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Class Filter & Chapter Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Class Selector */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
                {(['All', '11', '12'] as const).map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {cls === 'All' ? 'All Classes' : `Class ${cls}`}
                  </button>
                ))}
              </div>

              {/* Chapter Selector Dropdown */}
              <select
                value={selectedChapter}
                onChange={(e) => handleChapterChange(e.target.value)}
                className="text-xs font-bold text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 max-w-[240px] truncate"
              >
                {chapters.map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Main Mind Map Canvas */}
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <InteractiveMindMap
              chapterName={selectedChapter}
              subject={selectedSubject}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapPage;
