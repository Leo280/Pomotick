import { supabase } from "@/libs/supabase"
import { UpdateTables } from "@/types/Helper"
import { InsertProfile } from "@/types/Profile"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useEffect } from "react"

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

export const useProfile = (email: string) => {
  return useQuery({
    enabled: !!email,
    queryKey: ["profile", email],
    networkMode: "offlineFirst",
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single()
      return data
    }
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(payload: Partial<UpdateTables<"profiles">>) {
      await supabase
        .from("profiles")
        .update({
          ...payload
        })
        .eq("email", payload.email)
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["profile"] })
    }
  })
}

export const useAssignUserToProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, userId }: { email: string; userId: string }) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single()

      if (!profile.user_id) {
        await supabase
          .from("profiles")
          .update({ user_id: userId })
          .eq("email", email)
      }

      return true
    },
    async onSuccess(_res, variables) {
      await queryClient.invalidateQueries({ queryKey: ["profile", variables.email] })
    },
  })
}
