import { ArmySnapshot } from "../../players/types/army";
import { MatchEvent } from "./event/matchEvent";
import { ObjectiveOwner, ObjectiveType } from "./objective";


export type GameLength = {
    turns: number;
    notes?: string;
}

export type PlayerInMatch = {
  playerId: string;
  armySnapshot: ArmySnapshot;
  secondaryObjectiveId?: string;
  victoryPoints: number;
};

export type AssignedObjective = {
  id: string;
  objectiveId: string;
  type: ObjectiveType;
  ownerType: ObjectiveOwner;
  ownerId: string; // playerId o teamId
  achieved: boolean;
  turnAchieved?: number;
  isRepeatable?: boolean;
  pointsEarned?: number;
  notes?: string;
};

export type TeamInMatch = {
  id: string; 
  name?: string;
  players: PlayerInMatch[];
};

export type BattleMatch = {
  id: string;
  date: string;
  durationInMinutes?: number;
  notes?: string;
  scenarioId: string;
  teams: TeamInMatch[]; 
  objectives: {
    scenarioObjective: AssignedObjective[];
    secondaryObjectives: AssignedObjective[];
    hiddenObjectives?: AssignedObjective[];
  };
  events: MatchEvent[];
  result?: {
    winningTeamId?: string;
    marginOfVictory?: number;
  };
};