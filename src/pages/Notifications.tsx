import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  BookOpen,
  Repeat,
  Award,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(() => userService.getNotifications());

  const handleMarkRead = (id: string, actionUrl?: string) => {
    userService.markNotificationAsRead(id);
    setNotifs(userService.getNotifications());
    if (actionUrl) navigate(actionUrl);
  };

  const handleMarkAllRead = () => {
    userService.markAllNotificationsAsRead();
    setNotifs(userService.getNotifications());
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Notification Center</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Alerts regarding revision reminders, daily streaks, and test results</p>
        </div>

        <Button size="sm" variant="outline" onClick={handleMarkAllRead} className="text-xs dark:border-slate-700 dark:text-slate-300">
          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {notifs.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
              !n.isRead
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-600/40 shadow-xs'
                : 'bg-white dark:bg-[#0e1620] border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
              {n.type === 'practice' && <BookOpen className="w-4 h-4" />}
              {n.type === 'revision' && <Repeat className="w-4 h-4" />}
              {n.type === 'achievement' && <Award className="w-4 h-4" />}
              {n.type === 'test' && <CheckCircle2 className="w-4 h-4" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{n.title}</span>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {!n.isRead && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
              {n.actionUrl && (
                <button
                  type="button"
                  onClick={() => handleMarkRead(n.id, n.actionUrl)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline p-0 font-bold flex items-center gap-0.5"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}

        {notifs.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-[#0e1620] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <Bell className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Notifications</h3>
            <p className="text-xs text-slate-500">You are completely up to date!</p>
          </div>
        )}
      </div>
    </div>
  );
};
