import { useDeleteTask } from '@/api/tasks';
import { mapTaskDBToTask, TaskDB } from '@/types/Task';
import { useRouter } from 'expo-router';
import { Clock, Trash2 } from 'lucide-react-native';
import { Pressable, Text, useColorScheme, View } from 'react-native';

interface TaskCardProps {
  taskdb: TaskDB;
}

export function TaskCard({ taskdb }: TaskCardProps) {
  const task = mapTaskDBToTask(taskdb);
  const { mutate: deleteTask } = useDeleteTask()
  const progress = (task.completedPomodoros / task.totalPomodoros) * 100;
  const totalMinutes = task.totalPomodoros * task.pomodoroTime;
  const router = useRouter()
  const colorScheme = useColorScheme();

  return (
    <View className={`bg-white rounded-3xl p-5 mb-4 shadow-xl border dark:bg-neutral-800 ${task.isActive ? 'border-zinc-300 dark:border-neutral-800' : 'border-gray-200 dark:border-neutral-800'} `}>
      <Pressable onPress={() => router.push(`/(tasks)/${task.id}`)}>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-center text-lg font-bold text-gray-800 flex-1 mr-3 leading-6 dark:text-gray-300" numberOfLines={2}>
            {task.title}
          </Text>
        </View>

        <View className="flex-row items-center mb-3">
          <View className="flex-1 h-1.5 bg-gray-200 rounded-full mr-3 dark:bg-neutral-700">
            <View
              className="h-1.5 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
          <Text className="text-sm font-semibold text-gray-500 min-w-8 dark:text-white">
            {task.completedPomodoros}/{task.totalPomodoros}
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="flex-row items-center justify-between flex-1 mr-2">
            <View className='flex-row items-center'><Clock size={16} color={colorScheme === 'dark' ? 'white' : "#6B7280"} />
              <Text className="text-sm text-gray-500 ml-1.5 dark:text-white">{totalMinutes} min</Text>
            </View>
            <Pressable onPress={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}>
              <Trash2 size={22} color={colorScheme === 'dark' ? 'white' : "#6B7280"} />
            </Pressable>

          </View>
        </View>
      </Pressable>
    </View>
  );
}
