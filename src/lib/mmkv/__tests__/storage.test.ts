import { clearStorage, loadString, remove, saveString, storage } from '../storage';

describe('storage helpers', () => {
  it('saves and loads string values', () => {
    saveString('mode', 'dark');

    expect(loadString('mode')).toBe('dark');
    expect(storage.set).toHaveBeenCalledWith('mode', 'dark');
  });

  it('removes values', () => {
    saveString('mode', 'dark');

    remove('mode');

    expect(loadString('mode')).toBeNull();
    expect(storage.delete).toHaveBeenCalledWith('mode');
  });

  it('clears all values', () => {
    saveString('mode', 'dark');

    clearStorage();

    expect(loadString('mode')).toBeNull();
    expect(storage.clearAll).toHaveBeenCalled();
  });
});
