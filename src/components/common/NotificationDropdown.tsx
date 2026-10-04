import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  BookOpen,
  Repeat,
  Award,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';
import { userService } from '../../services/userService';
import { soundFeedback } from '../../utils/audioFeedback';
import { NotificationItem } from '../../types';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onUnreadChange?: (count: number) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onUnreadChange
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notifs, setNotifs] = useState<NotificationItem[]>(() => userService.getNotifications());

  const refreshNotifs = () => {
    const list = userService.getNotifications();
    setNotifs(list);
    const unread = list.filter(n => !n.isRead).length;
    if (onUnreadChange) onUnreadChange(unread);
  };

  useEffect(() => {
    if (isOpen) {
      refreshNotifs();
    }
  }, [isOpen]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (n: NotificationItem) => {
    soundFeedback.playClick();
    userService.markNotificationAsRead(n.id);
    refreshNotifs();
    onClose();
    if (n.actionUrl) {
      navigate(n.actionUrl);
    }
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFeedback.playClick();
    userService.markAllNotificationsAsRead();
    refreshNotifs();
  };

  if (!isOpen) return null;

  const previewList = notifs.slice(0, 4);
  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-[#0c141d] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150"
    >
      {/* Header */}
      <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Bell className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-xs text-slate-900 dark:text-white">
            Notifications
          </span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 bg-emerald-500 text-white font-black text-[10px] rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <CheckCheck className="w-3 h-3" />
              <span>Mark read</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
        {previewList.map((n) => (
          <div
            key={n.id}
            onClick={() => handleItemClick(n)}
            className={`p-3 transition-colors cursor-pointer flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
              !n.isRead ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
            }`}
          >
            {/* Type Icon */}
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
              {n.type === 'practice' && <BookOpen className="w-3.5 h-3.5" />}
              {n.type === 'revision' && <Repeat className="w-3.5 h-3.5" />}
              {n.type === 'achievement' && <Award className="w-3.5 h-3.5" />}
              {n.type === 'test' && <CheckCircle2 className="w-3.5 h-3.5" />}
              {!n.type && <Bell className="w-3.5 h-3.5" />}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {n.title}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {n.message}
              </p>
            </div>

            {/* Unread indicator */}
            {!n.isRead && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
            )}
          </div>
        ))}

        {previewList.length === 0 && (
          <div className="p-8 text-center text-slate-400 space-y-1">
            <Bell className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600" />
            <div className="text-xs font-semibold">No notifications yet</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-center">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
        >
          <span>View All Notifications</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
};
