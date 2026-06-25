import { useEffect, useRef } from "react";

/**
 * QuizTimer
 * Props:
 *   timeLeft   – seconds remaining (number)
 *   onTick     – called every second with (prev) => prev - 1
 *   onTimeUp   – called when timer hits 0
 *   isRunning  – boolean, starts/stops the timer
 */
export default function QuizTimer({ timeLeft, onTick, onTimeUp, isRunning }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      onTick((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, onTick, onTimeUp]);

  if (timeLeft === null || timeLeft === undefined) return null;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const isLow   = timeLeft < 60;
  const isVeryLow = timeLeft < 30;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
        isVeryLow
          ? "bg-red-100 text-red-600 animate-pulse scale-105"
          : isLow
          ? "bg-red-50 text-red-500 animate-pulse"
          : "bg-surface-container text-on-surface"
      }`}
    >
      <span
        className="material-symbols-outlined text-base"
        style={{ fontVariationSettings: isLow ? '"FILL" 1' : '"FILL" 0' }}
      >
        timer
      </span>
      <span className="tabular-nums">{minutes}:{seconds}</span>
    </div>
  );
}
