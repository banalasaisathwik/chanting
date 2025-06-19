// File: types/chantingSession.ts
import { RouteProp } from '@react-navigation/native';
import { Animated } from 'react-native';
import { Audio } from 'expo-av';

export type RouteParams = {
  mantra: string;
  mode: 'guided' | 'own';
};

export type ChantingSessionScreenRouteProp = RouteProp<{ Screen: RouteParams }, 'Screen'>;

export interface MantraData {
  name: string;
  sanskrit: string;
}

export interface SessionData {
  mantra: string;
  mode: 'guided' | 'own';
  finalCount: number;
  completedCycles: number;
  totalCounts: number;
  sessionDuration: number;
}

export interface CircularCounterProps {
  count: number;
  cycles: number;
  progress: number;
  onPress: () => void;
  pulseAnim: Animated.Value;
  glowAnim: Animated.Value;
  rippleAnim: Animated.Value;
  circleGlow: Animated.Value;
}

export interface AudioControlButtonProps {
  isPlaying: boolean;
  onPress: () => void;
  mode: 'guided' | 'own';
}

export interface ExitConfirmationModalProps {
  visible: boolean;
  count: number;
  cycles: number;
  onSaveAndExit: () => void;
  onStayInSession: () => void;
}

export interface InstructionBoxProps {
  mode: 'guided' | 'own';
}

export interface SessionHeaderProps {
  mantraData: MantraData;
  onBackPress: () => void;
}

export interface GlowRippleEffectProps {
  rippleAnim: Animated.Value;
  circleGlow: Animated.Value;
}

export interface UseMantraAudioReturn {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  toggleAudio: () => Promise<void>;
}

export interface UseHapticCounterReturn {
  count: number;
  cycles: number;
  incrementCount: () => Promise<void>;
  pulseAnim: Animated.Value;
  glowAnim: Animated.Value;
  rippleAnim: Animated.Value;
}

export interface UseBackHandlerWithExitModalReturn {
  showExitPopup: boolean;
  handleBackPress: () => void;
  handleSaveAndExit: () => Promise<void>;
  handleStayInSession: () => void;
}