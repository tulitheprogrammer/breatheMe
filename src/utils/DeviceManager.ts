import DeviceInfo from 'react-native-device-info';

export class DeviceManager {
  getUniqueDeviceId(): string {
    return DeviceInfo.getUniqueID();
  }

  isEmulator(): boolean {
    return DeviceInfo.isEmulator();
  }
}
