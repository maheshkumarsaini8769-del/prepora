import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Minus,
  Sparkles,
  Headphones,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  CornerDownLeft,
  Trash2
} from 'lucide-react';
import { useReportChat } from '../../context/ReportChatContext';
import { soundFeedback } from '../../utils/audioFeedback';

export const ReportChatFloatingWidget: React.FC = () => {
  const {
    isChatOpen,
    isWidgetVisible,
    unreadCount,
    messages,
    popupAlert,
    openReportChat,
    closeChat,
    minimizeChat,
    dismissPopupAlert,
    sendChatMessage,
    clearThread,
    resolveChat,
    isResolved
  } = useReportChat();

  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || sending) return;

    setSending(true);
    const textToSend = input;
    setInput('');

    await sendChatMessage(textToSend);
    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. POPUP REPLY ALERT TOAST (Appears immediately when Admin replies)       */}
      {/* ========================================================================= */}
      {popupAlert && !isChatOpen && (
        <div className="fixed top-4 sm:top-5 right-4 sm:right-5 left-4 sm:left-auto z-[9999] max-w-sm sm:w-full animate-in slide-in-from-top-4 duration-300">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 text-slate-900 dark:text-white space-y-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500" />
            
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Admin Reply Received!
                  </div>
                  <h4 className="text-xs font-bold leading-tight">
                    Prepora Academic Support
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={dismissPopupAlert}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl border border-slate-100 dark:border-slate-800 italic font-medium">
              "{popupAlert.replyText}"
            </p>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => openReportChat()}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>View Full Chat</span>
              </button>

              <button
                type="button"
                onClick={dismissPopupAlert}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING BOTTOM-RIGHT CORNER BUBBLE WIDGET                             */}
      {/* ========================================================================= */}
      {isWidgetVisible && !isChatOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[990] flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
          {/* Unread speech pill */}
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => openReportChat()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-xl border border-slate-700/50 cursor-pointer hover:scale-105 transition"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
              <span>Admin replied! ({unreadCount})</span>
            </button>
          )}

          {/* Floating Action Button */}
          <button
            type="button"
            onClick={() => openReportChat()}
            title="Open Report & Support Chat"
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-600 hover:scale-105 active:scale-95 text-white shadow-2xl shadow-emerald-600/40 flex items-center justify-center transition cursor-pointer group"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />

            {/* Red Unread Notification Badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[20px] h-5 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md animate-bounce">
                {unreadCount}
              </span>
            )}

            {/* Pulse Ring when there are unread messages */}
            {unreadCount > 0 && (
              <span className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping opacity-75 pointer-events-none" />
            )}
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FULL REPORT & SUPPORT CHAT MODAL / DOCKED WINDOW                       */}
      {/* ========================================================================= */}
      {isChatOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[995] flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-0 animate-in fade-in zoom-in-95 duration-200">
          {/* Backdrop on mobile */}
          <div 
            className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={minimizeChat} 
          />
          <div className="relative w-full sm:w-[420px] h-[88vh] sm:h-[580px] max-h-[92vh] bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Chat Window Header */}
            <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <h3 className="text-xs font-black flex items-center gap-1.5 leading-tight">
                    <span>Prepora Faculty Support</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </h3>
                  <div className="text-[10px] text-slate-300 font-medium">
                    Report Issue & Live Chat Thread
                  </div>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1.5">
                {/* Resolve Chat Button */}
                {!isResolved ? (
                  <button
                    type="button"
                    onClick={resolveChat}
                    title="Mark this chat/problem as resolved"
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Chat</span>
                  </button>
                ) : (
                  <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Resolved</span>
                  </span>
                )}

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={minimizeChat}
                  title="Minimize to Corner"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                {/* Close Button (Also docks to corner as requested) */}
                <button
                  type="button"
                  onClick={closeChat}
                  title="Close (Available in bottom-right corner)"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Resolved Status Banner */}
            {isResolved && (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 px-3.5 py-2 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in">
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Chat Resolved! Problem solve ho chuki hai.</span>
                </span>
                <button
                  type="button"
                  onClick={clearThread}
                  className="text-[10px] underline font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 cursor-pointer"
                >
                  Clear & Close
                </button>
              </div>
            )}

            {/* Chat Message Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-[#080d12]">
              {messages.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    No Messages in this Thread
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Type a message below to ask questions about your reported issue. Our team is active.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  if (msg.sender === 'system') {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400 font-medium">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isStudent = msg.sender === 'student';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      {/* Sender Tag */}
                      <span className="text-[10px] font-bold text-slate-400 px-1">
                        {isStudent ? 'You (Student)' : 'Prepora Academic Team 👨‍🏫'}
                      </span>

                      {/* Bubble */}
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                          isStudent
                            ? 'bg-emerald-600 text-white rounded-br-xs shadow-md shadow-emerald-600/20 font-medium'
                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-xs shadow-sm border border-slate-200 dark:border-slate-700/80'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Timestamp */}
                      <span className="text-[9px] text-slate-400 font-mono px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
              {[
                'Thank you! 🙏',
                'Please check Option C',
                'Typo in explanation',
                'Need more steps'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setInput(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium shrink-0 transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Footer */}
            <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Press Enter to Send)"
                  rows={1}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || sending}
                  className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition cursor-pointer shadow-sm shadow-emerald-600/30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
                <span>💬 Messages are directly linked to your report ticket.</span>
                <div className="flex items-center gap-3">
                  {!isResolved && (
                    <button
                      type="button"
                      onClick={resolveChat}
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Resolve Chat</span>
                    </button>
                  )}
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={clearThread}
                      className="text-slate-400 hover:text-rose-500 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear chat</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportChatFloatingWidget;
