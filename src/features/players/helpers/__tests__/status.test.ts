import { UnitCategory } from '../../../armies/types/UnitCategory';
import { getQuarterThreshold, isUnitLesserOrEqualToQuarter } from '../status';

const unit = {
  id: 'unit-1',
  name: 'Infantry',
  category: UnitCategory.CORE,
  initialSize: 13,
};

describe('player status helpers', () => {
  it('returns null when the unit has no initial size', () => {
    expect(getQuarterThreshold({ ...unit, initialSize: undefined })).toBeNull();
  });

  it('rounds the quarter threshold up', () => {
    expect(getQuarterThreshold(unit)).toBe(4);
  });

  it('checks whether the current unit size is at or below the threshold', () => {
    expect(isUnitLesserOrEqualToQuarter(unit, 4)).toBe(true);
    expect(isUnitLesserOrEqualToQuarter(unit, 5)).toBe(false);
  });
});
