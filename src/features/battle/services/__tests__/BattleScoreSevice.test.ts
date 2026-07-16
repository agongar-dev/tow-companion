jest.mock('../BattleObjectiveService', () => ({
  getCompletedObjectivesForPlayer: jest.fn(),
  getCompletedObjectivesForTeam: jest.fn(),
}));

import { getCompletedObjectivesForPlayer, getCompletedObjectivesForTeam } from '../BattleObjectiveService';
import { calculateVictoryPointsForPlayer, calculateVictoryPointsForTeam } from '../BattleScoreSevice';

const mockedGetCompletedObjectivesForPlayer = jest.mocked(getCompletedObjectivesForPlayer);
const mockedGetCompletedObjectivesForTeam = jest.mocked(getCompletedObjectivesForTeam);

describe('BattleScoreSevice', () => {
  it('sums player objective points', () => {
    mockedGetCompletedObjectivesForPlayer.mockReturnValue([{ pointsEarned: 3 }, { pointsEarned: 2 }] as any);

    expect(calculateVictoryPointsForPlayer('match-1', 'player-1')).toBe(5);
  });

  it('treats missing objective points as zero for teams', () => {
    mockedGetCompletedObjectivesForTeam.mockReturnValue([{ pointsEarned: 3 }, {}] as any);

    expect(calculateVictoryPointsForTeam('match-1', 'team-1')).toBe(3);
  });
});
