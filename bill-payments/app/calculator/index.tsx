import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StatusBar,
    Platform,
    Pressable,
    ScrollView,
    Alert,
    ToastAndroid,
  } from "react-native";
  import { Feather } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import 'react-native-gesture-handler';
import { ObjectId } from "@/utils";
  const { height, width } = Dimensions.get("window");
  const Calculator = () => {
    const [display, setDisplay] = useState("");
    const [rate, setRate] = useState("");
    const [details, setDetails] = useState<{ [key: string]: string }>({});
    const [editingDetailId, setEditingDetailId] = useState<string | null>(null);
    const [editingField, setEditingField] = useState<"quantity" | "rate" | "detail">("quantity");
    const [totalList, setTotalList] = useState<Array<{
      id: string;
      quantity: string;
      rate: string;
      price: string;
      detail: string;
    }>>([]);
    const HandleButton = (value: string) => {
      if (editingField === 'detail' && editingDetailId !== null) {
        // Handle detail editing
        if (value === 'del') {
          setDetails(prev => ({
            ...prev,
            [editingDetailId]: prev[editingDetailId]?.slice(0, -1) || ''
          }));
        } else if (value === 'C') {
          setDetails(prev => ({
            ...prev,
            [editingDetailId]: ''
          }));
        } else {
          setDetails(prev => ({
            ...prev,
            [editingDetailId]: (prev[editingDetailId] || '') + value
          }));
        }
      } else {
        if (value === "C") {
          setDisplay(""); setRate("");
        } else if (value === "del") {
          editingField === "quantity"
            ? setDisplay((prev) => prev.slice(0, -1))
            : setRate((prev) => prev.slice(0, -1));
        } else {
          editingField === "quantity"
            ? setDisplay((prev) => prev + value)
            : setRate((prev) => prev + value);
        }
      }
    };
    useEffect(() => {
      const loadHistory = async () => {
        try {
          const savedData = await AsyncStorage.getItem('calculationHistory');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setTotalList(parsedData);
  
            // Load details into state
            const loadedDetails = parsedData.reduce((acc: any, item: any) => {
              acc[item.id] = item.detail || "";
              return acc;
            }, {});
            setDetails(loadedDetails);
          }
        } catch (error) {
          console.error('Error loading history:', error);
        }
      };
      loadHistory();
    }, []);
    useEffect(() => {
      const saveHistory = async () => {
        try {
          const dataToSave = totalList.map(item => ({
            ...item,
            detail: details[item.id] || ""
          }));
          await AsyncStorage.setItem(
            'calculationHistory',
            JSON.stringify(dataToSave)
          );
        } catch (error) {
          console.error('Error saving history:', error);
        }
      };
      saveHistory();
    }, [totalList, details]);
    const handleEnter = () => {
      const quantity = parseFloat(display) || 0;
      const rateValue = parseFloat(rate) || 0;
      const price = (quantity * rateValue).toFixed(2);
  
      if (quantity > 0 && rateValue > 0) {
        const id :any = ObjectId()
        const newEntry = {
          id: id,
          quantity: display,
          rate: rate,
          price: price,
          detail: details[id] || "" 
        };
  
        setTotalList(prev => [newEntry, ...prev]);
        setDisplay("");
        setRate("");
      }
    };
    const handleDetailChange = (id: string, text: string) => {
      setDetails(prev => ({
        ...prev,
        [id]: text
      }));
    };
    const del = async () => {
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete the history?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.clear();
              setTotalList([])
              ToastAndroid.show('History deleted succussfully', 5000)
            }
          }
        ]
      );
    }
    return (
      <View style={{ backgroundColor: 'rgb(75, 75, 75)', }}>
        <StatusBar hidden />
        <View style={styles.tableView}>
          {/* Table Header */}
          <View style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingVertical: width <= 320 ? 2 : 10,
          }}>
            <Text style={[styles.tableCell, { width: '10%' }]}>Sr.No.</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Details</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Qty</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Rate</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>Total</Text>
          </View>
  
          <ScrollView>
            {totalList.map((item, index) => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  borderBottomWidth: index === totalList.length - 1 ? 0 : 1,
                  borderBottomColor: '#eee'
                }}
              >
                <Text style={[styles.tableCell, { width: '15%' }]}>
                  {totalList.length - index}
                </Text>
                <TextInput
                  style={[
                    styles.tableCell,
                    {
                      width: '20%',
                      backgroundColor: editingDetailId === item.id ? '#fff9c4' : 'rgb(75, 75, 75)',
                      color: editingDetailId === item.id ?'rgb(0,0,0)':'rgb(255, 255, 255)',
                      borderRadius: 10,
                    }
                  ]}
                  value={details[item.id] || ''}
                  onChangeText={(text) => handleDetailChange(item.id, text)}
                  placeholder="Details"
                  keyboardType="default"
                  autoCapitalize="sentences"
                  returnKeyType="done"
                  onFocus={() => {
                    setEditingDetailId(item.id);
                    setEditingField('detail');
                  }}
                  onBlur={() => setEditingDetailId(null)}
                  caretHidden={false}
                  showSoftInputOnFocus={true} // Allow system keyboard
                />
                <Text style={[styles.tableCell, { width: '20%' }]}>
                  {item.quantity || '0.00'}
                </Text>
                <Text style={[styles.tableCell, { width: '20%' }]}>
                  ₹{item.rate || '0.00'}
                </Text>
                <Text style={[styles.tableCell, { width: '20%' }]}>
                  ₹{item.price}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor:'rgb(122, 110, 0)' }}>
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', padding: 10 }}>Qty:{totalList.reduce((acc, item) => acc + parseFloat(item.quantity), 0)}</Text>
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', padding: 10 }}>
            Total: ₹{totalList.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2)}
          </Text>
        </View>
  
        <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-evenly" }}>
          <TextInput
            value={display}
            focusable={false}
            caretHidden={true}
            selectTextOnFocus={false}
            showSoftInputOnFocus={false}
            onPressIn={() => setEditingField("quantity")}
            onChangeText={setDisplay}
            style={[
              styles.input,
              editingField === 'quantity' && styles.activeInput
            ]}
            placeholder="Qty"
            placeholderTextColor={"rgb(255,225,255)"}
          />
          <TextInput
            value={rate}
            focusable={false}
            caretHidden={true}
            selectTextOnFocus={false}
            showSoftInputOnFocus={false}
            onPressIn={() => setEditingField("rate")}
            onChangeText={setRate}
            style={[
              styles.input,
              editingField === 'rate' && styles.activeInput
            ]}
            placeholder="Rate"
            placeholderTextColor={"rgb(255,225,255)"}
          />
          <Pressable onPress={() => HandleButton("del")}>
            <Feather
              name="delete"
              size={25}
              style={styles.deleteButton}
            />
          </Pressable>
        </View>
  
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("7")}>
            <Text style={styles.txt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("8")}>
            <Text style={styles.txt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("9")}>
            <Text style={styles.txt}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.txt}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("4")}>
            <Text style={styles.txt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("5")}>
            <Text style={styles.txt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("6")}>
            <Text style={styles.txt}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleEnter()}
          >
            <Text style={styles.txt}>Enter</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("1")}>
            <Text style={styles.txt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("2")}>
            <Text style={styles.txt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("3")}>
            <Text style={styles.txt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => del()} >
            <Text style={styles.txt}>Del</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => HandleButton("C")}
          >
            <Text style={styles.txt}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton("0")}>
            <Text style={styles.txt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => HandleButton(".")}>
            <Text style={styles.txt}>.</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Calculator ;
  
  const styles = StyleSheet.create({
    txt: {
      fontSize: 30,
      textAlign: "center",
      color: "white",
    },
    btn: {
      width: Platform.OS === "ios" ? width * 0.25 : width * 0.255,
      padding: width <= 320 ? 10 : 25,
      backgroundColor: "rgb(148, 148, 148)",
    },
    button: {
      width: width * 0.25,
      padding: width <= 320 ? 5 : 10,
      backgroundColor: "rgb(116, 116, 116)",
    },
    input: {
      width: width * 0.3,
      padding: width <= 320 ? 2 : 10,
      fontSize: width <= 320 ? 12 : 30,
      backgroundColor: "rgb(66, 66, 66)",
      textAlign: "right",
      borderWidth: 1,
      borderColor: "#ddd", color: "rgb(255,225,255)"
    },
    deleteButton: {
      backgroundColor: "rgb(230,230,230)",
      padding: 10,
      borderRadius: 5,
    },
    activeInput: {
      borderColor: "#ffd700",
      borderWidth: 2,
    },
    tableCell: {
      fontSize: width <= 320 ? 10 : 18,
      textAlign: 'center',
      paddingHorizontal: 8,
      color: 'white',
    },
    tableView: {
      height: height<=831 ? height * 0.41: height <= 870 ? height * 0.44 : height * 0.55,
      padding: width <= 320 ? 5 : 20,
      backgroundColor: 'rgb(75, 75, 75)',
      width: width,
    }
  });