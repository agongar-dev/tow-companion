import { ScrollView, View } from "react-native";
import imageFrame from "../../../assets/images/frame/frame-portrait.png";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";
import ThemedTouchable from "../../../components/ThemedTouchable";
import { GameLength } from "../types/GameLength";
import { useTranslation } from "react-i18next";

type GameLengthDetailProps = {
    gameLength: GameLength;
    onBack: () => void;
};

const GameLengthDetail: React.FC<GameLengthDetailProps> = ({ gameLength, onBack }) => {

    const { t } = useTranslation();

    return (
        <ThemedFrame imageSource={imageFrame} imageResize="cover">
            <ScrollView className="p-4">
                <ThemedTouchable onPress={onBack}>
                    <ThemedText className="text-accent mb-4 font-bold">← {t('scenario-detail.back')}</ThemedText>
                </ThemedTouchable>
                <ThemedText className="text-2xl text-center font-bold mb-2">{gameLength.name}</ThemedText>
                <View className="space-y-2">
                    {gameLength.notes?.map((note, idx) => (
                        <ThemedText key={idx} className="text-base mb-4">{note}</ThemedText>
                    ))}
                </View>
            </ScrollView>
        </ThemedFrame>
    );
};

export default GameLengthDetail;
