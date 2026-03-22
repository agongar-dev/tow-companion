import { createContext, useContext, useState, useEffect } from "react";
import { AudioMode, AudioContextType } from "../types";
import { AudioRepository } from "../../../features/settings/repositories/AudioRepository";

export const AudioSettingsContext = createContext<AudioContextType>({
    mode: AudioMode.ON,
    isMuted: false,
    musicEnabled: false,
    sfxEnabled: false,
    toggleAudio: () => {},
});

export const AudioSettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<AudioMode>(AudioMode.ON);

    useEffect(() => {
        const stored = AudioRepository.getAudio();
        if (stored) {
            setMode(stored);
        }
    }, []);

    const toggleAudio = () => {
        const next = mode !== AudioMode.MUTE ? AudioMode.MUTE : AudioMode.ON;
        AudioRepository.saveAudio(next);
        setMode(next);
    };

    const isMuted = mode === AudioMode.MUTE;
    const musicEnabled = mode === AudioMode.ON || mode === AudioMode.MUSIC_ONLY;
    const sfxEnabled = mode === AudioMode.ON || mode === AudioMode.SFX_ONLY;

    return (
        <AudioSettingsContext.Provider value={{ mode, isMuted, musicEnabled, sfxEnabled, toggleAudio }}>
            {children}
        </AudioSettingsContext.Provider>
    );
};

export const useAudio = () => {
    const ctx = useContext(AudioSettingsContext);
    if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
    return ctx;
};
