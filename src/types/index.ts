export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface WeeklyStats {
  days: string[];
  completed: number[];
  postponed: number[];
}

export interface WeeklyInsights {
  achievement: string;
  productivity: string;
  tip: string;
  trend: string;
}

export interface SarcasticResponse {
  message: string;
  emoji: string;
}