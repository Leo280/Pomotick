import { useFrameworkReady } from "@/hooks/UseFrameworkReady";
import { QueryProvider } from "@/providers/QueryProvider";
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../../contexts/ThemeContext";
import '../styles/global.css';



export default function RootLayout() {
  useFrameworkReady()
  if (__DEV__) {
    LogBox.ignoreAllLogs();
  }

  return (
    <ThemeProvider>
      <QueryProvider>
        <SafeAreaProvider >
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider >
      </QueryProvider>
    </ThemeProvider>
  )
}
