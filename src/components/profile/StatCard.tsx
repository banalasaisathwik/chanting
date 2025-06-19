// File: components/profile/StatCard.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatCardProps } from '../../types/profile';

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  gradientColors,
  iconColor = '#FFD700'
}) => {
  const cardScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(cardScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        marginHorizontal: 6,
        transform: [{ scale: cardScale }],
      }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={gradientColors}
          style={{
            height: 140,
            borderRadius: 20,
            padding: 16,
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: 'rgba(255, 215, 0, 0.3)',
            shadowColor: iconColor,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{
              width: 48,
              height: 48,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons name={icon as any} size={24} color={iconColor} />
            </View>
          </View>
          
          <View>
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: 12, 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 4,
            }}>
              {title}
            </Text>
            <Text style={{ 
              color: '#FFFFFF', 
              fontSize: 24, 
              fontWeight: 'bold',
              marginBottom: 2,
            }}>
              {value}
            </Text>
            {subtitle && (
              <Text style={{ 
                color: iconColor, 
                fontSize: 11, 
                fontWeight: '600',
              }}>
                {subtitle}
              </Text>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default StatCard;