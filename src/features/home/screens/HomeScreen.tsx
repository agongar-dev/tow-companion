import { useTranslation } from "react-i18next";

import { useWindowDimensions, View } from "react-native";
import frameLandscape from "../../../assets/images/frame/frame-landscape.png";
import framePortrait from "../../../assets/images/frame/frame-portrait.png";
import ThemedFrame from "../../../components/ThemedFrame";
import ThemedText from "../../../components/ThemedText";

const HomeScreen = () => {
  const { t } = useTranslation();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const imagebackground = isLandscape ? frameLandscape: framePortrait;

  return (
    <View className="flex-1">
      <ThemedFrame
        imageSource={imagebackground}
      >
        <ThemedText className="font-bold text-2xl text-center">
          {t("home.title")}
        </ThemedText>
      </ThemedFrame>
    </View>
  );
};

export default HomeScreen;
