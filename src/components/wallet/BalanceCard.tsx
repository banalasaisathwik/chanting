// File: components/wallet/BalanceCard.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BalanceCardProps } from '../../types/wallet';

const BalanceCard: React.FC<BalanceCardProps> = ({ 
  currentBalance, 
  fadeAnim, 
  slideAnim, 
  balanceScaleAnim 
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          { translateY: slideAnim },
          { scale: balanceScaleAnim }
        ],
        marginBottom: 32,
      }}
    >
      <LinearGradient
        colors={['#FFD700', '#FFA000']}
        style={{
          borderRadius: 24,
          padding: 32,
          alignItems: 'center',
          shadowColor: '#FFD700',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.4,
          shadowRadius: 24,
          elevation: 12,
        }}
      >
        <Text style={{
          color: 'rgba(0, 0, 0, 0.7)',
          fontSize: 16,
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: 1,
          marginBottom: 8,
        }}>
          🙏 Current Balance
        </Text>
        
        <Text style={{
          color: '#000000',
          fontSize: 48,
          fontWeight: 'bold',
          marginBottom: 8,
        }}>
          ₹{currentBalance.toLocaleString()}
        </Text>
        
        <View style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
        }}>
          <Text style={{
            color: 'rgba(0, 0, 0, 0.7)',
            fontSize: 14,
            fontWeight: '600',
          }}>
            ✨ Ready for spiritual journey
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default BalanceCard;