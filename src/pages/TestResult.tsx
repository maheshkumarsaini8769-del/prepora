import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Zap,
  TrendingUp,
  FileText,
  Sparkles,
  Compass,
  ShieldAlert,
  Target,
  ListOrdered,
  HelpCircle
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';

export const TestResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const attemptId = searchParams.get('attemptId');
  const attempts = testService.getAllAttempts();
  const attempt = attemptId
    ? attempts.find(a => a.id === attemptId)
    : attempts.find(a => a.testId === id);

  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <h2 className="text-xl font-bold text-slate-800">Result Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">No test submission found for this exam session.</p>
        <Button onClick={() => navigate('/tests')}>Go to Test Center</Button>
      </div>
    );
  }

  const mins = Math.floor(attempt.timeTakenSeconds / 60);
  const secs = attempt.timeTakenSeconds % 60;
  const timeTakenFormatted = `${mins}m ${secs}s`;
  const avgTimePerQ = attempt.totalQuestions > 0 ? Math.round(attempt.timeTakenSeconds / attempt.totalQuestions) : 0;
  const scorePercentage = attempt.maxScore > 0 ? Math.round((attempt.totalScore / attempt.maxScore) * 100) : 0;

  // Question Decision Training: traps vs blind guesses
  const answerList = Object.values(attempt.answers || {});
  const negativeTrapAnswers = answerList.filter((a: any) => {
    const q = questionService.getQuestionById(a.questionId);
    const isWrong = a.selectedAnswer !== null && a.selectedAnswer !== undefined && q && a.selectedAnswer !== q.correctAnswer;
    return (isWrong && (a.timeSpentSeconds || 0) > 90) || a.timeTag === 'Negative Trap';
  });
  const guessAnswers = answerList.filter((a: any) => {
    const q = questionService.getQuestionById(a.questionId);
    const isWrong = a.selectedAnswer !== null && a.selectedAnswer !== undefined && q && a.selectedAnswer !== q.correctAnswer;
    return isWrong && (a.timeSpentSeconds || 0) < 25;
  });
  const savedTrapSeconds = negativeTrapAnswers.reduce((sum: number, a: any) => sum + (a.timeSpentSeconds || 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Score */}
      <Card className="bg-gradient-to-r from-brand-800 via-brand-700 to-indigo-900 text-white border-none p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-100 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5 text-amber-300" /> Exam Report Card
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">{attempt.testTitle}</h1>
            <p className="text-xs sm:text-sm text-brand-100 mt-1">
              Attempted on {new Date(attempt.timestamp).toLocaleDateString()} at{' '}
              {new Date(attempt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[140px]">
            <div className="text-xs uppercase font-bold text-brand-200">Total Score</div>
            <div className="text-3xl font-black mt-0.5">
              {attempt.totalScore}{' '}
              <span className="text-sm font-semibold text-brand-200">/ {attempt.maxScore}</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-300 mt-0.5">{scorePercentage}% Marks</div>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4" /> Correct
          </div>
          <div className="text-2xl font-black text-slate-800">{attempt.correctCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">+{attempt.correctCount * 4} Marks</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-rose-600 text-xs font-bold mb-1">
            <XCircle className="w-4 h-4" /> Incorrect
          </div>
          <div className="text-2xl font-black text-slate-800">{attempt.wrongCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">-{attempt.wrongCount} Negative</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs font-bold mb-1">
            <AlertCircle className="w-4 h-4" /> Unattempted
          </div>
          <div className="text-2xl font-black text-slate-800">{attempt.unattemptedCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">0 Marks</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-brand-600 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4" /> Accuracy
          </div>
          <div className="text-2xl font-black text-slate-800">{attempt.accuracyPercentage}%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Pacing: {avgTimePerQ}s / Q</div>
        </Card>
      </div>

      {/* Feature 1 & 5: Time Analytics & Time Coach Overview */}
      <Card className="space-y-5 border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              ⏱️
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Time Analytics & Coach Report</h3>
              <p className="text-xs text-slate-500">Question pacing, efficiency tags & subject budget breakdown</p>
            </div>
          </div>
          <Badge variant="brand" size="sm">
            Total Time: {timeTakenFormatted}
          </Badge>
        </div>

        {/* Time Tag Badges Count */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg shadow-xs">
              ⚡
            </div>
            <div>
              <div className="text-xl font-black text-emerald-950">{attempt.speedMasterCount ?? 0}</div>
              <div className="text-xs font-bold text-emerald-800">Speed Masters</div>
              <div className="text-[10px] text-emerald-600">Correct & within target time</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-lg shadow-xs">
              ⏳
            </div>
            <div>
              <div className="text-xl font-black text-amber-950">{attempt.timeDrainerCount ?? 0}</div>
              <div className="text-xs font-bold text-amber-800">Time Drainers</div>
              <div className="text-[10px] text-amber-600">Correct but {'>'}2.2x target time</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-lg shadow-xs">
              🪤
            </div>
            <div>
              <div className="text-xl font-black text-rose-950">{attempt.negativeTrapCount ?? 0}</div>
              <div className="text-xs font-bold text-rose-800">Negative Traps</div>
              <div className="text-[10px] text-rose-600">Wrong & excessive time wasted</div>
            </div>
          </div>
        </div>

        {/* Fastest vs Slowest Question */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-700">Fastest Question:</span>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {attempt.fastestQuestion ? `${attempt.fastestQuestion.timeSpentSeconds}s` : 'N/A'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="font-semibold text-slate-700">Slowest Question:</span>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {attempt.slowestQuestion ? `${attempt.slowestQuestion.timeSpentSeconds}s (${Math.floor(attempt.slowestQuestion.timeSpentSeconds / 60)}m ${attempt.slowestQuestion.timeSpentSeconds % 60}s)` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Time Coach Insights */}
        {attempt.timeCoachInsights && attempt.timeCoachInsights.length > 0 && (
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200/70 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Time Coach Insights</span>
            </div>
            <ul className="space-y-1.5 text-xs text-purple-950">
              {attempt.timeCoachInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Subject-Wise Performance & Time Breakdown */}
      <Card className="space-y-4">
        <h3 className="font-bold text-base text-slate-900">Subject Performance & Time Allocation</h3>

        <div className="space-y-3">
          {attempt.subjectBreakdown.map((s) => {
            const timeMin = Math.round((s.timeSpentSeconds || 0) / 60);
            const recMin = s.recommendedMinutes || 15;
            const diffMin = timeMin - recMin;

            return (
              <div key={s.subject} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800">{s.subject}</span>
                    <Badge variant="slate" size="sm">{s.attempted} / {s.totalQuestions} Attempted</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                      Time: <strong className="text-slate-800">{timeMin}m</strong> / {recMin}m target
                      {diffMin > 2 ? (
                        <span className="text-rose-600 font-bold ml-1">({diffMin > 0 ? `+${diffMin}m` : `${diffMin}m`})</span>
                      ) : (
                        <span className="text-emerald-600 font-semibold ml-1">(On track)</span>
                      )}
                    </span>
                    <div className="text-sm font-black text-brand-700">
                      {s.score} / {s.maxScore} pts ({s.accuracyPercentage}% Acc)
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-600 h-2 rounded-full"
                    style={{ width: `${s.accuracyPercentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
                  <span className="text-emerald-600 font-semibold">{s.correct} Correct</span>
                  <span className="text-rose-600 font-semibold">{s.wrong} Wrong</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Strong vs Weak Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-3">
            <CheckCircle2 className="w-4 h-4" /> Strong Topics Mastered
          </div>
          {attempt.strongTopics.length === 0 ? (
            <div className="text-xs text-slate-400 italic">No strong topics recorded yet.</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {attempt.strongTopics.map((t, i) => (
                <span key={i} className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-xl border border-emerald-200/60">
                  {t}
                </span>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-3">
            <Zap className="w-4 h-4" /> Recommended for Revision
          </div>
          {attempt.weakTopics.length === 0 ? (
            <div className="text-xs text-slate-400 italic">No weak topics identified in this session!</div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {attempt.weakTopics.map((t, i) => (
                <span key={i} className="text-xs font-semibold bg-rose-50 text-rose-800 px-2.5 py-1 rounded-xl border border-rose-200/60">
                  {t}
                </span>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Question Decision Training: Should You Have Skipped? */}
      <Card className="space-y-4 border-amber-200/80 bg-gradient-to-br from-white to-amber-50/20 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Question Decision Training</h3>
              <p className="text-xs text-slate-500">Evaluating your skip discipline and strategic question selection</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Strategic Exam IQ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Negative Traps Warning */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
              <ShieldAlert className="w-4 h-4" />
              <span>Negative Traps ({negativeTrapAnswers.length} Questions)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {negativeTrapAnswers.length > 0 ? (
                <>
                  You spent over <strong>{Math.round(savedTrapSeconds / 60)} minutes</strong> on questions that resulted in incorrect answers. In competitive exams, identifying and skipping these within 45 seconds would have preserved time and saved <strong>+{negativeTrapAnswers.length} negative marks</strong>!
                </>
              ) : (
                'Outstanding skip discipline! You avoided sinking excessive time into questions that led to negative penalties.'
              )}
            </p>
          </div>

          {/* Blind Guesses Warning */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Rapid Guesses ({guessAnswers.length} Questions)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {guessAnswers.length > 0 ? (
                <>
                  Detected <strong>{guessAnswers.length} questions</strong> submitted in under 25 seconds with wrong answers. Uncalculated random guessing lowers aggregate score due to -1 negative marking penalties.
                </>
              ) : (
                'Clean decision-making! No impulsive guesses detected. Every question was answered with calculated intent.'
              )}
            </p>
          </div>
        </div>
      </Card>

      {/* WHAT TO DO NEXT: 4-Step Student Action Roadmap */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white border-none shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/30 text-yellow-400 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">WHAT TO DO NEXT: Immediate Action Plan</h3>
              <p className="text-xs text-purple-200">Convert your test diagnostic into guaranteed rank improvement</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Recommended Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Step 1 */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Step 1: Diagnose</span>
              <h4 className="text-xs font-bold text-white mt-1">Fix Weak Topics</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                Target {attempt.weakTopics.length > 0 ? `${attempt.weakTopics.length} identified bottlenecks` : 'subtopics'} with focused drills.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/weakness')}
              className="w-full text-xs font-bold mt-2"
            >
              Fix Weakness →
            </Button>
          </div>

          {/* Step 2 */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Step 2: Correct</span>
              <h4 className="text-xs font-bold text-white mt-1">Retry Mistakes</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                {attempt.wrongCount} failed questions added to Mistake Book for blind retry.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/mistakes')}
              className="w-full text-xs font-bold mt-2"
            >
              Mistake Book →
            </Button>
          </div>

          {/* Step 3 */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Step 3: Review</span>
              <h4 className="text-xs font-bold text-white mt-1">Smart Revision</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                Run spaced repetition on core formulas tested in this paper.
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/revision')}
              className="w-full text-xs font-bold mt-2"
            >
              Smart Revision →
            </Button>
          </div>

          {/* Step 4 */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider">Step 4: Validate</span>
              <h4 className="text-xs font-bold text-white mt-1">Retest in 48h</h4>
              <p className="text-[11px] text-slate-300 mt-1">
                Verify conceptual retention by taking a follow-up sectional test.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/tests')}
              className="w-full text-xs font-bold mt-2 bg-purple-500 hover:bg-purple-600 text-white"
            >
              Test Center →
            </Button>
          </div>
        </div>
      </Card>

      {/* Footer Navigation CTA */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button variant="outline" onClick={() => navigate('/tests')}>
          Back to Test Center
        </Button>

        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={() => navigate(`/tests/${attempt.testId}/instructions`)}
            className="flex-1 sm:flex-none"
          >
            <RotateCcw className="w-4 h-4" /> Retake Test
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate(`/tests/${attempt.testId}/review?attemptId=${attempt.id}`)}
            className="flex-1 sm:flex-none font-bold shadow-md shadow-brand-500/20"
          >
            Review Detailed Answers <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
