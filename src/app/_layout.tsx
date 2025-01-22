import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { Link, Stack, useNavigation } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { ErrorBoundary } from 'expo-router'; // 导入 ErrorBoundary
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/build/AntDesign';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: 'index', // 设置初始路由
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    // <ErrorBoundary retry={() => {}} error={new Error('An error occurred')}>
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const navigation: any = useNavigation();
  const colorScheme = useColorScheme(); // 获取颜色方案
  const [currentTheme, setCurrentTheme] = useState(colorScheme === 'dark' ? DarkTheme : DefaultTheme);

  // 切换主题函数
  const toggleTheme = () => {
    setCurrentTheme(currentTheme => (currentTheme === DefaultTheme ? DarkTheme : DefaultTheme));
  };

  return (
    <ThemeProvider value={currentTheme}>

      <Stack screenOptions={{
        headerStyle: { backgroundColor: 'orange' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen name="index" options={{
          title: 'Ai Family',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: '500', fontSize: 18 },
          headerRight: () => (
            <Pressable
              onPressIn={() => navigation.navigate('modal')}
            >
              <AntDesign  style={{ marginRight: 5 }} name='questioncircleo' size={25} color={'black'} />
            </Pressable>
          ),
          headerShown: false,
        }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetails" options={{
          title: '', headerRight: () => <Pressable onPress={() => {
            console.log(11);
          }}><FontAwesome name='heart-o' size={26} color={'red'}></FontAwesome></Pressable>,
          headerLeft: () => <Pressable onPress={() => { navigation.goBack(); }}><FontAwesome name='arrow-circle-left' size={28} color={'black'}></FontAwesome></Pressable>
        }} />
        <Stack.Screen name="start" options={{ title: 'Setting Network', headerTitleStyle: { fontSize: 18 }, headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000',headerRight: () => (
            <Pressable
              onPressIn={() => navigation.navigate('modal')}
            >
              <AntDesign  style={{ marginRight: 5 }} name='questioncircleo' size={25} color={'black'} />
            </Pressable>
          ), }} />
        <Stack.Screen name="success" options={{ title: 'Waiting', headerTitleStyle: { fontSize: 18 }, headerStyle: { backgroundColor: '#fff' }, headerTintColor: '#000', }} />
        <Stack.Screen name="modal" options={{ title: 'Product Introduction', presentation: 'modal', headerTitleStyle: { fontSize: 18 }, }} />
      </Stack>


      {/* 添加一个按钮用于切换主题 */}
      {/* <View style={styles.themeSwitchButton}>
        <Button title="Theme" onPress={toggleTheme} />
      </View> */}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  themeSwitchButton: {
    position: 'absolute',
    top: 50,
    left: 7,
  },
});
