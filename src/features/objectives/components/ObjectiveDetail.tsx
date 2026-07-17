import { Image, ScrollView, StyleSheet, View } from "react-native";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import imageFrame from "../../../assets/images/frame/frame-portrait.png";
import { Objective } from "../types/Objective";
import { ScoreTiming } from "../types/ScoreTiming";
import { useTranslation } from "react-i18next";
import { t as translate } from "i18next";
import { objectiveImages } from "../utils/objectiveImages";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";

type ObjectiveDetailProps = {
    objective: Objective;
    onBack?: () => void;
    inline?: boolean;
    onLinkClick?: (link: SelectableDetail) => void;
    onClose?: () => void;
};

const IMAGE_HEIGHT = 200;

const styles = StyleSheet.create({
    inlineImage: {
        width: "100%",
        height: IMAGE_HEIGHT,
        marginBottom: 8,
        borderRadius: 8,
    },
    detailImage: {
        width: "100%",
        height: IMAGE_HEIGHT,
        marginBottom: 16,
        borderRadius: 8,
    },
});

const getScoreTimingLabel = (timing?: ScoreTiming) => {
    if (!timing) return timing;

    switch (timing) {
        case ScoreTiming.IMMEDIATE:
            return translate('objective-detail.score-timing.immediate');
        case ScoreTiming.END_OF_TURN:
            return translate('objective-detail.score-timing.end-of-turn');
        case ScoreTiming.END_OF_BATTLE:
            return translate('objective-detail.score-timing.end-of-battle');
        default:
            return timing;
    }
};

const ObjectiveDetail: React.FC<ObjectiveDetailProps & { inline?: boolean }> = ({ objective, onBack, onClose, inline }) => {
    const { t } = useTranslation();

    if (inline) {
        return (
            <ThemedFrame imageSource={imageFrame} imageResize="stretch">
                <View className="mb-6 border border-gray-300 rounded-lg">
                    <ThemedText className="text-xl font-bold mb-2 text-center">{objective.name}</ThemedText>
                    <ThemedText className="text-sm mb-3 text-center">{objective.summary}</ThemedText>

                    {objective.image && (
                        <Image
                            source={objective.image.startsWith("http") ? { uri: objective.image } : objectiveImages[objective.image]}
                            style={styles.inlineImage}
                            resizeMode="contain"
                        />
                    )}

                    {objective.victoryConditions && objective.victoryConditions.length > 0 && (
                        <View className="space-y-1">
                            {objective.victoryConditions?.map(vc => (
                                <View key={vc.id} className="flex-row justify-between items-center">
                                    <ThemedText className="text-sm flex-1">{vc.description}</ThemedText>
                                    <View className="flex-col justify-end">
                                        <ThemedText className="text-sm font-bold">{getScoreTimingLabel(vc.scoreTiming)}</ThemedText>
                                        <ThemedText className="text-sm font-bold ml-2">{vc.points} pts</ThemedText>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ThemedFrame>
        );
    }

    const content = (
        <View className="p-4">
            {onBack && (
                <ThemedTouchable onPress={onBack}>
                    <ThemedText className="text-accent mb-4 font-bold">{"← " + t('common.back')}</ThemedText>
                </ThemedTouchable>
            )}

            <ThemedText className="text-2xl font-bold mb-2 text-center">{objective.name}</ThemedText>

            <ThemedText className="text-sm font-semibold mb-2 text-center capitalize">
                {t('common.type')}: {objective.type}
            </ThemedText>

            <ThemedText className="text-sm mb-4 text-center">{objective.summary}</ThemedText>

            {objective.image && (
                <Image
                    source={objective.image.startsWith("http") ? { uri: objective.image } : objectiveImages[objective.image]}
                    style={styles.detailImage}
                    resizeMode="contain"
                />
            )}

            {objective.description && objective.description.length > 0 && (
                <View className="mb-6">
                    <ThemedText className="text-xl font-bold mb-2">
                        {t('common.description')}
                    </ThemedText>
                    {objective.description.map?.((desc, index) => (
                        <ThemedText key={index} className="text-sm mb-2">
                            {desc}
                        </ThemedText>
                    ))}
                </View>
            )}

            {objective.objectiveRules && objective.objectiveRules.length > 0 && (
                <View className="mb-6">
                    <ThemedText className="text-xl font-bold mb-2">
                        {t('common.rules')}
                    </ThemedText>
                    {objective.objectiveRules.map((rule, index) => (
                        <View key={index} className="mb-4">
                            <ThemedText className="font-bold mb-1">{rule.title}</ThemedText>
                            {Array.isArray(rule.description) ? (
                                rule.description.map((desc, descIndex) => (
                                    <ThemedText key={descIndex} className="text-sm mb-1">
                                        {desc}
                                    </ThemedText>
                                ))
                            ) : (
                                <ThemedText className="text-sm">{rule.description}</ThemedText>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {objective.victoryConditions && objective.victoryConditions.length > 0 && (
                <View className="mb-6">
                    <ThemedText className="text-lg font-bold mb-2">
                        {t('common.victory-conditions')}
                    </ThemedText>
                    <View className="space-y-3">
                        {objective.victoryConditions.map(vc => (
                            <View key={vc.id} className="p-3 border border-gray-400 rounded-lg">
                                <ThemedText className="font-semibold mb-2">{vc.description}</ThemedText>
                                <View className="flex-row justify-between">
                                    <ThemedText className="text-sm">
                                        {t('common.points')}: {vc.points}
                                    </ThemedText>
                                    <ThemedText className="text-sm">
                                        {t('objective-detail.repeatable')}: {" "}
                                        {vc.isRepeatable ? t('common.yes') : t('common.no')}
                                    </ThemedText>
                                </View>
                                <ThemedText className="text-sm mt-1">
                                    {t('objective-detail.score-timing.label')}: {getScoreTimingLabel(vc.scoreTiming)}
                                </ThemedText>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <ThemedFrame imageSource={imageFrame} imageResize="stretch">
            <ScrollView className="p-4">
                {content}
            </ScrollView>

            <ThemedTouchable
                onPress={onClose}
                className="p-3 bg-gray-300 rounded mt-2"
            >
                <ThemedText className="text-center font-bold">{t('common.close')}</ThemedText>
            </ThemedTouchable>
        </ThemedFrame>
    );
};

export default ObjectiveDetail;
