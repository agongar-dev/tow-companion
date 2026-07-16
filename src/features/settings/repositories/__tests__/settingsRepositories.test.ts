jest.mock('../../../../lib/mmkv/storage', () => ({
  loadString: jest.fn(),
  saveString: jest.fn(),
}));

import { loadString, saveString } from '../../../../lib/mmkv/storage';
import { AudioRepository } from '../AudioRepository';
import { SettingsRepository } from '../SettingsRepository';
import { ThemeRepository } from '../ThemeRepository';
import { AudioMode } from '../../../../lib/audio/types';
import { ArmiesOrPlayers } from '../../../../lib/settings/types';
import { ThemeMode } from '../../../../lib/theme/types';

const mockedLoadString = jest.mocked(loadString);
const mockedSaveString = jest.mocked(saveString);

describe('settings repositories', () => {
  beforeEach(() => {
    mockedLoadString.mockReset();
    mockedSaveString.mockReset();
  });

  it('returns null when no values are stored', () => {
    expect(SettingsRepository.getNavShowArmiesOrPlayers()).toBeNull();
    expect(ThemeRepository.getTheme()).toBeNull();
    expect(AudioRepository.getAudio()).toBeNull();
  });

  it('reads and saves each settings value through storage', () => {
    mockedLoadString
      .mockReturnValueOnce(ArmiesOrPlayers.PLAYERS)
      .mockReturnValueOnce(ThemeMode.Dark)
      .mockReturnValueOnce(AudioMode.MUTE);

    expect(SettingsRepository.getNavShowArmiesOrPlayers()).toBe(ArmiesOrPlayers.PLAYERS);
    expect(ThemeRepository.getTheme()).toBe(ThemeMode.Dark);
    expect(AudioRepository.getAudio()).toBe(AudioMode.MUTE);

    SettingsRepository.saveNavShowArmiesOrPlayers(ArmiesOrPlayers.ARMIES);
    ThemeRepository.saveTheme(ThemeMode.Light);
    AudioRepository.saveAudio(AudioMode.ON);

    expect(mockedSaveString).toHaveBeenNthCalledWith(1, 'settings', ArmiesOrPlayers.ARMIES);
    expect(mockedSaveString).toHaveBeenNthCalledWith(2, 'theme', ThemeMode.Light);
    expect(mockedSaveString).toHaveBeenNthCalledWith(3, 'audioMode', AudioMode.ON);
  });
});
