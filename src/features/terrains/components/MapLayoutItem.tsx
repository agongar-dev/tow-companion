import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedImageBackground from "../../../components/ThemedImageBackground";
import ThemedText from "../../../components/ThemedText";
import { useTheme } from "../../../lib/theme/context/ThemeContext";
import { EnrichedMapLayout } from "../types/EnrichedMapLayout";
import { mapLayoutImages } from "../utils/mapLayoutImages";

type ObjectiveItemProps = {
    mapLayout: EnrichedMapLayout;
    onPress: (mapLayout: EnrichedMapLayout) => void;
};

const styles = StyleSheet.create({
    card: {
        flexBasis: "48%",
        maxWidth: "48%",
        elevation: 5,
    },
});

const MapLayoutItem: React.FC<ObjectiveItemProps> = ({ mapLayout, onPress }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.surface }]}
            className="pt-10 justify-center m-2 border overflow-hidden"
            onPress={() => onPress(mapLayout)}
        >
            {mapLayout.image && (
                <ThemedImageBackground
                    source={
                        mapLayout.image.startsWith("http")
                            ? { uri: mapLayout.image }
                            : mapLayoutImages[mapLayout.image]
                    }
                    className="w-full h-32"
                    imageResize="contain"
                />)}
            <View className="p-2">
                <ThemedText className="text-center font-bold">{mapLayout.name}</ThemedText>
                <ThemedText className="text-center text-sm">{mapLayout.description}</ThemedText>
            </View>
        </TouchableOpacity>
    );
};

export default MapLayoutItem;
