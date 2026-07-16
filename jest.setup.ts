const createStore = () => {
  const values = new Map<string, string>();

  return {
    set: jest.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    getString: jest.fn((key: string) => values.get(key)),
    delete: jest.fn((key: string) => {
      values.delete(key);
    }),
    clearAll: jest.fn(() => {
      values.clear();
    }),
    setString: jest.fn((key: string, value: string) => {
      values.set(key, value);
    }),
    removeItem: jest.fn((key: string) => {
      values.delete(key);
    }),
  };
};

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn(() => createStore()),
}));

jest.mock('react-native-uuid/dist/v4', () => ({
  v4: jest.fn(() => 'generated-uuid'),
}));
