import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  Zap,
  ShieldCheck,
  Keyboard,
  Languages,
  BookOpen,
  Award
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';
import { testService } from '../services/testService';

export const TestInstructions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [lang, setLang] = useState<'EN' | 'HI'>('HI');

  const test = testService.getTestById(id || '');

  if (!test) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Test Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-4">The test you are trying to take does not exist.</p>
        <Button onClick={() => navigate('/tests')}>Back to Test Center</Button>
      </div>
    );
  }

  const isJEE = test.exam === 'JEE' || test.title.includes('JEE');
  const isNEET = test.exam === 'NEET' || test.title.includes('NEET');

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate('/tests')}>
          <ArrowLeft className="w-4 h-4" /> Back to Test Center
        </Button>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <Languages className="w-3.5 h-3.5 ml-1.5 text-slate-400" />
          <button
            type="button"
            onClick={() => setLang('EN')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              lang === 'EN'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang('HI')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              lang === 'HI'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            हिंदी / Hinglish
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <Card className="bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white border-none p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="brand">{test.exam}</Badge>
          <Badge variant="info">{test.category}</Badge>
          {test.negativeMarking && <Badge variant="warning">Negative Marking (-1)</Badge>}
        </div>

        <h1 className="text-2xl sm:text-3xl font-black">{test.title}</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10 text-slate-200">
          <div>
            <div className="text-xs text-slate-400">Total Questions</div>
            <div className="text-lg font-bold text-white">{test.totalQuestions}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Duration</div>
            <div className="text-lg font-bold text-white">{test.durationMinutes} Minutes</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Maximum Marks</div>
            <div className="text-lg font-bold text-white">{test.maxScore}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Marking Scheme</div>
            <div className="text-lg font-bold text-emerald-400">+4 / {test.negativeMarking ? '-1' : '0'}</div>
          </div>
        </div>
      </Card>

      {/* Main Instructions & Guidelines Card */}
      <Card className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
        
        {/* Section 1: Official Exam Guidelines */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              📜
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {lang === 'EN' ? 'Official Examination Guidelines' : 'महत्वपूर्ण परीक्षा दिशा-निर्देश (Exam Guidelines)'}
            </h3>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'EN' ? (
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong>Countdown Timer:</strong> The server timer displayed on top indicates your remaining duration. Test will auto-submit when the countdown reaches 00:00:00.</li>
                <li><strong>Negative Marking:</strong> Each correct response awards <strong>+4 marks</strong>. Each incorrect response deducts <strong>-1 mark</strong>. Unattempted questions award <strong>0 marks</strong>.</li>
                <li><strong>No Backtracking Lock:</strong> You are free to navigate between questions, sections, and subjects anytime during the active window.</li>
                <li><strong>Autosave Guarantee:</strong> Every answer selection is saved immediately. If you accidentally reload or close the tab, your answers and remaining time will resume without loss.</li>
                <li><strong>Solution & Analysis:</strong> Detailed step-by-step solutions, concept tags, and percentile rankings will be released immediately after final submission.</li>
              </ul>
            ) : (
              <ul className="list-disc list-inside space-y-1.5">
                <li><strong>उल्टी गिनती टाइमर (Countdown Timer):</strong> स्क्रीन के ऊपर दिया गया टाइमर आपका बचा हुआ समय दिखाता है। समय समाप्त होते ही टेस्ट अपने आप सबमिट हो जाएगा।</li>
                <li><strong>नेगेटिव मार्किंग (Negative Marking):</strong> हर सही उत्तर पर <strong>+4 अंक</strong> मिलेंगे और गलत उत्तर पर <strong>-1 अंक</strong> कटेंगे। बिना हल किए प्रश्नों पर 0 अंक मिलेंगे।</li>
                <li><strong>प्रश्नों के बीच नेविगेशन:</strong> आप किसी भी समय किसी भी प्रश्न या विषय (Physics, Chemistry, Maths/Biology) पर स्वतंत्र रूप से जा सकते हैं।</li>
                <li><strong>ऑटो-सेव सुरक्षा (Autosave):</strong> हर विकल्प पर क्लिक करते ही आपका उत्तर तुरंत सेव हो जाता है। अगर पेज रिफ्रेश हो जाए या इंटरनेट कटे, तो टाइमर और उत्तर वहीं से शुरू होंगे।</li>
                <li><strong>विस्तृत समाधान (Solutions):</strong> टेस्ट सबमिट करने के तुरंत बाद हर प्रश्न का स्टेप-बाय-स्टेप समाधान, फॉर्मूला और रैंक रिपोर्ट मिल जाएगी।</li>
              </ul>
            )}
          </div>
        </div>

        {/* Section 2: Speed Tracking & Anti-Guesswork Guidelines */}
        <div className="pt-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-xs">
              ⚡
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {lang === 'EN' ? 'Speed Tracking & Fast-Answer Guidelines' : 'स्पीड ट्रैकिंग एवं फास्ट-आंसर गाइडलाइन'}
            </h3>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-amber-900 dark:text-amber-300">
              {lang === 'EN'
                ? '🎯 Precision Over Blind Guessing:'
                : '🎯 अंधाधुंध तुक्का लगाने से बचें — शुद्धता (Accuracy) ही रैंक बनाएगी:'}
            </p>
            <p>
              {lang === 'EN'
                ? 'Our AI Speed Engine monitors time spent per question. Answering questions in under 15 seconds will trigger a fast-speed flag in your final report to detect rushed guesswork.'
                : 'हमारा AI स्पीड इंजन हर प्रश्न पर बिताए गए समय को मॉनिटर करता है। 15 सेकंड से कम समय में उत्तर देने पर स्पीड अलर्ट दर्ज होता है, ताकि जल्दबाजी में हुए गलत तुक्कों की पहचान हो सके।'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-800/40 text-[11px] font-bold">
              <span className="text-emerald-700 dark:text-emerald-300">🟢 Easy Question: 45s – 60s target</span>
              <span className="text-blue-700 dark:text-blue-300">🟡 Medium Question: 75s – 90s target</span>
              <span className="text-rose-700 dark:text-rose-300">🔴 Hard / Multi-step: 120s – 150s target</span>
            </div>
          </div>
        </div>

        {/* Section 3: Time Coach - Recommended Budget */}
        <div className="pt-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs">
              ⏱️
            </span>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {lang === 'EN' ? 'Recommended Subject Time Allocation (Time Coach)' : 'विषय-वार अनुशंसित समय योजना (Time Coach)'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'EN'
                  ? 'Follow this strategy to ensure you never run out of time on easy scoring questions'
                  : 'इस टाइम मैनेजमेंट प्लान से किसी भी विषय के आसान प्रश्न नहीं छूटेंगे'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {test.subjects.map((sub) => {
              const recMin = test.subjectTimePlan?.[sub] || Math.round(test.durationMinutes / test.subjects.length);
              return (
                <div key={sub} className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-center">
                  <div className="text-xs font-bold text-purple-900 dark:text-purple-200">{sub}</div>
                  <div className="text-xl font-black text-purple-700 dark:text-purple-400 mt-0.5">{recMin} min</div>
                  <div className="text-[10px] text-purple-500 font-medium">Recommended Budget</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Question Palette Legend */}
        <div className="pt-5 space-y-3">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
            {lang === 'EN' ? 'Question Palette Symbol Legend' : 'प्रश्नावली सिंबल गाइड (Question Palette Legend)'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {lang === 'EN' ? 'Answered (Will be evaluated)' : 'उत्तर दिया (मूल्यांकन होगा)'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {lang === 'EN' ? 'Not Answered (Evaluated as 0)' : 'उत्तर नहीं दिया (0 अंक)'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {lang === 'EN' ? 'Not Visited Yet' : 'अभी तक देखा नहीं'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {lang === 'EN' ? 'Marked for Review (Not Answered)' : 'रिव्यू के लिए मार्क किया'}
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 sm:col-span-2">
              <span className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center relative">
                5
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {lang === 'EN'
                  ? 'Answered & Marked for Review (Will be evaluated for marks)'
                  : 'उत्तर दिया एवं रिव्यू के लिए मार्क किया (मार्क्स के लिए मूल्यांकन होगा)'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Keyboard Shortcuts Guide */}
        <div className="pt-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
              <Keyboard className="w-4 h-4" />
            </span>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              {lang === 'EN' ? 'Keyboard Navigation Shortcuts' : 'कीबोर्ड शॉर्टकट्स गाइड'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Option Select:</span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono font-bold">1..4</kbd>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Save & Next:</span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono font-bold">Enter</kbd>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Previous:</span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono font-bold">Alt + P</kbd>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">Review:</span>
              <kbd className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-mono font-bold">Alt + M</kbd>
            </div>
          </div>
        </div>

        {/* Section 6: Declaration Checkbox */}
        <div className="pt-5">
          <label className="flex items-start gap-3 p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl cursor-pointer hover:bg-emerald-50 transition">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
            />
            <span className="text-xs text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
              {lang === 'EN'
                ? 'I have read and understood all exam guidelines and instructions. I confirm that I will attempt this test with honesty and focus under authentic examination conditions.'
                : 'मैंने परीक्षा के सभी नियमों और दिशा-निर्देशों को ध्यानपूर्वक पढ़ और समझ लिया है। मैं पुष्टि करता हूँ कि मैं बिना किसी अनुचित साधन के पूर्ण ईमानदारी से यह टेस्ट दूंगा।'}
            </span>
          </label>
        </div>

        {/* Launch Action */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {agreed ? 'Ready to begin!' : 'Please check the confirmation box above to start.'}
          </span>
          <Button
            size="lg"
            variant="primary"
            disabled={!agreed}
            onClick={() => navigate(`/tests/${test.id}/start`)}
            className="w-full sm:w-auto font-black px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            {lang === 'EN' ? 'I AM READY TO BEGIN' : 'शुरू करने के लिए तैयार हूँ (START)'} <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
