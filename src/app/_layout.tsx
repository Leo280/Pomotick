import { useFrameworkReady } from "@/hooks/UseFrameworkReady";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../styles/global.css';
import { QueryProvider } from "@/providers/QueryProvider";


export default function RootLayout() {
  useFrameworkReady()

  return (
    <QueryProvider>
      <SafeAreaProvider >
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider >
    </QueryProvider>
  )
}