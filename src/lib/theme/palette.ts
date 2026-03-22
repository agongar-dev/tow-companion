import { ThemeType } from "./types";

const palette = {
  parchment: "#f3e8d8",
  bone_white: "#e9dbc2",
  ink: "#4d3a3aff",
  blood: "#7f1d1d",
  gold: "#bfa76f",
  stone: "#585858",
};

const light: ThemeType = {
  background: palette.parchment,
  surface: palette.bone_white,
  text: palette.ink,
  accent: palette.gold,
  border: palette.stone,
  overlay: "rgba(255, 255, 255, 0.35)",
};

const dark: ThemeType = {
  background: "#1e1b16",
  surface: "#2d261f",
  text: "#f0e7d6",
  accent: "#702828ff",
  border: "#5f5349",
  overlay: "rgba(0, 0, 0, 0.5)",
};

export const themes = {
  light,
  dark,
};
