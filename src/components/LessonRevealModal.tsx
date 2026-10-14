import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Check, ArrowLeft, Target, KeyRound } from 'lucide-react';
import { FractionDisplay } from './FractionDisplay';

interface LessonRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LessonRevealModal: React.FC<LessonRevealModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire festive educational confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97706', '#059669', '#DC2626', '#2563EB', '#F59E0B'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in zoom-in-95 duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative text-center"
        dir="rtl"
      >
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-semibold text-white mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>نقطة الانطلاق الرسمية للحصة</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
            جمع وطرح الكسور
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
            الصف الثامن الأساسي • منهج سلطنة عُمان
          </p>
        </div>

        {/* Core Discovery Content */}
        <div className="p-6 sm:p-8 space-y-6 text-right">
          {/* Key Discovery Badge */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-emerald-950">
                السر الرياضي الذي اكتشفناه في «مطعم الكسور»:
              </h2>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                لا يمكن جمع أو طرح قطع غير متساوية في الحجم! لذلك نحتاج أولاً إلى <strong className="text-emerald-700 font-bold">«توحيد المقامات»</strong> (كتابة الكسور بصور متكافئة ذات مقام مشترك).
              </p>
            </div>
          </div>

          {/* Solution Connection to the Two Orders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Order 1 Resolution */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
              <span className="text-[11px] font-bold text-amber-900 block mb-1">
                حل الطلب الأول (الجمع):
              </span>
              <div className="flex items-center justify-center gap-2 my-2 text-stone-900 font-bold">
                <FractionDisplay numerator={1} denominator={2} size="sm" />
                <span>+</span>
                <FractionDisplay numerator={1} denominator={4} size="sm" />
                <span>=</span>
                <FractionDisplay numerator={2} denominator={4} size="sm" highlight />
                <span>+</span>
                <FractionDisplay numerator={1} denominator={4} size="sm" />
                <span>=</span>
                <FractionDisplay numerator={3} denominator={4} size="sm" className="text-emerald-700 font-black" />
              </div>
              <p className="text-[11px] text-stone-500 text-center">
                حولنا النصف إلى ربعين (٢⁄٤) ثم جمعنا البسطين!
              </p>
            </div>

            {/* Order 2 Resolution */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
              <span className="text-[11px] font-bold text-rose-900 block mb-1">
                حل الطلب الثاني (الطرح):
              </span>
              <div className="flex items-center justify-center gap-2 my-2 text-stone-900 font-bold">
                <FractionDisplay numerator={3} denominator={4} size="sm" />
                <span>−</span>
                <FractionDisplay numerator={1} denominator={2} size="sm" />
                <span>=</span>
                <FractionDisplay numerator={3} denominator={4} size="sm" />
                <span>−</span>
                <FractionDisplay numerator={2} denominator={4} size="sm" highlight />
                <span>=</span>
                <FractionDisplay numerator={1} denominator={4} size="sm" className="text-emerald-700 font-black" />
              </div>
              <p className="text-[11px] text-stone-500 text-center">
                حولنا النصف إلى ربعين (٢⁄٤) ثم طرحنا البسطين!
              </p>
            </div>
          </div>

          {/* Ready to learn */}
          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-sm font-bold shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>فلنبدأ الدرس معاً يا بطلات الرياضيات!</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonRevealModal;
