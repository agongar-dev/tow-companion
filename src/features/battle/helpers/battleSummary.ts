import { calculateVictoryPointsByTeam } from "../services/scoring/battleScoreManager";
import { BattleMatch } from "../types/match";

type MatchSummary = {
    totalTurns: number;
    teamScores: Record<string, number>;
    leadingTeam?: string;
    margin?: number;
}

export function getMatchSummary(match: BattleMatch): MatchSummary {
    const teamScores = calculateVictoryPointsByTeam(match.events, match.teams);

    const result = Object.entries(teamScores).sort((a, b) => b[1] - a[1]);

    return {
        totalTurns: Math.max(...match.events.map(event => event.turn)),
        teamScores,
        leadingTeam: result[0]?.[0],
        margin: result.length > 1 ? result[0][1] - result[1][1] : undefined,
    }
}