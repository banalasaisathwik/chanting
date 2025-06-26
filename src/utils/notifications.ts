// utils/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  console.log('[DEBUG] Registering for push notifications');

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (!Device.isDevice) {
    console.warn('[WARN] Must use physical device for push notifications');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permission denied for push notifications.');
    return null;
  }

  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId || Constants?.easConfig?.projectId;

  if (!projectId) {
    console.error('[ERROR] No EAS project ID found in Constants');
    return null;
  }

  try {
    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log('[DEBUG] Expo Push Token:', token);

    await AsyncStorage.setItem('expo-push-token', token);

    const session = await AsyncStorage.getItem('session');
    const authToken = session ? JSON.parse(session).token : null;

    await fetch('http://192.168.29.32:3000/api/save-push-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ expoPushToken: token }),
    });

    return token;
  } catch (err) {
    console.error('[ERROR] Failed to register or save token:', err);
    return null;
  }
}

export async function scheduleDailyGitaReminder(hour: number, minute: number) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🕉️ Jaapam',
      body: 'Tap to read today’s quote and video.',
    },
    trigger: {
      type: 'calendar',
      hour,
      minute,
      repeats: true,
    } as Notifications.CalendarTriggerInput,
  });
}
