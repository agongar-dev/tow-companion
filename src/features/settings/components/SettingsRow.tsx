import { View } from "react-native";
import ThemedText from "../../../components/ThemedText";

type SettingsRowProps = {
    label: string;
    children: React.ReactNode;
};

const SettingsRow = ({ label, children }: SettingsRowProps) => {
    return (
        <View className="w-full flex-row items-center justify-around mb-4 px-4">
            <ThemedText className="text-lg">
                {label}
            </ThemedText>
            <View className="items-start flex-row">
                {children}
            </View>
        </View>
    );
};

export default SettingsRow;