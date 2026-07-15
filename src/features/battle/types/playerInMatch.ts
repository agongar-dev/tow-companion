import { ArmySnapshot } from "../../players/types/army";

export type PlayerInMatch = {
  playerId: string;
  armySnapshot: ArmySnapshot;
  secondaryObjectiveId?: string;
  victoryPoints: number;
};