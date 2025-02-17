import { View, Text, Button, DrawerLayoutAndroid } from 'react-native'
import React, { useRef } from 'react'

const Buttons = () => {
    const drawer = useRef<DrawerLayoutAndroid>(null);
  return (
    <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
  )
}

export default Buttons