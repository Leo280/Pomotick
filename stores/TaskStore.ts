import { Task } from "@/types/Task";
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
  changeFavorite: (id: string) => void;
}

const useTask = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      favorites: [],
      addTask: (title, pomodoros, isFavorite) => {
        const newTask: Task = {
          id: Crypto.randomUUID(),
          title,
          totalPomodoros: pomodoros,
          completedPomodoros: 0,
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isFavorite: isFavorite || false
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
            task.isActive ? { ...task, isActive: false } : task
          )
        }));
      },
      changeFavorite: (id) => {
        set(state => {
          const tasks = state.tasks.map(task =>
            task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
          );
          const favorites = tasks.filter(task => task.isFavorite);
          return { tasks, favorites };
        });
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useTask;
