import { LocalDataSource } from '../../data/repository/LocalDataSource';

export default class StorageMock implements LocalDataSource {
  private storageCache: {};

  constructor(cache = {}) {
    this.storageCache = cache;
  }

  setItem = jest.fn((key, value) => {
    return new Promise((resolve, _reject) => {
      this.storageCache[key] = value;
      resolve(value);
    });
  });

  getItem = jest.fn(key => {
    return new Promise(resolve => {
      let value = '';
      try {
        value = this.storageCache[key];
      } catch (error) {
        value = '';
      }
      resolve(value);
    });
  });

  removeItem = jest.fn(key => {
    return new Promise((resolve, reject) => {
      return this.storageCache.hasOwnProperty(key)
        ? resolve(delete this.storageCache[key])
        : reject('No such key!');
    });
  });

  clear = jest.fn(() => {
    return new Promise((resolve, _reject) => resolve((this.storageCache = {})));
  });

  getAllKeys = jest.fn(() => {
    return new Promise((resolve, _reject) =>
      resolve(Object.keys(this.storageCache)),
    );
  });
}

it('no test here', () => {});
