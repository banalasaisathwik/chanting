// File: components/chantMode/ModeCard.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ModeCardProps } from '../../types/chantMode';

const ModeCard: React.FC<ModeCardProps> = ({ mode, isSelected, onPress }) => {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(cardScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const gradientColors: [string, string] = isSelected 
    ? ['rgba(255, 193, 7, 0.2)', 'rgba(255, 152, 0, 0.1)']
    : mode.gradient;

  return (
    <Animated.View
      style={{
        transform: [{ scale: cardScale }],
        marginBottom: 16,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={gradientColors}
          style={{
            borderRadius: 20,
            padding: 24,
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Glow effect for selected */}
          {isSelected && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          )}
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <Text style={{ fontSize: 28 }}>{mode.icon}</Text>
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                color: '#ffffff',
                fontSize: 20,
                fontWeight: '700',
                marginBottom: 4,
                letterSpacing: 0.5,
              }}>
                {mode.title}
              </Text>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 15,
                fontWeight: '500',
                marginBottom: 8,
              }}>
                {mode.subtitle}
              </Text>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 13,
                lineHeight: 18,
              }}>
                {mode.description}
              </Text>
            </View>
            
            {isSelected && (
              <View style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#FFD700',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name="checkmark" size={20} color="#000" />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ModeCard;