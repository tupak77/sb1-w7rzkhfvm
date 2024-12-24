import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  height?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showLabel = false,
  height = 'md',
  gradient = true,
}) => {
  const percentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="relative">
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={clsx(
            "font-medium transition-colors",
            percentage > 50 ? "text-indigo-600" : "text-indigo-400"
          )}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={clsx(
        "bg-indigo-100 rounded-full overflow-hidden",
        {
          'h-2': height === 'sm',
          'h-3': height === 'md',
          'h-4': height === 'lg',
        }
      )}>
        <div
          className={clsx(
            "h-full transition-all duration-300",
            gradient ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-indigo-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};