import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BluetoothDevices } from './components/BluetoothDevices';
import { Logo } from './components/Logo';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo />
      <BluetoothDevices />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
