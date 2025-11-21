import { supabase } from "@/libs/supabase";
import useAppSettings from "@/stores/AppSettingsStore";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "expo-router";
import {
  Bell,
  ChevronRight,
  LogOut,
  Moon,
  Smartphone,
  Volume2
} from 'lucide-react-native';
import React from "react";
import { ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from "../../../contexts/ThemeContext";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { setSession, setUser } = useAuthStore()
  const settingsStore = useAppSettings()
  const settings = settingsStore.settings
  const router = useRouter()

  const handleLogout = async () => {
    setSession(null)
    setUser(null)
    await supabase.auth.signOut()
    router.replace("/login")
  }

  const SettingRow = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement,
    showArrow = false,
    iconBackgroundClassName = 'bg-gray-100',
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showArrow?: boolean;
    iconBackgroundClassName?: string;

  }) => (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-4" onPress={onPress}>
      <View className="flex-row items-center flex-1">
        <View className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${iconBackgroundClassName}`}>
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-800 dark:text-white">{title}</Text>
          {subtitle && <Text className="text-sm text-gray-500 mt-0.5 dark:text-gray-300">{subtitle}</Text>}
        </View>
      </View>
      <View className="flex-row items-center gap-2">
        {rightElement}
        {showArrow && <ChevronRight size={20} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
  return (

    <SafeAreaView className="flex-1 p-4 bg-gray-100 dark:bg-neutral-900">

      <View className='flex-row justify-center items-center pt-5'>
        <Text className="text-2xl text-blue-950 pl-3 font-bold dark:text-white">Configurações</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>


        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3 dark:text-white">Notificações</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm dark:bg-neutral-800">
            <SettingRow
              icon={<Bell size={20} color="#fff" />}
              title="Notificações Push"
              subtitle="Receba lembretes sobre suas tarefas"
              iconBackgroundClassName="bg-[#DF381B]"
              rightElement={
                <Switch
                  value={settings.pushNotification}
                  onValueChange={settingsStore.enablePush}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={settings.pushNotification ? '#fff' : '#F3F4F6'}
                />
              }
            />
            <View className="h-px bg-gray-200 dark:bg-neutral-700 ml-17" />
            <SettingRow
              icon={<Volume2 size={20} color="#fff" />}
              title="Sons"
              subtitle="Sons de início e fim dos ciclos"
              iconBackgroundClassName="bg-[#CF1751]"
              rightElement={
                <Switch
                  value={settings.sounds}
                  onValueChange={settingsStore.enableSound}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={settings.sounds ? '#fff' : '#F3F4F6'}
                />
              }
            />
            <View className="h-px bg-gray-200 dark:bg-neutral-700 ml-17" />
            <SettingRow
              icon={<Smartphone size={20} color="#fff" />}
              title="Vibração"
              subtitle="Feedback tátil durante as transições"
              iconBackgroundClassName="bg-[#B51212]"
              rightElement={
                <Switch
                  value={settings.vibration}
                  onValueChange={settingsStore.enableVibration}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={settings.vibration ? '#fff' : '#F3F4F6'}
                />
              }
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3 dark:text-white">Aparência</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm dark:bg-neutral-800">
            <SettingRow
              icon={<Moon size={20} color="#fff" />}
              title="Modo Escuro"
              subtitle="Ativar tema escuro para melhor visualização"
              iconBackgroundClassName="bg-[#3C3A40]"
              rightElement={
                <Switch
                  value={theme === "dark"}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={settings.theme === "dark" ? '#fff' : '#F3F4F6'}
                />
              }
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <View className="bg-white mx-6 rounded-3xl shadow-sm dark:bg-neutral-800">
            <SettingRow
              icon={<LogOut size={20} color="#fff" />}
              title="Sair"
              subtitle="Clique aqui para sair do app"
              iconBackgroundClassName="bg-[#3C3A40]"
              rightElement={
                <TouchableOpacity
                  onPress={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded-full"
                >
                  <Text className="text-white font-semibold">Sair</Text>
                </TouchableOpacity>
              }
            />
          </View>
        </View>

        <View className="px-6 py-8 items-center">
          <Text className="text-sm text-gray-400 text-center leading-5">
            Pomotick v1.0.0{'\n'}
            Desenvolvido para produtividade
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}
