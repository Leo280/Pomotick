import { Tables } from './Helper';

export type TaskDB = Tables<"tasks">

export interface Task {
  id: string;
  title: string;
  totalPomodoros: number;
  completedPomodoros: number;
  isActive: boolean;
  timeRemaining?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type InsertTask = {
  title: string
  pomodoros: number
}

export function mapTaskDBToTask(db: TaskDB): Task {
  return {
    id: db.id,
    title: db.title,
    totalPomodoros: db.total_pomodoros,
    completedPomodoros: db.completed_pomodoros,
    isActive: db.is_active,
    timeRemaining: db.time_remaining,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
    userId: db.user_id,
  };
}
