import { loadString, saveString } from "../../../lib/mmkv/storage";
import { THEME_STORAGE_KEY, ThemeMode } from "../../../lib/theme/types";

export const ThemeRepository = {
    getTheme: (): ThemeMode | null => {
        const theme = loadString(THEME_STORAGE_KEY);
        return theme ? (theme as ThemeMode) : null;
    },
    saveTheme: (mode: ThemeMode) => {
        saveString(THEME_STORAGE_KEY, mode);
    },
};