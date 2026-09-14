import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from './UIComponents';
import { useAuth } from '../../context/AuthContext';

export interface ReportQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionSnippet?: string;
}

const REPORT_REASONS = [
  'Wrong Answer',
  'Wrong Explanation',
  'Ambiguous Question',
  'Typo / Spelling',
  'Duplicate',
  'Incorrect Option',
  'Missing Information',
  'Other'
];

export const ReportQuestionModal: React.FC<ReportQuestionModalProps> = ({
  isOpen,
  onClose,
  questionId,
  questionSnippet
}) => {
  const { user } = useAuth();
  const [selectedReason, setSelectedReason] = useState<string>(REPORT_REASONS[0]);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/reports/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId,
          reason: selectedReason,
          message: comment,
          userId: user.id || 'anonymous',
          userEmail: user.email || ''
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setComment('');
          onClose();
        }, 1800);
      } else {
        setError(data.message || 'Failed to submit report. Please try again.');
      }
    } catch {
      setError('Network error. Your report could not be submitted right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Report Question Issue</h3>
              <p className="text-[11px] text-slate-400">ID: {questionId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce" />
              <h4 className="text-base font-bold text-slate-900">Thank You!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Your report has been submitted to the academic team for verification and correction.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {questionSnippet && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 line-clamp-2 italic">
                  "{questionSnippet}"
                </div>
              )}

              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  What is the issue?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setSelectedReason(reason)}
                      className={`text-xs p-2 rounded-xl border text-left font-medium transition-all ${
                        selectedReason === reason
                          ? 'border-purple-600 bg-purple-50 text-purple-700 shadow-sm font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Explain why the answer or explanation is problematic..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 justify-center"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1 justify-center bg-purple-600 hover:bg-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};