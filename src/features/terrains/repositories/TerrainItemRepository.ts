import { createCachedRepository } from "../../../lib/mmkv/genericRepository";
import { SceneryItem } from "../types/SceneryItem";
import i18n from "../../../lib/i18n";


const loader = (): SceneryItem[] => {
    switch (i18n.language) {
        case "en":
            return require("../data/terrain_items_en.json");
        case "es":
            return require("../data/terrain_items_es.json");
        case "cat":
            return require("../data/terrain_items_cat.json");
        default:
            return [];
    }
};

let cache: SceneryItem[] | null = null;

const baseRepo = createCachedRepository<SceneryItem>("terrain_items", loader);

export const TerrainItemRepository = {
    init: async () => {
        if (!cache) {
            cache = baseRepo.getAll();
        }
    },

    getAll: (): SceneryItem[] => {
        if (!cache) {
            cache = baseRepo.getAll();
        }
        return cache;
    },

    getById: (id: string): SceneryItem | null => {
        const all = TerrainItemRepository.getAll();
        return all.find(it => it.id === id) ?? null;
    },

    saveAll: (items: SceneryItem[]) => {
        baseRepo.saveAll(items);
        cache = null;
    },

    clearCache: () => {
        cache = null;
    }
};