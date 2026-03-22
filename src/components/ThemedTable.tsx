import { ScrollView, View, StyleSheet } from "react-native";
import { useTheme } from "../lib/theme/context/ThemeContext";
import React from "react";

type ThemedTableProps = {
    children: React.ReactNode;
    separator?: React.ReactNode;
};

const ThemedTable: React.FC<ThemedTableProps> = ({ children, separator }) => {
    const { theme } = useTheme();

    const rows = React.Children.toArray(children);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: "transparent" }]}
            contentContainerStyle={styles.content}
        >
            {rows.map((row, index) => (
                <View key={index}>
                    {row}
                    {index < rows.length - 1 && (
                        separator ? (
                            separator
                        ) : (
                            <View style={[styles.defaultSeparator, { borderColor: theme.border }]} />
                        )
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0,
        margin: 8,
        overflow: "hidden",
    },
    content: {
        paddingVertical: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },
    defaultSeparator: {
        borderBottomWidth: 1,
        marginHorizontal: 12,
        marginVertical: 6,
    },
});

export default ThemedTable;
