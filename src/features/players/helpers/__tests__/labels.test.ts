import { unitHasFullCommandGroup } from '../labels';

describe('player labels helpers', () => {
  it('returns false when the command group is missing', () => {
    expect(unitHasFullCommandGroup()).toBe(false);
  });

  it('returns true only when every command slot is present', () => {
    expect(unitHasFullCommandGroup({ champion: true, musician: true, standard: true })).toBe(true);
    expect(unitHasFullCommandGroup({ champion: true, musician: false, standard: true })).toBe(false);
  });
});
