import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ModalScreen() {
  if (Platform.OS === 'android') {
    // Alert.alert('android')
  } else {
    // Alert.alert('ios')
  }
  const route = useRoute();
  // const { param }: any = route.params;
  const navigation:any = useNavigation(); // 获取导航对象
  // if(param){
  //   alert(param)
  // }

  const goBack = () => {
    navigation.goBack(); // 关闭当前模态页面
    // setTimeout(() => {
    //   navigation.navigate('index');
    // }, 500);
  }
  return (
    // 定义一个视图容器，并应用样式styles.container
    <View style={styles.container}>

      {/* // 添加一个分隔视图，用于视觉上的分隔，根据主题设置不同的颜色 */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
