// File: hooks/useBackHandlerWithExitModal.ts
import { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { UseBackHandlerWithExitModalReturn, SessionData } from '../types/chantingSession';
import { CYCLE_LENGTH } from '../constants/chantingConstants';
import { sendStats } from '~/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  try {
    const sessionStr = await AsyncStorage.getItem('session');
    if (!sessionStr) {
      console.warn('No session found');
      return;
    }

    const session = JSON.parse(sessionStr);
    const token = session.token;

    // ✅ Check balance first
    const balanceRes = await fetch('http://192.168.29.32:3000/api/balance', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!balanceRes.ok) {
      console.error('Failed to fetch balance');
      return;
    }

    const { balance } = await balanceRes.json();

    if (balance < 1) {
      alert('Insufficient balance. Please recharge your wallet.');
      return;
    }

    const sessionData: SessionData = {
      mantra,
      mode,
      finalCount: count,
      completedCycles: cycles,
      totalCounts: cycles * CYCLE_LENGTH + count,
      sessionDuration: Date.now(),
    };

    await sendStats(
      mantra,
      sessionData.totalCounts,
      cycles,
      token
    );

    console.log('Saving chanting session data:', sessionData);

    if (sound) {
      await sound.stopAsync();
    }

    setShowExitPopup(false);
    navigation.goBack();

  } catch (err) {
    console.error('Error during Save & Exit:', err);
  }
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
