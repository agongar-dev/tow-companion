const coveredLogicFiles = [
  'src/lib/mmkv/genericRepository.ts',
  'src/lib/mmkv/storage.ts',
  'src/features/armies/services/unitAliasService.ts',
  'src/features/battle/helpers/battleSummary.ts',
  'src/features/battle/helpers/battleTurnManager.ts',
  'src/features/battle/services/BattleEventsService.ts',
  'src/features/battle/services/BattleObjectiveService.ts',
  'src/features/battle/services/BattleScoreSevice.ts',
  'src/features/battle/services/BattleTeamsService.ts',
  'src/features/battle/services/scoring/battleScoreManager.ts',
  'src/features/battle/services/scoring/pointEvaluation.ts',
  'src/features/battle/services/scoring/standardPoints.ts',
  'src/features/players/helpers/labels.ts',
  'src/features/players/helpers/points.ts',
  'src/features/players/helpers/status.ts',
  'src/features/players/repositories/PlayerRepository.ts',
  'src/features/players/services/playerService.ts',
  'src/features/settings/repositories/AudioRepository.ts',
  'src/features/settings/repositories/SettingsRepository.ts',
  'src/features/settings/repositories/ThemeRepository.ts',
];

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverageFrom: coveredLogicFiles,
};
