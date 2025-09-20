
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View,  SafeAreaView, ScrollView, Image, TouchableOpacity} from "react-native";
import { Text } from "react-native-gesture-handler";
import Masthead from "../components/masthead";
import { Feather } from "@expo/vector-icons";


 
 
export default function Index() {

return(

  <SafeAreaView className="flex-1 bg-black ">
    <Masthead  title="Sobre"
    image={require('../../assets/images/img_masthead.png')}
    >
    <View className="flex-row justify-between items-center pt-10">
        <View className="flex-row justify-center pl-3">
          <Feather name="alert-circle" size={22} color={'#fff'}/>
            <Text className="text-2xl text-white pl-3 font-bold">Sobre a Aplicação</Text>
            
        </View>
        <DrawerToggleButton tintColor="white" />
      </View>
    </Masthead>
    <ScrollView className="flex-1 bg-white pt-3 rounded-t-2xl z-2">
        <Text className="text-2xl text-gray-900 p-4 font-extrabold ">Criadores</Text>
        <View className="flex-row items-center gap-6 justify-center">
          <Image className="w-20 h-20 rounded-full" source={require('../../assets/images/Jesua-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('../../assets/images/Leonardo-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('../../assets/images/Nicolas-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('../../assets/images/Carlos-perfil.jpg')} />
        </View>
        <View className="mt-6">
            <Text className="text-2xl text-gray-900 p-4 font-extrabold ">Sobre o projeto</Text>
          <Text className="text-base text-justify pl-6 pr-6 pb-6 text-black">
            Este Projeto apresenta a proposta de desenvolvimento de um aplicativo baseado na metodologia Pomodoro com o objetivo de auxiliar usuários na gestão do tempo e aumento da produtividade. Motivado pelo impacto negativo das distrações digitais no foco e desempenho de estudantes e profissionais, o projeto visa transformar a tecnologia em aliada, proporcionando ciclos de trabalho focados intercalados com pausas, conforme o método criado por Francesco Cirillo. Até o momento, o projeto estabeleceu uma base teórica sobre a falta de foco e demonstrou a viabilidade técnica através de prototipagem, definindo funcionalidades e compreendendo as necessidades dos usuários. 
          </Text>
        </View>
        <View className="flex-row items-center justify-center mt-2">
          <TouchableOpacity className="bg-blue-950 w-96 h-12 flex-row items-center justify-center rounded-3xl gap-2">
            <Feather name="github" size={20} color={'#fff'}/>
            <Text className="text-white font-bold">Vá para o Repositório do Projeto</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>

  </SafeAreaView>

)
  
}