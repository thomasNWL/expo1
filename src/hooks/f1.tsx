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

export async function fetchSubmit1() {
    var myHeaders = new Headers();
    // myHeaders.append("Accept", "*/*");
    // myHeaders.append("Accept-Encoding", "gzip, deflate");
    // myHeaders.append("Accept-Language", "zh-CN,zh;q=0.9");
    myHeaders.append("Connection", "keep-alive");
    // myHeaders.append("Content-Length", "51");
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Host", "192.168.0.1");
    // myHeaders.append("Origin", "http://192.168.0.1");
    // myHeaders.append("Referer", "http://192.168.0.1/");
    // myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");
    
    var obj = {typeN:'post',url:'submit-wifi',data:{wifiName:"TP-LINK_3BE6",wifiPassword:"7kDcden9DP"}}
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(obj.data),
      redirect: 'follow'
    };
    
    fetch("http://192.168.2.2/submit-wifi", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}

var baseurl='http://192.168.2.2/'
// var baseurl='http://192.168.2.9:3000/'
export async function fetchWifi() {
    try {
        const response = await axios.get<RequestObj>(baseurl+'scan-wifi');
        console.log(response.data['wifiList']);
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



async function fetchNet(obj: RequestObj): Promise<any> {
    const config = {
        method: obj.typeN,
        url: baseurl + obj.url,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            // 'Content-Type': 'application/json',
            'Host': baseurl,
            'Origin': baseurl,
            'Referer': baseurl,
            // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        },
        data: JSON.stringify(obj.data)
    };
    var rtnobj={}
    try {
        console.log(config)
        const response = await axios (config);
        console.log('API Response:', response);
        // console.error('response',response)
        rtnobj= response.data;
    } catch (error: any) {
        console.error(error);
     
        console.error(`Error fetching data from ${obj.url}:`, error.rawPacket);
        // return { 'info': ''};
        // rtnobj= error.rawPacket.toString()
        return { error: 'Failed to fetch data' }; // 返回错误信息
    }
    return rtnobj
}

export async function fetchSubmit4(): Promise<string[]> {

    var data = {typeN:'post',url:'submit-wifi',data:{"wifiName":"TP-LINK_3BE6","wifiPassword":"7kDcden9DP"}}
    //     // var data = {typeN:'post',url:'submit-wifi',data:{"wifiName":"HUAWEI-GYF","wifiPassword":"hw123456"}}
    
    //   const val = await fetchSubmit(data);
    //   console.log(val);

    var result = await fetchNet(data);
    
    if (result===undefined) {
        result=[]
    }else{
       
    }
    return result
}
