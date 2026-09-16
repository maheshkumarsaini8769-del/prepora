import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../types';

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const profile = userService.getProfile();

  const [exam, setExam] = useState<ExamType | 'All'>((searchParams.get('exam') as ExamType) || 'All');
  const [classLevel, setClassLevel] = useState<ClassLevel | 'All'>((searchParams.get('class') as ClassLevel) || 'All');
  const [subject, setSubject] = useState<SubjectName>((searchParams.get('subject') as SubjectName) || 'Physics');
  const [chapter, setChapter] = useState<string>(searchParams.get('chapter') || 'All');
  const [topic, setTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const availableSubjects = questionService.getSubjectsForExam(exam);
  const chapters = ['All', ...questionService.getChapters(subject, classLevel)];
  const topics = chapter !== 'All' ? ['All', ...questionService.getTopics(chapter)] : ['All'];

  // Check matching questions in pool
  const matchingPool = questionService.filterQuestions({
    exam,
    classLevel,
    subject,
    chapter: chapter === 'All' ? undefined : chapter,
    topic: topic === 'All' ? undefined : topic,
    difficulty: difficulty === 'All' ? undefined : difficulty,
  });

  const handleStartPractice = () => {
    // Navigate with query params to the PracticeSession screen
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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Learning Mode</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Practice Zone</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize your practice drill with immediate answer reveals, concepts, and shortcut tips.
        </p>
      </div>

      <Card className="space-y-6">
        {/* Step 1: Target Exam & Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Target Exam
            </label>
            <div className="flex flex-wrap gap-2">
              {(['All', 'JEE', 'NEET', 'RBSE', 'CBSE'] as (ExamType | 'All')[]).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setExam(e)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all ${
                    exam === e
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Class Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All', '11', '12'] as (ClassLevel | 'All')[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClassLevel(c)}
                  className={`py-2 px-2.5 rounded-xl font-bold text-xs border transition-all ${
                    classLevel === c
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {c === 'All' ? 'All Classes' : `Class ${c}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Subject Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            3. Choose Subject
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => {
                  setSubject(sub);
                  setChapter('All');
                  setTopic('All');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  subject === sub
                    ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-medium opacity-80">Subject</div>
                <div className="text-base font-bold mt-0.5">{sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Chapter & Topic Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                4. Chapter
              </label>
              {chapter !== 'All' && (
                <button
                  type="button"
                  onClick={() => navigate(`/chapters/${encodeURIComponent(chapter)}`)}
                  className="text-[11px] font-bold text-brand-600 hover:text-brand-700"
                >
                  View Chapter Page →
                </button>
              )}
            </div>
            <select
              value={chapter}
              onChange={(e) => {
                setChapter(e.target.value);
                setTopic('All');
              }}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {chapters.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              5. Specific Topic
            </label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={chapter === 'All'}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 4: Difficulty & Question Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              6. Difficulty Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['All', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'All')[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    difficulty === d
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              7. Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === num
                      ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {num} Qs
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Pool Summary & Launch Action */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Available questions in pool matching selection:{' '}
            <span className="font-bold text-slate-900">{matchingPool.length} questions</span>
            {questionService.getAllQuestions().length === 0 ? (
              <span className="text-amber-700 font-semibold block mt-1 bg-amber-50 p-2 rounded-lg border border-amber-200">
                📚 No questions in question bank yet. <a href="/admin/ai-factory" className="text-brand-700 underline font-bold">Upload a Chapter PDF in Admin Panel</a> to generate real questions from your material!
              </span>
            ) : matchingPool.length === 0 ? (
              <span className="text-rose-600 block mt-0.5">Try choosing "All" chapters/difficulties to broaden scope.</span>
            ) : null}
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={handleStartPractice}
            disabled={matchingPool.length === 0}
            className="w-full sm:w-auto font-bold"
          >
            START PRACTICE <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
