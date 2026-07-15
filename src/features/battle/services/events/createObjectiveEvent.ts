import { v4 as uuidv4 } from "react-native-uuid/dist/v4";
import { MatchEvent } from "../types/events/matchEvent";
import { ObjectiveStatus } from "../types/objective";
/**
 * Creates an objective achieved event
 * @param objectiveId the id of the objective
 * @param actorPlayerId the player id of the actor
 * @param turn the turn of the event
 * @param pointsAwarded the points awarded for the achievement
 * @param description the description of the achievement
 * @returns the created event
 */
export function createObjectiveAchievedEvent(
    objectiveId: string,
    actorPlayerId: string,
    turn: number,
    pointsAwarded: number,
    description?: string
): MatchEvent {
    return {
        id: uuidv4(),
        type: ObjectiveStatus.ACHIEVED,
        objectiveId,
        actorPlayerId,
        turn,
        pointsAwarded,
        description,
    };
}