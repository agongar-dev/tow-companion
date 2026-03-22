import BattleMMKVRepository from "../repositories/BattleMMKVRepository";
import { MatchEvent } from "../types/events/matchEvent";

export const getEventsByMatch = (matchId: string): MatchEvent[] => {
  return BattleMMKVRepository.getMatchById(matchId)?.events ?? [];
};

export const addEventToMatch = (matchId: string, event: MatchEvent) => {
  const match = BattleMMKVRepository.getMatchById(matchId);
  if (!match) return;

  match.events.push(event);
  BattleMMKVRepository.saveMatch(match);
};