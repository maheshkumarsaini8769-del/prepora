import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { soundFeedback } from '../utils/audioFeedback';

export interface ChatMessage {
  id: string;
  sender: 'student' | 'admin' | 'system';
  text: string;
  timestamp: string;
  status?: string;
  category?: string;
  meta?: any;
}

export interface PopupReplyAlert {
  id: string;
  title: string;
  replyText: string;
  timestamp: string;
}

interface ReportChatContextType {
  isChatOpen: boolean;
  isWidgetVisible: boolean;
  unreadCount: number;
  messages: ChatMessage[];
  popupAlert: PopupReplyAlert | null;
  openReportChat: (initialReport?: { title?: string; message: string; questionId?: string; reason?: string }) => void;
  closeChat: () => void;
  minimizeChat: () => void;
  dismissPopupAlert: () => void;
  sendChatMessage: (text: string) => Promise<boolean>;
  clearThread: () => void;
  resolveChat: () => Promise<void>;
  isResolved: boolean;
}

const ReportChatContext = createContext<ReportChatContextType | undefined>(undefined);

const CHAT_STORAGE_KEY = 'prepora_report_chat_thread';
const KNOWN_REPLIES_KEY = 'prepora_known_admin_replies';
const CHAT_RESOLVED_KEY = 'prepora_report_chat_resolved';

