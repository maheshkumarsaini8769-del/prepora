import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  GraduationCap,
  Wrench,
  FileText,
  AlertCircle,
  AlertTriangle,
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
  ChevronRight,
  Tv,
  Sun,
  Moon,
  Bot,
  Check,
  BookMarked,
  Compass
} from 'lucide-react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { NotificationDropdown } from '../components/common/NotificationDropdown';
import { InstallAppBanner } from '../components/common/InstallAppBanner';
import { soundFeedback } from '../utils/audioFeedback';
import { getColorMode, toggleColorMode, ColorMode } from '../utils/theme';

// Code-split heavy modals so questions, formulas & syllabus are NOT loaded on initial page load
const GlobalQuickActionModal = React.lazy(() =>
  import('../components/common/GlobalQuickActionModal').then((m) => ({ default: m.GlobalQuickActionModal }))
);
const StudySessionModal = React.lazy(() =>
  import('../components/common/StudySessionModal').then((m) => ({ default: m.StudySessionModal }))
);
const StudentFeedbackModal = React.lazy(() =>
  import('../components/common/StudentFeedbackModal').then((m) => ({ default: m.StudentFeedbackModal }))
);
const StudentGuideModal = React.lazy(() =>
  import('../components/common/StudentGuideModal').then((m) => ({ default: m.StudentGuideModal }))
);

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [studySessionOpen, setStudySessionOpen] = useState(false);
  const [reportTechOpen, setReportTechOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>(() => getColorMode());

  useEffect(() => {
    const handleOpenGuide = () => setGuideModalOpen(true);
    window.addEventListener('prepora:open_student_guide', handleOpenGuide);
    return () => window.removeEventListener('prepora:open_student_guide', handleOpenGuide);
  }, []);

  useEffect(() => {
    const handleColorModeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ColorMode>;
      if (customEvent.detail) {
        setColorMode(customEvent.detail);
      }
    };
    window.addEventListener('prepora-colormode-change', handleColorModeChange);
    return () => window.removeEventListener('prepora-colormode-change', handleColorModeChange);
  }, []);

  const handleToggleColorMode = () => {
    const next = toggleColorMode();
    setColorMode(next);
  };

  const { user: authUser, isAuthenticated, logout, setAuthModalOpen, setAuthModalMode } = useAuth();
  const user = authUser || userService.getProfile();
  const [unreadCount, setUnreadCount] = useState<number>(() => userService.getNotifications().filter(n => !n.isRead).length);

  useEffect(() => {
    const handleNotifsUpdate = () => {
      setUnreadCount(userService.getNotifications().filter(n => !n.isRead).length);
    };
    window.addEventListener('prepora:notifications_updated', handleNotifsUpdate);

    // Sync real-time notifications sent from Admin
    userService.syncServerNotifications();
    const syncTimer = setInterval(() => {
      userService.syncServerNotifications();
    }, 25000);

    return () => {
      window.removeEventListener('prepora:notifications_updated', handleNotifsUpdate);
      clearInterval(syncTimer);
    };
  }, []);

  const [dailyGoalCelebration, setDailyGoalCelebration] = useState<{ open: boolean; goal: number; exam: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoalReached = (e: Event) => {
      const ce = e as CustomEvent<{ goal: number; exam: string }>;
      if (ce.detail) {
        soundFeedback.playSuccess();
        setDailyGoalCelebration({ open: true, goal: ce.detail.goal, exam: ce.detail.exam });
      }
    };
    window.addEventListener('prepora:daily_goal_reached', handleGoalReached);
    return () => window.removeEventListener('prepora:daily_goal_reached', handleGoalReached);
  }, []);

  // Task 5 Minimal Navigation Hierarchy: 5 Core Primary + Secondary Tools
  const primaryNav = [
    { name: 'Home', path: '/', icon: Home, subtitle: "Today's priority & plan" },
    { name: 'Practice', path: '/practice', icon: BookOpen, subtitle: 'Topic-wise problem sets' },
    { name: 'Tests', path: '/tests', icon: GraduationCap, subtitle: 'Mocks & previous papers' },
    { name: 'Doubts', path: '/doubts', icon: HelpCircle, subtitle: 'AI tutor & mentor answers' },
    { name: 'Mistakes', path: '/mistakes', icon: AlertCircle, subtitle: 'Error log & blind retries' },
  ];

  const secondaryNav = [
    { name: 'Lectures', path: '/lectures', icon: Tv },
    { name: 'Formula Sheet', path: '/formula-sheet', icon: BookMarked },
    { name: 'Study Search', path: '/search', icon: Search },
    { name: 'Performance', path: '/performance', icon: BarChart2 },
    { name: 'Revision', path: '/revision', icon: Repeat },
    { name: 'Missed Topics', path: '/backlog', icon: AlertTriangle },
    { name: 'Mind Map', path: '/mind-map', icon: Sparkles },
    { name: 'Previous Papers', path: '/papers', icon: FileText },
    { name: 'Study Planner', path: '/planner', icon: Calendar },
    { name: 'AI Teacher', path: '/tutor', icon: Sparkles },
    { name: 'Syllabus', path: '/syllabus', icon: Layers },
    { name: 'Readiness', path: '/readiness', icon: Award }
  ];

  const [moreOpen, setMoreOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#080d12] flex flex-col md:flex-row font-sans text-slate-800 dark:text-slate-100 transition-colors relative overflow-x-hidden">
      {/* Global Ambient Emerald Atmosphere - Soft Green Glow Across All Pages */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-96 h-96 sm:w-[560px] sm:h-[560px] bg-emerald-400/12 dark:bg-emerald-500/8 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-teal-400/10 dark:bg-teal-500/6 rounded-full blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 sm:w-[520px] sm:h-[520px] bg-emerald-500/10 dark:bg-emerald-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Desktop Left Sidebar - Clean Minimal Monochrome */}
      <aside className="hidden md:flex flex-col w-64 bg-white/95 dark:bg-[#0c131a]/95 backdrop-blur-md border-r border-slate-200/90 dark:border-slate-800/80 fixed inset-y-0 left-0 z-30">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              P
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                PREPORA
              </span>
              <span className="block text-[9px] font-bold tracking-widest text-slate-400 uppercase -mt-0.5">
                Academic Command
              </span>
            </div>
          </Link>
        </div>

        {/* Minimal Streak & Target Badge (Exam switcher moved to Settings as requested) */}
        <div className="mx-3.5 my-3 p-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{user.streakDays || 6} Day Streak</span>
          </div>
          <span
            className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md"
          >
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
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Secondary Tools Group */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
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
                        ? 'bg-slate-200/80 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
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
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="grid grid-cols-2 gap-1">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
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
                  isActive ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
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
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10">
        {/* Top Navbar */}
        <header className="h-16 bg-white/90 dark:bg-[#0c131a]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 px-3 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
          {/* Mobile Brand, Hamburger & Exam Switcher Pill (Exact Match to Reference Screenshot) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                P
              </div>
              <span className="font-black text-base tracking-tight text-slate-900 dark:text-white">PREPORA</span>
            </Link>

            {/* Fixed Target Exam Badge (Set at registration / configurable in Settings) */}
            <span
              className="inline-flex items-center px-2 py-0.5 ml-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-black tracking-tight"
              title="Target Exam (Change in Settings)"
            >
              {user.targetExam || 'JEE'}
            </span>
          </div>

          {/* Desktop Search / Quick Action Trigger */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs text-slate-400 font-medium transition-all"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-500" />
                <span>Search topics, formulas, chapters, lectures...</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Controls: Dark/Bright Mode, Notifications, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Dark / Light Mode Switcher (Moon/Sun) - Instant 1-click on top bar */}
            <button
              type="button"
              onClick={handleToggleColorMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={`Switch to ${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Dark/Light Mode"
            >
              {colorMode === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Student Guide Button (Desktop only) */}
            <button
              onClick={() => {
                soundFeedback.playClick();
                window.dispatchEvent(new CustomEvent('prepora:open_student_guide'));
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-all shadow-xs cursor-pointer"
              title="How to Use PREPORA Guide"
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Guide</span>
            </button>

            {/* Quick Action Button */}
            <button
              onClick={() => setStudySessionOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick Sprint</span>
            </button>

            {/* Notifications Bell Dropdown Tray */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  soundFeedback.playClick();
                  setNotifDropdownOpen(prev => !prev);
                }}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              <NotificationDropdown
                isOpen={notifDropdownOpen}
                onClose={() => setNotifDropdownOpen(false)}
                onUnreadChange={setUnreadCount}
              />
            </div>

            {/* Profile Avatar / Auth [M] Green Circle */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-emerald-500/50 transition-all"
                  aria-label="User Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white font-black text-xs flex items-center justify-center shadow-xs ring-2 ring-emerald-500/30">
                    {(user.name || 'Mahesh').charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.name || 'Mahesh'}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                  }}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer hidden sm:block"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold shadow-xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </header>

        {/* Dynamic Page Content with Responsive Padding & Bottom Spacing for Floating Mobile Nav */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-28 md:pb-8 max-w-7xl mx-auto w-full">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[45vh] py-12 animate-in fade-in duration-100">
                <div className="flex flex-col items-center gap-2.5">
                  <div className="w-7 h-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] font-bold text-slate-400">Loading...</span>
                </div>
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </main>
      </div>

      {/* Floating Modern Mobile App Dock (Matching Reference App Architecture) */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto w-full max-w-md bg-white/95 dark:bg-[#0c141d]/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800/90 px-3 py-1.5 rounded-3xl flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
          {/* 1. Home */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2.5 rounded-2xl transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/70' : ''}`}>
                  <Home className={`w-5 h-5 ${isActive ? 'fill-emerald-600/20 text-emerald-600 dark:text-emerald-400' : ''}`} />
                </div>
                <span>Home</span>
              </>
            )}
          </NavLink>

          {/* 2. PYQs */}
          <NavLink
            to="/papers"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2.5 rounded-2xl transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/70' : ''}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span>PYQs</span>
              </>
            )}
          </NavLink>

          {/* 3. Center Elevated Action: Mock Test */}
          <NavLink
            to="/tests"
            className="flex flex-col items-center -mt-5 group"
          >
            {({ isActive }) => (
              <>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
                  isActive
                    ? 'bg-emerald-500 shadow-emerald-500/40 ring-4 ring-white dark:ring-[#0c141d]'
                    : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/35 ring-4 ring-white dark:ring-[#0c141d]'
                }`}>
                  <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className={`text-[10px] font-extrabold mt-0.5 ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'
                }`}>
                  Mock Test
                </span>
              </>
            )}
          </NavLink>

          {/* 4. Practice */}
          <NavLink
            to="/practice"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2.5 rounded-2xl transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/70' : ''}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <span>Practice</span>
              </>
            )}
          </NavLink>

          {/* 5. Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-[10px] font-bold py-1 px-2.5 rounded-2xl transition-all ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-emerald-50 dark:bg-emerald-950/70' : ''}`}>
                  <User className="w-5 h-5" />
                </div>
                <span>Profile</span>
              </>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Mobile Drawer (When Hamburger is Clicked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#0c131a] text-slate-800 dark:text-slate-100 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 border-r border-slate-200 dark:border-slate-800">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  P
                </div>
                <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight">PREPORA</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Color Mode & Target Exam Quick Info */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Target:</span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{user.targetExam || 'JEE'} {user.classLevel ? `Class ${user.classLevel}` : '2026'}</span>
              </div>
              <button
                type="button"
                onClick={handleToggleColorMode}
                className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                {colorMode === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                <span className="text-[11px]">{colorMode === 'dark' ? 'Dark' : 'Light'}</span>
              </button>
            </div>

            {/* Mobile Nav Links Grouped into Clean Hubs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
              {/* How to Use Guide */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('prepora:open_student_guide'));
                }}
                className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>How to Use PREPORA</span>
                </div>
                <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black">4 Steps</span>
              </button>

              {/* 1. Core Practice Hub */}
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                  Core Study
                </span>
                {[
                  { name: 'Home', path: '/', icon: Home },
                  { name: 'Chapter Practice', path: '/practice', icon: BookOpen },
                  { name: 'Mock Test Center', path: '/tests', icon: GraduationCap },
                  { name: 'Official PYQs', path: '/papers', icon: FileText },
                  { name: 'My Profile & Stats', path: '/profile', icon: User }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all ${
                          isActive
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* 2. Smart Prep & Analysis */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                  Smart Tools
                </span>
                {[
                  { name: 'Mistake Book & Retries', path: '/mistakes', icon: AlertCircle, badge: 'High Yield' },
                  { name: 'Doubt Solver AI', path: '/doubts', icon: HelpCircle },
                  { name: 'Formula & Short Notes', path: '/formula-sheet', icon: BookMarked },
                  { name: 'Smart Revision', path: '/revision', icon: Repeat },
                  { name: 'Video Lectures', path: '/lectures', icon: Tv },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
                        <span className="truncate font-semibold">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              {/* 3. Tracking & Curriculum */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                  Tracking & Planning
                </span>
                {[
                  { name: 'Syllabus Tracker', path: '/syllabus', icon: Layers },
                  { name: 'Performance Analytics', path: '/performance', icon: BarChart2 },
                  { name: 'Exam Readiness Score', path: '/readiness', icon: Award },
                  { name: 'Study Planner', path: '/planner', icon: Calendar },
                  { name: 'Mind Maps', path: '/mind-map', icon: Sparkles }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" />
                      <span className="truncate font-semibold">{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {(user.name || 'M').charAt(0)}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-800 dark:text-slate-200">{user.name || 'Mahesh'}</div>
                  <div className="text-[10px] text-slate-400">{user.targetExam || 'JEE'} Aspirant</div>
                </div>
              </div>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals (Loaded on-demand only when triggered) */}
      {quickActionOpen && (
        <React.Suspense fallback={null}>
          <GlobalQuickActionModal
            isOpen={quickActionOpen}
            onClose={() => setQuickActionOpen(false)}
          />
        </React.Suspense>
      )}
      {studySessionOpen && (
        <React.Suspense fallback={null}>
          <StudySessionModal
            isOpen={studySessionOpen}
            onClose={() => setStudySessionOpen(false)}
          />
        </React.Suspense>
      )}
      {/* Daily Goal Completed Celebration Modal */}
      {dailyGoalCelebration?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0e1620] rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border border-emerald-500/40 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-3xl animate-bounce">
              🎉
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Daily Goal Completed!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Congratulations {user.name.split(' ')[0]}! Today's daily goal of <strong>{dailyGoalCelebration.goal} questions</strong> is complete. Your consistency brings you one step closer to cracking <strong>{dailyGoalCelebration.exam}</strong>! 🚀
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDailyGoalCelebration(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Keep Learning
            </button>
          </div>
        </div>
      )}

      {/* Student Feedback & Mistake Reporting System */}
      <React.Suspense fallback={null}>
        <StudentFeedbackModal />
      </React.Suspense>

      {/* Global Student Orientation Guide Modal */}
      {guideModalOpen && (
        <React.Suspense fallback={null}>
          <StudentGuideModal
            isOpen={guideModalOpen}
            onClose={() => setGuideModalOpen(false)}
          />
        </React.Suspense>
      )}

      {/* PWA Mobile Install Prompt */}
      <InstallAppBanner />
    </div>
  );
};
