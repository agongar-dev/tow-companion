import { useTranslation } from "react-i18next"
import ThemedFrame from "../../../components/ThemedFrame";
import playersBg from "../../../assets/images/players.png";
import ThemedText from "../../../components/ThemedText";
import { useWindowDimensions, View } from "react-native";

const ArmiesScreen = () => {
    const { t } = useTranslation();

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const imaageResize = isLandscape ? "stretch" : "cover";

    return (
        <View className="flex-1">
            <ThemedFrame
                imageSource={playersBg}
                imageResize={imaageResize}
            >
                <ThemedText className="text-4xl font-bold mb-2 w-full text-center">
                    {t('armies-list.title')}
                </ThemedText>
                <View className="flex-1 flex-col">
                    <ThemedText className="text-md mb-8 w-full text-center">
                        {t('armies-list.description')}
                    </ThemedText>
                </View>
            </ThemedFrame>
        </View>
    )
}

export default ArmiesScreen;