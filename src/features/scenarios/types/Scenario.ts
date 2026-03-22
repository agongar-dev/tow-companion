import { DescriptiveInfo } from "../../../shared/types/DescriptiveInfo";
import { ObjectDimensions } from "../../terrains/types/ObjectDimensions";
import { TerrainPreset } from "./TerrainPresset";

export type Scenario = {
    id: string;
    name: string;
    description?: string;
    setupInstructions?: string[];
    deploymentInstructions?: string[];
    gameLength: string[];
    localImage: string;
    remoteImage?: string;
    specialRules?: DescriptiveInfo[];
    mainObjectives?: string[];
    recommendedObjectives?: string[];
    scenarioDimensions?: ObjectDimensions;
    terrainPreset?: TerrainPreset
    tags: string[];
    summary: string;
}



