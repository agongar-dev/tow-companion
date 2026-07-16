jest.mock('../../repositories/BattleMMKVRepository', () => ({
  __esModule: true,
  default: {
    getMatchById: jest.fn(),
    saveMatch: jest.fn(),
  },
}));

import BattleMMKVRepository from '../../repositories/BattleMMKVRepository';
import { addEventToMatch, getEventsByMatch } from '../BattleEventsService';

const mockedBattleRepository = jest.mocked(BattleMMKVRepository);

describe('BattleEventsService', () => {
  it('returns the match events or an empty array when the match is missing', () => {
    mockedBattleRepository.getMatchById.mockReturnValueOnce({ events: [{ id: 'event-1' }] } as any).mockReturnValueOnce(null);

    expect(getEventsByMatch('match-1')).toEqual([{ id: 'event-1' }]);
    expect(getEventsByMatch('missing-match')).toEqual([]);
  });

  it('adds an event to an existing match and persists it', () => {
    const match = { id: 'match-1', events: [] as any[] } as any;
    const event = { id: 'event-1' } as any;
    mockedBattleRepository.getMatchById.mockReturnValue(match);

    addEventToMatch('match-1', event);

    expect(match.events).toEqual([event]);
    expect(mockedBattleRepository.saveMatch).toHaveBeenCalledWith(match);
  });

  it('does nothing when the target match does not exist', () => {
    mockedBattleRepository.getMatchById.mockReturnValue(null);

    addEventToMatch('missing-match', { id: 'event-1' } as any);

    expect(mockedBattleRepository.saveMatch).not.toHaveBeenCalled();
  });
});
