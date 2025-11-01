import { CreateTaskModal } from '@/src/components/CreateTaskModal';
import { Search } from "@/src/components/Search";
import { TaskCard } from '@/src/components/TaskCard';
import useTask from '@/stores/TaskStore';
import { Octicons } from '@expo/vector-icons';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { FlashList } from '@shopify/flash-list';
import { router } from "expo-router";
import { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Tasks() {
  const { tasks, addTask, setActiveTask, pauseActiveTask } = useTask()
  const [showCreateModal, setShowCreateModal] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const activeTask = tasks.find(task => task.isActive);

  const handleCreateTask = (title: string, pomodoros: number) => {
    const trimmedText = title.trim()
    const isDuplicate = tasks.some(task => task.title.trim().toLowerCase() === trimmedText.toLowerCase())
    if (isDuplicate) {
      Alert.alert('Essa tarefa já existe', 'Uma tarefa com este título já existe, tente adicionar outra!')
    }
    addTask(title, pomodoros);
    setShowCreateModal(false);
  };

  const handleStartTask = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handlePauseTask = () => {
    pauseActiveTask();
  };

  return (

    <SafeAreaView className="flex-1 p-6 bg-white">
      <Search />
      <View className="flex-row justify-stretch items-center gap-8 mt-4 mb-4 ml-4">
        <TouchableOpacity className="d-flex flex-row items-center p-2 border border-zinc-300 rounded-lg w-22 h-10" onPress={() => { router.push("/favorites") }}>
          <Octicons
            name={'heart'}
            size={18}
            color={'#1F2937 '}

          />
          <Text className="text-gray-800 font-semibold"> Favoritos </Text>
        </TouchableOpacity>
        <TouchableOpacity className="d-flex flex-row items-center p-2 border border-zinc-300 rounded-lg w-42 h-10" onPress={() => { console.log('Tarefas concluídas') }}>
          <Octicons
            name={'clock'}
            size={18}
            color={'#1F2937'}


          />
          <Text className="text-gray-800 font-semibold"> Histórico de Tarefas </Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView className="flex-1 bg-white mt-8">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-xl font-semibold text-blue-950">Suas Tarefas</Text>
          <TouchableOpacity
            className="bg-blue-500 px-4 py-2 rounded-full"
            onPress={() => router.push('/addTask')}
          >
            <Text className="text-white text-sm font-semibold">+ Nova Tarefa</Text>
          </TouchableOpacity>
        </View>

        <FlashList
          renderItem={({ item }) => {
            return <TaskCard
              key={item.id}
              task={item}
              onStart={() => handleStartTask(item.id)}
              onPause={handlePauseTask}
            />
          }}
          data={tasks}
        />

        <CreateTaskModal
          visible={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTask}
        />
      </SafeAreaView>
    </SafeAreaView>

  )

}
