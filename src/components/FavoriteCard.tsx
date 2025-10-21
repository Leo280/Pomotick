import { Task } from "@/types/Task";
import { Clock } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import FavoriteButton from "./FavoriteButton";
import useTask from "@/stores/TaskStore";

type FavoriteCardProps = { task: Task }

export function FavoriteCard({ task }: FavoriteCardProps) {
  const { tasks } = useTask()
  const handleCreateTask = (title: string, pomodoros: number) => {
    const trimmedText = title.trim()
    const isDuplicate = tasks.some(task => task.title.trim().toLowerCase() === trimmedText.toLowerCase())
    if (isDuplicate) {
      Alert.alert('Essa tarefa já existe', 'Uma tarefa com este título já existe, tente adicionar outra!')
      return
    }
    addTask(title, pomodoros, true);
  };

  const { addTask } = useTask()
  const totalMinutes = task.totalPomodoros * 25
  return (
    <View className={`bg-white rounded-3xl p-5 mb-4 shadow-xl border ${task.isActive ? 'border-zinc-300' : 'border-gray-200'} `}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800 flex-1 text-center">
          {task.title}
        </Text>
      </View>
      <View className="flex-row items-center">
        <View className="flex-row justify-around items-center flex-1">
          <Text className="text-md font-semibold text-gray-500 min-w-8">
            {task.totalPomodoros} Pomodoros
          </Text>
          <View className='flex-row items-center'>
            <Clock size={16} color="#6B7280" />
            <Text className="text-md font-semibold text-gray-500 ml-1.5">{totalMinutes} min</Text>
          </View>
          <FavoriteButton id={task.id} isFavorite={task.isFavorite} canUnfavorite={true} />
        </View>
      </View>
      <View className="flex-1 mt-4">
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-full"
          onPress={() => handleCreateTask(task.title, task.totalPomodoros)}
        >
          <Text className="text-white text-sm font-semibold text-center">+ Adicionar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
