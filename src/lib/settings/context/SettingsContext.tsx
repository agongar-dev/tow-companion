import { createContext, useState, useEffect, useContext } from "react";
import { ArmiesOrPlayers, SettingsContextType } from "../types";
import { SettingsRepository } from "../../../features/settings/repositories/SettingsRepository";

const SettingsContext = createContext<SettingsContextType>({
    armiesOrPlayers: ArmiesOrPlayers.ARMIES,
    setNavShowArmiesOrPlayers: () => { },
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [navShow, setNavShow] = useState<ArmiesOrPlayers>(ArmiesOrPlayers.ARMIES);

    useEffect(() => {
        const stored = SettingsRepository.getNavShowArmiesOrPlayers();
        if (stored) {
            setNavShow(stored);
        }
    }, []);

    const setNavShowArmiesOrPlayers = (armiesOrPlayers: ArmiesOrPlayers) => {
        SettingsRepository.saveNavShowArmiesOrPlayers(armiesOrPlayers);
        setNavShow(armiesOrPlayers);
    };

    return (
        <SettingsContext.Provider value={{ armiesOrPlayers: navShow, setNavShowArmiesOrPlayers }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within a SettingsProvider');

    return context;
};