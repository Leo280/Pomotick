import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, AppState, View } from "react-native";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Index() {
  const { session, loading, loadUser, setSession } = useAuthStore()

  useEffect(() => {
    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/login"} />
  }
  return <Redirect href={"/(tabs)"} />
} 
