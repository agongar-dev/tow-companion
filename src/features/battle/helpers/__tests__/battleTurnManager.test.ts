import { createInitialTurnState, nextTurn, setActivePlayer, setActiveTeam } from '../battleTurnManager';

describe('battleTurnManager', () => {
  it('creates the initial turn state', () => {
    expect(createInitialTurnState('team-1', 'player-1')).toEqual({
      currentTurn: 1,
      activeTeamId: 'team-1',
      activePlayerId: 'player-1',
    });
  });

  it('moves to the next turn without changing the active side', () => {
    expect(nextTurn(createInitialTurnState('team-1', 'player-1'))).toEqual({
      currentTurn: 2,
      activeTeamId: 'team-1',
      activePlayerId: 'player-1',
    });
  });

  it('updates the active player and team independently', () => {
    const state = createInitialTurnState('team-1', 'player-1');

    expect(setActivePlayer(state, 'player-2')).toEqual({ ...state, activePlayerId: 'player-2' });
    expect(setActiveTeam(state, 'team-2')).toEqual({ ...state, activeTeamId: 'team-2' });
  });
});
