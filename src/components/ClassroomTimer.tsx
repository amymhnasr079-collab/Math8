import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';
import { formatTimeInArabic, playChimeSound, toArabicNumerals } from '../utils/arabicNumerals';

interface ClassroomTimerProps {
  initialMinutes?: number;
}

export const ClassroomTimer: React.FC<ClassroomTimerProps> = ({
  initialMinutes = 4,
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playChimeSound();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(selectedMinutes * 60);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(selectedMinutes * 60);
    setTotalSeconds(selectedMinutes * 60);
  };

  const setDuration = (mins: number) => {
    setSelectedMinutes(mins);
    setTotalSeconds(mins * 60);
    setRemainingSeconds(mins * 60);
    setIsRunning(false);
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const isFinished = remainingSeconds === 0;

  return (
    <div className="flex items-center gap-3 bg-stone-100/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-stone-200/80 shadow-2xs select-none">
      {/* Time Display with Arabic digits */}
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-8 h-8 transform -rotate-90">
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="#E7E5E4"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke={isFinished ? '#DC2626' : isRunning ? '#D97706' : '#78716C'}
              strokeWidth="2.5"
              strokeDasharray={81.68}
              strokeDashoffset={81.68 - (81.68 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute text-[11px] font-bold text-stone-700">
            ⏱️
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-stone-500 font-medium">مؤقت التمهيد</span>
          <span className={`text-base font-black tracking-wider font-mono ${isFinished ? 'text-red-600 animate-bounce' : 'text-stone-900'}`}>
            {formatTimeInArabic(remainingSeconds)}
          </span>
        </div>
      </div>

      {/* Preset pills: 3, 4, 5 minutes */}
      <div className="hidden sm:flex items-center gap-1 border-r border-stone-200 pr-2 mr-1">
        {[3, 4, 5].map((mins) => (
          <button
            key={mins}
            onClick={() => setDuration(mins)}
            className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-colors ${
              selectedMinutes === mins
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-200/70'
            }`}
          >
            {toArabicNumerals(mins)} د
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleTimer}
          className={`p-1.5 rounded-lg text-white font-medium transition-all ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700'
              : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
          title={isRunning ? 'إيقاف مؤقت' : 'بدء المؤقت'}
          aria-label={isRunning ? 'إيقاف مؤقت' : 'بدء المؤقت'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors"
          title="إعادة ضبط"
          aria-label="إعادة ضبط"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={playChimeSound}
          className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200 hover:text-amber-700 transition-colors"
          title="تجربة صوت التنبيه"
          aria-label="تجربة صوت التنبيه"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ClassroomTimer;
