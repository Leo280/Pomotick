import { Task } from '@/types/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TaskStore {
  tasks: Task[];
  favorites: Task[];
  addTask: (title: string, pomodoros: number, isFavorite?: boolean) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string) => void;
  pauseActiveTask: () => void;
  // changeFavorite: (id: string) => void;
}

const useTask = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      favorites: [],
      addTask: (title, pomodoros) => {
        const newTask: Task = {
          id: Crypto.randomUUID(),
          title,
          total_pomodoros: pomodoros,
          completed_pomodoros: 0,
          is_active: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          time_remaining: pomodoros * 25 * 60,
          user_id: "teste"
        };
        set(state => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
          )
        }));
      },
      deleteTask: (id) => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id)
        }));
      },
      setActiveTask: (id) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? { ...task, isActive: true }
              : { ...task, isActive: false }
          )
        }));
      },
      pauseActiveTask: () => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.is_active ? { ...task, is_active: false } : task
          )
        }));
      },
      // changeFavorite: (id) => {
      //   set(state => {
      //     const tasks = state.tasks.map(task =>
      //       task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
      //     );
      //     const favorites = tasks.filter(task => task.isFavorite);
      //     return { tasks, favorites };
      //   });
      // },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useTask;
