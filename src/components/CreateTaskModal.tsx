import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { X, Plus, Minus } from 'lucide-react-native';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, pomodoros: number) => void;
}

export function CreateTaskModal({ visible, onClose, onSubmit }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [pomodoros, setPomodoros] = useState(4);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit(title.trim(), pomodoros);
      setTitle('');
      setPomodoros(4);
    }
  };

  const adjustPomodoros = (delta: number) => {
    const newValue = Math.max(1, Math.min(12, pomodoros + delta));
    setPomodoros(newValue);
  };

  const totalMinutes = pomodoros * 25;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-blue-100">
        <View className="flex-row justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="p-1">
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-blue-950">Nova Tarefa</Text>
          <View className="w-8" />
        </View>

        <View className="flex-1 px-6 pt-8">
          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-800 mb-3">Nome da Tarefa</Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-lg p-4 text-base text-gray-800 min-h-20"
              style={{ textAlignVertical: 'top' }}
              value={title}
              onChangeText={setTitle}
              placeholder="Ex: Estudar React Native"
              placeholderTextColor="#9CA3AF"
              multiline
              maxLength={100}
            />
          </View>

          <View className="mb-8">
            <Text className="text-base font-semibold text-gray-800 mb-3">Número de Pomodoros</Text>
            <View className="flex-row items-center justify-center bg-white rounded-xl p-5 mb-3">
              <TouchableOpacity
                className={`w-11 h-11 rounded-full justify-center items-center ${pomodoros <= 1 ? 'bg-gray-100' : 'bg-gray-200'}`}
                onPress={() => adjustPomodoros(-1)}
                disabled={pomodoros <= 1}
              >
                <Minus size={20} color={pomodoros <= 1 ? '#D1D5DB' : '#6B7280'} />
              </TouchableOpacity>
              
              <View className="items-center mx-10">
                <Text className="text-4xl font-bold text-primary-500">{pomodoros}</Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {pomodoros === 1 ? 'Pomodoro' : 'Pomodoros'}
                </Text>
              </View>
              
              <TouchableOpacity
                className={`w-11 h-11 rounded-full justify-center items-center ${pomodoros >= 12 ? 'bg-gray-100' : 'bg-gray-200'}`}
                onPress={() => adjustPomodoros(1)}
                disabled={pomodoros >= 12}
              >
                <Plus size={20} color={pomodoros >= 12 ? '#D1D5DB' : '#6B7280'} />
              </TouchableOpacity>
            </View>
            
            <Text className="text-sm text-gray-500 text-center">
              Tempo estimado: {totalMinutes} minutos
            </Text>
          </View>

          <View className="bg-blue-200 rounded-xl p-5 border border-blue-600">
            <Text className="text-base font-semibold text-blue-900 mb-3">Método Pomodoro</Text>
            <Text className="text-sm text-blue-800 leading-5">
              • 25 minutos de foco intenso{'\n'}
              • 5 minutos de pausa{'\n'}
              • Pausa longa de 15-30 min a cada 4 pomodoros
            </Text>
          </View>
        </View>

        <View className="px-6 pb-8 pt-4">
          <TouchableOpacity
            className={`rounded-xl py-4 items-center ${!title.trim() ? 'bg-gray-300' : 'bg-blue-500'}`}
            onPress={handleSubmit}
            disabled={!title.trim()}
          >
            <Text className={`text-base font-semibold ${!title.trim() ? 'text-gray-500' : 'text-white'}`}>
              Criar Tarefa
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}