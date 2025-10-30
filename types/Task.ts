import { Tables } from './Helper';


// export interface Task {
//   id: string;
//   title: string;
//   totalPomodoros: number;
//   completedPomodoros: number;
//   isActive: boolean;
//   timeRemaining?: number;
//   createdAt: string;
//   updatedAt: string;
//   isFavorite: boolean;
//   userId: string;
// }

export type Task = Tables<"tasks">
export type InsertTask = {
  title: string
  pomodoros: number
}

