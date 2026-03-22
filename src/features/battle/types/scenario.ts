import { GameLength } from "./match";
import { ScenarioVictoryCondition } from "./objective";


export type Scenario = {
    id: string;
    name: string;
    description?: string;
    setupInstructions?: string;
    deploymentInstructions?: string;
    gameLength: GameLength;
    specialRules?: string[];
    recommendedSecondaryObjective?: string[];
    mapLayoutId: string;
    terrainPresetId?: string;
    victoryConditions: ScenarioVictoryCondition[];
    image?: string;
    isOfficial: boolean;
}

export type TerrainPreset = {
  id: string;
  name: string;
  description?: string;
  image?: string;
};

