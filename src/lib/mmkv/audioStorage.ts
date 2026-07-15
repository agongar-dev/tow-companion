import { MMKV } from "react-native-mmkv";
import { AUDIO_STORAGE_KEY, AudioMode } from "../audio/types";

const storage = new MMKV();

export const saveAudioMode = (mode: AudioMode): void => {
    storage.set(AUDIO_STORAGE_KEY, mode);
};

export const loadAudioMode = (): AudioMode => {
    const stored = storage.getString(AUDIO_STORAGE_KEY);
    return (stored as AudioMode) ?? AudioMode.ON;
}