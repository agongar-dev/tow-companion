import { MMKVLoader } from "react-native-mmkv-storage";

export const battleStorage = new MMKVLoader()
    .withInstanceID('battle')
    .withEncryption()
    .initialize();