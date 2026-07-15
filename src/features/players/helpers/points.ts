import { Unit } from "../types/unit";

/**
 * Calculates the value of a unit
 * @param unit The unit to calculate the value of
 * @returns The value of the unit or 0 if the unit has no cost
 */
export function getUnitValue(unit: Unit): number {
    return unit.cost ?? 0;
}

/**
 * Calculates the points awarded for make the unit flee in the last battle turn
 * @param unit The unit to calculate the points from
 * @returns The points awarded for fleeing the unit
 */
export function getPointsForUnitFleeing(unit: Unit): number {
    return Math.ceil(getUnitValue(unit) / 2);
}

/**
 * Calculates the points awarded for destroying the unit
 * @param unit The unit to calculate the points from
 * @returns The points awarded for destroying the unit
 */
export function getPointsForUnitDestroyed(unit: Unit): number {
    return getUnitValue(unit);
}

/**
 * Calculates the points awarded for destroying the unit
 * @param unit The unit to calculate the points from
 * @returns The points awarded for destroying the unit
 */
export function getPointsForUnitBelowQuarter(unit: Unit): number {
    return Math.ceil(getUnitValue(unit) / 4);
}