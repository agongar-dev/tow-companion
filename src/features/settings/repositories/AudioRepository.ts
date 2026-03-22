import { loadString, saveString } from "../../../lib/mmkv/storage";
import { AUDIO_STORAGE_KEY, AudioMode } from "../../../lib/audio/types";

export const AudioRepository = {
    getAudio: (): AudioMode | null => {
        const audio = loadString(AUDIO_STORAGE_KEY);
        return audio ? (audio as AudioMode) : null;
    },
    saveAudio: (mode: AudioMode) => {
        saveString(AUDIO_STORAGE_KEY, mode);
    },
};