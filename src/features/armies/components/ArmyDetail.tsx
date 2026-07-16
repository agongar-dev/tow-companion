import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import imageFrame from "../../../assets/images/frame/frame-portrait.png";

import { ArmyList } from "../types/ArmyList";
import { getDifferentiatedLabels } from "../helpers/unitLabel"; // helper con i18n

type ArmyListDetailProps = {
    army: ArmyList;
    onBack?: () => void;
    onClose?: () => void;
};

const ArmyListDetail: React.FC<ArmyListDetailProps> = ({ army, onBack, onClose }) => {
    const { t } = useTranslation();

    const coreLabels = getDifferentiatedLabels(army.core ?? []);
    const specialLabels = getDifferentiatedLabels(army.special ?? []);
    const rareLabels = getDifferentiatedLabels(army.rare ?? []);
    const charLabels = getDifferentiatedLabels(army.characters ?? []);

    return (
        <ThemedFrame imageSource={imageFrame} imageResize="stretch">
            <ScrollView className="p-4">

                {/* Back button */}
                {onBack && (
                    <ThemedTouchable onPress={onBack}>
                        <ThemedText className="text-accent mb-4 font-bold">{"← " + t("common.back")}</ThemedText>
                    </ThemedTouchable>
                )}

                {/* Header */}
                <ThemedText className="text-2xl font-bold mb-2 text-center">{army.name}</ThemedText>
                <ThemedText className="text-lg font-semibold mb-2 text-center">
                    {army.faction.name} – {army.points} {t("common.points")}
                </ThemedText>

                {army.description && (
                    <ThemedText className="text-sm mb-4 text-center">{army.description}</ThemedText>
                )}

                {/* Sections */}
                {army.characters && army.characters?.length > 0 && (
                    <View className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t("army.characters")}</ThemedText>
                        {army.characters.map((u) => (
                            <ThemedText key={u.id} className="text-sm mb-1">
                                {charLabels[u.id]} – {u.points} {t("common.points")}
                            </ThemedText>
                        ))}
                    </View>
                )}

                {army.core && army.core?.length > 0 && (
                    <View className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t("army.core")}</ThemedText>
                        {army.core.map((u) => (
                            <ThemedText key={u.id} className="text-sm mb-1">
                                {coreLabels[u.id]} – {u.points} {t("common.points")}
                            </ThemedText>
                        ))}
                    </View>
                )}

                {army.special && army.special?.length > 0 && (
                    <View className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t("army.special")}</ThemedText>
                        {army.special.map((u) => (
                            <ThemedText key={u.id} className="text-sm mb-1">
                                {specialLabels[u.id]} – {u.points} {t("common.points")}
                            </ThemedText>
                        ))}
                    </View>
                )}

                {army.rare && army.rare?.length > 0 && (
                    <View className="mb-6">
                        <ThemedText className="text-xl font-bold mb-2">{t("army.rare")}</ThemedText>
                        {army.rare.map((u) => (
                            <ThemedText key={u.id} className="text-sm mb-1">
                                {rareLabels[u.id]} – {u.points} {t("common.points")}
                            </ThemedText>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Close button */}
            {onClose && (
                <ThemedTouchable onPress={onClose} className="p-3 bg-gray-300 rounded mt-2">
                    <ThemedText className="text-center font-bold">{t("common.close")}</ThemedText>
                </ThemedTouchable>
            )}
        </ThemedFrame>
    );
};

export default ArmyListDetail;
