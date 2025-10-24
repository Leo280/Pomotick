import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  barBg: '#F1F2F4',
  active: '#0F172A',
  inactive: '#64748B',
};

export default function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const routes = state.routes;

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-0 right-0 bottom-0 items-center"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View
        className="flex-row items-center justify-evenly rounded-2xl px-3 py-2 w-[92%]"
        style={{
          backgroundColor: COLORS.barBg,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
          elevation: 8,
          overflow: 'visible',
        }}
      >
        {routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const color = isFocused ? COLORS.active : COLORS.inactive;

          const Icon =
            typeof options.tabBarIcon === 'function'
              ? options.tabBarIcon({ focused: isFocused, color, size: 32 })
              : null;

          return (
            <TouchableOpacity
              key={route.key}
              className="items-center justify-center py-1.5"
              style={{ minWidth: 56 }}
              activeOpacity={0.9}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name as never);
                }
              }}
            >
              <View className="items-center justify-center">
                {Icon}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
