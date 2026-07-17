import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../lib/theme/context/ThemeContext";
import ThemedTouchable from "./ThemedTouchable";
import ThemedText from "./ThemedText";

type FilterItemProps = {
    filters: (string | undefined)[];
    activeFilters: string[];
    toggleFilter: (filter: string) => void;
};

const styles = StyleSheet.create({
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 2,
    },
});

const FilterItem: React.FC<FilterItemProps> = ({ filters, activeFilters, toggleFilter }) => {
    const { t } = useTranslation();
    const { theme } = useTheme();

    return (
        <View className="flex-row justify-center flex-wrap gap-2 mb-4">
            {filters.map(tag => {
                if (!tag) return null;

                const isActive = activeFilters.includes(tag);

                return (
                    <ThemedTouchable
                        key={tag}
                        onPress={() => toggleFilter(tag)}
                        style={[
                            styles.filterButton,
                            {
                                backgroundColor: isActive ? theme.accent : theme.surface,
                                borderColor: isActive ? theme.text : theme.border,
                            },
                        ]}
                    >
                        <ThemedText style={{ color: isActive ? theme.surface : theme.text }}>
                            {t(`filters.${tag}`, tag)}
                        </ThemedText>
                    </ThemedTouchable>
                );
            })}
        </View>
    );
};

export default FilterItem;
