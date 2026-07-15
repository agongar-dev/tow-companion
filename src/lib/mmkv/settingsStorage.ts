import { MMKVLoader } from "react-native-mmkv-storage";

export const settingsStorage = new MMKVLoader()
    .withInstanceID('settings')
    .withEncryption()
    .initialize();