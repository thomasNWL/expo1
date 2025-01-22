import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store'; // 用于安全存储凭据
import { fetch } from 'expo/fetch';

const useFetch = (url: string, key: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 从 SecureStore 中检索数据
    SecureStore.getItemAsync(key)
      .then((storedData) => {
        if (storedData) {
          setData(JSON.parse(storedData));
          setLoading(false);
        } else {
          // 如果 SecureStore 中没有数据，执行 fetch 请求
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              setData(data);
              setLoading(false);
              // 将数据存储到 SecureStore
              SecureStore.setItemAsync(key, JSON.stringify(data));
            })
            .catch((error) => {
              setError(error);
              setLoading(false);
            });
        }
      });
  }, [url, key]);

  return [data, loading, error];
};

export default useFetch;
