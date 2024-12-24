import React from 'react';
import { Clock, Coffee } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

export const Header: React.FC = () => {
  const { tasks } = useTaskStore();
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-indigo-100/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Coffee className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DoItLater
              </h1>
              <p className="text-sm text-indigo-500">Procrastinate responsibly™</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-100/50 rounded-full">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">
              {pendingTasks} task{pendingTasks !== 1 ? 's' : ''} pending
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};