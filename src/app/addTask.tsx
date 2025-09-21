import { useTasks } from '@/contexts/TaskContext';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { router } from 'expo-router';
import { Clock, Minus, Plus, Target } from 'lucide-react-native';
import React, { useState } from 'react';
import { Text } from "react-native-gesture-handler";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


 
 
export default function addTask() {

  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [pomodoros, setPomodoros] = useState(4);

  const adjustPomodoros = (delta: number) => {
    const newValue = Math.max(1, Math.min(12, pomodoros + delta));
    setPomodoros(newValue);
  };

  const totalMinutes = pomodoros * 25;
  const presetOptions = [2, 4, 6, 8];

  const handleCreateTask = () => {
    if (title.trim()) {
      addTask(title.trim(), pomodoros);
      setTitle('');
      setPomodoros(4);
      // Navegar automaticamente para a tela de tarefas
      router.push('/');
    }
  };

return(

    <SafeAreaView className="flex-1 p-6 pt-9 bg-white">
    <View className="flex-row justify-between items-center pt-5">
        <View className='flex-row justify-center items-center'>
          <Text className="text-2xl text-blue-950 pl-3 font-bold">Criar Tarefas</Text>
        </View>
         <DrawerToggleButton tintColor="#172554" />
     </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 ">Nome da Tarefa</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-xl p-4 text-base text-gray-800 min-h-24"
              style={{ textAlignVertical: 'top' }}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Estudar React Native, Ler documentação..."
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={100}
            />
            <Text className="text-xs text-gray-400 text-right mt-2">{title.length}/100</Text>
          </View>

          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Duração</Text>
            
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3">Opções rápidas:</Text>
              <View className="flex-row gap-3">
                {presetOptions.map((preset) => (
                  <TouchableOpacity
                    key={preset}
                    className={`border rounded-full px-4 py-3 min-w-15 items-center ${
                      pomodoros === preset 
                        ? 'bg-black border-black' 
                        : 'bg-white border-black'
                    }`}
                    onPress={() => setPomodoros(preset)}
                  >
                    <Text className={`text-sm font-bold ${
                      pomodoros === preset ? 'text-white' : 'text-black'
                      
                    }`}>
                      {preset}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="bg-white rounded-3xl p-5 shadow-2xl">
              <Text className="text-sm font-medium text-gray-500 mb-4 text-center">Personalizar:</Text>
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                  className={`w-11 h-11 rounded-full justify-center items-center shadow-2xl border border-gray-100 ${
                    pomodoros <= 1 ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onPress={() => adjustPomodoros(-1)}
                  disabled={pomodoros <= 1}
                >
                  <Minus size={20} color={pomodoros <= 1 ? '#14213D' : '#6B7280'} />
                </TouchableOpacity>
                
                <View className="items-center mx-10">
                  <Text className="text-4xl font-bold text-primary-500">{pomodoros}</Text>
                  <Text className="text-bold text-black mt-1">
                    {pomodoros === 1 ? 'Pomodoro' : 'Pomodoros'}
                  </Text>
                </View>
                
                <TouchableOpacity
                  className={`w-11 h-11 rounded-full justify-center items-center shadow-2xl border border-gray-100 ${
                    pomodoros >= 12 ? 'bg-gray-100' : 'bg-white'
                  }`}
                  onPress={() => adjustPomodoros(1)}
                  disabled={pomodoros >= 12}
                >
                  <Plus size={20} color={pomodoros >= 12 ? '#D1D5DB' : '#6B7280'} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="bg-white rounded-xl p-4 mt-5 shadow-2xl">
              <View className="flex-row items-center mb-2">
                <Clock size={16} color="#6B7280" />
                <Text className="text-sm text-gray-500 ml-2">Tempo total: {totalMinutes} min</Text>
              </View>
              <View className="flex-row items-center">
                <Target size={16} color="#6B7280" />
                <Text className="text-sm text-gray-500 ml-2">
                  Pausas: {Math.floor(pomodoros / 4)} longas, {pomodoros - Math.floor(pomodoros / 4)} curtas
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-cyan-100 rounded-3xl p-5 border border-cyan-400 mb-24">
            <Text className="text-base font-bold text-cyan-600 mb-4">Como funciona o Método Pomodoro?</Text>
            <View className="gap-2">
              <Text className="text-sm text-black leading-5">🍅 25 minutos de trabalho focado</Text>
              <Text className="text-sm text-black leading-5">☕ 5 minutos de pausa curta</Text>
              <Text className="text-sm text-black leading-5">🛋️ 15-30 min de pausa longa a cada 4 pomodoros</Text>
              <Text className="text-sm text-black leading-5">🔄 Repita o ciclo até completar a tarefa</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className=" flex-row items-center justify-center bg-white ">
        <TouchableOpacity
          className={`rounded-full py-4 flex-row items-center justify-center gap-2 w-56 mb-5 ${
            !title.trim() ? 'bg-gray-300' : 'bg-blue-500'
          }`}
          onPress={handleCreateTask}
          disabled={!title.trim()}
        >
          <Plus size={20} color={!title.trim() ? '#9CA3AF' : '#FFFFFF'} />
          <Text className={`text-base font-semibold ${
            !title.trim() ? 'text-gray-500' : 'text-white'
          }`}>
            Criar Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
       

)
  
}