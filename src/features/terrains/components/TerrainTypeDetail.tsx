import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import imageFrame from "../../../assets/images/frame/frame-portrait.png";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import { SceneryType } from "../types/SceneryType";

type TerrainTypeDetailProps = {
    terrainType: SceneryType;
    onBack: () => void;
};

const TerrainTypeDetail: React.FC<TerrainTypeDetailProps> = ({ terrainType, onBack }) => {

    const { t } = useTranslation();

    return (
        <ThemedFrame imageSource={imageFrame} imageResize="cover">
            <ScrollView className="p-4">

                <ThemedTouchable onPress={onBack}>
                    <ThemedText className="text-accent mb-4 font-bold">← {t('common.back')}</ThemedText>
                </ThemedTouchable>

                <ThemedText className="text-2xl text-center font-bold mb-2">{t('common.types')}: {terrainType.name}</ThemedText>
                <View className="space-y-2 px-10">
                    {terrainType.description && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('common.description')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.description}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesMovement && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-movement')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesMovement}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesDistance && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-distance')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesDistance}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesCloseCombat && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-close-combat')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesCloseCombat}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesShooting && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-shooting')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesShooting}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesLineOfSight && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-line-of-sight')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesLineOfSight}</ThemedText>
                        </View>
                    )}
                    {terrainType.rulesOther && (
                        <View>
                            <ThemedText className="text-lg mb-4 font-bold">{t('terrain-detail.rules-other')}</ThemedText>
                            <ThemedText className="mb-4">{terrainType.rulesOther}</ThemedText>
                        </View>
                    )}
                </View>
            </ScrollView>
        </ThemedFrame>

    );
};

export default TerrainTypeDetail;
