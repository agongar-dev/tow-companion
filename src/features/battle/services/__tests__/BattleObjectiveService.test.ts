import { ObjectiveOwner, ObjectiveType } from '../../types/objective';
import { getCompletedObjectivesForPlayer, getCompletedObjectivesForTeam, getRevealedHiddenObjectives } from '../BattleObjectiveService';

jest.mock('../../repositories/BattleMMKVRepository', () => ({
  __esModule: true,
  default: {
    getMatchById: jest.fn(),
  },
}));

import BattleMMKVRepository from '../../repositories/BattleMMKVRepository';

const mockedBattleRepository = jest.mocked(BattleMMKVRepository);

describe('BattleObjectiveService', () => {
  it('returns each completed player objective once, including revealed hidden objectives', () => {
    mockedBattleRepository.getMatchById.mockReturnValue({
      id: 'match-1',
      date: '2024-01-01',
      scenarioId: 'scenario-1',
      teams: [],
      events: [],
      objectives: {
        scenarioObjective: [],
        secondaryObjectives: [
          {
            id: 'secondary-assigned-1',
            objectiveId: 'secondary-1',
            type: ObjectiveType.SECONDARY,
            ownerType: ObjectiveOwner.PLAYER,
            ownerId: 'player-1',
            achieved: true,
            pointsEarned: 3,
          },
        ],
        hiddenObjectives: [
          {
            id: 'hidden-assigned-1',
            objectiveId: 'hidden-1',
            type: ObjectiveType.HIDDEN,
            ownerType: ObjectiveOwner.PLAYER,
            ownerId: 'player-1',
            achieved: true,
            pointsEarned: 2,
          },
        ],
      },
    } as any);

    expect(getCompletedObjectivesForPlayer('match-1', 'player-1')).toEqual([
      expect.objectContaining({ id: 'secondary-assigned-1' }),
      expect.objectContaining({ id: 'hidden-assigned-1' }),
    ]);
  });

  it('returns revealed objective ids and team completed objectives by team owner', () => {
    mockedBattleRepository.getMatchById.mockReturnValue({
      objectives: {
        scenarioObjective: [],
        secondaryObjectives: [
          {
            id: 'team-secondary-1',
            objectiveId: 'secondary-1',
            type: ObjectiveType.SECONDARY,
            ownerType: ObjectiveOwner.TEAM,
            ownerId: 'team-1',
            achieved: true,
            pointsEarned: 4,
          },
        ],
        hiddenObjectives: [
          {
            id: 'team-hidden-1',
            objectiveId: 'hidden-1',
            type: ObjectiveType.HIDDEN,
            ownerType: ObjectiveOwner.TEAM,
            ownerId: 'team-1',
            achieved: true,
            pointsEarned: 2,
          },
          {
            id: 'team-hidden-2',
            objectiveId: 'hidden-2',
            type: ObjectiveType.HIDDEN,
            ownerType: ObjectiveOwner.TEAM,
            ownerId: 'team-2',
            achieved: false,
            pointsEarned: 5,
          },
        ],
      },
    } as any);

    expect(getRevealedHiddenObjectives('match-1')).toEqual(['hidden-1']);
    expect(getCompletedObjectivesForTeam('match-1', 'team-1')).toEqual([
      expect.objectContaining({ id: 'team-secondary-1' }),
      expect.objectContaining({ id: 'team-hidden-1' }),
    ]);
  });
});
