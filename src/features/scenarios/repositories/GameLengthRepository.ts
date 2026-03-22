import i18n from "../../../lib/i18n";
import { GameLength } from "../types/GameLength";
import { createCachedRepository } from "../../../lib/mmkv/genericRepository";

let cachedGameLengths: GameLength[] | null = null;

const loadGameLengthFromAssets = (): GameLength[] => {
    let data: any;
    switch (i18n.language) {
        case "en":
            data = require("../data/game_length_en.json");
            break;
        case "cat":
            data = require("../data/game_length_cat.json");
            break;
        case "es":
            data = require("../data/game_length_es.json");
            break;
    }

    return data ?? [];
};

const baseRepo = createCachedRepository<GameLength>("gameLength", loadGameLengthFromAssets);

export const GameLengthRepository = {
    
    init: async () => {
        if (cachedGameLengths) {
            return cachedGameLengths;
        }
        const data = baseRepo.getAll();
        cachedGameLengths = data;
        return cachedGameLengths;
    },

    getAll: (): GameLength[] => {
        if (!cachedGameLengths) {
            throw new Error("GameLengths not initialized");
        }
        return cachedGameLengths ?? [];
    },
};