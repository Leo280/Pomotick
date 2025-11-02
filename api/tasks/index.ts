import { supabase } from "@/libs/supabase"
import { useAuthStore } from "@/stores/AuthStore"
import { InsertTask } from "@/types/Task"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTaskList = () => {
  const { user } = useAuthStore()
  return useQuery({
    networkMode: "offlineFirst",
    enabled: !!user,
    queryKey: ['tasks'],
    refetchOnMount: true,
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*").eq("user_id", user?.id)
      if (error) throw new Error(error.message)
      return data
    }
  })
}

export const useInsertTask = () => {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: InsertTask) {
      const { data: newTask, error } = await supabase
        .from("tasks")
        .insert({
          title: data.title,
          total_pomodoros: data.pomodoros,
          completed_pomodoros: 0,
          is_active: false,
          time_remaining: data.pomodoros * 25,
          user_id: user?.id
        })
        .select()
      if (error) {
        console.error("Erro ao inserir:", error)
        throw new Error(error.message)
      }
      return newTask
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] })
    }
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
      if (error) throw new Error(error.message)
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tasks"] })
    }
  })
}
