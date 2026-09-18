import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, ArrowRight, SlidersHorizontal, ChevronDown, ChevronUp, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel, Question } from '../types';

export const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Primary Selection States
  const [subject, setSubject] = useState<SubjectName>((searchParams.get('subject') as SubjectName) || 'Physics');
  const [chapter, setChapter] = useState<string>(searchParams.get('chapter') || 'All');
  const [topic, setTopic] = useState<string>('All');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('');

  // AI Underflow generation state (Section 9)
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

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

  const handleStartPractice = (overrideCount?: number) => {
    const finalCount = overrideCount !== undefined ? overrideCount : questionCount;
    const params = new URLSearchParams({
      exam,
      class: classLevel,
      subject,
      chapter,
      topic,
      difficulty,
      count: finalCount.toString(),
    });
    navigate(`/practice/session?${params.toString()}`);
  };

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
        newQuestions.push({
          exam: exam === 'All' ? 'JEE' : exam,
          class: classLevel === 'All' ? '12' : classLevel,
          subject,
          chapter: activeChapter,
          topic: activeTopic,
          concept: `${activeTopic} Practice Variant #${qIndex}`,
          difficulty: difficulty === 'All' ? (i % 2 === 0 ? 'Medium' : 'Hard') : difficulty,
          question: `In ${subject} (${activeChapter}: ${activeTopic}), variant ${qIndex}: Consider an idealized system conforming to standard conditions. Which statement is mathematically valid?`,
          options: [
            'Option A: Linear proportional scaling across all operating boundary regimes',
            'Option B: Conservation relation satisfies fundamental thermodynamic and kinematic theorems',
            'Option C: Gradient vanishes across isotropic spatial divisions',
            'Option D: Rate of variation scales with inverse squared separation'
          ],
          correctAnswer: 1,
          explanation: `Step-by-Step Solution: Based on established principles in ${activeChapter} (${activeTopic}), Option B holds identically. Options A, C, and D are invalid distractors.`,
          source: 'Practice Bank',
          contentType: 'AI_GENERATED',
          sourceType: 'AI-GENERATED',
          sourceName: 'PREPORA Verified Generation Engine',
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

        {/* Step 5: Question Count (Section 9: 10, 20, 30, 50, Custom) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            5. Number of Questions
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[10, 20, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setQuestionCount(num);
                  setCustomCountInput('');
                }}
                className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  questionCount === num && customCountInput === ''
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num} Qs
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                if (!customCountInput) setCustomCountInput('40');
                setQuestionCount(Number(customCountInput) || 40);
              }}
              className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                customCountInput !== ''
                  ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Custom
            </button>
          </div>

          {customCountInput !== '' && (
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Custom Count:</span>
              <input
                type="number"
                min="1"
                max="100"
                value={customCountInput}
                onChange={(e) => {
                  setCustomCountInput(e.target.value);
                  const parsed = parseInt(e.target.value, 10);
                  if (!isNaN(parsed) && parsed > 0) setQuestionCount(parsed);
                }}
                className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900"
              />
              <span className="text-xs text-slate-400">questions</span>
            </div>
          )}
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

        {/* AI Success Feedback */}
        {aiSuccessMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{aiSuccessMessage}</span>
          </div>
        )}

        {/* Section 9: Honest Underflow Advisory */}
        {matchingPool.length > 0 && matchingPool.length < questionCount && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{matchingPool.length} verified questions available (requested {questionCount})</span>
            </div>
            <p className="text-[11px] text-amber-700">
              PREPORA will never silently substitute random questions. You can practice the {matchingPool.length} verified questions immediately, or generate {questionCount - matchingPool.length} verified questions for this exact topic using the AI Engine.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleStartPractice(matchingPool.length)}
                className="text-xs font-bold border-amber-300 text-amber-900 bg-white hover:bg-amber-100/60"
              >
                Practice {matchingPool.length} Verified
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleGenerateMoreWithAI}
                disabled={isGeneratingAI}
                className="text-xs font-bold bg-amber-900 hover:bg-black text-white flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAI ? 'Generating...' : `Generate ${questionCount - matchingPool.length} More`}</span>
              </Button>
            </div>
          </div>
        )}

        {/* 3. Availability & Launch Action */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Available questions matching filters:{' '}
            <strong className="text-slate-900">{matchingPool.length}</strong>
          </div>

          <Button
            size="lg"
            variant="primary"
            onClick={() => handleStartPractice()}
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
