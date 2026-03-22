import { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import terrainBackground from "../../../assets/images/terrains.png";
import FilterItem from "../../../components/FilterItem";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import { RightDrawerContext } from "../../../navigation/RightDrawerProvider";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";
import MapLayoutDetail from "../components/MapLayoutDetail";
import MapLayoutList from "../components/MapLayoutList";
import TerrainTypeDetail from "../components/TerrainTypeDetail";
import { MapLayoutRepository } from "../repositories/MapLayoutRepository";
import { EnrichedMapLayout } from "../types/EnrichedMapLayout";
import { SceneryType } from "../types/SceneryType";

const TerrainsScreen = () => {
    const { t } = useTranslation();
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const imageResize = isLandscape ? "stretch" : "cover";

    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [drawerStack, setDrawerStack] = useState<React.ReactNode[]>([]);
    const { openRightDrawer, closeRightDrawer } = useContext(RightDrawerContext);

    const mapLayoutList = MapLayoutRepository.getAll();
    /** Filters */
    const filters = useMemo(
        () => mapLayoutList
            ?.map(s => s.tags ?? [])
            .flat()
            .filter((v, i, a) => v && a.indexOf(v) === i) ?? [],
        [mapLayoutList]
    );

    const toggleFilter = (filter: string) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    const filteredLayouts = useMemo(() => {
        if (activeFilters.length === 0) return mapLayoutList;
        return mapLayoutList.filter(m => activeFilters.every(f => m.tags?.includes(f)));
    }, [mapLayoutList, activeFilters]);

    const openDetail = (mapLayout: EnrichedMapLayout) => {
        const detail = (
            <MapLayoutDetail
                mapLayout={mapLayout}
                onLinkClick={handleLinkClick}
                onClose={() => closeRightDrawer()}
                onBack={handleBack}
            />
        );
        setDrawerStack([detail]);
        openRightDrawer(detail);
    };

    const handleLinkClick = (link: SelectableDetail
    ) => {
        const terrainType = link.detailable as SceneryType;
        if (!terrainType) return;
        const content: React.ReactNode = (
            <TerrainTypeDetail
                terrainType={terrainType}
                onBack={handleBack}
            />
        );
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
            openRightDrawer(newStack[newStack.length - 1]);
            return newStack;
        });
    };

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1">
                <ThemedFrame
                    imageSource={terrainBackground}
                    imageResize={imageResize}
                >
                    <ThemedText className="text-4xl font-bold w-full text-center">
                        {t("terrain-list.title")}
                    </ThemedText>
                    <ThemedText className="text-md w-full text-center mb-2">
                        {t("terrain-list.description")}
                    </ThemedText>

                    {/* Filters */}
                    <View className="flex-row justify-center flex-wrap gap-2 mb-2">
                        <FilterItem
                            filters={filters}
                            activeFilters={activeFilters}
                            toggleFilter={toggleFilter}
                        />
                    </View>

                    {/* List */}
                    <View className="flex-1 w-full">
                        <MapLayoutList
                            mapLayouts={filteredLayouts}
                            onSelect={openDetail}
                        />
                    </View>
                </ThemedFrame>
            </View>
        </GestureHandlerRootView>
    );
};

export default TerrainsScreen;

