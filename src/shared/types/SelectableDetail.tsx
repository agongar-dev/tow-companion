import { Objective } from "../../features/objectives/types/Objective";
import { Scenario } from "../../features/scenarios/types/Scenario";
import { EnrichedMapLayout } from "../../features/terrains/types/EnrichedMapLayout";
import { SceneryType } from "../../features/terrains/types/SceneryType";

export type SelectableDetail = {
    type: "Objective" | "GameLength" | "MapLayout" | "TerrainType";
    detailable: Objective | Scenario | EnrichedMapLayout | SceneryType;
};