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

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200 pb-16">
      {/* Profile Header Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{profile.name}</h1>
              <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                Student
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {profile.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs">
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                Class {profile.classLevel}
              </span>
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                Target: {profile.targetExam} {profile.targetYear}
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/settings')}
            className="text-xs font-semibold py-1.5 px-3 border-slate-300 text-slate-700"
          >
            <SettingsIcon className="w-3.5 h-3.5 mr-1" /> Settings
          </Button>
        </div>
      </Card>

      {/* Progress & Metrics Summary */}
      <Card className="p-6">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Academic Activity
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Current Streak</div>
            <div className="text-2xl font-bold text-slate-900">{profile.streakDays} Days</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Questions Solved</div>
            <div className="text-2xl font-bold text-slate-900">142</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Overall Accuracy</div>
            <div className="text-2xl font-bold text-slate-900">{profile.overallAccuracy}%</div>
          </div>

          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Tests Completed</div>
            <div className="text-2xl font-bold text-slate-900">{profile.testsCompletedCount}</div>
          </div>
        </div>
      </Card>

      {/* Preparation Profile Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
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
            className="text-xs font-bold py-1.5 px-3 rounded-xl border-slate-300 text-slate-800 hover:bg-slate-50"
          >
            Switch Target Exam
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Category</span>
            <strong className="text-sm font-black text-slate-900 mt-0.5 block">
              {profile.preparationProfile?.preparationType || profile.targetExam}
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Target Exam</span>
            <strong className="text-sm font-bold text-slate-900 mt-0.5 block">
              {profile.preparationProfile?.exam || profile.targetExam}
            </strong>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-slate-400 font-medium block">Active Stage</span>
            <strong className="text-sm font-bold text-slate-900 mt-0.5 block">
              {profile.preparationProfile?.classLevel === 'Dropper' ? 'Dropper (11+12)' : `Class ${profile.classLevel}`}
            </strong>
          </div>
        </div>

        {profile.preparationProfile?.subjects && (
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Curriculum Subjects:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {profile.preparationProfile.subjects.map(s => (
                <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-700 text-[11px]">
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
