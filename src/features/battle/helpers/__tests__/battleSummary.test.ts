import { UnitStatus } from '../../../armies/types/Unit';
import { getMatchSummary } from '../battleSummary';

describe('getMatchSummary', () => {
  it('builds the match summary from team scores and event turns', () => {
    const match = {
      events: [
        { id: 'event-1', turn: 1, actorPlayerId: 'player-1', type: UnitStatus.DESTROYED, targetUnitId: 'unit-1', pointsAwarded: 100 },
        { id: 'event-2', turn: 3, actorPlayerId: 'player-2', type: UnitStatus.FLED, targetUnitId: 'unit-2', pointsAwarded: 40 },
      ],
      teams: [
        { id: 'team-1', players: [{ playerId: 'player-1' }] },
        { id: 'team-2', players: [{ playerId: 'player-2' }] },
      ],
    } as any;

    expect(getMatchSummary(match)).toEqual({
      totalTurns: 3,
      teamScores: { 'team-1': 100, 'team-2': 40 },
      leadingTeam: 'team-1',
      margin: 60,
    });
  });
});
