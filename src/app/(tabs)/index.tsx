import { useTaskList } from '@/api/tasks';
import { Search } from "@/src/components/Search";
import { TaskCard } from '@/src/components/TaskCard';
import { Octicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from "expo-router";
import fuzzysort from "fuzzysort";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tasks() {
  const { data: tasks, error, isLoading } = useTaskList()
  const [query, setQuery] = useState("")
  const [debounceQuery, setDebounceQuery] = useState("")
  const colorScheme = useColorScheme()

  const debouncedSetQuery = useMemo(() => debounce(q => setDebounceQuery(q), 200), [])

  useEffect(() => {
    debouncedSetQuery(query.trim())
    return () => debouncedSetQuery.cancel()
  }, [query, debouncedSetQuery])

  const fuzzyTasks = useMemo(() => {
    const list = tasks ?? []

    if (!debounceQuery) return list

    const results = fuzzysort.go(debounceQuery, list, { key: 'title' })

    return [...results]
      .sort((a, b) => {
        const aDate = Date.parse(a.obj.createdAt ?? a.obj.created_at ?? '') || 0
        const bDate = Date.parse(b.obj.createdAt ?? b.obj.created_at ?? '') || 0
        return bDate - aDate
      })
      .map(result => result.obj)
  }, [tasks, debounceQuery])

  if (isLoading) return <ActivityIndicator />

  if (error) console.error(error.message)

  return (
    <SafeAreaView className="flex-1 p-6 bg-white dark:bg-neutral-900">
      <View className="flex-row justify-between items-center">
        <View className='flex-row justify-center '>
          <Text className="text-2xl text-blue-950 pl-3 font-bold"></Text>
        </View>
      </View>
      <Search value={query} onChangeText={setQuery} />
      <View className="flex-row justify-stretch items-center gap-8 mt-4 mb-4 ml-4">
        <TouchableOpacity
          className="d-flex flex-row items-center p-2 border border-zinc-300 rounded-lg w-42 h-10 dark:bg-neutral-800 dark:border-neutral-800"
          onPress={() => { router.push("../completedTasks") }}>
          <Octicons
            name={'clock'}
            size={18}
            color={colorScheme === 'dark' ? 'white' : '#6B7280'}
          />
          <Text className="text-gray-800 font-semibold dark:text-gray-400 dark:text-white"> Histórico de Tarefas </Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView className="flex-1 bg-white mt-8 dark:bg-neutral-900">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-xl font-semibold text-blue-950 dark:text-gray-300">Suas Tarefas</Text>
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
              taskdb={item}
            />
          }}
          data={fuzzyTasks}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaView >
  )
}
