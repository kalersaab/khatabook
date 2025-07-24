import { View, Text, FlatList, StyleSheet,Image, Dimensions, ToastAndroid } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import FloatingActionButton from '@/components/float';
const { height, width } = Dimensions.get("window");
export default function ProductsScreen() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const openModalForAdd = () => {
    setModalVisible(true);
  };
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={require("@/assets/images/no_data.png")}
        style={styles.emptyImage}
      />
      <Text style={styles.emptyText}>{t("category.notFound")}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.name}>ad</Text>
            <Text style={styles.price}>sd</Text>
          </View>
        )}
        ListEmptyComponent={
          renderEmptyState
        }
      />
        <FloatingActionButton
        onPress={openModalForAdd}
        onLongPress={() =>
          ToastAndroid.show(t("category.addCategoryToast"), ToastAndroid.SHORT)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(39, 39, 39)',
    padding: 15,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'rgb(75,75,75)',
    borderRadius: 5,
  },
  name: {
    color: 'white',
    fontSize: 16,
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
  emptyImage: {
    width: width * 0.8,
    height: 300,
    resizeMode: "contain",
  },
});
