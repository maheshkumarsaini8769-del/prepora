import React, { useState } from 'react';
import { X, Wrench, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './UIComponents';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export interface ReportTechnicalProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
  testId?: string;
  questionId?: string;
  errorId?: string;
}

const TECH_REASONS = [
  'Test submission failed',
  'Page not loading',
  'Login problem',
  'Question not loading',
  'Timer problem',
  'Payment problem',
  'Other'
];

export const ReportTechnicalProblemModal: React.FC<ReportTechnicalProblemModalProps> = ({
  isOpen,
  onClose,
  defaultReason = TECH_REASONS[0],
  testId,
  questionId,
  errorId
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const [reason, setReason] = useState<string>(defaultReason);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please provide a short description of the issue.');
      return;
    }
    setLoading(true);
    setError(null);

    // Capture safe non-personal diagnostic context
    const userAgent = navigator.userAgent;
    let os = 'Unknown OS';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/iphone|ipad/i.test(userAgent)) os = 'iOS';
    else if (/linux/i.test(userAgent)) os = 'Linux';

    let browser = 'Unknown Browser';
    if (/edg/i.test(userAgent)) browser = 'Microsoft Edge';
    else if (/chrome/i.test(userAgent)) browser = 'Google Chrome';
    else if (/firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/safari/i.test(userAgent)) browser = 'Safari';

    const deviceType = /mobi|android|iphone/i.test(userAgent) ? 'Mobile' : 'Desktop';

    try {
      const res = await fetch('/api/reports/technical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          description,
          route: location.pathname,
          testId,
          questionId,
          userId: user.id || 'anonymous',
          userEmail: user.email || '',
          context: {
            browser,
            os,
            deviceType,
            appVersion: '1.0.0',
            timestamp: new Date().toISOString(),
            errorId: errorId || `diag-${Date.now()}`
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setDescription('');
          onClose();
        }, 1800);
      } else {
        setError(data.message || 'Failed to submit technical report.');
      }
    } catch {
      setError('Network unreachable. Your bug report could not be submitted right now.');
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
            <div className="p-1.5 bg-red-500/20 text-red-400 rounded-lg">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Report Technical Problem</h3>
              <p className="text-[11px] text-slate-400">Route: {location.pathname}</p>
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
              <h4 className="text-base font-bold text-slate-900">Issue Reported</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Thank you. Our engineering team has logged the technical diagnostics and will investigate promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Issue Category
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none bg-white font-medium"
                >
                  {TECH_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Describe what happened
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Test submission timed out after clicking final button..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                Safe diagnostic details (browser, device type, route) are automatically attached to help resolve the problem faster.
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
                  className="flex-1 justify-center bg-red-600 hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Bug Report'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
