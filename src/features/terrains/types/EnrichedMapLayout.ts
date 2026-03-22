import { ObjectDimensions } from "./ObjectDimensions";
import { SceneryType } from "./SceneryType";

export type EnrichedMapLayout = {
    id: string;
    name: string;
    description?: string;
    sceneryItems: EnrichedSceneryPosition[];
    image?: string;
    tags?: string[];
}

export type EnrichedSceneryPosition = {
    item: EnrichedSceneryItem;
    positionOnMap: {
        L: number;
        S: number;
    },
    rotation?: number;
}

export type EnrichedSceneryItem = {
    id: string;
    name: string;
    description?: string;
    baseType: SceneryType;
    allowedTypes: SceneryType[];
    size?: ObjectDimensions;
    image?: string;
    tags?: string[];
}



