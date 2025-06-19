// File: components/profile/AboutSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import PremiumCard from './PremiumCard';

const AboutSection: React.FC = () => {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}>
        🙏 About Us
      </Text>

      <PremiumCard>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
            <Text style={{ fontSize: 32 }}>🕉️</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 4,
              }}>
              Inspired by Premanand Maharaj
            </Text>
            <Text
              style={{
                color: '#FFD700',
                fontSize: 16,
                fontWeight: '600',
                fontStyle: 'italic',
              }}>
              "Radha Radha" - Path to Divine Love ❤️
            </Text>
          </View>
        </View>

        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 16,
            lineHeight: 26,
            textAlign: 'justify',
          }}>
          I started chanting after watching a YouTube video of Premanand Maharaj ji, and I
          absolutely loved it. However, I didn’t have any way to keep track of my chant count. I
          felt there should be something that helps us track it easily. I didn’t want to rely on
          external physical devices—our phone is the best option since it’s always with us. That’s
          when I thought of building an app where you can count your chants using the volume
          buttons, or simply by swiping or tapping on the screen.
        </Text>
      </PremiumCard>
    </View>
  );
};

export default AboutSection;
