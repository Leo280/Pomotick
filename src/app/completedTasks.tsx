import { useCompletedTasks } from "@/api/tasks"
import { FlashList } from "@shopify/flash-list"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CompletedTaskCard } from "../components/CompletedTaskCard"

export default function CompletedTasks() {
  const { data: tasks } = useCompletedTasks()
  if (!tasks || tasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-neutral-900">
        <Text className="font-extrabold text-lg dark:text-white">Você ainda não finalizou nenhuma tarefa</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 p-6 bg-white dark:bg-neutral-900 dark:text-white ">
      <Text className="text-2xl text-center dark:text-white mb-12 mt-4 font-extrabold">Tarefas Completadas</Text>
      <FlashList
        renderItem={({ item }) => {
          return <CompletedTaskCard key={item.id} taskdb={item} />
        }}
        data={tasks}
      />
    </SafeAreaView>
  )
}
