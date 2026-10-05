import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ExamLayout } from './layouts/ExamLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Pages & Route Guard (Eagerly loaded for instant auth feedback)
import { Login } from './pages/Login';
import { AuthCallback } from './pages/AuthCallback';
import { Onboarding } from './pages/Onboarding';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRouteGuard } from './components/auth/AdminRouteGuard';
import { OAuthCallbackWatcher } from './components/auth/OAuthCallbackWatcher';

import { AuthProvider } from './context/AuthContext';
import { NetworkBanner } from './components/common/NetworkBanner';
import { AuthModal } from './components/auth/AuthModal';

function lazyPage<T extends React.ComponentType<any>>(
  importer: () => Promise<any>,
  name: string
): React.LazyExoticComponent<T> {
  return lazy(() => importer().then((m: any) => ({ default: m[name] || m.default })));
}

// Route-Based Code Splitting via React.lazy for Lightning-Fast Initial Load
const Home = lazyPage(() => import('./pages/Home'), 'Home');
const Practice = lazyPage(() => import('./pages/Practice'), 'Practice');
const PracticeSession = lazyPage(() => import('./pages/PracticeSession'), 'PracticeSession');
const TestCenter = lazyPage(() => import('./pages/TestCenter'), 'TestCenter');
const TestInstructions = lazyPage(() => import('./pages/TestInstructions'), 'TestInstructions');
const ExamSession = lazyPage(() => import('./pages/ExamSession'), 'ExamSession');
const TestResult = lazyPage(() => import('./pages/TestResult'), 'TestResult');
const TestReview = lazyPage(() => import('./pages/TestReview'), 'TestReview');
const BuildMyTest = lazyPage(() => import('./pages/BuildMyTest'), 'BuildMyTest');
const Papers = lazyPage(() => import('./pages/Papers'), 'Papers');
const PaperDetail = lazyPage(() => import('./pages/PaperDetail'), 'PaperDetail');
const ChapterDetail = lazyPage(() => import('./pages/ChapterDetail'), 'ChapterDetail');
const MistakeBook = lazyPage(() => import('./pages/MistakeBook'), 'MistakeBook');
const FixMyWeakness = lazyPage(() => import('./pages/FixMyWeakness'), 'FixMyWeakness');
const SmartRevision = lazyPage(() => import('./pages/SmartRevision'), 'SmartRevision');
const FormulaNotesHub = lazyPage(() => import('./pages/FormulaNotesHub'), 'FormulaNotesHub');
const Performance = lazyPage(() => import('./pages/Performance'), 'Performance');
const Bookmarks = lazyPage(() => import('./pages/Bookmarks'), 'Bookmarks');
const Notes = lazyPage(() => import('./pages/Notes'), 'Notes');
const GlobalSearch = lazyPage(() => import('./pages/GlobalSearch'), 'GlobalSearch');
const Notifications = lazyPage(() => import('./pages/Notifications'), 'Notifications');
const Profile = lazyPage(() => import('./pages/Profile'), 'Profile');
const Settings = lazyPage(() => import('./pages/Settings'), 'Settings');
const DoubtCenter = lazyPage(() => import('./pages/DoubtCenter'), 'DoubtCenter');
const Messages = lazyPage(() => import('./pages/Messages'), 'Messages');
const Leaderboard = lazyPage(() => import('./pages/Leaderboard'), 'Leaderboard');
const WeeklyReportPage = lazyPage(() => import('./pages/WeeklyReportPage'), 'WeeklyReportPage');

// Extended Learning Pages
const SyllabusTracker = lazyPage(() => import('./pages/SyllabusTracker'), 'SyllabusTracker');
const StudyPlanner = lazyPage(() => import('./pages/StudyPlanner'), 'StudyPlanner');
const GoalsPage = lazyPage(() => import('./pages/GoalsPage'), 'GoalsPage');
const ResourceHub = lazyPage(() => import('./pages/ResourceHub'), 'ResourceHub');
const SpeedPracticePage = lazyPage(() => import('./pages/SpeedPracticePage'), 'SpeedPracticePage');
const AdaptivePracticePage = lazyPage(() => import('./pages/AdaptivePracticePage'), 'AdaptivePracticePage');
const HelpCenter = lazyPage(() => import('./pages/HelpCenter'), 'HelpCenter');
const StudyHub = lazyPage(() => import('./pages/StudyHub'), 'StudyHub');
const DailyPlanPage = lazyPage(() => import('./pages/DailyPlanPage'), 'DailyPlanPage');
const ExamReadinessPage = lazyPage(() => import('./pages/ExamReadinessPage'), 'ExamReadinessPage');
const AITeacherPage = lazyPage(() => import('./pages/AITeacherPage'), 'AITeacherPage');
const MindMapPage = lazyPage(() => import('./pages/MindMapPage'), 'MindMapPage');
const VideoLecturesPage = lazyPage(() => import('./pages/VideoLecturesPage'), 'VideoLecturesPage');

