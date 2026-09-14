import React, { useState, useRef, useEffect } from 'react';
import { 
  Calculator, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  X, 
  Type, 
  Globe, 
  Check, 
  AlertCircle 
} from 'lucide-react';

interface ExamToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorEnabled?: boolean;
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  initialTab?: 'calculator' | 'scratchpad' | 'settings';
}

export const ExamToolsModal: React.FC<ExamToolsModalProps> = ({
  isOpen,
  onClose,
  calculatorEnabled = true,
  fontSize,
  setFontSize,
  language,
  setLanguage,
  initialTab = 'calculator'
}) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'scratchpad' | 'settings'>(initialTab);

  // Calculator State
  const [calcInput, setCalcInput] = useState<string>('');
  const [calcResult, setCalcResult] = useState<string>('');
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  // Scratchpad Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState<string>('#7c3aed');
  const [penSize, setPenSize] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Set up canvas when scratchpad opens
  useEffect(() => {
    if (activeTab === 'scratchpad' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx && history.length === 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Save initial blank state
        setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      }
    }
  }, [activeTab]);

  if (!isOpen) return null;

  // Calculator helper functions
  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcInput('');
      setCalcResult('');
    } else if (val === 'DEL') {
      setCalcInput(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Sanitize and evaluate expression safely
        let expr = calcInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, `${Math.PI}`)
          .replace(/e/g, `${Math.E}`);
        
        // Handle sqrt
        expr = expr.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
        expr = expr.replace(/√([0-9.]+)/g, 'Math.sqrt($1)');
        
        // Handle sin, cos, tan (in degrees converted to radians)
        expr = expr.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        expr = expr.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        expr = expr.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');

        // Handle log (base 10) and ln
        expr = expr.replace(/log\(([^)]+)\)/g, 'Math.log10($1)');
        expr = expr.replace(/ln\(([^)]+)\)/g, 'Math.log($1)');

        // Handle power x^y
        expr = expr.replace(/\^/g, '**');

        // Safe evaluation
        const evalFn = new Function(`return ${expr}`);
        const res = evalFn();
        if (isNaN(res) || !isFinite(res)) {
          setCalcResult('Error');
        } else {
          const formatted = Number.isInteger(res) ? res.toString() : parseFloat(res.toFixed(6)).toString();
          setCalcResult(formatted);
          setCalcHistory(prev => [`${calcInput} = ${formatted}`, ...prev.slice(0, 4)]);
        }
      } catch (err) {
        setCalcResult('Error');
      }
    } else if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(val)) {
      setCalcInput(prev => `${prev}${val}(`);
    } else if (val === 'x²') {
      setCalcInput(prev => `${prev}^2`);
    } else if (val === 'xʸ') {
      setCalcInput(prev => `${prev}^`);
    } else {
      setCalcInput(prev => prev + val);
    }
  };

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = tool === 'eraser' ? penSize * 4 : penSize;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : penColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-15), snap]);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-15), snap]);
    }
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const newHistory = history.slice(0, -1);
      const lastSnap = newHistory[newHistory.length - 1];
      ctx.putImageData(lastSnap, 0, 0);
      setHistory(newHistory);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              🛠️
            </div>
            <h3 className="text-base font-bold text-slate-800">Exam Hall Tools</h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-4 pt-2 gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl border-b-2 transition-all ${
              activeTab === 'calculator'
                ? 'border-purple-600 text-purple-700 bg-purple-50/50 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Scientific Calculator
          </button>
          <button
            onClick={() => setActiveTab('scratchpad')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl border-b-2 transition-all ${
              activeTab === 'scratchpad'
                ? 'border-purple-600 text-purple-700 bg-purple-50/50 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Digital Rough Sheet
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-t-xl border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-purple-600 text-purple-700 bg-purple-50/50 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Type className="w-4 h-4" />
            Font & Language
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-50/30">
          {/* CALCULATOR TAB */}
          {activeTab === 'calculator' && (
            <div>
              {!calculatorEnabled ? (
                <div className="p-6 text-center bg-amber-50 border border-amber-200 rounded-xl my-4">
                  <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                  <h4 className="font-bold text-amber-900 text-base">Calculator Not Permitted</h4>
                  <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
                    In accordance with standard National Examination guidelines (such as NEET UG & CBSE Board regulations), digital calculators are strictly prohibited for this paper.
                  </p>
                </div>
              ) : (
                <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl p-4 shadow-lg border border-slate-800">
                  {/* Display */}
                  <div className="bg-slate-950 p-3.5 rounded-xl text-right mb-4 min-h-[75px] flex flex-col justify-end border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono tracking-wide overflow-x-auto whitespace-nowrap">
                      {calcInput || '0'}
                    </div>
                    <div className="text-2xl font-bold font-mono text-purple-300 mt-1">
                      {calcResult || '= 0'}
                    </div>
                  </div>

                  {/* History preview */}
                  {calcHistory.length > 0 && (
                    <div className="text-[11px] font-mono text-slate-500 mb-2 px-1 flex items-center justify-between">
                      <span>Recent: {calcHistory[0]}</span>
                      <button 
                        onClick={() => setCalcHistory([])} 
                        className="text-slate-400 hover:text-slate-300 underline text-[10px]"
                      >
                        Clear history
                      </button>
                    </div>
                  )}

                  {/* Keypad */}
                  <div className="grid grid-cols-5 gap-2 text-xs font-semibold">
                    {/* Row 1 */}
                    <button onClick={() => handleCalcButton('sin')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">sin</button>
                    <button onClick={() => handleCalcButton('cos')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">cos</button>
                    <button onClick={() => handleCalcButton('tan')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">tan</button>
                    <button onClick={() => handleCalcButton('C')} className="p-2.5 bg-rose-900/60 hover:bg-rose-800 text-rose-300 rounded-lg">C</button>
                    <button onClick={() => handleCalcButton('DEL')} className="p-2.5 bg-rose-900/60 hover:bg-rose-800 text-rose-300 rounded-lg">DEL</button>

                    {/* Row 2 */}
                    <button onClick={() => handleCalcButton('log')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">log</button>
                    <button onClick={() => handleCalcButton('ln')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">ln</button>
                    <button onClick={() => handleCalcButton('(')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">(</button>
                    <button onClick={() => handleCalcButton(')')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">)</button>
                    <button onClick={() => handleCalcButton('÷')} className="p-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-base">÷</button>

                    {/* Row 3 */}
                    <button onClick={() => handleCalcButton('√')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">√</button>
                    <button onClick={() => handleCalcButton('7')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">7</button>
                    <button onClick={() => handleCalcButton('8')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">8</button>
                    <button onClick={() => handleCalcButton('9')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">9</button>
                    <button onClick={() => handleCalcButton('×')} className="p-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-base">×</button>

                    {/* Row 4 */}
                    <button onClick={() => handleCalcButton('x²')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">x²</button>
                    <button onClick={() => handleCalcButton('4')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">4</button>
                    <button onClick={() => handleCalcButton('5')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">5</button>
                    <button onClick={() => handleCalcButton('6')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">6</button>
                    <button onClick={() => handleCalcButton('-')} className="p-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-base">-</button>

                    {/* Row 5 */}
                    <button onClick={() => handleCalcButton('xʸ')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">xʸ</button>
                    <button onClick={() => handleCalcButton('1')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">1</button>
                    <button onClick={() => handleCalcButton('2')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">2</button>
                    <button onClick={() => handleCalcButton('3')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">3</button>
                    <button onClick={() => handleCalcButton('+')} className="p-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-base">+</button>

                    {/* Row 6 */}
                    <button onClick={() => handleCalcButton('π')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">π</button>
                    <button onClick={() => handleCalcButton('e')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-purple-300">e</button>
                    <button onClick={() => handleCalcButton('0')} className="p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-lg text-white text-base">0</button>
                    <button onClick={() => handleCalcButton('.')} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white text-base">.</button>
                    <button onClick={() => handleCalcButton('=')} className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-base">=</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCRATCHPAD TAB */}
          {activeTab === 'scratchpad' && (
            <div className="flex flex-col gap-3">
              {/* Scratchpad toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTool('pen')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      tool === 'pen' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Pen
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      tool === 'eraser' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Eraser
                  </button>
                </div>

                {tool === 'pen' && (
                  <div className="flex items-center gap-1.5">
                    {['#7c3aed', '#2563eb', '#0f172a'].map(c => (
                      <button
                        key={c}
                        onClick={() => setPenColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform ${
                          penColor === c ? 'scale-125 border-white ring-2 ring-purple-400' : 'border-transparent'
                        }`}
                        title={c}
                      />
                    ))}
                    <div className="h-4 w-px bg-slate-300 mx-1" />
                    <button
                      onClick={() => setPenSize(2)}
                      className={`px-1.5 py-0.5 rounded text-[11px] ${penSize === 2 ? 'bg-purple-100 font-bold text-purple-700' : 'text-slate-500'}`}
                    >
                      Fine
                    </button>
                    <button
                      onClick={() => setPenSize(4)}
                      className={`px-1.5 py-0.5 rounded text-[11px] ${penSize === 4 ? 'bg-purple-100 font-bold text-purple-700' : 'text-slate-500'}`}
                    >
                      Med
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-1 ml-auto">
                  <button
                    onClick={handleUndo}
                    disabled={history.length <= 1}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-40 transition-colors"
                    title="Undo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClearCanvas}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                    title="Clear All"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
              </div>

              {/* Canvas rough sheet */}
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-inner bg-white touch-none">
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={320}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[320px] cursor-crosshair block"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                Rough work is automatically retained for your reference during this exam session.
              </p>
            </div>
          )}

          {/* FONT & LANGUAGE SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 py-2">
              {/* Question Font Size */}
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Type className="w-4 h-4 text-purple-600" />
                  <h4 className="font-bold text-slate-800 text-sm">Question Font Size</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Adjust question and option font size for optimal reading comfort on your screen.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFontSize('sm')}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                      fontSize === 'sm'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs">A-</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Compact (Small)</span>
                  </button>
                  <button
                    onClick={() => setFontSize('base')}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                      fontSize === 'base'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-sm">A</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Standard (Default)</span>
                  </button>
                  <button
                    onClick={() => setFontSize('lg')}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all ${
                      fontSize === 'lg'
                        ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-base">A+</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">Large (Prominent)</span>
                  </button>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <h4 className="font-bold text-slate-800 text-sm">Exam Language Medium</h4>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Switch the language of questions, options, and explanations instantly.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      language === 'en'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm font-semibold">English</div>
                      <div className="text-[11px] text-slate-500">Default national medium</div>
                    </div>
                    {language === 'en' && <Check className="w-4 h-4 text-purple-600" />}
                  </button>

                  <button
                    onClick={() => setLanguage('hi')}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      language === 'hi'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-left">
                      <div className="text-sm font-semibold">हिंदी (Hindi)</div>
                      <div className="text-[11px] text-slate-500">हिंदी माध्यम प्रश्न एवं विकल्प</div>
                    </div>
                    {language === 'hi' && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Active Medium: <strong className="text-slate-700">{language === 'en' ? 'English' : 'हिंदी'}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            Resume Test
          </button>
        </div>
      </div>
    </div>
  );
};
