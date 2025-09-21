import { useTasks } from '@/contexts/TaskContext';
import { DrawerToggleButton } from "@react-navigation/drawer";
import React, { useState } from 'react';
import { Text } from "react-native-gesture-handler";
import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CreateTaskModal } from '../components/CreateTaskModal';
import { TaskCard } from '../components/TaskCard';
import { router } from "expo-router";
import { Search } from '../components/Search';
import { Feather } from '@expo/vector-icons';



export default function Tasks() {

  const { tasks, addTask, setActiveTask, pauseActiveTask } = useTasks();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const activeTask = tasks.find(task => task.isActive);

  const handleCreateTask = (title: string, pomodoros: number) => {
    addTask(title, pomodoros);
    setShowCreateModal(false);
  };

  const handleStartTask = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handlePauseTask = () => {
    pauseActiveTask();
  };

return(

  <SafeAreaView  className="flex-1 p-6 bg-white">
     <View className="flex-row justify-between items-center">
        <View className='flex-row justify-center '>
          <Text className="text-2xl text-blue-950 pl-3 font-bold">Bem-Vindo</Text>
        </View>
        <DrawerToggleButton tintColor='#172554' />
      </View>
      <View>
        <Search />
      </View>
      <View className='flex-row items-center gap-5  mt-4 '>
        <TouchableOpacity className='flex-row items-center justify-center gap-2 ml-5 border border-zinc-400 p-2 rounded-xl '>
          <Feather name='heart' size={20} color={'#888'}/>
          <Text className='text-zinc-500'>Favoritos</Text>
        </TouchableOpacity>
       
        <TouchableOpacity className='flex-row items-center justify-center gap-2 border border-zinc-400 p-2 rounded-xl'>
          <Feather name='clock' size={20} color={'#888'}/>
          <Text className='text-zinc-500'>Histórico de Tarefas</Text>
        </TouchableOpacity>
      </View>
 <SafeAreaView className="flex-1 bg-white">
      <Text className="text-base text-blue-950 px-6 -mt-2 mb-6">Gerencie seu tempo com foco</Text>
      <View className="flex-row justify-between items-center px-6 mb-4">
        <Text className="text-xl font-semibold text-blue-950">Suas Tarefas</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-full"
          onPress={() => router.push('/addTask')}
        >
          <Text className="text-white text-sm font-semibold">+ Nova Tarefa</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStart={() => handleStartTask(task.id)}
            onPause={handlePauseTask}
          />
        ))}
      </ScrollView>

      <CreateTaskModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTask}
      />
    </SafeAreaView>
  </SafeAreaView>

)
  
}