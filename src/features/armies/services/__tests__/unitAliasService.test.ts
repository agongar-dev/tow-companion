describe('unitAliasService', () => {
  it('updates the unit alias and records the change in the battle log', () => {
    jest.isolateModules(() => {
      const { UnitCategory } = require('../../types/UnitCategory');
      const { getBattleLog, updateUnitAlias } = require('../unitAliasService');
      const unit = {
        id: 'unit-1',
        name: 'Guard',
        category: UnitCategory.CORE,
      } as any;

      updateUnitAlias(unit, 'Veterans');

      expect(unit.alias).toBe('Veterans');
      expect(getBattleLog()).toEqual([
        expect.objectContaining({
          type: 'ALIAS_UPDATED',
          payload: {
            unitId: 'unit-1',
            oldLabel: 'Guard',
            newLabel: 'Veterans',
          },
        }),
      ]);
    });
  });
});
