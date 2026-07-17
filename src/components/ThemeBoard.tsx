import { View, Text, ViewProps, StyleSheet } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";
import { LinearGradient } from "react-native-linear-gradient";
import { NailVariant } from "./ThemedImageBackground";
import { ThemeMode } from "../lib/theme/types";

type ThemedBoardProps = ViewProps & {
    children: React.ReactNode;
    title?: string;
    nails?: NailVariant;
};

const ThemedBoard: React.FC<ThemedBoardProps> = ({ children, title, style, ...props }) => {
    const { theme, mode } = useTheme();

    const woodColors = mode === ThemeMode.Dark
        ? ["#2d1b0f", "#3a2415", "#4a2f1b"]
        : ["#e0c097", "#d1a66d", "#b88946"];

    return (
        <View
            {...props}
            style={[styles.wrapper, style]}>
            <LinearGradient
                colors={woodColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.board, { borderColor: theme.border }]}
            >
                {title && (
                    <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                )}

                {children}

                <View style={[styles.nail, styles.nailTopLeft]} />
                <View style={[styles.nail, styles.nailTopRight]} />
                <View style={[styles.nail, styles.nailBottomLeft]} />
                <View style={[styles.nail, styles.nailBottomRight]} />
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
    },
    board: {
        height: '100%',
        padding: 12,
        borderWidth: 2,
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        position: "relative",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    nail: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2d1b0f",
        position: "absolute",
    },
    nailTopLeft: { top: 6, left: 6 },
    nailTopRight: { top: 6, right: 6 },
    nailBottomLeft: { bottom: 6, left: 6 },
    nailBottomRight: { bottom: 6, right: 6 },
});

export default ThemedBoard;
