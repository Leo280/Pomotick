import { useTask, useUpdateTask } from "@/api/tasks";
import { useTimerStore } from "@/stores/TimerStore";
import { mapTaskDBToTask } from "@/types/Task";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Edit2, Pause, Play, RotateCcw } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

type Task = {
  id: string;
  title: string;
  pomodoro_time: number;
  completed_pomodoros: number;
  total_pomodoros: number;
  lastUpdateTimer?: string;
  isActive?: boolean;
};

export default function StudyScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = Array.isArray(idString) ? idString[0] : idString;
  const { data, isLoading, error } = useTask(id as string);
  const [taskName, setTaskName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { timers, tick, addTimer, start, pause, reset } = useTimerStore();
  const { mutate: updateTask } = useUpdateTask();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const task = mapTaskDBToTask(data);
      setTaskName(task.title);
      setCompleted(task.completedPomodoros || 0);

      if (!timers[id]) {
        addTimer(id, { minutes: task.pomodoroTime || 25, seconds: 0, lastUpdated: Date.now(), isRunning: false });
      }
    }
  }, [data, id]);

  const handlePause = () => {
    pause(id);
    updateTask({ id, body: { last_update_timer: new Date().toISOString(), is_active: false } });
  };

  const handleStart = () => {
    start(id);
    tick(id);
    updateTask({ id, body: { last_update_timer: new Date().toISOString(), is_active: true } });
  };

  const handleFinishPomodoro = () => {
    const newCount = completed + 1;
    setCompleted(newCount);
    queryClient.setQueryData<Task>(["task", id], (old) => ({ ...old!, completed_pomodoros: newCount }));
    updateTask({ id, body: { completed_pomodoros: newCount } });
  };

  const handleReset = () => {
    if (!data) return;
    const totalPomodoros = data.total_pomodoros || 4;
    if (completed >= totalPomodoros) return;

    const now = Date.now();
    reset(id, { minutes: data.pomodoro_time || 25, seconds: 0, lastUpdated: now, isRunning: false });
    updateTask({
      id,
      body: { last_update_timer: new Date(now).toISOString(), is_active: false },
    });
  };

  useEffect(() => {
    if (!timers[id]) return;

    tick(id);
    intervalRef.current = setInterval(() => {
      tick(id);
      const timer = timers[id];
      if (!timer || !timer.isRunning) return;

      const totalPomodoros = data?.total_pomodoros || 4;

      if (timer.minutes === 0 && timer.seconds === 0) {
        handleFinishPomodoro();

        if (completed + 1 < totalPomodoros) {
          handleReset();
        } else {
          pause(id)
        }
      }
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timers[id], completed, data, id]);

  const toggleTimer = () => {
    const timer = timers[id];
    if (!timer) return;
    timer.isRunning ? handlePause() : handleStart();
  };

  const formatTime = (timer: { minutes: number; seconds: number }) =>
    `${timer.minutes.toString().padStart(2, "0")}:${timer.seconds.toString().padStart(2, "0")}`;

  if (isLoading) return <SafeAreaView className="flex-1 justify-center items-center"><Text>Carregando...</Text></SafeAreaView>;
  if (error) return <SafeAreaView className="flex-1 justify-center items-center"><Text>Erro ao carregar task: {error.message}</Text></SafeAreaView>;
  if (!data) return <SafeAreaView className="flex-1 justify-center items-center"><Text>Tarefa não encontrada</Text></SafeAreaView>;

  const timer = timers[id] || { minutes: 0, seconds: 0, lastUpdated: Date.now(), isRunning: false };
  const totalPomodoros = data.total_pomodoros || 4;
  const remainingPomodoros = Math.max(0, totalPomodoros - completed);
  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const totalSeconds = (data.pomodoro_time || 25) * 60;
  const elapsedSeconds = totalSeconds - (timer.minutes * 60 + timer.seconds);
  const progress = Math.min((elapsedSeconds / totalSeconds) * 100, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-5 py-3">
        <TouchableOpacity className="w-10 h-10 justify-center" onPress={() => router.push("/")} activeOpacity={0.7}>
          <ChevronLeft size={28} color="#1F2937" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-5">
        {isEditing ? (
          <TextInput className="text-xl font-semibold text-gray-800 mb-6 p-3 bg-white rounded-lg border-2 border-blue-500"
            value={taskName} onChangeText={setTaskName} onBlur={() => setIsEditing(false)} autoFocus selectTextOnFocus
          />
        ) : (
          <Text className="text-xl font-semibold text-gray-800 mb-6">{taskName}</Text>
        )}

        <View className="bg-white rounded-3xl p-8 items-center shadow-lg mb-5">
          <View className="relative items-center justify-center">
            <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
              <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="#E5E7EB" strokeWidth={strokeWidth} fill="none" />
              <Circle cx={radius + strokeWidth} cy={radius + strokeWidth} r={radius} stroke="#60A5FA" strokeWidth={strokeWidth} fill="none"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" rotation="-90" origin={`${radius + strokeWidth}, ${radius + strokeWidth}`} />
            </Svg>
            <View className="absolute items-center">
              <Text className="text-5xl font-light text-gray-300 tracking-wider">{formatTime(timer)}</Text>
              <Text className="text-sm text-blue-400 mt-1">Restam {remainingPomodoros} Pomodoros</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-center gap-3 mb-6">
          {[...Array(totalPomodoros)].map((_, index) => (
            <View key={index} className={`w-8 h-8 rounded-full ${index < completed ? "bg-blue-400" : "bg-gray-300"}`} />
          ))}
        </View>

        <View className="flex-row gap-3 mb-6">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-4 px-5 rounded-2xl gap-2 shadow-sm" onPress={toggleTimer} activeOpacity={0.7}>
            {timer.isRunning ? <Pause size={20} color="#6B7280" /> : <Play size={20} color="#6B7280" />}
            <Text className="text-base font-medium text-gray-600">{timer.isRunning ? "Pausar" : "Iniciar"}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-white py-4 px-5 rounded-2xl gap-2 shadow-sm" onPress={handleReset} activeOpacity={0.7}>
            <RotateCcw size={20} color="#6B7280" />
            <Text className="text-base font-medium text-gray-600">Reiniciar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-row items-center justify-center bg-blue-500 py-3.5 px-6 rounded-xl gap-2" onPress={() => setIsEditing(true)} activeOpacity={0.7}>
          <Edit2 size={16} color="#FFFFFF" />
          <Text className="text-base font-semibold text-white">Editar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

