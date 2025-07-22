import FloatingActionButton from "@/components/float";
import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
} from "react-native";
import { FlatList } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import moment from "moment";
import { useAddCash, useDeleteCash, useUpdateCash } from "@/hooks/mutation";
import { radiobutton } from "@/extra";
import RadioGroup from "react-native-radio-buttons-group";
import { queryClient } from "@/app/_layout";
import { useGetCash } from "@/hooks/query";
import { useFormik } from "formik";
import { IFormikCash } from "@/interface";
import useTranslation from "@/hooks/useTranslation";
const { width } = Dimensions.get("window");

const Cash = () => {
  const { t } = useTranslation();
  const [type, setType] = React.useState<string>("debit");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [cashId, setCashId] = React.useState("");
  const { data, refetch: refetchData, error }: any = useGetCash({});
  const addCash: any = useAddCash();
  const updateCash: any = useUpdateCash();
  const formik = useFormik<IFormikCash>({
    initialValues: {
      amount: 0,
      notes: "",
      type: "credit",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (cashId) {
        updateCash
          .mutateAsync({ pathParams: { id: cashId }, body: values })
          .then(async (res: any) => {
            if (res?.status === 200) {
              refetchData();
              ToastAndroid.show("Updated successfully", ToastAndroid.SHORT);
              formik.resetForm();
              setCashId("");
              setModalVisible(!modalVisible);
            } else {
            }
          })
          .catch(() =>
            ToastAndroid.show("Error updating cash", ToastAndroid.SHORT)
          );
      } else {
        addCash
          .mutateAsync({ body: values })
          .then((res: any) => {
            if (res?.status === 201) {
              queryClient.refetchQueries({ queryKey: ["getCash"] });
              formik.resetForm();
              setModalVisible(!modalVisible);
              ToastAndroid.show("Added successfully", ToastAndroid.SHORT);
            } else {
              if (res?.status === 400) {
                ToastAndroid.show("Bad Request", ToastAndroid.SHORT);
              }
            }
          })
          .catch((err: any) => {
            console.log("err", err);
          });
      }
    },
  });

  const cash =
    data?.pages?.reduce(
      (acc: any, obj: any) => acc.concat(obj?.data?.cash),
      []
    ) || [];
  const totals = React.useMemo(() => {
    return cash.reduce(
      (acc: { credit: number; debit: number }, item: any) => {
        const amount = Number(item.amount) || 0;
        if (item.type === "credit") {
          acc.credit += amount;
        } else if (item.type === "debit") {
          acc.debit += amount;
        }
        return acc;
      },
      { credit: 0, debit: 0 }
    );
  }, [cash]);
  const deleteCash: any = useDeleteCash();
  const handleDelete = async (id: any) => {
    deleteCash
      .mutateAsync({ id: id })
      .then(async (res: any) => {
        if (res?.status === 200) {
          ToastAndroid.show("Deleted successfully", ToastAndroid.SHORT);
          await refetchData();
        } else {
          ToastAndroid.show("Not found", ToastAndroid.SHORT);
          queryClient.refetchQueries({ queryKey: ["getCash"] });
        }
      })
      .catch(() => {
        ToastAndroid.show("Error deleting cash", ToastAndroid.SHORT);
        queryClient.refetchQueries({ queryKey: ["getCash"] });
      });
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const openModalForAdd = (id: any) => {
    if (id) {
      formik.setValues(cash.find((item: any) => item._id === id));
      setCashId(id);
    }
    setModalVisible(true);
  };
  const renderLeftActions = (id: string) => {
    return (
      <TouchableOpacity
        style={styles.leftAction}
        onPress={() => openModalForAdd(id)}
      >
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
    );
  };

  const renderRightActions = (id: any) => {
    return (
      <TouchableOpacity
        style={styles.rightAction}
        onPress={() => handleDelete(id)}
      >
        <Text style={styles.actionText}>{t("delete")}</Text>
      </TouchableOpacity>
    );
  };
  const Separator = () => <View style={styles.itemSeparator} />;
  const renderItem = ({ item }: any) => (
    <Swipeable
      renderLeftActions={() => renderLeftActions(item?._id)}
      renderRightActions={() => renderRightActions(item?._id)}
      leftThreshold={width * 0.15}
      rightThreshold={width * 0.15}
      overshootLeft={false}
      overshootRight={false}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor:
              item.type === "debit" ? "rgb(170, 0, 0)" : "rgb(0, 68, 0)",
          },
        ]}
        key={item?._id}
      >
        <Text style={styles.headerText}>
          {" "}
          {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
        </Text>
        <View style={styles.content}>
          <Text style={styles.text}>Amount: {item.amount}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Type: {item.type}</Text>
            <Text style={styles.text}>Description: {item.notes}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
  const EmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={require("@/assets/images/no_data.png")}
          style={styles.emptyImage}
        />
        <Text style={styles.emptyText}>No transactions Found</Text>
      </View>
    );
  };
  const handleModel = (type: string) => {
    formik.setFieldValue("type", type);
    setType(type);
    openModalForAdd("");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cash}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={() => <Separator />}
      />
      <FloatingActionButton
        onLongPress={() => ToastAndroid.show("Add Button", ToastAndroid.SHORT)}
        onPress={() => openModalForAdd("")}
      />
      <View
        style={{ flexDirection: "row", width: width, padding: 10, margin: 10 }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => handleModel("debit")}
        >
          <Text
            style={{
              color: type === "debit" ? "white" : "rgb(221, 221, 221)",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {totals.debit}{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "green" }]}
          onPress={() => handleModel("credit")}
        >
          <Text
            style={{
              color: type === "credit" ? "white" : "rgb(221, 221, 221)",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {totals.credit}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cash</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
              value={formik.values.amount.toString()}
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                formik.setFieldValue("amount", parseInt(numericText));
              }}
              autoFocus
            />
            <TextInput
              style={styles.textInput}
              placeholder="Notes"
              placeholderTextColor="#ccc"
              value={formik.values.notes}
              onChangeText={formik.handleChange("notes")}
              multiline
            />
            <RadioGroup
              radioButtons={radiobutton}
              onPress={formik.handleChange("type")}
              selectedId={formik.values.type}
              labelStyle={{ color: "#fff", fontSize: 20 }}
              layout="row"
              containerStyle={{
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={() => formik.handleSubmit()}
              >
                <Text style={styles.buttonText}>{t("save")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonText}>{t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(75,75,75)",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "red",
    width: width / 3,
    padding: 20,
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
  },
  card: {
    borderRadius: 10,
    width: width * 0.95,
    padding: 5,
    margin: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  content: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  leftAction: {
    backgroundColor: "rgb(38, 104, 33)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
    padding: 10,
    width: width * 0.2,
  },

  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: width * 0.2,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  itemSeparator: {
    flex: 1,
    backgroundColor: "red",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: width / 2,
  },
  emptyText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  emptyImage: {
    width: width * 0.9,
    height: 350,
    resizeMode: "contain",
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
});
