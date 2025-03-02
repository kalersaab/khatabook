import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import FloatingActionButton from "@/components/float";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ObjectId } from "@/utils";

const { height, width } = Dimensions.get("window");

const  CategoryItem = () => {
  const [categories, setCategories] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const savedCategories = await AsyncStorage.getItem("categories");
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      ToastAndroid.show("Error loading categories", ToastAndroid.SHORT);
    }
  };

  const openModalForAdd = () => {
    setInputValue("");
    setEditingIndex(null);
    setModalVisible(true);
  };

  const openModalForEdit = (index:any) => {
    setInputValue(categories[index].name);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      ToastAndroid.show("Category name cannot be empty", ToastAndroid.SHORT);
      return;
    }
    let newCategories = [...categories];
    if (editingIndex !== null) {
      // Edit existing category
      newCategories[editingIndex].name = trimmedValue;
    } else {
      newCategories.push({ id: ObjectId(), name: trimmedValue });
    }

    try {
      await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
      setCategories(newCategories);
      closeModal();
    } catch (error) {
      ToastAndroid.show("Error saving category", ToastAndroid.SHORT);
    }
  };

  const handleDelete = async (index:any) => {
    let newCategories = [...categories];
    newCategories.splice(index, 1);
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
      setCategories(newCategories);
    } catch (error) {
      ToastAndroid.show("Error deleting category", ToastAndroid.SHORT);
    }
  };

  const renderCategoryItem = ({ item, index }:any) => (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => openModalForEdit(index)}
          onLongPress={() => ToastAndroid.show("Edit category", ToastAndroid.SHORT)}
        >
          <Feather name="edit" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}
          onLongPress={() => ToastAndroid.show("Delete category", ToastAndroid.SHORT)}
        >
          <MaterialIcons name="delete" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(39, 39, 39)" }}>
      {categories.length > 0 ? (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item:any) => item.id}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      ) : (
        <View style={[styles.container, { justifyContent: "center", alignItems: "center", flex: 1 }]}>
          <Text style={{ color: "rgb(255,255,255)", fontSize: 30, textAlign: "center" }}>
            No Data Found
          </Text>
        </View>
      )}

      <FloatingActionButton
        onPress={openModalForAdd}
        onLongPress={() => ToastAndroid.show("Add new category", ToastAndroid.SHORT)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Category</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Category Name"
              placeholderTextColor="#ccc"
              value={inputValue}
              onChangeText={setInputValue}
              autoFocus
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  categoryContainer: {
    flex: 2,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "column",
    backgroundColor: "rgb(75,75,75)",
    justifyContent: "center",
  },
  categoryText: {
    color: "#fff",
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
    width: width * 0.3,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.8,
    padding: 30,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 0.48,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#2ecc71",
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
