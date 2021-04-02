import { AsyncStorage } from 'react-native';
import { LocalDataSource } from './LocalDataSource';

export class LocalDataSourceImpl implements LocalDataSource {
  clear() {
    AsyncStorage.clear();
  }

  getItem(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then(
          result => {
            resolve(result);
          },
          error => {
            reject(error);
          },
        )
        .catch(error => {
          reject(error);
        });
    });
  }

  setItem(key: string, value: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      AsyncStorage.setItem(key, value)
        .then(() => {
          resolve(value);
        })
        .catch(() => {
          {
            reject(false);
          }
        });
    });
  }
}
