// app/logout.tsx
import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen() {
  useEffect(() => {
    AsyncStorage.removeItem("authToken");
    router.replace("/login");
  }, []);

  return null;
}