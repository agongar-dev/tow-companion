import { BattleMatch } from '../types/match';
import { battleStorage } from '../../../lib/mmkv/battleStorage'; 

const MATCHES_KEY = 'battle_matches';
const ACTIVE_MATCH_KEY = 'active_battle_match_id';

type MatchMap = Record<string, BattleMatch>;

class BattleRepository {
  private cache: MatchMap = {};

  constructor() {
    this.loadAllMatches();
  }

  private loadAllMatches() {
    const raw = battleStorage.getString(MATCHES_KEY);
    this.cache = raw ? JSON.parse(raw) : {};
  }

  private persist() {
    battleStorage.setString(MATCHES_KEY, JSON.stringify(this.cache));
  }

  getAllMatches(): BattleMatch[] {
    return Object.values(this.cache);
  }

  getMatchById(id: string): BattleMatch | null {
    return this.cache[id] ?? null;
  }

  saveMatch(match: BattleMatch): void {
    this.cache[match.id] = match;
    this.persist();
  }

  deleteMatch(id: string): void {
    delete this.cache[id];
    this.persist();
  }

  getActiveMatch(): BattleMatch | null {
    const id = battleStorage.getString(ACTIVE_MATCH_KEY);
    return id ? this.getMatchById(id) : null;
  }

  setActiveMatch(id: string): void {
    battleStorage.setString(ACTIVE_MATCH_KEY, id);
  }

  clearActiveMatch(): void {
    battleStorage.removeItem(ACTIVE_MATCH_KEY);
  }

  getActiveMatchId(): string | null {
    return battleStorage.getString(ACTIVE_MATCH_KEY) ?? null;
  }
}

export default new BattleRepository();
