// File: components/profile/PremiumCard.tsx
import React from 'react';
import { View } from 'react-native';
import { PremiumCardProps } from '../../types/profile';

const PremiumCard: React.FC<PremiumCardProps> = ({ children, style = {} }) => (
  <View
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: 24,
      padding: 20,
      borderWidth: 1,
      borderColor: 'rgba(255, 215, 0, 0.2)',
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      ...style,
    }}
  >
    {children}
  </View>
);

export default PremiumCard;