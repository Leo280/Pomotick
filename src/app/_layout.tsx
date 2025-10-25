import { useFrameworkReady } from "@/hooks/UseFrameworkReady";
import { Stack } from "expo-router";
import '../styles/global.css';
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function RootLayout() {
  useFrameworkReady()

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  )
}

