import { UnitCategory } from '../../../armies/types/UnitCategory';
import { getPointsForUnitBelowQuarter, getPointsForUnitDestroyed, getPointsForUnitFleeing, getUnitValue } from '../points';

const unit = {
  id: 'unit-1',
  name: 'Infantry',
  category: UnitCategory.CORE,
  cost: 95,
};

describe('player points helpers', () => {
  it('returns zero when a unit has no cost', () => {
    expect(getUnitValue({ ...unit, cost: undefined })).toBe(0);
  });

  it('calculates destroyed and fleeing points from the unit cost', () => {
    expect(getPointsForUnitDestroyed(unit)).toBe(95);
    expect(getPointsForUnitFleeing(unit)).toBe(48);
  });

  it('rounds below-quarter points up to the next whole value', () => {
    expect(getPointsForUnitBelowQuarter(unit)).toBe(24);
  });
});
