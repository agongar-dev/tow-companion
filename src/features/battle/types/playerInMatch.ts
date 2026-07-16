import { ArmySnapshot } from "./ArmySnapshot";

export type PlayerInMatch = {
  playerId: string;
  armySnapshot: ArmySnapshot;
  secondaryObjectiveId?: string;
  victoryPoints: number;
};
