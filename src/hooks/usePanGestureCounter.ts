// File: hooks/usePanGestureCounter.ts
import { useRef } from 'react';
import { PanResponder, Animated } from 'react-native';
import { ANIMATION_VALUES } from '../constants/chantingConstants';

interface UsePanGestureCounterProps {
  pulseAnim: Animated.Value;
  onSwipeIncrement: () => void;
}

export const usePanGestureCounter = ({ pulseAnim, onSwipeIncrement }: UsePanGestureCounterProps) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        // Visual feedback during swipe - lighter effect
        if (gesture.dy < -ANIMATION_VALUES.SWIPE_VISUAL_THRESHOLD) {
          pulseAnim.setValue(1 + Math.min(Math.abs(gesture.dy) / 300, ANIMATION_VALUES.MAX_SWIPE_SCALE));
        }
      },
      onPanResponderRelease: (_, gesture) => {
        pulseAnim.setValue(1);
        if (gesture.dy < -ANIMATION_VALUES.SWIPE_THRESHOLD) {
          onSwipeIncrement();
        }
      },
    })
  ).current;

  return panResponder;
};