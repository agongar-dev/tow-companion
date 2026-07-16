import { PlayerRepository } from '../PlayerRepository';
import { PlayerOrigin } from '../../types/PlayerOrigin';

const NOW = new Date('2024-01-01T00:00:00.000Z');

const createRemotePlayer = () => ({
  id: 'remote-player',
  name: 'Remote',
  ownerDeviceId: 'device-2',
  origin: PlayerOrigin.LOCAL,
  armyIds: [],
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
});

describe('PlayerRepository', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW);
    PlayerRepository.clearAll();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates and stores a local player', () => {
    const player = PlayerRepository.createLocalPlayer('Alice', 'device-1', 'avatar.png');

    expect(player).toEqual({
      id: 'generated-uuid',
      name: 'Alice',
      image: 'avatar.png',
      origin: PlayerOrigin.LOCAL,
      ownerDeviceId: 'device-1',
      armyIds: [],
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
    });
    expect(PlayerRepository.getAll()).toEqual([player]);
  });

  it('updates an existing player and refreshes the timestamp', () => {
    PlayerRepository.save({
      id: 'player-1',
      name: 'Alice',
      ownerDeviceId: 'device-1',
      armyIds: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    });

    PlayerRepository.save({
      id: 'player-1',
      name: 'Alice Updated',
      ownerDeviceId: 'device-1',
      armyIds: ['army-1'],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    });

    expect(PlayerRepository.getById('player-1')).toEqual(
      expect.objectContaining({
        name: 'Alice Updated',
        armyIds: ['army-1'],
        updatedAt: NOW.toISOString(),
      }),
    );
  });

  it('imports remote players as imported entries and updates existing ones', () => {
    const remotePlayer = createRemotePlayer();

    PlayerRepository.importRemotePlayer(remotePlayer);
    PlayerRepository.importRemotePlayer({ ...remotePlayer, name: 'Remote Updated' });

    expect(PlayerRepository.getById('remote-player')).toEqual(
      expect.objectContaining({
        name: 'Remote Updated',
        updatedAt: NOW.toISOString(),
      }),
    );
  });

  it('assigns armies once per player and exposes the stored map', () => {
    PlayerRepository.save({
      id: 'player-1',
      name: 'Alice',
      ownerDeviceId: 'device-1',
      armyIds: [],
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
    });

    PlayerRepository.assignArmy('player-1', 'army-1');
    PlayerRepository.assignArmy('player-1', 'army-1');

    expect(PlayerRepository.getArmies('player-1')).toEqual(['army-1']);
    expect(PlayerRepository.getArmiesMap()).toEqual({ 'player-1': ['army-1'] });
  });

  it('removes players and clears persisted state', () => {
    PlayerRepository.save({
      id: 'player-1',
      name: 'Alice',
      ownerDeviceId: 'device-1',
      armyIds: [],
      createdAt: NOW.toISOString(),
      updatedAt: NOW.toISOString(),
    });
    PlayerRepository.assignArmy('player-1', 'army-1');

    PlayerRepository.removePlayer('player-1');

    expect(PlayerRepository.getAll()).toEqual([]);
    expect(PlayerRepository.getArmies('player-1')).toEqual([]);
  });
});
