import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  BookOpen,
  Repeat,
  Award,
  ArrowRight,
  Trash2,
  X
} from 'lucide-react';
import { Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { soundFeedback } from '../utils/audioFeedback';
import { NotificationItem } from '../types';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState<NotificationItem[]>(() => userService.getNotifications());
  const [filter, setFilter] = useState<'all' | 'unread' | 'practice' | 'revision' | 'test'>('all');

  const refreshNotifs = () => {
    setNotifs(userService.getNotifications());
  };

  useEffect(() => {
    window.addEventListener('prepora:notifications_updated', refreshNotifs);
    return () => window.removeEventListener('prepora:notifications_updated', refreshNotifs);
  }, []);

  const handleMarkRead = (id: string, actionUrl?: string) => {
    soundFeedback.playClick();
    userService.markNotificationAsRead(id);
    refreshNotifs();
    if (actionUrl) navigate(actionUrl);
  };

  const handleMarkAllRead = () => {
    soundFeedback.playClick();
    userService.markAllNotificationsAsRead();
    refreshNotifs();
  };

  const handleDelete = (id: string) => {
    soundFeedback.playClick();
    userService.deleteNotification(id);
    refreshNotifs();
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all notifications?')) {
      soundFeedback.playClick();
      userService.clearAllNotifications();
      refreshNotifs();
    }
  };

  const unreadCount = notifs.filter((n) => !n.isRead).length;

  const filteredNotifs = notifs.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'practice') return n.type === 'practice';
    if (filter === 'revision') return n.type === 'revision';
    if (filter === 'test') return n.type === 'test';
    return true;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Notification Center
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-black">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time academic alerts, revision schedules, streak tracking & mock exam readiness
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleMarkAllRead}
              className="text-xs dark:border-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark all read</span>
            </Button>
          )}
          {notifs.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Clear all notifications"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear all</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { key: 'all', label: 'All', count: notifs.length },
          { key: 'unread', label: 'Unread', count: unreadCount },
          { key: 'practice', label: 'Practice & Goals', count: notifs.filter((n) => n.type === 'practice').length },
          { key: 'revision', label: 'Revision', count: notifs.filter((n) => n.type === 'revision').length },
          { key: 'test', label: 'Tests', count: notifs.filter((n) => n.type === 'test').length },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
              filter === tab.key
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                filter === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications Cards */}
      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            className={`group p-4 rounded-2xl border transition-all flex items-start gap-3.5 shadow-xs ${
              !n.isRead
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-600/40'
                : 'bg-white dark:bg-[#0e1620] border-slate-200/90 dark:border-slate-800'
            }`}
          >
            {/* Icon */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              {n.type === 'practice' && <BookOpen className="w-4 h-4" />}
              {n.type === 'revision' && <Repeat className="w-4 h-4" />}
              {n.type === 'achievement' && <Award className="w-4 h-4 text-amber-500" />}
              {n.type === 'test' && <CheckCircle2 className="w-4 h-4" />}
              {!n.type && <Bell className="w-4 h-4" />}
            </div>

            {/* Body */}
            <div className="flex-1 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {n.title}
                </span>
                <span className="text-[11px] text-slate-400 shrink-0 font-medium">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {n.message}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                {!n.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(n.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded-md transition-opacity cursor-pointer"
                  title="Delete notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {n.actionUrl && (
                <button
                  type="button"
                  onClick={() => handleMarkRead(n.id, n.actionUrl)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline p-0 font-bold flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredNotifs.length === 0 && (
          <div className="text-center py-14 bg-white dark:bg-[#0e1620] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Notifications in this Filter</h3>
            <p className="text-xs text-slate-500">You are completely up to date with your studies!</p>
          </div>
        )}
      </div>
    </div>
  );
};
