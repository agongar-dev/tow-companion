import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../features/home/screens/HomeScreen';
import ObjectivesScreen from '../../features/objectives/screens/ObjectivesScreen';
import PlayersScreen from '../../features/players/screens/PlayerListScreen';
import ScenariosScreen from '../../features/scenarios/screens/ScenariosScreen';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import TerrainsScreen from '../../features/terrains/screen/TerrainScreen';
import CustomDrawerContent from './CustomDrawerContent';
import ArmiesScreen from '../../features/armies/screens/ArmiesScreen';

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: "front",
                overlayColor: "rgba(0, 0, 0, 0.7)",
                swipeEnabled: true,
                drawerStyle: {
                    backgroundColor: 'transparent',
                    width: 300,
                    zIndex: 10,
                },
                swipeEdgeWidth: 100,
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Scenarios" component={ScenariosScreen} />
            <Drawer.Screen name="Objectives" component={ObjectivesScreen} />
            <Drawer.Screen name="Terrains" component={TerrainsScreen} />
            <Drawer.Screen name="Armies" component={ArmiesScreen} />
            <Drawer.Screen name="Players" component={PlayersScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}
