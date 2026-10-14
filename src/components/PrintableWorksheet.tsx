import React from 'react';
import { X, Printer } from 'lucide-react';
import { FractionDisplay } from './FractionDisplay';

interface PrintableWorksheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative print:border-none print:shadow-none print:p-4"
        dir="rtl"
      >
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800 text-sm">معاينة ورقة العمل التمهيدية للطباعة (A4)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة ورقة النشاط</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Content */}
        <div className="space-y-4 text-stone-800">
          {/* Official Oman School Header */}
          <div className="border-b-2 border-stone-800 pb-3 flex items-center justify-between">
            <div className="text-right space-y-0.5">
              <p className="text-xs font-bold">سلطنة عُمان</p>
              <p className="text-xs">وزارة التربية والتعليم</p>
              <p className="text-xs">مادة الرياضيات • الصف الثامن الأساسي</p>
            </div>
            <div className="text-center">
              <h2 className="text-base font-black">نشاط تمهيدي استكشافي (٣ - ٥ دقائق)</h2>
              <p className="text-xs font-bold text-amber-900">« 🍕 مـطـعـم الـكـسـور »</p>
            </div>
            <div className="text-left text-xs space-y-0.5">
              <p>اسم الطالبة: ........................</p>
              <p>المجموعة: ............................</p>
              <p>التاريخ: ..... / ..... / ١٤٤٧هـ</p>
            </div>
          </div>

          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs font-medium text-amber-950 text-center">
            « طلبكِ اليوم في مطعم الكسور يحتاج إلى تفكير رياضي! فكّري مع زميلتكِ ودوّني استنتاجكِ »
          </div>

          {/* Question 1 */}
          <div className="border border-stone-300 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs bg-stone-100 p-1.5 rounded-md">
              <span>الطلب الأول: اجمعي الكمية</span>
              <span>(مسألة جمع)</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-700">
              «طلبت سارة ١⁄٢ بيتزا، وطلبت مريم ١⁄٤ بيتزا. فما مجموع ما طلبتاه معاً؟»
            </p>
            <div className="flex items-center justify-center gap-3 py-2 bg-stone-50 rounded-lg">
              <FractionDisplay numerator={1} denominator={2} size="sm" />
              <span className="text-lg font-bold">+</span>
              <FractionDisplay numerator={1} denominator={4} size="sm" />
              <span className="text-lg font-bold">=</span>
              <span className="text-lg font-bold text-stone-400">..................</span>
            </div>
            <div className="text-[11px] text-stone-500 flex justify-between items-center pt-1 border-t border-dashed border-stone-200">
              <span>تفسير الطالبة الرياضي: كيف جمعتِ القطع على الرغم من اختلاف أحجامها؟</span>
              <span>...........................................................................</span>
            </div>
          </div>

          {/* Question 2 */}
          <div className="border border-stone-300 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs bg-stone-100 p-1.5 rounded-md">
              <span>الطلب الثاني: احسبي الكمية المتبقية</span>
              <span>(مسألة طرح)</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-700">
              «كانت لدى نور ٣⁄٤ بيتزا، فأكلت ١⁄٢ بيتزا. فما الكمية المتبقية؟»
            </p>
            <div className="flex items-center justify-center gap-3 py-2 bg-stone-50 rounded-lg">
              <FractionDisplay numerator={3} denominator={4} size="sm" />
              <span className="text-lg font-bold">−</span>
              <FractionDisplay numerator={1} denominator={2} size="sm" />
              <span className="text-lg font-bold">=</span>
              <span className="text-lg font-bold text-stone-400">..................</span>
            </div>
            <div className="text-[11px] text-stone-500 flex justify-between items-center pt-1 border-t border-dashed border-stone-200">
              <span>تفسير الطالبة الرياضي: كم ربعاً متبقياً في الصحن؟</span>
              <span>...........................................................................</span>
            </div>
          </div>

          {/* Closing Prompt */}
          <div className="border-2 border-stone-800 rounded-xl p-3 text-center bg-stone-50 space-y-1.5">
            <p className="text-xs font-black">
              🤔 سؤال الاستكشاف: ما الطريقة التي تساعدنا على جمع الكسور وطرحها عندما تختلف مقاماتها؟
            </p>
            <p className="text-[11px] text-stone-600">
              فكّري، ناقشي مع مجموعتكِ، وسجلي الكلمة المفتاحية: (..................................................)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableWorksheet;
