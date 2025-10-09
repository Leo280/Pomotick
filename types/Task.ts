export interface Task {
  id: string;
  title: string;
  totalPomodoros: number;
  completedPomodoros: number;
  isActive: boolean;
  timeRemaining?: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean
}

