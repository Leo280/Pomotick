import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Text } from "react-native-gesture-handler";
import {
  Bell,
  ChevronRight,
  Clock,
  Info,
  Moon,
  Smartphone,
  User,
  Volume2
} from 'lucide-react-native';
import { Feather } from "@expo/vector-icons";


export default function SettingsScreen() {
 const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [vibration, setVibration] = useState(true);

  const SettingRow = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement,
    showArrow = false 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-4" onPress={onPress}>
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-3">
          {icon}
        </View>
        <View className="flex-1">
          <Text className="text-base font-medium text-gray-800">{title}</Text>
          {subtitle && <Text className="text-sm text-gray-500 mt-0.5">{subtitle}</Text>}
        </View>
      </View>
      <View className="flex-row items-center gap-2">
        {rightElement}
        {showArrow && <ChevronRight size={20} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
return(

  <SafeAreaView className="flex-1 p-6 pt-9 bg-gray-100">
      <View className="flex-row justify-between items-center ml-28">
        <View className='flex-row justify-center items-center pt-5'>
          <Text className="text-2xl text-blue-950 pl-3 font-bold">Configurações</Text>
        </View>
        <DrawerToggleButton tintColor='#172554' />
      </View>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Perfil</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Clock size={20} color="#6B7280" />}
              title="Meu Perfil"
              subtitle="Gerencie suas informações pessoais"
              showArrow
              onPress={() => console.log('Perfil pressed')}
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Pomodoro</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Clock size={20} color="#270C56"  />}
              title="Duração do Foco"
              subtitle="25 minutos"
              showArrow
              onPress={() => console.log('Focus duration pressed')}
              
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Clock size={20} color="#6B7280" />}
              title="Pausa Curta"
              subtitle="5 minutos"
              showArrow
              onPress={() => console.log('Short break pressed')}
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Clock size={20} color="#6B7280" />}
              title="Pausa Longa"
              subtitle="15 minutos"
              showArrow
              onPress={() => console.log('Long break pressed')}
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Notificações</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Bell size={20} color="#6B7280" />}
              title="Notificações Push"
              subtitle="Receba lembretes sobre suas tarefas"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={notifications ? '#fff' : '#F3F4F6'}
                />
              }
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Volume2 size={20} color="#6B7280" />}
              title="Sons"
              subtitle="Sons de início e fim dos ciclos"
              rightElement={
                <Switch
                  value={sounds}
                  onValueChange={setSounds}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={sounds ? '#fff' : '#F3F4F6'}
                />
              }
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Smartphone size={20} color="#6B7280" />}
              title="Vibração"
              subtitle="Feedback tátil durante as transições"
              rightElement={
                <Switch
                  value={vibration}
                  onValueChange={setVibration}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={vibration ? '#fff' : '#F3F4F6'}
                />
              }
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Aparência</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Moon size={20} color="#6B7280" />}
              title="Modo Escuro"
              subtitle="Ativar tema escuro para melhor visualização"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#D1D5DB', true: '#32D74B' }}
                  thumbColor={darkMode ? '#fff' : '#F3F4F6'}
                />
              }
            />
          </View> 
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Sobre</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Info size={20} color="#6B7280" />}
              title="Sobre o Pomotick"
              subtitle="Versão 1.0.0"
              showArrow
              onPress={() => console.log('About pressed')}
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
  </SafeAreaView>
)
  
}