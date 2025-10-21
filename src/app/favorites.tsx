import useTask from "@/stores/TaskStore"
import { FlashList } from "@shopify/flash-list"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { FavoriteCard } from "../components/FavoriteCard"

export default function Favorites() {
  const { favorites } = useTask()
  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      {favorites.length > 0 ?
        <FlashList
          renderItem={({ item }) => {
            return <FavoriteCard key={item.id} task={item} />
          }}
          data={favorites}
        />
        :
        <View className="flex-1 items-center justify-center">
          <Text className="font-extrabold text-lg">Adicione Favoritos!</Text>
        </View>
      }
    </SafeAreaView>
  )
}
