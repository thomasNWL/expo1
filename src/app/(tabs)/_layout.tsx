import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import HeaderLeftComponent from '../HeaderLeft';

// 定义一个TabBarIcon组件，用于显示图标
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  // 返回一个FontAwesome组件，设置大小和样式，并传入props
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// 导出一个TabLayout组件，用于显示底部导航栏
export default function TabLayout() {
  // 使用useColorScheme钩子获取当前的主题颜色模式
  const colorScheme = useColorScheme();

  // 返回一个Tabs组件，设置底部导航栏的样式和选项
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        // 使用useClientOnlyValue钩子获取是否显示头部
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* // 第一个选项卡，设置标题、图标和头部右侧的链接 */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTitle: '',
          headerLeft: ({ onPress }) => <HeaderLeftComponent onPress={onPress} />,
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      {/* // 第二个选项卡，设置标题和图标 */}
      <Tabs.Screen
        name="cart"
        options={{
          title: '购物车',
          tabBarIcon: ({ color }) => <MaterialIcons name="add-shopping-cart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <FontAwesome name="user-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
