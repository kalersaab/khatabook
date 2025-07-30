// app/index.tsx
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import { useMe } from "@/hooks/users/query";

export default function Index() {
  const { data: profile, isLoading, isError, error } = useMe();

  useEffect(() => {
    if (!isLoading) {
      if (profile) {
        router.replace("/(drawer)");
      } else {
        router.replace("/login");
      }
    }
  }, [isLoading, profile]);

  useEffect(() => {
    if (isError) {
      console.error("Auth Error:", error);
    }
  }, [isError]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Welcome to the App!</Text>
      <Text style={{ fontSize: 16, marginTop: 20 }}>Loading...</Text>
    </View>
  );
}
