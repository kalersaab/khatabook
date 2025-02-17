import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const FloatingActionButton = ({ onPress, onLongPress }:any) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} onLongPress={onLongPress}>
      <MaterialIcons name="add" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,           // Position from bottom
    right: 30,            // Position from right
    width: 60,
    height: 60,
    borderRadius: 30,     // Makes it circular
    backgroundColor: "#2ecc71",
    alignItems: "center",
    justifyContent: "center",

    // Android Shadow
    elevation: 8,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default FloatingActionButton;
