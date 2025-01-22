import React, { useEffect, useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useFetch from '@/hooks/useFetch';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const initialState = { count: 0 };

// 定义 reducer 函数
function reducer(state: { count: number }, action: { type: string }): { count: number } {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const route = useRoute();
  // const { params }: any = route.params;

  // useEffect(() => {
  //   if (params) {
  //     alert(params); // 在这里处理传递过来的参数
  //   } else {
  //     console.log('no params');
  //   }
  // }, [params]); // 将 params 添加到依赖数组中

  // 使用 useReducer 初始化状态和操作函数
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, loading, error] = useFetch('https://jsonplaceholder.typicode.com/todos', 'todosData');

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (error) {
    return <Text>Error...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Count: {state.count}</Text>
      <Button title="Increment" onPress={() => dispatch({ type: 'increment' })} />
      <Button title="Decrement" onPress={() => dispatch({ type: 'decrement' })} />
      <FlatList
        data={Array.isArray(data) ? data : []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Counter;
