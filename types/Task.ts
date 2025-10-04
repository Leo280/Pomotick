import { createJSONStorage } from "zustand/middleware";

export interface Task {
  id: string;
  title: string;
  totalPomodoros: number;
  completedPomodoros: number;
  isActive: boolean;
  timeRemaining?: number;
  createdAt: string;
  updatedAt: string;
}

const useTask = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (title, pomodoros) => {
        const newTask: Task = {
          id: Crypto.randomUUID(),
          title,
          totalPomodoros: pomodoros,
          completedPomodoros: 0,
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useTask;
