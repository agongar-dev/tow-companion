import { SceneryPosition } from "./SceneryPosition";

export type MapLayout = {
    id: string;
    name: string;
    description?: string;
    sceneryItems: SceneryPosition[];
    image?: string;
    tags?: string[];
}