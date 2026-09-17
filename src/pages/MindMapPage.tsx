import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  ArrowLeft,
  Filter,
  CheckCircle2,
  Atom,
  FlaskConical,
  Calculator,
  Dna
} from 'lucide-react';
import { Badge, Button } from '../components/common/UIComponents';
import { InteractiveMindMap } from '../components/common/InteractiveMindMap';
import { questionService } from '../services/questionService';
import { ecosystemService } from '../services/ecosystemService';
import { userService } from '../services/userService';
import { SubjectName } from '../types';

export const MindMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = userService.getProfile();

  const initialSubject = (searchParams.get('subject') as SubjectName) || 'Physics';
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>(initialSubject);

  const chapters = questionService.getChapters(selectedSubject, user.classLevel as any);
  const initialChapter = searchParams.get('chapter') || chapters[0] || 'Kinematics';
  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapter);

  const masteryData = ecosystemService.getChapterMastery(selectedChapter);

  const handleSubjectChange = (subj: SubjectName) => {
    setSelectedSubject(subj);
    const chs = questionService.getChapters(subj, user.classLevel as any);
    const newCh = chs[0] || 'Core Mechanics';
    setSelectedChapter(newCh);
    setSearchParams({ subject: subj, chapter: newCh });
  };

  const handleChapterChange = (ch: string) => {
    setSelectedChapter(ch);
    setSearchParams({ subject: selectedSubject, chapter: ch });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Visual Knowledge Graph</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Curriculum Mind Map
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Traverse interconnected chapter topics, subtopics, and governing formulas. Click any node to drill into telemetry or launch instant practice.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[170px]">
            <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider block">
              Chapter Mastery
            </span>
            <div className="text-3xl font-black text-white">{masteryData.overallMastery}%</div>
            <span className="text-[10px] text-emerald-300 font-semibold">
              {masteryData.overallMastery >= 75 ? '🟢 Exam-Ready' : '🟡 Developing'}
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/chapters/${encodeURIComponent(selectedChapter)}`)}
            className="bg-white text-purple-950 hover:bg-purple-50 font-black text-xs py-3 px-4 shadow-md"
          >
            <span>Open Chapter Hub</span>
            <ArrowRight className="w-4 h-4 ml-1 text-purple-800" />
          </Button>
        </div>
      </div>

      {/* Subject & Chapter Filter Ribbon */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as SubjectName[]).map(subj => {
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                type="button"
                onClick={() => handleSubjectChange(subj)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {subj === 'Physics' && <Atom className="w-3.5 h-3.5" />}
                {subj === 'Chemistry' && <FlaskConical className="w-3.5 h-3.5" />}
                {subj === 'Mathematics' && <Calculator className="w-3.5 h-3.5" />}
                {subj === 'Biology' && <Dna className="w-3.5 h-3.5" />}
                <span>{subj}</span>
              </button>
            );
          })}
        </div>

        {/* Chapter Select Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0">Chapter:</span>
          <select
            value={selectedChapter}
            onChange={(e) => handleChapterChange(e.target.value)}
            className="flex-1 md:flex-none text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 cursor-pointer"
          >
            {chapters.map(ch => (
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Mind Map */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <InteractiveMindMap
          chapterName={selectedChapter}
          subject={selectedSubject}
        />
      </div>
    </div>
  );
};
