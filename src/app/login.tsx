import { useAssignUserToProfile } from "@/api/profiles";
import { supabase } from "@/libs/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import LoginMasthead from "../components/LoginMasthead";
import { useState } from "react";
import { TextInput as PaperInput } from 'react-native-paper';

const signUpFormSchema = z.object({
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z.string()
    .nonempty('A senha é obrigatória')
})

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, getValues, formState: { errors } } = useForm({ resolver: zodResolver(signUpFormSchema) })
  const { mutateAsync: assignUserToProfile } = useAssignUserToProfile()
  const [loginError, setLoginError] = useState(false);

  const onSignIn = async () => {
    const { email, password } = getValues();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoginError(true)
      return
    }
    await assignUserToProfile({ email, userId: data?.user.id });
    router.replace("/(tabs)");
  };

  // 1. Novo estado para controlar a visibilidade da senha
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 2. Função para alternar o estado
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    
    <SafeAreaView className="flex-1 bg-blue-950 ">
      <LoginMasthead title="Sobre"
        image={require('../../assets/images/tomato.png')}
      />
      <ScrollView className="flex-1 bg-white rounded-t-3xl z-2">
        <View className="flex-col items-center gap-2 justify-center mt-12">
          <Text className="font-bold text-2xl ">Acesse sua conta</Text>
          <Text className="text-lg">Insira seu e-mail e senha para voltar a gerir seu</Text>
          <Text className="text-lg">tempo e suas tarefas com excelência.</Text>
        </View>
        <View className="mt-2">
          <Text className="text-base text-gray-900 p-2 font-extrabold ms-6">E-mail</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <PaperInput
                placeholder="Digite seu e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{ marginHorizontal: 16, backgroundColor: 'white',  }}
                mode="outlined"
                outlineColor="#c2c2c2"
                activeOutlineColor="#c2c2c2"
                theme={{
                      roundness: 25,
                      
                    }}
              />
            )}
            name="email"
          />
          {errors.email && <Text className="text-center text-red-500 font-bold">{errors.email.message}</Text>}
          <Text className="text-base text-gray-900 p-2 font-extrabold ms-6">Senha</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              const shouldShowIcon = value && value.length > 0;
              const isSecure = !isPasswordVisible;
              const iconName = isPasswordVisible ? 'eye-off' : 'eye';
              return(
              <PaperInput
                placeholder="Digite sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isSecure}
                style={{ marginHorizontal: 16, backgroundColor: 'white' }}
                mode="outlined"
                outlineColor="#c2c2c2"
                activeOutlineColor="#c2c2c2"
                theme={{
                      roundness: 25,
                    }}
                right={
                shouldShowIcon ? (
                  <PaperInput.Icon 
                    icon={iconName} 
                    onPress={togglePasswordVisibility} 
                    
                  />
                ) : null
                    }
                  
              />
              )
                  }}
            name="password"
          />
          
          {errors.password && <Text className="text-center text-red-500 font-bold">{errors.password.message}</Text>}
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={handleSubmit(onSignIn)} className="bg-blue-600 w-96 h-14 flex-row items-center justify-center rounded-full gap-2 mt-8">
              <Text className="text-white font-bold text-lg">Entrar</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={() => router.navigate("/signUp")} className="border border-blue-400 w-96 h-14 flex-row items-center justify-center rounded-full  mt-6">
              <Text className="text-blue-400 font-bold text-lg">Criar Conta</Text>
            </TouchableOpacity>
          </View>
          {loginError && <Text className="text-center text-red-500 font-bold mt-4">E-mail ou senha inválidos. Tente novamente.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>

  )

}
