import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import ThemedImageBackground from "../../components/ThemedImageBackground";
import divider from "../../assets/images/divider.png";

type DrawerItemProps = {
    label: string;
    onPress: () => void;
    className?: string;
    showDivider?: boolean;
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 70,
    },
});

const DrawerItem = ({ label, onPress, className, showDivider = true }: DrawerItemProps) => {
    const { height, width } = useWindowDimensions();
    const isLandscape = width > height;

    const pressHeight = isLandscape ? height / 10 : height / 15;

    return (
        <View className="w-full relative" style={styles.container}>
            {showDivider && (
                <ThemedImageBackground source={divider} imageResize="contain" className="absolute -top-3 left-0 h-6 w-full" />
            )}
            <Pressable onPress={onPress} style={{ height: pressHeight }} className={`w-full justify-center ${className ?? ""}`}>
                <Text className="text-center w-full text-md">{label}</Text>
            </Pressable>
        </View>
    );
};

export default DrawerItem;
