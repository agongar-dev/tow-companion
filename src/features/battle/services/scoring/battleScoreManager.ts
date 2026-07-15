import { MatchEvent } from "../types/events/matchEvent";
import { TeamInMatch } from "../../types/match";

export function calculateVictoryPointsByPlayer(events: MatchEvent[]): Record<string, number> {
    const totals: Record<string, number> = {};

    for (const event of events) {
        const { actorPlayerId, pointsAwarded } = event as any;
        if (!actorPlayerId || typeof pointsAwarded !== 'number') {
            continue;
        }

        if (!totals[actorPlayerId]) {
            totals[actorPlayerId] = 0;
        }
        totals[actorPlayerId] += pointsAwarded;
    }
    return totals;
}


export function calculateVictoryPointsByTeam(events: MatchEvent[], teams: TeamInMatch[]): Record<string, number> {
    const playerPoints = calculateVictoryPointsByPlayer(events);

    const teamTotals: Record<string, number> = {};

    for (const team of teams) {
        let teamTotal = 0;

        for (const player of team.players) {
            teamTotal += playerPoints[player.playerId] || 0;
        }

        teamTotals[team.id] = teamTotal;
    }
    return teamTotals;
}