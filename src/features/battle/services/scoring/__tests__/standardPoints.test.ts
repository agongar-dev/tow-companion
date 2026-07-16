import { getPointsForStandardCaptured } from '../standardPoints';

describe('getPointsForStandardCaptured', () => {
  it('returns the standard captured score', () => {
    expect(getPointsForStandardCaptured()).toBe(50);
  });
});
