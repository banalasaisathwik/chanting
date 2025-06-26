// File: components/chantingSession/InstructionBox.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { InstructionBoxProps } from '../../types/chantingSession';

const InstructionBox: React.FC<InstructionBoxProps> = ({ mode }) => {
  return (
    <View style={{
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    }}>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: 0.5,
      }}>
        🙏 Tap circle • Swipe up to count
      </Text>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
        letterSpacing: 0.5,
      }}>
        Each cycle completes at 108 counts
      </Text>
     
  
    </View>
  );
};

export default InstructionBox;