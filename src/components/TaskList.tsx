import React, { useState } from 'react';
import { Play, Pause, Edit2, Trash2, Plus, Clock } from 'lucide-react';
import { useTimerStore } from '../store/timerStore';
import { formatMinutes, formatTime } from '../utils/timeUtils';

export const TaskList: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, startTask, pauseTask, getTotalEstimatedTime } = useTimerStore();
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName && newTaskTime) {
      addTask(newTaskName, parseInt(newTaskTime));
      setNewTaskName('');
      setNewTaskTime('');
    }
  };

  const handleEdit = (taskId: string, name: string, time: number) => {
    updateTask(taskId, { 
      name, 
      estimatedTime: time,
      remainingTime: time * 60 * 1000 
    });
    setEditingTask(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Task Manager</h2>
        <p className="text-indigo-600">Manage your time efficiently</p>
      </div>

      <form onSubmit={handleAddTask} className="mb-8">
        <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff] space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="What would you like to work on?"
              className="flex-1 px-6 py-3 rounded-xl bg-[#f0f3ff] neumorphic-inset text-indigo-900 placeholder-indigo-400 focus:outline-none"
            />
            <input
              type="number"
              value={newTaskTime}
              onChange={(e) => setNewTaskTime(e.target.value)}
              placeholder="Minutes"
              min="1"
              className="w-32 px-6 py-3 rounded-xl bg-[#f0f3ff] neumorphic-inset text-indigo-900 placeholder-indigo-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl neumorphic-button hover:opacity-90 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
            {editingTask === task.id ? (
              <div className="flex gap-4">
                <input
                  type="text"
                  defaultValue={task.name}
                  className="flex-1 px-6 py-3 rounded-xl bg-[#f0f3ff] neumorphic-inset text-indigo-900 focus:outline-none"
                  onBlur={(e) => handleEdit(task.id, e.target.value, task.estimatedTime)}
                />
                <input
                  type="number"
                  defaultValue={task.estimatedTime}
                  className="w-32 px-6 py-3 rounded-xl bg-[#f0f3ff] neumorphic-inset text-indigo-900 focus:outline-none"
                  onBlur={(e) => handleEdit(task.id, task.name, parseInt(e.target.value))}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-900 mb-1">{task.name}</h3>
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">
                        Estimated: {formatMinutes(task.estimatedTime)} | 
                        Remaining: {formatTime(task.remainingTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => task.isRunning ? pauseTask(task.id) : startTask(task.id)}
                      className={`p-3 rounded-xl neumorphic-button ${
                        task.isRunning 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
                          : 'bg-gradient-to-r from-emerald-400 to-teal-400'
                      } text-white`}
                    >
                      {task.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setEditingTask(task.id)}
                      className="p-3 rounded-xl neumorphic-button text-indigo-600 hover:text-indigo-700"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-3 rounded-xl neumorphic-button text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="h-2 bg-[#e4e9ff] rounded-full overflow-hidden">
                  <div 
                    className="progress-bar h-full rounded-full"
                    style={{ 
                      width: `${(1 - task.remainingTime / (task.estimatedTime * 60 * 1000)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.length > 0 && (
        <div className="mt-8 p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
          <div className="flex items-center justify-between">
            <span className="text-indigo-600 font-medium">Total Estimated Time</span>
            <span className="text-2xl font-bold text-indigo-900">
              {formatMinutes(getTotalEstimatedTime())}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};