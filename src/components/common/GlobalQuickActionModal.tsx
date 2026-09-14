import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Zap, 
  FileText, 
  Sparkles,
  X,
  Target
} from 'lucide-react';

interface GlobalQuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudySession?: () => void;
}

export const GlobalQuickActionModal: React.FC<GlobalQuickActionModalProps> = ({
  isOpen,
  onClose,
  onOpenStudySession
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const actions = [
    {
      title: 'Practice Questions',
      subtitle: 'Instant step-by-step solutions by chapter',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      action: () => {
        onClose();
        navigate('/practice');
      }
    },
    {
      title: 'Take a Test',
      subtitle: 'Timed mock exams, chapter tests & PYQs',
      icon: Target,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      action: () => {
        onClose();
        navigate('/tests');
      }
    },
    {
      title: 'Fix My Weakness',
      subtitle: 'Target red-flagged topics & high-error areas',
      icon: Zap,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      action: () => {
        onClose();
        navigate('/weakness');
      }
    },
    {
      title: 'Revise Formulas & Flashcards',
      subtitle: '15-minute quick revision spaced repetition',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      action: () => {
        onClose();
        navigate('/chapters/Kinematics');
      }
    },
    {
      title: 'Ask an Academic Doubt',
      subtitle: 'Get detailed mentor clarifications on tricky concepts',
      icon: HelpCircle,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      action: () => {
        onClose();
        navigate('/doubts');
      }
    },
    {
      title: 'I Have 20 Minutes (Study Session)',
      subtitle: 'Time-boxed sprint tailored to your prep schedule',
      icon: Clock,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      action: () => {
        onClose();
        if (onOpenStudySession) onOpenStudySession();
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Quick Action Navigator</span>
            <h3 className="text-base sm:text-lg font-black text-slate-900">What do you want to do right now?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Grid */}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[70vh] overflow-y-auto">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={act.action}
                className="p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 text-left transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border mb-3 ${act.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-purple-700 transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {act.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
