// File: constants/chantingConstants.ts
import { MantraData } from '../types/chantingSession';

export const CYCLE_LENGTH = 108;

export const mantraAudio: Record<string, any> = {
  radha: require('../../assets/audio/radhe.mp3'),
  krishna: require('../../assets/audio/radhe.mp3'),
  om: require('../../assets/audio/radhe.mp3'),
};

export const mantraNames: Record<string, MantraData> = {
  radha: { name: 'Radha Radha', sanskrit: 'राधा राधा' },
  krishna: { name: 'Krishnaya Vasudevaya', sanskrit: 'कृष्णाय वासुदेवाय' },
};

export const ANIMATION_DURATIONS = {
  PULSE: {
    UP: 80,
    DOWN: 120,
  },
  GLOW: {
    UP: 150,
    DOWN: 250,
  },
  RIPPLE: 600,
  CIRCLE_GLOW: 2000,
} as const;

export const ANIMATION_VALUES = {
  PULSE_SCALE: 1.05,
  SWIPE_THRESHOLD: 50,
  SWIPE_VISUAL_THRESHOLD: 20,
  MAX_SWIPE_SCALE: 0.05,
  VOLUME_DEBOUNCE: 300,
} as const;

export const AUDIO_CONFIG = {
  allowsRecordingIOS: false,
  staysActiveInBackground: true,
  playsInSilentModeIOS: true,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
  volume: 0.7,
} as const;