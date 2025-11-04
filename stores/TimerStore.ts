import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TimerState = {
  minutes: number;
  seconds: number;
  lastUpdated: number;
  isRunning: boolean;
};

type TimerStore = {
  timers: Record<string, TimerState>;
  completedPomodoros: Record<string, number>;
  addTimer: (taskId: string, initial?: TimerState) => void;
  start: (taskId: string) => void;
  pause: (taskId: string) => void;
  tick: (taskId: string) => void;
  reset: (taskId: string, initial?: TimerState) => void;
  incrementPomodoro: (taskId: string, totalPomodoros: number) => void;
};

function decrementTimer(timer: TimerState, deltaSeconds: number): TimerState {
  let totalSeconds = timer.minutes * 60 + timer.seconds - deltaSeconds;
  totalSeconds = Math.max(0, totalSeconds);
  return {
    ...timer,
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    lastUpdated: Date.now(),
  };
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      timers: {},
      completedPomodoros: {},

      addTimer: (taskId, initial) =>
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: initial || { minutes: 25, seconds: 0, lastUpdated: Date.now(), isRunning: false },
          },
        })),

      start: (taskId) =>
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: { ...state.timers[taskId], isRunning: true, lastUpdated: Date.now() },
          },
        })),

      pause: (taskId) =>
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: { ...state.timers[taskId], isRunning: false },
          },
        })),

      tick: (taskId) => {
        const timer = get().timers[taskId];
        if (!timer || !timer.isRunning) return;

        const now = Date.now();
        const deltaSeconds = Math.floor((now - timer.lastUpdated) / 1000);
        if (deltaSeconds <= 0) return;

        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: decrementTimer(timer, deltaSeconds),
          },
        }));
      },

      reset: (taskId, initial) =>
        set((state) => ({
          timers: {
            ...state.timers,
            [taskId]: initial || { minutes: 25, seconds: 0, lastUpdated: Date.now(), isRunning: false },
          },
        })),

      incrementPomodoro: (taskId, totalPomodoros) =>
        set((state) => ({
          completedPomodoros: {
            ...state.completedPomodoros,
            [taskId]:
              ((state.completedPomodoros[taskId] || 0) + 1) % totalPomodoros,
          },
        })),
    }),
    {
      name: "timer-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

