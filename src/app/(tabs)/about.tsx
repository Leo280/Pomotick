import { Feather } from "@expo/vector-icons";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import Masthead from "../../components/Masthead";

export default function About() {

  return (

    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <Masthead 
        title="Sobre"
        image={require('../../../assets/images/img_masthead.png')}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-row justify-center">
            <Text className="text-2xl text-white pl-3 font-bold"></Text>
          </View>
        </View>
      </Masthead>
      <ScrollView className="flex-1 bg-white rounded-t-2xl dark:bg-neutral-900 z-2">
        <Text className="text-2xl text-gray-900 p-4 font-extrabold dark:text-white ">Criadores</Text>
        <View className="flex-row items-center gap-6 justify-center">
          <Image className="w-20 h-20 rounded-full" source={require('@/assets/images/Jesua-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('@/assets/images/Leonardo-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('@/assets/images/Nicolas-perfil.jpg')} />
          <Image className="w-20 h-20 rounded-full" source={require('@/assets/images/Carlos-perfil.jpg')} />
        </View>
        <View className="mt-6">
          <Text className="text-2xl text-neutral-700 p-4 font-extrabold dark:text-white ">Sobre o projeto</Text>
          <Text className="text-base text-justify pl-6 pr-6 pb-6 text-netral-800 dark:text-white">
            Este Projeto apresenta a proposta de desenvolvimento de um aplicativo baseado na metodologia Pomodoro com o objetivo de auxiliar usuários na gestão do tempo e aumento da produtividade. Motivado pelo impacto negativo das distrações digitais no foco e desempenho de estudantes e profissionais, o projeto visa transformar a tecnologia em aliada, proporcionando ciclos de trabalho focados intercalados com pausas, conforme o método criado por Francesco Cirillo.
          </Text>
        </View>
        <View className="flex-row items-center justify-center mt-2">
          <TouchableOpacity className="bg-blue-950 w-96 h-12 flex-row items-center justify-center rounded-3xl gap-2">
            <Feather name="github" size={20} color={'#fff'} />
            <Text className="text-white font-bold">Vá para o Repositório do Projeto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>

  )

}
