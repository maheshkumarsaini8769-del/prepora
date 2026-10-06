import React, { useState } from 'react';
import {
  MessageSquarePlus,
  Lightbulb,
  AlertTriangle,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export const StudentFeedbackModal: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'SUGGESTION' | 'MISTAKE'>('SUGGESTION');
  const [category, setCategory] = useState<string>('Formula Sheet / Notes');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Keep contact info sync when user object is loaded
  React.useEffect(() => {
    if (user?.name && !name) setName(user.name);
    if (user?.email && !email) setEmail(user.email);
    if (user?.phone && !phone) setPhone(user.phone);
  }, [user]);

  // Adjust default category when tab switches
  const handleTabSwitch = (tab: 'SUGGESTION' | 'MISTAKE') => {
    setActiveTab(tab);
    if (tab === 'SUGGESTION') {
      setCategory('Formula Sheet / Notes');
    } else {
      setCategory('Wrong Question / Answer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Kripya title aur detail dono bharein.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('prepora_auth_token') : null;
      const res = await fetch('/api/reports/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          type: activeTab,
          category,
          userId: user?.id || 'anonymous',
          userName: name.trim() || user?.name || 'Student',
          userEmail: email.trim() || user?.email || '',
          userPhone: phone.trim() || user?.phone || '',
          pageUrl: `${location.pathname}${location.search}`
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
          setTitle('');
          setDescription('');
        }, 2200);
      } else {
        setErrorMsg(data.message || 'Submission failed. Kripya punah prayas karein.');
      }
    } catch {
      setErrorMsg('Server se judne me samasya aayi. Kripya punah prayas karein.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <aside aria-label="Feedback and suggestions" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setErrorMsg('');
            setIsOpen(true);
          }}
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          title="Kuch naya add karwayein ya koi mistake batayein"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 animate-spin text-amber-200" style={{ animationDuration: '6s' }} />
          </div>
          <span className="hidden sm:inline font-extrabold tracking-wide">Kuch Add / Mistake Report</span>
          <span className="sm:hidden font-black">Feedback</span>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping hidden group-hover:block" />
        </button>
      </aside>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div
            className="bg-white dark:bg-[#0e1622] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden text-slate-800 dark:text-slate-100 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                    Aapki Aawaz, PREPORA Ka Vikas
                  </h3>
                  <p className="text-2xs sm:text-xs text-slate-500 dark:text-slate-400">
                    Aapko kya chahiye ya kya galat laga? Seedha Admin ko batayein.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              {submitted ? (
                <div className="py-10 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">Dhanyawad! Report Pahunch Gayi</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Hamari academic & technical team aapke suggestion ya report par turant dhyan degi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Two Type Tabs */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('SUGGESTION')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'SUGGESTION'
                          ? 'bg-amber-500 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Kuch Naya Add Karo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('MISTAKE')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        activeTab === 'MISTAKE'
                          ? 'bg-rose-500 text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Mistake / Galti Mili</span>
                    </button>
                  </div>

                  {/* Context Note */}
                  <div className="text-2xs bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-slate-500">
                    <Compass className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span className="truncate">
                      Context: <strong>{location.pathname}</strong> (Automatic attached)
                    </span>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {activeTab === 'SUGGESTION' ? 'Kis Cheez Me Add Karwana Hai?' : 'Kis Cheez Me Galti Hai?'}
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    >
                      {activeTab === 'SUGGESTION' ? (
                        <>
                          <option value="Formula Sheet / Notes">Formula Sheet ya Quick Revision Notes</option>
                          <option value="Video Lectures">Specific Chapter ke Video Lectures</option>
                          <option value="Practice Questions">Naye Practice Questions ya PYQ</option>
                          <option value="Mind Map / Visuals">Mind Map ya Diagram Improvement</option>
                          <option value="Study Tool / Planner">AI Doubt / Test Planner Feature</option>
                          <option value="Other Suggestion">Koi Dusra Naya Feature</option>
                        </>
                      ) : (
                        <>
                          <option value="Wrong Question / Answer">Question ya Answer Key Galat Hai</option>
                          <option value="Typo / Spelling Error">Spelling ya Math Formula me Typo</option>
                          <option value="Explanation Error">Explanation Samajh Nahi Aaya ya Adhoora Hai</option>
                          <option value="Website Glitch / Bug">Page Slow ya Button Kaam Nahi Kar Raha</option>
                          <option value="Other Issue">Koi Aur Galti / Mistake</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mukhya Mudda / Short Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={
                        activeTab === 'SUGGESTION'
                          ? 'Udaharan: Optics ke sign convention ke tips add karein'
                          : 'Udaharan: Question 14 me option C sahi lag raha hai'
                      }
                      className="w-full text-xs py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Detail Me Batayein <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={
                        activeTab === 'SUGGESTION'
                          ? 'Batayein ki kis chapter ya topic me kya content hone se aapki padhai me madad hogi...'
                          : 'Batayein ki galti kahan hai aur sahi kya hona chahiye...'
                      }
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c131a] focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Student Details (Optional/Prefilled) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div>
                      <label className="block text-2xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" /> Aapka Naam
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aapka Naam"
                        className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold text-slate-500 mb-1 flex items-center gap-1">
                        <Phone className="w-3 h-3" /> WhatsApp / Phone No.
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="WhatsApp No (Update ke liye)"
                        className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                      {errorMsg}
                    </div>
                  )}

                  {/* Privacy Assurance Note */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="text-emerald-500 font-bold shrink-0">🔒 100% Private:</span>
                    <span>Aapka feedback seedha Admin team tak pahuchega. Kisi bhi doosre student ko yeh nahi dikhega.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Bhej rahe hain...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Seedha Admin Ko Bhejein</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentFeedbackModal;
