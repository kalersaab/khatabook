import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
const ContactUs = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(75,75,75)', padding: 20}}>
   <Text style={{fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20}}>Contact Us</Text>
    <Text style={styles.text}>
      Name: Gurwinder Singh
      </Text>
    <Text style={styles.text}>
      Email: gurwindersingh957@gmail.com
    </Text>
    <Text style={styles.text}>
      Phone Number: 8437038748
    </Text>
    <Text style={styles.text}>
      Address: Kaler Kalan, gurdaspur, Punjab, India
    </Text>
    <Text style={styles.text}>
      Social Media: Facebook, Instagram, Twitter
    </Text>
    <Text style={styles.text}>
      Version: 1.0.0
    </Text>
    
    <Text style={{fontSize: 16, color: 'white'}}>
      © 2025 Bill payment App. All rights reserved.
    </Text>
  </View>
  )
}


const styles = StyleSheet.create({
  text: { fontSize: 26, color: 'white', marginBottom: 15 }
});
export default ContactUs