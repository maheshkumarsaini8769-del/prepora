import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  X, 
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import { Modal, Button, Badge } from './UIComponents';
import { ecosystemService } from '../../services/ecosystemService';
import { StudySession } from '../../types';
import { useNavigate } from 'react-router-dom';

interface StudySessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDuration?: 10 | 20 | 30 | 45 | 60;
}

export const StudySessionModal: React.FC<StudySessionModalProps> = ({
  isOpen,
  onClose,
  initialDuration = 20
}) => {
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState<10 | 20 | 30 | 45 | 60>(initialDuration);
  const [session, setSession] = useState<StudySession>(() => ecosystemService.getStudySession(initialDuration));
  
  // Active session runner state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialDuration * 60);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && initialDuration) {
      setSelectedDuration(initialDuration);
    }
  }, [isOpen, initialDuration]);

  useEffect(() => {
    setSession(ecosystemService.getStudySession(selectedDuration));
    setSecondsRemaining(selectedDuration * 60);
  }, [selectedDuration]);

  // Interval timer
  useEffect(() => {
    if (!isRunning || isCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsRunning(true);
    setCurrentSegmentIdx(0);
    setSecondsRemaining(selectedDuration * 60);
    setIsCompleted(false);
  };

  const handleNextSegment = () => {
    if (currentSegmentIdx < session.segments.length - 1) {
      setCurrentSegmentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      setIsRunning(false);
    }
  };

  const handleClose = () => {
    setIsRunning(false);
    setIsCompleted(false);
    onClose();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const activeSegment = session.segments[currentSegmentIdx] || session.segments[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              ⏱️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isRunning ? 'Focused Study Session' : 'Study Session Mode'}
              </h3>
              <p className="text-xs text-slate-500">
                {isRunning ? `Active sprint • ${session.title}` : 'How much time do you have right now?'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isRunning && !isCompleted ? (
            <div className="space-y-6">
              {/* Duration Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Duration</label>
                <div className="grid grid-cols-5 gap-2">
                  {([10, 20, 30, 45, 60] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDuration(d)}
                      className={`py-3 px-2 rounded-2xl border text-center font-bold transition-all ${
                        selectedDuration === d
                          ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-500/20 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="text-base sm:text-lg">{d}</div>
                      <div className="text-[10px] text-slate-400 font-medium">min</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Planned Schedule Breakdown */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-900">{session.title}</span>
                  <Badge variant="brand" size="sm">{selectedDuration} Minutes Total</Badge>
                </div>

                <div className="space-y-2">
                  {session.segments.map((seg, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{idx + 1}. {seg.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{seg.description}</div>
                      </div>
                      <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                        {seg.durationMinutes} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                onClick={handleStart}
                className="w-full font-bold shadow-md shadow-purple-500/20 py-3 text-sm flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" /> Start Focused Session
              </Button>
            </div>
          ) : isRunning && !isCompleted ? (
            <div className="space-y-6 text-center py-2">
              {/* Active Timer Display */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-900 to-slate-900 text-white shadow-xl space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-purple-200 text-xs font-semibold">
                  Segment {currentSegmentIdx + 1} of {session.segments.length}: {activeSegment.title}
                </span>
                <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-white pt-2">
                  {formatTime(secondsRemaining)}
                </div>
                <p className="text-xs text-purple-200">{activeSegment.description}</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2">
                {session.segments.map((seg, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSegmentIdx
                        ? 'w-12 bg-purple-600'
                        : idx < currentSegmentIdx
                        ? 'w-6 bg-emerald-500'
                        : 'w-6 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsRunning(false);
                    onClose();
                  }}
                >
                  Quit Session
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNextSegment}
                  className="font-bold flex items-center gap-1.5"
                >
                  {currentSegmentIdx < session.segments.length - 1 ? (
                    <>Next Segment <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Finish Session <CheckCircle2 className="w-4 h-4" /></>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            /* Session Completed Summary */
            <div className="py-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-xs">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Study Session Completed!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  You successfully maintained focused preparation for <strong>{selectedDuration} minutes</strong> across {session.segments.length} targeted segments.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                🎯 Progress logged to your daily study streak and weekly preparation summary.
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <Button variant="outline" onClick={handleClose}>
                  Done
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsCompleted(false);
                    setIsRunning(false);
                  }}
                  className="font-bold"
                >
                  Another Session
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
