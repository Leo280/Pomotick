import { InsertTables, Tables, UpdateTables } from './Helper';

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
  lastUpdateTimer: string;
  pomodoroTime: number;
  sessionType: string;
  shortBreakTime?: number;
  longBreakTime?: number;
}

export type InsertTask = InsertTables<"tasks"> & { pomodoros: number }

export type UpdateTask = UpdateTables<"tasks">

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
    lastUpdateTimer: db.last_update_timer || "",
    pomodoroTime: db.pomodoro_time,
    sessionType: db.session_type || "pomodoro",
    shortBreakTime: db.short_break_time || 5,
    longBreakTime: db.long_break_time || 15,
  };
}
