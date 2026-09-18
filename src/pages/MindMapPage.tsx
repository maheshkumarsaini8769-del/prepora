import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/common/UIComponents';
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
    <div className="max-w-7xl mx-auto space-y-4 pb-16 animate-in fade-in duration-200">
      {/* 1. Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Mind Map</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Interactive knowledge graph connecting concepts, formulas, and topics.
          </p>
        </div>

        {/* Compact Filters & Link */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value as SubjectName)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as SubjectName[]).map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => handleChapterChange(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 max-w-[200px] truncate focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/chapters/${encodeURIComponent(selectedChapter)}`)}
            className="text-xs font-semibold py-1.5 px-3 text-slate-700 border-slate-300 flex items-center gap-1"
          >
            <span>Chapter Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 2. Main Full-Screen Mind Map Canvas */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs">
        <InteractiveMindMap
          chapterName={selectedChapter}
          subject={selectedSubject}
        />
      </div>
    </div>
  );
};
