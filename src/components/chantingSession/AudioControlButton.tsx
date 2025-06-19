// File: components/chantingSession/AudioControlButton.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AudioControlButtonProps } from '../../types/chantingSession';

const AudioControlButton: React.FC<AudioControlButtonProps> = ({ isPlaying, onPress, mode }) => {
  if (mode !== 'guided') return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginBottom: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Ionicons 
        name={isPlaying ? 'pause' : 'play'} 
        size={20} 
        color="#FFD700" 
      />
      <Text style={{
        color: '#FFD700',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
      }}>
        {isPlaying ? 'Pause Audio' : 'Play Audio'}
      </Text>
    </TouchableOpacity>
  );
};

export default AudioControlButton;