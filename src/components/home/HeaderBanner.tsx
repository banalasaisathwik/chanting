// File: components/home/HeaderBanner.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { HeaderBannerProps } from '../../types/home';

const HeaderBanner: React.FC<HeaderBannerProps> = ({ scaleAnim }) => {
  return (
    <Animated.View 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 40,
        transform: [{ scale: scaleAnim }]
      }}
    >
      <Text style={{ fontSize: 40, marginRight: 12 }}>🕉️</Text>
      <View>
        <Text style={{ 
          color: '#ffffff', 
          fontSize: 28, 
          fontWeight: '300',
          letterSpacing: 1
        }}>
          Chanting App
        </Text>
        <View 
          style={{
            height: 2,
            backgroundColor: '#FFD700',
            marginTop: 4,
            borderRadius: 1
          }}
        />
      </View>
    </Animated.View>
  );
};

export default HeaderBanner;