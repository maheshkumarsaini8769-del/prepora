import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { syllabusService } from '../services/syllabusService';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Stethoscope,
  BookOpen,
  Award,
  ShieldCheck,
  Compass,
  Check
} from 'lucide-react';
import { PreparationType, CanonicalExam, ClassLevel, PreparationProfile } from '../types';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  // Multi-step progress: 1 = Prep Type, 2 = Class, 3 = Exam Specifics & Subjects, 4 = Review & Confirm
  const [step, setStep] = useState<number>(1);
  const [prepType, setPrepType] = useState<PreparationType>('JEE');
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'Dropper'>('12');
  const [selectedExam, setSelectedExam] = useState<string>('JEE_MAIN');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['PHYSICS', 'CHEMISTRY', 'MATHEMATICS']);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize from existing profile if available
  useEffect(() => {
    const existing = user?.preparationProfile || userService.getProfile()?.preparationProfile;
    if (existing) {
      setPrepType(existing.preparationType || 'JEE');
      setSelectedClass(existing.classLevel || '12');
      setSelectedExam(existing.exam || 'JEE_MAIN');
      if (existing.subjects && existing.subjects.length > 0) {
        setSelectedSubjects(existing.subjects);
      }
    }
  }, [user]);

  // Preparation Category Cards
  const prepOptions: Array<{
    type: PreparationType;
    title: string;
    subtitle: string;
    icon: any;
    color: string;
    badge: string;
    tagline: string;
  }> = [
    {
      type: 'JEE',
      title: 'JEE',
      subtitle: 'Engineering Entrance (Main & Advanced)',
      icon: GraduationCap,
      color: 'from-blue-600/20 to-blue-500/10 border-blue-500/40 text-blue-400',
      badge: 'NTA & IITs',
      tagline: 'Physics • Chemistry • Mathematics'
    },
    {
      type: 'NEET',
      title: 'NEET',
      subtitle: 'Medical Entrance Examination (NEET-UG)',
      icon: Stethoscope,
      color: 'from-emerald-600/20 to-emerald-500/10 border-emerald-500/40 text-emerald-400',
      badge: 'NTA',
      tagline: 'Physics • Chemistry • Biology (Botany + Zoology)'
    },
    {
      type: 'CBSE',
      title: 'CBSE',
      subtitle: 'Central Board of Secondary Education',
      icon: BookOpen,
      color: 'from-purple-600/20 to-purple-500/10 border-purple-500/40 text-purple-400',
      badge: 'Class 11 & 12 Board',
      tagline: 'Full NCERT Senior Secondary Curriculum'
    },
    {
      type: 'RBSE',
      title: 'RBSE',
      subtitle: 'Rajasthan Board of Secondary Education',
      icon: Award,
      color: 'from-amber-600/20 to-amber-500/10 border-amber-500/40 text-amber-400',
      badge: 'BSER Ajmer',
      tagline: 'RBSE Prescribed Syllabus & State Board Curriculum'
    },
    {
      type: 'UNDECIDED',
      title: "I'm not sure yet",
      subtitle: 'Explore foundational concepts with guided diagnostics',
      icon: Compass,
      color: 'from-slate-700/20 to-slate-600/10 border-slate-600/40 text-slate-300',
      badge: 'Foundation Mode',
      tagline: 'Flexible diagnostics across STEM curriculum'
    }
  ];

  const handleSelectPrepType = (type: PreparationType) => {
    setPrepType(type);
    if (type === 'JEE') {
      setSelectedExam('JEE_MAIN');
      setSelectedSubjects(['PHYSICS', 'CHEMISTRY', 'MATHEMATICS']);
    } else if (type === 'NEET') {
      setSelectedExam('NEET_UG');
      setSelectedSubjects(['PHYSICS', 'CHEMISTRY', 'BIOLOGY']);
    } else if (type === 'CBSE') {
      setSelectedExam('CBSE');
      setSelectedSubjects(['PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY']);
    } else if (type === 'RBSE') {
      setSelectedExam('RBSE');
      setSelectedSubjects(['PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY']);
    } else {
      setSelectedExam('JEE_MAIN');
      setSelectedSubjects(['PHYSICS', 'CHEMISTRY', 'MATHEMATICS']);
    }
    setStep(2);
  };

  const handleSelectClass = (cls: ClassLevel | 'Dropper') => {
    setSelectedClass(cls);
    setStep(3);
  };

  const toggleSubject = (subId: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subId)) {
        if (prev.length <= 1) return prev; // Keep at least one subject
        return prev.filter(s => s !== subId);
      } else {
        return [...prev, subId];
      }
    });
  };

  const handleCompleteOnboarding = async () => {
    if (!prepType) return;
    setIsSubmitting(true);

    try {
      const canonicalExamValue: CanonicalExam =
        prepType === 'JEE' ? (selectedExam as CanonicalExam) :
        prepType === 'NEET' ? 'NEET_UG' :
        prepType === 'CBSE' ? 'CBSE' :
        prepType === 'RBSE' ? 'RBSE' : 'JEE_MAIN';

      const prepProfile: PreparationProfile = {
        userId: user?.id || 'student',
        preparationType: prepType,
        exam: canonicalExamValue,
        classLevel: selectedClass,
        subjects: selectedSubjects,
        onboardingCompleted: true,
        targetYear: selectedClass === '11' ? 2027 : 2026,
        updatedAt: new Date().toISOString()
      };

      // 1. Update LocalStorage immediately
      localStorage.setItem('prepora_preparation_profile', JSON.stringify(prepProfile));
      localStorage.setItem('prepora_onboarding_completed', 'true');

      // 2. Update userService & Auth Context
      const updatedProfile = {
        ...user,
        targetExam: (prepType === 'UNDECIDED' ? 'JEE' : prepType) as any,
        classLevel: (selectedClass === 'Dropper' ? '12' : selectedClass) as ClassLevel,
        targetYear: prepProfile.targetYear,
        preparationProfile: prepProfile
      };

      userService.updateProfile(updatedProfile);
      await updateUser({
        targetExam: updatedProfile.targetExam,
        classLevel: updatedProfile.classLevel,
        targetYear: updatedProfile.targetYear,
        preparationProfile: prepProfile
      });

      // 3. Persist to backend
      const token = localStorage.getItem('prepora_auth_token') || localStorage.getItem('prepora_token');
      if (token) {
        fetch('/api/auth/me', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            targetExam: updatedProfile.targetExam,
            classLevel: updatedProfile.classLevel,
            targetYear: updatedProfile.targetYear,
            preparationProfile: prepProfile
          })
        }).catch(err => console.warn('Could not sync preparation profile to backend:', err));
      }

      // Navigate to personalized home
      navigate('/', { replace: true });
    } catch (e) {
      console.error('Error saving preparation profile:', e);
      setIsSubmitting(false);
    }
  };

  // Get subjects defined canonically for this preparation
  const availableSubjects = syllabusService.getSubjectsForPreparation(prepType || 'JEE');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header & Progress Bar */}
      <div className="max-w-2xl mx-auto w-full pt-4 sm:pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-black text-white text-base shadow-lg shadow-brand-500/20">
              P
            </div>
            <div>
              <span className="font-black tracking-tight text-lg leading-tight block">PREPORA</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide block">Personalized Academic Preparation</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-brand-400">Step {step} of 4</span>
            <span className="text-[10px] text-slate-500 block">
              {step === 1 ? 'Preparation Target' : step === 2 ? 'Class Level' : step === 3 ? 'Curriculum & Subjects' : 'Confirmation'}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-brand-500 to-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content Area: One Decision Per Screen (Mobile Responsive) */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        
        {/* STEP 1: WHAT ARE YOU PREPARING FOR? */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                First-Time Setup
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                What are you preparing for?
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Select your primary examination. We personalize your entire experience — syllabus, questions, mock tests, and daily study targets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {prepOptions.map(opt => {
                const Icon = opt.icon;
                const isSelected = prepType === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => handleSelectPrepType(opt.type)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-brand-500 ring-2 ring-brand-500/30 shadow-lg shadow-brand-500/10'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 sm:p-3.5 rounded-xl border bg-gradient-to-br ${opt.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base sm:text-lg text-white">{opt.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{opt.subtitle}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{opt.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: WHICH CLASS ARE YOU IN? */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Target Exam</span>
              </button>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Which class are you currently in?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Selected: <strong className="text-brand-400">{prepType}</strong>. This sets your initial syllabus scope and target year.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <button
                type="button"
                onClick={() => handleSelectClass('11')}
                className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedClass === '11'
                    ? 'border-brand-500 bg-brand-950/40 text-white ring-2 ring-brand-500/25 shadow-lg shadow-brand-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="text-3xl font-black mb-1.5">Class 11</div>
                <div className="text-xs text-brand-400 font-bold mb-1">Target Year 2027</div>
                <div className="text-[11px] text-slate-400">First year senior secondary</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectClass('12')}
                className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedClass === '12'
                    ? 'border-brand-500 bg-brand-950/40 text-white ring-2 ring-brand-500/25 shadow-lg shadow-brand-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="text-3xl font-black mb-1.5">Class 12</div>
                <div className="text-xs text-brand-400 font-bold mb-1">Target Year 2026</div>
                <div className="text-[11px] text-slate-400">Graduating / board exam year</div>
              </button>

              {(prepType === 'JEE' || prepType === 'NEET' || prepType === 'UNDECIDED') && (
                <button
                  type="button"
                  onClick={() => handleSelectClass('Dropper')}
                  className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedClass === 'Dropper'
                      ? 'border-brand-500 bg-brand-950/40 text-white ring-2 ring-brand-500/25 shadow-lg shadow-brand-500/10'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="text-3xl font-black mb-1.5">Dropper</div>
                  <div className="text-xs text-brand-400 font-bold mb-1">Target Year 2026</div>
                  <div className="text-[11px] text-slate-400">Complete 11 + 12 Revision</div>
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: EXAM SPECIFICS & SUBJECTS */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Class Level</span>
              </button>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Exam Stream & Subjects
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Loaded dynamically from PREPORA's centralized syllabus registry.
              </p>
            </div>

            {/* If JEE: Ask Main / Adv / Both */}
            {prepType === 'JEE' && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Target Examination Mode
                </label>
                <div className="grid grid-cols-3 gap-2.5 text-xs font-bold">
                  {[
                    { id: 'JEE_MAIN', label: 'JEE Main Only' },
                    { id: 'JEE_ADVANCED', label: 'JEE Advanced' },
                    { id: 'BOTH', label: 'Main + Advanced' }
                  ].map(e => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setSelectedExam(e.id)}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedExam === e.id
                          ? 'bg-brand-600 border-brand-500 text-white font-black shadow-md shadow-brand-500/20'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects Selection (Loaded from canonical syllabus) */}
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Active Subjects ({availableSubjects.length} available)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableSubjects.map(sub => {
                  const isChecked = selectedSubjects.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => toggleSubject(sub.id)}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-brand-500 bg-brand-950/40 text-white shadow-sm'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-850 hover:text-slate-300'
                      }`}
                    >
                      <div className="text-left">
                        <span className="font-bold text-sm block">{sub.name}</span>
                        <span className="text-[11px] text-slate-400">{sub.id}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-brand-600 border-brand-500 text-white' : 'border-slate-700 bg-slate-800'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-500/25"
              >
                <span>Continue to Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Adjust Configuration</span>
              </button>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Confirm Your Preparation Profile
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                You can change this anytime in Settings without losing any completed tests or progress.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-medium">Preparation Category</span>
                <strong className="text-sm font-black text-brand-400">{prepType}</strong>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-medium">Target Examination</span>
                <strong className="text-sm font-bold text-white">
                  {prepType === 'JEE' ? (selectedExam === 'BOTH' ? 'JEE Main & Advanced' : selectedExam.replace('_', ' ')) :
                   prepType === 'NEET' ? 'NEET-UG' :
                   prepType === 'CBSE' ? 'CBSE Class ' + selectedClass :
                   prepType === 'RBSE' ? 'RBSE Class ' + selectedClass : 'Foundation STEM'}
                </strong>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-medium">Academic Stage</span>
                <strong className="text-sm font-bold text-white">
                  {selectedClass === 'Dropper' ? 'Dropper (Complete 11 & 12)' : 'Class ' + selectedClass}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Selected Subjects</span>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {selectedSubjects.map(s => (
                    <span key={s} className="text-[11px] font-bold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCompleteOnboarding}
                className="w-full py-4 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Saving Your Preparation Profile...</span>
                ) : (
                  <>
                    <span>Enter My Personalized Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer reassurance */}
      <div className="max-w-2xl mx-auto w-full text-center pb-4 text-slate-500 text-xs flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Official NTA / NCERT / BSER Curricula Verified by PREPORA</span>
      </div>
    </div>
  );
};

export default Onboarding;
