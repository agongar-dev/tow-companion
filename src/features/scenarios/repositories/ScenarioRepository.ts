import i18n from "../../../lib/i18n";
import { createCachedRepository } from "../../../lib/mmkv/genericRepository";
import { ObjectiveRepository } from "../../objectives/repositories/ObjectiveRepository";
import { GameLengthRepository } from "../repositories/GameLengthRepository";
import { EnrichedScenario } from "../types/EnrichedScenario";
import { Scenario } from "../types/Scenario";

let cachedScenarios: EnrichedScenario[] | null = null;

const loadScenariosFromAssets = (): Scenario[] => {
    let data: any;
    switch (i18n.language) {
        case "en":
            data = require("../data/scenarios_en.json");
            break;
        case "cat":
            data = require("../data/scenarios_cat.json");
            break;
        case "es":
            data = require("../data/scenarios_es.json");
            break;
    }

    return data?.map((s: any) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        setupInstructions: s.setup_instructions,
        deploymentInstructions: s.deployment_instructions,
        gameLength: s.game_length,
        localImage: s.localImage,
        remoteImage: s.remoteImage,
        specialRules: s.special_rules,
        mainObjectives: s.main_objectives,
        recommendedObjectives: s.recommended_objectives,
        scenarioDimensions: s.scenario_dimensions,
        terrainPreset: s.terrain_preset,
        tags: s.tags,
        summary: s.summary,
    }))
}

const baseRepo = createCachedRepository<Scenario>("scenarios", loadScenariosFromAssets);

export const ScenarioRepository = {

    init: async () => {
        console.log('init scenarios');
        if (cachedScenarios) {
            return cachedScenarios;
        }

        const scenarios = baseRepo.getAll();
        console.log('scenarios loaded', scenarios);
        const objectives = await ObjectiveRepository.getAll();
        console.log('objectives loaded', objectives);
        const gameLengths = await GameLengthRepository.getAll();
        console.log('game lengths loaded', gameLengths);

        const objMap = Object.fromEntries(objectives.map(o => [o.id, o]));
        const glMap = Object.fromEntries(gameLengths.map(g => [g.id, g]));

        cachedScenarios = scenarios.map(s => ({
            ...s,
            mainObjectives: s.mainObjectives?.map(id => objMap[id]).filter(Boolean) ?? [],
            recommendedObjectives: s.recommendedObjectives?.map(id => objMap[id]).filter(Boolean) ?? [],
            gameLength: s.gameLength?.map(id => glMap[id]).filter(Boolean) ?? [],
        }) as EnrichedScenario
        );

        console.log('init scenarios done');
        return cachedScenarios;
    },

    getAll: (): EnrichedScenario[] => {
        if (!cachedScenarios) {
            throw new Error("Scenarios not initialized");
        }
        return cachedScenarios ?? [];
    },
};
