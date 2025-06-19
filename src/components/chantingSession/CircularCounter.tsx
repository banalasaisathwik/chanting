// File: components/chantingSession/CircularCounter.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { CircularCounterProps } from '../../types/chantingSession';
import { CYCLE_LENGTH } from '../../constants/chantingConstants';
import GlowRippleEffect from './GlowRippleEffect';

const CircularCounter: React.FC<CircularCounterProps> = ({
  count,
  cycles,
  progress,
  onPress,
  pulseAnim,
  glowAnim,
  rippleAnim,
  circleGlow,
}) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    }}>
      <GlowRippleEffect rippleAnim={rippleAnim} circleGlow={circleGlow} />

      {/* Main Circle Container */}
      <View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          style={{
            width: 280,
            height: 280,
            borderRadius: 140,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
          >
            <AnimatedCircularProgress
              size={280}
              width={8}
              fill={progress}
              tintColor="#FFD700"
              backgroundColor="rgba(255, 255, 255, 0.1)"
              rotation={0}
              lineCap="round"
              backgroundWidth={6}
              style={{
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 10,
                elevation: 8,
              }}
            />
          </Animated.View>

          {/* Numbers Container */}
          <View style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{ alignItems: 'center' }}>
              {/* Main Count */}
              <View style={{ alignItems: 'center' }}>
                <LinearGradient
                  colors={['#FFD700', '#FFA000']}
                  style={{
                    borderRadius: 60,
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    minWidth: 120,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    color: '#000000',
                    fontSize: 52,
                    fontWeight: '700',
                    textAlign: 'center',
                    letterSpacing: 2,
                  }}>
                    {count}
                  </Text>
                </LinearGradient>
              </View>

              {/* Progress Text */}
              <Text style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 16,
                marginTop: 16,
                letterSpacing: 1,
              }}>
                {count} / {CYCLE_LENGTH}
              </Text>

              {/* Cycles Counter */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                paddingHorizontal: 16,
                paddingVertical: 6,
                backgroundColor: 'rgba(255, 215, 0, 0.15)',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(255, 215, 0, 0.3)',
              }}>
                <Text style={{
                  color: '#FFD700',
                  fontSize: 16,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                }}>
                  Cycles: {cycles}
                </Text>
              </View>
            </View>
          </View>

          {/* Active Glow Overlay */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 280,
              height: 280,
              borderRadius: 140,
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              opacity: glowAnim,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircularCounter;