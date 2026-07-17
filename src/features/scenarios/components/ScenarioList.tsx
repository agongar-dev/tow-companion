import { useTranslation } from "react-i18next";
import { FlatList, SectionList, StyleSheet } from "react-native";
import ThemedText from "../../../components/ThemedText";
import { EnrichedScenario } from "../types/EnrichedScenario";
import ScenarioItem from "./ScenarioItem";

type ScenarioListProps = {
    scenarios: EnrichedScenario[];
    onSelect: (scenario: EnrichedScenario) => void;
};

const styles = StyleSheet.create({
    sectionListContent: {
        paddingBottom: 16,
        paddingHorizontal: 4,
    },
    gridContent: {
        paddingBottom: 8,
        paddingHorizontal: 4,
    },
});

const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios, onSelect }) => {
    const { t } = useTranslation();

    const singleScenarios = scenarios.filter((scenario) => scenario.tags?.includes("single"));
    const doubleScenarios = scenarios.filter((scenario) => scenario.tags?.includes("double"));

    const sections = [
        ...(singleScenarios.length > 0 ? [{ title: t("scenario-list.single.title"), data: [singleScenarios] }] : []),
        ...(doubleScenarios.length > 0 ? [{ title: t("scenario-list.double.title"), data: [doubleScenarios] }] : []),
    ];

    return (
        <SectionList
            sections={sections}
            keyExtractor={(_, index) => 's' + index}
            renderSectionHeader={({ section }) => (
                <ThemedText className="text-lg font-bold mb-2">{section.title}</ThemedText>
            )}
            renderItem={({ item: sectionScenarios }) => (
                <FlatList
                    data={sectionScenarios}
                    numColumns={2}
                    keyExtractor={(scenario) => scenario.id}
                    renderItem={({ item: scenarioItem }) => <ScenarioItem scenario={scenarioItem} onPress={onSelect} />}
                    scrollEnabled={false}
                    contentContainerStyle={styles.gridContent}
                />
            )}
            showsVerticalScrollIndicator={true}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={styles.sectionListContent}
        />
    );
};

export default ScenarioList;
