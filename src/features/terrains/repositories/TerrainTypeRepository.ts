import { createCachedRepository } from "../../../lib/mmkv/genericRepository";
import { SceneryType } from "../types/SceneryType";
import i18n from "../../../lib/i18n";

const loader = (): SceneryType[] => {
    switch (i18n.language) {
        case "en":
            return require("../data/scenery_types_en.json");
        case "es":
            return require("../data/scenery_types_es.json");
        case "cat":
            return require("../data/scenery_types_cat.json");
        default:
            return [];
    }
};

let cache: SceneryType[] | null = null;

const baseRepo = createCachedRepository<SceneryType>("terrain_types", loader);

export const TerrainTypeRepository = {
    init: async () => {
        if (!cache) {
            cache = baseRepo.getAll();
        }
    },

    getAll: (): SceneryType[] => {
        if (!cache) {
            cache = baseRepo.getAll();
        }
        return cache;
    },

    getById: (id: string): SceneryType | null => {
        const all = TerrainTypeRepository.getAll();
        return all.find(it => it.id === id) ?? null;
    },

    saveAll: (items: SceneryType[]) => {
        baseRepo.saveAll(items);
        cache = null;
    },

    clearCache: () => {
        cache = null;
    }
};
