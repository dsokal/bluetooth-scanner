import React, { useEffect, useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import * as manager from '../bluetooth/manager';
import type { Devices } from '../bluetooth/manager';
import { Button } from './Button';

export function BluetoothDevices() {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Devices>({});

  const handleNewDevices = useCallback((devices: Devices) => {
    setDevices({ ...devices });
  }, []);

  useEffect(() => {
    manager.registerDevicesListener(handleNewDevices);
    return () => {
      manager.deregisterDevicesListener(handleNewDevices);
    };
  }, [handleNewDevices]);

  const handleStartScan = () => {
    if (isScanning) {
      return;
    }
    manager.startScanning();
    setIsScanning(true);
  };

  const handleStopScan = () => {
    if (!isScanning) {
      return;
    }
    manager.stopScanning();
    setIsScanning(false);
    setDevices({});
  };

  return (
    <View style={styles.container}>
      {!isScanning ? (
        <Button onPress={handleStartScan} title="Scan devices" backgroundColor="green" />
      ) : (
        <Button onPress={handleStopScan} title="Stop scanning" backgroundColor="red" />
      )}
      {isScanning && <DeviceList devices={devices} />}
    </View>
  );
}

function DeviceList({ devices }: { devices: Devices }) {
  const data = Object.keys(devices).map((id) => ({ key: id, title: devices[id] }));
  return (
    <SafeAreaView style={styles.devices}>
      {data.length === 0 ? (
        <ActivityIndicator size="small" color="#001A72" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Text style={[styles.device, index % 2 === 0 ? styles.deviceEven : styles.deviceOdd]}>
              {item.title}
            </Text>
          )}
          keyExtractor={(item) => item.key}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  devices: {
    flex: 1,
    width: 350,
    marginTop: 20,
  },
  device: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    color: 'white',
  },
  deviceEven: {
    backgroundColor: '#8ED3EF',
  },
  deviceOdd: {
    backgroundColor: '#001A72',
  },
});
