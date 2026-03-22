import { useEffect, useRef } from "react";
import { View, ImageBackground, Animated, Easing, Dimensions } from "react-native";
import ThemedText from "../components/ThemedText";
import parchmentBackground from "../assets/images/parchment-full.png";
import runicCircle from "../assets/images/runic_circle2.png"; // un círculo rúnico/transparente
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");

const LoadingScreen: React.FC = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    const { t } = useTranslation();

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <ImageBackground
            source={parchmentBackground}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            resizeMode="cover"
        >
            <Animated.Image
                source={runicCircle}
                style={{
                    width: width * 0.45,
                    height: width * 0.45,
                    transform: [{ rotate: spin }],
                    marginBottom: height * 0.1,
                }}
                resizeMode="cover"
            />

            {/* Texto principal */}
            <View style={{ marginBottom: height * 0.1 }}>
                <ThemedText className="text-3xl font-bold text-center mb-2">
                    Warhammer: TOW Manager
                </ThemedText>
                <ThemedText className="text-lg italic text-center text-gray-800">
                    “{t("common.loading.subtitle")}”
                </ThemedText>
            </View>
        </ImageBackground>
    );
};

export default LoadingScreen;