export const ReportChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isWidgetVisible, setIsWidgetVisible] = useState<boolean>(() => {
    // If user previously submitted a report or has saved messages, show the floating corner bubble
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      return Boolean(saved && JSON.parse(saved).length > 0);
    }
    return false;
  });

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [popupAlert, setPopupAlert] = useState<PopupReplyAlert | null>(null);

  const [isResolved, setIsResolved] = useState<boolean>(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(CHAT_RESOLVED_KEY) === 'true';
    }
    return false;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  // Sync messages to localStorage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
    if (messages.length > 0) {
      setIsWidgetVisible(true);
    }
  }, [messages]);

  // Open Chat with or without initial report
  const openReportChat = useCallback(
    (initialReport?: { title?: string; message: string; questionId?: string; reason?: string }) => {
      soundFeedback.playClick();
      setIsWidgetVisible(true);
      setIsChatOpen(true);
      setUnreadCount(0);
      if (initialReport) {
        setIsResolved(false);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(CHAT_RESOLVED_KEY);
        }
        const studentMsgText = initialReport.questionId
          ? `[Question #${String(initialReport.questionId).slice(-6)} • ${initialReport.reason || 'Issue'}]: ${initialReport.message}`
          : `[Report • ${initialReport.reason || 'General'}]: ${initialReport.message}`;

        const studentMsg: ChatMessage = {
          id: `msg-st-${Date.now()}`,
          sender: 'student',
          text: studentMsgText,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          category: initialReport.reason || 'Report',
          meta: { questionId: initialReport.questionId }
        };

        const ackMsg: ChatMessage = {
          id: `msg-sys-${Date.now() + 1}`,
          sender: 'system',
          text: '✅ Your report has been dispatched to our faculty and support team. We will review and reply right here in this chat thread.',
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, studentMsg, ackMsg]);
      }
    },
    []
  );

  const closeChat = useCallback(() => {
    soundFeedback.playClick();
    setIsChatOpen(false);
    // Keep widget visible in bottom-right corner as requested:
    // "jb deke nhi ya cancel per click tb right coner me dik ta rehe"
    setIsWidgetVisible(true);
  }, []);

  const minimizeChat = useCallback(() => {
    soundFeedback.playClick();
    setIsChatOpen(false);
    setIsWidgetVisible(true);
  }, []);

  const dismissPopupAlert = useCallback(() => {
    setPopupAlert(null);
  }, []);

  const clearThread = useCallback(() => {
    setMessages([]);
    setUnreadCount(0);
    setPopupAlert(null);
    setIsChatOpen(false);
    setIsWidgetVisible(false);
    setIsResolved(false);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      localStorage.removeItem(KNOWN_REPLIES_KEY);
      localStorage.removeItem(CHAT_RESOLVED_KEY);
    }
  }, []);

  const resolveChat = useCallback(async () => {
    soundFeedback.playSuccess();
    setIsResolved(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(CHAT_RESOLVED_KEY, 'true');
    }

    const resolvedSysMsg: ChatMessage = {
      id: `msg-sys-${Date.now()}`,
      sender: 'system',
      text: '✅ This chat has been marked as RESOLVED. Problem solved successfully!',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Resolved'
    };
    setMessages((prev) => [...prev, resolvedSysMsg]);

    try {
      const studentPhone = user?.phone || user?.mobile || (typeof localStorage !== 'undefined' ? localStorage.getItem('prepora_user_phone') : '') || '';
      await fetch('/api/feedback/resolve-thread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: studentPhone,
          note: 'Problem solved and chat marked resolved by user',
          adminEmail: 'support@prepora.internal'
        })
      });
    } catch {}
  }, [user]);

  // Send message in existing thread
  const sendChatMessage = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text.trim()) return false;
      const cleanText = text.trim();
      soundFeedback.playClick();

      const newMsg: ChatMessage = {
        id: `msg-st-${Date.now()}`,
        sender: 'student',
        text: cleanText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, newMsg]);

      // Post to backend feedback endpoint
      try {
        const studentPhone = user.phone || user.mobile || localStorage.getItem('prepora_user_phone') || '';
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id || 'anonymous',
            userName: user.name || 'Student',
            userPhone: studentPhone,
            userEmail: user.email || '',
            type: 'GENERAL',
            category: 'Support Chat',
            title: `[Live Chat] ${cleanText.slice(0, 30)}...`,
            description: cleanText,
            pageUrl: window.location.pathname
          })
        });
        return true;
      } catch (err) {
        console.warn('Failed to sync chat message with server:', err);
        return true;
      }
    },
    [user]
  );

  // Background Polling for Admin Replies
  useEffect(() => {
    const studentPhone = user.phone || user.mobile || (typeof localStorage !== 'undefined' ? localStorage.getItem('prepora_user_phone') : null);
    if (!studentPhone && !user.id) return;

    const checkReplies = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (studentPhone) queryParams.set('phone', studentPhone);
        if (user.id) queryParams.set('userId', user.id);

        const res = await fetch(`/api/feedback/mine?${queryParams.toString()}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.success && Array.isArray(data.feedbacks)) {
          let knownSet = new Set<string>();
          if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem(KNOWN_REPLIES_KEY);
            if (raw) knownSet = new Set(JSON.parse(raw));
          }

          let hasNewReply = false;
          let latestReply: PopupReplyAlert | null = null;
          const repliesToAdd: ChatMessage[] = [];

          for (const fb of data.feedbacks) {
            if (fb.adminReply && fb.adminReply.trim()) {
              const replyKey = `${fb.id}-${fb.adminReply.trim()}`;
              if (!knownSet.has(replyKey)) {
                knownSet.add(replyKey);
                hasNewReply = true;

                const replyMsg: ChatMessage = {
                  id: `reply-${fb.id}-${Date.now()}`,
                  sender: 'admin',
                  text: fb.adminReply.trim(),
                  timestamp: new Date(fb.repliedAt || Date.now()).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }),
                  status: fb.status || 'Resolved'
                };
                repliesToAdd.push(replyMsg);

                latestReply = {
                  id: fb.id,
                  title: fb.title || 'Support Report',
                  replyText: fb.adminReply.trim(),
                  timestamp: 'Just now'
                };
              }
            }
          }

          if (hasNewReply) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(KNOWN_REPLIES_KEY, JSON.stringify(Array.from(knownSet)));
            }

            setMessages((prev) => {
              // Avoid duplicate messages
              const existingTexts = new Set(prev.map((m) => m.text));
              const uniqueNew = repliesToAdd.filter((r) => !existingTexts.has(r.text));
              return [...prev, ...uniqueNew];
            });

            setIsWidgetVisible(true);

            // If chat is not open, trigger popup alert and increase unread badge
            if (!isChatOpen) {
              soundFeedback.playSuccess();
              setUnreadCount((c) => c + 1);
              if (latestReply) {
                setPopupAlert(latestReply);
              }
            }
          }
        }
      } catch (err) {
        // Non-fatal
      }
    };

    checkReplies();
    const timer = setInterval(checkReplies, 7000);
    return () => clearInterval(timer);
  }, [user, isChatOpen]);

  return (
    <ReportChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ReportChatContext.Provider>
  );
};

export const useReportChat = (): ReportChatContextType => {
  const context = useContext(ReportChatContext);
  if (!context) {
    throw new Error('useReportChat must be used within a ReportChatProvider');
  }
  return context;
};
