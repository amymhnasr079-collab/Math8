import React from 'react';
import { toArabicNumerals } from '../utils/arabicNumerals';

interface FractionDisplayProps {
  numerator: number | string;
  denominator: number | string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  highlight?: boolean;
  className?: string;
  subLabel?: string;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  numerator,
  denominator,
  size = 'lg',
  highlight = false,
  className = '',
  subLabel,
}) => {
  const arabicNumerator = toArabicNumerals(numerator);
  const arabicDenominator = toArabicNumerals(denominator);

  const sizeClasses = {
    sm: {
      text: 'text-base font-bold',
      line: 'w-5 h-[2px] my-[2px]',
      container: 'px-1',
    },
    md: {
      text: 'text-xl font-bold',
      line: 'w-7 h-[2px] my-[3px]',
      container: 'px-1.5',
    },
    lg: {
      text: 'text-3xl font-extrabold',
      line: 'w-10 h-[3px] my-[3px]',
      container: 'px-2',
    },
    xl: {
      text: 'text-4xl font-extrabold',
      line: 'w-12 h-[3.5px] my-[4px]',
      container: 'px-2.5',
    },
    '2xl': {
      text: 'text-5xl font-black',
      line: 'w-16 h-[4px] my-[5px]',
      container: 'px-3',
    },
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div
        className={`inline-flex flex-col items-center justify-center leading-none ${sizeClasses.container} ${
          highlight
            ? 'text-amber-700 bg-amber-50/80 rounded-lg p-1.5 border border-amber-200 shadow-xs'
            : 'text-stone-900'
        }`}
      >
        {/* البسط (Numerator) */}
        <span className={`text-center font-sans tracking-tight ${sizeClasses.text}`} aria-label={`بسط ${arabicNumerator}`}>
          {arabicNumerator}
        </span>
        {/* خط الكسر (Fraction Line) */}
        <span
          className={`bg-current rounded-full ${sizeClasses.line}`}
          role="separator"
          aria-hidden="true"
        />
        {/* المقام (Denominator) */}
        <span className={`text-center font-sans tracking-tight ${sizeClasses.text}`} aria-label={`مقام ${arabicDenominator}`}>
          {arabicDenominator}
        </span>
      </div>
      {subLabel && (
        <span className="text-[11px] text-stone-500 font-medium mt-1">
          {subLabel}
        </span>
      )}
    </div>
  );
};

export default FractionDisplay;
