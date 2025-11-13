import { supabase } from "@/libs/supabase"
import { InsertProfile } from "@/types/Profile"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

export const useInsertProfile = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    async mutationFn(data: Partial<InsertProfile>) {
      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
          id: data.id,
          email: data.email,
          name: data.name,
          gender: data.gender,
        })
        .select()
      if (error) {
        console.error("Erro ao inserir:", error)
        throw new Error(error.message)
      }
      return newProfile
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] })
      router.navigate("/")
    }
  })
}
