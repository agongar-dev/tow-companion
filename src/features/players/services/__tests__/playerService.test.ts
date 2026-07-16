jest.mock('../../../armies/services/ArmyService', () => ({
  __esModule: true,
  default: {
    getAll: jest.fn(),
  },
}));

import ArmyService from '../../../armies/services/ArmyService';
import PlayerService from '../playerService';

const mockedArmyService = jest.mocked(ArmyService);

describe('PlayerService', () => {
  it('indexes armies by id', () => {
    mockedArmyService.getAll.mockReturnValue([
      { id: 'army-1', name: 'Army One' },
      { id: 'army-2', name: 'Army Two' },
    ] as any);

    expect(PlayerService.getArmiesMap()).toEqual({
      'army-1': { id: 'army-1', name: 'Army One' },
      'army-2': { id: 'army-2', name: 'Army Two' },
    });
  });
});
