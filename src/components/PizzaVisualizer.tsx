import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FractionDisplay } from './FractionDisplay';

interface PizzaVisualizerProps {
  type: 'order1' | 'order2';
  showEquivalentDivision?: boolean;
}

export const PizzaVisualizer: React.FC<PizzaVisualizerProps> = ({
  type,
  showEquivalentDivision = false,
}) => {
  const [activeSlice, setActiveSlice] = useState<string | null>(null);

  if (type === 'order1') {
    // Order 1: Sarah has 1/2 pizza, Maryam has 1/4 pizza.
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-md items-center">
          
          {/* Sarah's Dish: 1/2 Pizza */}
          <div className="flex flex-col items-center bg-amber-50/60 rounded-2xl p-3 border border-amber-200/80 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-amber-950">بيتزا سارة</span>
              <FractionDisplay numerator={1} denominator={2} size="sm" />
            </div>

            {/* Wooden Board + Pizza */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              {/* Wooden Board SVG */}
              <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-sm select-none">
                <defs>
                  <radialGradient id="woodBoard" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E8CA9B" />
                    <stop offset="85%" stopColor="#D5B079" />
                    <stop offset="100%" stopColor="#BF9456" />
                  </radialGradient>
                  <radialGradient id="crustGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="#E2A654" />
                    <stop offset="95%" stopColor="#C97C2B" />
                    <stop offset="100%" stopColor="#964E14" />
                  </radialGradient>
                  <radialGradient id="cheeseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF2A3" />
                    <stop offset="80%" stopColor="#FBD768" />
                    <stop offset="100%" stopColor="#EEA938" />
                  </radialGradient>
                </defs>

                {/* Wooden round platter */}
                <circle cx="70" cy="70" r="66" fill="url(#woodBoard)" stroke="#A67B38" strokeWidth="2.5" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="#C39A57" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Pizza Plate Base */}
                <circle cx="70" cy="70" r="54" fill="#EADBC8" opacity="0.3" stroke="#D1BEA8" strokeWidth="1" strokeDasharray="4 2" />

                {/* Left Half: 1/2 Pizza (from 90° to 270°) */}
                <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
                  {/* Pizza Semi-Circle Path: arc from top (70, 16) down to bottom (70, 124) */}
                  <path
                    d="M 70 70 L 70 16 A 54 54 0 0 0 70 124 Z"
                    fill="url(#crustGrad)"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                  />
                  {/* Cheese layer */}
                  <path
                    d="M 70 70 L 70 22 A 48 48 0 0 0 70 118 Z"
                    fill="url(#cheeseGrad)"
                  />
                  {/* Tomato sauce bleed */}
                  <path
                    d="M 70 70 L 70 24 A 46 46 0 0 0 70 116 Z"
                    fill="none"
                    stroke="#D94824"
                    strokeWidth="2.5"
                    opacity="0.85"
                  />

                  {/* Toppings on Half Pizza */}
                  {/* Basil leaves */}
                  <path d="M 45 42 Q 38 48 46 54 Q 52 46 45 42 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.5" />
                  <path d="M 42 88 Q 36 94 44 98 Q 50 90 42 88 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.5" />
                  <path d="M 58 66 Q 52 72 60 76 Q 66 68 58 66 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.5" />

                  {/* Cherry tomato slices */}
                  <circle cx="48" cy="65" r="5.5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />
                  <circle cx="48" cy="65" r="3" fill="#E53935" />
                  <circle cx="36" cy="72" r="5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />

                  <circle cx="52" cy="48" r="4.5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />
                  <circle cx="50" cy="85" r="4.5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />

                  {/* Olives */}
                  <circle cx="36" cy="56" r="3" fill="#212121" />
                  <circle cx="36" cy="56" r="1.2" fill="#EFEBE9" />
                  <circle cx="38" cy="80" r="3" fill="#212121" />
                  <circle cx="38" cy="80" r="1.2" fill="#EFEBE9" />

                  {/* If equivalent division is toggled on: show horizontal partition dividing 1/2 into two 1/4 quarters! */}
                  {showEquivalentDivision && (
                    <line
                      x1="16"
                      y1="70"
                      x2="70"
                      y2="70"
                      stroke="#8B2500"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      className="animate-pulse"
                    />
                  )}
                </g>

                {/* Slicing center cut indicator */}
                <line x1="70" y1="16" x2="70" y2="124" stroke="#7A3E1D" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="mt-2 text-center">
              <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-full">
                {showEquivalentDivision ? 'نصف = رُبعان (٢⁄٤)' : 'نصف بيتزا (١⁄٢)'}
              </span>
            </div>
          </div>

          {/* Maryam's Dish: 1/4 Pizza */}
          <div className="flex flex-col items-center bg-emerald-50/60 rounded-2xl p-3 border border-emerald-200/80 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-emerald-950">بيتزا مريم</span>
              <FractionDisplay numerator={1} denominator={4} size="sm" />
            </div>

            {/* Wooden Board + Pizza */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
              <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-sm select-none">
                <defs>
                  <radialGradient id="woodBoardM" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E8CA9B" />
                    <stop offset="85%" stopColor="#D5B079" />
                    <stop offset="100%" stopColor="#BF9456" />
                  </radialGradient>
                </defs>

                {/* Wooden round platter */}
                <circle cx="70" cy="70" r="66" fill="url(#woodBoardM)" stroke="#A67B38" strokeWidth="2.5" />
                <circle cx="70" cy="70" r="60" fill="none" stroke="#C39A57" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Ghost circle for the rest of the pizza plate */}
                <circle cx="70" cy="70" r="54" fill="#EADBC8" opacity="0.3" stroke="#D1BEA8" strokeWidth="1" strokeDasharray="4 2" />

                {/* Single Quarter: Top-Right Quarter (from 0° to 90°: 70,70 to 70,16 to 124,70) */}
                <g className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
                  {/* Crust layer */}
                  <path
                    d="M 70 70 L 70 16 A 54 54 0 0 1 124 70 Z"
                    fill="url(#crustGrad)"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                  />
                  {/* Cheese layer */}
                  <path
                    d="M 70 70 L 70 22 A 48 48 0 0 1 118 70 Z"
                    fill="url(#cheeseGrad)"
                  />
                  {/* Sauce edge */}
                  <path
                    d="M 70 70 L 70 24 A 46 46 0 0 1 116 70 Z"
                    fill="none"
                    stroke="#D94824"
                    strokeWidth="2.5"
                    opacity="0.85"
                  />

                  {/* Toppings on Quarter */}
                  <path d="M 86 42 Q 80 48 88 54 Q 94 46 86 42 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.5" />
                  <circle cx="92" cy="52" r="5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />
                  <circle cx="92" cy="52" r="2.8" fill="#E53935" />
                  <circle cx="80" cy="58" r="4.5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />
                  <circle cx="100" cy="62" r="3" fill="#212121" />
                  <circle cx="100" cy="62" r="1.2" fill="#EFEBE9" />
                </g>

                {/* Quarter cut line */}
                <line x1="70" y1="16" x2="70" y2="70" stroke="#7A3E1D" strokeWidth="1.5" />
                <line x1="70" y1="70" x2="124" y2="70" stroke="#7A3E1D" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="mt-2 text-center">
              <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                رُبع بيتزا (١⁄٤)
              </span>
            </div>
          </div>
        </div>

        {/* Visual Comparison Prompt */}
        <div className="mt-3 px-3 py-1.5 bg-amber-100/60 rounded-xl border border-amber-200/60 text-xs text-stone-700 flex items-center justify-between gap-3 w-full max-w-md">
          <div className="flex items-center gap-2">
            <span className="text-amber-600 font-bold">💡 ملاحظة بصرية:</span>
            <span>قطعتا سارة ومريم ليستا من نفس الحجم!</span>
          </div>
          {showEquivalentDivision ? (
            <span className="text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-md text-[11px] shadow-2xs">
              الآن كل القطع أرباع!
            </span>
          ) : (
            <span className="text-stone-500 text-[11px]">
              كيف نجعلهما متطابقتين؟
            </span>
          )}
        </div>
      </div>
    );
  }

  // Order 2: Noor had 3/4 pizza, ate 1/2 pizza.
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md bg-rose-50/50 rounded-2xl p-3 border border-rose-200/80 shadow-xs flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-950">بيتزا نور</span>
            <span className="text-[11px] text-stone-500">كانت ٣⁄٤ بيتزا</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-rose-700 font-medium">أكلت منها:</span>
            <FractionDisplay numerator={1} denominator={2} size="sm" />
          </div>
        </div>

        {/* Pizza Tray */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center my-1">
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-sm select-none">
            <defs>
              <radialGradient id="woodBoardN" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#E8CA9B" />
                <stop offset="85%" stopColor="#D5B079" />
                <stop offset="100%" stopColor="#BF9456" />
              </radialGradient>
              <radialGradient id="crustGradN" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="#E2A654" />
                <stop offset="95%" stopColor="#C97C2B" />
                <stop offset="100%" stopColor="#964E14" />
              </radialGradient>
              <radialGradient id="cheeseGradN" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF2A3" />
                <stop offset="80%" stopColor="#FBD768" />
                <stop offset="100%" stopColor="#EEA938" />
              </radialGradient>
            </defs>

            {/* Wooden Board */}
            <circle cx="80" cy="80" r="76" fill="url(#woodBoardN)" stroke="#A67B38" strokeWidth="2.5" />
            <circle cx="80" cy="80" r="70" fill="none" stroke="#C39A57" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Empty missing quarter (Bottom Right: from 90° to 180°) */}
            <path
              d="M 80 80 L 140 80 A 60 60 0 0 1 80 140 Z"
              fill="#E5D3B8"
              opacity="0.3"
              stroke="#C4A882"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <text x="105" y="112" fill="#8C7355" fontSize="10" textAnchor="middle" fontWeight="bold">
              غير موجود أصلاً
            </text>

            {/* Quarter 1: Top-Right (Consumed Half Part 1) */}
            <g
              onClick={() => setActiveSlice(activeSlice === 'eaten1' ? null : 'eaten1')}
              className="cursor-pointer transition-opacity"
            >
              <path
                d="M 80 80 L 80 20 A 60 60 0 0 1 140 80 Z"
                fill="url(#crustGradN)"
                opacity={showEquivalentDivision ? 0.35 : 0.8}
                stroke={showEquivalentDivision ? '#D32F2F' : '#8B4513'}
                strokeWidth={showEquivalentDivision ? '2' : '1.5'}
                strokeDasharray={showEquivalentDivision ? '4 3' : 'none'}
              />
              <path
                d="M 80 80 L 80 26 A 54 54 0 0 1 134 80 Z"
                fill="url(#cheeseGradN)"
                opacity={showEquivalentDivision ? 0.3 : 1}
              />
              {/* Toppings */}
              <circle cx="106" cy="56" r="5" fill="#C62828" opacity={showEquivalentDivision ? 0.4 : 1} />
              <path d="M 98 44 Q 92 50 100 56 Q 106 48 98 44 Z" fill="#2E7D32" opacity={showEquivalentDivision ? 0.4 : 1} />
              {showEquivalentDivision && (
                <text x="102" y="60" fill="#B71C1C" fontSize="11" fontWeight="bold" textAnchor="middle">
                  أُكِلَ (١⁄٤)
                </text>
              )}
            </g>

            {/* Quarter 2: Top-Left (Consumed Half Part 2) */}
            <g
              onClick={() => setActiveSlice(activeSlice === 'eaten2' ? null : 'eaten2')}
              className="cursor-pointer transition-opacity"
            >
              <path
                d="M 80 80 L 20 80 A 60 60 0 0 1 80 20 Z"
                fill="url(#crustGradN)"
                opacity={showEquivalentDivision ? 0.35 : 0.8}
                stroke={showEquivalentDivision ? '#D32F2F' : '#8B4513'}
                strokeWidth={showEquivalentDivision ? '2' : '1.5'}
                strokeDasharray={showEquivalentDivision ? '4 3' : 'none'}
              />
              <path
                d="M 80 80 L 26 80 A 54 54 0 0 1 80 26 Z"
                fill="url(#cheeseGradN)"
                opacity={showEquivalentDivision ? 0.3 : 1}
              />
              {/* Toppings */}
              <circle cx="54" cy="56" r="5" fill="#C62828" opacity={showEquivalentDivision ? 0.4 : 1} />
              <path d="M 62 44 Q 68 50 60 56 Q 54 48 62 44 Z" fill="#2E7D32" opacity={showEquivalentDivision ? 0.4 : 1} />
              {showEquivalentDivision && (
                <text x="58" y="60" fill="#B71C1C" fontSize="11" fontWeight="bold" textAnchor="middle">
                  أُكِلَ (١⁄٤)
                </text>
              )}
            </g>

            {/* Quarter 3: Bottom-Left (THE REMAINING QUARTER) */}
            <g
              onClick={() => setActiveSlice(activeSlice === 'remaining' ? null : 'remaining')}
              className="cursor-pointer"
            >
              <path
                d="M 80 80 L 80 140 A 60 60 0 0 1 20 80 Z"
                fill="url(#crustGradN)"
                stroke="#2E7D32"
                strokeWidth={showEquivalentDivision ? '3' : '1.5'}
              />
              <path
                d="M 80 80 L 80 134 A 54 54 0 0 1 26 80 Z"
                fill="url(#cheeseGradN)"
              />
              {/* Fresh crisp toppings */}
              <circle cx="56" cy="106" r="5.5" fill="#C62828" stroke="#8E0000" strokeWidth="1" />
              <circle cx="56" cy="106" r="3" fill="#E53935" />
              <path d="M 50 90 Q 44 96 52 100 Q 58 92 50 90 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="0.5" />
              <circle cx="44" cy="118" r="3" fill="#212121" />
              <circle cx="44" cy="118" r="1.2" fill="#EFEBE9" />

              {showEquivalentDivision && (
                <text x="52" y="104" fill="#1B5E20" fontSize="11" fontWeight="bold" textAnchor="middle">
                  المتبقي (؟)
                </text>
              )}
            </g>

            {/* Slice Lines */}
            <line x1="80" y1="20" x2="80" y2="140" stroke="#7A3E1D" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="20" y1="80" x2="140" y2="80" stroke="#7A3E1D" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="w-full flex items-center justify-between text-xs px-2 py-1 bg-white/80 rounded-xl border border-rose-200/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300"></span>
            <span className="text-stone-600">المأكول: النصف العلوي (١⁄٢)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-800 font-bold">القطعة المتبقية: ؟</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaVisualizer;
