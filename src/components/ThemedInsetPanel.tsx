import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { ThemeMode, useTheme } from "../lib/theme/context/ThemeContext";
import LinearGradient from "react-native-linear-gradient";

type ThemedInsetPanelProps = {
    children: React.ReactNode;
    title?: string;
    style?: ViewStyle | ViewStyle[];
    className?: string;
};

const ThemedInsetPanel: React.FC<ThemedInsetPanelProps> = ({ children, title, style, className, ...props }) => {
    const { theme, mode } = useTheme();

    const insetColors = mode == ThemeMode.Dark
        ? ["#2a241c", "#1c1812"]
        : ["#d1c2a0ff", "#beab84ff"];

    return (
        <LinearGradient
            colors={insetColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.panel, { borderColor: theme.border }, style]}
            className={className}
            {...props}
        >
            {title && (
                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
            )}

            {children && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    panel: {
        borderWidth: 2,
        padding: 12,
        marginVertical: 8,
        // simulamos un biselado hacia dentro con sombras
        shadowColor: "#000",
        shadowOffset: { width: -10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        textAlign: "center",
    },
    content: {
        gap: 6,
    },
});

export default ThemedInsetPanel;