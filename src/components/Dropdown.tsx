import { AntDesign } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';



export default function Dropdown() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded=useCallback(() => setExpanded(!expanded), [expanded]);

  const [value, setValue] = useState<string | null>(null);


  const onSelectItem = useCallback((item:{value: string; label: string} ) => {
    setValue(item.value);
    setExpanded(false);
  }, []);


  return(
    <View  
    className="">
      <TouchableOpacity className="h-14 justify-between px-4 bg-white flex-row w-100% items-center mx-6 rounded-3xl border border-gray-300  " onPress={toggleExpanded}> 
        <Text className="text-gray-400 text-lg">{value || "Selecione seu Genero:"}</Text>
        <AntDesign name={expanded ? "up" : "down"}  />
      </TouchableOpacity>
      {
        expanded ? (
    <Modal transparent={true}  visible={expanded} >
      <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
        <View className=' flex-1 justify-center items-center bg-white bg-opacity-80 '>
      <View className=' absolute bg-white rounded-2xl border w-96 flex-1 border-gray-300'>
        <FlatList 
          keyExtractor={(item) => item.value}   
        data={[
          { value: "Homem", label: "Homem"},
          { value: "Homem trans", label: "Homem Trans"},
          { value: "Mulher", label: "Mulher"},
          { value: "Mulher Trans", label: "Mulher Trans"},
          { value: "Travesti", label: "Travesti"},
          { value: "Não Binário", label: "Não Binário"},
          { value: "Outro", label: "Outro"},
          { value: "Não responder", label: "Não responder"},
          
        ]}
        renderItem={({item}) => (
          <TouchableOpacity activeOpacity={0.8} className='h-9 justify-center  rounded-2xl px-2 ' onPress={()=>onSelectItem(item)} >
            <Text className='text-xl font-semibold'>{item.value}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className=''></View>}
        />
      </View>
      </View>
      </TouchableWithoutFeedback>
      </Modal>
      ) : null}
    </View>
    
  )
}