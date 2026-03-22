import { loadString, saveString } from "../../../lib/mmkv/storage";
import { SETTINGS_STORAGE_KEY, ArmiesOrPlayers } from "../../../lib/settings/types";

export const SettingsRepository = {
    getNavShowArmiesOrPlayers: (): ArmiesOrPlayers | null => {
        const navSettings = loadString(SETTINGS_STORAGE_KEY);
        return navSettings ? (navSettings as ArmiesOrPlayers) : null;
    },
    saveNavShowArmiesOrPlayers: (mode: ArmiesOrPlayers) => {
        saveString(SETTINGS_STORAGE_KEY, mode);
    },
};