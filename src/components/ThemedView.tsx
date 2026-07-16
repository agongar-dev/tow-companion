import { View, ViewProps } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

const ThemedView = ({ style, ...props }: ViewProps) => {

    const { theme } = useTheme();
    return (
        <View
            {...props}
            style={[
                {
                    backgroundColor: theme.surface,
                    borderColor: theme.border
                }, style
            ]}
        />
    );
}

export default ThemedView;