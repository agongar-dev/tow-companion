jest.mock('../../repositories/BattleMMKVRepository', () => ({
  __esModule: true,
  default: {
    getActiveMatch: jest.fn(),
  },
}));

import BattleRepository from '../../repositories/BattleMMKVRepository';
import { getPlayerById, getTeamById, getTeamByPlayerId } from '../BattleTeamsService';

const mockedBattleRepository = jest.mocked(BattleRepository);

describe('BattleTeamsService', () => {
  it('finds players and teams from the active match', () => {
    mockedBattleRepository.getActiveMatch.mockReturnValue({
      teams: [
        { id: 'team-1', players: [{ playerId: 'player-1' }] },
        { id: 'team-2', players: [{ playerId: 'player-2' }] },
      ],
    } as any);

    expect(getPlayerById('player-2')).toEqual({ playerId: 'player-2' });
    expect(getTeamByPlayerId('player-1')).toEqual({ id: 'team-1', players: [{ playerId: 'player-1' }] });
    expect(getTeamById('team-2')).toEqual({ id: 'team-2', players: [{ playerId: 'player-2' }] });
  });

  it('returns null when no active match data matches', () => {
    mockedBattleRepository.getActiveMatch.mockReturnValue(null);

    expect(getPlayerById('player-1')).toBeNull();
    expect(getTeamByPlayerId('player-1')).toBeNull();
    expect(getTeamById('team-1')).toBeNull();
  });
});
