import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Bookmark,
  Send,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  ShieldAlert,
  Wrench,
  Calculator,
  Type,
  Globe,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { Button, Modal, Badge } from '../components/common/UIComponents';
import { ExamToolsModal } from '../components/exam/ExamToolsModal';
import { ReportQuestionModal } from '../components/common/ReportQuestionModal';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
import { syncEngine } from '../services/syncEngine';
import { useAuth } from '../context/AuthContext';
import { Test, Question, TestAnswer } from '../types';

export const ExamSession: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Memoize test lookup strictly by id so reference does not change on re-render
  const test = useMemo(() => testService.getTestById(id || ''), [id]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, TestAnswer>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [restoredNotice, setRestoredNotice] = useState<boolean>(false);
  const [idempotencyKey] = useState<string>(() => syncEngine.generateIdempotencyKey('sub'));
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState<boolean>(false);
  const totalDurationSeconds = useRef<number>(0);

  // Exam Hall Tools & Preferences
  const [toolsModalOpen, setToolsModalOpen] = useState<boolean>(false);
  const [toolsInitialTab, setToolsInitialTab] = useState<'calculator' | 'scratchpad' | 'settings'>('calculator');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [coachMinimized, setCoachMinimized] = useState<boolean>(false);

  // Anti-Cheating & Proctoring States
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState<number>(0);
  const [showTabWarningModal, setShowTabWarningModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Active question ref for reliable time-tracking without re-binding timer interval
  const currentQIdRef = useRef<string>('');

  // Initialize test and answers ONCE per test ID
  useEffect(() => {
    if (!test) return;
    let isCancelled = false;

    const loadExamQuestions = async () => {
      let qs: Question[] = [];
      if (test.questionIds && test.questionIds.length > 0) {
        qs = await questionService.getQuestionsByIdsAsync(test.questionIds);
        qs = qs.slice(0, test.totalQuestions);
      }

      if (qs.length === 0) {
        const fetched = await questionService.fetchQuestionsAsync({
          exam: test.exam as any,
          classLevel: test.classLevel as any,
          includePYQs: true
        }, test.totalQuestions);
        qs = fetched.filter(q => test.subjects.includes(q.subject)).slice(0, test.totalQuestions);

        if (qs.length === 0) {
          qs = questionService.getAllQuestions().slice(0, test.totalQuestions);
        }
      }

      if (isCancelled) return;

      setQuestions(qs);
      const duration = test.durationMinutes * 60;
      totalDurationSeconds.current = duration;
      setTimeLeftSeconds(duration);

      if (qs.length > 0) {
        currentQIdRef.current = qs[0].id;
      }

      // Initialize answer state for every question
      const initialAnswers: Record<string, TestAnswer> = {};
      qs.forEach((q, idx) => {
        initialAnswers[q.id] = {
          questionId: q.id,
          selectedAnswer: null,
          isAnswered: false,
          isMarkedForReview: false,
          isVisited: idx === 0,
          timeSpentSeconds: 0,
          recommendedTimeSeconds: q.recommendedTimeSeconds || (q.difficulty === 'Easy' ? 60 : q.difficulty === 'Medium' ? 90 : 150)
        };
      });

      // Check if previous unfinished attempt exists in local storage
      const saved = syncEngine.getActiveTest(test.id);
      if (saved && saved.answers && saved.timeLeftSeconds > 0) {
        setAnswers(saved.answers);
        setTimeLeftSeconds(saved.timeLeftSeconds);
        if (saved.currentIndex !== undefined && saved.currentIndex < qs.length) {
          setCurrentIndex(saved.currentIndex);
          if (qs[saved.currentIndex]) {
            currentQIdRef.current = qs[saved.currentIndex].id;
          }
        }
        setRestoredNotice(true);
        setTimeout(() => setRestoredNotice(false), 4000);
      } else {
        setAnswers(initialAnswers);
      }
    };

    loadExamQuestions();

    return () => {
      isCancelled = true;
    };
  }, [id, test]);

  // Real-time Auto-Save to localStorage on state change
  useEffect(() => {
    if (!test || questions.length === 0 || Object.keys(answers).length === 0) return;
    syncEngine.saveActiveTest(test.id, {
      testTitle: test.title,
      totalQuestions: questions.length,
      currentIndex,
      answers,
      timeLeftSeconds,
      updatedAt: new Date().toISOString()
    });
  }, [answers, currentIndex, timeLeftSeconds, test, questions.length]);

  // Keep active question ID updated for the interval
  useEffect(() => {
    if (questions[currentIndex]) {
      currentQIdRef.current = questions[currentIndex].id;
    }
  }, [currentIndex, questions]);

  // Robust Countdown Timer & Question Time Tracker
  useEffect(() => {
    if (!test) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });

      // Increment active question timeSpentSeconds
      const activeQId = currentQIdRef.current;
      if (activeQId) {
        setAnswers((prev) => {
          const item = prev[activeQId];
          if (!item) return prev;
          return {
            ...prev,
            [activeQId]: {
              ...item,
              timeSpentSeconds: (item.timeSpentSeconds || 0) + 1
            }
          };
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id]);

  // Handle automatic submission when timer hits 0
  useEffect(() => {
    if (timeLeftSeconds === 0 && questions.length > 0 && totalDurationSeconds.current > 0) {
      handleSubmitTest(true);
    }
  }, [timeLeftSeconds]);

  // Anti-Cheating: Tab Switch & Window Blur Proctoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitting) {
        setTabSwitchWarnings((prev) => {
          const next = prev + 1;
          setShowTabWarningModal(true);
          if (next >= 3) {
            handleSubmitTest(true);
          }
          return next;
        });
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [submitting]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen request:', err);
    }
  };

  if (!test || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-800">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-slate-600 font-semibold text-sm">Preparing Examination Session...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || questions[0];
  if (!currentQ) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white">
        <div className="text-center p-6">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="font-semibold text-sm">Loading questions for this test session...</p>
        </div>
      </div>
    );
  }
  const currentAnswer = answers[currentQ.id] || {
    questionId: currentQ.id,
    selectedAnswer: null,
    isAnswered: false,
    isMarkedForReview: false,
    isVisited: true,
    timeSpentSeconds: 0,
    recommendedTimeSeconds: currentQ.recommendedTimeSeconds || 90
  };

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Palette Status Classifier
  const getPaletteStatus = (qId: string) => {
    const a = answers[qId];
    if (!a || !a.isVisited) return 'not-visited';
    if (a.isAnswered && a.isMarkedForReview) return 'answered-marked';
    if (a.isMarkedForReview) return 'marked-review';
    if (a.isAnswered) return 'answered';
    return 'not-answered';
  };

  // Option selection with persistent state update
  const handleSelectOption = (optIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...(prev[currentQ.id] || {
          questionId: currentQ.id,
          isMarkedForReview: false,
          timeSpentSeconds: 0
        }),
        selectedAnswer: optIdx,
        isAnswered: true,
        isVisited: true
      }
    }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedAnswer: null,
        isAnswered: false
      }
    }));
  };

  const handleToggleMarkReview = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isMarkedForReview: !prev[currentQ.id]?.isMarkedForReview
      }
    }));
  };

  const navigateToQuestion = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= questions.length) return;
    const targetQ = questions[targetIdx];
    currentQIdRef.current = targetQ.id;
    setAnswers((prev) => ({
      ...prev,
      [targetQ.id]: {
        ...(prev[targetQ.id] || {
          questionId: targetQ.id,
          selectedAnswer: null,
          isAnswered: false,
          isMarkedForReview: false,
          timeSpentSeconds: 0
        }),
        isVisited: true
      }
    }));
    setCurrentIndex(targetIdx);
    setMobilePaletteOpen(false);
  };

  const handleSaveAndNext = () => {
    if (currentIndex < questions.length - 1) {
      navigateToQuestion(currentIndex + 1);
    }
  };

  const handleSubmitTest = async (forced: boolean = false) => {
    if (!forced && !showSubmitModal) {
      setShowSubmitModal(true);
      return;
    }

    setSubmitting(true);
    setSubmissionError(null);

    const timeTaken = Math.max(1, totalDurationSeconds.current - timeLeftSeconds);

    // 1. Save final state locally so answers can NEVER be lost
    syncEngine.saveActiveTest(test.id, {
      testTitle: test.title,
      totalQuestions: questions.length,
      currentIndex,
      answers,
      timeLeftSeconds,
      updatedAt: new Date().toISOString()
    });

    try {
      // 2. Submit to backend API with idempotencyKey
      const res = await fetch('/api/attempts/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          testId: test.id,
          userId: user.id || 'usr-default',
          answers,
          timeTakenSeconds: timeTaken,
          idempotencyKey
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.attempt) {
        // Also save in local testService for immediate offline sync consistency
        testService.saveAttempt(data.attempt);

        // 3. Clear temporary active-test state ONLY after confirmed submission
        syncEngine.clearActiveTest(test.id);

        navigate(`/tests/${test.id}/result?attemptId=${data.attempt.id}`);
        return;
      } else {
        throw new Error(data.message || 'Server evaluation error.');
      }
    } catch (err: any) {
      // Fallback: If network is offline, evaluate locally so student can review results,
      // but if server had an issue, let student retry or view results safely
      try {
        const localAttempt = testService.calculateAndSaveAttempt(test, answers, timeTaken);
        // Queue idempotent sync in background
        syncEngine.enqueue({
          idempotencyKey,
          type: 'test_submission',
          endpoint: '/api/attempts/submit',
          payload: {
            testId: test.id,
            userId: user.id || 'usr-default',
            answers,
            timeTakenSeconds: timeTaken
          }
        });

        syncEngine.clearActiveTest(test.id);
        navigate(`/tests/${test.id}/result?attemptId=${localAttempt.id}`);
      } catch (localErr: any) {
        setSubmitting(false);
        setSubmissionError("Test submission couldn't be completed. Your answers are safely saved on your device.");
      }
    }
  };

  // Subject Time Coach Calculations
  const currentSubject = currentQ.subject;
  const currentSubjectTimeSpent = questions
    .filter(q => q.subject === currentSubject)
    .reduce((acc, q) => acc + (answers[q.id]?.timeSpentSeconds || 0), 0);

  const recommendedSubjectMinutes = test.subjectTimePlan?.[currentSubject] || 
    Math.max(1, Math.round((questions.filter(q => q.subject === currentSubject).length / Math.max(1, questions.length)) * test.durationMinutes));

  const subjectOverTime = currentSubjectTimeSpent > recommendedSubjectMinutes * 60;
  const subjectTimeDiffSecs = Math.abs(currentSubjectTimeSpent - (recommendedSubjectMinutes * 60));

  // Counts for summary & submit confirmation
  const totalCount = questions.length;
  const answeredCount = Object.values(answers).filter((a) => a.isAnswered).length;
  const unansweredCount = totalCount - answeredCount;
  const markedCount = Object.values(answers).filter((a) => a.isMarkedForReview).length;

  // Language and font rendering
  const activeQuestionText = (language === 'hi' && currentQ.questionHi) ? currentQ.questionHi : currentQ.question;
  const isFallbackLang = language === 'hi' && !currentQ.questionHi;
  const getOptionText = (opt: string, idx: number) => {
    if (language === 'hi' && currentQ.optionsHi && currentQ.optionsHi[idx]) {
      return currentQ.optionsHi[idx];
    }
    return opt;
  };

  const questionFontClass = fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg';
  const optionFontClass = fontSize === 'sm' ? 'text-xs sm:text-sm' : fontSize === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';

  return (
    <div 
      className="min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-col font-sans select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
    >
      {restoredNotice && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-1.5 text-center font-semibold shadow-inner animate-fadeIn flex items-center justify-center gap-1.5 z-30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Previous exam progress automatically restored. Your saved answers are intact.</span>
        </div>
      )}

      {/* Test Bar Header */}
      <header className="h-16 bg-white dark:bg-[#0c131a] border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="w-8 h-8 rounded-lg bg-brand-600 text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
            P
          </span>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">{test.title}</h1>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate flex items-center gap-1.5">
              <span>{test.exam} • Section: <span className="font-semibold text-purple-700">{currentQ.subject}</span></span>
              {tabSwitchWarnings > 0 && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <ShieldAlert className="w-3 h-3 text-amber-600" />
                  {tabSwitchWarnings}/3 Warning{tabSwitchWarnings > 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center/Right Toolbar: Exam Tools, Font, Lang & Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Fullscreen CBT Mode Toggle */}
          <button
            onClick={toggleFullscreen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              isFullscreen
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Exam Mode'}
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Fullscreen' : 'Fullscreen'}</span>
          </button>

          {/* Quick Font Size Switcher (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-1 rounded font-semibold transition-colors ${fontSize === 'sm' ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              title="Compact Font Size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-1 rounded font-semibold transition-colors ${fontSize === 'base' ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              title="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-1 rounded font-semibold transition-colors ${fontSize === 'lg' ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              title="Large Font Size"
            >
              A+
            </button>
          </div>

          {/* Quick Language Toggle */}
          <button
            onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            title="Switch Language (English / Hindi)"
          >
            <Globe className="w-3.5 h-3.5 text-purple-600" />
            <span>{language === 'en' ? 'English' : 'Hindi'}</span>
          </button>

          {/* Exam Tools Modal Trigger Button */}
          <button
            onClick={() => {
              setToolsInitialTab('calculator');
              setToolsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all shadow-xs"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exam Tools</span>
            <span className="sm:hidden">Tools</span>
          </button>

          {/* Real Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl font-mono font-bold text-xs sm:text-sm border ${
              timeLeftSeconds < 300
                ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4 text-brand-600" />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>

          <button
            onClick={() => setMobilePaletteOpen(true)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold"
          >
            {answeredCount}/{totalCount}
          </button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => handleSubmitTest(false)}
            className="font-bold hidden sm:inline-flex"
          >
            Submit Test
          </Button>
        </div>
      </header>

      {/* Time Coach Banner (Minimizable floating/header indicator) */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white px-4 py-1.5 text-xs flex items-center justify-between shadow-inner border-b border-purple-800/40">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1 font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Time Coach:
          </span>
          {!coachMinimized ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-300">
                {currentSubject} Time Spent: <strong className="text-white font-mono">{formatTime(currentSubjectTimeSpent)}</strong>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">
                Target: <strong className="text-purple-200">{recommendedSubjectMinutes} min</strong>
              </span>
              {subjectOverTime ? (
                <span className="px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 font-semibold text-[11px] animate-pulse">
                  ⚠️ Over budget by +{Math.round(subjectTimeDiffSecs / 60)}m
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold text-[11px]">
                  ✓ On track ({Math.round(((recommendedSubjectMinutes * 60 - currentSubjectTimeSpent) / 60))}m buffer)
                </span>
              )}
            </div>
          ) : (
            <span className="text-purple-200 font-medium">
              {currentSubject}: {formatTime(currentSubjectTimeSpent)} / {recommendedSubjectMinutes}m
            </span>
          )}
        </div>

        <button
          onClick={() => setCoachMinimized(prev => !prev)}
          className="text-slate-400 hover:text-white p-1 ml-2 transition-colors"
          title={coachMinimized ? 'Expand Time Coach' : 'Minimize Time Coach'}
        >
          {coachMinimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Test Body: Left Question Stage + Right Palette */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Question Area */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto flex flex-col justify-between max-w-5xl mx-auto w-full">
          <div className="space-y-5">
            {/* Meta & Subject tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Question {currentIndex + 1}
                </span>
                <span className="text-xs text-slate-400">of {questions.length}</span>
                <Badge variant="brand" size="sm">{currentQ.subject}</Badge>
                {isFallbackLang && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-medium">
                    Showing English
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Target: {currentQ.recommendedTimeSeconds || 90}s
                </span>
                <div className="text-xs font-semibold text-emerald-600">
                  Marks: +4, {test.negativeMarking ? '-1' : '0'}
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className={`bg-white dark:bg-[#0c131a] rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm font-medium text-slate-900 dark:text-white leading-relaxed ${questionFontClass}`}>
              {activeQuestionText}
            </div>

            {/* MCQ Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = currentAnswer.selectedAnswer === idx;
                const displayText = getOptionText(opt, idx);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all cursor-pointer ${optionFontClass} ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 dark:bg-emerald-950/60 text-brand-950 dark:text-emerald-100 font-bold ring-2 ring-brand-500/30 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100 hover:border-brand-200 dark:hover:border-emerald-500/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-brand-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="pt-0.5 flex-1">{displayText}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-brand-600 dark:text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Exam Action Controls (Sticky, Thumb-Friendly on Mobile) */}
          <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0c131a]/95 backdrop-blur-md -mx-4 -mb-4 p-3.5 sm:mx-0 sm:mb-0 sm:rounded-2xl sm:border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sticky bottom-0 z-20 shadow-md sm:shadow-none">
            {/* Primary Action Row on Mobile */}
            <div className="flex items-center justify-between gap-2 order-2 sm:order-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateToQuestion(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="text-xs font-bold py-2 px-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Prev
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveAndNext}
                  disabled={currentIndex === questions.length - 1}
                  className="text-xs font-bold py-2 px-4 bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
                >
                  Save & Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>

              <Button
                size="sm"
                variant="danger"
                onClick={() => handleSubmitTest(false)}
                className="sm:hidden text-xs font-bold py-2 px-3 shadow-xs"
              >
                Submit
              </Button>
            </div>

            {/* Secondary Controls: Clear, Review, Report */}
            <div className="flex items-center justify-between sm:justify-start gap-1.5 order-1 sm:order-1 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearResponse}
                  disabled={currentAnswer.selectedAnswer === null}
                  className="text-[11px] py-1.5 px-2.5"
                >
                  Clear
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleMarkReview}
                  className={`text-[11px] py-1.5 px-2.5 ${currentAnswer.isMarkedForReview ? 'bg-purple-50 text-purple-700 border-purple-300 font-bold' : ''}`}
                >
                  {currentAnswer.isMarkedForReview ? 'Unmark Review' : 'Mark Review'}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setReportModalOpen(true)}
                className="text-[11px] py-1.5 px-2 text-slate-500 hover:text-amber-700 hover:bg-amber-50 border-slate-200 dark:border-slate-800"
                title="Report issue with this question"
              >
                <AlertCircle className="w-3 h-3 text-amber-500 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </div>

        {/* Right Desktop Palette Sidebar */}
        <aside className="hidden lg:flex flex-col w-80 bg-white dark:bg-[#0c131a] border-l border-slate-200 dark:border-slate-800 p-5 overflow-y-auto">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Question Palette</h3>
            <p className="text-xs text-slate-500 mt-0.5">Click any number to jump directly</p>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 my-4 text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">✓</span>
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-rose-600 text-white text-[9px] font-bold flex items-center justify-center">✕</span>
              <span>Unanswered ({unansweredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center">★</span>
              <span>Marked ({markedCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-slate-200 text-slate-700 dark:text-slate-200 text-[9px] font-bold flex items-center justify-center">•</span>
              <span>Not Visited</span>
            </div>
          </div>

          {/* Question Grid Buttons */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
            {questions.map((q, idx) => {
              const status = getPaletteStatus(q.id);
              const isCurrent = currentIndex === idx;

              let btnStyle = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
              if (status === 'answered') {
                btnStyle = 'bg-emerald-600 text-white font-bold';
              } else if (status === 'answered-marked') {
                btnStyle = 'bg-purple-600 text-white font-bold ring-2 ring-emerald-400';
              } else if (status === 'marked-review') {
                btnStyle = 'bg-purple-600 text-white font-bold';
              } else if (status === 'not-answered') {
                btnStyle = 'bg-rose-600 text-white font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => navigateToQuestion(idx)}
                  className={`h-9 rounded-xl text-xs flex items-center justify-center transition-all ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-slate-900 ring-offset-2 scale-105 shadow-sm' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Bottom Submit Action */}
          <div className="mt-auto pt-6">
            <Button
              variant="danger"
              size="md"
              onClick={() => handleSubmitTest(false)}
              className="w-full font-bold shadow-md shadow-rose-500/20"
            >
              Submit Entire Test
            </Button>
          </div>
        </aside>
      </div>

      {/* Mobile Drawer Palette */}
      {mobilePaletteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-white dark:bg-[#0c131a] h-full p-5 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Question Palette</h3>
              <button onClick={() => setMobilePaletteOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2 my-5">
              {questions.map((q, idx) => {
                const status = getPaletteStatus(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => navigateToQuestion(idx)}
                    className={`h-10 rounded-xl text-xs font-bold ${
                      status === 'answered'
                        ? 'bg-emerald-600 text-white'
                        : status === 'not-answered'
                        ? 'bg-rose-600 text-white'
                        : status === 'marked-review' || status === 'answered-marked'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <Button
              variant="danger"
              size="md"
              onClick={() => {
                setMobilePaletteOpen(false);
                handleSubmitTest(false);
              }}
              className="mt-auto font-bold w-full"
            >
              Submit Test
            </Button>
          </div>
        </div>
      )}

      {/* Submission Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Test Submission"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)} disabled={submitting}>
              Back to Test
            </Button>
            <Button
              variant="danger"
              onClick={() => handleSubmitTest(true)}
              className="font-bold"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Confirm & Submit'}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
          {submissionError && (
            <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-red-800 text-xs flex flex-col gap-1.5 animate-fadeIn">
              <div className="font-bold flex items-center gap-1.5 text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Test submission couldn't be completed.</span>
              </div>
              <p className="text-red-700">Your answers are safe on your device.</p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleSubmitTest(true)}
                className="w-full justify-center mt-1 font-bold bg-red-600 hover:bg-red-700 text-white"
                disabled={submitting}
              >
                {submitting ? 'Retrying...' : 'Retry Submission'}
              </Button>
            </div>
          )}

          <div className="flex items-center gap-3 p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-900">
            <ShieldAlert className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div className="text-xs leading-relaxed">
              Are you sure you want to end this exam? Once submitted, your answers will be finalized and evaluated.
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-xl font-bold text-emerald-700">{answeredCount}</div>
              <div className="text-[11px] text-emerald-600 font-semibold">Answered</div>
            </div>
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
              <div className="text-xl font-bold text-rose-700">{unansweredCount}</div>
              <div className="text-[11px] text-rose-600 font-semibold">Unanswered</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="text-xl font-bold text-purple-700">{markedCount}</div>
              <div className="text-[11px] text-purple-600 font-semibold">Marked</div>
            </div>
          </div>

          {unansweredCount > 0 && (
            <p className="text-xs text-slate-500 text-center">
              You still have <strong>{unansweredCount} questions</strong> unanswered.
            </p>
          )}
        </div>
      </Modal>

      {/* Exam Tools Modal */}
      <ExamToolsModal
        isOpen={toolsModalOpen}
        onClose={() => setToolsModalOpen(false)}
        calculatorEnabled={test.calculatorEnabled !== false}
        fontSize={fontSize}
        setFontSize={setFontSize}
        language={language}
        setLanguage={setLanguage}
        initialTab={toolsInitialTab}
      />

      {/* Report Question Modal */}
      <ReportQuestionModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        questionId={currentQ?.id || ''}
        questionSnippet={currentQ?.question || ''}
      />

      {/* Proctoring Tab-Switch Warning Modal */}
      {showTabWarningModal && (
        <Modal
          isOpen={showTabWarningModal}
          onClose={() => setShowTabWarningModal(false)}
          title="⚠️ Proctoring Alert: Tab Switch Detected"
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold">Warning {tabSwitchWarnings} of 3</p>
                <p className="text-rose-700 mt-0.5 leading-relaxed">
                  Navigating away from the examination window is strictly monitored. If you switch tabs or leave this window 3 times, your examination will be automatically submitted.
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-600">
              Please stay focused on your test session. Click below to return immediately.
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowTabWarningModal(false)}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-2.5 rounded-xl justify-center"
            >
              I Understand, Resume Exam
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
