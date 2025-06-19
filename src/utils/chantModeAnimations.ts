// File: utils/chantModeAnimations.ts
import { Animated } from 'react-native';

export const ANIMATION_TIMINGS = {
  ENTRY: {
    FADE: 800,
    SLIDE: 600,
    SCALE: 500,
  },
  SECTION_TRANSITION: 600,
  MODE_SECTION_QUICK: 400,
  PRESS_SPRING: 200,
} as const;

export const ANIMATION_VALUES = {
  PRESS_SCALE: {
    IN: 0.98,
    OUT: 1,
  },
  INITIAL_SCALE: 0.95,
  SLIDE_DISTANCE: 30,
} as const;

export const createParallelEntryAnimation = (animations: {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  buttonScale: Animated.Value;
}): Animated.CompositeAnimation => {
  return Animated.parallel([
    Animated.timing(animations.fadeAnim, {
      toValue: 1,
      duration: ANIMATION_TIMINGS.ENTRY.FADE,
      useNativeDriver: true,
    }),
    Animated.timing(animations.slideAnim, {
      toValue: 0,
      duration: ANIMATION_TIMINGS.ENTRY.SLIDE,
      useNativeDriver: true,
    }),
    Animated.timing(animations.buttonScale, {
      toValue: 1,
      duration: ANIMATION_TIMINGS.ENTRY.SCALE,
      useNativeDriver: true,
    }),
  ]);
};

export const createSectionTransitionAnimation = (
  animValue: Animated.Value,
  duration: number = ANIMATION_TIMINGS.SECTION_TRANSITION
): Animated.CompositeAnimation => {
  return Animated.timing(animValue, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const createPressAnimation = (
  scale: Animated.Value,
  toValue: number = ANIMATION_VALUES.PRESS_SCALE.IN
): Animated.CompositeAnimation => {
  return Animated.spring(scale, {
    toValue,
    useNativeDriver: true,
    tension: 150,
    friction: 8,
  });
};