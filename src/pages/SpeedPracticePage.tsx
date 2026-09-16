import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { Question, SubjectName, DifficultyLevel } from '../types';

export const SpeedPracticePage: React.FC = () => {
  const navigate = useNavigate();

  // Setup state
  const [selectedDuration, setSelectedDuration] = useState<30 | 60 | 90 | 120>(60);
  const [selectedSubject, setSelectedSubject] = useState<SubjectName>('Physics');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Medium');
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Active Runner State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Results & Stats
  const [attemptHistory, setAttemptHistory] = useState<{
    qId: string;
    isCorrect: boolean;
    timeSpent: number;
    recommendedTime: number;
  }[]>([]);
  const [showSummary, setShowSummary] = useState<boolean>(false);

  // Countdown Timer
  useEffect(() => {
    if (!isStarted || isChecked || showSummary) return;

    if (timeLeft <= 0) {
      // Auto-lock when time expires
      handleCheck(null);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isChecked, timeLeft, showSummary]);

  const handleStart = () => {
    const pool = questionService.filterQuestions({
      subject: selectedSubject,
      difficulty: selectedDifficulty
    });
    const selectedPool = (pool.length > 0 ? pool : questionService.getAllQuestions())
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    setQuestions(selectedPool);
    setCurrentIndex(0);
    setTimeLeft(selectedDuration);
    setSelectedAnswer(null);
    setIsChecked(false);
    setAttemptHistory([]);
    setShowSummary(false);
    setIsStarted(true);
  };

  const handleCheck = (picked: number | null) => {
    if (isChecked) return;
    setIsChecked(true);

    const q = questions[currentIndex];
    const isCorrect = picked === q.correctAnswer;
    const timeSpent = selectedDuration - Math.max(0, timeLeft);

    setAttemptHistory(prev => [
      ...prev,
      {
        qId: q.id,
        isCorrect,
        timeSpent,
        recommendedTime: q.recommendedTimeSeconds || selectedDuration
      }
    ]);

    userService.recordQuestionAnswered({
      questionId: q.id,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      isCorrect,
      timeSpentSeconds: timeSpent,
      selectedAnswer: picked ?? undefined,
      correctAnswer: q.correctAnswer,
      exam: q.exam,
      reason: timeSpent < 15 ? 'Careless Mistake' : 'Time Pressure Slip'
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(selectedDuration);
      setSelectedAnswer(null);
      setIsChecked(false);
    } else {
      setShowSummary(true);
    }
  };

  const currentQ = questions[currentIndex];
  const correctCount = attemptHistory.filter(a => a.isCorrect).length;
  const avgTime = attemptHistory.length > 0
    ? Math.round(attemptHistory.reduce((a, b) => a + b.timeSpent, 0) / attemptHistory.length)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>High-Cadence Reflex Training</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Speed Practice Arena
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Train your time perception and rapid problem classification under a strict, non-stressful per-question countdown.
          </p>
        </div>
      </div>

      {!isStarted ? (
        /* Configuration Stage */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            Configure Your Speed Drill
          </h2>

          <div className="space-y-4">
            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Time Limit Per Question:
              </label>
              <div className="grid grid-cols-4 gap-3">
                {([30, 60, 90, 120] as const).map(sec => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setSelectedDuration(sec)}
                    className={`py-3 px-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                      selectedDuration === sec
                        ? 'bg-purple-600 border-purple-600 text-white shadow-md scale-[1.02]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1 opacity-80" />
                    <span>{sec} Seconds</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Select Subject:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Physics', 'Chemistry', 'Mathematics'] as const).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSubject(s)}
                    className={`py-2.5 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      selectedSubject === s
                        ? 'bg-purple-50 border-purple-300 text-purple-700 font-black'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Difficulty Target:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Easy', 'Medium', 'Hard'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDifficulty(d)}
                    className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-all ${
                      selectedDifficulty === d
                        ? 'bg-purple-50 border-purple-300 text-purple-700 font-black'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={handleStart}
            className="w-full py-3.5 font-black text-xs shadow-lg shadow-purple-500/25 rounded-2xl"
          >
            <Play className="w-4 h-4 mr-2 fill-white" />
            <span>Launch Speed Drill (5 Questions • {selectedDuration}s each)</span>
          </Button>
        </div>
      ) : (
        /* Active Question Display */
        <div className="space-y-5">
          {/* Top Real-Time Status Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="brand" size="sm">Q {currentIndex + 1} / {questions.length}</Badge>
              <span className="text-xs font-bold text-slate-700">{currentQ.chapter}</span>
            </div>

            {/* Countdown Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-sm font-black border transition-all ${
              timeLeft <= 10
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                : 'bg-purple-50 border-purple-200 text-purple-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="space-y-5">
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isRight = currentQ.correctAnswer === idx;

                let btnClass = 'border-slate-200 bg-white text-slate-800 hover:border-purple-300';
                if (isChecked) {
                  if (isRight) {
                    btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isRight) {
                    btnClass = 'border-rose-500 bg-rose-50 text-rose-950';
                  } else {
                    btnClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isChecked}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      handleCheck(idx);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnClass}`}
                  >
                    <span>
                      <strong className="mr-2 font-mono">Option {['A', 'B', 'C', 'D'][idx]}:</strong>
                      {opt}
                    </span>
                    {isChecked && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {isChecked && isSelected && !isRight && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isChecked && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <strong className="text-emerald-600">✓ Accurate answer!</strong>
                  ) : (
                    <strong className="text-rose-600">✗ Time / Selection missed.</strong>
                  )}
                </span>

                <Button size="sm" variant="primary" onClick={handleNextQuestion} className="font-bold text-xs">
                  <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Summary Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => setIsStarted(false)}
        title="Speed Drill Performance Summary"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" size="sm" onClick={() => setIsStarted(false)}>
              Back to Configuration
            </Button>
            <Button variant="primary" size="sm" onClick={handleStart}>
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Retake Drill
            </Button>
          </div>
        }
      >
        <div className="text-center py-4 space-y-5">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">Drill Completed!</h3>
            <p className="text-xs text-slate-500 mt-0.5">Speed breakdown across 5 questions:</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="text-2xl font-black text-emerald-700">{correctCount} / 5</div>
              <div className="text-[11px] font-bold text-emerald-600">Accuracy</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
              <div className="text-2xl font-black text-purple-700">{avgTime}s</div>
              <div className="text-[11px] font-bold text-purple-600">Avg Time</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
              <div className="text-2xl font-black text-amber-700">
                {attemptHistory.filter(a => a.timeSpent > selectedDuration - 5).length}
              </div>
              <div className="text-[11px] font-bold text-amber-600">Near Timeout</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};