// File: components/wallet/SupportMessage.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { SupportMessageProps } from '../../types/wallet';

const SupportMessage: React.FC<SupportMessageProps> = () => {
  return (
    <View style={{
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    }}>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 8,
      }}>
        🕉️ "Every contribution spreads divine love"
      </Text>
      <Text style={{
        color: '#FFD700',
        fontSize: 14,
        fontWeight: '600',
      }}>
        - Premanand Maharaj
      </Text>
    </View>
  );
};

export default SupportMessage;