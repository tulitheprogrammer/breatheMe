import { NetInfo } from 'react-native';

export class NetworkChecker {
  isDeviceConnected(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      NetInfo.getConnectionInfo().then(result => {
        resolve(result.type.toLowerCase() !== 'none');
      });
    });
  }
}
