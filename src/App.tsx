import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ExamLayout } from './layouts/ExamLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Page Imports
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';
import { PracticeSession } from './pages/PracticeSession';
import { TestCenter } from './pages/TestCenter';
import { TestInstructions } from './pages/TestInstructions';
import { ExamSession } from './pages/ExamSession';
import { TestResult } from './pages/TestResult';
import { TestReview } from './pages/TestReview';
import { BuildMyTest } from './pages/BuildMyTest';
import { Papers } from './pages/Papers';
import { PaperDetail } from './pages/PaperDetail';
import { ChapterDetail } from './pages/ChapterDetail';
import { MistakeBook } from './pages/MistakeBook';
import { FixMyWeakness } from './pages/FixMyWeakness';
import { SmartRevision } from './pages/SmartRevision';
import { Performance } from './pages/Performance';
import { Bookmarks } from './pages/Bookmarks';
import { Notes } from './pages/Notes';
import { GlobalSearch } from './pages/GlobalSearch';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { DoubtCenter } from './pages/DoubtCenter';
import { Messages } from './pages/Messages';
import { Leaderboard } from './pages/Leaderboard';
import { WeeklyReportPage } from './pages/WeeklyReportPage';

// Task 4 Pages
import { SyllabusTracker } from './pages/SyllabusTracker';
import { StudyPlanner } from './pages/StudyPlanner';
import { GoalsPage } from './pages/GoalsPage';
import { ResourceHub } from './pages/ResourceHub';
import { SpeedPracticePage } from './pages/SpeedPracticePage';
import { AdaptivePracticePage } from './pages/AdaptivePracticePage';
import { HelpCenter } from './pages/HelpCenter';
import { StudyHub } from './pages/StudyHub';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminContentHierarchy } from './pages/admin/AdminContentHierarchy';
import { AdminQuestions } from './pages/admin/AdminQuestions';
import { AdminTests } from './pages/admin/AdminTests';
import { AdminPapers } from './pages/admin/AdminPapers';
import { AdminAIStudio } from './pages/admin/AdminAIStudio';
import { AdminAIFactory } from './pages/admin/AdminAIFactory';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminReports } from './pages/admin/AdminReports';
import { AdminSystemSecurity } from './pages/admin/AdminSystemSecurity';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { AuthProvider } from './context/AuthContext';
import { NetworkBanner } from './components/common/NetworkBanner';
import { AuthModal } from './components/auth/AuthModal';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <NetworkBanner />
      <AuthModal />
      <BrowserRouter>
        <Routes>
          {/* Full-Screen Exam Hall Routes */}
          <Route element={<ExamLayout />}>
            <Route path="/tests/:id/start" element={<ExamSession />} />
          </Route>

        {/* Standard Layout Application Routes */}
        <Route element={<MainLayout />}>
          {/* Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          
          {/* Practice Flow */}
          <Route path="/practice" element={<Practice />} />
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

          {/* Papers, Chapters & Syllabus */}
          <Route path="/papers" element={<Papers />} />
          <Route path="/papers/:id" element={<PaperDetail />} />
          <Route path="/chapters/:id" element={<ChapterDetail />} />
          <Route path="/study-hub" element={<StudyHub />} />
          <Route path="/syllabus" element={<SyllabusTracker />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/help" element={<HelpCenter />} />

          {/* Learning Enhancement Loop */}
          <Route path="/mistakes" element={<MistakeBook />} />
          <Route path="/weakness" element={<FixMyWeakness />} />
          <Route path="/revision" element={<SmartRevision />} />
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

        {/* Dedicated Admin Control Center Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/content" element={<AdminContentHierarchy />} />
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
    </BrowserRouter>
  </AuthProvider>
  );
};
