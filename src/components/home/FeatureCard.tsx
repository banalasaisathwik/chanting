// File: components/home/FeatureCard.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FeatureCardProps } from '../../types/home';

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const cardScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered card animation
    Animated.timing(cardOpacity, {
      toValue: 1,
      duration: 600,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(cardScale, {
      toValue: 0.96,
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
        opacity: cardOpacity,
        transform: [{ scale: cardScale }],
      }}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={{
          width: '100%',
          marginBottom: 20,
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={feature.gradient}
          style={{
            padding: 28,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Subtle inner glow */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          />
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 48, 
              marginRight: 20
            }}>
              {feature.icon}
            </Text>
            
            <View style={{ flex: 1 }}>
              <Text style={{ 
                color: '#ffffff', 
                fontSize: 22, 
                fontWeight: '700', 
                marginBottom: 4,
                letterSpacing: 0.5
              }}>
                {feature.title}
              </Text>
              
              <Text style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 8
              }}>
                {feature.subtitle}
              </Text>
            </View>
          </View>
          
          <Text style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: 15, 
            lineHeight: 22,
            fontWeight: '400',
            textAlign: 'left'
          }}>
            {feature.description}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FeatureCard;