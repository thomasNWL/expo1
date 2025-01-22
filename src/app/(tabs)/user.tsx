import React, { useReducer, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import useFetch from '@/hooks/useFetch';


export default function Counter() {
  // 使用 useReducer 初始化状态和操作函数

  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <Text>Selected: {selectedValue || 'None'}</Text>
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
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

