import { useTranslation } from "react-i18next";
import ThemedText from "../../../components/ThemedText";
import LanguageSettings from "../components/options/LanguageSettings";
import ThemeSettings from "../components/options/ThemeSettings";
import ThemedFrame from "../../../components/ThemedFrame";
import { useWindowDimensions, View } from "react-native";
import frameLandscape from "../../../assets/images/frame/frame-landscape.png";
import framePortrait from "../../../assets/images/frame/frame-portrait.png";
import AudioSettings from "../components/options/AudioSettings";
import NavSettings from "../components/options/NavSettings";
import ResetSettings from "../components/options/ResetSettings";

const SettingsScreen = () => {
    const { t } = useTranslation();

    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    const imagebackground = isLandscape ? frameLandscape : framePortrait;

    return (
        <View className="flex-1">
            <ThemedFrame
                imageSource={imagebackground}
            >
                <ThemedText className="text-4xl font-bold mb-8 w-full text-center">
                    {t('settings.title')}
                </ThemedText>
                <View className="flex-1 flex-col">
                    <LanguageSettings />
                    <ThemeSettings />
                    <AudioSettings />
                    <NavSettings />
                    <ResetSettings />
                </View>
            </ThemedFrame>
        </View>
    );
};

export default SettingsScreen;