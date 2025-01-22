import axios from 'axios';

// 定义接口来描述数据结构
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface RequestObj {
    typeN: string;
    url: string;
    data: any;
}

var baseurl='http://192.168.2.5/'
// var baseurl='http://192.168.2.6:3000/'
export async function fetchWifi() {
    try {
        const response = await axios.get<RequestObj>(baseurl+'scan-wifi');
        console.log(response.data);
        return response.data['wifiList'];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return [];
    }
}


export async function fetchSubmit2() {
    try {
        var obj = {typeN:'post',url:'submit-wifi',data:{wifiName:"HUAWEI-GYF",wifiPassword:"hw123456"}}
      
        const headers = {
            'Content-Type': 'application/json'
        };
        const raw1 = obj.data
        const response = await axios.post(baseurl+'submit-wifi',raw1,{headers});
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


export async function fetchSubmit() {
    try {
        var obj = {typeN:'post',url:'submit-wifi',data:{wifiName:"TP-LINK_3BE6",wifiPassword:"7kDcden9DP"}}
      
        const headers = {
            'Content-Type': 'application/json'
        };
        const raw1 = obj.data
        const response = await axios.post(baseurl+'submit-wifi',raw1,{headers});
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


