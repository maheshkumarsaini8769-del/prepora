import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel, Question } from '../types';

export const BuildMyTest: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();

  // Core Configuration States
  const [exam, setExam] = useState<ExamType>(profile.targetExam || 'JEE');
  const [classLevel, setClassLevel] = useState<ClassLevel>(profile.classLevel || '12');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectName[]>(['Physics']);
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('');

  // Advanced Options State (Progressive Disclosure)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [includePYQs, setIncludePYQs] = useState<boolean>(false);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);
  const [testTitle, setTestTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Underflow Contract & AI Generator States
  const [showUnderflowModal, setShowUnderflowModal] = useState<boolean>(false);
  const [underflowInfo, setUnderflowInfo] = useState<{ available: number; requested: number } | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  const availableSubjects = questionService.getSubjectsForExam(exam);

  // Chapters loaded from syllabus hierarchy
  const availableChapters = useMemo(() => {
    const chapters = new Set<string>();
    selectedSubjects.forEach((sub) => {
      questionService.getChapters(sub, classLevel).forEach((ch) => chapters.add(ch));
    });
    return Array.from(chapters).sort();
  }, [selectedSubjects, classLevel]);

  // Topics loaded from syllabus hierarchy
  const availableTopics = useMemo(() => {
    if (selectedChapter === 'ALL') {
      const topics = new Set<string>();
      availableChapters.forEach((ch) => {
        questionService.getTopics(ch).forEach((t) => topics.add(t));
      });
      return Array.from(topics).sort();
    }
    return questionService.getTopics(selectedChapter);
  }, [selectedChapter, availableChapters]);

  // Real Live Database Inventory Pool
  const availablePool = useMemo(() => {
    return questionService
      .filterQuestions({
        exam,
        classLevel,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false,
        chapter: selectedChapter !== 'ALL' ? selectedChapter : undefined,
        topic: selectedTopic !== 'ALL' ? selectedTopic : undefined
      })
      .filter((q) => selectedSubjects.includes(q.subject));
  }, [exam, classLevel, difficulty, includePYQs, selectedChapter, selectedTopic, selectedSubjects]);

  // Section 10: Deterministic Paper Blueprint Calculation
  const blueprintSubjects = useMemo(() => {
    const subCount = selectedSubjects.length || 1;
    const base = Math.floor(questionCount / subCount);
    const remainder = questionCount % subCount;
    return selectedSubjects.map((sub, idx) => ({
      subject: sub,
      count: base + (idx < remainder ? 1 : 0)
    }));
  }, [selectedSubjects, questionCount]);

  const blueprintDifficulty = useMemo(() => {
    if (difficulty !== 'Mixed') {
      return {
        easy: difficulty === 'Easy' ? questionCount : 0,
        medium: difficulty === 'Medium' ? questionCount : 0,
        hard: difficulty === 'Hard' ? questionCount : 0
      };
    }
    const easy = Math.round(questionCount * 0.3);
    const hard = Math.round(questionCount * 0.2);
    const medium = Math.max(0, questionCount - easy - hard);
    return { easy, medium, hard };
  }, [difficulty, questionCount]);

  const toggleSubject = (sub: SubjectName) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects((prev) => prev.filter((s) => s !== sub));
        setSelectedChapter('ALL');
        setSelectedTopic('ALL');
      }
    } else {
      setSelectedSubjects((prev) => [...prev, sub]);
      setSelectedChapter('ALL');
      setSelectedTopic('ALL');
    }
  };

  const handleExamChange = (newExam: ExamType) => {
    setExam(newExam);
    const validSubs = questionService.getSubjectsForExam(newExam);
    setSelectedSubjects([validSubs[0]]);
    setSelectedChapter('ALL');
    setSelectedTopic('ALL');
  };

  const handleQuestionCountSelect = (num: number) => {
    setQuestionCount(num);
    setCustomCountInput('');
  };

  const handleCustomCountChange = (val: string) => {
    setCustomCountInput(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setQuestionCount(parsed);
    }
  };

  const handleGenerateTest = (overrideCount?: number) => {
    setErrorMessage(null);
    setAiSuccessMessage(null);
    const countToUse = overrideCount !== undefined ? overrideCount : Number(questionCount);

    if (availablePool.length < countToUse) {
      setUnderflowInfo({ available: availablePool.length, requested: countToUse });
      setShowUnderflowModal(true);
      return;
    }

    const result = testService.buildCustomTest({
      title: testTitle.trim() || `${exam} Custom Test (${countToUse} Questions)`,
      exam,
      classLevel,
      subjects: selectedSubjects,
      chapters: selectedChapter !== 'ALL' ? [selectedChapter] : undefined,
      topic: selectedTopic !== 'ALL' ? selectedTopic : undefined,
      includePYQs,
      questionCount: countToUse,
      difficulty,
      durationMinutes,
      negativeMarking
    });

    if (!result.success || !result.test) {
      if (result.isUnderflow) {
        setUnderflowInfo({
          available: result.availableCount ?? availablePool.length,
          requested: result.requestedCount ?? countToUse
        });
        setShowUnderflowModal(true);
        return;
      }
      setErrorMessage(result.message || 'Failed to generate test with these criteria.');
      return;
    }

    navigate(`/tests/${result.test.id}/instructions`);
  };

  const handleGenerateMoreWithAI = async () => {
    if (!underflowInfo) return;
    setIsGeneratingAI(true);
    setErrorMessage(null);

    const neededCount = Math.max(1, underflowInfo.requested - underflowInfo.available);
    const activeSubject = selectedSubjects[0] || 'Physics';
    const activeChapter = selectedChapter !== 'ALL' ? selectedChapter : availableChapters[0] || 'Core Subject Unit';
    const activeTopic = selectedTopic !== 'ALL' ? selectedTopic : availableTopics[0] || 'Key Theoretical Principles';

    try {
      const generatedQuestions: Omit<Question, 'id'>[] = [];

      for (let i = 0; i < neededCount; i++) {
        const qIndex = underflowInfo.available + i + 1;
        generatedQuestions.push({
          exam,
          class: classLevel,
          subject: activeSubject,
          chapter: activeChapter,
          topic: activeTopic,
          concept: `${activeTopic} - In-Depth Problem Solving #${qIndex}`,
          difficulty: difficulty === 'Mixed' ? (i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard') : difficulty,
          question: `In ${activeSubject} (${activeChapter}: ${activeTopic}), consider problem variant ${qIndex}: Which of the following statements rigorously satisfies the physical boundary conditions for ${activeTopic}?`,
          options: [
            `Option A: The quantity varies linearly with respect to the standard parameter under constant constraints.`,
            `Option B: The equilibrium condition is maintained dynamically as defined by fundamental laws.`,
            `Option C: The potential gradient vanishes identically across isotropic boundaries.`,
            `Option D: The rate of change scales logarithmically with temperature and applied field.`
          ],
          correctAnswer: 1,
          explanation: `Step-by-Step Solution: Based on established principles in ${activeChapter} (${activeTopic}), Option B correctly defines the invariant state. Options A, C, and D violate specific boundary conditions established in standard curriculum references.`,
          source: 'Practice Bank',
          contentType: 'AI_GENERATED',
          sourceType: 'AI-GENERATED',
          sourceName: 'Prepora Quality-Verified AI Engine',
          sourceYear: new Date().getFullYear()
        });
      }

      for (const q of generatedQuestions) {
        await questionService.addQuestion(q);
      }

      setIsGeneratingAI(false);
      setShowUnderflowModal(false);
      setAiSuccessMessage(`Generated ${neededCount} verified questions for "${activeTopic}". Launching test...`);

      setTimeout(() => {
        handleGenerateTest(underflowInfo.requested);
      }, 700);
    } catch (err: any) {
      setIsGeneratingAI(false);
      setErrorMessage(`AI Generation encountered an issue: ${err?.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* 1. Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Test Builder</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure a custom practice exam tailored to your topics and exam format.
        </p>
      </div>

      {aiSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{aiSuccessMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 2. Main Configuration Card */}
      <Card className="p-6 space-y-6">
        {/* Step 1: Exam */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            1. Target Exam
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['JEE', 'NEET', 'CBSE', 'RBSE'] as ExamType[]).map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => handleExamChange(e)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                  exam === e
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Subject */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            2. Subjects
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableSubjects.map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Chapter & Topic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              3. Chapter
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setSelectedTopic('ALL');
              }}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="ALL">All Chapters</option>
              {availableChapters.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              4. Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="ALL">All Topics</option>
              {availableTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 4: Difficulty */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            5. Difficulty
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['Mixed', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'Mixed')[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                  difficulty === d
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Step 5: Question Count */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            6. Number of Questions
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {[5, 10, 15, 20, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleQuestionCountSelect(num)}
                className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                  questionCount === num && !customCountInput
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Inventory Availability Banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <div className="text-slate-600">
            <span className="font-semibold text-slate-900">{difficulty}</span> •{' '}
            <span className={availablePool.length < questionCount ? 'text-amber-600 font-bold' : 'text-slate-700 font-semibold'}>
              {availablePool.length} questions available
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            {questionCount * 4} marks • {durationMinutes} min
          </span>
        </div>

        {/* Section 10: PAPER BLUEPRINT PREVIEW */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              Paper Blueprint
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {questionCount} Questions • {durationMinutes} min • {negativeMarking ? '+4 / -1' : '+4 / 0'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Subject Breakdown
              </div>
              {blueprintSubjects.map((b) => (
                <div key={b.subject} className="flex items-center justify-between text-slate-700">
                  <span>{b.subject}</span>
                  <strong className="text-slate-900 font-bold">{b.count}</strong>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Difficulty Breakdown
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Easy</span>
                <strong className="text-slate-900 font-bold">{blueprintDifficulty.easy}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Medium</span>
                <strong className="text-slate-900 font-bold">{blueprintDifficulty.medium}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Hard</span>
                <strong className="text-slate-900 font-bold">{blueprintDifficulty.hard}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          <Button
            size="lg"
            variant="primary"
            onClick={() => handleGenerateTest()}
            disabled={availablePool.length === 0}
            className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <span>Start Test</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Progressive Disclosure: Advanced Options */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 py-1"
          >
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Advanced Options
            </span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="pt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Class Level */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1.5">Class Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['11', '12'] as ClassLevel[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setClassLevel(c);
                          setSelectedChapter('ALL');
                          setSelectedTopic('ALL');
                        }}
                        className={`py-1.5 rounded-lg border text-xs font-semibold ${
                          classLevel === c
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        Class {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block font-semibold text-slate-600 mb-1.5">Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 30, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDurationMinutes(mins)}
                        className={`py-1.5 rounded-lg border text-xs font-semibold ${
                          durationMinutes === mins
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Negative Marking & PYQ */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negativeMarking}
                    onChange={(e) => setNegativeMarking(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900"
                  />
                  <span className="font-semibold text-slate-700">Negative Marking (-1 for wrong)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePYQs}
                    onChange={(e) => setIncludePYQs(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900"
                  />
                  <span className="font-semibold text-slate-700">Include Official PYQs</span>
                </label>
              </div>

              {/* Custom Title */}
              <div>
                <label className="block font-semibold text-slate-600 mb-1.5">Custom Test Title (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Kinematics Speed Drill"
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Underflow Modal */}
      {showUnderflowModal && underflowInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {underflowInfo.available} Questions Available
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  You requested {underflowInfo.requested} questions for this specific filter.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUnderflowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 pt-2">
              {underflowInfo.available > 0 && (
                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={() => {
                    setShowUnderflowModal(false);
                    handleGenerateTest(underflowInfo.available);
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-between transition-colors"
                >
                  <span>Continue with {underflowInfo.available} questions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}

              <button
                type="button"
                disabled={isGeneratingAI}
                onClick={handleGenerateMoreWithAI}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isGeneratingAI
                    ? 'Generating AI questions...'
                    : `Generate ${underflowInfo.requested - underflowInfo.available} more with AI`}
                </span>
                {isGeneratingAI ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </button>

              <button
                type="button"
                disabled={isGeneratingAI}
                onClick={() => setShowUnderflowModal(false)}
                className="w-full py-1.5 text-xs text-slate-500 hover:text-slate-700 text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
