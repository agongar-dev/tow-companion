import { createCachedRepository } from "../../../lib/mmkv/genericRepository";
import { MapLayout } from "../types/MapLayout";
import { EnrichedMapLayout, EnrichedSceneryItem, EnrichedSceneryPosition } from "../types/EnrichedMapLayout";
import { TerrainItemRepository } from "./TerrainItemRepository";
import { TerrainTypeRepository } from "./TerrainTypeRepository";

const loader = (): MapLayout[] => require("../data/map_layout.json");

let enrichedCache: EnrichedMapLayout[] | null = null;

const baseRepo = createCachedRepository<MapLayout>("map_layouts", loader);

function enrichLayouts(): EnrichedMapLayout[] {
    const layouts = baseRepo.getAll();
    const items = TerrainItemRepository.getAll();
    const types = TerrainTypeRepository.getAll();

    return layouts.map(layout => ({
        ...layout,
        sceneryItems: layout.sceneryItems.map(pos => {
            const rawItem = items.find(it => it.id === pos.itemId);
            if (!rawItem) return null;

            const baseType = types.find(tt => tt.id === rawItem.baseType)!;
            const allowedTypes = rawItem.allowedTypes
                .map(at => types.find(tt => tt.id === at)!)
                .filter(Boolean)
                .filter(at => at.id !== baseType?.id);

            const enrichedItem: EnrichedSceneryItem = {
                ...rawItem,
                baseType,
                allowedTypes,
            };

            const enrichedPos: EnrichedSceneryPosition = {
                item: enrichedItem,
                positionOnMap: pos.positionOnMap,
                rotation: pos.rotation,
            };

            return enrichedPos;
        }).filter(Boolean) as EnrichedSceneryPosition[]
    }));
}

export const MapLayoutRepository = {
    init: async () => {
        if (!enrichedCache) {
            enrichedCache = enrichLayouts();
        }
    },

    getAll: (): EnrichedMapLayout[] => {
        if (!enrichedCache) {
            enrichedCache = enrichLayouts();
        }
        return enrichedCache;
    },

    getById: (id: string): EnrichedMapLayout | null => {
        const all = MapLayoutRepository.getAll();
        return all.find(l => l.id === id) ?? null;
    },

    saveAll: (items: MapLayout[]) => {
        baseRepo.saveAll(items);
        enrichedCache = null;
    },

    clearCache: () => {
        enrichedCache = null;
    }
};