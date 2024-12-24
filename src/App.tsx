import React from 'react';
import { Header } from './components/Header';
import { TaskBoard } from './components/TaskBoard';
import { Toaster } from 'sonner';
import { MotivationalQuote } from './components/MotivationalQuote';
import { ControlledProcrastination } from './features/controlled-procrastination/ControlledProcrastination';
import { DeadlineRush } from './features/deadline-rush/DeadlineRush';
import { AchievementSystem } from './features/achievements/AchievementSystem';
import { WeeklyReport } from './features/weekly-report/WeeklyReport';
import { DailyChallenge } from './features/daily-challenge/DailyChallenge';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MotivationalQuote />
            <TaskBoard />
            <WeeklyReport />
          </div>
          <div className="space-y-8">
            <DailyChallenge />
            <ControlledProcrastination />
            <DeadlineRush />
            <AchievementSystem />
          </div>
        </div>
      </div>
      <Toaster position="top-center" expand={true} richColors />
    </div>
  );
}

export default App;