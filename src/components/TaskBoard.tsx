import React, { useState } from 'react';
import { Plus, Timer } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { TaskCard } from './TaskCard';
import { toast } from 'sonner';
import { getMotivationalMessage } from '../utils/messages';

export const TaskBoard: React.FC = () => {
  const { tasks, addTask } = useTaskStore();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const button = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const rippleX = (e as unknown as MouseEvent).clientX - rect.left;
    const rippleY = (e as unknown as MouseEvent).clientY - rect.top;
    
    button.style.setProperty('--ripple-x', `${rippleX}px`);
    button.style.setProperty('--ripple-y', `${rippleY}px`);
    
    addTask(newTask.trim());
    setNewTask('');
    toast.success(getMotivationalMessage());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    addTask(newTask.trim());
    setNewTask('');
    toast.success(getMotivationalMessage());
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-4">
      <form onSubmit={handleAddTask} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-indigo-100/50">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What would you like to procrastinate on?"
            className="flex-1 px-6 py-3 rounded-xl border border-indigo-100/50 bg-white/50 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent
                     placeholder:text-indigo-300 text-indigo-900"
          />
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <div className="text-center py-16 empty-state">
            <Timer className="w-12 h-12 text-indigo-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">No tasks yet!</h3>
            <p className="text-indigo-500">Add some tasks to procrastinate on...</p>
          </div>
        ) : (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};