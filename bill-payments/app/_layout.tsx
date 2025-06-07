import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { View,Text } from 'react-native';

export const queryClient = new QueryClient();
const Splashscreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 50, }}>
            Welcome to the App!
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>
            Loading...
        </Text>
    </View>
  )
}
const RootLayout = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);
 return (
    <QueryClientProvider client={queryClient}>
        {showSplash ? (
          <Splashscreen />
        ) : (
          <Stack>
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
      </Stack>
        )}
    </QueryClientProvider>
  );
}

export default RootLayout