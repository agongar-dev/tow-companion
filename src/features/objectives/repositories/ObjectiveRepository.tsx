import i18n from "../../../lib/i18n";
import { createCachedRepository } from "../../../lib/mmkv/genericRepository";
import { Objective } from "../types/Objective";

let cachedObjectives: Objective[] | null = null;

const loadObjectivesFromAssets = (): Objective[] => {
    let data;

    switch (i18n.language) {
        case "en":
            data = require("../data/objectives_en.json");
            break;
        case "cat":
            data = require("../data/objectives_cat.json");
            break;
        case "es":
            data = require("../data/objectives_es.json");
            break;
        default:
            break;
    }
    return data ?? [];
};

const baseRepo = createCachedRepository<Objective>("objectives", loadObjectivesFromAssets);

export const ObjectiveRepository = {
    
    init: async () => {
        if (cachedObjectives) {
            return cachedObjectives;
        }
        const data = baseRepo.getAll();
        cachedObjectives = data;
        return cachedObjectives;
    },

    getAll: (): Objective[] => {
        console.log('get objectives');
        if (!cachedObjectives) {
            console.log('objectives not cached');
            throw new Error("Objectives not initialized");
        }
        return cachedObjectives ?? [];
    },
};