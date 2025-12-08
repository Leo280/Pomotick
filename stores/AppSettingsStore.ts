import { AppSettings } from "@/types/AppSettings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppSettingsStore {
  settings: AppSettings,
  changeFocusDuration: (duration: number) => void
  changeShortPauseDuration: (duration: number) => void
  changeLongPauseDuration: (duration: number) => void
  enableSound: () => void
  enablePush: () => void
  enableVibration: () => void
  setTheme: (scheme: "light" | "dark") => void
}

const useAppSettings = create<AppSettingsStore>()(
  persist(
    (set) => ({
      settings: {
        focusDuration: 25 * 60 * 1000,
        shortPause: 5 * 60 * 1000,
        longPause: 15 * 60 * 1000,
        sounds: true,
        pushNotification: true,
        vibration: true,
        theme: "",
      },
      changeFocusDuration: (duration) => set(state => ({ settings: { ...state.settings, focusDuration: duration } })),
      changeShortPauseDuration: (duration) => set(state => ({ settings: { ...state.settings, shortPause: duration } })),
      changeLongPauseDuration: (duration) => set(state => ({ settings: { ...state.settings, longPause: duration } })),
      enableSound: () => set(state => ({ settings: { ...state.settings, sounds: !state.settings.sounds } })),
      enablePush: () => set(state => ({ settings: { ...state.settings, pushNotification: !state.settings.pushNotification } })),
      enableVibration: () => set(state => ({ settings: { ...state.settings, vibration: !state.settings.vibration } })),
      setTheme: (theme) => set(state => ({ settings: { ...state.settings, theme } })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useAppSettings;

