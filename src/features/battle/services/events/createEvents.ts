import { Unit, UnitStatus } from "../../player/types/unit";
import { v4 as uuidv4 } from "react-native-uuid/dist/v4";
import { MatchEvent } from "../types/events/matchEvent";

/**
 * Creates a unit destroyed event
 * @param unit the unit that was destroyed
 * @param turn the turn of the event
 * @param actorPlayerId the player id of the actor
 * @returns the created event
 */
export const createUnitDestroyedEvent = (unit: Unit, turn: number, actorPlayerId: string): MatchEvent => ({
    id: uuidv4(),
    type: UnitStatus.DESTROYED,
    targetUnitId: unit.id,
    pointsAwarded: unit.cost ?? 0,
    turn,
    actorPlayerId,
});

/**
 * Creates a unit fleeing event
 * @param unit the unit that was fleeing
 * @param turn the turn of the event
 * @param actorPlayerId the player id of the actor
 * @returns the created event
 */
export const createUnitFleeingEvent = (unit: Unit, turn: number, actorPlayerId: string): MatchEvent => ({
    id: uuidv4(),
    type: UnitStatus.FLEEING,
    targetUnitId: unit.id,
    pointsAwarded: Math.ceil(unit.cost ?? 0) / 2,
    turn,
    actorPlayerId,
});

/**
 * Creates a unit fled event
 * @param unit the unit that was fled
 * @param turn the turn of the event
 * @param actorPlayerId the player id of the actor
 * @returns the created event
 */
export const createUnitFledEvent = (unit: Unit, turn: number, actorPlayerId: string): MatchEvent => ({
    id: uuidv4(),
    type: UnitStatus.FLED,
    targetUnitId: unit.id,
    pointsAwarded: Math.ceil(unit.cost ?? 0) / 2,
    turn,
    actorPlayerId,
});

/**
 * Creates a unit below quarter event
 * @param unit the unit that was below quarter
 * @param turn the turn of the event
 * @param actorPlayerId the player id of the actor
 * @returns the created event        
 */ 
export const createUnitBelowQuarterEvent = (unit: Unit, turn: number, actorPlayerId: string): MatchEvent => ({
    id: uuidv4(),
    type: UnitStatus.UNDER_25_PERCENT,
    targetUnitId: unit.id,
    remainingSize: unit.initialSize ?? 0,
    pointsAwarded: Math.ceil(unit.cost ?? 0) / 4,
    turn,
    actorPlayerId,
});