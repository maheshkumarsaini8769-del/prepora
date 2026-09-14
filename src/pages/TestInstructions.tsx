import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Bookmark,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';

export const TestInstructions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const test = testService.getTestById(id || '');

  if (!test) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <h2 className="text-xl font-bold text-slate-800">Test Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">The test you are trying to take does not exist.</p>
        <Button onClick={() => navigate('/tests')}>Back to Test Center</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <Button variant="ghost" size="sm" onClick={() => navigate('/tests')}>
        <ArrowLeft className="w-4 h-4" /> Back to Test Center
      </Button>

      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-none p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="brand">{test.exam}</Badge>
          <Badge variant="info">{test.category}</Badge>
          {test.negativeMarking && <Badge variant="warning">Negative Marking (-1)</Badge>}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{test.title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 text-slate-200">
          <div>
            <div className="text-xs text-slate-400">Total Questions</div>
            <div className="text-lg font-bold text-white">{test.totalQuestions}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Duration</div>
            <div className="text-lg font-bold text-white">{test.durationMinutes} Minutes</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Maximum Marks</div>
            <div className="text-lg font-bold text-white">{test.maxScore}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Marking Scheme</div>
            <div className="text-lg font-bold text-emerald-400">+4 / {test.negativeMarking ? '-1' : '0'}</div>
          </div>
        </div>
      </Card>

      {/* Instructions Content */}
      <Card className="space-y-6">
        <div>
          <h3 className="font-bold text-base text-slate-900 mb-2">General Test Instructions</h3>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
            <li>The countdown timer at the top-right indicates the remaining time.</li>
            <li>The test will automatically submit when the timer expires.</li>
            <li>Only one option is correct for each multiple-choice question.</li>
            <li>No answers or explanations will be shown during the exam duration.</li>
            <li>You can navigate back and forth between questions using the Question Palette.</li>
          </ul>
        </div>

        {/* Feature 5: Time Allocation Coach - Recommended Time Plan */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs">
              ⏱️
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-900">Recommended Time Plan (Time Coach)</h3>
              <p className="text-xs text-slate-500">Benchmark time allocation strategy recommended for maximum score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {test.subjects.map(sub => {
              const recMin = test.subjectTimePlan?.[sub] || Math.round(test.durationMinutes / test.subjects.length);
              return (
                <div key={sub} className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
                  <div className="text-xs font-bold text-purple-900">{sub}</div>
                  <div className="text-xl font-black text-purple-700 mt-0.5">{recMin} min</div>
                  <div className="text-[10px] text-purple-500 font-medium">Recommended Budget</div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Per-Question Target: <strong>60s (Easy)</strong> • <strong>90s (Medium)</strong> • <strong>150s (Hard)</strong></span>
            <span className="text-purple-700 font-semibold">
              Tools: {test.calculatorEnabled !== false ? 'Calculator & Scratchpad Enabled' : 'Scratchpad Only (Exam Rules)'}
            </span>
          </div>
        </div>

        {/* Question Palette Legend */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="font-bold text-base text-slate-900 mb-3">Question Palette Symbol Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-semibold text-slate-700">Answered (Evaluated)</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-semibold text-slate-700">Not Answered (Evaluated as 0)</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-semibold text-slate-700">Not Visited Yet</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-xs font-semibold text-slate-700">Marked for Review (Not Answered)</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100 sm:col-span-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center relative">
                5
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Answered & Marked for Review (Will be evaluated)
              </span>
            </div>
          </div>
        </div>

        {/* Declaration Checkbox */}
        <div className="pt-4 border-t border-slate-100">
          <label className="flex items-start gap-3 p-3.5 bg-brand-50/60 border border-brand-100 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
            />
            <span className="text-xs text-slate-700 font-medium leading-relaxed">
              I have read and understood all instructions. I confirm that I will not use any unfair means during this simulated test session.
            </span>
          </label>
        </div>

        {/* Launch Action */}
        <div className="pt-2 flex justify-end">
          <Button
            size="lg"
            variant="primary"
            disabled={!agreed}
            onClick={() => navigate(`/tests/${test.id}/start`)}
            className="w-full sm:w-auto font-bold px-8"
          >
            I AM READY TO BEGIN <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
