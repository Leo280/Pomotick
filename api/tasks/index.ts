import { supabase } from "@/libs/supabase"
import { InsertTask } from "@/types/Task"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTaskList = () => {
  return useQuery({
    networkMode: "offlineFirst",
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase.from("tasks").select("*")
      if (error) throw new Error(error.message)
      return data
    }
  })
}

export const useInsertTask = () => {
  console.log("🔥 useInsertTask hook montado");
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(data: InsertTask) {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("Cheguei aqui", user)
      const { data: newTask, error } = await supabase
        .from("tasks")
        .insert({
          title: data.title,
          total_pomodoros: data.pomodoros,
          completed_pomodoros: 0,
          is_active: false,
          time_remaining: 25,
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
