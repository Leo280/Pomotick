import { Image, ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

interface MastheadProps {
  title: string,
  image: ImageSourcePropType,
  children: React.ReactNode
}

export default function Masthead({ image, children }: MastheadProps) {
  return (
    <SafeAreaView className="">
      <Image className="absolute bottom-0 left-0 right-0 top-0 w-full h-96 object-cover"
        source={image}
        alt="masthead image"
      />
      <View className="items-center justify-center">
        {children}
      </View>
      <Text className="color-white p-16  font-bold text-lg" />
    </SafeAreaView >
  )
}


