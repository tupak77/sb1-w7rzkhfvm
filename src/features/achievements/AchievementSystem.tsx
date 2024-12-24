import React from 'react';
import { Trophy } from 'lucide-react';
import { useAchievements } from '../../hooks/useAchievements';
import { Achievement } from './Achievement';

export const AchievementSystem: React.FC = () => {
  const { achievements, getProgress } = useAchievements();
  const progress = getProgress();

  return (
    <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-indigo-900">Your Achievements</h3>
          </div>
          <div className="text-sm font-medium text-indigo-600">
            {progress.completed}/{progress.total} Unlocked
          </div>
        </div>

        <div className="grid gap-4">
          {Object.values(achievements).map((achievement) => (
            <Achievement
              key={achievement.id}
              icon={achievement.icon}
              title={achievement.title}
              description={achievement.description}
              progress={achievement.progress}
              total={achievement.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};