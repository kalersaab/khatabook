import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import FloatingActionButton from "@/components/float";

const { height, width } = Dimensions.get("window");

const CategoryItem = () => {
  return (
    <View style={{flex: 1, backgroundColor:'rgb(39, 39, 39)'}}>
            <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Groceries</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.editButton} onLongPress={() => {ToastAndroid.show("Category edited Button", ToastAndroid.SHORT)}}>
          <Feather name="edit" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onLongPress={() => {ToastAndroid.show("Category Deleted Button", ToastAndroid.SHORT)}}>
          <MaterialIcons name="delete" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
    <FloatingActionButton onPress={() => {}} onLongPress={()=>ToastAndroid.show("Category Add Button", ToastAndroid.SHORT)}/>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  categoryContainer: {
    flex: 2,
    borderBottomLeftRadius:15,
    borderTopLeftRadius:15,
    flexDirection: "column",
backgroundColor:"rgb(75,75,75)",
  },
  categoryText: {
    color: "#fff",
     flex: 1,
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  actionContainer: {
    flex: 1,
    flexDirection: "column", 
  },
  editButton: {
    backgroundColor: "#2ecc71",
    width: width * 0.3,
    borderTopRightRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 20,
    width: width * 0.30,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
});

export default CategoryItem;
