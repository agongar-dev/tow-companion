import { Objective } from "../../objectives/types/Objective";
import { GameLength } from "./GameLength";
import { Scenario } from "./Scenario";

export type EnrichedScenario = Scenario & {
    mainObjectives: Objective[];
    recommendedObjectives: Objective[];
    gameLength: GameLength[];
};