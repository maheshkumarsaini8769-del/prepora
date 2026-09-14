import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Sparkles,
  Lightbulb,
  Award,
  RotateCcw,
  BookOpen,
  MessageSquareQuote,
  HelpCircle,
  AlertTriangle,
  Flag,
  Sparkle
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { AskDoubtModal } from '../components/common/AskDoubtModal';
import { ImStuckModal } from '../components/common/ImStuckModal';
import { ReportQuestionModal } from '../components/common/ReportQuestionModal';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { syncEngine } from '../services/syncEngine';
import { Question, ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../types';

export const PracticeSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const exam = searchParams.get('exam') as ExamType;
  const classLevel = searchParams.get('class') as ClassLevel;
  const subject = searchParams.get('subject') as SubjectName;
  const chapter = searchParams.get('chapter');
  const topic = searchParams.get('topic');
  const difficulty = searchParams.get('difficulty') as DifficultyLevel;
  const count = parseInt(searchParams.get('count') || '10', 10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [bookmarkedMap, setBookmarkedMap] = useState<Record<string, boolean>>({});
  const [showDoubtModal, setShowDoubtModal] = useState<boolean>(false);
  const [showStuckModal, setShowStuckModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  useEffect(() => {
    let pool = questionService.filterQuestions({
      exam: exam && exam !== ('All' as any) ? exam : undefined,
      classLevel: classLevel && classLevel !== ('All' as any) ? classLevel : undefined,
      subject: subject && subject !== ('All' as any) ? subject : undefined,
      chapter: chapter && chapter !== 'All' ? chapter : undefined,
      topic: topic && topic !== 'All' ? topic : undefined,
      difficulty: difficulty && difficulty !== ('All' as any) ? difficulty : undefined,
    });

    if (pool.length === 0) {
      pool = questionService.getAllQuestions();
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, count || 10);
    setQuestions(shuffled);

    // Load initial bookmarks
    const bMarks = userService.getBookmarks();
    const map: Record<string, boolean> = {};
    shuffled.forEach(q => {
      map[q.id] = bMarks.some(b => b.type === 'question' && b.targetId === q.id);
    });
    setBookmarkedMap(map);
  }, []);

  // Universal Continuation Auto-Save
  useEffect(() => {
    if (questions.length === 0) return;
    const answeredCount = Object.keys(selectedAnswers).length;
    syncEngine.saveActivePractice({
      subject: subject || questions[currentIndex]?.subject || 'Physics',
      chapter: chapter || questions[currentIndex]?.chapter || 'Kinematics',
      currentQuestionIndex: currentIndex,
      totalQuestions: questions.length,
      completedPercentage: Math.round((answeredCount / questions.length) * 100),
      updatedAt: new Date().toISOString()
    });
  }, [currentIndex, selectedAnswers, questions.length, subject, chapter]);

  useEffect(() => {
    if (showSummary) {
      syncEngine.clearActivePractice();
    }
  }, [showSummary]);

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Preparing practice questions...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQ.id];
  const isChecked = Boolean(checkedQuestions[currentQ.id]);
  const isCorrect = isChecked && selectedOption === currentQ.correctAnswer;
  const isBookmarked = Boolean(bookmarkedMap[currentQ.id]);

  const handleSelectOption = (idx: number) => {
    if (isChecked) return; // Prevent change after check
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleCheckAnswer = () => {
    if (selectedOption === undefined || isChecked) return;
    setCheckedQuestions(prev => ({ ...prev, [currentQ.id]: true }));

    // If incorrect, automatically track in Mistake Book
    if (selectedOption !== currentQ.correctAnswer) {
      userService.getMistakes(); // ensure storage is loaded
      // Record mistake
      const mistakes = JSON.parse(localStorage.getItem('prepora_mistakes') || '[]');
      const existing = mistakes.find((m: any) => m.questionId === currentQ.id);
      if (!existing) {
        mistakes.unshift({
          id: `m-${Date.now()}-${currentQ.id}`,
          questionId: currentQ.id,
          exam: currentQ.exam,
          subject: currentQ.subject,
          chapter: currentQ.chapter,
          topic: currentQ.topic,
          lastAttemptedDate: new Date().toISOString().split('T')[0],
          userWrongAnswer: selectedOption,
          correctAnswer: currentQ.correctAnswer,
          mistakeCount: 1,
          resolved: false
        });
        localStorage.setItem('prepora_mistakes', JSON.stringify(mistakes));
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleToggleBookmark = () => {
    const isNowBookmarked = userService.toggleBookmark({
      type: 'question',
      targetId: currentQ.id,
      title: currentQ.question.slice(0, 60) + '...',
      subtitle: `${currentQ.subject} • ${currentQ.chapter}`
    });
    setBookmarkedMap(prev => ({ ...prev, [currentQ.id]: isNowBookmarked }));
  };

  // Summary Metrics
  const totalChecked = Object.keys(checkedQuestions).length;
  const totalCorrect = Object.entries(checkedQuestions).filter(
    ([qId, checked]) => checked && selectedAnswers[qId] === questions.find(q => q.id === qId)?.correctAnswer
  ).length;
  const totalWrong = totalChecked - totalCorrect;
  const accuracy = totalChecked > 0 ? Math.round((totalCorrect / totalChecked) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-5 animate-in fade-in duration-200">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/practice')}>
          <ArrowLeft className="w-4 h-4" /> Exit Practice
        </Button>

        <div className="flex items-center gap-2">
          <Badge variant="brand">
            Question {currentIndex + 1} of {questions.length}
          </Badge>
          <button
            onClick={handleToggleBookmark}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title="Bookmark Question"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-brand-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <Card className="space-y-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="slate" size="sm">{currentQ.subject}</Badge>
          <Badge variant="slate" size="sm">{currentQ.chapter}</Badge>
          <Badge
            variant={
              currentQ.difficulty === 'Easy'
                ? 'success'
                : currentQ.difficulty === 'Medium'
                ? 'warning'
                : 'danger'
            }
            size="sm"
          >
            {currentQ.difficulty}
          </Badge>
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">{currentQ.topic}</span>

          {/* Task 4: I'm Stuck & Report Buttons */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
            <button
              type="button"
              onClick={() => setShowStuckModal(true)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-full transition-all"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>I'm Stuck?</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-2 py-1 rounded-full transition-all"
              title="Report an issue with this question"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
          {currentQ.question}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === idx;
            const isAnswerOption = currentQ.correctAnswer === idx;

            let optionStyle = 'border-slate-200 bg-white text-slate-800 hover:border-brand-300';

            if (isChecked) {
              if (isAnswerOption) {
                optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50/70 text-rose-950 ring-1 ring-rose-500';
              } else {
                optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-brand-500 bg-brand-50/80 text-brand-950 font-semibold ring-2 ring-brand-500/20';
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isChecked}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all text-sm sm:text-base ${optionStyle}`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                    isChecked && isAnswerOption
                      ? 'bg-emerald-600 text-white'
                      : isChecked && isSelected && !isCorrect
                      ? 'bg-rose-600 text-white'
                      : isSelected
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {letter}
                </span>
                <span className="flex-1 pt-0.5">{option}</span>
                {isChecked && isAnswerOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                )}
                {isChecked && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>

          {!isChecked ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleCheckAnswer}
              disabled={selectedOption === undefined}
              className="font-bold px-6"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              className="font-bold px-6"
            >
              {currentIndex === questions.length - 1 ? 'Finish Practice' : 'Next Question'}{' '}
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Detailed Explanation Drawer (shown after Check Answer) */}
        {isChecked && (
          <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Banner */}
            <div
              className={`p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCorrect
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                )}
                <div>
                  <div className="font-bold text-sm sm:text-base">
                    {isCorrect ? 'Great Job! Correct Answer.' : 'Incorrect! Step-by-step breakdown below.'}
                  </div>
                  <div className="text-xs opacity-80 mt-0.5">
                    Correct option is <strong>{['A', 'B', 'C', 'D'][currentQ.correctAnswer]}: {currentQ.options[currentQ.correctAnswer]}</strong>.
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDoubtModal(true)}
                className="self-start sm:self-auto text-xs font-bold bg-white text-purple-700 border-purple-300 hover:bg-purple-50 shadow-xs"
              >
                <MessageSquareQuote className="w-4 h-4 text-purple-600" />
                <span>Ask Doubt to Mentor</span>
              </Button>
            </div>

            {/* Structured Step-by-Step Solution */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-brand-600" /> Complete Step-by-Step Solution
                </h4>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  High-Yield Guide
                </span>
              </div>

              {/* 1. Concept & Principle */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">1. Core Concept</span>
                <p className="text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-slate-200 font-medium">
                  {currentQ.concept || `${currentQ.topic} fundamental principles and governing formulas`}
                </p>
              </div>

              {/* 2. Step-by-step Substitution */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">2. Step-by-step Substitution & Derivation</span>
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 font-mono whitespace-pre-line">
                  {currentQ.explanation}
                </div>
              </div>

              {/* 3. Final Answer Box */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">Final Answer: </span>
                  <span>Option {['A', 'B', 'C', 'D'][currentQ.correctAnswer]} ({currentQ.options[currentQ.correctAnswer]})</span>
                </div>
                <Badge variant="success" size="sm">Verified</Badge>
              </div>

              {/* 4. Common Mistake Warning */}
              <div className="p-3 bg-rose-50/70 border border-rose-200/70 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Common Student Mistake: </span>
                  <span>
                    Many students confuse initial boundary conditions or misapply unit conversion factors. Verify signs and powers before picking options.
                  </span>
                </div>
              </div>

              {/* 5. Exam Tip / Shortcut */}
              <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Exam Speed Hack / Shortcut: </span>
                  <span>
                    {currentQ.shortcutTip || "Check dimensional balance first. Eliminating 2 impossible options doubles your probability if making a strategic guess."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Practice Completion Modal */}
      <Modal
        isOpen={showSummary}
        onClose={() => navigate('/practice')}
        title="Practice Session Summary"
        footer={
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4" /> Practice Again
            </Button>
            <Button variant="primary" onClick={() => navigate('/practice')}>
              Back to Practice Zone
            </Button>
          </div>
        }
      >
        <div className="text-center py-4 space-y-5">
          <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">Drill Completed!</h3>
            <p className="text-xs text-slate-500 mt-1">
              You reviewed {totalChecked} questions in {subject}.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100">
              <div className="text-2xl font-black text-emerald-700">{totalCorrect}</div>
              <div className="text-xs font-bold text-emerald-600">Correct</div>
            </div>
            <div className="bg-rose-50 rounded-2xl p-3 border border-rose-100">
              <div className="text-2xl font-black text-rose-700">{totalWrong}</div>
              <div className="text-xs font-bold text-rose-600">Incorrect</div>
            </div>
            <div className="bg-brand-50 rounded-2xl p-3 border border-brand-100">
              <div className="text-2xl font-black text-brand-700">{accuracy}%</div>
              <div className="text-xs font-bold text-brand-600">Accuracy</div>
            </div>
          </div>

          {totalWrong > 0 && (
            <p className="text-xs text-slate-500">
              {totalWrong} incorrect questions have been automatically logged to your{' '}
              <span className="font-bold text-brand-600 cursor-pointer" onClick={() => navigate('/mistakes')}>
                Mistake Book
              </span>{' '}
              for spaced revision.
            </p>
          )}
        </div>
      </Modal>

      {/* Universal Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={showDoubtModal}
        onClose={() => setShowDoubtModal(false)}
        initialSubject={currentQ.subject}
        questionContext={currentQ}
      />

      {/* Task 4: I'm Stuck Progressive Hints Modal */}
      <ImStuckModal
        isOpen={showStuckModal}
        onClose={() => setShowStuckModal(false)}
        question={currentQ}
      />

      {/* Report Question Issue Modal */}
      <ReportQuestionModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        questionId={currentQ?.id || ''}
        questionSnippet={currentQ?.question || ''}
      />
    </div>
  );
};
