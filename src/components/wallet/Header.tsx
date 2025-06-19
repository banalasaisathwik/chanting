// File: components/wallet/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderProps } from '../../types/wallet';

const Header: React.FC<HeaderProps> = ({ navigation, fadeAnim, slideAnim }) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
      }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 44,
            height: 44,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={{
          color: '#FFFFFF',
          fontSize: 24,
          fontWeight: 'bold',
        }}>
          💰 Sacred Wallet
        </Text>

        <View style={{ width: 44 }} />
      </View>
    </Animated.View>
  );
};

export default Header;