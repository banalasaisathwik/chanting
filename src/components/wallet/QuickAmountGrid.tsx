// File: components/wallet/QuickAmountGrid.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import QuickAmountButton from './QuickAmountButton';
import { QuickAmountGridProps } from '../../types/wallet';

const QuickAmountGrid: React.FC<QuickAmountGridProps> = ({ 
  quickAmounts, 
  selectedAmount, 
  onAmountPress, 
  fadeAnim, 
  slideAnim 
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 32,
      }}
    >
      <Text style={{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      }}>
        ⚡ Quick Recharge
      </Text>
      
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
        marginBottom: 16,
      }}>
        {quickAmounts.slice(0, 3).map((amount) => (
          <QuickAmountButton 
            key={amount} 
            amount={amount}
            isSelected={selectedAmount === amount}
            onPress={onAmountPress}
          />
        ))}
      </View>
      
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
      }}>
        {quickAmounts.slice(3).map((amount) => (
          <QuickAmountButton 
            key={amount} 
            amount={amount}
            isSelected={selectedAmount === amount}
            onPress={onAmountPress}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default QuickAmountGrid;