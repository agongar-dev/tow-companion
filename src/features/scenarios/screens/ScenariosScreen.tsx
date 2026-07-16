import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import scenarioBackground from "../../../assets/images/escenarios.png";
import FilterItem from "../../../components/FilterItem";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import { RightDrawerContext } from "../../../navigation/RightDrawerProvider";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";
import ObjectiveDetail from "../../objectives/components/ObjectiveDetail";
import { Objective } from "../../objectives/types/Objective";
import GameLengthDetail from "../components/GameLengthDetail";
import ScenarioDetail from "../components/ScenarioDetail";
import ScenarioList from "../components/ScenarioList";
import { ScenarioRepository } from "../repositories/ScenarioRepository";
import { EnrichedScenario } from "../types/EnrichedScenario";
import { GameLength } from "../types/GameLength";

const ScenarioScreen = () => {
    const { t } = useTranslation();

    const { openRightDrawer, closeRightDrawer } = useContext(RightDrawerContext);
    const scenarioList = ScenarioRepository.getAll();

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const imageResize = isLandscape ? "stretch" : "cover";

    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [, setDrawerStack] = useState<React.ReactNode[]>([]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev => prev.includes(filter)
            ? prev.filter(f => f !== filter)
            : [...prev, filter]);
    };

    const filterScenariosByTags = (scenarios: EnrichedScenario[]) => {
        if (activeFilters.length === 0) {
            return scenarios;
        }

        return scenarios.filter(s => activeFilters.every(f => s.tags?.includes(f)));
    };

    const filters = scenarioList?.map(s => s.tags).flat().filter((v, i, a) => a.indexOf(v) === i) ?? [];

    const openDetail = (scenario: EnrichedScenario) => {
        const detail = (
            <ScenarioDetail
                scenario={scenario}
                onClose={() => closeRightDrawer()}
                onLinkClick={handleLinkClick}
                onBack={handleBack}
            />
        );

        setDrawerStack([detail]);
        openRightDrawer(detail);
    };

    const handleLinkClick = (link: SelectableDetail) => {
        let content: React.ReactNode = null;

        if (link.type === "GameLength") {
            const gameLength = link.detailable as GameLength;
            content = <GameLengthDetail gameLength={gameLength} onBack={handleBack} />;
        } else if (link.type === "Objective") {
            const objective = link.detailable as Objective;
            content = <ObjectiveDetail objective={objective} onBack={handleBack} onClose={closeRightDrawer} />;
        }

        setDrawerStack(prev => [...prev, content]);
        openRightDrawer(content);
    };

    const handleBack = () => {
        setDrawerStack(prev => {
            if (prev.length <= 1) {
                closeRightDrawer();
                return [];
            }

            const newStack = prev.slice(0, -1);
            const last = newStack[newStack.length - 1];
            openRightDrawer(last);
            return newStack;
        });
    };

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1">
                <ThemedFrame
                    imageSource={scenarioBackground}
                    imageResize={imageResize}
                >
                    <ThemedText className="text-4xl font-bold mb-2 w-full text-center">
                        {t("scenario-list.title")}
                    </ThemedText>
                    <View className="flex-col">
                        <ThemedText className="text-md mb-2 w-full text-center">
                            {t("scenario-list.description")}
                        </ThemedText>
                    </View>
                    <View className="flex-row justify-center flex-wrap gap-2">
                        <FilterItem
                            filters={filters}
                            activeFilters={activeFilters}
                            toggleFilter={toggleFilter}
                        />
                    </View>
                    <View className="flex-1 w-full">
                        <ScenarioList scenarios={filterScenariosByTags(scenarioList ?? [])} onSelect={openDetail} />
                    </View>
                </ThemedFrame>
            </View>
        </GestureHandlerRootView>
    );
};

export default ScenarioScreen;
