import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

const ThemedTouchable = ({ style, className, ...props }: TouchableOpacityProps) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            {...props}
            style={[
                {
                    borderColor: theme.border,
                    borderWidth: 2,
                    backgroundColor: theme.accent,
                    margin: 1,
                    padding: 12,
                }, style,
            ]}
            className={className}
        />
    );
};

export default ThemedTouchable;