import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Settings as SettingsIcon,
  Flame,
  CheckCircle2,
  Award,
  BookOpen
} from 'lucide-react';
import { Card, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();
  const solvedCounts = userService.getSubjectSolvedCounts();
  const totalSolved = Object.values(solvedCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-200 pb-28 px-1 sm:px-4">
      {/* Profile Header Card */}
      <Card className="p-5 sm:p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shadow-xs"
          />

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate">{profile.name}</h1>
              <span className="text-[11px] font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800">
                Aspirant
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {profile.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs font-bold">
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-xl">
                Class {profile.classLevel}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-xl">
                Target: {profile.targetExam} {profile.targetYear || 2026}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/settings')}
            className="text-xs font-bold py-1.5 px-3.5 rounded-2xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
          >
            <SettingsIcon className="w-3.5 h-3.5 mr-1" /> Settings
          </Button>
        </div>
      </Card>

      {/* Progress & 2x2 Metric Cards (Matching Reference App) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* 1. Questions Solved */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/60">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {totalSolved}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
              Questions Solved
            </div>
          </div>
        </div>

        {/* 2. Overall Accuracy */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200/60 dark:border-emerald-800/60">
            <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {profile.overallAccuracy || 78}%
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
              Overall Accuracy
            </div>
          </div>
        </div>

        {/* 3. Tests Completed */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200/60 dark:border-purple-800/60">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {profile.testsCompletedCount || 0}
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
              Mock Tests Taken
            </div>
          </div>
        </div>

        {/* 4. Active Streak */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#0c131a] border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/60">
            <Flame className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {profile.streakDays || 1} Days
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-slate-400 dark:text-slate-500 mt-0.5">
              Active Streak
            </div>
          </div>
        </div>
      </div>

      {/* Preparation Profile Card */}
      <Card className="p-5 sm:p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Preparation Profile & Curriculum
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Personalized syllabus and question banks aligned with official exam standards.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/onboarding')}
            className="text-xs font-bold py-1.5 px-3 rounded-xl border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50"
          >
            Switch Target Exam
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Category</span>
            <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">
              {profile.preparationProfile?.preparationType || profile.targetExam}
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Target Exam</span>
            <strong className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
              {profile.preparationProfile?.exam || profile.targetExam}
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Active Stage</span>
            <strong className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">
              {profile.preparationProfile?.classLevel === 'Dropper' ? 'Dropper (11+12)' : `Class ${profile.classLevel}`}
            </strong>
          </div>
        </div>

        {profile.preparationProfile?.subjects && (
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Curriculum Subjects:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {profile.preparationProfile.subjects.map(s => (
                <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 text-[11px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
