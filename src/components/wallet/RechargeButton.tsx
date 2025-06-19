// File: components/wallet/RechargeButton.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RechargeButtonProps } from '../../types/wallet';

const RechargeButton: React.FC<RechargeButtonProps> = ({ 
  customAmount, 
  isProcessing, 
  onRecharge, 
  fadeAnim, 
  slideAnim 
}) => {
  const isDisabled = isProcessing || !customAmount || parseInt(customAmount) < 10;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={onRecharge}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={{
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        <LinearGradient
          colors={isProcessing 
            ? ['rgba(255, 215, 0, 0.5)', 'rgba(255, 152, 0, 0.5)']
            : ['#FFD700', '#FFA000']}
          style={{
            borderRadius: 20,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          {isProcessing ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Animated.View
                style={{
                  marginRight: 12,
                  transform: [{
                    rotate: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    })
                  }]
                }}
              >
                <Ionicons name="refresh" size={24} color="#000" />
              </Animated.View>
              <Text style={{
                color: '#000000',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
                Processing Sacred Payment...
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="card" size={24} color="#000" style={{ marginRight: 12 }} />
              <Text style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
                🙏 Recharge Now
              </Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RechargeButton;