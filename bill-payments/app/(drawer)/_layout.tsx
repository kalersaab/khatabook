import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome5 } from "@expo/vector-icons";

const DrawerLayout = () => {
  return (
    <Drawer initialRouteName="index">
      <Drawer.Screen
        name="index"
        options={{
          swipeEdgeWidth: 50,
          drawerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          drawerLabelStyle: {
            color: "rgb(255, 255, 255)",
          },
          drawerActiveBackgroundColor: "rgb(122, 122, 122)",
          headerShown: true,
          title: "Calculator",
          headerTintColor: "rgb(255, 255, 255)",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerLabel: "Calculator",
          headerStyle: {
            backgroundColor: "rgb(102, 102, 102)",
            shadowColor: "rgb(170, 0, 0)",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          },
          
          drawerIcon: ({ focused, color, size }) => (
            <Text style={{ color: color, fontSize: size }}>🧮</Text>
          ),
        }}
      />
        <Drawer.Screen
        name={"category/index"}
        options={{
          headerShown: true,
          title: "Category",
          headerTintColor: "rgb(189, 189, 189)",
          headerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
          },
          drawerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          drawerLabelStyle: {
            color: "rgb(255, 255, 255)",
          },
          drawerActiveBackgroundColor: "rgb(122, 122, 122)",
          drawerIcon: ({ focused, color, size }) => (
            <Text style={{ color: color, fontSize: size }}>📁</Text>
          ),
        }}
      />
      <Drawer.Screen  name="cashManagement/index" options={
        {
          headerShown: true,
          title: "Cash Management",
          headerTintColor: "rgb(189, 189, 189)",
          headerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
          },
          drawerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          drawerLabelStyle: {
            color: "rgb(255, 255, 255)",
          },
          drawerActiveBackgroundColor: "rgb(122, 122, 122)",
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="money-bill-wave" size={20} color={'green'}/>
          ),
        }
      } />
      <Drawer.Screen
        name="about/index"
        options={{
          headerShown: true,
          title: "About",
          headerTintColor: "rgb(189, 189, 189)",
          headerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
          },
          drawerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          drawerLabelStyle: {
            color: "rgb(255, 255, 255)",
          },
          drawerActiveBackgroundColor: "rgb(122, 122, 122)",
          drawerIcon: ({ focused, color, size }) => (
            <Text style={{ color: color, fontSize: size }}>📄</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="contactus/index"
        options={{
          headerShown: true,
          title: "Contact us",
          headerTintColor: "rgb(189, 189, 189)",
          headerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "rgb(255, 255, 255)",
          },
          drawerStyle: {
            backgroundColor: "rgb(75,75,75)",
          },
          drawerLabelStyle: {
            color: "rgb(255, 255, 255)",
          },
          drawerActiveBackgroundColor: "rgb(122, 122, 122)",
          drawerIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="phone-alt" size={20} color={'red'}/>
          ),
        }}
      />
    
    </Drawer>
  );
};

export default DrawerLayout;
