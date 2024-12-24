import React from 'react';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';
import { useWeeklyStats } from '../../hooks/useWeeklyStats';
import { WeeklyChart } from './WeeklyChart';
import { WeeklyInsights } from './WeeklyInsights';

export const WeeklyReport: React.FC = () => {
  const { stats, insights } = useWeeklyStats();
  
  return (
    <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <h3 className="text-xl font-bold text-indigo-900">Your Week</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-indigo-600">
            <Calendar className="w-4 h-4" />
            <span>Last 7 days</span>
          </div>
        </div>

        <WeeklyChart stats={stats} />
        <WeeklyInsights insights={insights} />
        
        <div className="flex items-center gap-2 text-sm text-indigo-600">
          <TrendingUp className="w-4 h-4" />
          <span>{insights.trend}</span>
        </div>
      </div>
    </div>
  );
};