// Admin Pages (Loaded ONLY on demand when admin routes are visited)
const AdminDashboard = lazyPage(() => import('./pages/admin/AdminDashboard'), 'AdminDashboard');
const AdminStudents = lazyPage(() => import('./pages/admin/AdminStudents'), 'AdminStudents');
const AdminUsers = lazyPage(() => import('./pages/admin/AdminUsers'), 'AdminUsers');
const AdminContentHierarchy = lazyPage(() => import('./pages/admin/AdminContentHierarchy'), 'AdminContentHierarchy');
const AdminQuestions = lazyPage(() => import('./pages/admin/AdminQuestions'), 'AdminQuestions');
const AdminTests = lazyPage(() => import('./pages/admin/AdminTests'), 'AdminTests');
const AdminPapers = lazyPage(() => import('./pages/admin/AdminPapers'), 'AdminPapers');
const AdminAIStudio = lazyPage(() => import('./pages/admin/AdminAIStudio'), 'AdminAIStudio');
const AdminAIFactory = lazyPage(() => import('./pages/admin/AdminAIFactory'), 'AdminAIFactory');
const AdminAnalytics = lazyPage(() => import('./pages/admin/AdminAnalytics'), 'AdminAnalytics');
const AdminReports = lazyPage(() => import('./pages/admin/AdminReports'), 'AdminReports');
const AdminSystemSecurity = lazyPage(() => import('./pages/admin/AdminSystemSecurity'), 'AdminSystemSecurity');
const AdminSettingsPage = lazyPage(() => import('./pages/admin/AdminSettingsPage'), 'AdminSettingsPage');
const AdminAuthorityPage = lazyPage(() => import('./pages/admin/AdminAuthorityPage'), 'AdminAuthorityPage');
const AdminLectureDiscovery = lazyPage(() => import('./pages/admin/AdminLectureDiscovery'), 'AdminLectureDiscovery');

const PageFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh] p-8">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold text-slate-500 tracking-wide">Loading PREPORA...</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NetworkBanner />
      <BrowserRouter>
        <AuthModal />
        <OAuthCallbackWatcher />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login defaultTab="register" />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* First Login Preparation Setup (Protected) */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

            {/* Full-Screen Exam Hall Routes (Protected) */}
            <Route element={<ProtectedRoute><ExamLayout /></ProtectedRoute>}>
              <Route path="/tests/:id/start" element={<ExamSession />} />
            </Route>

            {/* Standard Layout Application Routes (Protected: Login Mandated Before Website Access) */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              {/* Core Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              
              {/* Practice Flow */}
              <Route path="/practice" element={<Practice />} />
              <Route path="/bank" element={<Navigate to="/practice" replace />} />
              <Route path="/question-bank" element={<Navigate to="/practice" replace />} />
              <Route path="/practice/session" element={<PracticeSession />} />
              <Route path="/practice/:id" element={<PracticeSession />} />
              <Route path="/speed-practice" element={<SpeedPracticePage />} />
              <Route path="/adaptive" element={<AdaptivePracticePage />} />

              {/* Test Center & Examination Flow */}
              <Route path="/tests" element={<TestCenter />} />
              <Route path="/tests/:id/instructions" element={<TestInstructions />} />
              <Route path="/tests/:id/result" element={<TestResult />} />
              <Route path="/tests/:id/review" element={<TestReview />} />
              <Route path="/build-test" element={<BuildMyTest />} />
              <Route path="/builder" element={<Navigate to="/build-test" replace />} />
              <Route path="/tests/build" element={<Navigate to="/build-test" replace />} />

              {/* Papers, Chapters & Syllabus */}
              <Route path="/papers" element={<Papers />} />
              <Route path="/papers/:id" element={<PaperDetail />} />
              <Route path="/chapters/:id" element={<ChapterDetail />} />
              <Route path="/lectures" element={<VideoLecturesPage />} />
              <Route path="/videos" element={<VideoLecturesPage />} />
              <Route path="/video-lectures" element={<Navigate to="/lectures" replace />} />
              <Route path="/study-hub" element={<StudyHub />} />
              <Route path="/syllabus" element={<SyllabusTracker />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/study-planner" element={<Navigate to="/planner" replace />} />
              <Route path="/daily-plan" element={<DailyPlanPage />} />
              <Route path="/readiness" element={<ExamReadinessPage />} />
              <Route path="/tutor" element={<AITeacherPage />} />
              <Route path="/ai-teacher" element={<AITeacherPage />} />
              <Route path="/mind-map" element={<MindMapPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/resources" element={<ResourceHub />} />
              <Route path="/help" element={<HelpCenter />} />

              {/* Learning Enhancement Loop */}
              <Route path="/mistakes" element={<MistakeBook />} />
              <Route path="/weakness" element={<FixMyWeakness />} />
              <Route path="/revision" element={<SmartRevision />} />
              <Route path="/formula-sheet" element={<FormulaNotesHub />} />
              <Route path="/formula-notes" element={<FormulaNotesHub />} />
              <Route path="/formulas" element={<Navigate to="/formula-sheet" replace />} />
              <Route path="/short-notes" element={<Navigate to="/formula-sheet" replace />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/weekly-report" element={<WeeklyReportPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />

              {/* Productivity & Communication Tools */}
              <Route path="/doubts" element={<DoubtCenter />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/search" element={<GlobalSearch />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            {/* Dedicated Admin Control Center Layout (Strict Super Admin Whitelist Guard) */}
            <Route element={<AdminRouteGuard><AdminLayout /></AdminRouteGuard>}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/authority" element={<AdminAuthorityPage />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/content" element={<AdminContentHierarchy />} />
              <Route path="/admin/lectures" element={<AdminLectureDiscovery />} />
              <Route path="/admin/questions" element={<AdminQuestions />} />
              <Route path="/admin/tests" element={<AdminTests />} />
              <Route path="/admin/papers" element={<AdminPapers />} />
              <Route path="/admin/ai-factory" element={<AdminAIFactory />} />
              <Route path="/admin/ai" element={<AdminAIStudio />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/system" element={<AdminSystemSecurity />} />
              <Route path="/admin/security" element={<AdminSystemSecurity />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/help" element={<AdminSettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};
