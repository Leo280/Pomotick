import { supabase } from "@/libs/supabase"
import { useAuthStore } from "@/stores/AuthStore"
import { InsertTask, UpdateTask } from "@/types/Task"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTaskList = () => {
  const { user } = useAuthStore()
  return useQuery({
    enabled: !!user,
    queryKey: ['tasks', user?.id],
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .eq("is_completed", false)
        .order("created_at", { ascending: false })
      if (error) throw new Error(error.message)
      return data
    }
  })
}

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single()
      console.log("Data: ", data)
      if (error) throw new Error(error.message)
      return data
    }
  })
}

export const useInsertTask = () => {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: Partial<InsertTask> & { pomodoros: number }) {
      const { data: newTask, error } = await supabase
        .from("tasks")
        .insert({
          title: data.title,
          total_pomodoros: data.pomodoros,
          completed_pomodoros: 0,
          is_active: false,
          user_id: user?.id,
          pomodoro_time: data.pomodoro_time,
          short_break_time: data.short_break_time,
          time_remaining: data.pomodoros * (data.pomodoro_time || 25),
          long_break_time: data.long_break_time,
          is_completed: false
        })
        .select()
      if (error) {
        console.error("Erro ao inserir:", error)
        throw new Error(error.message)
      }
      return newTask
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["tasks", user?.id] })
    }
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn({ id, body }: { id: string, body: UpdateTask }) {
      const { error } = await supabase
        .from("tasks")
        .update({
          ...body,
          updated_at: new Date().toISOString()
        })
        .eq("id", id)
      if (error) throw new Error(error.message)
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

export const useCompletedTasks = () => {
  const { user } = useAuthStore()
  return useQuery({
    queryKey: ["completedTasks", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id)
        .eq("is_completed", true)
        .order("created_at", { ascending: false })
      return data ?? []
    }
  })
}
