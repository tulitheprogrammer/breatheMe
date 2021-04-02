export interface LocalDataSource {
  getItem(key: string): Promise<string>;

  setItem(key: string, value: string): Promise<string>;

  clear();
}
