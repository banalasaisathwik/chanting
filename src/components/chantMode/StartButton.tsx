// File: components/chantMode/StartButton.tsx
import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StartButtonProps } from '../../types/chantMode';

const StartButton: React.FC<StartButtonProps> = ({
  isSelectionComplete,
  onPress,
  fadeAnim,
  buttonScale,
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: buttonScale }],
      }}
    >
      <TouchableOpacity
        onPress={isSelectionComplete ? onPress : undefined}
        activeOpacity={isSelectionComplete ? 0.9 : 1}
        disabled={!isSelectionComplete}
      >
        <LinearGradient
          colors={
            isSelectionComplete
              ? ['#FFD700', '#FFA000']
              : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 18,
            paddingHorizontal: 32,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: isSelectionComplete ? '#FFD700' : 'transparent',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: isSelectionComplete ? 0.4 : 0,
            shadowRadius: 12,
            elevation: isSelectionComplete ? 8 : 0,
            borderWidth: isSelectionComplete ? 0 : 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Text style={{
            color: isSelectionComplete ? '#000000' : 'rgba(255, 255, 255, 0.5)',
            fontSize: 20,
            fontWeight: '700',
            marginRight: 12,
            letterSpacing: 0.5,
          }}>
            {isSelectionComplete 
              ? 'Start Chanting' 
              : 'Complete Your Selection'
            }
          </Text>
          <Ionicons 
            name="arrow-forward" 
            size={24} 
            color={isSelectionComplete ? '#000' : 'rgba(255, 255, 255, 0.5)'} 
          />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StartButton;