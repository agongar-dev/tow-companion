import { TouchableOpacity, View, Image } from "react-native";
import ThemedText from "../../../components/ThemedText";
import { Player } from "../types/player";
import { ArmyList } from "../../armies/types/ArmyList";
import { useTheme } from "../../../lib/theme/context/ThemeContext";

type PlayerListItemProps = {
    player: Player;
    army?: ArmyList;
    onPress: () => void;
};

const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, army, onPress }) => {

    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.surface,
                elevation: 3,
            }}
            className="m-2 p-4 border flex-row items-center"
            onPress={onPress}
            disabled={!army}
        >
            {/* Faction image */}
            {army?.faction.image && (
                <Image
                    source={{ uri: army.faction.image }}
                    style={{ width: 40, height: 40, marginRight: 8 }}
                    resizeMode="contain"
                />
            )}

            {/* Player image */}
            <View className="flex-row items-center justify-center">
                {player.image && (
                    <Image
                        source={{ uri: player.image }}
                        style={{ width: 40, height: 40, marginRight: 8 }}
                        resizeMode="cover"
                    />
                )}

                <ThemedText className="font-bold text-lg">{player.name}</ThemedText>
                {army ? (
                    <>
                        <ThemedText className="text-sm">{army.name}</ThemedText>
                        <ThemedText className="text-sm italic">
                            {army.faction.name} • {army.points} pts
                        </ThemedText>
                    </>
                ) : (
                    <ThemedText className="text-sm italic">
                        No army assigned
                    </ThemedText>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default PlayerListItem;
