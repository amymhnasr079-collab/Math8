import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { StudentHypothesis } from '../types';
import { toArabicNumerals } from '../utils/arabicNumerals';

interface StudentHypothesesModalProps {
  isOpen: boolean;
  onClose: () => void;
  hypotheses: StudentHypothesis[];
  onAddHypothesis: (studentName: string, thought: string) => void;
  onDeleteHypothesis: (id: string) => void;
}

const DEFAULT_QUICK_THOUGHTS = [
  { name: 'سارة', thought: 'القطع مختلفة في الحجم، فلا يمكننا الجمع كأنهما نفس الشيء!' },
  { name: 'مريم', thought: 'نصف البيتزا يمكن تقسيمه إلى ربعين متساويين: ١⁄٢ = ٢⁄٤.' },
  { name: 'نور', thought: 'في الطرح: ثلاثة أرباع إذا أخذنا منها ربعين (النصف) يتبقى ربع واحد!' },
  { name: 'فاطمة', thought: 'نحتاج إلى اسم موحد للمقام حتى نتمكن من جمع الأجزاء.' },
  { name: 'عائشة', thought: 'المضاعف المشترك للمقامين ٢ و ٤ هو ٤.' },
];

export const StudentHypothesesModal: React.FC<StudentHypothesesModalProps> = ({
  isOpen,
  onClose,
  hypotheses,
  onAddHypothesis,
  onDeleteHypothesis,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [thoughtInput, setThoughtInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thoughtInput.trim()) return;
    onAddHypothesis(nameInput.trim() || 'طالبة متميزة', thoughtInput.trim());
    setNameInput('');
    setThoughtInput('');
  };

  const handleQuickAdd = (item: { name: string; thought: string }) => {
    onAddHypothesis(item.name, item.thought);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 relative"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                لوحة فرضيات ومشاركات الطالبات
              </h2>
              <p className="text-xs text-stone-500">
                تدوين إجابات طالبات الصف الثامن أثناء العصف الذهني (٣ - ٥ دقائق)
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

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 mb-1">اسم الطالبة / المجموعة:</label>
              <input
                type="text"
                placeholder="مثال: سارة، مجموعة الإبداع..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-stone-600 mb-1">ماذا تلاحظ أو تقترح الطالبة؟</label>
              <input
                type="text"
                placeholder="اكتبي الفرضية الرياضية هنا..."
                value={thoughtInput}
                onChange={(e) => setThoughtInput(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-stone-300 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل مشاركة الطالبة على اللوحة</span>
          </button>
        </form>

        {/* Quick Suggestions for quick click */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-stone-500 block mb-2">
            ⚡ أفكار مقترحة سريعة للنقر المباشر:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DEFAULT_QUICK_THOUGHTS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAdd(q)}
                className="text-[11px] bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 transition-all text-right"
              >
                + {q.name}: {q.thought}
              </button>
            ))}
          </div>
        </div>

        {/* List of Registered Hypotheses */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-800">
              المشاركات المسجلة ({toArabicNumerals(hypotheses.length)})
            </span>
          </div>

          {hypotheses.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs border-2 border-dashed border-stone-200 rounded-2xl">
              لم تُسجَّل أي مشاركة بعد. اطلبي من طالباتكِ مشاركة أفكارهن الأولى!
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {hypotheses.map((h, i) => (
                <div
                  key={h.id}
                  className="flex items-start justify-between gap-3 p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl transition-all"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{h.studentName}</span>
                        <span className="text-[10px] text-stone-400 font-mono">{toArabicNumerals(h.timestamp)}</span>
                      </div>
                      <p className="text-xs text-stone-700 mt-0.5">{h.thought}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteHypothesis(h.id)}
                    className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
          >
            إغلاق وعودة للوحة العرض
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHypothesesModal;
