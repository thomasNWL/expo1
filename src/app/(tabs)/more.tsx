// App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import request from '@/utils/index'; // 导入封装的 axios
import { getTodo } from '@/utils/index'; // 导入封装的请求方法
import { AxiosError } from 'axios';
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function App() {


  const [data, setData] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);


  useEffect(() => {
    setLoading(true); // 每次进入页面时重置 loading 状态
    request
      .get('/todos/1')
      .then((response) => {
        console.log('Response Data:', response.data); // 打印返回的数据
        setData(response.data); // 设置数据
        setLoading(false); // 请求完成，停止加载
      })
      .catch((error: AxiosError) => {
        console.error('Request Error:', error); // 打印错误信息
        setError(error as AxiosError | null); // 设置错误信息
        setLoading(false); // 请求完成，停止加载
      });
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Text>User ID: {data.userId}</Text>
          <Text>Title: {data.title}</Text>
          <Text>Completed: {data.completed ? 'Yes' : 'No'}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
