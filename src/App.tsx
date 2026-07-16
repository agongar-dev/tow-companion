import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";
import { AudioSettingsProvider } from './lib/audio/context/AudioContext';
import { SettingsProvider } from './lib/settings/context/SettingsContext';
import { ThemeProvider } from './lib/theme/context/ThemeContext';
import RightDrawerProvider from './navigation/RightDrawerProvider';
import { DrawerProvider } from './shared/hooks/useDrawer';
import { useEffect, useState } from 'react';
import { ScenarioRepository } from './features/scenarios/repositories/ScenarioRepository';
import { GameLengthRepository } from './features/scenarios/repositories/GameLengthRepository';
import { ObjectiveRepository } from './features/objectives/repositories/ObjectiveRepository';
import LoadingScreen from './components/LoadingScreen';
import { MapLayoutRepository } from './features/terrains/repositories/MapLayoutRepository';
import { TerrainTypeRepository } from './features/terrains/repositories/TerrainTypeRepository';
import { TerrainItemRepository } from './features/terrains/repositories/TerrainItemRepository';
import { PlayerRepository } from './features/players/repositories/PlayerRepository';

const App = () => {

	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const preload = async () => {
			try {
				await TerrainItemRepository.init();
				await TerrainTypeRepository.init()
				await MapLayoutRepository.init(),

				await ObjectiveRepository.init(),
				await GameLengthRepository.init(),
				await ScenarioRepository.init(),
				await PlayerRepository.init(),

				setIsReady(true);
			} catch (e) {
				console.log('preload error', e);
			}
		};
		preload();
	}, []);

	if (!isReady) {
		console.log('not ready');
		return <LoadingScreen />;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SettingsProvider>
				<AudioSettingsProvider>
					<ThemeProvider>
						<DrawerProvider>
							<NavigationContainer>
								<RightDrawerProvider />
							</NavigationContainer>
						</DrawerProvider>
					</ThemeProvider>
				</AudioSettingsProvider>
			</SettingsProvider >
		</GestureHandlerRootView >
	);
};

export default App;
