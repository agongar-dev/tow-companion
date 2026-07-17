import { FlatList, StyleSheet, View } from "react-native";
import { Objective } from "../types/Objective";
import ObjectiveItem from "./ObjectiveItem";

type ObjectiveListProps = {
    objectives: Objective[];
    onSelect: (objective: Objective) => void;
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 8,
        paddingHorizontal: 4,
    },
});

const ObjectiveList: React.FC<ObjectiveListProps> = ({ objectives, onSelect }) => {
    return (
        <View className="flex-1 w-full">
            <FlatList
                data={objectives}
                numColumns={2}
                keyExtractor={(objective) => objective.id}
                renderItem={({ item }) => <ObjectiveItem objective={item} onPress={onSelect} />}
                scrollEnabled={true}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

export default ObjectiveList;
