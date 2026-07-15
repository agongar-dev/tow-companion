import { PlayerInMatch, TeamInMatch } from "../types/match";
import BattleRepository from "../repositories/BattleMMKVRepository";

export const getPlayerById = (playerId: string): PlayerInMatch | null => {
    const match = BattleRepository.getActiveMatch();
    for (const team of match?.teams ?? []) {
        const player = team.players.find(player => player.playerId === playerId);
        if (player) {
            return player;
        }
    };
    return null;
};

export const getTeamByPlayerId = (playerId: string): TeamInMatch | null => {
  const match = BattleRepository.getActiveMatch();
  return match?.teams.find((team) =>
    team.players.some((p) => p.playerId === playerId)
  ) ?? null;
};

export const getTeamById = (teamId: string): TeamInMatch | null => {
    const match = BattleRepository.getActiveMatch();
    return match?.teams.find((team) => team.id === teamId) ?? null;  
};

