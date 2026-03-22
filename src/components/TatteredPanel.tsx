import { ImageBackground, View, Text, StyleSheet } from "react-native";
import parchmentBg from "../../assets/images/parchment-full.png";

type TatteredPanelProps = {
    children: React.ReactNode;
    title?: string;
};

const TatteredPanel: React.FC<TatteredPanelProps> = ({ children, title }) => {
    return (
        <ImageBackground
            source={parchmentBg}
            resizeMode="stretch"
            style={styles.container}
        >
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.content}>{children}</View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 8,
    },
    content: {
        gap: 8,
    },
});

export default TatteredPanel;
