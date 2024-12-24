export const BREAK_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
export const RUSH_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export const STORAGE_KEYS = {
  ACHIEVEMENTS: 'achievements-storage',
  TASKS: 'do-it-later-storage',
  TIMER: 'focus-timer-storage',
} as const;

export const SYNC_CHANNEL = 'timer-sync';