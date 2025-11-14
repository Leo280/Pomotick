import { useCompletedTasks } from "@/api/tasks"
import { FlashList } from "@shopify/flash-list"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TaskCard } from "../components/TaskCard"

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
      <FlashList
        renderItem={({ item }) => {
          return <TaskCard key={item.id} taskdb={item} />
        }}
        data={tasks}
      />
    </SafeAreaView>
  )
}
