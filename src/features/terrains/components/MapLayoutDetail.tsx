import { useTranslation } from "react-i18next";
import { FlatList, Image, StyleSheet, useWindowDimensions, View } from "react-native";
import officialIcon from "../../../assets/icons/warhammer-official.jpeg";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import ThemedView from "../../../components/ThemedView";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";
import { EnrichedMapLayout } from "../types/EnrichedMapLayout";
import { mapLayoutImages } from "../utils/mapLayoutImages";
import divider from "../../../assets/images/divider.png";
import SceneryItemsTableRow from "./SceneryItemTableRow";

type MapLayoutDetailProps = {
    mapLayout: EnrichedMapLayout;
    onClose: () => void;
    onBack: () => void;
    onLinkClick?: (link: SelectableDetail) => void;
};

const HEADER_FLEX_IMAGE = 2;
const HEADER_FLEX_POSITION = 2;
const HEADER_FLEX_NAME = 3;
const HEADER_FLEX_TYPES = 3;

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        height: 12,
    },
    fullWidth: {
        width: "100%",
    },
    listContent: {
        paddingBottom: 20,
    },
    imageHeader: {
        flex: HEADER_FLEX_IMAGE,
    },
    positionHeader: {
        flex: HEADER_FLEX_POSITION,
    },
    nameHeader: {
        flex: HEADER_FLEX_NAME,
    },
    typesHeader: {
        flex: HEADER_FLEX_TYPES,
    },
});

const DividerSeparator = () => (
    <Image
        source={divider}
        resizeMode="contain"
        style={styles.divider}
    />
);

const MapLayoutDetail = ({ mapLayout, onClose, onLinkClick }: MapLayoutDetailProps) => {
    const { height } = useWindowDimensions();
    const { t } = useTranslation();

    return (
        <ThemedView className="flex-1 p-4 bg-white">
            <FlatList
                data={mapLayout.sceneryItems}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                    <SceneryItemsTableRow itemAndPosition={item} onLinkClick={onLinkClick} />
                )}
                ItemSeparatorComponent={DividerSeparator}
                ListHeaderComponent={
                    <>
                        <View className="mb-6 flex-row justify-center">
                            <ThemedText className="text-2xl font-bold">
                                {mapLayout.name}
                            </ThemedText>
                            {mapLayout.tags?.includes("official") && (
                                <Image
                                    source={officialIcon}
                                    resizeMode="contain"
                                    className="ml-2 w-12 h-12"
                                />
                            )}
                        </View>

                        {mapLayout.description && (
                            <View className="mb-6">
                                <ThemedText className="text-xl font-bold mb-2">
                                    {t("scenario-detail.description")}
                                </ThemedText>
                                <ThemedText className="text-sm italic">
                                    {mapLayout.description}
                                </ThemedText>
                            </View>
                        )}

                        {mapLayout.image && (
                            <View className="flex-row justify-center mb-6 gap-2">
                                <Image
                                    source={
                                        mapLayout.image?.startsWith("http")
                                            ? { uri: mapLayout.image }
                                            : mapLayoutImages[mapLayout.image]
                                    }
                                    style={[styles.fullWidth, { height: height * 0.5 }]}
                                    resizeMode="contain"
                                />
                            </View>
                        )}

                        <View className="flex-row border-b border pb-2 mb-2">
                            <ThemedText style={styles.imageHeader} className="font-bold text-center">
                                {t("common.image")}
                            </ThemedText>
                            <ThemedText style={styles.positionHeader} className="font-bold text-center">
                                {t("common.position")}
                            </ThemedText>
                            <ThemedText style={styles.nameHeader} className="font-bold text-center">
                                {t("common.name")}
                            </ThemedText>
                            <ThemedText style={styles.typesHeader} className="font-bold text-center">
                                {t("common.types")}
                            </ThemedText>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <ThemedTouchable onPress={onClose} className="p-3">
                        <ThemedText className="text-center font-bold">
                            {t("common.close")}
                        </ThemedText>
                    </ThemedTouchable>
                }
                contentContainerStyle={styles.listContent}
            />
        </ThemedView>
    );
};

export default MapLayoutDetail;
