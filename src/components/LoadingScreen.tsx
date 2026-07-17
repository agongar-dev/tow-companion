import { useEffect, useRef } from "react";
import { View, ImageBackground, Animated, Easing, Dimensions, StyleSheet } from "react-native";
import ThemedText from "../components/ThemedText";
import parchmentBackground from "../assets/images/parchment-full.png";
import runicCircle from "../assets/images/runic_circle2.png";
import { useTranslation } from "react-i18next";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE_RATIO = 0.45;
const VERTICAL_OFFSET_RATIO = 0.1;

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
            style={styles.background}
            resizeMode="cover"
        >
            <Animated.Image
                source={runicCircle}
                style={[
                    styles.circle,
                    {
                        width: width * CIRCLE_SIZE_RATIO,
                        height: width * CIRCLE_SIZE_RATIO,
                        transform: [{ rotate: spin }],
                        marginBottom: height * VERTICAL_OFFSET_RATIO,
                    },
                ]}
                resizeMode="cover"
            />

            <View style={[styles.textContainer, { marginBottom: height * VERTICAL_OFFSET_RATIO }]}>
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {},
    textContainer: {},
});

export default LoadingScreen;
