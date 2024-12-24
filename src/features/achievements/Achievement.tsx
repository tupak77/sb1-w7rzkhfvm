import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface AchievementProps {
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
}

export const Achievement: React.FC<AchievementProps> = ({
  icon,
  title,
  description,
  progress,
  total,
}) => {
  const isComplete = progress >= total;
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div className={clsx(
      'p-6 rounded-xl transition-all duration-200 neumorphic',
      isComplete ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : 'bg-[#f0f3ff]'
    )}>
      <div className="flex items-start gap-4">
        <div className={clsx(
          'w-12 h-12 flex items-center justify-center text-2xl rounded-xl',
          isComplete ? 'bg-yellow-500' : 'bg-indigo-100'
        )}>
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-lg text-indigo-900">{title}</h4>
            {isComplete && (
              <CheckCircle2 className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <p className="text-sm text-indigo-600 mt-1">{description}</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-indigo-600 font-medium">{progress}/{total}</span>
              <span className="text-indigo-600 font-medium">{Math.round(percentage)}%</span>
            </div>
            <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-500',
                  isComplete ? 'bg-yellow-500' : 'bg-indigo-500'
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};