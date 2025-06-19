// File: hooks/useHapticCounter.ts
import { useState, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CYCLE_LENGTH, ANIMATION_DURATIONS, ANIMATION_VALUES } from '../constants/chantingConstants';
import { UseHapticCounterReturn } from '../types/chantingSession';

export const useHapticCounter = (): UseHapticCounterReturn => {
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  const incrementCount = async () => {
    // Enhanced haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Visual feedback animations
    Animated.parallel([
      // Quick pulse animation
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: ANIMATION_VALUES.PULSE_SCALE,
          duration: ANIMATION_DURATIONS.PULSE.UP,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: ANIMATION_DURATIONS.PULSE.DOWN,
          useNativeDriver: true,
        }),
      ]),
      // Glow effect
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: ANIMATION_DURATIONS.GLOW.UP,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: ANIMATION_DURATIONS.GLOW.DOWN,
          useNativeDriver: false,
        }),
      ]),
      // Ripple effect
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: ANIMATION_DURATIONS.RIPPLE,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setCount(prev => {
      const newCount = prev + 1;
      if (newCount >= CYCLE_LENGTH) {
        setCycles(c => c + 1);
        // Special celebration for cycle completion
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        return 0;
      }
      return newCount;
    });
  };

  return {
    count,
    cycles,
    incrementCount,
    pulseAnim,
    glowAnim,
    rippleAnim,
  };
};