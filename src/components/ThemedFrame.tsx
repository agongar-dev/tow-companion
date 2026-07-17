import { ImageBackground, ImageResizeMode, StyleSheet, View } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

type ThemedFrameProps = {
    imageSource: any;
    children?: React.ReactNode;
    imageResize?: ImageResizeMode;
};

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    content: {
        flex: 1,
        paddingTop: "3%",
        paddingStart: "6%",
        paddingEnd: "6%",
        paddingBottom: "4%",
    },
    overlay: {
        position: 'absolute',
        top: "1.5%",
        left: "5%",
        right: "4%",
        bottom: "3.5%",
        opacity: 0.6,
    },
    body: {
        flex: 1,
    },
});

const ThemedFrame: React.FC<ThemedFrameProps> = ({
    imageSource,
    children,
    imageResize = "stretch",
}) => {
    const { theme } = useTheme();

    return (
        <ImageBackground
            source={imageSource}
            resizeMode={imageResize}
            style={styles.frame}
        >
            <View style={styles.content}>
                <View style={[styles.overlay, { backgroundColor: theme.surface }]} />
                <View style={styles.body}>
                    {children}
                </View>
            </View>
        </ImageBackground>
    );
};

export default ThemedFrame;
