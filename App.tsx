import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // ✅ add this
import './global.css';

import OnboardingScreen from '~/screens/OnboardingScreen';
import MainApp from '~/screens/MainApp';
import HomeScreen from '~/screens/HomeScreen';
import ChantingSessionScreen from '~/screens/ChantingSessionScreen';
import LeaderboardScreen from '~/screens/LeaderboardScreen';
import WalletScreen from '~/screens/WalletScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="Welcome" component={HomeScreen} />
          <Stack.Screen name="ChantingSession" component={ChantingSessionScreen} />
          <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

