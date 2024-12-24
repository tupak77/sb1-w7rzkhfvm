import React from 'react';
import { WeeklyStats } from '../../types';

interface WeeklyChartProps {
  stats: WeeklyStats;
}

export const WeeklyChart: React.FC<WeeklyChartProps> = ({ stats }) => {
  const maxValue = Math.max(...stats.completed, ...stats.postponed);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-2 h-32">
        {stats.days.map((day, index) => (
          <div key={day} className="flex flex-col gap-1">
            <div className="flex-1 flex flex-col justify-end gap-1">
              {stats.completed[index] > 0 && (
                <div 
                  className="w-full bg-emerald-500 rounded-sm transition-all duration-300"
                  style={{ 
                    height: `${(stats.completed[index] / maxValue) * 100}%`,
                  }}
                />
              )}
              {stats.postponed[index] > 0 && (
                <div 
                  className="w-full bg-indigo-400 rounded-sm transition-all duration-300"
                  style={{ 
                    height: `${(stats.postponed[index] / maxValue) * 100}%`,
                  }}
                />
              )}
            </div>
            <span className="text-xs text-center text-indigo-600 font-medium">
              {day}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
          <span className="text-indigo-600">Completadas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-400 rounded-sm" />
          <span className="text-indigo-600">Pospuestas</span>
        </div>
      </div>
    </div>
  );
};