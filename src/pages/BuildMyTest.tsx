import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  Sparkles,
  Clock,
  Layers,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';
import { questionService } from '../services/questionService';
import { userService } from '../services/userService';
import { ExamType, ClassLevel, SubjectName, DifficultyLevel } from '../types';

export const BuildMyTest: React.FC = () => {
  const navigate = useNavigate();
  const profile = userService.getProfile();

  const [exam, setExam] = useState<ExamType>(profile.targetExam);
  const [classLevel, setClassLevel] = useState<ClassLevel>(profile.classLevel);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectName[]>(['Physics', 'Chemistry']);
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'Mixed'>('Mixed');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [negativeMarking, setNegativeMarking] = useState<boolean>(true);
  const [testTitle, setTestTitle] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const availableSubjects = questionService.getSubjectsForExam(exam);

  const toggleSubject = (sub: SubjectName) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(prev => prev.filter(s => s !== sub));
      }
    } else {
      setSelectedSubjects(prev => [...prev, sub]);
    }
  };

  // Live pool check
  const availablePool = questionService.filterQuestions({
    exam,
    classLevel,
    difficulty: difficulty === 'Mixed' ? undefined : difficulty
  }).filter(q => selectedSubjects.includes(q.subject));

  const handleGenerateTest = () => {
    setErrorMessage(null);

    const count = Number(questionCount);
    const result = testService.buildCustomTest({
      title: testTitle.trim() || `${exam} Custom Test (${count} Questions)`,
      exam,
      classLevel,
      subjects: selectedSubjects,
      questionCount: count,
      difficulty,
      durationMinutes,
      negativeMarking
    });

    if (!result.success || !result.test) {
      setErrorMessage(result.message || 'Failed to generate test with these criteria.');
      return;
    }

    // Direct redirect to instructions
    navigate(`/tests/${result.test.id}/instructions`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-2">
          <Wrench className="w-3.5 h-3.5" />
          <span>Custom Mock Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Build My Test</h1>
        <p className="text-sm text-slate-500 mt-1">
          Compose customized practice exams targeted specifically to your weak areas, preferred duration, and exam standard.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Cannot Generate Test:</strong> {errorMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Custom Test Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. My Weekend Physics Speed Run"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Exam & Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Exam
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['JEE', 'NEET', 'Board'] as ExamType[]).map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => {
                        setExam(e);
                        // Reset subjects to valid ones
                        const subs = questionService.getSubjectsForExam(e);
                        setSelectedSubjects([subs[0]]);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        exam === e
                          ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Class
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['11', '12'] as ClassLevel[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setClassLevel(c)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        classLevel === c
                          ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Class {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subjects Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Included Subjects (Select one or more)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableSubjects.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`p-3 rounded-xl border text-left font-bold text-sm transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{sub}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty & Number of Questions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Mixed', 'Easy', 'Medium', 'Hard'] as (DifficultyLevel | 'Mixed')[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        difficulty === d
                          ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Questions Count ({questionCount} Selected)
                  </label>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        questionCount === num
                          ? 'bg-brand-600 border-brand-600 text-white shadow-sm font-black'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {num} Qs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration & Negative Marking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[15, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        durationMinutes === mins
                          ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {mins} Mins
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Negative Marking
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNegativeMarking(true)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      negativeMarking
                        ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    ON (-1 mark)
                  </button>
                  <button
                    type="button"
                    onClick={() => setNegativeMarking(false)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      !negativeMarking
                        ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    OFF (0 mark)
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Live Summary & Validation */}
        <div className="space-y-4">
          <Card className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Test Blueprint Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Selected Exam:</span>
                <strong className="text-slate-900">{exam}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Class:</span>
                <strong className="text-slate-900">Class {classLevel}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Subjects:</span>
                <strong className="text-slate-900">{selectedSubjects.join(', ')}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Question Count:</span>
                <strong className="text-slate-900">{questionCount} Questions</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Duration:</span>
                <strong className="text-slate-900">{durationMinutes} Minutes</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Marking Scheme:</span>
                <strong className="text-slate-900">+4 / {negativeMarking ? '-1' : '0'}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Marks:</span>
                <strong className="text-brand-700 font-black">{questionCount * 4} Marks</strong>
              </div>
            </div>

            {/* Pool availability badge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="text-slate-500">Available Questions in Mock Pool:</div>
              <div className={`text-base font-black mt-0.5 ${availablePool.length < questionCount ? 'text-rose-600' : 'text-emerald-600'}`}>
                {availablePool.length} questions
              </div>
              {availablePool.length < questionCount && (
                <div className="text-rose-600 text-[11px] mt-1 font-semibold">
                  Insufficient questions! Reduce count or select more subjects.
                </div>
              )}
            </div>

            <Button
              size="lg"
              variant="primary"
              onClick={handleGenerateTest}
              disabled={availablePool.length < questionCount}
              className="w-full font-bold shadow-md shadow-brand-500/20"
            >
              GENERATE TEST <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
