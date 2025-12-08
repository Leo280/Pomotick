import { supabase } from "@/libs/supabase";
import { useAuthStore } from "@/stores/AuthStore";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, AppState, Image, View } from "react-native";
import { getAnimationSettingsUpdates } from "react-native-reanimated/lib/typescript/css/native";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Index() {
  const { session, loading, setSession, finishLoading } = useAuthStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null)

        setTimeout(() => {
          finishLoading()
          setIsInitialized(true)
        }, 100)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSession(session)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  if (loading || !isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("@/assets/icons/icon.png")}
          style={{ width: 64, height: 64, marginBottom: 16 }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={"/login"} />
  }

  return <Redirect href={"/(tabs)"} />
} 
