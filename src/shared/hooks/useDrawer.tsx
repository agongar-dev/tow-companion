import { createContext, useContext, useState } from "react";

export enum DrawerMode {
    Hidden,
    Visible,
}

type DrawerContextType = {
    mode: DrawerMode;
    setMode: (mode: DrawerMode) => void;
    close: () => void;
    expand: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<DrawerMode>(DrawerMode.Visible);

    const close = () => { setMode(DrawerMode.Hidden) };

    const expand = () => { setMode(DrawerMode.Visible) };

    return (
        <DrawerContext.Provider value={{ mode, setMode, close, expand }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (!context) throw new Error('useCustomDrawer must be used within a CustomDrawerProvider');
    
    return context;
};