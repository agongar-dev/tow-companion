import BattleMMKVRepository from "../repositories/BattleMMKVRepository";
import { AssignedObjective } from "../types/match";
import { ObjectiveOwner } from "../types/objective";

export const getSecondaryObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    return match?.objectives.secondaryObjectives?.filter(
        obj => obj.ownerType === ObjectiveOwner.PLAYER && obj.ownerId === playerId
    ) ?? [];
};

export const getRevealedHiddenObjectives = (matchId: string): string[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    return match?.objectives.hiddenObjectives?.filter(obj => obj.achieved).map(obj => obj.objectiveId) ?? [];
};

export const getSecondaryObjectivesForTeam = (matchId: string, teamId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    return match?.objectives.secondaryObjectives?.filter(
        obj => obj.ownerType === ObjectiveOwner.TEAM && obj.ownerId === teamId
    ) ?? [];
};

export const getScenarioObjective = (matchId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    return match?.objectives.scenarioObjective ?? [];
};

export const getHiddenObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    return match?.objectives.hiddenObjectives?.filter(
        obj => obj.ownerType === ObjectiveOwner.PLAYER && obj.ownerId === playerId
    ) ?? [];
};

export const getCompletedObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    const completedObjectives = [getSecondaryObjectivesForPlayer(matchId, playerId), getHiddenObjectivesForPlayer(matchId, playerId).filter(obj => getRevealedHiddenObjectives(matchId).includes(obj.id)), getSecondaryObjectivesForPlayer(matchId, playerId)];
    return completedObjectives.flat();
};

export const getCompletedObjectivesForTeam = (matchId: string, teamId: string): AssignedObjective[] => {
    const match = BattleMMKVRepository.getMatchById(matchId);
    const completedObjectives = [getSecondaryObjectivesForTeam(matchId, teamId), getHiddenObjectivesForPlayer(matchId, teamId).filter(obj => getRevealedHiddenObjectives(matchId).includes(obj.id)), getSecondaryObjectivesForTeam(matchId, teamId)];
    return completedObjectives.flat();
};     