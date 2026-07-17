import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import { ThemeMode, useTheme } from "../lib/theme/context/ThemeContext";
import LinearGradient from "react-native-linear-gradient";

type ThemeParchmentProps = {
    children: React.ReactNode;
    title?: string;
    style?: StyleProp<ViewStyle>;
    className?: string;
};

const ThemedParchment: React.FC<ThemeParchmentProps> = ({ children, title, style, className, ...props }) => {
    const { theme, mode } = useTheme();

    const parchmentColors = mode === ThemeMode.Dark
        ? ["#3a2e1f", "#4a3a25", "#2c241a"]
        : ["#f3e8d8", "#e9dbc2", "#d6c5a8"];

    return (
        <LinearGradient
            colors={parchmentColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.parchment, { borderColor: theme.border }, style]}
            className={className}
            {...props}
        >
            {title && (
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            )}

            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    parchment: {
        borderWidth: 1,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
        position: "relative",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 12,
    },
    content: {
        gap: 8,
    },
});

export default ThemedParchment;
