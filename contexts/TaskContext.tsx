import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  totalPomodoros: number;
  completedPomodoros: number;
  isActive: boolean;
  timeRemaining?: number;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, pomodoros: number) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string) => void;
  pauseActiveTask: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
  
  ]);

  const addTask = (title: string, pomodoros: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      totalPomodoros: pomodoros,
      completedPomodoros: 0,
      isActive: false,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const setActiveTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({
        ...task,
        isActive: task.id === id,
        timeRemaining: task.id === id ? 1500 : undefined, // 25 minutos
      }))
    );
  };

  const pauseActiveTask = () => {
    setTasks(prevTasks =>
      prevTasks.map(task => ({
        ...task,
        isActive: false,
      }))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        setActiveTask,
        pauseActiveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}