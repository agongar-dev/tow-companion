import { FlatList, View } from "react-native";

import { EnrichedMapLayout } from "../types/EnrichedMapLayout";
import MapLayoutItem from "./MapLayoutItem";

type MapLayoutListProps = {
    mapLayouts: EnrichedMapLayout[];
    onSelect: (mapLayout: EnrichedMapLayout) => void;
};

const MapLayoutList: React.FC<MapLayoutListProps> = ({ mapLayouts, onSelect }) => {

    return (
        <View className="flex-1 w-full">
            <FlatList
                data={mapLayouts}
                numColumns={2}
                keyExtractor={(mapLayout) => mapLayout.id}
                renderItem={({ item }) => <MapLayoutItem mapLayout={item} onPress={onSelect} />}
                scrollEnabled={true}
                contentContainerStyle={{
                    paddingBottom: 8,
                    paddingHorizontal: 4
                }}
            />
        </View>
    );
};

export default MapLayoutList;
