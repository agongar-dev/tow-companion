import { AssignedObjective } from "../../types/match";

/**
 * Marks the objective as achieved
 * @param objective the objective to mark as achieved
 * @param turn the turn of the achievement
 * @param points the points earned
 * @param notes the notes for the achievement
 * @returns the updated objective
 */
export function markObjectiveAchieved(
    objective: AssignedObjective, 
    turn: number,
    points: number,
    notes?: string
): AssignedObjective {
    return {
        ...objective,
        turnAchieved: turn,
        achieved: true,
        pointsEarned: points,
        notes,
    }
};

/**
 * Checks if the objective can be achieved
 * @param objective the objective to check
 * @returns true if the objective can be achieved
 */
export function canAchieveObjective(objective: AssignedObjective): boolean {
    return !objective.achieved || objective.isRepeatable === true;
}