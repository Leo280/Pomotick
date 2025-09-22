import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Text } from "react-native-gesture-handler";
import {
  Bell,
  ChevronRight,
  Clock,
  Moon,
  Smartphone,
  User, 
  Volume2,
  Hourglass,
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
              icon={<User size={20} color="#fff" />}
              title="Meu Perfil"
              subtitle="Gerencie suas informações pessoais"
              showArrow
              iconBackgroundClassName="bg-[#888]" 
              onPress={() => console.log('Perfil pressed')}
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Pomodoro</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Clock size={20} color="#fff"  />}
              title="Duração do Foco"
              subtitle="25 minutos"
              showArrow
              iconBackgroundClassName="bg-[#270C56]" 
              onPress={() => console.log('Focus duration pressed')}
              
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Hourglass size={20} color="#fff" />}
              title="Pausa Curta"
              subtitle="5 minutos"
              showArrow
              iconBackgroundClassName="bg-[#7C53C2]" 
              onPress={() => console.log('Short break pressed')}
            />
            <View className="h-px bg-gray-200 ml-17" />
            <SettingRow
              icon={<Hourglass size={20} color="#fff" />}
              title="Pausa Longa"
              subtitle="15 minutos"
              showArrow
              iconBackgroundClassName="bg-[#573397]" 
              onPress={() => console.log('Long break pressed')}
            />
          </View>
        </View>

        <View className="mt-6 shadow-2xl">
          <Text className="text-base font-semibold text-gray-800 px-6 mb-3">Notificações</Text>
          <View className="bg-white mx-6 rounded-3xl shadow-sm">
            <SettingRow
              icon={<Bell size={20} color="#fff" />}
              title="Notificações Push"
              subtitle="Receba lembretes sobre suas tarefas"
              iconBackgroundClassName="bg-[#DF381B]" 
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
              icon={<Volume2 size={20} color="#fff" />}
              title="Sons"
              subtitle="Sons de início e fim dos ciclos"
              iconBackgroundClassName="bg-[#CF1751]" 
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
              icon={<Smartphone size={20} color="#fff" />}
              title="Vibração"
              subtitle="Feedback tátil durante as transições"
              iconBackgroundClassName="bg-[#B51212]" 
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
              icon={<Moon size={20} color="#fff" />}
              title="Modo Escuro"
              subtitle="Ativar tema escuro para melhor visualização"
              iconBackgroundClassName="bg-[#3C3A40]" 
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