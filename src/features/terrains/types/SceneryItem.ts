import { ObjectDimensions } from "./ObjectDimensions";

export type SceneryItem = {
    id: string;
    name: string;
    description?: string;
    baseType: string;
    allowedTypes: string[];
    size?: ObjectDimensions;
    image?: string;
    tags?: string[];
}