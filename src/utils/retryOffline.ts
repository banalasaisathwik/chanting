// utils/retryOffline.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

const API_URL = "http://192.168.29.32:3000/api/stats"; // Change to your deployed backend in production

export const retryOfflineStats = async () => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) return;

    const stored = await AsyncStorage.getItem("offlineStats");
    if (!stored) return;

    const queue: { payload: any; jwt: string }[] = JSON.parse(stored);

    const successful: number[] = [];

    for (let i = 0; i < queue.length; i++) {
      const { payload, jwt } = queue[i];
      try {
        await axios.post(API_URL, payload, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        successful.push(i);
      } catch (err) {
        console.log("❌ Retry failed for stat:", err);
      }
    }

    const remaining = queue.filter((_, i) => !successful.includes(i));
    await AsyncStorage.setItem("offlineStats", JSON.stringify(remaining));

    console.log(`✅ Retried stats: ${successful.length} succeeded, ${remaining.length} remaining`);
  } catch (err) {
    console.error("🔥 Unexpected error in retryOfflineStats:", err);
  }
};
