// File: utils/animationUtils.ts
import { Animated } from 'react-native';

export const createScaleAnimation = (
  scale: Animated.Value,
  toValue: number,
  duration: number = 200
): Animated.CompositeAnimation => {
  return Animated.spring(scale, {
    toValue,
    useNativeDriver: true,
    tension: 150,
    friction: 8,
  });
};

export const createStaggeredFadeIn = (
  opacity: Animated.Value,
  delay: number = 0,
  duration: number = 600
): Animated.CompositeAnimation => {
  return Animated.timing(opacity, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
  });
};

export const createParallelEntranceAnimation = (
  animations: {
    fadeAnim: Animated.Value;
    slideAnim: Animated.Value;
    scaleAnim: Animated.Value;
  }
): Animated.CompositeAnimation => {
  return Animated.parallel([
    Animated.timing(animations.fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.timing(animations.slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.timing(animations.scaleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }),
  ]);
};

export const ANIMATION_CONSTANTS = {
  PRESS_SCALE: {
    IN: 0.96,
    OUT: 1,
    BUTTON_IN: 0.98,
    BUTTON_OUT: 1,
  },
  STAGGER_DELAY: 150,
  SPRING_CONFIG: {
    tension: 150,
    friction: 8,
  },
} as const;