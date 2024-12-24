import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string;
}

interface AchievementState {
  achievements: Record<string, Achievement>;
  unlockAchievement: (type: string) => void;
  getProgress: () => { completed: number; total: number };
}

const ACHIEVEMENTS: Record<string, Omit<Achievement, 'progress'>> = {
  last_minute_hero: {
    id: 'last_minute_hero',
    title: 'Last Minute Hero',
    description: 'Complete 5 tasks just before the deadline',
    total: 5,
    icon: '👑',
  },
  speed_demon: {
    id: 'speed_demon',
    title: 'Deadline Sprinter',
    description: 'Complete 3 tasks in Deadline Rush mode',
    total: 3,
    icon: '⚡',
  },
  zen_master: {
    id: 'zen_master',
    title: 'Zen Master',
    description: 'Take 10 controlled breaks',
    total: 10,
    icon: '🧘‍♂️',
  },
  task_hunter: {
    id: 'task_hunter',
    title: 'Task Hunter',
    description: 'Complete 5 tasks in one day',
    total: 5,
    icon: '🎯',
  },
};

export const useAchievements = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: Object.fromEntries(
        Object.entries(ACHIEVEMENTS).map(([key, achievement]) => [
          key,
          { ...achievement, progress: 0 },
        ])
      ),

      unlockAchievement: (type: string) => {
        if (!ACHIEVEMENTS[type]) return;

        set((state) => {
          const achievement = state.achievements[type];
          if (!achievement || achievement.progress >= achievement.total) return state;

          const newProgress = achievement.progress + 1;
          const isNewlyCompleted = newProgress === achievement.total;

          if (isNewlyCompleted) {
            toast.success(
              `🎉 Achievement Unlocked!\n${achievement.title}`,
              {
                duration: 5000,
                icon: achievement.icon,
              }
            );
          }

          return {
            achievements: {
              ...state.achievements,
              [type]: {
                ...achievement,
                progress: newProgress,
              },
            },
          };
        });
      },

      getProgress: () => {
        const achievements = get().achievements;
        const completed = Object.values(achievements).filter(
          (a) => a.progress >= a.total
        ).length;
        return {
          completed,
          total: Object.keys(ACHIEVEMENTS).length,
        };
      },
    }),
    {
      name: 'achievements-storage',
    }
  )
);