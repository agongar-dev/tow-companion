import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import officialIcon from "../../../assets/icons/warhammer-official.jpeg";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import ThemedView from "../../../components/ThemedView";
import { SelectableDetail } from "../../../shared/types/SelectableDetail";
import { Objective } from "../../objectives/types/Objective";
import { EnrichedScenario } from "../types/EnrichedScenario";
import { GameLength } from "../types/GameLength";
import { scenarioImages } from "../utils/scenarioImages";

type ScenarioDetailProps = {
    scenario: EnrichedScenario;
    onClose: () => void;
    onLinkClick: (link: SelectableDetail) => void;
    onBack: () => void;
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: 20,
    },
    scenarioImage: {
        width: '100%',
    },
    wrapRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
});

const ScenarioDetail = ({ scenario, onClose, onLinkClick }: ScenarioDetailProps) => {
    const { height } = useWindowDimensions();
    const { t } = useTranslation();

    console.log('scemario', scenario);

    return (
        <ThemedView className="flex-1 p-4 bg-white">
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View key={'title' + scenario.name} className="mb-6 flex-row justify-center">
                    <ThemedText className="text-2xl font-bold">
                        {scenario.name}
                    </ThemedText>
                    {scenario.tags?.includes("official") && (
                        <Image source={officialIcon} resizeMode="contain" className="ml-2 w-12 h-12" />
                    )}
                </View>

                {scenario.description && (
                    <View key={'desc' + scenario.description} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t('common.description')}</ThemedText>
                        <ThemedText className="text-sm italic">{scenario.description}</ThemedText>
                    </View>
                )}

                {(scenario.remoteImage || scenario.localImage) && (
                    <View key={'ri' + scenario.remoteImage} className="flex-row justify-center mb-6 gap-2">
                        <Image
                            source={
                                scenario.remoteImage
                                    ? { uri: scenario.remoteImage }
                                    : scenarioImages[scenario.localImage]
                            }
                            style={[styles.scenarioImage, { height: height * 0.4 }]}
                            resizeMode="contain"
                        />
                    </View>
                )}

                {scenario.setupInstructions?.map((si, i) => (
                    <View key={'si' + i} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t('scenario-detail.setup-instructions')}</ThemedText>
                        <ThemedText className="text-sm mb-4">{si}</ThemedText>
                    </View>
                ))}

                {scenario.deploymentInstructions?.map((di, i) => (
                    <View key={'di' + i} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t('scenario-detail.deployment-instructions')}</ThemedText>
                        <ThemedText className="text-sm mb-4">{di}</ThemedText>
                    </View>
                ))}

                {scenario.specialRules && scenario.specialRules.length > 0 && (
                    <View key={'mo' + scenario.specialRules.length} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">
                            {t('common.special-rules')}
                        </ThemedText>
                    </View>
                )}
                {scenario.specialRules?.map((rule, index) => (
                    <View key={'sr' + index} className="mb-6">
                        <ThemedText className="font-bold mb-1">{rule.title}</ThemedText>
                        {Array.isArray(rule.description) ? (
                            rule.description.map((desc, descIndex) => (
                                <ThemedText key={descIndex} className="text-sm mb-2">
                                    {desc}
                                </ThemedText>
                            ))
                        ) : (
                            <ThemedText className="text-sm mb-2">{rule.description}</ThemedText>
                        )}
                    </View>
                ))}

                {scenario.mainObjectives && scenario.mainObjectives.length > 0 && (
                    <View key={'mo' + scenario.mainObjectives.length} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">
                            {t("scenario-detail.main-objectives")}
                        </ThemedText>
                        {scenario.mainObjectives.map((obj: Objective) => (
                            <ThemedTouchable
                                key={obj.id}
                                onPress={() => onLinkClick?.({
                                    type: "Objective",
                                    detailable: obj,
                                })}
                            >
                                <ThemedText className="mb-1 text-accent">{obj.name}</ThemedText>
                            </ThemedTouchable>
                        ))}
                    </View>
                )}

                {scenario.recommendedObjectives.length > 0 && (
                    <View key={'ro' + scenario.recommendedObjectives.length} className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">
                            {t("scenario-detail.recommended-objectives")}
                        </ThemedText>
                        <View style={styles.wrapRow}>
                            {scenario.recommendedObjectives.map((obj: Objective) => (
                                <ThemedTouchable
                                    key={obj.id}
                                    onPress={() => onLinkClick?.({
                                        type: "Objective",
                                        detailable: obj,
                                    })}
                                >
                                    <ThemedText className="mb-1 text-accent">{obj.name}</ThemedText>
                                </ThemedTouchable>
                            ))}
                        </View>
                    </View>
                )}

                {scenario.gameLength.length > 0 && (
                    <View className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">
                            {t("scenario-detail.game-length")}
                        </ThemedText>
                        <View style={styles.wrapRow}>
                            {scenario.gameLength.map((gl: GameLength) => (
                                <ThemedTouchable
                                    key={gl.id}
                                    onPress={() => onLinkClick?.({
                                        type: "GameLength",
                                        detailable: gl,
                                    })}
                                >
                                    <ThemedText className="mb-1 text-accent">{gl.name}</ThemedText>
                                </ThemedTouchable>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            <ThemedTouchable
                onPress={onClose}
                className="p-3 bg-gray-300 rounded mt-2"
            >
                <ThemedText className="text-center font-bold">{t('common.close')}</ThemedText>
            </ThemedTouchable>
        </ThemedView >
    );
};

export default ScenarioDetail;
