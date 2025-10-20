
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export function Search() {

return(

    <View className="w-full flex-row border border-zinc-300 h-14 rounded-full items-center gap-2 px-4 ">
        <Feather name='search' size={24} color={'#6B7280'}></Feather>
        
        <TextInput placeholder="Procure sua Tarefa" placeholderTextColor="#888" className="flex-1 w-full h-full bg-transparent text-slate-400 ">

        </TextInput>
    </View>
  
)   
  
}