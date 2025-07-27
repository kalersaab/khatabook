import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import { use, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import FloatingActionButton from "@/components/float";
import {
  usecreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/hooks/products/mutation";
import { useGetProduct } from "@/hooks/products/query";
import { useAtom } from "jotai";
import { cat } from "@/store";
import { useFormik } from "formik";
import { validate } from "@/validations";
import { Category, Product } from "@/interface";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
const { height, width } = Dimensions.get("window");
export default function ProductsScreen() {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product>({
    _id: "",
    name: "",
    categoryId: "",
    price: "",
  });
  const [productId, setProductId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useAtom<Category[]>(cat);
  const [isEditMode, setIsEditMode] = useState(false);
  const createProduct: any = usecreateProduct();
  const updateProduct: any = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { data: products, refetch } = useGetProduct({});

  const getProducts =
    products?.pages?.reduce(
      (acc: any, obj: any) => acc.concat(obj?.data.data),
      []
    ) || [];
  React.useEffect(() => {
    if (products?.pages) {
      refetch();
    }
  }, [categories]);
  const openModalForAdd = () => {
    setModalVisible(true);
  };
  const openModalForEdit = (item: Product) => {
    setEditingProduct(item);
    setProductId(item._id);
    formik.setValues({
      name: item.name,
      categoryId: item.categoryId,
      price: item.price,
    });
    setIsEditMode(true);
    setModalVisible(true);
  };
  const closeModal = () => {
    formik.resetForm();
    setIsEditMode(false);
    setProductId(null);
    formik.setValues({ name: "", categoryId: "", price: "" });
    setModalVisible(false);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      categoryId: categories.length > 0 ? categories[0]._id : "",
    },
    enableReinitialize: true,
    validationSchema: validate(t),
    onSubmit: async (values) => {
      if (isEditMode) {
        setIsLoading(true);
        await updateProduct
          .mutateAsync({ productId: productId, body: values })
          .then(() => {
            ToastAndroid.show(
              t("products.editProductToast"),
              ToastAndroid.SHORT
            );
            formik.resetForm();
            closeModal();
            refetch();
          })
          .catch(() => {
            setIsLoading(false);
            ToastAndroid.show(t("products.updateError"), ToastAndroid.SHORT);
          });
      } else {
        setIsLoading(true);
        createProduct
          .mutateAsync({ body: values })
          .then(() => {
            formik.resetForm();
            ToastAndroid.show(t("products.saveSuccess"), ToastAndroid.SHORT);
            setIsLoading(false);

            setIsEditMode(false);
            closeModal();
            refetch();
          })
          .catch((err: any) => {
            formik.setValues({
              name: "",
              price: "",
              categoryId: categories.length > 0 ? categories[0]._id : "",
            });
            setIsLoading(false);
            console.log("err", err);
            ToastAndroid.show(t("products.saveError"), ToastAndroid.SHORT);
          });
      }
    },
  });
  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct
        .mutateAsync(productId)
        .then(() => {
          ToastAndroid.show(t("products.deleteSuccess"), ToastAndroid.SHORT);
          refetch();
        })
        .catch(() => {
          ToastAndroid.show(t("products.deleteError"), ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show(t("products.deleteError"), ToastAndroid.SHORT);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
      <View style={styles.actionContainer}>
        <Pressable
          style={styles.editButton}
          onPress={() => openModalForEdit(item)}
          onLongPress={() =>
            ToastAndroid.show(t("category.editCategory"), ToastAndroid.SHORT)
          }
        >
          <Feather name="edit" size={24} color="#fff" />
        </Pressable>
        <Pressable
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}
          onLongPress={() =>
            ToastAndroid.show(t("category.deleteCategory"), ToastAndroid.SHORT)
          }
        >
          <MaterialIcons name="delete" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={require("@/assets/images/no_data.png")}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>{t("products.notFound")}</Text>
    </View>
  );
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={getProducts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={[
          styles.listContent,
          getProducts.length === 0 && styles.emptyListContent,
        ]}
        renderItem={renderProduct}
        ListEmptyComponent={renderEmptyState}
      />
      <FloatingActionButton
        onPress={openModalForAdd}
        onLongPress={() =>
          ToastAndroid.show(t("category.addCategoryToast"), ToastAndroid.SHORT)
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditMode
                ? t("products.editProduct")
                : t("products.addProduct")}
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formik.values.categoryId}
                onValueChange={(itemValue) =>
                  formik.setFieldValue("categoryId", itemValue)
                }
                style={styles.picker}
                dropdownIconColor="#fff"
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Picker.Item
                      key={category._id}
                      label={category.name}
                      value={category._id}
                    />
                  ))
                ) : (
                  <Picker.Item label="No categories available" value="" />
                )}
              </Picker>
              {formik.touched.categoryId && formik.errors.categoryId ? (
                <Text style={{ color: "red" }}>{formik.errors.categoryId}</Text>
              ) : null}
            </View>
            <TextInput
              style={[
                styles.textInput,
                formik.touched.name && formik.errors.name && styles.errorInput,
              ]}
              placeholder={t("products.name")}
              placeholderTextColor="#ccc"
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              autoFocus
              accessibilityLabel={t("products.name")}
              accessibilityHint={t("products.nameHint")}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.errorText}>{formik.errors.name}</Text>
            )}

            <TextInput
              style={[
                styles.textInput,
                formik.touched.price &&
                  formik.errors.price &&
                  styles.errorInput,
              ]}
              placeholder={t("products.price")}
              placeholderTextColor="#ccc"
              value={formik.values.price}
              onChangeText={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              accessibilityLabel={t("products.price")}
              accessibilityHint={t("products.priceHint")}
              keyboardType="numeric"
            />
            {formik.touched.price && formik.errors.price && (
              <Text style={styles.errorText}>{formik.errors.price}</Text>
            )}
            <View style={styles.buttonRow}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={closeModal}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.saveButton]}
                onPress={() => formik.handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isEditMode ? t("edit") : t("save")}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgb(39, 39, 39)",
  },
  picker: {
    color: "#fff",
    height: 50,
  },
  errorInput: {
    borderColor: "red",
    backgroundColor: "#3a2a2a", // Darker background for error state
  },
  errorText: {
    color: "#ff5252",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(39, 39, 39)",
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryContainer: {
    flex: 2,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "rgb(75,75,75)",
    justifyContent: "center",
    paddingVertical: 15,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
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
  pickerContainer: {
    backgroundColor: "#444",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 20,
    width: width * 0.3,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  emptyImage: {
    width: width * 0.8,
    height: 300,
    resizeMode: "contain",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    padding: 25,
    backgroundColor: "#333",
    borderRadius: 15,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 0.48,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
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
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "rgb(75,75,75)",
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productCategory: {
    color: "rgb(189, 189, 189)",
    fontSize: 14,
  },
  productDetails: {
    alignItems: "flex-end",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  detailLabel: {
    color: "rgb(189, 189, 189)",
    marginRight: 5,
    fontSize: 14,
  },
  detailValue: {
    color: "white",
    fontSize: 14,
  },
  totalText: {
    fontWeight: "bold",
    color: "#2ecc71", // Green color for total
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 10,
    backgroundColor: "rgb(39, 39, 39)",
  },
  headerText: {
    color: "rgb(138, 138, 138)",
    fontWeight: "bold",
  },
});
