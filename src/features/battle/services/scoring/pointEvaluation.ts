import { AssignedObjective } from "../../types/match";

/**
 * Evaluates the points earned by the objective
 * @param objective the objective to evaluate
 * @returns the points earned by the objective or 0 if no points were earned
 */
export function evaluateObjectivePoints(objective: AssignedObjective): number {
    return objective.pointsEarned ?? 0;
}