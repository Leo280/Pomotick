import { supabase } from "@/libs/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
}

export interface AuthStore {
  user: User | null
  session: Session | null
  loading: boolean
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setLoading: (loading: boolean) => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session, user: session?.user ? { id: session.user.id } : null }),
      setLoading: (loading) => set({ loading }),
      loadUser: async () => {
        const { data: { session } } = await supabase.auth.getSession()
        set({
          session,
          user: session?.user ? { id: session.user.id } : null,
          loading: false,
        })
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)


