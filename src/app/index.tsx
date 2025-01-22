import { StyleSheet, Platform, View, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import FontAwesome6 from '@expo/vector-icons/build/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import AntDesign from '@expo/vector-icons/build/AntDesign';

//import { fetchSubmit,fetchWifi,fetchSubmit2 } from '@/hooks/f2'; // 修改后的导入

const { width, height } = Dimensions.get('window'); // 获取屏幕宽高

export default function HomeScreen() {
  const [isChecked, setIsChecked] = useState(false); // 初始化 radio 状态
  const navigation: any = useNavigation();

  const goHome = () => {
    navigation.navigate('start');
  };

  const goMod = () => {
    navigation.navigate('modal');
  };

  useEffect(() => {
    //fetchWifi().then((users) => {
      // 这里可以对获取到的用户数据进行进一步处理
    //});
// 调用函数
//fetchSubmit2().then((users) => {
  // 这里可以对获取到的用户数据进行进一步处理
//});

   }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image
        source={require('../assets/images/demo/ai.jpg')}
        style={styles.imageDog}
        placeholder="blurred" // 使用模糊占位符
      />
      <View style={[styles.mainContainer, { marginTop: Platform.OS === 'ios' ? 0 : 0 }]}>
        {/* 图片展示 */}

        {/* <MaterialIcons name="family-restroom" size={180} color="rgb(239, 132, 4)" /> */}
        {/* 步骤1和步骤2文本 */}


        <View style={styles.container}>
          <View style={styles.item}>
            <FontAwesome6 name="shield-dog" size={25} color="black" />
            <Text style={styles.titleText}>1. Please turn on the toy power</Text>
          </View>
          <View style={styles.item}>
            <MaterialCommunityIcons name="wifi-strength-lock-open-outline" size={25} color="black" />
            <Text style={styles.descriptionText}>2. Connect to 'dog_ap_**' WiFi hotspot using your phone.</Text>
          </View>
        </View>

        <Image
          source={require('../assets/images/demo/wifi.jpg')}
          style={styles.imageWifi}
        />

        {/* Radio Button */}
        <View style={styles.radioContainer}>
          <View style={styles.radioTextContainer}>
            <RadioButton
              value="checked"
              status={isChecked ? 'checked' : 'unchecked'}
              onPress={() => setIsChecked(!isChecked)} // 点击时切换状态
            />
            <Text onPress={() => setIsChecked(!isChecked)} style={styles.radioText}>
              I Am Ready
            </Text>
          </View>
          <Text style={styles.radioTextline} onPress={goMod}><AntDesign style={{ marginRight: 5 }} name='questioncircleo' size={20} color={'black'} /></Text>
        </View>


        {/* Let's Go Button */}
        <TouchableOpacity
          onPress={goHome}
          style={[styles.button, { backgroundColor: isChecked ? '#5108d9' : '#D3D3D3' }]} // 只有勾选时颜色才改变
          disabled={!isChecked} // 如果没有勾选则禁用按钮
        >
          <Text style={styles.buttonText}>Setting Network</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start', // 内容垂直对齐顶部
    alignItems: 'center', // 内容水平居中
    paddingHorizontal: 20, // 屏幕左右内边距，避免内容靠边
  },
  imageDog: {
    width: width * 1, // 根据屏幕宽度调整图片大小
    height: width * 0.5, // 根据屏幕宽度调整图片大小
    resizeMode: 'cover',
    // borderRadius: 18,
    marginBottom: 10,
    // marginTop: 10 // 为图片和其他内容之间留出间距
  },
  container: {
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  item: {
    flexDirection: 'row', // 设置左右布局
    alignItems: 'center', // 垂直居中对齐图标和文字
    marginBottom: 20, // 每个项之间的间距
  },
  titleText: {
    marginLeft: 10, // 图标和文字之间的间距
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    marginLeft: 10, // 图标和文字之间的间距
    fontSize: 14,
    fontWeight: '400',
  },

  imageWifi: {
    width: '90%',
    height: 140,
    marginHorizontal: 20,
    borderRadius: 16,
    resizeMode: 'contain',
    backgroundColor: '#3a3a3a',
    marginBottom: 10,
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // 确保容器占据整个宽度
    marginTop: 10,
    marginBottom: 10,
  },
  radioTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', // 让 RadioButton 和 Text 在同一水平线
  },
  radioText: {
    marginLeft: 8, // 给 Text 和 RadioButton 之间一些间距
  },
  radioTextline: {
    flex: 1, // 让第二个 Text 靠右对齐
    textAlign: 'right', // 确保右对齐
  },
  button: {
    paddingVertical: Platform.OS === 'ios' ? 18 : 16,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: width * 0.04, // 根据屏幕宽度调整字体大小
    fontWeight: '500',
    color: '#fff',
  },
});
