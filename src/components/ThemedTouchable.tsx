import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

const styles = StyleSheet.create({
    touchable: {
        borderWidth: 2,
        margin: 1,
        padding: 12,
    },
});

const ThemedTouchable = ({ style, className, ...props }: TouchableOpacityProps) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            {...props}
            style={[
                styles.touchable,
                {
                    borderColor: theme.border,
                    backgroundColor: theme.accent,
                },
                style,
            ]}
            className={className}
        />
    );
};

export default ThemedTouchable;
