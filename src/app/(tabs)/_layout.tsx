import FloatingTabBar from "@/src/components/FloatingTabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true
      }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="addTask" options={{
        title: 'Nova Tarefa',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? 'create' : 'create-outline'} size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Ajustes',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
        )
      }} />
      <Tabs.Screen name="about" options={{
        title: 'Sobre',
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} size={size} color={color} />
        )
      }} />
    </Tabs>
  )
}
