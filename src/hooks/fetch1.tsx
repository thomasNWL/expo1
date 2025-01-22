import axios from 'axios';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';
// var axios = require('axios');

interface RequestObj {
    typeN: string;
    url: string;
    data: any;
}

// 定义回调函数的类型
// var baseurl='http://192.168.0.1/'
var baseurl='http://192.168.0.1/'
// var baseurl='http://192.168.3.57:3000/'

const requestLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert("Permission denied", "Location permission is required to scan Wi-Fi networks");
        return false;
    }
    // 请求后台位置权限（Android 10 及以上需要）
    if (Platform.OS === 'android' && Platform.Version >= 29) {
        let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
            Alert.alert("Permission denied", "Background location permission is required to scan Wi-Fi networks");
            return false;
        }
    }

    return true;
};
export async function fetchWifi() {
    const hasPermission = await requestLocationPermissions();
    console.log("Location permissions granted:", hasPermission);  // 打印权限状态
    if (!hasPermission) {
        return []; // 如果没有权限，返回空数组
    }
    try {
        const response: any = await axios.get<RequestObj>(baseurl + 'scan-wifi', {
            timeout: 10000, // 设置请求超时
            headers: {
                'Content-Type': 'application/json',  // 确保设置正确的请求头
            },
        });
        console.log('Full Response:', response.data);  // 打印完整响应对象
        // alert('success')
        return response?.data?.wifiList || [];  // 返回 wifiList，如果没有则返回空数组
        
    } catch (error) {
        // alert('error')
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            console.error('Error details:', error.response ? error.response.data : 'No response data');
        } else {
            console.error('Unexpected error:', error);
        }
        return [];
    }
}



export async function fetchSubmit(wifiName: string, wifiPassword: string) {
    try {
        const obj = {
            typeN: 'post',
            url: 'submit-wifi',
            data: { wifiName, wifiPassword }
        };
     
        const headers = {
            'Content-Type': 'application/json'
        };

        const raw1 = obj.data;
        const response = await axios.post(baseurl + 'submit-wifi', raw1, { headers });
        console.log(response.data);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return [];
    }
}




