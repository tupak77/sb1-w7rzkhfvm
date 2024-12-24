import React, { useState, useEffect } from 'react';
import { Timer, Coffee, AlertCircle, SkipForward } from 'lucide-react';
import { useBreakTimer } from '../../hooks/useBreakTimer';
import { BreakActivity } from './BreakActivity';
import { getMotivationalMessage } from '../../utils/messages';
import clsx from 'clsx';

export const ControlledProcrastination: React.FC = () => {
  const { 
    timeLeft, 
    isBreakTime, 
    startBreak, 
    skipBreak,
    endBreak 
  } = useBreakTimer();
  
  const [showEndMessage, setShowEndMessage] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && isBreakTime) {
      setShowEndMessage(true);
      const timer = setTimeout(() => {
        setShowEndMessage(false);
        endBreak();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isBreakTime, endBreak]);

  if (!isBreakTime) {
    return (
      <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
        <div className="text-center space-y-6">
          <Coffee className="w-12 h-12 text-indigo-500 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-indigo-900">
              Need a Productive Break?
            </h3>
            <p className="text-indigo-600">
              Take a controlled break. I'll let you know when it's time to get back to work!
            </p>
          </div>
          <button
            onClick={() => startBreak(15)}
            className="w-full btn-primary group"
          >
            <Timer className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Start 15min Break
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      "p-6 neumorphic rounded-2xl bg-[#f0f3ff]",
      showEndMessage && "animate-pulse"
    )}>
      {showEndMessage ? (
        <div className="text-center space-y-6">
          <AlertCircle className="w-12 h-12 text-indigo-500 mx-auto animate-bounce" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-indigo-900">
              Break Time's Over!
            </h3>
            <p className="text-lg text-indigo-600 font-medium">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <BreakActivity timeLeft={timeLeft} />
          <button
            onClick={skipBreak}
            className="w-full py-3 px-4 rounded-xl text-indigo-600 hover:text-indigo-700 hover:bg-white/50 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <SkipForward className="w-5 h-5" />
            Skip Break
          </button>
        </div>
      )}
    </div>
  );
};