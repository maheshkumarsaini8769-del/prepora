import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  HelpCircle,
  CheckSquare,
  FileText,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Server,
  ShieldCheck,
  Settings,
  BookOpen,
  ArrowLeft,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  UploadCloud,
  FileCheck2,
  FolderTree,
  SlidersHorizontal,
  Compass,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminRole, setAdminRole] = useState<string>('SUPER ADMIN');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [stats, setStats] = useState<{ pendingReviews: number; pendingReports: number; dbStatus: string }>({
    pendingReviews: 0,
    pendingReports: 0,
    dbStatus: 'Connected'
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStats({
            pendingReviews: data.data.content?.pendingQuestions || 0,
            pendingReports: (data.data.reports?.pendingQuestionReports || 0) + (data.data.reports?.pendingTechnicalReports || 0),
            dbStatus: data.data.system?.database === 'Operational' ? 'Connected' : 'Offline'
          });
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  // Simplified 3-Zone Navigation
  interface NavItem {
    name: string;
    path: string;
    icon: any;
    desc: string;
    badge?: string;
    badgeColor?: string;
  }

  interface NavSection {
    title: string;
    subtitle: string;
    items: NavItem[];
  }

  const navSections: NavSection[] = [
    {
      title: 'CORE OPERATIONS',
      subtitle: 'Question & Test Management',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, desc: 'Overview & key metrics' },
        { name: 'AI Content Factory', path: '/admin/ai-factory', icon: UploadCloud, badge: 'PDF', desc: 'Generate questions from PDF' },
        { name: 'Questions Bank', path: '/admin/questions', icon: HelpCircle, badge: stats.pendingReviews > 0 ? `${stats.pendingReviews}` : undefined, desc: 'Question repository & review' },
        { name: 'Tests & Mock Papers', path: '/admin/tests', icon: FileCheck2, desc: 'Mock test builder & blueprints' },
        { name: 'Previous Year Papers', path: '/admin/papers', icon: FileText, desc: 'PYQ papers & solutions' },
      ]
    },
    {
      title: 'STUDENTS & QUALITY',
      subtitle: 'Students & Quality Assurance',
      items: [
        { name: 'Students Directory', path: '/admin/students', icon: Users, desc: 'Student profiles & progress' },
        { name: 'Reports & Doubts', path: '/admin/reports', icon: AlertTriangle, badge: stats.pendingReports > 0 ? `${stats.pendingReports}` : undefined, badgeColor: 'bg-rose-500', desc: 'Reported disputes & doubts' },
        { name: 'Analytics & Insights', path: '/admin/analytics', icon: BarChart3, desc: 'Performance & telemetry data' },
      ]
    },
    {
      title: 'SYSTEM & SETTINGS',
      subtitle: 'System & Platform Settings',
      items: [
        { name: 'Syllabus & Hierarchy', path: '/admin/content', icon: FolderTree, desc: 'Curriculum & subject tree' },
        { name: 'AI Studio Prompting', path: '/admin/ai', icon: Sparkles, desc: 'AI prompt engineering studio' },
        { name: 'Admin Authority', path: '/admin/authority', icon: KeyRound, badge: 'Whitelist', badgeColor: 'bg-slate-700', desc: 'Authorized admin emails & access' },
        { name: 'Security & Admins', path: '/admin/security', icon: ShieldCheck, desc: 'Admin permissions & RBAC' },
        { name: 'System Status', path: '/admin/system', icon: Server, desc: 'Database & server telemetry' },
        { name: 'Settings', path: '/admin/settings', icon: Settings, desc: 'Platform configurations' },
      ]
    }
  ];

  const adminRoles = [
    { name: 'SUPER ADMIN', color: 'bg-rose-600' },
    { name: 'CONTENT ADMIN', color: 'bg-slate-700' },
    { name: 'TEST ADMIN', color: 'bg-slate-800' },
    { name: 'REVIEWER', color: 'bg-amber-600' },
    { name: 'SUPPORT ADMIN', color: 'bg-emerald-600' },
    { name: 'ANALYTICS ADMIN', color: 'bg-blue-600' }
  ];

  const renderNavLinks = (onItemClick?: () => void) => (
    <div className="space-y-6">
      {navSections.map((section, sIdx) => (
        <div key={sIdx} className="space-y-1">
          <div className="px-3 pb-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>{section.title}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{section.subtitle}</div>
          </div>
          {section.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onItemClick}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 ring-1 ring-brand-500/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-brand-400'}`} />
                      <div className="truncate">
                        <div className="truncate font-bold leading-tight">{item.name}</div>
                        <div className={`text-[10px] leading-tight truncate mt-0.5 ${isActive ? 'text-brand-100' : 'text-slate-500'}`}>{item.desc}</div>
                      </div>
                    </div>
                    {item.badge && (
                      <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-black shrink-0 ${item.badgeColor || 'bg-brand-500'} text-white shadow`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Bar */}
      <header className="shrink-0 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-40">
        {/* Left: Brand + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-brand-600/30">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black tracking-tight text-white text-lg">PREPORA</span>
                <span className="px-1.5 py-0.5 text-[9px] font-black rounded uppercase bg-brand-500/20 text-brand-400 border border-brand-500/30 tracking-wider">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Admin Control Center</p>
            </div>
          </Link>
        </div>

        {/* Center: System Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stats.dbStatus === 'Connected' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${stats.dbStatus === 'Connected' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </span>
          <span className="text-slate-300 font-semibold">MongoDB Atlas:</span>
          <span className={`font-bold ${stats.dbStatus === 'Connected' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {stats.dbStatus}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-[11px]">Server: 100% OK</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-750 transition"
            >
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span className="hidden sm:inline">{adminRole}</span>
              <span className="sm:hidden">ROLE</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-800">
                  Switch Role Persona
                </div>
                {adminRoles.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => {
                      setAdminRole(r.name);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-800 transition ${
                      adminRole === r.name ? 'text-brand-400 bg-brand-500/10' : 'text-slate-300'
                    }`}
                  >
                    <span>{r.name}</span>
                    {adminRole === r.name && <span className="text-[10px] font-bold">ACTIVE</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition"
              title="Admin Alerts"
            >
              <Bell className="w-4 h-4" />
              {(stats.pendingReports > 0 || stats.pendingReviews > 0) && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {stats.pendingReports + stats.pendingReviews}
                </span>
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs animate-in fade-in zoom-in-95">
                <div className="font-bold text-slate-200 pb-2 border-b border-slate-800 flex justify-between items-center">
                  <span>System Alerts</span>
                  <span className="text-[10px] text-brand-400 font-semibold">Live</span>
                </div>
                <div className="py-2 space-y-2">
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700/50 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">Pending Student Reports</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{stats.pendingReports} reports awaiting resolution</div>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-800/80 border border-slate-700/50 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-200">Questions Awaiting Review</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{stats.pendingReviews} items ready for verification</div>
                    </div>
                  </div>
                </div>
                <Link
                  to="/admin/reports"
                  onClick={() => setNotifDropdownOpen(false)}
                  className="block text-center pt-2 text-[11px] font-bold text-brand-400 hover:text-brand-300"
                >
                  View Reports Center →
                </Link>
              </div>
            )}
          </div>

          {/* Student Portal Switcher */}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition shadow-md shadow-brand-600/30"
          >
            <span className="hidden sm:inline">Student App</span>
            <span className="sm:hidden">App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden min-h-0 w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 flex-col shrink-0 h-full min-h-0 overflow-hidden select-none">
          {/* User badge */}
          <div className="p-4 border-b border-slate-800 shrink-0 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
                AD
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm text-slate-200 truncate">{user?.name || 'Administrator'}</div>
                <div className="text-[11px] text-brand-400 font-semibold truncate">{adminRole}</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 min-h-0 overscroll-contain custom-scrollbar">
            {renderNavLinks()}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 space-y-1 shrink-0 bg-slate-900/80">
            <Link
              to="/"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Student Website</span>
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Slide-over Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-72 max-w-full bg-slate-900 border-r border-slate-800 flex flex-col h-full z-50">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center font-bold text-white text-xs">P</div>
                  <div>
                    <span className="font-black text-white text-sm">PREPORA ADMIN</span>
                    <p className="text-[10px] text-slate-400">Admin Navigation</p>
                  </div>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-3 min-h-0 overscroll-contain custom-scrollbar">
                {renderNavLinks(() => setMobileOpen(false))}
              </nav>

              <div className="p-3 border-t border-slate-800 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Student Website</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto h-full min-h-0 bg-slate-950 p-4 sm:p-6 lg:p-8 overscroll-contain custom-scrollbar focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
