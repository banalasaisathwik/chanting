// File: hooks/useMantraAudio.ts
import { useState, useEffect } from 'react';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { mantraAudio, AUDIO_CONFIG } from '../constants/chantingConstants';
import { UseMantraAudioReturn } from '../types/chantingSession';

export const useMantraAudio = (mantra: string, mode: 'guided' | 'own'): UseMantraAudioReturn => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(mode === 'guided');

  // Initialize audio
  useEffect(() => {
    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          ...AUDIO_CONFIG,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        });

        const { sound: audioSound } = await Audio.Sound.createAsync(
          mantraAudio[mantra],
          { 
            isLooping: true,
            volume: AUDIO_CONFIG.volume,
          }
        );
        setSound(audioSound);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [mantra]);

  // Handle guided mode audio playback
  useEffect(() => {
    if (mode === 'guided' && sound && isPlaying) {
      sound.playAsync();
    } else if (sound) {
      sound.pauseAsync();
    }

    return () => {
      if (sound) {
        sound.stopAsync();
      }
    };
  }, [mode, sound, isPlaying]);

  const toggleAudio = async () => {
    if (mode === 'guided' && sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  return {
    sound,
    isPlaying,
    toggleAudio,
  };
};