// File: components/home/PremiumButton.tsx
import React, { useRef } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumButtonProps } from '../../types/home';

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  disabled,
  onPress, 
  icon, 
  text, 
  variant = 'primary',
  colors = ['#3B82F6', '#1D4ED8']
}) => {
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={{ marginBottom: 16 }}
        disabled={disabled}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors[0],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Ionicons 
            name={icon as any} 
            size={22} 
            color="white" 
            style={{ marginRight: 12 }} 
          />
          <Text style={{ 
            color: 'white', 
            fontSize: 18, 
            fontWeight: '600',
            letterSpacing: 0.5
          }}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PremiumButton;