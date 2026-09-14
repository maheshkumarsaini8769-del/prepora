import React from 'react';
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
  const notifs = userService.getNotifications();

  const handleMarkRead = (id: string, actionUrl?: string) => {
    userService.markNotificationAsRead(id);
    if (actionUrl) navigate(actionUrl);
    else window.location.reload();
  };

  const handleMarkAllRead = () => {
    userService.markAllNotificationsAsRead();
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notification Center</h1>
          <p className="text-xs text-slate-500 mt-0.5">Alerts regarding revision reminders, daily streaks, and test results</p>
        </div>

        <Button size="sm" variant="outline" onClick={handleMarkAllRead} className="text-xs">
          <CheckCheck className="w-3.5 h-3.5" /> Mark all read
        </Button>
      </div>

      <div className="space-y-3">
        {notifs.map((n) => (
          <Card
            key={n.id}
            className={`p-4 transition-all flex items-start gap-3.5 ${
              !n.isRead ? 'bg-brand-50/40 border-brand-200' : 'bg-white'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-slate-100 text-brand-600 flex-shrink-0 mt-0.5">
              {n.type === 'practice' && <BookOpen className="w-4 h-4" />}
              {n.type === 'revision' && <Repeat className="w-4 h-4" />}
              {n.type === 'achievement' && <Award className="w-4 h-4" />}
              {n.type === 'test' && <CheckCircle2 className="w-4 h-4" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{n.title}</span>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>

            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {!n.isRead && (
                <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              )}
              {n.actionUrl && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleMarkRead(n.id, n.actionUrl)}
                  className="text-xs text-brand-600 p-0 font-semibold"
                >
                  View →
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
