/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Maximize,
  Minimize,
  BookOpen,
  MessageSquare,
  Sparkles,
  Printer,
  HelpCircle,
  Volume2,
  Share2,
  ChevronLeft,
  CheckCircle,
  Eye,
  Scissors
} from 'lucide-react';
import { FractionDisplay } from './components/FractionDisplay';
import { PizzaVisualizer } from './components/PizzaVisualizer';
import { ClassroomTimer } from './components/ClassroomTimer';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { StudentHypothesesModal } from './components/StudentHypothesesModal';
import { LessonRevealModal } from './components/LessonRevealModal';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { StudentHypothesis } from './types';
import { toArabicNumerals } from './utils/arabicNumerals';

export default function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState(false);
  const [showHypothesesModal, setShowHypothesesModal] = useState(false);
  const [showLessonReveal, setShowLessonReveal] = useState(false);
  const [showPrintWorksheet, setShowPrintWorksheet] = useState(false);

  // Interactive Exploration Controls
  const [showEquivalenceLens, setShowEquivalenceLens] = useState(false);
  const [activeTab, setActiveTab] = useState<'both' | 'order1' | 'order2'>('both');

  // Student Hypotheses state
  const [hypotheses, setHypotheses] = useState<StudentHypothesis[]>([
    {
      id: '1',
      studentName: 'فاطمة العبرية',
      thought: 'قطع سارة ومريم ليستا بنفس القياس، لذا لا يمكننا جمع ١+١ و ٢+٤!',
      timestamp: '01:15',
    },
    {
      id: '2',
      studentName: 'ريم البوسعيدية',
      thought: 'نصف البيتزا يعادل ربعين، وإذا أضفنا ربع مريم يصبح لدينا ثلاثة أرباع!',
      timestamp: '02:40',
    },
  ]);

  const handleAddHypothesis = (studentName: string, thought: string) => {
    const newHypo: StudentHypothesis = {
      id: Date.now().toString(),
      studentName,
      thought,
      timestamp: new Date().toLocaleTimeString('ar-OM', { minute: '2-digit', second: '2-digit' }),
    };
    setHypotheses((prev) => [newHypo, ...prev]);
  };

  const handleDeleteHypothesis = (id: string) => {
    setHypotheses((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Classroom Control Strip (One clean row, teacher tools) */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-2.5 sticky top-0 z-40 flex items-center justify-between gap-4">
        {/* Brand / Curriculum Marker */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-lg shadow-2xs">
            🍕
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black tracking-tight text-stone-900">
                مطعم الكسور
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                الصف الثامن الأساسي
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium">
              سلطنة عُمان • تمهيد درس: جمع وطرح الكسور
            </p>
          </div>
        </div>

        {/* Center: 3-5 Minute Warm-up Timer */}
        <div className="flex items-center">
          <ClassroomTimer initialMinutes={4} />
        </div>

        {/* Left Actions: Teacher Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Cut/Partition Lens Toggle */}
          <button
            onClick={() => setShowEquivalenceLens(!showEquivalenceLens)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
              showEquivalenceLens
                ? 'bg-amber-600 text-white shadow-amber-600/20'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title="إظهار تجزئة النصف إلى ربعين بصرياً"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">أداة التجزئة المتكافئة</span>
          </button>

          {/* Teacher Facilitation Guide */}
          <button
            onClick={() => setShowTeacherGuide(true)}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            title="دليل المعلمة لإدارة الـ ٥ دقائق"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden md:inline">دليل المعلمة</span>
          </button>

          {/* Student Thoughts / Hypotheses */}
          <button
            onClick={() => setShowHypothesesModal(true)}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative"
            title="لوحة فرضيات ومشاركات الطالبات"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden md:inline">فرضيات الطالبات</span>
            {hypotheses.length > 0 && (
              <span className="w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                {toArabicNumerals(hypotheses.length)}
              </span>
            )}
          </button>

          {/* Printable Worksheet */}
          <button
            onClick={() => setShowPrintWorksheet(true)}
            className="p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            title="طباعة ورقة العمل التمهيدية"
            aria-label="طباعة ورقة العمل التمهيدية"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle for Classroom Smartboard */}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
            title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة للعرض الصفي'}
            aria-label="ملء الشاشة"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main 16:9 Presentation Stage Container */}
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col justify-between">
        
        {/* Top Board Hero Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-stone-50 to-orange-50/70 border border-amber-200/80 rounded-3xl p-5 sm:p-7 shadow-xs mb-5">
          {/* Subtle Traditional Omani Arch Architectural Motif */}
          <div className="absolute left-0 top-0 bottom-0 w-48 sm:w-80 opacity-15 pointer-events-none overflow-hidden">
            <img
              src="/src/assets/images/pizza_fraction_restaurant_1791993410756.jpg"
              alt="مطعم الكسور"
              className="w-full h-full object-cover rounded-l-3xl mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              {/* Primary Board Title strictly matching prompt */}
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl sm:text-3xl">🍕</span>
                <h1 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight">
                  مطعم الكسور
                </h1>
              </div>

              {/* Subtitle strictly matching prompt */}
              <p className="text-base sm:text-xl font-bold text-amber-800">
                طلبكِ اليوم يحتاج إلى تفكير رياضي!
              </p>
            </div>

            {/* School / Grade Banner with Omani Student Illustration */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs px-4 py-2 rounded-2xl border border-amber-200/60 shadow-2xs">
              <img
                src="/src/assets/images/omani_math_students_1791993410580.jpg"
                alt="طالبات الصف الثامن"
                className="w-12 h-12 rounded-xl object-cover border border-amber-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <div className="text-xs font-bold text-stone-900">
                  طالبات الصف الثامن • سلطنة عُمان
                </div>
                <div className="text-[11px] text-stone-500">
                  نشاط استكشافي صفي (٣ - ٥ دقائق)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Two Exploratory Orders Grid (Prominently displayed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 flex-1 items-stretch">
          
          {/* =========================================
              الطلب الأول: اجمعي الكمية
             ========================================= */}
          <div className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between hover:border-amber-400/80 transition-all relative overflow-hidden group">
            {/* Top Tag & Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    الطلب الأول
                  </span>
                </div>
                <span className="text-xs font-black text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/70">
                  اجمعي الكمية
                </span>
              </div>

              {/* Problem Narrative strictly as specified */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/50 mb-4">
                <p className="text-base sm:text-lg font-bold text-stone-800 leading-relaxed text-right">
                  «طلبت سارة <span className="text-amber-900 font-black">١⁄٢</span> بيتزا، وطلبت مريم <span className="text-emerald-900 font-black">١⁄٤</span> بيتزا. فما مجموع ما طلبتاه؟»
                </p>
              </div>

              {/* Visual Pizza Display */}
              <div className="my-2">
                <PizzaVisualizer type="order1" showEquivalentDivision={showEquivalenceLens} />
              </div>
            </div>

            {/* Mathematical Operation Bar */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col items-center">
              <span className="text-xs font-semibold text-stone-500 mb-2">
                العملية الرياضية:
              </span>

              {/* Vertical fractions with Eastern Arabic numerals, strict RTL order */}
              <div className="flex items-center justify-center gap-3 sm:gap-5 bg-stone-50/90 px-6 py-3 rounded-2xl border border-stone-200/80 shadow-2xs">
                {/* ١⁄٢ */}
                <FractionDisplay numerator={1} denominator={2} size="xl" subLabel="بيتزا سارة" />

                {/* + */}
                <span className="text-3xl sm:text-4xl font-black text-amber-700 select-none">
                  +
                </span>

                {/* ١⁄٤ */}
                <FractionDisplay numerator={1} denominator={4} size="xl" subLabel="بيتزا مريم" />

                {/* = */}
                <span className="text-3xl sm:text-4xl font-black text-stone-600 select-none">
                  =
                </span>

                {/* ؟ (Stimulating Curiosity - No premature answer!) */}
                <div className="inline-flex flex-col items-center justify-center">
                  <div className="w-14 h-16 sm:w-16 sm:h-20 bg-amber-100/90 rounded-2xl border-2 border-dashed border-amber-400 flex items-center justify-center shadow-xs">
                    <span className="text-3xl sm:text-4xl font-black text-amber-800 animate-pulse">
                      ؟
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-700 font-bold mt-1">
                    ما المجموع؟
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              الطلب الثاني: احسبي الكمية المتبقية
             ========================================= */}
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between hover:border-rose-400/80 transition-all relative overflow-hidden group">
            {/* Top Tag & Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    الطلب الثاني
                  </span>
                </div>
                <span className="text-xs font-black text-rose-800 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200/70">
                  احسبي الكمية المتبقية
                </span>
              </div>

              {/* Problem Narrative strictly as specified */}
              <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-200/50 mb-4">
                <p className="text-base sm:text-lg font-bold text-stone-800 leading-relaxed text-right">
                  «كانت لدى نور <span className="text-rose-900 font-black">٣⁄٤</span> بيتزا، فأكلت <span className="text-stone-700 font-black">١⁄٢</span> بيتزا. فما الكمية المتبقية؟»
                </p>
              </div>

              {/* Visual Pizza Display */}
              <div className="my-2">
                <PizzaVisualizer type="order2" showEquivalentDivision={showEquivalenceLens} />
              </div>
            </div>

            {/* Mathematical Operation Bar */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col items-center">
              <span className="text-xs font-semibold text-stone-500 mb-2">
                العملية الرياضية:
              </span>

              {/* Vertical fractions with Eastern Arabic numerals, strict RTL order */}
              <div className="flex items-center justify-center gap-3 sm:gap-5 bg-stone-50/90 px-6 py-3 rounded-2xl border border-stone-200/80 shadow-2xs">
                {/* ٣⁄٤ */}
                <FractionDisplay numerator={3} denominator={4} size="xl" subLabel="بيتزا نور" />

                {/* − */}
                <span className="text-3xl sm:text-4xl font-black text-rose-700 select-none">
                  −
                </span>

                {/* ١⁄٢ */}
                <FractionDisplay numerator={1} denominator={2} size="xl" subLabel="ما أكلته نور" />

                {/* = */}
                <span className="text-3xl sm:text-4xl font-black text-stone-600 select-none">
                  =
                </span>

                {/* ؟ (Stimulating Curiosity - No premature answer!) */}
                <div className="inline-flex flex-col items-center justify-center">
                  <div className="w-14 h-16 sm:w-16 sm:h-20 bg-rose-100/90 rounded-2xl border-2 border-dashed border-rose-400 flex items-center justify-center shadow-xs">
                    <span className="text-3xl sm:text-4xl font-black text-rose-800 animate-pulse">
                      ؟
                    </span>
                  </div>
                  <span className="text-[11px] text-rose-700 font-bold mt-1">
                    ما المتبقي؟
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stimulating Question & Lesson Transition */}
        <div className="mt-6 bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-right space-y-1">
            {/* Stimulating Question strictly as requested */}
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                ما الطريقة التي تساعدنا على جمع الكسور وطرحها عندما تختلف مقاماتها؟
              </h2>
            </div>
            {/* Subtitle strictly as requested */}
            <p className="text-xs sm:text-sm font-bold text-amber-700 pr-7">
              فكّري، ناقشي، واكتشفي!
            </p>
          </div>

          {/* Action to reveal the Lesson Transition */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => setShowHypothesesModal(true)}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>تسجيل فكرة طالبة</span>
            </button>

            <button
              onClick={() => setShowLessonReveal(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>إعلان عنوان درس اليوم 🚀</span>
            </button>
          </div>
        </div>
      </main>

      {/* Classroom Footer (Minimalist & Dignified) */}
      <footer className="w-full border-t border-stone-200/70 bg-white/70 py-2.5 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>سلطنة عُمان • وزارة التربية والتعليم • مناهج الرياضيات</span>
          <span>لوحة تمهيدية تفاعلية مخصصة لشاشات العرض والسبورات الذكية (نسبة ١٦:٩)</span>
          <span>الصف الثامن الأساسي</span>
        </div>
      </footer>

      {/* Modals */}
      <TeacherGuideModal
        isOpen={showTeacherGuide}
        onClose={() => setShowTeacherGuide(false)}
      />

      <StudentHypothesesModal
        isOpen={showHypothesesModal}
        onClose={() => setShowHypothesesModal(false)}
        hypotheses={hypotheses}
        onAddHypothesis={handleAddHypothesis}
        onDeleteHypothesis={handleDeleteHypothesis}
      />

      <LessonRevealModal
        isOpen={showLessonReveal}
        onClose={() => setShowLessonReveal(false)}
      />

      <PrintableWorksheet
        isOpen={showPrintWorksheet}
        onClose={() => setShowPrintWorksheet(false)}
      />
    </div>
  );
}
