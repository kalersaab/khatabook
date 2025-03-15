import { View, Text } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(75,75,75)', padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20}}>About Calculator App</Text>
      <Text style={{fontSize: 16, color: 'white', marginBottom: 15}}>
        This is a simple yet powerful Bill payment application built with React Native and Expo.
      </Text>
      <Text style={{fontSize: 16, color: 'white', marginBottom: 15}}>
        Features:
      </Text>
      <Text style={{fontSize: 16, color: 'white', marginLeft: 10, marginBottom: 5}}>• Basic arithmetic operations</Text>
      <Text style={{fontSize: 16, color: 'white', marginLeft: 10, marginBottom: 5}}>• History tracking</Text>
      <Text style={{fontSize: 16, color: 'white', marginLeft: 10, marginBottom: 15}}>• Clean and intuitive interface</Text>
      <Text style={{fontSize: 16, color: 'white', marginBottom: 15}}>
        Version: 1.0.0
      </Text>
      <Text style={{fontSize: 16, color: 'white'}}>
        © 2025 Bill payment App. All rights reserved.
      </Text>
    </View>
  )
}

export default About