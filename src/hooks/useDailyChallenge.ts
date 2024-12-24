import { useState, useEffect } from 'react';
import { useTaskStore } from '../store/taskStore';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  completed: boolean;
}

const CHALLENGES = [
  {
    id: '1',
    title: 'Task Sprinter',
    description: 'Complete 2 tasks in the next 20 minutes',
    timeLimit: 20,
  },
  {
    id: '2',
    title: 'Productivity Marathon',
    description: 'Complete 3 pending tasks in 30 minutes',
    timeLimit: 30,
  },
  {
    id: '3',
    title: 'Final Sprint',
    description: "Finish that task you've been postponing in 15 minutes",
    timeLimit: 15,
  },
];

export const useDailyChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const { tasks } = useTaskStore();

  useEffect(() => {
    // Get a random challenge for the day
    const dailyChallenge = {
      ...CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)],
      completed: false,
    };
    setChallenge(dailyChallenge);
  }, []);

  const acceptChallenge = () => {
    toast('Challenge accepted! 🎯', {
      description: 'Time is ticking, show your power!',
    });
  };

  const completeChallenge = () => {
    if (!challenge) return;
    
    setChallenge(prev => prev ? { ...prev, completed: true } : null);
    
    toast.success('Challenge completed! 🎉', {
      description: "You're unstoppable! Keep it up.",
    });
  };

  return {
    challenge,
    acceptChallenge,
    completeChallenge,
  };
};