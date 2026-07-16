import { Text, TextProps } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";

const ThemedText = ({ style, className, ...props }: TextProps) => {

    const { theme } = useTheme();

    return (
        <Text
            {...props}
            style={[
                {
                    color: theme.text
                }, style
            ]}
            className={className}
        />
    );
};

export default ThemedText;