// File: hooks/useBackHandlerWithExitModal.ts
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { UseBackHandlerWithExitModalReturn, SessionData } from '../types/chantingSession';
import { CYCLE_LENGTH } from '../constants/chantingConstants';

interface UseBackHandlerWithExitModalProps {
  sound: Audio.Sound | null;
  count: number;
  cycles: number;
  mantra: string;
  mode: 'guided' | 'own';
}

export const useBackHandlerWithExitModal = ({
  sound,
  count,
  cycles,
  mantra,
  mode,
}: UseBackHandlerWithExitModalProps): UseBackHandlerWithExitModalReturn => {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const navigation = useNavigation();

  // Handle back button press to show exit confirmation
  useEffect(() => {
    const handleBackPress = () => {
      setShowExitPopup(true);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    setShowExitPopup(true);
  };

  const handleSaveAndExit = async () => {
    const sessionData: SessionData = {
      mantra,
      mode,
      finalCount: count,
      completedCycles: cycles,
      totalCounts: cycles * CYCLE_LENGTH + count,
      sessionDuration: Date.now(), // You can track actual session time
    };

    console.log('Saving chanting session data:', sessionData);
    
    // Close popup and navigate back
    setShowExitPopup(false);
    if (sound) {
      await sound.stopAsync();
    }
    navigation.goBack();
  };

  const handleStayInSession = () => {
    setShowExitPopup(false);
  };

  return {
    showExitPopup,
    handleBackPress,
    handleSaveAndExit,
    handleStayInSession,
  };
};