export const SETTINGS_STORAGE_KEY = "settings";

export enum ArmiesOrPlayers {
    ARMIES = "armies",
    PLAYERS = "players",
}

export type SettingsContextType = {
    armiesOrPlayers: ArmiesOrPlayers;
    setNavShowArmiesOrPlayers: (armiesOrPlayers: ArmiesOrPlayers) => void;
};