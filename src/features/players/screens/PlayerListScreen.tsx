import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import { RightDrawerContext } from "../../../navigation/RightDrawerProvider";
import { Player } from "../types/player";
import { v4 as uuidv4 } from "react-native-uuid/dist/v4";

import playersBackground from "../../../assets/images/players.png";
import { ArmyList } from "../../armies/types/ArmyList";
import { PlayerRepository } from "../repositories/PlayerRepository";
import PlayerService from "../services/playerService";
import PlayerList from "../components/PlayerList";
import ArmyDetail from "../../armies/components/ArmyDetail";
import ThemedTouchable from "../../../components/ThemedTouchable";
import PlayerDetail from "../components/PlayerDetail";

const PlayerListScreen = () => {
    const { t } = useTranslation();
    const { openRightDrawer, closeRightDrawer } = useContext(RightDrawerContext);

    const players: Player[] = PlayerRepository.getAll();
    const armies: Record<string, ArmyList> = PlayerService.getArmiesMap();

    const [, setDrawerStack] = useState<React.ReactNode[]>([]);

    const openPlayerDetail = (player: Player) => {
        const detail = (
            <PlayerDetail
                player={player}
                onClose={() => closeRightDrawer()}
                onBack={handleBack}
            />
        );
        setDrawerStack([detail]);
        openRightDrawer(detail);
    };

    const openArmyDetail = (army: ArmyList) => {
        const detail = (
            <ArmyDetail
                army={army}
                onClose={() => closeRightDrawer()}
                onBack={handleBack}
            />
        );
        setDrawerStack([detail]);
        openRightDrawer(detail);
    };

    const handleBack = () => {
        setDrawerStack((prev) => {
            if (prev.length <= 1) {
                closeRightDrawer();
                return [];
            }

            const newStack = prev.slice(0, -1);
            openRightDrawer(newStack[newStack.length - 1]);
            return newStack;
        });
    };

    const handleCreatePlayer = () => {
        const newPlayer = PlayerRepository.createLocalPlayer("New Player", uuidv4());
        openPlayerDetail(newPlayer);
    };

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1">
                <ThemedFrame imageSource={playersBackground} imageResize="cover">
                    <ThemedText className="text-4xl font-bold mb-8 w-full text-center">
                        {t("player-list.title")}
                    </ThemedText>

                    <View className="flex-1 w-full">
                        <ThemedTouchable onPress={handleCreatePlayer}>
                            <ThemedText className="text-accent mb-4 font-bold">{t("player-list.create")}</ThemedText>
                        </ThemedTouchable>
                    </View>

                    <View className="flex-1 w-full">
                        <PlayerList
                            players={players}
                            armies={armies}
                            onSelect={openArmyDetail}
                        />
                    </View>
                </ThemedFrame>
            </View>
        </GestureHandlerRootView>
    );
};

export default PlayerListScreen;
