// app/(drawer)/index.tsx

import React, { useLayoutEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from 'expo-router';
import Calculator from '../calculator';

export default function HomeScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Calculator',
      drawerLabel: 'Calculator',
      headerTintColor: 'rgb(255, 255, 255)',
      headerStyle: {
        backgroundColor: 'rgb(102, 102, 102)',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(255, 255, 255)',
      },
      drawerIcon: ({ color, size }:any) => (
        <Text style={{ color, fontSize: size }}>🧮</Text>
      ),
    });
  }, [navigation]);

  return <Calculator />;
}
