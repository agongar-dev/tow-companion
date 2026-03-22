import { useTranslation } from "react-i18next";
import { FlatList, SectionList } from "react-native";
import ThemedText from "../../../components/ThemedText";
import { EnrichedScenario } from "../types/EnrichedScenario";
import ScenarioItem from "./ScenarioItem";

type ScenarioListProps = {
    scenarios: EnrichedScenario[];
    onSelect: (scenario: EnrichedScenario) => void;
};

const ScenarioList: React.FC<ScenarioListProps> = ({ scenarios, onSelect }) => {
    const { t } = useTranslation();

    const singleScenarios = scenarios.filter((s) => s.tags?.includes("single"));
    const doubleScenarios = scenarios.filter((s) => s.tags?.includes("double"));

    const sections = [
        ...(singleScenarios.length > 0 ? [{ title: t("scenario-list.single.title"), data: [singleScenarios] }] : []),
        ...(doubleScenarios.length > 0 ? [{ title: t("scenario-list.double.title"), data: [doubleScenarios] }] : []),
    ];

    let listIndex = 0;

    return (
        <SectionList
            sections={sections}
            keyExtractor={(_, index) => 's' + index}
            renderSectionHeader={({ section }) => (
                <ThemedText className="text-lg font-bold mb-2">{section.title}</ThemedText>
            )}
            renderItem={({ item }) => (
                <FlatList
                    data={item}
                    numColumns={2}
                    keyExtractor={(scenario) => scenario.id}
                    renderItem={({ item }) => <ScenarioItem key={listIndex++} scenario={item} onPress={onSelect} />}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        paddingBottom: 8,
                        paddingHorizontal: 4,
                    }}
                />
            )}
            showsVerticalScrollIndicator={true}
            stickySectionHeadersEnabled={false}
            contentContainerStyle={{
                paddingBottom: 16,
                paddingHorizontal: 4,
            }}
        />
    );
};

export default ScenarioList;