import { v4 as uuidv4 } from "react-native-uuid/dist/v4";
import { Unit, UnitStatus } from "../../../armies/types/Unit";
import { MatchEvent } from "../../types/event/matchEvent";

const POINT_MULTIPLIERS: Record<UnitStatus, number> = {
  [UnitStatus.DESTROYED]: 1.0,
  [UnitStatus.FLED]: 1.0,
  [UnitStatus.FLEEING]: 0.5,
  [UnitStatus.UNDER_25_PERCENT]: 0.5,
  [UnitStatus.STANDARD_CAPTURED]: 0,
  [UnitStatus.HALF_DESTROYED]: 0.5,
  [UnitStatus.ALIVE]: 0,
};

export function getPointsForUnitEvent(unit: Unit, status: UnitStatus): number {
  if (status === UnitStatus.STANDARD_CAPTURED) {
    return 50;
  }

  const multiplier = POINT_MULTIPLIERS[status];
  const baseCost = unit.cost || 0;

  return Math.ceil(baseCost * multiplier);
}

export function createMatchEventFromUnitStatus(
  unit: Unit,
  actorPlayerId: string,
  turn: number,
  status: UnitStatus
): MatchEvent {
  const base = {
    id: uuidv4(),
    actorPlayerId,
    turn,
    targetUnitId: unit.id,
    pointsAwarded: getPointsForUnitEvent(unit, status),
  };

  switch (status) {
    case UnitStatus.DESTROYED:
      return {
        ...base,
        type: UnitStatus.DESTROYED,
      };
    case UnitStatus.FLEEING:
      return {
        ...base,
        type: UnitStatus.FLEEING,
      };
    case UnitStatus.FLED:
      return {
        ...base,
        type: UnitStatus.FLED,
      };
    case UnitStatus.UNDER_25_PERCENT:
      return {
        ...base,
        type: UnitStatus.UNDER_25_PERCENT,
        remainingSize: unit.initialSize ?? 0,
      };
    case UnitStatus.STANDARD_CAPTURED:
      return {
        ...base,
        type: UnitStatus.STANDARD_CAPTURED,
        fromPlayerId: unit.armyId ?? "",
      };
    default:
      throw new Error(`Unit status ${status} not supported`);
  }
}
