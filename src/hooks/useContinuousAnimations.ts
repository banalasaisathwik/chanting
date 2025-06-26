import { useRef, useEffect } from 'react';
import { Animated, AppState } from 'react-native';
import SystemSetting from 'react-native-system-setting';
import { ANIMATION_DURATIONS } from '../constants/chantingConstants';

export const useContinuousAnimations = (incrementCount: () => void) => {
  const circleGlow = useRef(new Animated.Value(0.3)).current;
  const lastTriggerTime = useRef<number>(0);
  const THROTTLE_MS = 400; // Shorter throttle for better responsiveness
  const volumeEventCount = useRef<number>(0);
  const lastKnownVolume = useRef<number>(0);

  // 💫 Circle glow animation
  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(circleGlow, {
          toValue: 0.8,
          duration: ANIMATION_DURATIONS.CIRCLE_GLOW,
          useNativeDriver: false,
        }),
        Animated.timing(circleGlow, {
          toValue: 0.3,
          duration: ANIMATION_DURATIONS.CIRCLE_GLOW,
          useNativeDriver: false,
        }),
      ])
    );

    glowAnimation.start();
    return () => glowAnimation.stop();
  }, []);

  // 🔊 FINAL SOLUTION: Multiple detection methods
  useEffect(() => {
    let volumeSubscription: any;
    let pollInterval: NodeJS.Timeout;
    let isActive = true;

    // Method 1: Standard volume listener
    const setupVolumeListener = () => {
      // Get initial volume
      SystemSetting.getVolume().then((volume) => {
        lastKnownVolume.current = volume;
      });

      volumeSubscription = SystemSetting.addVolumeListener((data) => {
        if (!isActive) return;

        const now = Date.now();
        const currentVolume = data.value;
        
        console.log(`🔊 Volume event: ${currentVolume}, Count: ${volumeEventCount.current}`);
        
        // Reset event counter on significant volume change
        if (Math.abs(currentVolume - lastKnownVolume.current) > 0.01) {
          volumeEventCount.current = 0;
          if (now - lastTriggerTime.current >= THROTTLE_MS) {
            lastTriggerTime.current = now;
            incrementCount();
            console.log('✅ Volume change detected!');
          }
        } else {
          // Handle max/min volume button presses
          volumeEventCount.current++;
          if (volumeEventCount.current >= 1) { // Trigger on first event at same volume
            if (now - lastTriggerTime.current >= THROTTLE_MS) {
              lastTriggerTime.current = now;
              incrementCount();
              console.log('✅ Volume button at limit detected!');
            }
            volumeEventCount.current = 0; // Reset counter
          }
        }

        lastKnownVolume.current = currentVolume;
      });
    };

    // Method 2: Polling backup (for edge cases)
    const setupPolling = () => {
      let consecutiveMaxCount = 0;
      let consecutiveMinCount = 0;

      pollInterval = setInterval(async () => {
        if (!isActive) return;

        try {
          const currentVolume = await SystemSetting.getVolume();
          const now = Date.now();

          // Detect stuck at max/min volume (possible button press without event)
          if (currentVolume >= 0.99) {
            consecutiveMaxCount++;
            consecutiveMinCount = 0;
            if (consecutiveMaxCount === 3 && now - lastTriggerTime.current >= THROTTLE_MS) {
              lastTriggerTime.current = now;
              incrementCount();
              console.log('✅ Polling detected max volume press!');
              consecutiveMaxCount = 0;
            }
          } else if (currentVolume <= 0.01) {
            consecutiveMinCount++;
            consecutiveMaxCount = 0;
            if (consecutiveMinCount === 3 && now - lastTriggerTime.current >= THROTTLE_MS) {
              lastTriggerTime.current = now;
              incrementCount();
              console.log('✅ Polling detected min volume press!');
              consecutiveMinCount = 0;
            }
          } else {
            consecutiveMaxCount = 0;
            consecutiveMinCount = 0;
          }
        } catch (error) {
          console.log('Polling error:', error);
        }
      }, 1000); // Check every second
    };

    // Method 3: App state change detection (additional fallback)
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        // Reset counters when app becomes active
        volumeEventCount.current = 0;
      }
    };

    // Initialize all methods
    setupVolumeListener();
    setupPolling();
    
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      isActive = false;
      if (volumeSubscription && typeof volumeSubscription.remove === 'function') {
        volumeSubscription.remove();
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      appStateSubscription?.remove();
    };
  }, [incrementCount]);

  return { circleGlow };
};