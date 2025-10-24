import { supabase } from "@/libs/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [session, setSession] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    router.navigate("/login")
  } else {
    router.navigate("/")
  }
} 
