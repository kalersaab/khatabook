import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Platform, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import BleManager, { Peripheral } from 'react-native-ble-manager';
import { handleAndroidPermissions } from '@/utils/permission';

type BluetoothDevice = {
  id: string;
  name: string;
  rssi?: number;
  connected?: boolean;
};

const BluetoothPrint = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Map<string, BluetoothDevice>>(new Map());
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [hasPermissions, setHasPermissions] = useState(false);

  // Initialize Bluetooth manager
  useEffect(() => {
    const initBluetooth = async () => {
      try {
        await BleManager.start({ showAlert: false });
        const granted: any = await handleAndroidPermissions();
        setHasPermissions(granted);
        
        if (!granted) {
          Alert.alert(
            'Permissions Required',
            'Bluetooth permissions are needed to scan for devices',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Bluetooth initialization error:', error);
      }
    };

    initBluetooth();

    return () => {
      BleManager.stopScan().catch(console.warn);
    };
  }, []);

  const enableBluetooth = async (): Promise<boolean> => {
  try {
    await BleManager.enableBluetooth();
    return true;
  } catch (error) {
    console.error('Enable Bluetooth error:', error);

    if (Platform.OS === 'ios') {
      Alert.alert(
        'Enable Bluetooth',
        'Please enable Bluetooth in Settings to continue',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openURL('App-Prefs:Bluetooth') },
        ]
      );
    } else {
      Alert.alert('Bluetooth Required', 'Please enable Bluetooth to scan devices.');
    }

    return false;
  }
};

const startScanning = async () => {
  if (isScanning) return;

  const bluetoothEnabled = await enableBluetooth();
  if (!bluetoothEnabled) return;

  try {
    if (!hasPermissions) {
      const granted: any = await handleAndroidPermissions();
      if (!granted) return;
      setHasPermissions(true);
    }

    setIsScanning(true);
    setDevices(new Map());

    await BleManager.scan([], 5, true);
    console.log('Scanning started');

    BleManager.onDiscoverPeripheral((peripheral: Peripheral) => {
      setDevices(prevDevices => {
        const newDevices = new Map(prevDevices);
        if (!newDevices.has(peripheral.id)) {
          newDevices.set(peripheral.id, {
            id: peripheral.id,
            name: peripheral.name || 'Unknown Device',
            rssi: peripheral.rssi,
          });
        }
        return newDevices;
      });
    });

    setTimeout(() => {
      BleManager.stopScan().then(() => {
        setIsScanning(false);
      });
    }, 5000);
  } catch (error) {
    console.error('Scanning error:', error);
    setIsScanning(false);
  }
};

  const connectToDevice = async (device: BluetoothDevice) => {

    try {
      await BleManager.connect(device.id);
      setConnectedDevice(device);
    } catch (error) {
      console.error('Connection error:', error);
      Alert.alert('Connection Failed', 'Could not connect to the device');
    }
  };

  const disconnectDevice = async () => {
    if (!connectedDevice) return;
    
    try {
      await BleManager.disconnect(connectedDevice.id);
      setConnectedDevice(null);
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  };

  const sendData = async (data: string) => {
    if (!connectedDevice) return;

    try {
      const bytes = Array.from(new TextEncoder().encode(data));
    } catch (error) {
      console.error('Data send error:', error);
    }
  };

  return (
    <View style={styles.container}>
      
      {connectedDevice ? (
        <View style={styles.connectedContainer}>
          <Text>Connected to: {connectedDevice.name}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => sendData('Test print\n')}
          >
            <Text style={styles.buttonText}>Test Print</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.disconnectButton]} 
            onPress={disconnectDevice}
          >
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity 
            style={styles.button} 
            onPress={startScanning}
            disabled={isScanning}
          >
            <Text style={styles.buttonText} disabled ={isScanning}>
              {isScanning ? 'Scanning...' : 'Scan for Devices'}
            </Text>
          </TouchableOpacity>
          
          <FlatList
            data={Array.from(devices.values())}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.deviceItem}
                onPress={() => connectToDevice(item)}
              >
                <Text style={styles.deviceName}>{item.name}</Text>
                <Text style={styles.deviceId}>{item.id}</Text>
                {item.rssi && <Text style={styles.deviceRssi}>RSSI: {item.rssi}</Text>}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(39, 39, 39)',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
  },
  deviceItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#f5f6f6'
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deviceRssi: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  listContainer: {
    paddingBottom: 20,
  },
  connectedContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default BluetoothPrint;