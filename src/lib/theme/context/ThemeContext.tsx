import { createContext, useState, useEffect, useContext } from "react";
import { themes } from "../palette";
import { ThemeMode, ThemeContextType } from "../types";
import { ThemeRepository } from "../../../features/settings/repositories/ThemeRepository";

const ThemeContext = createContext<ThemeContextType>({
    theme: themes.light,
    mode: ThemeMode.Light,
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(ThemeMode.Light);

    useEffect(() => {
        const stored = ThemeRepository.getTheme();
        if (stored) {
            setMode(stored);
        }
    }, []);

    const toggleTheme = () => {
        const next = mode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light;
        ThemeRepository.saveTheme(next);
        setMode(next);
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[mode], mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');

    return context;
};