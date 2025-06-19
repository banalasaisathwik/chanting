// File: components/chantingSession/GlowRippleEffect.tsx
import React from 'react';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlowRippleEffectProps } from '../../types/chantingSession';

const GlowRippleEffect: React.FC<GlowRippleEffectProps> = ({ rippleAnim, circleGlow }) => {
  return (
    <>
      {/* Ripple Effect */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: 160,
          borderWidth: 2,
          borderColor: '#FFD700',
          opacity: rippleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
          transform: [
            {
              scale: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.2],
              }),
            },
          ],
        }}
      />

      {/* Outer Glow Ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: 150,
          opacity: circleGlow,
        }}
      >
        <LinearGradient
          colors={['rgba(255, 215, 0, 0.3)', 'transparent', 'rgba(255, 215, 0, 0.2)']}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 150,
          }}
        />
      </Animated.View>
    </>
  );
};

export default GlowRippleEffect;