import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (text: string) => set((state) => ({
        tasks: [
          {
            id: crypto.randomUUID(),
            text,
            completed: false,
            createdAt: new Date(),
          },
          ...state.tasks,
        ],
      })),
      toggleTask: (id: string) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      })),
      deleteTask: (id: string) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
    }),
    {
      name: 'do-it-later-storage',
    }
  )
);