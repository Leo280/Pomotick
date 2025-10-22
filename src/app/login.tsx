
import { DrawerToggleButton } from "@react-navigation/drawer";
import { View, ScrollView, Image, TouchableOpacity, Text, TextInput} from "react-native";
import LoginMasthead from "../components/LoginMasthead";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {

const SeparadorComTexto = ({ 
  text = 'ou', 
  color = 'text-gray-400', 
  borderColor = 'border-gray-300' 
}) => {
  
  const linhaClasses = `flex-1 h-px border-b ${borderColor} mx-4`;
  
 
  const textoClasses = `font-bold uppercase ${color}`;

  return (
  
    <View className="flex-row items-center my-6">
      
      <View className={linhaClasses} />

      <Text className={textoClasses}>
        {text}
      </Text>

      <View className={linhaClasses} />
    </View>
  );
};


return(

  <SafeAreaView className="flex-1 ">
    <LoginMasthead  title="Sobre"
    image={require('../../assets/images/tomato.png')}
    >
    <View className="flex-row justify-between items-center">
        <DrawerToggleButton tintColor="white" />
      </View>
    </LoginMasthead>
    <ScrollView className="flex-1 bg-white   rounded-t-2xl z-2">
        <View className="flex-col items-center gap-2 justify-center mt-12">
            <Text className="font-bold text-2xl ">Acesse sua conta</Text>
            <Text className="text-lg">Insira seu e-mail e senha para voltar a gerir seu</Text>
            <Text className="text-lg">tempo e suas tarefas com excelência.</Text>
        </View>
        <View className="mt-2"> 
            <Text className="text-base text-gray-900 p-2 font-extrabold ms-6  ">E-mail</Text>
            <TextInput
              className="border border-gray-300 rounded-full p-4 mx-6"
              placeholder="Digite seu e-mail"
             />
            <Text className="text-base text-gray-900 p-2 font-extrabold ms-6 ">Senha</Text>
            <TextInput
              className="border border-gray-300 rounded-full p-4 mx-6"
              placeholder="Digite sua senha"
              secureTextEntry={true} />
        </View>
        <View>
            <TouchableOpacity>
                <Text className="text-blue-800 text-base text-end p-2 font-bold ms-8 ">Esqueceu sua senha?</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center mb-4 ">
          <TouchableOpacity className="bg-blue-600 w-52 h-12 flex-row items-center justify-center rounded-full gap-2 mt-8">
            <Text className="text-white font-bold text-lg">Entrar</Text>
          </TouchableOpacity>
        </View>
        <SeparadorComTexto />
        <View className="flex-col items-center justify-center">
            <TouchableOpacity className="bg-gray-200 w-96 h-12 flex-row items-center justify-center rounded-full gap-2 mt-2 mb-8">
                <Image
                  source={require('../../assets/icons/google-icon.png')}
                  className="w-10 h-10"
                  />
              <Text className="text-black font-bold text-lg">cadastre-se com o com Google</Text>
            </TouchableOpacity>
        </View>
        
    </ScrollView>
  </SafeAreaView>

)
  
}
