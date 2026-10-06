import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  X,
  BookOpen,
  Tv,
  GraduationCap,
  AlertCircle,
  HelpCircle,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookMarked,
  Flame,
  FileText,
  Bot,
  Settings
} from 'lucide-react';
import { soundFeedback } from '../../utils/audioFeedback';

interface StudentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentGuideModal: React.FC<StudentGuideModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'steps' | 'features' | 'tips'>('steps');

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    soundFeedback.playClick();
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0c141d] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white relative shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-xs">
                🎓
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Student Orientation Guide</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight mt-1">
                  How to Use PREPORA
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                soundFeedback.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-lg leading-relaxed">
            Everything you need to crack JEE, NEET & Board Exams — structured into a simple daily habit.
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/15">
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'steps'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              4-Step Daily Routine
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'features'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Key Features Guide
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tips'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Exam Rank Tips
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: 4-STEP DAILY ROUTINE */}
          {activeTab === 'steps' && (
            <div className="space-y-3.5">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Follow this simple 4-step routine every day to make steady progress without exam burnout:
              </p>

              {/* Step 1 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    1
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Formulas & Video Lectures</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Before solving questions, revise all formulas and key concepts. Watch topic-wise video classes if any chapter concept is unclear.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleNavigate('/formula-sheet')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition"
                  >
                    Formulas →
                  </button>
                  <button
                    onClick={() => handleNavigate('/lectures')}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-800 dark:text-slate-200 text-xs font-bold shrink-0 transition"
                  >
                    Lectures →
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    2
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Solve Your Daily 25 Questions Goal</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Go to the Practice Center. Pick your subject (Physics, Chemistry, Maths/Biology) and solve questions with instant hints and detailed step-by-step solutions.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigate('/practice')}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition self-start sm:self-auto"
                >
                  Start Practice →
                </button>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    3
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Take Timed Mock Tests & Past Papers</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Experience the exact NTA online exam interface with timer, negative marking (+4 / -1), and percentile prediction.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigate('/tests')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shrink-0 transition self-start sm:self-auto"
                >
                  Mock Tests →
                </button>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center shrink-0 text-sm shadow-xs">
                    4
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Analyze Mistakes & Clear Doubts</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Every incorrect question is automatically collected in your Mistake Book. Retry them blindly so you never lose marks on the same concept again!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleNavigate('/mistakes')}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 transition self-start sm:self-auto"
                >
                  Mistake Book →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KEY FEATURES GUIDE */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Daily Streak & Goal</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Solve your target 25 questions each day to build discipline. Your streak increases daily when you finish your target.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Bot className="w-4 h-4 text-purple-500" />
                  <span>AI Doubt Solver</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Stuck on a problem? Type your question or snap a photo in Doubt Center to get instant step-by-step guidance.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>Real Past Papers (PYQs)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Practice authentic 2019–2025 question papers for JEE Main, JEE Advanced, and NEET with answer keys.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Settings className="w-4 h-4 text-emerald-500" />
                  <span>Target Exam Switcher</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Easily switch between JEE, NEET, CBSE, or RBSE anytime inside Settings. Your question bank updates automatically.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: EXAM RANK TIPS */}
          {activeTab === 'tips' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Golden Rules to Maximize Your Percentile</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li><strong>Never skip the Mistake Book</strong>: Toppers don't solve 10,000 random questions; they master the ones they got wrong the first time.</li>
                  <li><strong>Formula Sheet before every test</strong>: 30% of competitive questions are direct formula substitutions. Memorize traps & units.</li>
                  <li><strong>Practice with negative marking</strong>: Don't guess blindly. High accuracy always beats random attempts in NTA scoring.</li>
                  <li><strong>Maintain your daily streak</strong>: Just 30-45 minutes of focused daily solving yields higher retention than sporadic 6-hour cram sessions.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Need help? Click <strong>Doubts</strong> anytime to ask an academic mentor.
          </span>
          <button
            onClick={() => {
              soundFeedback.playClick();
              onClose();
              navigate('/practice');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Got It! Start Practicing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
