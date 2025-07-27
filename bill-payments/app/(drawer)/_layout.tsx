import { Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import useTranslation from "@/hooks/useTranslation";

const DrawerLayout = () => {
  const { t }:any = useTranslation();
  // Common drawer screen options
  const commonOptions :any= {
    headerShown: true,
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
  };

  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          ...commonOptions,
          swipeEdgeWidth: 50,
          title: t('drawer.calculator'),
          drawerLabel: t('drawer.calculator'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🧮</Text>
          ),
        }}
      />
      
           <Drawer.Screen
        name="(tabs)" 
        options={{
           ...commonOptions,
          swipeEdgeWidth: 50,
          drawerLabel: t('navigation.tabs'),
          title: t('navigation.tabs'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📊</Text>
          ),
        }}
      />
      
      <Drawer.Screen
        name="cashManagement/index"
        options={{
          ...commonOptions,
          title: t('drawer.cashManagement'),
          drawerLabel: t('drawer.cashManagement'),
          drawerIcon: () => (
            <FontAwesome5 name="money-bill-wave" size={20} color="green" />
          ),
        }}
      />
        <Drawer.Screen
        name="customer/index"
        options={{
          ...commonOptions,
          title: t('drawer.customers'),
          drawerLabel: t('drawer.customers'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👥</Text>
          ),
        }}
      />
        <Drawer.Screen
        name="bluetoothprint/index"
        options={{
          ...commonOptions,
          title: t('drawer.bluetooth'),
          drawerLabel: t('drawer.bluetooth'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🖨️</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="about/index"
        options={{
          ...commonOptions,
          title: t('drawer.about'),
          drawerLabel: t('drawer.about'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📄</Text>
          ),
        }}
      />
      
      <Drawer.Screen
        name="contactus/index"
        options={{
          ...commonOptions,
          title: t('drawer.contactUs'),
          drawerLabel: t('drawer.contactUs'),
          drawerIcon: () => (
            <FontAwesome5 name="phone-alt" size={20} color="red" />
          ),
        }}
      />
      
      <Drawer.Screen
        name="setting/index"
        options={{
          ...commonOptions,
          title: t('drawer.settings'),
          drawerLabel: t('drawer.settings'),
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>⚙️</Text>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
