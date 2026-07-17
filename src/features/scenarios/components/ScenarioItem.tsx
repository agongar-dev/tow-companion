import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedImageBackground from "../../../components/ThemedImageBackground";
import ThemedText from "../../../components/ThemedText";
import { useTheme } from "../../../lib/theme/context/ThemeContext";
import { EnrichedScenario } from "../types/EnrichedScenario";
import { scenarioImages } from "../utils/scenarioImages";

type ScenarioItemProps = {
    scenario: EnrichedScenario;
    onPress: (scenario: EnrichedScenario) => void;
};

const styles = StyleSheet.create({
    card: {
        flexBasis: "48%",
        maxWidth: "48%",
    },
});

const ScenarioItem: React.FC<ScenarioItemProps> = ({ scenario, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.surface }]}
            className="pt-10 justify-center m-2 border overflow-hidden bg-surface"
            onPress={() => onPress(scenario)}
        >
            <ThemedImageBackground
                source={
                    scenario.localImage
                        ? scenarioImages[scenario.localImage]
                        : { uri: scenario.remoteImage }
                }
                className="w-full h-32"
                imageResize="contain"
            />
            <View className="p-2">
                <ThemedText className="text-center font-bold">{scenario.name}</ThemedText>
                <ThemedText className="text-center text-sm">{scenario.summary}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default ScenarioItem;
