import React, { createContext, useState, useMemo } from "react";
import { Drawer } from "react-native-drawer-layout";
import CustomDrawer from "./drawer/CustomDrawer";
import { useWindowDimensions } from "react-native";

export const RightDrawerContext = createContext<{
    openRightDrawer: (content: React.ReactNode) => void;
    closeRightDrawer: () => void;
}>({
    openRightDrawer: () => { },
    closeRightDrawer: () => { },
});

export default function RightDrawerProvider() {

    const { width } = useWindowDimensions();

    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [drawerContent, setDrawerContent] = useState<React.ReactNode>(null);

    const value = useMemo(
        () => ({
            openRightDrawer: (content: React.ReactNode) => {
                setDrawerContent(content);
                setRightDrawerOpen(true);
            },
            closeRightDrawer: () => {
                setRightDrawerOpen(false);
                setDrawerContent(null);
            },
        }),
        []
    );

    return (
        <Drawer
            open={rightDrawerOpen}
            onOpen={() => setRightDrawerOpen(true)}
            onClose={() => setRightDrawerOpen(false)}
            drawerPosition="right"
            drawerType="front"
            drawerStyle={{ width: width / 1.3, backgroundColor: "transparent" }}
            swipeEnabled={false}
            renderDrawerContent={() => drawerContent}
        >
            <RightDrawerContext.Provider value={value}>
                <CustomDrawer />
            </RightDrawerContext.Provider>
        </Drawer>
    );
}
