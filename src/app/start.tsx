import { StyleSheet, Platform, Button, View, TextInput, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { fetchWifi, fetchSubmit } from '@/hooks/fetch1'; // 修改后的导入
// import { fetchSubmit,fetchWifi,fetchWifi2 } from '@/hooks/f2'; // 修改后的导入
import { SafeAreaView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const [data, setData] = useState<Array<string>>([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 错误状态
  const navigation: any = useNavigation();

  const fetchData = async () => {
    // try {
      setError(null);
      setData([]); // 清空当前数据
      setIsLoading(true); // 开始加载状态
    //   const wifiList = await fetchScan(); // 获取 WiFi 列表
    //   console.log('WiFi list fetched:', wifiList);
    //   setData(wifiList); // 设置 WiFi 数据


    // } catch (error: any) {
    //   // 出现错误时跳转到 start 页面
    //   console.error('Error fetching WiFi list:', error);
    //   Alert.alert('Error', 'Failed to fetch Wi-Fi list');
    //   setTimeout(() => {
    //     navigation.navigate('start');
    //   }, 100); // 延迟 100 毫秒
    // } finally {
    //   // setIsLoading(false); // 结束加载状态
    // }
    try {
      const wifiList = await fetchWifi(); // 获取 Wi-Fi 列表
      console.log('Fetched WiFi List:', wifiList); // 打印 wifiList
      if (Array.isArray(wifiList)) {
        setData(wifiList); // 如果是数组，则设置数据
      } else {
        setData([]); // 如果不是数组，返回空数组
      }
    } catch (error) {
      setError('Failed to fetch Wi-Fi list');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submit = async () => {
    if (!selectedValue) {
      Alert.alert('Error', 'Please select a network');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    const submitData = { wifiName: selectedValue, wifiPassword: password };
    // setIsLoading(true); // 开始加载状态
    console.log(submitData);
    try {
      // await fetchSubmit({ typeN: 'post', url: 'submit-wifi', data: {"wifiName":"TP-LINK_3BE6","wifiPassword":"7kDcden9DP"} });
      //await fetchSubmit({ typeN: 'post', url: 'submit-wifi', data: submitData });
      const a = await fetchSubmit(submitData.wifiName,submitData.wifiPassword)
      console.log('====================================');
      console.log(a);
      console.log('====================================');
      navigation.navigate('success', { js1: submitData });
      console.log(submitData);
      
    } catch (error: any) {
      Alert.alert('Error', 'Failed to submit configuration');
      console.error('Error submitting WiFi configuration:', error);
    } finally {
      // setIsLoading(false); // 结束加载状态
    }
  };

  useEffect(() => {
    // Uncomment to fetch WiFi list when the component mounts
    // fetchData();
   
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>WiFi Configuration</Text>
            <TouchableOpacity
              onPress={fetchData}
              disabled={isLoading}
              style={styles.button}>
              <Text style={styles.buttonText}>Get WiFi List</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
          ) : (
            <>
              <Text style={styles.label}>Network:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                  <Picker.Item label="Select:" value="" />
                  {data.map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Password:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry={false}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#999"
                />
              </View>

              <Text style={styles.description}>
                To ensure smooth internet connection:
                <Text style={styles.redText}> please place your phone close to the puppy early education robot (less than 50cm)</Text>
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={submit}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Start Setting</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    width: '100%',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5108d9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  label: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 150,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 50,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    color: 'black',
  },
  activityIndicator: {
    marginTop: 20,
  },
  description: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
  },
  redText: {
    color: 'red',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
