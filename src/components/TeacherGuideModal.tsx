import React from 'react';
import { X, BookOpen, MessageCircleQuestion, Lightbulb, Compass, Award } from 'lucide-react';
import { toArabicNumerals } from '../utils/arabicNumerals';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 relative"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                دليل المعلمة لإدارة التمهيد الاستكشافي
              </h2>
              <p className="text-xs text-stone-500">
                خطة إدارة النقاش خلال ٣ إلى ٥ دقائق • منهج الرياضيات سلطنة عُمان - الصف الثامن
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-4 text-stone-700 text-sm">
          {/* Target */}
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold mb-1">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>الهدف التربوي للتمهيد</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-950">
              استثارة الفضول الرياضي لطالبات الصف الثامن وربط مفهوم جمع وطرح الكسور بواقع حياتي ملموس (تقاسم البيتزا)، مع إبراز التحدي عندما تكون <strong className="text-amber-800">المقامات مختلفة</strong>، والتمهيد لاكتشاف ضرورة «توحيد المقامات» دون حرق الشرح.
            </p>
          </div>

          {/* 3 Step Facilitation Roadmap */}
          <div className="space-y-3">
            <h3 className="font-bold text-stone-900 flex items-center gap-2 text-xs uppercase tracking-wider">
              <MessageCircleQuestion className="w-4 h-4 text-emerald-600" />
              <span>خطوات توجيه أسئلة الطالبات (٣ إلى ٥ دقائق):</span>
            </h3>

            {/* Step 1 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-emerald-800">
                  الدقيقة {toArabicNumerals(1)}: ملاحظة عدم تكافؤ القطع
                </span>
                <span className="text-[11px] text-stone-400 font-mono">٠٠:٠٠ - ٠١:٠٠</span>
              </div>
              <p className="text-xs text-stone-600 mb-2">
                اطرحي السؤال: «انظرن إلى بيتزا سارة (١⁄٢) وبيتزا مريم (١⁄٤).. هل القطع متساوية الحجم؟ هل يصح جمعهما وكأنهما نوع واحد؟»
              </p>
              <div className="text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700">
                🎯 <strong>الاستجابة المتوقعة:</strong> ستلاحظ الطالبات أن النصف أكبر من الربع، ولا يمكن القول ببساطة "قطعتان" دون تحديد حجم كل قطعة.
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-amber-800">
                  الدقيقة {toArabicNumerals(2)} - {toArabicNumerals(3)}: دحض الخطأ الشائع (جمع البسطين والمقامين)
                </span>
                <span className="text-[11px] text-stone-400 font-mono">٠١:٠٠ - ٠٣:٠٠</span>
              </div>
              <p className="text-xs text-stone-600 mb-2">
                اسألي: «إذا قالت طالبة: سنجمع ١+١ في البسط = ٢، و ٢+٤ في المقام = ٦.. ليصبح الناتج ٢⁄٦ (أي ثلث).. فهل هذا معقول بصرياً؟»
              </p>
              <div className="text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700">
                🎯 <strong>نقطة الحسم:</strong> «كيف يعقل أن نجمع نصفاً وربعاً فيكون الناتج ثلثاً، وهو أصغر من النصف الذي بدأنا به؟! إذاً هذه الطريقة خاطئة تماماً».
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/70">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-rose-800">
                  الدقيقة {toArabicNumerals(4)} - {toArabicNumerals(5)}: اكتشاف التجزئة المتكافئة والانتقال للدرس
                </span>
                <span className="text-[11px] text-stone-400 font-mono">٠٣:٠٠ - ٠٥:٠٠</span>
              </div>
              <p className="text-xs text-stone-600 mb-2">
                اضغطي على زر <strong>«أداة التقسيم المتكافئ»</strong> في الشاشة، ثم اسألي: «كم ربعاً يوجد داخل النصف؟ وكيف أصبح السؤال سهلاً الآن؟»
              </p>
              <div className="text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-700">
                🎯 <strong>الخلاصة الذهبية:</strong> النصف = ربعان (٢⁄٤). وبذلك ربعان + ربع = ثلاثة أرباع! هذا يقودنا إلى السر: <strong className="text-rose-700">توحيد المقامات</strong>.
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2.5 bg-emerald-50 text-emerald-900 rounded-2xl p-3 border border-emerald-200/60 text-xs">
            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              <strong>نصيحة صفية:</strong> اضغطي على زر «الانتقال إلى عنوان الدرس» في ختام الـ ٥ دقائق لتظهر شاشة إعلان الدرس الرسمية أمام الطالبات بتأثير احتفالي مبهر يعزز دافعيتهن!
            </p>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherGuideModal;
