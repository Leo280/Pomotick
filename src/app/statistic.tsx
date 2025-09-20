
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View } from "react-native";
import { Text } from "react-native-gesture-handler";


 
 
export default function Index() {

return(

  <View className="flex-1 p-6 pt-9 bg-white">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-base">Estatisticas</Text>
         
        </View>
        <DrawerToggleButton />
      </View>
  </View>
)
  
}