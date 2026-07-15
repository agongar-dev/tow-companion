export enum AudioMode {
    ON = 'on',
    MUTE = 'mute',
    MUSIC_ONLY = 'music',
    SFX_ONLY = 'sfx',
}

export type AudioContextType = {
    mode: AudioMode;
    isMuted: boolean;
    musicEnabled: boolean;
    sfxEnabled: boolean;
    toggleAudio: () => void;
};

export const AUDIO_STORAGE_KEY = "audioMode";