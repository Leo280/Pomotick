import { Task } from '@/types/Task';
import { CircleCheck as CheckCircle, Clock, Pause, Play } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import FavoriteButton from './FavoriteButton';

interface TaskCardProps {
  task: Task;
  onStart: () => void;
  onPause: () => void;
}

export function TaskCard({ task, onStart, onPause }: TaskCardProps) {
  const progress = (task.completedPomodoros / task.totalPomodoros) * 100;
  const totalMinutes = task.totalPomodoros * 25;

  return (
    <View className={`bg-white rounded-3xl p-5 mb-4 shadow-xl border ${task.isActive ? 'border-zinc-300' : 'border-gray-200'} `}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800 flex-1 mr-3 leading-6" numberOfLines={2}>
          {task.title}
        </Text>
        <FavoriteButton id={task.id} isFavorite={task.isFavorite} />
      </View>

      <View className="flex-row items-center mb-3">
        <View className="flex-1 h-1.5 bg-gray-200 rounded-full mr-3">
          <View
            className="h-1.5 bg-primary-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-sm font-semibold text-gray-500 min-w-8">
          {task.completedPomodoros}/{task.totalPomodoros}
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="flex-row items-center gap-44 justify-between ">
          <View className='flex-row items-center'><Clock size={16} color="#6B7280" />
            <Text className="text-sm text-gray-500 ml-1.5">{totalMinutes} min</Text>
          </View>
          <TouchableOpacity
            className={`w-20 h-8 rounded-2xl flex-row justify-center gap-2 items-center first-letter:lex-row bg-blue-600`}
            onPress={task.isActive ? onPause : onStart}
          >
            {task.isActive ? (
              <Pause size={15} color="white" title='Pausar' />
            ) : (
              <Play size={15} color="white" title='Iniciar' />
            )}
            <Text className='text-white'>Iniciar</Text>
          </TouchableOpacity>
        </View>

        {task.completedPomodoros === task.totalPomodoros && (
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#10B981" />
            <Text className="text-sm text-green-600 font-semibold ml-1.5">Concluída</Text>
          </View>
        )}
      </View>
    </View>
  );
}
