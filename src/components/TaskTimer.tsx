import React, { useEffect } from 'react';
import { Play, Pause, StopCircle, Timer } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';
import { formatTime } from '../utils/timeUtils';

export const TaskTimer: React.FC = () => {
  const { 
    isRunning, 
    taskName, 
    elapsedTime,
    setTaskName, 
    startTimer, 
    stopTimer,
    updateElapsedTime 
  } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(updateElapsedTime, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, updateElapsedTime]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Timer className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Focus Timer</h2>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="What are you working on?"
          className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isRunning}
        />

        <div className="text-center py-6">
          <span className="text-4xl font-mono font-bold text-gray-800">
            {formatTime(elapsedTime)}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          {!isRunning ? (
            <button
              onClick={startTimer}
              disabled={!taskName}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play className="w-5 h-5" />
              Start
            </button>
          ) : (
            <>
              <button
                onClick={stopTimer}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <StopCircle className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}