// utils/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const API_URL = 'http://192.168.29.32:3000/api/stats';

export const sendStats = async (mantra: string, counts: number, cycles: number, jwt: string) => {
  const payload = { mantra, counts, cycles };
  const headers = {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };

  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    try {
      await axios.post(API_URL, payload, { headers });
      console.log('📤 Stats sent successfully');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('❌ Axios Error Response:', err.response?.status, err.response?.data);
      } else {
        console.log('❌ Unknown Error:', err);
      }
      await queueOfflineStat(payload, jwt);
    }
  } else {
    console.log('📴 Offline: saving stat to queue');
    await queueOfflineStat(payload, jwt);
  }
};

// Store offline stat in AsyncStorage queue
const queueOfflineStat = async (payload: object, jwt: string) => {
  const existingQueue = await AsyncStorage.getItem('offlineStats');
  const queue = existingQueue ? JSON.parse(existingQueue) : [];

  queue.push({ payload, jwt });

  await AsyncStorage.setItem('offlineStats', JSON.stringify(queue));
};
