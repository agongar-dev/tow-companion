import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
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

const LANDSCAPE_IMAGE_FLEX = 2;
const PORTRAIT_IMAGE_FLEX = 3;
const POSITION_FLEX = 2;
const NAME_FLEX = 3;
const TYPES_FLEX = 4;
const LANDSCAPE_IMAGE_SIZE = 60;
const PORTRAIT_IMAGE_SIZE = 40;
const BORDER_COLOR = "#ccc";

const styles = StyleSheet.create({
    imageCell: {
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: BORDER_COLOR,
    },
    positionCell: {
        flex: POSITION_FLEX,
        borderRightWidth: 1,
        borderColor: BORDER_COLOR,
    },
    nameCell: {
        flex: NAME_FLEX,
        borderRightWidth: 1,
        borderColor: BORDER_COLOR,
    },
    typesCell: {
        flex: TYPES_FLEX,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});

const getImageCellStyle = (isLandscape: boolean) => ({
    flex: isLandscape ? LANDSCAPE_IMAGE_FLEX : PORTRAIT_IMAGE_FLEX,
});

const getImageStyle = (isLandscape: boolean) => ({
    width: isLandscape ? LANDSCAPE_IMAGE_SIZE : PORTRAIT_IMAGE_SIZE,
    height: isLandscape ? LANDSCAPE_IMAGE_SIZE : PORTRAIT_IMAGE_SIZE,
});

const SceneryItemsTableRow: React.FC<RowProps> = ({ itemAndPosition: item, onLinkClick }) => {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const { t } = useTranslation();

    return (
        <View className="flex-row items-center py-2">
            <View style={[styles.imageCell, getImageCellStyle(isLandscape)]}>
                {item.item.image && (
                    <Image
                        source={
                            item.item.image.startsWith("http")
                                ? { uri: item.item.image }
                                : terrainItemsImages[item.item.image]
                        }
                        style={getImageStyle(isLandscape)}
                        resizeMode="contain"
                    />
                )}
            </View>

            <View style={styles.positionCell}>
                <ThemedText className="text-sm text-center">
                    L={item.positionOnMap.L}, S={item.positionOnMap.S}
                </ThemedText>
            </View>

            <View style={styles.nameCell}>
                <ThemedText className="text-base font-semibold text-center">{item.item.name}</ThemedText>
            </View>

            <View style={styles.typesCell}>
                {item.item.baseType?.name && (
                    <ThemedTouchable
                        onPress={() =>
                            onLinkClick?.({
                                type: "TerrainType",
                                detailable: item.item.baseType,
                            })
                        }
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
