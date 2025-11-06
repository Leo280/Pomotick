import { useTask, useUpdateTask } from "@/api/tasks";
import { useTimerStore } from "@/stores/TimerStore";
import { mapTaskDBToTask, Task, TaskDB } from "@/types/Task";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Edit2, Pause, Play, RotateCcw } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";


type SessionType = "pomodoro" | "short_break" | "long_break";

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
  const [sessionType, setSessionType] = useState<SessionType>("pomodoro");

  useEffect(() => {
    if (data) {
      const task = mapTaskDBToTask(data);
      setTaskName(task.title);
      setCompleted(task.completedPomodoros || 0);

      if (!timers[id]) {
        addTimer(id, {
          minutes: task.pomodoroTime || 25,
          seconds: 0,
          lastUpdated: Date.now(),
          isRunning: false
        });
      }
    }
  }, [data, id]);

  const handlePause = () => {
    pause(id)
    updateTask({
      id,
      body: {
        last_update_timer: new Date().toISOString(),
        is_active: false
      }
    });
  };

  const handleStart = () => {
    start(id)
    tick(id)
    updateTask({
      id,
      body: {
        last_update_timer: new Date().toISOString(),
        is_active: true
      }
    });
  };

  const handleFinishPomodoro = () => {
    const newCount = completed + 1;
    setCompleted(newCount);
    queryClient.setQueryData<Task>(["task", id], (old) => ({
      ...old!,
      completed_pomodoros: newCount
    }));
    updateTask({ id, body: { completed_pomodoros: newCount } });
  };

  const getTimerMinutes = (task: TaskDB, type?: SessionType): number => {
    const session: SessionType = (type ?? (task.session_type || "pomodoro")) as SessionType;
    const map: Record<SessionType, number> = {
      pomodoro: task.pomodoro_time,
      short_break: task.short_break_time,
      long_break: task.long_break_time,
    };
    return map[session] ?? task.pomodoro_time ?? 25;
  };

  const getNextSessionType = (completedPomodoros: number, currentType: SessionType): SessionType => {
    if (currentType === "pomodoro") {
      return completedPomodoros % 4 === 0 ? "long_break" : "short_break";
    }
    return "pomodoro";
  }

  const handleReset = () => {
    if (!data) return;
    const totalPomodoros = data.total_pomodoros || 4;
    if (completed >= totalPomodoros && sessionType === 'pomodoro') return;
    const minutes = getTimerMinutes(data, data.session_type);
    const now = Date.now();
    reset(id, {
      minutes: minutes,
      seconds: 0,
      lastUpdated: now,
      isRunning: false
    });
    updateTask({
      id,
      body: {
        last_update_timer: new Date(now).toISOString(),
        is_active: false
      },
    });
  };

  useEffect(() => {
    if (!timers[id] || !data) return;

    intervalRef.current = setInterval(() => {
      const currentTimer = getCurrentTimer()
      if (!currentTimer || !currentTimer.isRunning) return;

      tick(id);

      const totalRemaining = currentTimer.minutes * 60 + currentTimer.seconds;

      if (totalRemaining <= 0) {
        if (sessionType === "pomodoro") {
          const newCompleted = completed + 1;
          setCompleted(newCompleted);
          queryClient.setQueryData<Task>(["task", id], (old) => ({
            ...old!,
            completed_pomodoros: newCompleted,
          }));
          updateTask({ id, body: { completed_pomodoros: newCompleted } });

          const nextType = getNextSessionType(newCompleted, sessionType);
          setSessionType(nextType);
          handleReset();
        } else {
          if (completed >= (data.total_pomodoros || 4)) {
            handlePause();
          } else {
            setSessionType("pomodoro");
            handleReset();
          }
        }
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timers[id], completed, data, id, sessionType]);

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

  const getCurrentTimer = () => {
    const t = timers[id];
    if (!t) return { minutes: 0, seconds: 0, isRunning: false };

    if (!t.isRunning) return t;

    const now = Date.now();
    const elapsed = Math.floor((now - t.lastUpdated) / 1000); // segundos
    let totalSeconds = t.minutes * 60 + t.seconds - elapsed;

    if (totalSeconds <= 0) totalSeconds = 0;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { ...t, minutes, seconds };
  };

  const timer = getCurrentTimer()
  const totalPomodoros = data.total_pomodoros || 4;
  const remainingPomodoros = Math.max(0, totalPomodoros - completed);
  const radius = 120;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;

  const totalSeconds = (getTimerMinutes(data, sessionType) || 25) * 60;
  const remainingSeconds = timer.minutes * 60 + timer.seconds;
  const progress = remainingSeconds / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

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
              <Text className="text-sm text-blue-400 mt-1">
                {
                  data.completed_pomodoros === data.total_pomodoros ? "Sua tarefa acabou" :
                    sessionType === "pomodoro"
                      ? `Restam ${remainingPomodoros} Pomodoros`
                      : sessionType === "short_break"
                        ? "Pausa curta"
                        : "Pausa longa"}
              </Text>
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
