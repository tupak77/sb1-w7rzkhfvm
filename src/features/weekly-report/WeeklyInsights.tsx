import React from 'react';
import { Trophy, Rocket, Brain } from 'lucide-react';
import { WeeklyInsights as InsightsType } from '../../types';

interface WeeklyInsightsProps {
  insights: InsightsType;
}

export const WeeklyInsights: React.FC<WeeklyInsightsProps> = ({ insights }) => {
  return (
    <div className="grid gap-4">
      <div className="p-4 bg-white/50 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-indigo-900">Achievement of the Week</h4>
            <p className="text-sm text-indigo-600">{insights.achievement}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/50 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Rocket className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-indigo-900">Productivity</h4>
            <p className="text-sm text-indigo-600">{insights.productivity}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/50 rounded-xl backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-purple-500 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-indigo-900">Personal Tip</h4>
            <p className="text-sm text-indigo-600">{insights.tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};