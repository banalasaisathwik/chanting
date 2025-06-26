import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // ✅ add this
import './global.css';
import 'react-native-gesture-handler';


import OnboardingScreen from '~/screens/OnboardingScreen';
import MainApp from '~/screens/MainApp';
import HomeScreen from '~/screens/HomeScreen';
import ChantingSessionScreen from '~/screens/ChantingSessionScreen';
import LeaderboardScreen from '~/screens/LeaderboardScreen';
import WalletScreen from '~/screens/WalletScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { AuthProvider } from 'contexts/AuthContext';
import { retryOfflineStats } from '~/utils/retryOffline';
import { registerForPushNotificationsAsync } from '~/utils/notifications';
import * as Notifications from 'expo-notifications';


const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Initialize Google Sign-In
    GoogleSignin.configure({
      webClientId: "460784747815-pv13lul5p1ud79am9tphjmp325iu77kd.apps.googleusercontent.com", // Replace with your actual web client ID
      offlineAccess: true, // If you need offline access
    });
    
    retryOfflineStats();

  }, []);
  useEffect(() => {
  registerForPushNotificationsAsync();
}, []);

useEffect(() => {
  const sub = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notification received:', notification);
  });

  return () => sub.remove();
}, []);

  return (
        

    <SafeAreaProvider>
      <AuthProvider>
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
      </AuthProvider>
    </SafeAreaProvider>
  );
}

