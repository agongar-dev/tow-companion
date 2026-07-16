import { View, Image, useWindowDimensions } from "react-native";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";
import { EnrichedSceneryPosition } from "../types/EnrichedMapLayout";
import { terrainItemsImages } from "../utils/terrainItemsImages";
import { useTranslation } from "react-i18next";

type RowProps = {
    itemAndPosition: EnrichedSceneryPosition;
    onLinkClick?: (item: SelectableDetail) => void;
};

const SceneryItemsTableRow: React.FC<RowProps> = ({ itemAndPosition: item, onLinkClick }) => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const { t } = useTranslation();

    return (
        <View className="flex-row items-center py-2">
            {/* Image */}
            <View style={{ flex: isLandscape ? 2 : 3, alignItems: "center", borderRightWidth: 1, borderColor: "#ccc" }}>
                {item.item.image && (
                    <Image
                        source={
                            item.item.image.startsWith("http")
                                ? { uri: item.item.image }
                                : terrainItemsImages[item.item.image]
                        }
                        style={{
                            width: isLandscape ? 60 : 40,
                            height: isLandscape ? 60 : 40,
                        }}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Position */}
            <View style={{ flex: 2, borderRightWidth: 1, borderColor: "#ccc" }}>
                <ThemedText className="text-sm text-center">
                    L={item.positionOnMap.L}, S={item.positionOnMap.S}
                </ThemedText>
            </View>

            {/* Name */}
            <View style={{ flex: 3, borderRightWidth: 1, borderColor: "#ccc" }}>
                <ThemedText className="text-base font-semibold text-center">{item.item.name}</ThemedText>
            </View>

            {/* Types */}
            <View
                style={{
                    flex: 4,
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {item.item.baseType?.name && (
                    <ThemedTouchable
                        onPress={() =>
                            onLinkClick?.({
                                type: "TerrainType",
                                detailable: item.item.baseType
                            })                        }
                        className="w-full"
                    >
                        <ThemedText className="text-accent mr-2 text-center">{item.item.baseType.name} ({t("terrain-detail.base-type")})</ThemedText>
                    </ThemedTouchable>
                )}
                {item.item.allowedTypes.map(at => (
                    <ThemedTouchable
                        key={at.id}
                        onPress={() =>
                            onLinkClick?.({
                                type: "TerrainType",
                                detailable: at,
                            })
                        }
                        className="w-full"
                    >
                        <ThemedText className="text-center">{at.name}</ThemedText>
                    </ThemedTouchable>
                ))}
            </View>
        </View>
    );
};

export default SceneryItemsTableRow;
