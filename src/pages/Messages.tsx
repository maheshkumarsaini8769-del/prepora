import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  ShieldAlert, 
  Trash2, 
  Check, 
  MoreVertical,
  Flag,
  UserX,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { ecosystemService } from '../services/ecosystemService';
import { MessageThread, ChatMessage } from '../types';

export const Messages: React.FC = () => {
  const [threads, setThreads] = useState<MessageThread[]>(() => ecosystemService.getMessageThreads());
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [inputText, setInputText] = useState<string>('');
  const [attachQuestionSnippet, setAttachQuestionSnippet] = useState<string | null>(null);

  // Safety options modal / state
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !attachQuestionSnippet) return;

    const attached = attachQuestionSnippet ? {
      id: 'phy-11-003',
      subject: 'Physics' as const,
      chapter: 'Kinematics',
      snippet: attachQuestionSnippet
    } : undefined;

    const updated = ecosystemService.sendMessage(activeThread.id, inputText, attached);
    setThreads([...updated]);
    setInputText('');
    setAttachQuestionSnippet(null);
  };

  const handleReport = (msgId: string) => {
    ecosystemService.reportMessage(msgId);
    setReportSuccess('Message has been flagged for administrative review.');
    setTimeout(() => setReportSuccess(null), 3500);
  };

  const handleBlock = (threadId: string) => {
    ecosystemService.blockThread(threadId);
    const updated = ecosystemService.getMessageThreads();
    setThreads(updated);
    if (updated.length > 0) setActiveThreadId(updated[0].id);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Academic Communication</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Messages & Guidance</h1>
        </div>

        {reportSuccess && (
          <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            {reportSuccess}
          </div>
        )}
      </div>

      {/* Main 2-Column Chat Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[640px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Left: Contact Threads List */}
        <div className="border-r border-slate-100 flex flex-col h-full bg-slate-50/50">
          <div className="p-4 border-b border-slate-100 bg-white">
            <h3 className="font-bold text-sm text-slate-800">Direct Inquiries</h3>
            <p className="text-[11px] text-slate-400">Moderated safe communication channels</p>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {threads.map(t => {
              const isSelected = t.id === activeThreadId;
              const lastMsg = t.messages[t.messages.length - 1];

              return (
                <button
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected ? 'bg-purple-100/70 border border-purple-200' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {t.contactName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{t.contactName}</h4>
                      <span className="text-[10px] text-slate-400">{t.lastMessageTimestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {lastMsg ? lastMsg.text : 'No messages yet'}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-purple-700 bg-white px-2 py-0.2 rounded-md border border-purple-100">
                      {t.role}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-100 bg-white text-[11px] text-slate-400 text-center">
            🔒 End-to-end moderated student channel
          </div>
        </div>

        {/* Right: Active Chat Conversation */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs">
                    {activeThread.contactName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{activeThread.contactName}</h3>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active Academic Counselor
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleBlock(activeThread.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors flex items-center gap-1"
                    title="Block Conversation"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/20">
                {activeThread.messages.map(m => {
                  const isMe = m.sender === 'student';

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      {/* Attached Question Preview */}
                      {m.attachedQuestion && (
                        <div className="max-w-md p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs mb-1">
                          <span className="font-bold text-purple-900 block mb-0.5">
                            Attached Question #{m.attachedQuestion.id} ({m.attachedQuestion.subject})
                          </span>
                          <p className="text-slate-700 italic line-clamp-2">
                            "{m.attachedQuestion.snippet}"
                          </p>
                        </div>
                      )}

                      {/* Bubble */}
                      <div className="flex items-end gap-1 group">
                        {!isMe && (
                          <button
                            onClick={() => handleReport(m.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                            title="Report Message"
                          >
                            <Flag className="w-3 h-3" />
                          </button>
                        )}

                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-md shadow-xs leading-relaxed ${
                            isMe
                              ? 'bg-purple-600 text-white rounded-br-xs font-medium'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>

                      <span className="text-[10px] text-slate-400 px-1">
                        {m.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Question Attachment Banner if selected */}
              {attachQuestionSnippet && (
                <div className="p-2.5 mx-4 mb-2 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs">
                  <span className="truncate text-purple-900 font-medium">
                    Attached: <em>"{attachQuestionSnippet}"</em>
                  </span>
                  <button
                    onClick={() => setAttachQuestionSnippet(null)}
                    className="text-slate-400 hover:text-rose-600 font-bold ml-2"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Message Input Box */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAttachQuestionSnippet('Kinematics Projectile Question #phy-11-003: A projectile launched at angle θ...')}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                  title="Attach Question Reference"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type your academic query or message..."
                  className="flex-1 p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600"
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!inputText.trim() && !attachQuestionSnippet}
                  className="font-bold flex items-center gap-1 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </Button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-slate-400 text-sm">
              Select a conversation to begin
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
