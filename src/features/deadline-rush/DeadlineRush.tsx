import React, { useState, useEffect } from 'react';
import { Timer, Zap, Trophy } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useAchievements } from '../../hooks/useAchievements';
import { formatTime } from '../../utils/timeUtils';
import { toast } from 'sonner';

export const DeadlineRush: React.FC = () => {
  const [isRushing, setIsRushing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { tasks, updateTask } = useTaskStore();
  const { unlockAchievement } = useAchievements();

  const startRush = (taskId: string, duration: number) => {
    setIsRushing(true);
    setTimeLeft(duration);
    
    toast('Deadline Rush mode activated! 🚀', {
      description: "It's time to show your speed!",
    });

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setIsRushing(false);
          unlockAchievement('speed_demon');
          toast.success('You made it just in time, hero! 🎉', {
            description: "You're officially a deadline master.",
          });
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  const getIntensityColor = (timeLeft: number, totalTime: number) => {
    const percentage = timeLeft / totalTime;
    if (percentage > 0.6) return 'from-emerald-500 to-teal-500';
    if (percentage > 0.3) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-indigo-900">Deadline Rush</h3>
        </div>

        {isRushing ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {formatTime(timeLeft)}
              </div>
            </div>

            <div className="relative h-3 bg-indigo-100 rounded-full overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${getIntensityColor(timeLeft, 5 * 60 * 1000)} transition-all duration-300`}
                style={{
                  width: `${(timeLeft / (5 * 60 * 1000)) * 100}%`,
                }}
              />
            </div>

            <p className="text-center text-indigo-600 animate-pulse">
              Time flies! ⚡
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-indigo-600">
              Need an adrenaline boost? Turn your task into an exciting race against time!
            </p>
            <button
              onClick={() => startRush('task-id', 5 * 60 * 1000)}
              className="w-full btn-primary group"
            >
              <Timer className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Start 5-minute Rush
            </button>
          </div>
        )}
      </div>
    </div>
  );
};