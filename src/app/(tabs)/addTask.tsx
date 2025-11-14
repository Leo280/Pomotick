import { useInsertTask } from "@/api/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from 'expo-router';
import { Clock, Minus, Pause, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

const addTaskSchema = z.object({
  title: z.string().nonempty("Coloque um título para a sua tarefa"),
  focusTime: z.coerce.number()
    .int("Digite um número inteiro")
    .min(15, "O tempo de foco deve ser pelo menos 15 minutos")
    .max(50, "O tempo de foco não deve ultrapassar 50 minutos"),
  shortBreak: z.coerce.number()
    .int("Digite um número inteiro")
    .min(5, "A pausa curta deve ser de pelo menos 5 minutos")
    .max(15, "A pausa curta não deve ultrapassar 15 minutos"),
  longBreak: z.coerce.number()
    .int("Digite um número inteiro")
    .min(15, "A pausa longa deve ser de pelo menos 15 minutos")
    .max(30, "A pausa longa não deve ultrapassar 30 minutos"),
});

type AddTaskSchema = z.infer<typeof addTaskSchema>;

export default function AddTask() {
  const { mutate: insertTask } = useInsertTask();

  const [pomodoros, setPomodoros] = useState(4);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<AddTaskSchema>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      title: "",
      focusTime: 25,
      shortBreak: 5,
      longBreak: 15,
    }
  });

  const adjustPomodoros = (delta: number) => {
    const newValue = Math.max(1, Math.min(12, pomodoros + delta));
    setPomodoros(newValue);
  };

  const focusTime = watch("focusTime");
  const title = watch("title");

  const totalMinutes = pomodoros * Number(focusTime);
  const presetOptions = [2, 4, 6, 8];

  const handleCreateTask = async (data: AddTaskSchema) => {
    insertTask({
      title: data.title.trim(),
      pomodoro_time: data.focusTime,
      short_break_time: data.shortBreak,
      long_break_time: data.longBreak,
      pomodoros,
    });

    reset();
    setPomodoros(4);
    router.push("/");
  };

  const buttons = [
    {
      id: 1,
      label: "Esgotado",
      color: "#2B613E",
      image: require("../../../assets/icons/darkgreen_tomato.png"),
      pomodoroTime: 15,
      short: 5,
      long: 10
    },
    {
      id: 2,
      label: "Cansado",
      color: "#45D145",
      image: require("../../../assets/icons/green_tomato.png"),
      pomodoroTime: 20,
      short: 5,
      long: 15,
    },
    {
      id: 3,
      label: "Normal",
      color: "#4F5950",
      image: require("../../../assets/icons/gray_tomato.png"),
      pomodoroTime: 25,
      short: 5,
      long: 15
    },
    {
      id: 4,
      label: "Disposto",
      color: "#F97316",
      image: require("../../../assets/icons/orange_tomato.png"),
      pomodoroTime: 35,
      short: 5,
      long: 15
    },
    {
      id: 5,
      label: "Pra cima",
      color: "red",
      image: require("../../../assets/icons/red_tomato.png"),
      pomodoroTime: 50,
      short: 10,
      long: 15
    },
  ];

  const selected = buttons.find((b) => b.id === selectedButton);

  return (
    <SafeAreaView className="flex-1 pt-9 bg-white dark:bg-neutral-900">
      <View className='flex-row justify-center items-center'>
        <Text className="text-2xl text-blue-950 pl-3 font-bold dark:text-white">Criar Tarefas</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6">
          <View className="mb-8">
            <Text className="text-lg font-semibold text-gray-800 dark:text-white">Nome da Tarefa</Text>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  className="bg-white border border-gray-200 rounded-xl p-4 text-base text-gray-800 min-h-24 dark:bg-neutral-800 dark:border-neutral-800 dark:text-white"
                  style={{ textAlignVertical: 'top' }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Ex: Estudar React Native, Ler documentação..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  maxLength={100}
                />
              )}
            />
            <Text className="text-xs text-gray-400 text-right mt-2">{title?.length || 0}/100</Text>
            {errors.title && <Text className="text-red-500">{errors.title.message}</Text>}
          </View>

          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 dark:text-white">Como estou me sentindo?</Text>
            <Text className="text-gray-500 dark:text-gray-300">Escolha, dentre as opções abaixo, o seu humor atual.</Text>

            <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
              <View className="w-full items-center mt-6">
                <View className="flex-row justify-center items-center w-[85%] gap-2">
                  {buttons.map((btn) => (
                    <TouchableOpacity
                      key={btn.id}
                      className={`w-20 h-20 rounded-2xl justify-center items-center shadow-2xl ${selectedButton === btn.id ? "bg-gray-200 dark:bg-neutral-700" : "bg-white dark:bg-neutral-800"}`}
                      onPress={() => setSelectedButton(selectedButton === btn.id ? null : btn.id)}
                    >
                      <Text className="font-medium text-xs" style={{ color: btn.color }}>{btn.label}</Text>
                      <Image source={btn.image} className="w-10 h-10" resizeMode="cover" />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {selected && (
                <View className="mt-8 w-80 bg-white p-4 rounded-2xl shadow items-center dark:bg-neutral-800">
                  <Text className="text-xl font-bold" style={{ color: selected.color }}>{selected.label}</Text>
                  <Text className="text-gray-700 text-center dark:text-gray-300">Sugestão de Personalização:</Text>
                  <Text className="text-gray-700 text-center  dark:text-gray-300">{`${selected.pomodoroTime} minutos de foco\n${selected.short} minutos de pausa curta\n${selected.long} minutos de pausa longa`}</Text>
                </View>
              )}
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-xl font-semibold text-gray-800 mb-3  dark:text-white">Ciclos</Text>

            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-500 mb-3  dark:text-gray-300">Opções rápidas:</Text>
              <View className="flex-row gap-3">
                {presetOptions.map((preset) => (
                  <TouchableOpacity
                    key={preset}
                    className={`border rounded-full px-4 py-3 min-w-12 items-center dark:border-neutral-900 ${pomodoros === preset ? 'bg-black border-black dark:bg-white '   : 'bg-white dark:bg-neutral-800'}`}
                    onPress={() => setPomodoros(preset)}
                  >
                    <Text className={`text-sm font-bold ${pomodoros === preset ? 'text-white dark:text-neutral-900 ' : 'text-black dark:text-white'}`}>
                      {preset}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="bg-white rounded-3xl p-5 shadow-2xl dark:bg-neutral-800">
              <Text className="text-sm font-medium text-gray-500 mb-4 text-center dark:text-gray-300">Personalizar:</Text>
              <View className="flex-row items-center justify-center">
                <TouchableOpacity
                  className={`w-11 h-11 rounded-full justify-center items-center shadow-2xl border border-gray-100 dark:border-neutral-600 ${pomodoros <= 1 ? 'bg-gray-100' : 'bg-white dark:bg-neutral-600'}`}
                  onPress={() => adjustPomodoros(-1)}
                  disabled={pomodoros <= 1}
                >
                  <Minus size={20} color={pomodoros <= 1 ? '#14213D' : '#6B7280'} />
                </TouchableOpacity>

                <View className="items-center mx-10">
                  <Text className="text-4xl font-bold text-primary-500 dark:text-white">{pomodoros}</Text>
                  <Text className="text-bold text-black mt-1 dark:text-white">
                    {pomodoros === 1 ? 'Pomodoro' : 'Pomodoros'}
                  </Text>
                </View>

                <TouchableOpacity
                  className={`w-11 h-11 rounded-full justify-center items-center shadow-2xl border border-gray-100 dark:border-neutral-600 ${pomodoros >= 12 ? 'bg-gray-100' : 'bg-white dark:bg-neutral-600'}`}
                  onPress={() => adjustPomodoros(1)}
                  disabled={pomodoros >= 12}
                >
                  <Plus size={20} color={pomodoros >= 12 ? '#D1D5DB' : '#6B7280'} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-8 mb-4">
              <Text className="text-gray-700 mb-1 dark:text-white">Tempo de foco (minutos)</Text>
              <Controller
                control={control}
                name="focusTime"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-white rounded-xl p-3 text-center text-lg border border-gray-300 dark:bg-neutral-800 dark:border-neutral-800 dark:text-white"
                    keyboardType="numeric"
                    value={String(value)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.focusTime && <Text className="text-red-500">{errors.focusTime.message}</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1 dark:text-white">Pausa curta (minutos)</Text>
              <Controller
                control={control}
                name="shortBreak"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-white rounded-xl p-3 text-center text-lg border border-gray-300 dark:bg-neutral-800 dark:border-neutral-800 dark:text-white"
                    keyboardType="numeric"
                    value={String(value)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.shortBreak && <Text className="text-red-500">{errors.shortBreak.message}</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 mb-1 dark:text-white">Pausa longa (minutos)</Text>
              <Controller
                control={control}
                name="longBreak"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    className="bg-white rounded-xl p-3 text-center text-lg border border-gray-300 dark:bg-neutral-800 dark:border-neutral-800 dark:text-white"
                    keyboardType="numeric"
                    value={String(value)}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.longBreak && <Text className="text-red-500">{errors.longBreak.message}</Text>}
            </View>

            <View className="bg-white rounded-xl p-4 mt-5 shadow-2xl dark:bg-neutral-800">
              <View className="flex-row items-center mb-2">
                <Clock size={16} color="#6B7280" />
                <Text className="text-sm text-gray-500 ml-2 dark:text-gray-300">Tempo total: {totalMinutes} min</Text>
              </View>
              <View className="flex-row items-center">
                <Pause size={16} color="#6B7280"  />
                <Text className="text-sm text-gray-500 ml-2 dark:text-gray-300">
                  Pausas: {Math.floor(pomodoros / 4)} longas, {pomodoros - Math.floor(pomodoros / 4)} curtas
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-cyan-100 rounded-3xl p-5 border border-cyan-400 mb-24">
            <Text className="text-base font-bold text-cyan-600 mb-4">Como funciona o Método Pomodoro?</Text>
            <View className="gap-2">
              <Text className="text-sm text-black leading-5">🍅 25 minutos de trabalho focado</Text>
              <Text className="text-sm text-black leading-5">⏸ 5 minutos de pausa curta</Text>
              <Text className="text-sm text-black leading-5">💪 15-30 min de pausa longa a cada 4 pomodoros</Text>
              <Text className="text-sm text-black leading-5">🔁 Repita o ciclo até completar a tarefa</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-center bg-white mt-4 mb-20 dark:bg-neutral-900">
        <TouchableOpacity
          className={`rounded-full py-4 flex-row items-center justify-center gap-2 w-56 mb-5 ${!title.trim() ? 'bg-gray-300' : 'bg-blue-500'}`}
          onPress={handleSubmit(handleCreateTask)}
          disabled={!title.trim()}
        >
          <Plus size={20} color={!title.trim() ? '#9CA3AF' : '#FFFFFF'} />
          <Text className={`text-base font-semibold ${!title.trim() ? 'text-gray-500' : 'text-white'}`}>
            Criar Tarefa
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

