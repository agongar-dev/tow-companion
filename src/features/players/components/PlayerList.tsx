import { FlatList, StyleSheet, View } from "react-native";
import { Player } from "../types/player";
import { ArmyList } from "../../armies/types/ArmyList";
import PlayerListItem from "./PlayerListItem";

type PlayerListProps = {
    players: Player[];
    armies: Record<string, ArmyList>;
    onSelect: (army: ArmyList) => void;
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 8,
        paddingHorizontal: 4,
    },
});

const PlayerList: React.FC<PlayerListProps> = ({ players, armies, onSelect }) => {
    return (
        <View className="flex-1 w-full">
            <FlatList
                data={players}
                keyExtractor={(player) => player.id}
                renderItem={({ item }) => {
                    const primaryArmyId = item.armyIds?.[0];
                    const army = primaryArmyId ? armies[primaryArmyId] : undefined;

                    return (
                        <PlayerListItem
                            player={item}
                            army={army}
                            onPress={() => army && onSelect(army)}
                        />
                    );
                }}
                scrollEnabled={true}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

export default PlayerList;
