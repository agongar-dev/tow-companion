jest.mock('../storage', () => ({
  loadString: jest.fn(),
  saveString: jest.fn(),
}));

import { createCachedRepository } from '../genericRepository';
import { loadString, saveString } from '../storage';

const mockedLoadString = jest.mocked(loadString);
const mockedSaveString = jest.mocked(saveString);

describe('createCachedRepository', () => {
  beforeEach(() => {
    mockedLoadString.mockReset();
    mockedSaveString.mockReset();
  });

  it('loads assets into storage when storage is empty', () => {
    const repository = createCachedRepository('units', () => [{ id: 'unit-1' }]);

    expect(repository.getAll()).toEqual([{ id: 'unit-1' }]);
    expect(mockedLoadString).toHaveBeenCalledWith('units');
    expect(mockedSaveString).toHaveBeenCalledWith('units', JSON.stringify([{ id: 'unit-1' }]));
  });

  it('reuses cached items after the first load', () => {
    const assetLoader = jest.fn(() => [{ id: 'unit-1' }]);
    const repository = createCachedRepository('units', assetLoader);

    repository.getAll();
    repository.getAll();

    expect(assetLoader).toHaveBeenCalledTimes(1);
  });

  it('returns stored items when persisted data already exists', () => {
    mockedLoadString.mockReturnValue(JSON.stringify([{ id: 'unit-2' }]));

    const repository = createCachedRepository('units', () => [{ id: 'unit-1' }]);

    expect(repository.getById('unit-2')).toEqual({ id: 'unit-2' });
    expect(mockedSaveString).not.toHaveBeenCalled();
  });

  it('replaces the cache when saveAll is called', () => {
    const repository = createCachedRepository('units', () => [{ id: 'unit-1' }]);

    repository.saveAll([{ id: 'unit-3' }]);

    expect(repository.getAll()).toEqual([{ id: 'unit-3' }]);
    expect(mockedSaveString).toHaveBeenCalledWith('units', JSON.stringify([{ id: 'unit-3' }]));
  });

  it('reloads data after clearCache clears the in-memory state', () => {
    const assetLoader = jest.fn(() => [{ id: 'unit-1' }]);
    const repository = createCachedRepository('units', assetLoader);

    repository.getAll();
    repository.clearCache();
    repository.getAll();

    expect(assetLoader).toHaveBeenCalledTimes(2);
  });
});
