import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, ArrowRight, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../types';

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Primary Selection States
  const [subject, setSubject] = useState<SubjectName>((searchParams.get('subject') as SubjectName) || 'Physics');
  const [chapter, setChapter] = useState<string>(searchParams.get('chapter') || 'All');
  const [topic, setTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(10);

  // Advanced Filters Collapsible
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [exam, setExam] = useState<ExamType | 'All'>((searchParams.get('exam') as ExamType) || 'All');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'All'>((searchParams.get('class') as ClassLevel) || 'All');

  const chapters = ['All', ...questionService.getChapters(subject, classLevel === 'All' ? undefined : classLevel)];
  const topics = chapter !== 'All' ? ['All', ...questionService.getTopics(chapter)] : ['All'];

  // Check available question pool
  const matchingPool = questionService.filterQuestions({
    exam: exam === 'All' ? undefined : exam,
    classLevel: classLevel === 'All' ? undefined : classLevel,
    subject,
    chapter: chapter === 'All' ? undefined : chapter,
    topic: topic === 'All' ? undefined : topic,
    difficulty: difficulty === 'All' ? undefined : difficulty,
  });

  const handleStartPractice = () => {
    const params = new URLSearchParams({
      exam,
      class: classLevel,
      subject,
      chapter,
      topic,
      difficulty,
      count: questionCount.toString(),
    });
    navigate(`/practice/session?${params.toString()}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 px-2 sm:px-4 animate-in fade-in duration-200">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Practice
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select your subject, chapter, and difficulty to begin.
        </p>
      </div>

      {/* 2. Step-by-Step Clean Selection (task5.md Section 137) */}
      <Card className="space-y-6 p-6 sm:p-7 border-slate-200 shadow-xs">
        {/* Step 1: Subject */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            1. Subject
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['Physics', 'Chemistry', 'Mathematics', 'Biology'] as SubjectName[]).map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSubject(sub);
                  setChapter('All');
                  setTopic('All');
                }}
                className={`py-3 px-3 rounded-xl font-bold text-xs border text-center transition-all ${
                  subject === sub
                    ? 'bg-brand-600 border-brand-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Chapter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              2. Chapter
            </label>
            {chapter !== 'All' && (
              <button
                type="button"
                onClick={() => navigate(`/chapters/${encodeURIComponent(chapter)}`)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-900"
              >
                View Chapter Overview →
              </button>
            )}
          </div>
          <select
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
              setTopic('All');
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Topic */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            3. Topic (Optional)
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={chapter === 'All'}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 disabled:opacity-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Step 4: Difficulty */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            4. Difficulty
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['All', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'All')[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  difficulty === d
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Question Count */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            5. Number of Questions
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[10, 20, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionCount(num)}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  questionCount === num
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Advanced Filters (task5.md Section 165) */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-slate-900 py-1"
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Advanced Filters</span>
            </span>
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Target Exam
                </label>
                <select
                  value={exam}
                  onChange={(e) => setExam(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold"
                >
                  <option value="All">All Exams</option>
                  <option value="JEE">JEE Main</option>
                  <option value="NEET">NEET UG</option>
                  <option value="CBSE">CBSE Board</option>
                  <option value="RBSE">RBSE Board</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Class Level
                </label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-semibold"
                >
                  <option value="All">All Classes</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* 3. Availability & Launch Action */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Available questions matching filters:{' '}
            <strong className="text-slate-900">{matchingPool.length}</strong>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleStartPractice}
            disabled={matchingPool.length === 0}
            className="w-full sm:w-auto font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 shadow-xs flex items-center justify-center gap-2"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Practice;
