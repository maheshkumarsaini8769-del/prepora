import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageSquare,
  Shield,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  Mail,
  Send,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Card, Badge, Button } from '../components/common/UIComponents';

export const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [supportMessage, setSupportMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = [
    'All',
    'Account & Targets',
    'Practice Engine',
    'Test Center',
    'Mistake Book',
    'Doubts & Mentorship'
  ];

  const faqs = [
    {
      q: 'How does the Exam Readiness Score calculate my percentage?',
      a: 'The PREPORA readiness score uses a 5-pillar diagnostic formula evaluating: (1) Concept understanding across syllabus, (2) Historical accuracy rate, (3) Speed vs ideal benchmark, (4) Daily streak consistency, and (5) Hard difficulty question conquest.',
      cat: 'Account & Targets'
    },
    {
      q: 'How does Blind Retry work in the Mistake Book?',
      a: 'Blind retry hides your previous incorrect answer and the correct solution, giving you a completely fresh attempt on questions you got wrong. If you get it right, your retry status marks as Cleared.',
      cat: 'Mistake Book'
    },
    {
      q: 'What is the "I\'m Stuck" feature during Practice?',
      a: 'Rather than spoiling the solution immediately, "I\'m Stuck" provides 5 progressive levels of hints: (1) Strategic Nudge, (2) Governing Formula, (3) First Step, (4) Core Concept, and (5) Full Solution.',
      cat: 'Practice Engine'
    },
    {
      q: 'Are full-length mock tests timed under exact exam conditions?',
      a: 'Yes! Full mock exams use sectional timing, question palettes with marked-for-review tags, and the exact +4/-1 negative marking penalty pattern.',
      cat: 'Test Center'
    },
    {
      q: 'Can I chat directly with a Prepora Mentor?',
      a: 'Yes, through the Doubt Center and Messages inbox you can exchange direct question inquiries with assigned faculty mentors.',
      cat: 'Doubts & Mentorship'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchCat = selectedCategory === 'All' || f.cat === selectedCategory;
    const matchSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setSupportMessage('');
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7 pb-20 animate-slide-up">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
            <span>Support & Knowledge Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Help & Guidance Center
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            Find answers regarding test algorithms, study planner, mistake book intervals, or reach out to prep coordinators.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search FAQs, features, or guidelines..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === c
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 flex items-center justify-between gap-3"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {expandedFaq === idx && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 pt-2 border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Direct Ticket Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
          <Mail className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="text-base font-black text-slate-900">Contact Support Team</h3>
            <p className="text-xs text-slate-500">Need specific technical help or report a system glitch?</p>
          </div>
        </div>

        {ticketSubmitted ? (
          <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">Message Dispatched!</h4>
            <p className="text-xs text-emerald-700">
              Support has received your message. You can also view mentor threads under the <strong>Messages</strong> tab.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendTicket} className="space-y-3">
            <textarea
              rows={3}
              value={supportMessage}
              onChange={e => setSupportMessage(e.target.value)}
              placeholder="Describe what you need assistance with..."
              className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
              required
            />
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="font-bold text-xs">
                <Send className="w-3.5 h-3.5 mr-1" /> Send Inquiry
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};