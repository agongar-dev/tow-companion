import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import objectiveBackground from "../../../assets/images/objetivos.png";
import FilterItem from "../../../components/FilterItem";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import { RightDrawerContext } from "../../../navigation/RightDrawerProvider";
import ObjectiveDetail from "../components/ObjectiveDetail";
import ObjectiveList from "../components/ObjectiveList";
import { ObjectiveRepository } from "../repositories/ObjectiveRepository";
import { Objective } from "../types/Objective";

const ObjectivesScreen = () => {
    const { t } = useTranslation();

    const { openRightDrawer, closeRightDrawer } = useContext(RightDrawerContext);
    const objectiveList = ObjectiveRepository.getAll();

    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [drawerStack, setDrawerStack] = useState<React.ReactNode[]>([]);

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev => prev.includes(filter)
            ? prev.filter(f => f !== filter)
            : [...prev, filter]);
    };

    const filterObjectivesByTags = (objectives: Objective[]) => {
        if (activeFilters.length === 0) {
            return objectives;
        }
        return objectives.filter(s => activeFilters.every(f => s.tags?.includes(f)));
    }

    const filters = objectiveList?.map(s => s.tags).flat().filter((v, i, a) => a.indexOf(v) === i) ?? [];

    const openDetail = (objective: Objective) => {
        const detail = (<ObjectiveDetail
            objective={objective}
            onClose={(() => closeRightDrawer())}
        />
        );
        setDrawerStack([detail]);
        openRightDrawer(detail);
    };

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1">
                <ThemedFrame
                    imageSource={objectiveBackground}
                    imageResize={"cover"}
                >
                    <ThemedText className="text-4xl font-bold mb-8 w-full text-center">
                        {t("objective-list.title")}
                    </ThemedText>
                    <View className="flex-col">
                        <ThemedText className="text-md mb-2 w-full text-center">
                            {t('objective-list.description')}
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
                        <ObjectiveList objectives={filterObjectivesByTags(objectiveList ?? [])} onSelect={openDetail}  />
                    </View>
                </ThemedFrame>
            </View>
        </GestureHandlerRootView>
    );
}

export default ObjectivesScreen;