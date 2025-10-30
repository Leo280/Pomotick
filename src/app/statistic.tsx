import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { ChevronLeft, Play, Pause, RotateCcw, Edit2 } from 'lucide-react-native';
import { router } from 'expo-router';

const POMODORO_TIME = 5 * 60;
const POMODORO_COUNT = 4;

export default function StudyScreen() {
  const [taskName, setTaskName] = useState('Estudar para uma Prova');
  const [isEditing, setIsEditing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(POMODORO_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePomodoroComplete();
            return POMODORO_TIME;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handlePomodoroComplete = () => {
    setIsRunning(false);
    setCompletedPomodoros((prev) => (prev + 1) % POMODORO_COUNT);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(POMODORO_TIME);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((POMODORO_TIME - timeLeft) / POMODORO_TIME) * 100;
  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const remainingPomodoros = POMODORO_COUNT - completedPomodoros;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-5 py-3">
        <TouchableOpacity
          className="w-10 h-10 justify-center"
          onPress={() => router.push('/')}
          activeOpacity={0.7}>
          <ChevronLeft size={28} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-5">
        {isEditing ? (
          <TextInput
            className="text-xl font-semibold text-gray-800 mb-6 p-3 bg-white rounded-lg border-2 border-blue-500"
            value={taskName}
            onChangeText={setTaskName}
            onBlur={() => setIsEditing(false)}
            autoFocus
            selectTextOnFocus
          />
        ) : (
          <Text className="text-xl font-semibold text-gray-800 mb-6">{taskName}</Text>
        )}

        <View className="bg-white rounded-3xl p-8 items-center shadow-lg mb-5">
          <View className="relative items-center justify-center">
            <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
              <Circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={radius + strokeWidth}
                cy={radius + strokeWidth}
                r={radius}
                stroke="#60A5FA"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
              />
            </Svg>
            <View className="absolute items-center">
              <Text className="text-5xl font-light text-gray-300 tracking-wider">
                {formatTime(timeLeft)}
              </Text>
              <Text className="text-sm text-blue-400 mt-1">
                Restam {remainingPomodoros} Pomodoros
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-white py-4 px-5 rounded-2xl gap-2 shadow-sm"
            onPress={toggleTimer}
            activeOpacity={0.7}>
            {isRunning ? (
              <Pause size={20} color="#6B7280" />
            ) : (
              <Play size={20} color="#6B7280" />
            )}
            <Text className="text-base font-medium text-gray-600">
              {isRunning ? 'Pausar' : 'Iniciar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-white py-4 px-5 rounded-2xl gap-2 shadow-sm"
            onPress={resetTimer}
            activeOpacity={0.7}>
            <RotateCcw size={20} color="#6B7280" />
            <Text className="text-base font-medium text-gray-600">Reiniciar</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center gap-3 mb-6">
          {[...Array(POMODORO_COUNT)].map((_, index) => (
            <View
              key={index}
              className={`w-8 h-8 rounded-full ${index < completedPomodoros ? 'bg-blue-400' : 'bg-gray-300'
                }`}
            />
          ))}
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-blue-500 py-3.5 px-6 rounded-xl gap-2"
          onPress={() => setIsEditing(true)}
          activeOpacity={0.7}>
          <Edit2 size={16} color="#FFFFFF" />
          <Text className="text-base font-semibold text-white">Editar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
