// File: screens/ChantingSessionScreen.tsx (Ultra Clean)
import React from 'react';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import StarBackground from './StarBackground';

// Types and Constants
import { ChantingSessionScreenRouteProp } from '../types/chantingSession';
import { mantraNames, CYCLE_LENGTH } from '../constants/chantingConstants';

// Hooks
import {
  useMantraAudio,
  useHapticCounter,
  useBackHandlerWithExitModal,
  usePanGestureCounter,
  useContinuousAnimations,
} from '../hooks';

// Components
import {
  SessionHeader,
  CircularCounter,
  AudioControlButton,
  InstructionBox,
  ExitConfirmationModal,
} from '../components/chantingSession';

const ChantingSessionScreen: React.FC = () => {
  const route = useRoute<ChantingSessionScreenRouteProp>();
  const { mantra, mode } = route.params;

  // Business logic hooks
  const { count, cycles, incrementCount, pulseAnim, glowAnim, rippleAnim } = useHapticCounter();
  const { sound, isPlaying, toggleAudio } = useMantraAudio(mantra, mode);
  const { circleGlow } = useContinuousAnimations(incrementCount);
  
  const { showExitPopup, handleBackPress, handleSaveAndExit, handleStayInSession } = 
    useBackHandlerWithExitModal({ sound, count, cycles, mantra, mode });

  const panResponder = usePanGestureCounter({ pulseAnim, onSwipeIncrement: incrementCount });

  // Computed values
  const progress = (count / CYCLE_LENGTH) * 100;
  const mantraData = mantraNames[mantra];

  return (
    <StarBackground>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        <SessionHeader mantraData={mantraData} onBackPress={handleBackPress} />

        <CircularCounter
          count={count}
          cycles={cycles}
          progress={progress}
          onPress={incrementCount}
          pulseAnim={pulseAnim}
          glowAnim={glowAnim}
          rippleAnim={rippleAnim}
          circleGlow={circleGlow}
        />

        <View style={{ paddingHorizontal: 24, paddingBottom: 40, alignItems: 'center' }}>
          <AudioControlButton isPlaying={isPlaying} onPress={toggleAudio} mode={mode} />
          <InstructionBox mode={mode} />
        </View>

        <ExitConfirmationModal
          visible={showExitPopup}
          count={count}
          cycles={cycles}
          onSaveAndExit={handleSaveAndExit}
          onStayInSession={handleStayInSession}
        />
      </View>
    </StarBackground>
  );
};

export default ChantingSessionScreen;