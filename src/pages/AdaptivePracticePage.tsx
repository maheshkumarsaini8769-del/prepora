import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Sparkles,
  Zap,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { Question, DifficultyLevel } from '../types';

export const AdaptivePracticePage: React.FC = () => {
  const navigate = useNavigate();

  // Difficulty sequence tracker
  const [currentTier, setCurrentTier] = useState<DifficultyLevel>('Easy');
  const [streakCorrect, setStreakCorrect] = useState<number>(0);
  const [streakWrong, setStreakWrong] = useState<number>(0);

  // Active question state
  const [allQuestions] = useState<Question[]>(() => questionService.getAllQuestions());
  const [currentQ, setCurrentQ] = useState<Question>(() => {
    const easyQ = questionService.filterQuestions({ difficulty: 'Easy' })[0];
    return easyQ || questionService.getAllQuestions()[0];
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [history, setHistory] = useState<{ diff: DifficultyLevel; correct: boolean }[]>([]);

  const handleSelect = (idx: number) => {
    if (isChecked) return;
    setSelectedAnswer(idx);
    setIsChecked(true);

    const isCorrect = idx === currentQ.correctAnswer;
    setAttemptCount(prev => prev + 1);
    if (isCorrect) setCorrectCount(prev => prev + 1);

    setHistory(prev => [...prev, { diff: currentTier, correct: isCorrect }]);

    userService.recordQuestionAnswered({
      questionId: currentQ.id,
      subject: currentQ.subject,
      chapter: currentQ.chapter,
      topic: currentQ.topic,
      isCorrect,
      timeSpentSeconds: 45,
      selectedAnswer: idx,
      correctAnswer: currentQ.correctAnswer,
      exam: currentQ.exam,
      reason: currentTier === 'Hard' ? 'Concept Gap' : 'Calculation Error'
    });

    if (isCorrect) {
      const newStreak = streakCorrect + 1;
      setStreakCorrect(newStreak);
      setStreakWrong(0);

      // Upgrade difficulty if 2 consecutive correct
      if (newStreak >= 2) {
        if (currentTier === 'Easy') setCurrentTier('Medium');
        else if (currentTier === 'Medium') setCurrentTier('Hard');
      }
    } else {
      const newWrong = streakWrong + 1;
      setStreakWrong(newWrong);
      setStreakCorrect(0);

      // Downgrade difficulty if 2 consecutive wrong
      if (newWrong >= 2) {
        if (currentTier === 'Hard') setCurrentTier('Medium');
        else if (currentTier === 'Medium') setCurrentTier('Easy');
      }
    }
  };

  const handleNext = () => {
    // Pick next question matching currentTier
    const pool = allQuestions.filter(q => q.difficulty === currentTier && q.id !== currentQ.id);
    const nextQ = pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : allQuestions[Math.floor(Math.random() * allQuestions.length)];

    setCurrentQ(nextQ);
    setSelectedAnswer(null);
    setIsChecked(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner - Clean Monochrome Academic Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-slate-700" />
            <span>Rule-Based Progressive Difficulty</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Adaptive Practice Loop
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Correct answers elevate you to harder questions. Repeated mistakes step you down to rebuild conceptual clarity.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Dynamic Tier</span>
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full inline-block mt-1 ${
            currentTier === 'Hard' ? 'bg-rose-100 text-rose-800' : currentTier === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {currentTier} Tier
          </span>
        </div>
      </div>

      {/* Progress & Tier Gauge */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span>Session: {attemptCount} Attempted</span>
          <span>•</span>
          <span className="text-emerald-600">{correctCount} Correct</span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['Easy', 'Medium', 'Hard'] as const).map(tier => (
            <span
              key={tier}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currentTier === tier
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {tier}
            </span>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <Card className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">{currentQ.subject}</Badge>
            <span className="text-xs font-bold text-slate-800">{currentQ.chapter}</span>
          </div>

          <Badge
            variant={
              currentTier === 'Easy' ? 'success' : currentTier === 'Medium' ? 'warning' : 'danger'
            }
            size="sm"
          >
            {currentTier} Question
          </Badge>
        </div>

        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx;
            const isRight = currentQ.correctAnswer === idx;

            let btnClass = 'border-slate-200 bg-white text-slate-800 hover:border-purple-300';
            if (isChecked) {
              if (isRight) btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
              else if (isSelected) btnClass = 'border-rose-500 bg-rose-50 text-rose-950';
              else btnClass = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isChecked}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnClass}`}
              >
                <span>
                  <strong className="mr-2 font-mono">Option {['A', 'B', 'C', 'D'][idx]}:</strong>
                  {opt}
                </span>
                {isChecked && isRight && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isChecked && isSelected && !isRight && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Post-Check Dynamic Feedback */}
        {isChecked && (
          <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
            <div className={`p-4 rounded-2xl text-xs flex items-center justify-between ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}>
              <div>
                <strong>{selectedAnswer === currentQ.correctAnswer ? '✓ Correct!' : '✗ Incorrect!'}</strong>{' '}
                {selectedAnswer === currentQ.correctAnswer
                  ? streakCorrect >= 1 ? 'Maintaining high streak — stepping up difficulty.' : 'Good job!'
                  : streakWrong >= 1 ? 'Stepping down difficulty to reinforce fundamentals.' : 'Review the concept below.'}
              </div>

              <Button size="sm" variant="primary" onClick={handleNext} className="font-bold text-xs shrink-0">
                <span>Next Adaptive Question</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Explanation snippet */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-1">
              <span className="font-bold text-slate-700 block">Concept Explanation:</span>
              <p className="text-slate-600 leading-relaxed font-mono text-[11px]">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};