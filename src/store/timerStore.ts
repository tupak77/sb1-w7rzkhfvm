import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BroadcastChannel } from 'broadcast-channel';

interface Task {
  id: string;
  name: string;
  estimatedTime: number; // in minutes
  remainingTime: number; // in milliseconds
  isRunning: boolean;
}

interface TimerState {
  tasks: Task[];
  activeTaskId: string | null;
  showPopup: boolean;
  position: { x: number; y: number };
}

interface TimerActions {
  addTask: (name: string, estimatedTime: number) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  startTask: (id: string) => void;
  pauseTask: (id: string) => void;
  stopTask: (id: string) => void;
  closePopup: () => void;
  setPosition: (position: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  getTotalEstimatedTime: () => number;
}

type TimerStore = TimerState & TimerActions;

// Only sync the data we need between tabs
interface SyncState {
  tasks: Task[];
  position: { x: number; y: number };
}

// Create a broadcast channel for syncing between tabs
const channel = new BroadcastChannel<{
  type: string;
  payload: SyncState;
}>('timer-sync');

// Create the store with persistence
export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => {
      // Function to broadcast state updates to other tabs
      const broadcastUpdate = (tasks: Task[], position: { x: number; y: number }) => {
        const syncState: SyncState = {
          tasks: tasks.map(task => ({
            ...task,
            isRunning: false // Ensure running state is not synced
          })),
          position
        };
        
        channel.postMessage({
          type: 'STATE_UPDATE',
          payload: syncState
        }).catch(console.error);
      };

      // Listen for updates from other tabs
      channel.onmessage = (message) => {
        if (message.type === 'STATE_UPDATE') {
          const currentState = get();
          const newState = message.payload;

          // Only update if there are meaningful changes
          const hasChanges = JSON.stringify(currentState.tasks) !== JSON.stringify(newState.tasks);
          if (hasChanges) {
            set({
              tasks: newState.tasks,
              position: newState.position
            });
          }
        }
      };

      return {
        // Initial state
        tasks: [],
        activeTaskId: null,
        showPopup: false,
        position: { x: 20, y: 20 },

        // Actions
        addTask: (name, estimatedTime) => set(state => {
          const newTasks = [...state.tasks, {
            id: crypto.randomUUID(),
            name,
            estimatedTime,
            remainingTime: estimatedTime * 60 * 1000,
            isRunning: false,
          }];
          broadcastUpdate(newTasks, state.position);
          return { ...state, tasks: newTasks };
        }),

        updateTask: (id, updates) => set(state => {
          const newTasks = state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          );
          broadcastUpdate(newTasks, state.position);
          return { ...state, tasks: newTasks };
        }),

        deleteTask: (id) => set(state => {
          const newTasks = state.tasks.filter(task => task.id !== id);
          broadcastUpdate(newTasks, state.position);
          return {
            ...state,
            tasks: newTasks,
            ...(state.activeTaskId === id ? {
              activeTaskId: null,
              showPopup: false,
            } : {})
          };
        }),

        startTask: (id) => set(state => {
          const newTasks = state.tasks.map(task => ({
            ...task,
            isRunning: task.id === id
          }));
          broadcastUpdate(newTasks, state.position);
          return {
            ...state,
            tasks: newTasks,
            activeTaskId: id,
            showPopup: true,
          };
        }),

        pauseTask: (id) => set(state => {
          const newTasks = state.tasks.map(task =>
            task.id === id ? { ...task, isRunning: false } : task
          );
          broadcastUpdate(newTasks, state.position);
          return { ...state, tasks: newTasks };
        }),

        stopTask: (id) => set(state => {
          const newTasks = state.tasks.map(task =>
            task.id === id ? {
              ...task,
              isRunning: false,
              remainingTime: task.estimatedTime * 60 * 1000
            } : task
          );
          broadcastUpdate(newTasks, state.position);
          return { ...state, tasks: newTasks };
        }),

        closePopup: () => set(state => {
          const newTasks = state.tasks.map(task => ({
            ...task,
            isRunning: false
          }));
          broadcastUpdate(newTasks, state.position);
          return {
            ...state,
            tasks: newTasks,
            activeTaskId: null,
            showPopup: false,
          };
        }),

        setPosition: (position) => set(state => {
          const newPosition = typeof position === 'function' ? position(state.position) : position;
          broadcastUpdate(state.tasks, newPosition);
          return { ...state, position: newPosition };
        }),

        getTotalEstimatedTime: () => {
          const { tasks } = get();
          return tasks.reduce((total, task) => total + task.estimatedTime, 0);
        },
      };
    },
    {
      name: 'focus-timer-storage',
      partialize: (state) => ({
        tasks: state.tasks.map(task => ({
          ...task,
          isRunning: false // Never persist running state
        })),
        position: state.position
      })
    }
  )
);