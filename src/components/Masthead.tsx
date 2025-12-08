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
      <Image className="absolute bottom-0 left-0 right-0 top-18 w-full h-80 object-cover"
        source={image}
        alt="masthead image"
      />
      <View className="position-relative bottom-20 px-4 pt-10">
        {children}
      </View>
       <Text className="color-white p-12 font-bold text-lg " />
    
    </SafeAreaView >
  )
}


