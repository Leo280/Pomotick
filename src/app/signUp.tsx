import { supabase } from "@/libs/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from 'zod';
import LoginMasthead from "../components/LoginMasthead";

const signUpFormSchema = z.object({
  email: z.string()
    .nonempty('E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z.string()
    .nonempty('A senha é obrigatória')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.'),
  confirmPassword: z.string()
    .nonempty('A senha é obrigatória')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.'),
})
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ["confirmPassword"],
  })

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, getValues, formState: { errors } } = useForm({ resolver: zodResolver(signUpFormSchema) })

  const onSignUp = async () => {
    const { email, password } = getValues()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      Alert.alert('Erro ao cadastrar', error.message)
    }
  }
  return (

    <SafeAreaView className="flex-1 ">
      <LoginMasthead title="Sobre"
        image={require('../../assets/images/tomato.png')}
      />
      <ScrollView className="flex-1 bg-white rounded-t-2xl z-2">
        <View className="flex-col items-center gap-2 justify-center mt-12">
          <Text className="font-bold text-2xl ">Cadastre-se no Pomotick</Text>
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
          {errors.email && <Text>{errors.email.message}</Text>}
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
                className="border border-gray-300 rounded-full p-4 mx-6"
              />
            )}
            name="password"
          />
          {errors.password && <Text>{errors.password.message}</Text>}
          <Text className="text-base text-gray-900 p-2 font-extrabold ms-6">Confirme sua Senha</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite sua senha"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                className="border border-gray-300 rounded-full p-4 mx-6"
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
        </View>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={handleSubmit(onSignUp)} className="bg-blue-600 w-52 h-12 flex-row items-center justify-center rounded-full gap-2 mt-8">
            <Text className="text-white font-bold text-lg">Criar Conta</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={() => router.navigate("/login")} className="bg-blue-300 w-52 h-12 flex-row items-center justify-center rounded-full gap-2 mt-8">
            <Text className="text-white font-bold text-lg">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
