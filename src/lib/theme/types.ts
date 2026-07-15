export type ThemeType = {
  background: string;
  surface: string;
  text: string;
  accent: string;
  border: string;
  overlay: string;
};

export type ThemeContextType = {
    theme: ThemeType;
    mode: ThemeMode;
    toggleTheme: () => void;
};

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark',
}

export const THEME_STORAGE_KEY = "theme";