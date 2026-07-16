import { ImageBackground, ImageResizeMode, StyleSheet, View } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

type ThemedFrameProps = {
    imageSource: any;
    children?: React.ReactNode;
    imageResize?: ImageResizeMode;
};

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
                <View style={{
                position: 'absolute',
                top: "1.5%",
                left: "5%",
                right: "4%",
                bottom: "3.5%",
                backgroundColor: theme.surface,
                opacity: 0.6
            }} />
                <View style={{ flex: 1}}>
                    {children}
                </View>
            </View>
        </ImageBackground>
    );
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
});

export default ThemedFrame;
