import React, { useState } from 'react';
import {
  User,
  Mail,
  Award,
  Flame,
  CheckCircle2,
  Settings as SettingsIcon,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Profile Header Banner */}
      <Card className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-none p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-white/20 shadow-lg"
          />

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black">{profile.name}</h1>
              <Badge variant="brand">Student Demo</Badge>
            </div>
            <p className="text-xs text-slate-300 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5" /> {profile.email}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3 text-xs text-slate-200">
              <span className="bg-white/10 px-2.5 py-1 rounded-xl">
                Class: <strong>{profile.classLevel}</strong>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-xl">
                Target Exam: <strong>{profile.targetExam} {profile.targetYear}</strong>
              </span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/settings')}
            className="border-white/20 text-white hover:bg-white/10 text-xs"
          >
            <SettingsIcon className="w-3.5 h-3.5" /> Settings
          </Button>
        </div>
      </Card>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
            <Flame className="w-4 h-4 fill-amber-500" /> Current Streak
          </div>
          <div className="text-2xl font-black text-slate-800">{profile.streakDays} Days</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-xs font-bold mb-1">
            <CheckCircle2 className="w-4 h-4" /> Questions Solved
          </div>
          <div className="text-2xl font-black text-slate-800">142</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-brand-600 text-xs font-bold mb-1">
            <Award className="w-4 h-4" /> Overall Accuracy
          </div>
          <div className="text-2xl font-black text-slate-800">{profile.overallAccuracy}%</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-indigo-600 text-xs font-bold mb-1">
            <BookOpen className="w-4 h-4" /> Tests Completed
          </div>
          <div className="text-2xl font-black text-slate-800">{profile.testsCompletedCount}</div>
        </Card>
      </div>

      {/* Demo Profile Notice */}
      <Card className="p-4 bg-slate-50 border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="font-bold text-slate-700">Phase 1 Demo Architecture:</div>
        <p className="leading-relaxed">
          Authentication is deliberately mocked using a local student profile. In Phase 2, this will be connected to Supabase Auth with Google login and multi-device cloud synchronization without needing to refactor the UI layout.
        </p>
      </Card>
    </div>
  );
};
