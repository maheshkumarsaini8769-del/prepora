import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  Wrench,
  FileText,
  AlertCircle,
  Zap,
  Repeat,
  BarChart2,
  Bookmark,
  FileEdit,
  User,
  Search,
  Bell,
  Settings,
  Shield,
  Menu,
  X,
  Flame,
  HelpCircle,
  MessageSquare,
  Layers,
  Award,
  Calendar,
  Sparkles,
  Plus,
  LogIn,
  LogOut,
  Target,
  ChevronRight
} from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { GlobalQuickActionModal } from '../components/common/GlobalQuickActionModal';
import { StudySessionModal } from '../components/common/StudySessionModal';
import { ReportTechnicalProblemModal } from '../components/common/ReportTechnicalProblemModal';
import { ThemeSelector } from '../components/common/ThemeSelector';

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [studySessionOpen, setStudySessionOpen] = useState(false);
  const [reportTechOpen, setReportTechOpen] = useState(false);

  const { user: authUser, isAuthenticated, logout, setAuthModalOpen, setAuthModalMode } = useAuth();
  const user = authUser || userService.getProfile();
  const unreadNotifs = userService.getNotifications().filter(n => !n.isRead).length;
  const navigate = useNavigate();

  // Task 5 Minimal Navigation Hierarchy: 5 Core Primary + Secondary Tools
  const primaryNav = [
    { name: 'Home', path: '/', icon: Home, subtitle: "Today's priority & plan" },
    { name: 'Practice', path: '/practice', icon: BookOpen, subtitle: 'Topic-wise problem sets' },
    { name: 'Tests', path: '/tests', icon: GraduationCap, subtitle: 'Mocks & previous papers' },
    { name: 'Doubts', path: '/doubts', icon: HelpCircle, subtitle: 'AI tutor & mentor answers' },
    { name: 'Mistakes', path: '/mistakes', icon: AlertCircle, subtitle: 'Error log & blind retries' },
  ];

  const secondaryNav = [
    { name: 'Performance', path: '/performance', icon: BarChart2 },
    { name: 'Revision', path: '/revision', icon: Repeat },
    { name: 'Mind Map', path: '/mind-map', icon: Sparkles },
    { name: 'Previous Papers', path: '/papers', icon: FileText },
    { name: 'Study Planner', path: '/planner', icon: Calendar },
    { name: 'AI Teacher', path: '/tutor', icon: Sparkles },
    { name: 'Syllabus', path: '/syllabus', icon: Layers },
    { name: 'Readiness', path: '/readiness', icon: Award }
  ];

  const [moreOpen, setMoreOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Desktop Left Sidebar - Clean Minimal Monochrome */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 fixed inset-y-0 left-0 z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm">
              P
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-slate-900">
                PREPORA
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-slate-400 uppercase -mt-0.5">
                Academic Command
              </span>
            </div>
          </Link>
        </div>

        {/* Minimal Streak & Target Pill */}
        <div className="mx-3.5 my-3 p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-slate-700 fill-slate-700" />
            <span className="text-xs font-bold text-slate-800">{user.streakDays || 1} Day Streak</span>
          </div>
          <span className="text-[10px] font-extrabold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
            {user.targetExam || 'JEE'}
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-4 text-xs">
          {/* 5 Core Primary Nav Items */}
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Primary
            </div>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Secondary Tools Group */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600"
            >
              <span>More Tools</span>
              <span className="text-[10px] lowercase text-slate-400 font-normal">{moreOpen ? 'hide' : 'show'}</span>
            </button>
            {moreOpen && secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? 'bg-slate-200/80 text-slate-900 font-bold'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Profile & Settings Quick Jump */}
        <div className="p-3 border-t border-slate-100 flex-shrink-0 bg-slate-50/70">
          <div className="grid grid-cols-2 gap-1">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-white'
                }`
              }
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-white'
                }`
              }
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-3 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          {/* Mobile Brand & Hamburger */}
          <div className="flex items-center gap-2.5 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-xs">
                P
              </div>
              <span className="font-black text-base tracking-tight text-slate-900">PREPORA</span>
            </Link>
          </div>

          {/* Desktop Search / Quick Action Trigger */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <button
              type="button"
              onClick={() => setQuickActionOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 border border-slate-200/60 text-xs text-slate-400 font-medium transition-all"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search questions, chapters, formulas...</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-slate-200 text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls: Target Exam, Start Sprint, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Theme Color Switcher */}
            <ThemeSelector />

            {/* Target Exam Switcher / Tag */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-50 text-brand-700 border border-brand-200/70 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Target: {user.targetExam || 'JEE'} {user.targetYear || 2026}</span>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setStudySessionOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm shadow-brand-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick Sprint</span>
            </button>

            {/* Notifications Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </Link>

            {/* Profile Avatar / Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-emerald-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {(user.name || 'Student').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-700 max-w-[100px] truncate">
                    {user.name || 'Student'}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 text-white hover:bg-brand-700 text-xs font-bold shadow-xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Page Content with Responsive Padding & Bottom Spacing for Mobile Nav */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Sticky, App-like, Thumb-Friendly) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 py-2 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <BookOpen className="w-5 h-5" />
          <span>Practice</span>
        </NavLink>
        <NavLink
          to="/tests"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <GraduationCap className="w-5 h-5" />
          <span>Tests</span>
        </NavLink>
        <NavLink
          to="/doubts"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <HelpCircle className="w-5 h-5" />
          <span>Doubts</span>
        </NavLink>
        <NavLink
          to="/mistakes"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-[11px] font-bold py-1 px-2.5 rounded-xl transition-all ${
              isActive ? 'text-slate-900 font-black' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <AlertCircle className="w-5 h-5" />
          <span>Mistakes</span>
        </NavLink>
      </nav>

      {/* Mobile Drawer (When Hamburger is Clicked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  P
                </div>
                <span className="font-black text-lg text-slate-900 tracking-tight">PREPORA</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Theme Switcher Bar */}
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Color Theme</span>
              <ThemeSelector compact />
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
                  Primary
                </span>
                {primaryNav.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white font-bold'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block">
                  More Tools
                </span>
                {secondaryNav.map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-slate-200 text-slate-900 font-bold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-800 font-bold flex items-center justify-center text-xs">
                  {(user.name || 'S').charAt(0)}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800">{user.name || 'Student'}</div>
                  <div className="text-[10px] text-slate-400">{user.targetExam || 'JEE'} Aspirant</div>
                </div>
              </div>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <GlobalQuickActionModal
        isOpen={quickActionOpen}
        onClose={() => setQuickActionOpen(false)}
      />
      <StudySessionModal
        isOpen={studySessionOpen}
        onClose={() => setStudySessionOpen(false)}
      />
      <ReportTechnicalProblemModal
        isOpen={reportTechOpen}
        onClose={() => setReportTechOpen(false)}
      />
    </div>
  );
};
