import BattleMMKVRepository from '../repositories/BattleMMKVRepository';
import { AssignedObjective } from '../types/match';
import { ObjectiveOwner } from '../types/objective';

const getRevealedObjectiveIds = (matchId: string): Set<string> => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  const revealedObjectives = match?.objectives.hiddenObjectives?.filter(objective => objective.achieved) ?? [];

  return new Set(revealedObjectives.map(objective => objective.objectiveId));
};

const getObjectivesByOwner = (
  objectives: AssignedObjective[] | undefined,
  ownerType: ObjectiveOwner,
  ownerId: string,
): AssignedObjective[] => {
  return objectives?.filter(objective => objective.ownerType === ownerType && objective.ownerId === ownerId) ?? [];
};

const getRevealedHiddenObjectivesByOwner = (
  matchId: string,
  ownerType: ObjectiveOwner,
  ownerId: string,
): AssignedObjective[] => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  const revealedObjectiveIds = getRevealedObjectiveIds(matchId);
  const hiddenObjectives = getObjectivesByOwner(match?.objectives.hiddenObjectives, ownerType, ownerId);

  return hiddenObjectives.filter(objective => revealedObjectiveIds.has(objective.objectiveId));
};

export const getSecondaryObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  return getObjectivesByOwner(match?.objectives.secondaryObjectives, ObjectiveOwner.PLAYER, playerId);
};

export const getRevealedHiddenObjectives = (matchId: string): string[] => {
  return Array.from(getRevealedObjectiveIds(matchId));
};

export const getSecondaryObjectivesForTeam = (matchId: string, teamId: string): AssignedObjective[] => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  return getObjectivesByOwner(match?.objectives.secondaryObjectives, ObjectiveOwner.TEAM, teamId);
};

export const getScenarioObjective = (matchId: string): AssignedObjective[] => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  return match?.objectives.scenarioObjective ?? [];
};

export const getHiddenObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  return getObjectivesByOwner(match?.objectives.hiddenObjectives, ObjectiveOwner.PLAYER, playerId);
};

export const getCompletedObjectivesForPlayer = (matchId: string, playerId: string): AssignedObjective[] => {
  return [
    ...getSecondaryObjectivesForPlayer(matchId, playerId),
    ...getRevealedHiddenObjectivesByOwner(matchId, ObjectiveOwner.PLAYER, playerId),
  ];
};

export const getCompletedObjectivesForTeam = (matchId: string, teamId: string): AssignedObjective[] => {
  return [
    ...getSecondaryObjectivesForTeam(matchId, teamId),
    ...getRevealedHiddenObjectivesByOwner(matchId, ObjectiveOwner.TEAM, teamId),
  ];
};
