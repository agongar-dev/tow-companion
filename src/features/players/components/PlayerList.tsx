import { FlatList, View } from "react-native";
import { Player } from "../types/player";
import { ArmyList } from "../../armies/types/ArmyList";
import PlayerListItem from "./PlayerListItem";


type PlayerListProps = {
    players: Player[];
    armies: Record<string, ArmyList>;
    onSelect: (army: ArmyList) => void;
};

const PlayerList: React.FC<PlayerListProps> = ({ players, armies, onSelect }) => {
    return (
        <View className="flex-1 w-full">
            <FlatList
                data={players}
                keyExtractor={(player) => player.id}
                renderItem={({ item }) => {
                    const army = item.armyId ? armies[item.armyId] : undefined;
                    return (
                        <PlayerListItem
                            player={item}
                            army={army}
                            onPress={() => army && onSelect(army)}
                        />
                    );
                }}
                scrollEnabled={true}
                contentContainerStyle={{
                    paddingBottom: 8,
                    paddingHorizontal: 4,
                }}
            />
        </View>
    );
};

export default PlayerList;
