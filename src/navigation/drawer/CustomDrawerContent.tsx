import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, View } from "react-native";
import parchment from "../../assets/images/parchment-full.png";
import ThemedImageBackground from "../../components/ThemedImageBackground";
import { useSettings } from "../../lib/settings/context/SettingsContext";
import { ArmiesOrPlayers } from "../../lib/settings/types";
import { useDrawer } from "../../shared/hooks/useDrawer";
import DrawerItem from "./DrawerItem";

const styles = StyleSheet.create({
    background: {
        marginRight: -80,
    },
});

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { close } = useDrawer();
    const { t } = useTranslation();
    const { armiesOrPlayers } = useSettings();

    return (
        <ThemedImageBackground source={parchment} imageResize="stretch" className="h-full shadow-xl" maxHeight={500} style={styles.background}>
            <SafeAreaView className="flex-1 px-20">
                <View className="flex-1 justify-center">
                    <DrawerItem
                        label={t("home.title")}
                        onPress={() => {
                            props.navigation.navigate("Home");
                            close();
                        }}
                        showDivider={false}
                    />
                    <DrawerItem
                        label={t("scenario-list.title")}
                        onPress={() => {
                            props.navigation.navigate("Scenarios");
                            close();
                        }}
                    />
                    <DrawerItem
                        label={t("objective-list.title")}
                        onPress={() => {
                            props.navigation.navigate("Objectives");
                            close();
                        }}
                    />
                    <DrawerItem
                        label={t("terrain-list.title")}
                        onPress={() => {
                            props.navigation.navigate("Terrains");
                            close();
                        }}
                    />
                    {armiesOrPlayers === ArmiesOrPlayers.ARMIES
                        ? <DrawerItem
                            label={t("armies-list.title")}
                            onPress={() => {
                                props.navigation.navigate("Armies");
                                close();
                            }}
                        />
                        : <DrawerItem
                            label={t("player-list.title")}
                            onPress={() => {
                                props.navigation.navigate("Players");
                                close();
                            }}
                        />
                    }
                    <DrawerItem
                        label={t("settings.title")}
                        onPress={() => {
                            props.navigation.navigate("Settings");
                            close();
                        }}
                    />
                </View>
            </SafeAreaView>
        </ThemedImageBackground>
    );
}
