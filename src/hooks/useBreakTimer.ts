import { useState, useCallback } from 'react';
import { useAchievements } from './useAchievements';
import { toast } from 'sonner';
import { getRandomSarcasticResponse } from '../utils/sarcasm';

export const useBreakTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const { unlockAchievement } = useAchievements();

  const startBreak = useCallback((minutes: number) => {
    setTimeLeft(minutes * 60 * 1000);
    setIsBreakTime(true);
    unlockAchievement('zen_master');

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          toast.success('¡Se acabó el descanso! Es hora de brillar ✨', {
            duration: 5000,
          });
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [unlockAchievement]);

  const skipBreak = useCallback(() => {
    const response = getRandomSarcasticResponse();
    toast(response.message, {
      icon: response.emoji,
      description: '¡Volvamos al trabajo!',
      duration: 4000,
    });
    setTimeLeft(0);
    setIsBreakTime(false);
  }, []);

  const endBreak = useCallback(() => {
    setIsBreakTime(false);
    setTimeLeft(0);
  }, []);

  return {
    timeLeft,
    isBreakTime,
    startBreak,
    skipBreak,
    endBreak,
  };
};