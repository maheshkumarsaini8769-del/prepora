import React, { useState } from 'react';
import { HelpCircle, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Modal, Button } from './UIComponents';
import { ecosystemService } from '../../services/ecosystemService';
import { SubjectName, Question } from '../../types';
import { useNavigate } from 'react-router-dom';

interface AskDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionContext?: Question | null | {
    id: string;
    question: string;
    chapter?: string;
    topic?: string;
    subject?: SubjectName;
  };
  initialSubject?: SubjectName;
}

export const AskDoubtModal: React.FC<AskDoubtModalProps> = ({
  isOpen,
  onClose,
  questionContext,
  initialSubject
}) => {
  const navigate = useNavigate();
  const [doubtText, setDoubtText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;

    const sub: SubjectName = questionContext?.subject || initialSubject || 'Physics';
    const ch = questionContext?.chapter || 'General Doubt';

    ecosystemService.askDoubt(
      sub,
      ch,
      doubtText,
      questionContext ? {
        id: questionContext.id,
        snippet: questionContext.question,
        topic: questionContext.topic
      } : undefined
    );

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setDoubtText('');
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title="Ask an Academic Doubt"
      footer={
        !submitted ? (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!doubtText.trim()}
              className="font-bold flex items-center gap-1.5 shadow-md shadow-purple-500/20"
            >
              <Send className="w-3.5 h-3.5" /> Submit Doubt
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={handleResetAndClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleResetAndClose();
                navigate('/doubts');
              }}
              className="font-bold flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Open Doubt Center
            </Button>
          </div>
        )
      }
    >
      {!submitted ? (
        <div className="space-y-4 py-1">
          {questionContext && (
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-900">
                <span>Attached Question: #{questionContext.id}</span>
                <span>{questionContext.subject} • {questionContext.chapter}</span>
              </div>
              <p className="text-xs text-slate-700 line-clamp-2 italic font-medium">
                "{questionContext.question}"
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              What part of this question or concept is unclear?
            </label>
            <textarea
              value={doubtText}
              onChange={e => setDoubtText(e.target.value)}
              placeholder="e.g. I understand the initial kinetic energy equation, but why is work done by friction negative here? How do we calculate normal force on the incline?"
              className="w-full h-28 p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 resize-none"
              autoFocus
            />
          </div>

          <p className="text-[11px] text-slate-400">
            Your doubt will be submitted to the Prepora Academic Doubt Center with your question context automatically attached.
          </p>
        </div>
      ) : (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Doubt Submitted Successfully!</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your doubt has been linked to <strong>{questionContext?.chapter || 'your study records'}</strong>. A step-by-step resolution has been prepared for your review.
          </p>
        </div>
      )}
    </Modal>
  );
};
