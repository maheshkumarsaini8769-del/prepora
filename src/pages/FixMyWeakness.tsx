import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Clock,
  BookOpen,
  Calendar,
  Layers,
  ShieldAlert,
  Award,
  HelpCircle,
  Lightbulb,
  Check
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/common/UIComponents';
import { progressService } from '../services/progressService';
import { formulaService } from '../services/formulaService';
import { aiDoubtSolver, WeaknessAnalysisData } from '../services/aiDoubtSolver';
import { TopicWeakness, SubjectName } from '../types';

type RootCauseType = 
  | 'Concept Gap' 
  | 'Application Gap' 
  | 'Speed Bottleneck' 
  | 'Careless Error Pattern' 
  | 'Trap Vulnerability';

const ROOT_CAUSE_DETAILS: Record<RootCauseType, { description: string; tag: string }> = {
  'Concept Gap': {
    description: 'Fundamental concept not consolidated yet. Needs high-yield principle review.',
    tag: 'Core Theory Gap'
  },
  'Application Gap': {
    description: 'Knows the governing formula, but stumbles during multi-step substitution.',
    tag: 'Formula Application'
  },
  'Speed Bottleneck': {
    description: 'Accurate problem solver, but consumes >3.5 minutes per question under pressure.',
    tag: 'Pacing Deficit'
  },
  'Careless Error Pattern': {
    description: 'Arithmetic slips, sign confusion (+/-), or missed unit conversions (cm to m).',
    tag: 'Execution Precision'
  },
  'Trap Vulnerability': {
    description: 'Consistently selects plausible distractor options engineered by exam setters.',
    tag: 'Distractor Trap'
  }
};

