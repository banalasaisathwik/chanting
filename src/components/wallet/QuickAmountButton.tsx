// File: components/wallet/QuickAmountButton.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuickAmountButtonProps } from '../../types/wallet';

const QuickAmountButton: React.FC<QuickAmountButtonProps> = ({ 
  amount, 
  isSelected, 
  onPress 
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(amount)}
      activeOpacity={0.8}
      style={{ flex: 1, marginHorizontal: 4 }}
    >
      <LinearGradient
        colors={isSelected 
          ? ['#FFD700', '#FFA000'] 
          : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 8,
          borderRadius: 16,
          alignItems: 'center',
          borderWidth: isSelected ? 2 : 1,
          borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
          shadowColor: isSelected ? '#FFD700' : '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isSelected ? 0.3 : 0.1,
          shadowRadius: 8,
          elevation: isSelected ? 6 : 2,
        }}
      >
        <Text style={{
          color: isSelected ? '#000000' : '#FFFFFF',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
          +₹{amount}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default QuickAmountButton;