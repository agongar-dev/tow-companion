import { MMKV } from "react-native-mmkv"

export const storage = new MMKV();

export const saveString = (key: string, value: string): void => {
    storage.set(key, value);
};

export const loadString = (key: string): string | null => {
    return storage.getString(key) ?? null;
};

export const remove = (key: string): void => {
    storage.delete(key);
};

export const clearStorage = (): void => {
    storage.clearAll();
};
