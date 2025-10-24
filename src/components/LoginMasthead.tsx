import { Image, ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'

interface MastheadProps {
  title: string,
  image: ImageSourcePropType,
}

export default function LoginMasthead({ image }: MastheadProps) {
  return (
    <SafeAreaView>
      <Image className="absolute bottom-0 left-28 w-64 h-64 object-cover"
        source={image}
        alt="masthead image"
      />
      <View className="flex-1" />
      <Text className="color-white p-20 font-bold text-lg"></Text>
    </SafeAreaView>
  )
}

