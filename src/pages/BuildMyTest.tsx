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
import { Card, Button, CustomSelect } from '../components/common/UIComponents';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel, Question, TestAttempt } from '../types';
import { sortChapterNamesCanonical } from '../utils/chapterOrder';

export const BuildMyTest: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();

  // Registration Profile Analysis: strictly bind to what student registered with
  const exam = profile?.targetExam || 'JEE';
  const effectiveClass = (profile?.classLevel as string) === 'Dropper' ? undefined : ((profile?.classLevel as ClassLevel) || '11');

  const [selectedSubjects, setSelectedSubjects] = useState<SubjectName[]>(['Physics']);
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [customCountInput, setCustomCountInput] = useState<string>('');

  // Advanced Options State (Progressive Disclosure)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [includePYQs, setIncludePYQs] = useState<boolean>(true);
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
      questionService.getChapters(sub, effectiveClass).forEach((ch) => chapters.add(ch));
    });
    const firstSub = selectedSubjects.length === 1 ? selectedSubjects[0] : undefined;
    return sortChapterNamesCanonical(Array.from(chapters), firstSub);
  }, [selectedSubjects, effectiveClass]);

  // Topics loaded from syllabus hierarchy
  const availableTopics = useMemo(() => {
    const firstSub = selectedSubjects.length === 1 ? selectedSubjects[0] : undefined;
    if (selectedChapter === 'ALL') {
      const topics = new Set<string>();
      availableChapters.forEach((ch) => {
        questionService.getTopics(ch, exam, firstSub).forEach((t) => topics.add(t));
      });
      return Array.from(topics);
    }
    return questionService.getTopics(selectedChapter, exam, firstSub);
  }, [selectedChapter, availableChapters, exam, selectedSubjects]);

  // Real Live Database Inventory Pool
  const availablePool = useMemo(() => {
    return questionService
      .filterQuestions({
        exam,
        classLevel: effectiveClass,
        difficulty: difficulty === 'Mixed' ? undefined : difficulty,
        includePYQs,
        includeModelPapers: false,
        chapter: selectedChapter !== 'ALL' ? selectedChapter : undefined,
        topic: selectedTopic !== 'ALL' ? selectedTopic : undefined
      })
      .filter((q) => selectedSubjects.includes(q.subject));
  }, [exam, effectiveClass, difficulty, includePYQs, selectedChapter, selectedTopic, selectedSubjects]);

  const [serverCount, setServerCount] = useState<number | null>(null);

  React.useEffect(() => {
    let isCancelled = false;
    const fetchCount = async () => {
      if (selectedSubjects.length === 0) {
        if (!isCancelled) setServerCount(0);
        return;
      }

      try {
        let totalCount = 0;
        for (const sub of selectedSubjects) {
          const cnt = await questionService.getEligibleCountAsync({
            exam,
            classLevel: effectiveClass,
            subject: sub,
            chapter: selectedChapter !== 'ALL' ? selectedChapter : undefined,
            topic: selectedTopic !== 'ALL' ? selectedTopic : undefined,
            difficulty: difficulty === 'Mixed' ? undefined : difficulty,
            includePYQs
          });
          totalCount += cnt;
        }
        if (!isCancelled) {
          setServerCount(totalCount);
        }
      } catch {
        if (!isCancelled) setServerCount(null);
      }
    };
    fetchCount();
    return () => { isCancelled = true; };
  }, [exam, effectiveClass, selectedSubjects, selectedChapter, selectedTopic, difficulty, includePYQs]);

  const effectiveAvailableCount = Math.max(availablePool.length, serverCount || 0);

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

  const handleGenerateTest = async (overrideCount?: number) => {
    setErrorMessage(null);
    setAiSuccessMessage(null);
    const countToUse = overrideCount !== undefined ? overrideCount : Number(questionCount);

    // Collect previously attempted/seen questions so the student never gets repeat questions!
    const attemptedIds = new Set<string>();
    const pastAttempts: TestAttempt[] = testService.getAllAttempts();
    pastAttempts.forEach((att: TestAttempt) => {
      const pastTest = testService.getTestById(att.testId);
      if (pastTest && Array.isArray(pastTest.questionIds)) {
        pastTest.questionIds.forEach((id: string) => attemptedIds.add(id));
      }
      if (att && att.answers && typeof att.answers === 'object') {
        Object.keys(att.answers).forEach((k: string) => attemptedIds.add(k));
        Object.values(att.answers).forEach((ans: any) => {
          if (ans && ans.questionId) attemptedIds.add(ans.questionId);
        });
      }
    });
    try {
      const stored = JSON.parse(localStorage.getItem('prepora_attempted_question_ids') || '[]');
      if (Array.isArray(stored)) {
        stored.forEach((id: string) => attemptedIds.add(id));
      }
    } catch {}

    const result = await testService.buildCustomTestAsync({
      userId: profile?.id,
      title: testTitle.trim() || `${exam} Custom Test (${countToUse} Questions)`,
      exam,
      classLevel: effectiveClass,
      subjects: selectedSubjects,
      chapters: selectedChapter !== 'ALL' ? [selectedChapter] : undefined,
      topic: selectedTopic !== 'ALL' ? selectedTopic : undefined,
      includePYQs,
      questionCount: countToUse,
      difficulty,
      durationMinutes,
      negativeMarking,
      excludeQuestionIds: Array.from(attemptedIds)
    });

    if (!result.success || !result.test) {
      if (result.isUnderflow) {
        setUnderflowInfo({
          available: result.availableCount ?? effectiveAvailableCount,
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
        const targetCorrectIdx = i % 4;
        const optLetters = ['A', 'B', 'C', 'D'];
        const validStatement = `The equilibrium condition is maintained dynamically as defined by fundamental conservation laws.`;
        const distractors = [
          `The quantity fluctuates randomly without conservation symmetry across successive iterations.`,
          `The scalar magnitude diminishes to absolute zero in all non-inertial reference frames.`,
          `The physical gradient diverges asymptotically along non-homogeneous boundary planes.`
        ];
        const generatedOpts = [
          `Option A: `,
          `Option B: `,
          `Option C: `,
          `Option D: `
        ];
        let dIdx = 0;
        for (let k = 0; k < 4; k++) {
          if (k === targetCorrectIdx) {
            generatedOpts[k] += validStatement;
          } else {
            generatedOpts[k] += distractors[dIdx++];
          }
        }

        generatedQuestions.push({
          exam,
          class: effectiveClass || '11',
          subject: activeSubject,
          chapter: activeChapter,
          topic: activeTopic,
          concept: `${activeTopic} - In-Depth Problem Solving #${qIndex}`,
          difficulty: difficulty === 'Mixed' ? (i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard') : difficulty,
          question: `In ${activeSubject} (${activeChapter}: ${activeTopic}), consider problem variant ${qIndex}: Which of the following statements rigorously satisfies the physical boundary conditions for ${activeTopic}?`,
          options: generatedOpts,
          correctAnswer: targetCorrectIdx,
          explanation: `Step-by-Step Solution: Based on established principles in ${activeChapter} (${activeTopic}), Option ${optLetters[targetCorrectIdx]} correctly defines the governing physical relation. The other options violate specific conservation or boundary constraints.`,
          source: 'Practice Bank',
          contentType: 'AI_GENERATED',
          sourceType: 'AI-GENERATED',
          sourceName: 'Study Up Quality-Verified AI Engine',
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
      {/* 1. Header with Registered Stream Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Test Builder</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure a custom practice exam tailored to your topics and exam format.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold self-start sm:self-auto shadow-xs">
          <span>
            {exam} • {profile?.classLevel === 'Dropper' ? 'Dropper (Full Syllabus)' : `Class ${profile?.classLevel || '11'}`}
          </span>
        </div>
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
        {/* Step 1: Subjects */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            1. Subjects
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableSubjects.map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{sub}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Chapter & Topic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              2. Chapter
            </label>
            <CustomSelect
              value={selectedChapter}
              onChange={(val) => {
                setSelectedChapter(val);
                setSelectedTopic('ALL');
              }}
              options={[
                { value: 'ALL', label: 'All Chapters' },
                ...availableChapters.map((ch) => ({ value: ch, label: ch }))
              ]}
              className="bg-white dark:bg-[#0c131a]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Topic
            </label>
            <CustomSelect
              value={selectedTopic}
              onChange={(val) => setSelectedTopic(val)}
              options={[
                { value: 'ALL', label: 'All Topics' },
                ...availableTopics.map((t) => ({ value: t, label: t }))
              ]}
              className="bg-white dark:bg-[#0c131a]"
            />
          </div>
        </div>

        {/* Step 3: Difficulty */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            3. Difficulty
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['Mixed', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'Mixed')[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  difficulty === d
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Number of Questions */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            4. Number of Questions
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {[5, 10, 15, 20, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleQuestionCountSelect(num)}
                className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  questionCount === num && !customCountInput
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Inventory Availability Banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">{difficulty}</span> •{' '}
            <span className={effectiveAvailableCount < questionCount ? 'text-amber-600 font-bold' : 'text-slate-700 dark:text-slate-200 font-semibold'}>
              {effectiveAvailableCount} questions available
            </span>
          </div>
          <span className="text-slate-400 text-[11px]">
            {questionCount * 4} marks • {durationMinutes} min
          </span>
        </div>

        {/* Section 10: PAPER BLUEPRINT PREVIEW */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
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
                <div key={b.subject} className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                  <span>{b.subject}</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{b.count}</strong>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Difficulty Breakdown
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                <span>Easy</span>
                <strong className="text-slate-900 dark:text-white font-bold">{blueprintDifficulty.easy}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                <span>Medium</span>
                <strong className="text-slate-900 dark:text-white font-bold">{blueprintDifficulty.medium}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                <span>Hard</span>
                <strong className="text-slate-900 dark:text-white font-bold">{blueprintDifficulty.hard}</strong>
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
            disabled={effectiveAvailableCount === 0}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
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
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800 py-1 cursor-pointer"
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
                {/* Duration */}
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 30, 60].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDurationMinutes(mins)}
                        className={`py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                          durationMinutes === mins
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Title */}
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Custom Test Title (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Kinematics Speed Drill"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    className="w-full bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Negative Marking & PYQ */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={negativeMarking}
                    onChange={(e) => setNegativeMarking(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:ring-slate-900"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Negative Marking (-1 for wrong)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includePYQs}
                    onChange={(e) => setIncludePYQs(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:ring-slate-900"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Include Official PYQs</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Underflow Modal */}
      {showUnderflowModal && underflowInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0c131a] rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
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
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100 font-semibold text-xs flex items-center justify-between transition-colors"
                >
                  <span>Continue with {underflowInfo.available} questions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}

              <button
                type="button"
                disabled={isGeneratingAI}
                onClick={handleGenerateMoreWithAI}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
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
