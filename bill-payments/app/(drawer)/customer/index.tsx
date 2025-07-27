import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Modal,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import FloatingActionButton from "@/components/float";
import useTranslation from "@/hooks/useTranslation";
import { usecreateCustomer, useDeleteCustomer, useUpdateCustomer } from "@/hooks/customer/mutation";
import { useGetCustomer } from "@/hooks/customer/query";
import { useFormik } from "formik";

const { height, width } = Dimensions.get("window");

const Customer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const {t} = useTranslation();
  const updateCustomer: any = useUpdateCustomer();
  const createCustomer = usecreateCustomer();
  const deleteCustomer:any = useDeleteCustomer();
  const {data, refetch} = useGetCustomer({});
 const customers = data?.pages?.reduce(
      (acc: any, obj: any) => acc.concat(obj?.data?.data),
      []
    ) || [];
  const openModalForAdd = () => {
    setModalVisible(true);
  };


  const closeModal = () => {
    formik.resetForm();
    setIsEditMode(false);
    setModalVisible(false);
  };
const formik = useFormik({
  initialValues: {
    name: '',
    mobile: '',
  },
  onSubmit: async (values:any) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        await updateCustomer.mutateAsync({body:{name:values.name, mobile:values.mobile}, customerId:values.id}).then((res:any) => {
          if (res.status === 200) {
            ToastAndroid.show(t('customer.editCustomer'), ToastAndroid.SHORT);
          }
        })
      } else {
        await createCustomer.mutateAsync({body:{name:values.name, mobile:values.mobile}}).then((res:any) => {
          if (res.status === 201) {
            ToastAndroid.show(t('customer.saveSuccess'), ToastAndroid.SHORT);
          }
        })
      }
      formik.resetForm();
      setIsEditMode(false);
      closeModal();
      refetch();
    } catch (error) {
      ToastAndroid.show(t('customer.saveError'), ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  },
})
const handleDelete = async (id: string) => {
  try {
    await deleteCustomer.mutateAsync({customerId: id}).then((res:any) => {
      if (res.status === 200) {
        ToastAndroid.show(t('customer.deleteSuccess'), ToastAndroid.SHORT);
      }
    })
    refetch();
  } catch (error) {
    console.log('error', error)
    ToastAndroid.show(t('customer.deleteError'), ToastAndroid.SHORT);
  }
};
 const renderCustomer = ({ item }: { item: any }) => (
  <View style={styles.tableRow}>
    {/* Name Column */}
    <View style={[styles.tableCell, styles.nameCell]}>
      <Text style={styles.cellText}>{item.name || 'N/A'}</Text>
    </View>
    
    {/* Mobile Column */}
    <View style={[styles.tableCell, styles.mobileCell]}>
      <Text style={styles.cellText}>{item.mobile || 'N/A'}</Text>
    </View>
    
    {/* Actions Column */}
    <View style={[styles.tableCell, styles.actionsCell]}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setIsEditMode(true);
          formik.setValues({ name: item.name, mobile: item.mobile, id: item._id });
          setModalVisible(true);
        }}
      >
        <Feather name="edit" size={18} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item._id)}
      >
        <MaterialIcons name="delete" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
)

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image 
        source={require('@/assets/images/no_data.png')}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>{t('customer.notFound')}</Text>
    </View>
  );

const TableHeader = () => {
  return customers.length ? (
    <View style={[styles.tableRow, styles.headerRow]}>
      <Text style={[styles.headerText, styles.nameCell]}>Name</Text>
      <Text style={[styles.headerText, styles.mobileCell]}>Mobile</Text>
      <Text style={[styles.headerText, styles.actionsCell]}>Actions</Text>
    </View>
  ) : null;
};
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={customers}
        renderItem={renderCustomer}
        ListHeaderComponent={TableHeader}
        keyExtractor={(item) => item._id}
        contentContainerStyle={customers.length === 0 &&  styles.emptyListContent}
        ListEmptyComponent={renderEmptyState}
      />

      <FloatingActionButton
        onPress={openModalForAdd}
        onLongPress={() => ToastAndroid.show(t('customer.addCustomertoast'), ToastAndroid.SHORT)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {isEditMode ? t('customer.editCustomer') : t('customer.addCustomer')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('customer.name')}
              placeholderTextColor="#ccc"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              autoFocus
            />
              <TextInput
              style={styles.textInput}
              placeholder={t('customer.phone')}
              placeholderTextColor="#ccc"
              value={formik.values.mobile}
              onChangeText={formik.handleChange('mobile')}
              keyboardType="phone-pad"
              autoFocus
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={closeModal}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]} 
                onPress={()=>formik.handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>
                    {isEditMode ? t('edit') : t('save')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "rgb(39, 39, 39)",
  },
   tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingVertical: 12,
  },
  headerRow: {
    backgroundColor: 'rgb(75,75,75)',
    paddingVertical: 15,
  },
  tableCell: {
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  nameCell: {
    flex: 2,
  },
  mobileCell: {
    flex: 1.5,
  },
  actionsCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cellText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 4,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: 'center',
  },
  emptyImage: {
    width: width * 0.8,
    height: 300,
    resizeMode: 'contain',
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
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    justifyContent: 'center',
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
});

export default Customer;