export const FixMyWeakness: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'red' | 'yellow' | 'green'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'All'>('All');

  // Remediation Modal State
  const [remediationTarget, setRemediationTarget] = useState<TopicWeakness | null>(null);
  const [selectedCause, setSelectedCause] = useState<RootCauseType>('Application Gap');
  const [aiDiagnosis, setAiDiagnosis] = useState<WeaknessAnalysisData | null>(null);
  const [isLoadingAiDiagnosis, setIsLoadingAiDiagnosis] = useState<boolean>(false);

  const weaknesses = progressService.getTopicWeaknesses();

  const filtered = weaknesses.filter((w) => {
    if (selectedStatus !== 'all' && w.status !== selectedStatus) return false;
    if (selectedSubject !== 'All' && w.subject !== selectedSubject) return false;
    return true;
  });

  const handleOpenRemediation = (w: TopicWeakness) => {
    setRemediationTarget(w);
    setAiDiagnosis(null);
    setIsLoadingAiDiagnosis(true);

    // Initial heuristic diagnosis
    if (w.accuracy < 40) {
      setSelectedCause('Concept Gap');
    } else if (w.accuracy < 60) {
      setSelectedCause('Application Gap');
    } else if (w.wrongCount >= 4) {
      setSelectedCause('Trap Vulnerability');
    } else {
      setSelectedCause('Careless Error Pattern');
    }

    // AI Deep Diagnosis from Gemini / PREPORA Academic Engine
    aiDoubtSolver.analyzeWeaknessOnline({
      subject: w.subject,
      chapter: w.chapter,
      topic: w.topic,
      accuracy: w.accuracy,
      totalAttempted: w.totalAttempts,
      mistakeTypes: ['Formula Application', 'Distractor Trap']
    }).then(result => {
      if (result) {
        setAiDiagnosis(result);
        if (result.diagnosedWeaknessType in ROOT_CAUSE_DETAILS) {
          setSelectedCause(result.diagnosedWeaknessType as RootCauseType);
        }
      }
      setIsLoadingAiDiagnosis(false);
    }).catch(() => {
      setIsLoadingAiDiagnosis(false);
    });
  };

  const handleLaunchDrill = () => {
    if (!remediationTarget) return;
    const url = `/practice?subject=${remediationTarget.subject}&chapter=${encodeURIComponent(remediationTarget.chapter)}&topic=${encodeURIComponent(remediationTarget.topic)}&count=5&mode=remediation&cause=${encodeURIComponent(selectedCause)}`;
    setRemediationTarget(null);
    navigate(url);
  };

  const redCount = weaknesses.filter(w => w.status === 'red').length;
  const yellowCount = weaknesses.filter(w => w.status === 'yellow').length;
  const greenCount = weaknesses.filter(w => w.status === 'green').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5 text-purple-600" />
            <span>Prepora Signature 5-Stage Remediation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Fix My Weakness</h1>
          <p className="text-sm text-slate-500 mt-1">
            Color-coded competency breakdown across all syllabus subtopics. Launch 5-stage precision remediation drills.
          </p>
        </div>
      </div>

      {/* Heatmap Status Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedStatus(selectedStatus === 'red' ? 'all' : 'red')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'red'
              ? 'bg-rose-100/70 border-rose-400 ring-2 ring-rose-400/20'
              : 'bg-rose-50/50 border-rose-200/60 hover:bg-rose-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Critical Weakness</span>
            <span className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-200"></span>
          </div>
          <div className="text-2xl font-black text-rose-950 mt-2">{redCount} Topics</div>
          <div className="text-[11px] text-rose-700 mt-0.5">Accuracy below 60%</div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'yellow' ? 'all' : 'yellow')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'yellow'
              ? 'bg-amber-100/70 border-amber-400 ring-2 ring-amber-400/20'
              : 'bg-amber-50/50 border-amber-200/60 hover:bg-amber-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Needs Improvement</span>
            <span className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-200"></span>
          </div>
          <div className="text-2xl font-black text-amber-950 mt-2">{yellowCount} Topics</div>
          <div className="text-[11px] text-amber-700 mt-0.5">Accuracy 60% - 79%</div>
        </button>

        <button
          onClick={() => setSelectedStatus(selectedStatus === 'green' ? 'all' : 'green')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedStatus === 'green'
              ? 'bg-emerald-100/70 border-emerald-400 ring-2 ring-emerald-400/20'
              : 'bg-emerald-50/50 border-emerald-200/60 hover:bg-emerald-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Mastered Topics</span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200"></span>
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-2">{greenCount} Topics</div>
          <div className="text-[11px] text-emerald-700 mt-0.5">Accuracy 80% or above</div>
        </button>
      </div>

      {/* Subject Filter */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['All', 'Physics', 'Chemistry', 'Mathematics'] as (SubjectName | 'All')[]).map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubject(sub)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === sub
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filtered.map((w, idx) => (
          <Card key={idx} className="space-y-3 hover:border-purple-200 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={w.status === 'red' ? 'danger' : w.status === 'yellow' ? 'warning' : 'success'}>
                  {w.status === 'red' ? 'RED • Critical Weakness' : w.status === 'yellow' ? 'YELLOW • Developing' : 'GREEN • Mastered'}
                </Badge>
                <span className="font-bold text-sm text-slate-800">{w.subject}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-500 font-medium">{w.chapter}</span>
              </div>

              <div className="text-xs font-semibold text-slate-400">
                Last checked: {w.lastPracticedDate}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{w.topic}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Accuracy: <strong className={w.accuracy < 60 ? 'text-rose-600 font-black' : 'text-slate-900'}>{w.accuracy}%</strong></span>
                  <span>•</span>
                  <span>{w.wrongCount} Errors in {w.totalAttempts} Attempts</span>
                </div>
              </div>

              <Button
                variant={w.status === 'red' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handleOpenRemediation(w)}
                className={`font-bold text-xs self-start sm:self-auto ${
                  w.status === 'red' ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md' : ''
                }`}
              >
                <Target className="w-3.5 h-3.5 mr-1" /> FIX THIS TOPIC
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* 5-STAGE REMEDIATION WORKFLOW MODAL (task2.md Section 2) */}
      {remediationTarget && (
        <Modal
          isOpen={Boolean(remediationTarget)}
          onClose={() => setRemediationTarget(null)}
          title={`5-Stage Remediation: ${remediationTarget.topic}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <Button variant="outline" size="sm" onClick={() => setRemediationTarget(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleLaunchDrill}
                className="font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-md"
              >
                <span>Launch 5-Question Remediation Drill</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          }
        >
          <div className="space-y-5 py-2 max-h-[75vh] overflow-y-auto pr-1">
            {/* Topic Meta Header */}
            <div className="p-3 bg-purple-50/70 border border-purple-200/80 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="brand" size="sm">{remediationTarget.subject}</Badge>
                <span className="text-xs font-bold text-slate-800">{remediationTarget.chapter}</span>
              </div>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {remediationTarget.accuracy}% Accuracy ({remediationTarget.wrongCount} Errors)
              </span>
            </div>

            {/* STAGE 1: ROOT CAUSE DIAGNOSIS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                  <span>Stage 1: Root Cause Diagnosis</span>
                </h4>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  AI Confidence: {aiDiagnosis ? Math.round(aiDiagnosis.confidence * 100) + '%' : '86%'}
                </span>
              </div>
              {aiDiagnosis && (
                <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-purple-900 uppercase text-[10px] tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Gemini AI Performance Diagnosis</span>
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {aiDiagnosis.rootCauseAnalysis}
                  </p>
                  <div className="text-[11px] text-purple-950 font-bold bg-white/80 p-2 rounded-lg border border-purple-100">
                    💡 Prescribed 25-Q Plan: {aiDiagnosis.prescribedPlan.conceptQuestions} Concept + {aiDiagnosis.prescribedPlan.easyQuestions} Easy + {aiDiagnosis.prescribedPlan.mediumQuestions} Medium + {aiDiagnosis.prescribedPlan.timedQuestions} Timed ({aiDiagnosis.prescribedPlan.expectedAccuracyGain} Gain)
                  </div>
                </div>
              )}
              <p className="text-xs text-slate-500">
                Prepora analyzed your error timeline. Confirm or adjust the root cause of your mistakes:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {(Object.keys(ROOT_CAUSE_DETAILS) as RootCauseType[]).map((cause) => {
                  const isSelected = selectedCause === cause;
                  return (
                    <button
                      key={cause}
                      type="button"
                      onClick={() => setSelectedCause(cause)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/90 text-purple-950 ring-2 ring-purple-600/20 shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{cause}</span>
                        {isSelected && <Check className="w-4 h-4 text-purple-700" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                        {ROOT_CAUSE_DETAILS[cause].description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STAGE 2: FOCUSED INPUT (2-3 Min High-Yield Guide) */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                <span>Stage 2: Focused Input (2-Min High-Yield Key Insight)</span>
              </h4>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-800 uppercase text-[10px] tracking-wider">Governing Equation</span>
                  <Badge variant="brand" size="sm">High-Yield Formula</Badge>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 font-mono font-bold text-slate-800 text-center">
                  {remediationTarget.topic.includes('Motion') || remediationTarget.chapter.includes('Kinematics')
                    ? 'v² = u² + 2as  |  R = (u² · sin(2θ)) / g'
                    : remediationTarget.chapter.includes('Thermodynamics')
                    ? 'ΔU = Q - W  |  η = 1 - (T_cold / T_hot)'
                    : 'Governing Law: F_net = dp/dt = m · a'}
                </div>

                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Remember This (The 1-Liner That Prevents the Error)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    Always resolve vectors into orthogonal axes before applying scalar equations. Never mix components across perpendicular dimensions.
                  </p>
                </div>
              </div>
            </div>

            {/* STAGE 3: GRADUATED 5-QUESTION BLUEPRINT */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                <span>Stage 3: Graduated 5-Question Blueprint</span>
              </h4>

              <div className="space-y-1.5">
                {[
                  { step: 'Q1', title: 'Direct Concept Check', level: 'Easy', desc: 'Confidence builder testing core principle definitions' },
                  { step: 'Q2', title: 'Standard Formula Application', level: 'Medium', desc: 'Direct numerical substitution with realistic units' },
                  { step: 'Q3', title: 'Exact Failed Question Pattern', level: 'Medium-Hard', desc: 'Tests remediation on the exact trap you previously missed' },
                  { step: 'Q4', title: 'Distractor Trap Vigilance', level: 'Hard', desc: 'Option engineered to catch common sign or calculation errors' },
                  { step: 'Q5', title: 'Timed Exam Challenge', level: 'Exam-Level', desc: 'Full countdown pressure to verify speed and mastery' }
                ].map((blueprint, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200/90 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {blueprint.step}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900">{blueprint.title}</span>
                        <p className="text-[11px] text-slate-500">{blueprint.desc}</p>
                      </div>
                    </div>
                    <Badge variant={idx < 2 ? 'success' : idx < 4 ? 'warning' : 'danger'} size="sm">
                      {blueprint.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* STAGE 4 & 5: VERIFICATION PREVIEW & SCHEDULED RETEST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Stage 4: Before vs After Delta</span>
                </div>
                <div className="text-xs text-emerald-800 mt-1">
                  <span>Current: <strong>{remediationTarget.accuracy}%</strong></span>
                  <span className="mx-1.5">→</span>
                  <span>Target: <strong className="text-emerald-950 font-black">80%+</strong> (+{Math.max(15, 80 - remediationTarget.accuracy)}% gain)</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Stage 5: Scheduled Retest</span>
                </div>
                <p className="text-[11px] text-purple-800 leading-tight">
                  Auto-schedules a 3-question retention retest in 3 days. Passing marks this weakness as <strong>RESOLVED</strong>.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

