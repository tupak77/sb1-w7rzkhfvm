import React from 'react';
import { Timer } from 'lucide-react';
import { formatTime } from '../../utils/timeUtils';
import { useRandomActivity } from '../../hooks/useRandomActivity';
import clsx from 'clsx';

interface BreakActivityProps {
  timeLeft: number;
}

export const BreakActivity: React.FC<BreakActivityProps> = ({ timeLeft }) => {
  const activity = useRandomActivity();
  const percentage = (timeLeft / (15 * 60 * 1000)) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-100 rounded-full">
          <Timer className="w-5 h-5 text-indigo-600" />
          <span className="text-2xl font-mono font-bold text-indigo-600">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-indigo-900">
          Break Time! 🎉
        </h3>
        <div className="p-6 bg-white/50 rounded-xl backdrop-blur-sm">
          <p className="text-lg text-indigo-600 font-medium">
            {activity.text}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={clsx(
            "font-medium transition-colors",
            percentage > 50 ? "text-indigo-600" : "text-indigo-400"
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="h-3 bg-indigo-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};