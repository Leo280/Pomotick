import useAppSettings from "@/stores/AppSettingsStore";
import { useColorScheme } from "nativewind";
import React, { createContext, useContext, useEffect } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { setColorScheme } = useColorScheme();
  const { settings: { theme }, setTheme } = useAppSettings()

  useEffect(() => {
    if (theme !== "") {
      setColorScheme(theme)
      return
    }
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme ?? "light");
      setTheme(colorScheme ?? "light");
    });
    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setColorScheme(newTheme);
    setTheme(newTheme)
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
