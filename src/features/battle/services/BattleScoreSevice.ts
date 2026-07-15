import { getCompletedObjectivesForPlayer, getCompletedObjectivesForTeam } from "./BattleObjectiveService";



export const calculateVictoryPointsForPlayer = (matchId: string, playerId: string): number => {
  const playerObjectives = [
    ...getCompletedObjectivesForPlayer(matchId, playerId),
  ];
  return playerObjectives.reduce((sum, obj) => sum + (obj.pointsEarned ?? 0), 0);
};

export const calculateVictoryPointsForTeam = (matchId: string, teamId: string): number => {
  const teamObjectives = [
    ...getCompletedObjectivesForTeam(matchId, teamId),
  ];
  return teamObjectives.reduce((sum, obj) => sum + (obj.pointsEarned ?? 0), 0);
};