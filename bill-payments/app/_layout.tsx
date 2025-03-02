import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
   <Stack> 
    <Stack.Screen name="(drawer)" options={{headerShown:false}} />
   </Stack>
   </QueryClientProvider>
  )
}

export default RootLayout