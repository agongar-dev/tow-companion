import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import imageFrame from "../../../assets/images/frame/frame-portrait.png";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";

import { Player } from "../types/player";

type PlayerDetailProps = {
    player: Player;
    onBack?: () => void;
    onClose?: () => void;
};

const PlayerDetail: React.FC<PlayerDetailProps> = ({ player, onBack, onClose }) => {
    const { t } = useTranslation();

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
                <ThemedText className="text-2xl font-bold mb-2 text-center">{player.name}</ThemedText>
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

export default PlayerDetail;
