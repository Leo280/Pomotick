import { Image, ImageSourcePropType, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface MastheadProps {
  title: string,
  image: ImageSourcePropType,
}

export default function LoginMasthead({ image }: MastheadProps) {
  return (
    <SafeAreaView className="h-48 relative">
      <Image
        className="absolute bottom-0 left-28 w-48 h-48 object-cover"
        source={image}
        alt="masthead image"
      />
      <View className="flex-1" />
    </SafeAreaView>
  )
}

