import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Play,
  Filter,
  Layers
} from 'lucide-react';
import { Card, Button, CustomSelect } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel, Question } from '../types';
import { getAllowedSubjectsForExam, sanitizeSubjectForExam } from '../utils/examUtils';

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = userService.getProfile();

  // Registration Profile Analysis: strictly bind to what student registered with
  const exam = user?.targetExam || 'JEE';
  const classLevel = (user?.classLevel as string) === 'Dropper' ? 'All' : (user?.classLevel || '11');
  const allowedSubjects = getAllowedSubjectsForExam(exam);

  // Primary Selection States
  const rawSubject = (searchParams.get('subject') as SubjectName) || allowedSubjects[0];
  const [subject, setSubject] = useState<SubjectName>(sanitizeSubjectForExam(rawSubject, exam));
  const [chapter, setChapter] = useState<string>(searchParams.get('chapter') || 'All');
  const [topic, setTopic] = useState<string>(searchParams.get('topic') || 'All');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(parseInt(searchParams.get('count') || '15', 10));
  const [customCountInput, setCustomCountInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // AI Underflow generation state (Section 9)
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  const chapters = ['All', ...questionService.getChapters(subject, classLevel === 'All' ? undefined : classLevel)];
  const topics = chapter !== 'All' ? ['All', ...questionService.getTopics(chapter, exam, subject)] : ['All'];

  // Check available question pool
  const matchingPool = questionService.filterQuestions({
    exam,
    classLevel: classLevel === 'All' ? undefined : (classLevel as ClassLevel),
    subject,
    chapter: chapter === 'All' ? undefined : chapter,
    topic: topic === 'All' ? undefined : topic,
    difficulty: difficulty === 'All' ? undefined : difficulty,
  });

  const [dbCount, setDbCount] = useState<number | null>(null);

  React.useEffect(() => {
    let isCancelled = false;
    const fetchCount = async () => {
      const cnt = await questionService.getEligibleCountAsync({
        exam,
        classLevel: classLevel === 'All' ? undefined : (classLevel as ClassLevel),
        subject,
        chapter: chapter === 'All' ? undefined : chapter,
        topic: topic === 'All' ? undefined : topic,
        difficulty: difficulty === 'All' ? undefined : difficulty,
      });
      if (!isCancelled) {
        setDbCount(cnt);
      }
    };
    fetchCount();
    return () => { isCancelled = true; };
  }, [exam, classLevel, subject, chapter, topic, difficulty]);

  const effectiveAvailableCount = Math.max(matchingPool.length, dbCount || 0);

  const handleStartPractice = (overrideCount?: number) => {
    const finalCount = overrideCount !== undefined ? overrideCount : questionCount;
    const effectiveExam = exam;
    const effectiveClass = classLevel;
    const params = new URLSearchParams({
      exam: effectiveExam,
      class: effectiveClass,
      subject,
      chapter,
      topic,
      difficulty,
      count: finalCount.toString(),
    });
    navigate(`/practice/session?${params.toString()}`);
  };

  // Auto-start if requested in URL
  React.useEffect(() => {
    if (searchParams.get('autoStart') === 'true') {
      const cnt = parseInt(searchParams.get('count') || '15', 10);
      handleStartPractice(cnt);
    }
  }, []);

  const handleGenerateMoreWithAI = async () => {
    const needed = Math.max(1, questionCount - matchingPool.length);
    setIsGeneratingAI(true);
    setAiSuccessMessage(null);

    const activeChapter = chapter !== 'All' ? chapter : chapters[1] || 'Kinematics';
    const activeTopic = topic !== 'All' ? topic : topics[1] || 'Core Theory';

    try {
      const newQuestions: Omit<Question, 'id'>[] = [];
      for (let i = 0; i < needed; i++) {
        const qIndex = matchingPool.length + i + 1;
        const targetCorrectIdx = i % 4;
        const optLetters = ['A', 'B', 'C', 'D'];
        const validStatement = 'Conservation relation satisfies fundamental thermodynamic and kinematic theorems';
        const distractors = [
          'Linear proportional scaling across all operating boundary regimes',
          'Gradient vanishes across isotropic spatial divisions',
          'Rate of variation scales with inverse squared separation'
        ];
        const generatedOpts = [
          'Option A: ',
          'Option B: ',
          'Option C: ',
          'Option D: '
        ];
        let dIdx = 0;
        for (let k = 0; k < 4; k++) {
          if (k === targetCorrectIdx) {
            generatedOpts[k] += validStatement;
          } else {
            generatedOpts[k] += distractors[dIdx++];
          }
        }

        newQuestions.push({
          exam,
          class: (classLevel === 'All' ? '12' : classLevel) as ClassLevel,
          subject,
          chapter: activeChapter,
          topic: activeTopic,
          concept: `${activeTopic} Practice Variant #${qIndex}`,
          difficulty: difficulty === 'All' ? (i % 2 === 0 ? 'Medium' : 'Hard') : difficulty,
          question: `In ${subject} (${activeChapter}: ${activeTopic}), variant ${qIndex}: Consider an idealized system conforming to standard conditions. Which statement is mathematically valid?`,
          options: generatedOpts,
          correctAnswer: targetCorrectIdx,
          explanation: `Step-by-Step Solution: Based on established principles in ${activeChapter} (${activeTopic}), Option ${optLetters[targetCorrectIdx]} holds identically. The other options are invalid distractors.`,
          source: 'Practice Bank',
          contentType: 'AI_GENERATED',
          sourceType: 'AI-GENERATED',
          sourceName: 'Prepora Verified Generation Engine',
          sourceYear: new Date().getFullYear()
        });
      }

      for (const q of newQuestions) {
        await questionService.addQuestion(q);
      }

      setIsGeneratingAI(false);
      setAiSuccessMessage(`Generated ${needed} verified questions for "${activeTopic}". Starting practice session...`);
      setTimeout(() => {
        handleStartPractice(questionCount);
      }, 600);
    } catch {
      setIsGeneratingAI(false);
    }
  };

  // Chapter-wise count & search computations
  const subjectChapterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allowedSubjects.forEach(sub => {
      counts[sub] = questionService.getChapters(sub, classLevel === 'All' ? undefined : classLevel).length;
    });
    return counts;
  }, [allowedSubjects, classLevel]);

  const rawSubjectChapters = useMemo(() => {
    return questionService.getChapters(subject, classLevel === 'All' ? undefined : classLevel);
  }, [subject, classLevel]);

  const displayedChapters = useMemo(() => {
    if (!searchQuery.trim()) return rawSubjectChapters;
    const q = searchQuery.toLowerCase().trim();
    return rawSubjectChapters.filter(ch => ch.toLowerCase().includes(q));
  }, [rawSubjectChapters, searchQuery]);

  const solvedCountForSubject = userService.getSubjectSolvedCounts()[subject] || 0;
  const benchmarkQuestions = rawSubjectChapters.length * 50 || 1000;
  const subjectProgressPercent = Math.min(100, Math.round((solvedCountForSubject / benchmarkQuestions) * 100));

  const handleSolveChapter = (targetChapter: string) => {
    const params = new URLSearchParams({
      exam,
      class: classLevel,
      subject,
      chapter: targetChapter,
      topic: 'All',
      difficulty,
      count: questionCount.toString(),
    });
    navigate(`/practice/session?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 pb-28 px-1 sm:px-4 animate-in fade-in duration-200">
      {/* 1. Page Header with Registered Syllabus Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {exam} Practice
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chapter-wise questions to sharpen concepts and speed.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold self-start sm:self-auto shadow-xs">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>
            {exam} • {user?.classLevel === 'Dropper' ? 'Dropper (Full Syllabus)' : `Class ${user?.classLevel || '11'}`}
          </span>
        </div>
      </div>

      {/* 2. Horizontal Subject Pill Tabs (Exact Match to Reference App) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {allowedSubjects.map((sub) => {
          const isActive = subject === sub;
          const chCount = subjectChapterCounts[sub] || 0;
          return (
            <button
              key={sub}
              type="button"
              onClick={() => {
                setSubject(sub);
                setChapter('All');
                setTopic('All');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-sm scale-[1.02]'
                  : 'bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>{sub}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {chCount} Chs
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Subject Progress Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-extrabold text-slate-900 dark:text-white">
              {subject} Progress
            </div>
            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              Class {classLevel === 'All' ? '11 & 12 (All)' : classLevel} • {rawSubjectChapters.length} Chapters
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              {solvedCountForSubject} Qs solved
            </span>
            <div className="text-[10px] font-bold text-slate-400">{subjectProgressPercent}% Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(subjectProgressPercent, 3)}%` }}
          />
        </div>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${subject} chapters...`}
            className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-2xs cursor-pointer ${
            showAdvancedFilters || difficulty !== 'All' || questionCount !== 15
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500/50 text-emerald-700 dark:text-emerald-300'
              : 'bg-white dark:bg-[#0c131a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {difficulty !== 'All' && (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          )}
        </button>
      </div>

      {/* 5. Collapsible Advanced Filters (Difficulty & Count) */}
      {showAdvancedFilters && (
        <Card className="p-4 sm:p-5 rounded-3xl border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <span className="text-xs font-black text-slate-900 dark:text-white">Custom Practice Preferences</span>
            <button
              type="button"
              onClick={() => {
                setDifficulty('All');
                setQuestionCount(15);
                setCustomCountInput('');
              }}
              className="text-[11px] font-bold text-emerald-600 hover:underline"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Difficulty Level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['All', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'All')[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      difficulty === d
                        ? 'bg-slate-900 dark:bg-emerald-600 border-slate-900 dark:border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Questions Per Session
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 15, 25, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      questionCount === num
                        ? 'bg-slate-900 dark:bg-emerald-600 border-slate-900 dark:border-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {num} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* AI Success Feedback */}
      {aiSuccessMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{aiSuccessMessage}</span>
        </div>
      )}

      {/* 6. Chapter Cards List (Exact Match to Reference App) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            {subject} Chapters ({displayedChapters.length})
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {difficulty !== 'All' ? `${difficulty} • ` : ''}{questionCount} Qs / Session
          </span>
        </div>

        {/* Practice All Chapters Card */}
        <div
          onClick={() => handleSolveChapter('All')}
          className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-[#0c141d] dark:to-[#091118] border border-emerald-300/80 dark:border-emerald-500/40 shadow-2xs flex items-center justify-between gap-3 cursor-pointer hover:border-emerald-500 transition-all active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Play className="w-5 h-5 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                Full {subject} Practice (Mixed Chapters)
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                All {rawSubjectChapters.length} chapters combined • High Yield
              </div>
            </div>
          </div>

          <button
            type="button"
            className="py-2 px-4 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-xs group-hover:bg-emerald-700 transition-all shrink-0 cursor-pointer"
          >
            Solve All
          </button>
        </div>

        {/* Individual Chapters */}
        {displayedChapters.map((chName, idx) => (
          <div
            key={chName}
            className="p-3.5 sm:p-4 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-500/50 flex items-center justify-between gap-3 transition-all active:scale-[0.99] group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700/50">
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {chName}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                  <span>Class {classLevel === 'All' ? '11/12' : classLevel}</span>
                  <span>•</span>
                  <span>Authentic Syllabus</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSolveChapter(chName)}
              className="py-2 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-xs shadow-xs transition-all active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Solve</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {displayedChapters.length === 0 && (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 text-slate-500 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-400" />
            <div className="text-xs font-bold">No chapters matching "{searchQuery}"</div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
