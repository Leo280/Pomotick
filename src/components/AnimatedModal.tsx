import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AnimatedModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: number) => void;
  initialValue?: number;
  minValue: number;
  maxValue: number;
  title: string;
}

export const AnimatedModal: React.FC<AnimatedModalProps> = ({
  visible,
  onClose,
  onSave,
  initialValue = 0,
  minValue,
  maxValue,
  title,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (visible) {
      setValue(initialValue);
    }
  }, [visible, initialValue]);

  useEffect(() => {
    if (value > maxValue) {
      setValue(maxValue);
    }
  }, [maxValue]);


  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.ease) });
      translateY.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(50, { duration: 250 });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View
        className="flex-1 justify-center items-center bg-black/50"
        style={overlayStyle}
      >
        <Pressable onPress={onClose} className="absolute w-full h-full" />

        <Animated.View
          className="w-4/5 bg-white p-5 rounded-2xl"
          style={modalStyle}
        >
          <Text className="text-black text-lg font-bold mb-4 text-center">
            {title}
          </Text>

          <Text className="text-gray-400 mb-1 text-center">Valor atual: {value} minutos</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={1}
            value={value}
            minimumTrackTintColor="#2563eb"
            maximumTrackTintColor="#555"
            thumbTintColor="#2563eb"
            onValueChange={setValue}
          />

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              onPress={onClose}
              className="w-[45%] bg-neutral-700 py-2 rounded-3xl items-center"
            >
              <Text className="text-white font-semibold">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className="w-[45%] bg-blue-600 py-2 rounded-3xl items-center"
            >
              <Text className="text-white font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};
