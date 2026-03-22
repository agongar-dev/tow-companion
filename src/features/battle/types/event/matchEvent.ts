import { UnitStatus } from "../../../players/types/unit";
import { ObjectiveStatus } from "../objective";

export enum MatchResult {
  VICTORY,
  DEFEAT,
  DRAW,
  PENDING,
  CANCELLED
}

type BaseEvent = {
    id: string;
    turn: number;
    actorPlayerId: string;
};

type ObjectiveAchievedEvent = BaseEvent & {
    type: ObjectiveStatus.ACHIEVED;
    objectiveId: string;
    description?: string;
    pointsAwarded: number;
}

type UnitDestroyedEvent = BaseEvent & {
    type: UnitStatus.DESTROYED;
    targetUnitId: string;
    pointsAwarded: number;
};

type UnitFledEvent = BaseEvent & {
    type: UnitStatus.FLED;
    targetUnitId: string;
    pointsAwarded: number;
}

type UnitFleeingEvent = BaseEvent & {
    type: UnitStatus.FLEEING;
    targetUnitId: string;
    pointsAwarded: number;
}

type UnitBelowQuarterEvent = BaseEvent & {
    type: UnitStatus.UNDER_25_PERCENT;
    targetUnitId: string;
    remainingSize: number;
    pointsAwarded: number; // 50%
};

export type StandardCapturedEvent = BaseEvent & {
    type: UnitStatus.STANDARD_CAPTURED;
    fromPlayerId: string; // player who lost the standard
    pointsAwarded: number; // 50
};

export type MatchEvent =
    | UnitDestroyedEvent
    | UnitFleeingEvent
    | UnitFledEvent
    | UnitBelowQuarterEvent
    | StandardCapturedEvent
    | ObjectiveAchievedEvent