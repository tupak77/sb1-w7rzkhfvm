import React from 'react';
import { CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <div className={clsx(
      'task-card group',
      task.completed ? 'bg-green-50/80 border-green-100/50' : 'bg-white/80 border-indigo-100/50'
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={clsx(
            'text-lg font-semibold mb-2 break-words',
            task.completed ? 'text-green-600 line-through' : 'text-indigo-900'
          )}>
            {task.text}
          </h3>
          <div className="flex items-center gap-2 text-sm text-indigo-500">
            <Clock className="w-4 h-4" />
            <span>Added {formatDistanceToNow(task.createdAt)} ago</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleTask(task.id)}
            className={clsx(
              'p-2 rounded-lg transition-all duration-200 hover:scale-110',
              task.completed ? 'text-green-600 hover:text-green-700' : 'text-indigo-400 hover:text-indigo-600'
            )}
          >
            <CheckCircle2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 rounded-lg text-indigo-400 hover:text-red-600 transition-all duration-200 hover:scale-110"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};