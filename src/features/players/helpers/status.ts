import { Unit } from "../../armies/types/Unit";

/**
 * Returns the threshold for the unit to be considered as being below the quarter
 * @param unit The unit to check
 * @returns The threshold for the unit to be considered as being below the quarter
 */
export function getQuarterThreshold(unit: Unit): number | null {
    if (!unit.initialSize) {
        return null;
    }
    return Math.ceil(unit.initialSize / 4);
}

/**
 * Returns true if the unit is lesser or equal to the quarter
 * @param unit The unit to check
 * @param currentSize The current size of the unit
 * @returns True if the unit is lesser or equal to the quarter
 */
export function isUnitLesserOrEqualToQuarter(unit: Unit, currentSize: number): boolean {
    const threshold = getQuarterThreshold(unit);
    if (!threshold) {
        return false;
    }
    return currentSize <= threshold;
}
