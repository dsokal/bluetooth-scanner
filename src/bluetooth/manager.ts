import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

export type Devices = Record<string, string>;
type Listener = (devices: Devices) => void;

const NOTIFY_INTERVAL_MS = 300;

const BluetoothManager = new BleManager();

const state = {
  isScanning: false,
  devices: {} as Devices,
  listeners: [] as Listener[],
  interval: null as ReturnType<typeof setInterval> | null,
};

export function startScanning() {
  if (state.isScanning) {
    return;
  }

  requestBluetoothPermissionAsync()
    .then(() => {
      BluetoothManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          // Handle error (scanning will be stopped automatically)
          console.error(error);
          return;
        }
        const deviceName = device.localName ?? device.name;
        if (!deviceName) {
          return;
        }
        if (!(device.id in state.devices)) {
          state.devices[device.id] = deviceName;
        }
      });
      state.isScanning = true;
      state.interval = setInterval(notifyListeners, NOTIFY_INTERVAL_MS);
    })
    .catch((err) => console.error(err));
}

export function stopScanning() {
  if (!state.isScanning) {
    return;
  }
  clearInterval(state.interval);
  state.devices = {};
  state.interval = null;
  BluetoothManager.stopDeviceScan();
  state.isScanning = false;
}

export function registerDevicesListener(fn: Listener) {
  state.listeners.push(fn);
}

export function deregisterDevicesListener(fn: Listener) {
  state.listeners = state.listeners.filter((i) => i !== fn);
}

function notifyListeners() {
  for (const listener of state.listeners) {
    listener(state.devices);
  }
}

async function requestBluetoothPermissionAsync() {
  if (Platform.OS !== 'android') {
    return;
  }

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Bluetooth Permission',
      message: 'Foobar needs access to Bluetooth.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error('Sorry, we need Bluetooth permission!');
  }
}
