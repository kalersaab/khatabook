import React, { useState } from 'react';
import { StyleSheet, Text, Pressable,TextInput, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { useFormik } from "formik";
import { useLoginUser } from '@/hooks/users/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
const Login = () => {
  const loginUser :any= useLoginUser() 
  const formik = useFormik({
    initialValues: {  
      username: "",
      password: "",
    },
    onSubmit: (values) => {
        loginUser.mutateAsync({ body:values })
         .then((res: any) => {
          AsyncStorage.setItem('authToken', res?.data?.token)
           ToastAndroid.show(res?.message, ToastAndroid.SHORT)
            formik.resetForm();
          })
         .catch((err: { message: string }) => {
          ToastAndroid.show(err?.message, ToastAndroid.SHORT)
            formik.resetForm();
          });
  
        }
    })

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in to Bill payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Email or username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={()=>formik.handleSubmit()}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        New to Bill payments?
      </Text>
        <Pressable onPress={()=>router.push('/signup')}> 
          <Text style={styles.link}>Create an account</Text>
          </Pressable>

    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0d1117',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c9d1d9',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#161b22',
    color: '#c9d1d9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#238636',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#8b949e',
    fontSize: 14,
    marginTop: 16,
  },
  link: {
    color: '#58a6ff',
    textDecorationLine: 'underline',
  },
});