import { UnitStatus } from '../../../../armies/types/Unit';
import { calculateVictoryPointsByPlayer, calculateVictoryPointsByTeam } from '../battleScoreManager';

describe('battleScoreManager', () => {
  it('sums only scored events by player', () => {
    expect(
      calculateVictoryPointsByPlayer([
        { id: 'event-1', turn: 1, actorPlayerId: 'player-1', type: UnitStatus.DESTROYED, targetUnitId: 'unit-1', pointsAwarded: 100 },
        { id: 'event-2', turn: 1, actorPlayerId: 'player-1', type: UnitStatus.FLED, targetUnitId: 'unit-2', pointsAwarded: 40 },
        { id: 'event-3', turn: 1, actorPlayerId: '', type: UnitStatus.FLED, targetUnitId: 'unit-3', pointsAwarded: 10 },
        { id: 'event-4', turn: 1, actorPlayerId: 'player-2', type: UnitStatus.FLEEING, targetUnitId: 'unit-4' } as any,
      ]),
    ).toEqual({ 'player-1': 140 });
  });

  it('aggregates player points into team totals', () => {
    const events = [
      { id: 'event-1', turn: 1, actorPlayerId: 'player-1', type: UnitStatus.DESTROYED, targetUnitId: 'unit-1', pointsAwarded: 100 },
      { id: 'event-2', turn: 1, actorPlayerId: 'player-2', type: UnitStatus.FLED, targetUnitId: 'unit-2', pointsAwarded: 40 },
    ] as any;

    const teams = [
      { id: 'team-1', players: [{ playerId: 'player-1' }] },
      { id: 'team-2', players: [{ playerId: 'player-2' }, { playerId: 'player-3' }] },
    ] as any;

    expect(calculateVictoryPointsByTeam(events, teams)).toEqual({
      'team-1': 100,
      'team-2': 40,
    });
  });
});
