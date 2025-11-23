import { useAssignUserToProfile } from "@/api/profiles";
import { supabase } from "@/libs/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import LoginMasthead from "../components/LoginMasthead";
import { useState } from "react";

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
  return (

    <SafeAreaView className="flex-1 bg-blue-950 ">
      <LoginMasthead title="Sobre"
        image={require('../../assets/images/tomato.png')}
      />
      <ScrollView className="flex-1 bg-white   rounded-t-2xl z-2">
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
              <TextInput
                placeholder="Digite seu e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="border border-gray-300 rounded-full p-4 mx-6"
              />
            )}
            name="email"
          />
          {errors.email && <Text className="text-center text-red-500 font-bold">{errors.email.message}</Text>}
          <Text className="text-base text-gray-900 p-2 font-extrabold ms-6">Senha</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                className="border border-gray-300 rounded-full p-4 mx-6 text-black"
              />
            )}
            name="password"
          />
          {errors.password && <Text className="text-center text-red-500 font-bold">{errors.password.message}</Text>}
          <View className="flex-row items-center justify-center mb-4 ">
            <TouchableOpacity onPress={handleSubmit(onSignIn)} className="bg-blue-600 w-64 h-12 flex-row items-center justify-center rounded-full gap-2 mt-8">
              <Text className="text-white font-bold text-lg">Entrar</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={() => router.navigate("/signUp")} className="bg-blue-400 w-64 h-12 flex-row items-center justify-center rounded-full gap-2 mt-8">
              <Text className="text-white font-bold text-lg">Criar Conta</Text>
            </TouchableOpacity>
          </View>
          {loginError && <Text className="text-center text-red-500 font-bold mt-4">E-mail ou senha inválidos. Tente novamente.</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>

  )

}
