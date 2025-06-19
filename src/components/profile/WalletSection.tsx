// File: components/profile/WalletSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WalletSectionProps } from '../../types/profile';

const WalletSection: React.FC<WalletSectionProps> = ({ userData, onWalletPress }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <TouchableOpacity
        onPress={onWalletPress}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['#FFD700', '#FFA000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            padding: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.5,
            shadowRadius: 24,
            elevation: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ 
              color: 'rgba(0, 0, 0, 0.7)', 
              fontSize: 14, 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              💰 WALLET BALANCE
            </Text>
            <Text style={{ 
              color: '#000000', 
              fontSize: 32, 
              fontWeight: 'bold',
              marginVertical: 4,
            }}>
              ₹{userData.wallet}
            </Text>
            <Text style={{ 
              color: 'rgba(0, 0, 0, 0.6)', 
              fontSize: 16,
            }}>
              Tap to manage your recharge
            </Text>
          </View>
          
          <View style={{
            width: 72,
            height: 72,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Ionicons name="wallet" size={36} color="#000" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default WalletSection;