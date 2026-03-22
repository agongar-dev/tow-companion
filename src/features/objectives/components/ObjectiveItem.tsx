import { Image, TouchableOpacity, View } from "react-native";
import ThemedText from "../../../components/ThemedText";
import { useTheme } from "../../../lib/theme/context/ThemeContext";
import ThemedImageBackground from "../../../components/ThemedImageBackground";
import { Objective } from "../types/Objective";
import { objectiveImages } from "../utils/objectiveImages";

type ObjectiveListItemProps = {
    objective: Objective;
    onPress: (objective: Objective) => void;
};

const ScenarioItem: React.FC<ObjectiveListItemProps> = ({ objective: objective, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.surface,
                flexBasis: "48%",
                maxWidth: "48%",
                elevation: 5,
            }}
            className="pt-10 justify-center m-2 border overflow-hidden"
            onPress={() => onPress(objective)}
        >
            {objective.image && (
                <ThemedImageBackground
                    source={
                        objective.image?.startsWith("http")
                            ? { uri: objective.image }
                            : objectiveImages[objective.image]
                    }
                    className="w-full h-32"
                    imageResize="contain"
                />)}
            <View className="p-2">
                <ThemedText className="text-center font-bold">{objective.name}</ThemedText>
                <ThemedText className="text-center text-sm">{objective.summary}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default ScenarioItem;
