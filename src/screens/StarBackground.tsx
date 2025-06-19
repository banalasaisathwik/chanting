import React, { useMemo, useEffect, useRef } from 'react';
import { View, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

type StarBackgroundProps = {
  children?: React.ReactNode;
  starCount?: number;
  flyingStarCount?: number;
};

type TwinklingStarProps = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
};

type FlyingStarProps = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

const StarBackground = ({ 
  children, 
  starCount = 80, 
  flyingStarCount = 12 
}: StarBackgroundProps) => {
  // Generate static twinkling stars
  const stars = useMemo(() => 
    Array.from({ length: starCount }, (_, i) => ({
      id: i,
      left: Math.random() * width,
      top: Math.random() * height,
      opacity: Math.random() * 0.9 + 0.1,
      size: Math.random() * 3 + 0.5,
      animationDelay: Math.random() * 3000,
    })), [starCount]
  );

  // Generate flying stars with different trajectories
  const flyingStars = useMemo(() => 
    Array.from({ length: flyingStarCount }, (_, i) => {
      const direction = Math.random();
      let startX, startY, endX, endY;
      
      if (direction < 0.25) {
        // Left to right
        startX = -20;
        startY = Math.random() * height;
        endX = width + 20;
        endY = startY + (Math.random() - 0.5) * 200;
      } else if (direction < 0.5) {
        // Right to left
        startX = width + 20;
        startY = Math.random() * height;
        endX = -20;
        endY = startY + (Math.random() - 0.5) * 200;
      } else if (direction < 0.75) {
        // Top to bottom diagonal
        startX = Math.random() * width;
        startY = -20;
        endX = startX + (Math.random() - 0.5) * 300;
        endY = height + 20;
      } else {
        // Bottom to top diagonal
        startX = Math.random() * width;
        startY = height + 20;
        endX = startX + (Math.random() - 0.5) * 300;
        endY = -20;
      }

      return {
        id: i,
        startX,
        startY,
        endX,
        endY,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 8000 + 6000, // 6-14 seconds
        delay: Math.random() * 5000,
      };
    }), [flyingStarCount]
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* Enhanced gradient overlay for cosmic feel */}
      <LinearGradient
        colors={[
          'rgba(25,25,50,0.4)', 
          'rgba(15,15,35,0.6)', 
          'rgba(0,0,0,1)'
        ]}
        locations={[0, 0.5, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      
      {/* Static twinkling stars */}
      {stars.map((star) => (
        <TwinklingStar
          key={`static-${star.id}`}
          left={star.left}
          top={star.top}
          size={star.size}
          opacity={star.opacity}
          delay={star.animationDelay}
        />
      ))}

      {/* Flying stars */}
      {flyingStars.map((star) => (
        <FlyingStar
          key={`flying-${star.id}`}
          id={star.id}
          startX={star.startX}
          startY={star.startY}
          endX={star.endX}
          endY={star.endY}
          size={star.size}
          opacity={star.opacity}
          duration={star.duration}
          delay={star.delay}
        />
      ))}
      
      {/* Content */}
      <View style={{ flex: 1, zIndex: 10 }}>
        {children}
      </View>
    </View>
  );
};

// Individual twinkling star component (static)
const TwinklingStar: React.FC<TwinklingStarProps> = ({ 
  left, 
  top, 
  size, 
  opacity, 
  delay 
}) => {
  const twinkleAnimation = useMemo(() => new Animated.Value(opacity), [opacity]);

  useEffect(() => {
    const startTwinkling = (): void => {
      Animated.sequence([
        Animated.timing(twinkleAnimation, {
          toValue: 0.1,
          duration: 2000 + Math.random() * 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnimation, {
          toValue: opacity,
          duration: 2000 + Math.random() * 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => startTwinkling());
    };

    const timeout = setTimeout(startTwinkling, delay);
    return () => clearTimeout(timeout);
  }, [twinkleAnimation, opacity, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        backgroundColor: '#ffffff',
        borderRadius: size / 2,
        opacity: twinkleAnimation,
        shadowColor: '#ffffff',
        shadowOpacity: 0.8,
        shadowRadius: size * 2,
        elevation: 5,
      }}
    />
  );
};

// Flying star component with movement and twinkling
const FlyingStar: React.FC<FlyingStarProps> = ({
  id,
  startX,
  startY,
  endX,
  endY,
  size,
  opacity,
  duration,
  delay,
}) => {
  const translateX = useRef(new Animated.Value(startX)).current;
  const translateY = useRef(new Animated.Value(startY)).current;
  const twinkleOpacity = useRef(new Animated.Value(opacity)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startFlying = (): void => {
      // Reset position
      translateX.setValue(startX);
      translateY.setValue(startY);
      
      // Flying animation
      const flyingAnimation = Animated.parallel([
        Animated.timing(translateX, {
          toValue: endX,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: endY,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Add subtle scaling while flying
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.5,
            duration: duration / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: duration / 2,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
      ]);

      flyingAnimation.start(() => {
        // Restart after a random delay
        setTimeout(startFlying, Math.random() * 3000 + 1000);
      });
    };

    // Twinkling animation while flying
    const startTwinkling = (): void => {
      Animated.sequence([
        Animated.timing(twinkleOpacity, {
          toValue: opacity * 0.3,
          duration: 800 + Math.random() * 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(twinkleOpacity, {
          toValue: opacity,
          duration: 800 + Math.random() * 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => startTwinkling());
    };

    const flyingTimeout = setTimeout(startFlying, delay);
    const twinklingTimeout = setTimeout(startTwinkling, delay + Math.random() * 1000);

    return () => {
      clearTimeout(flyingTimeout);
      clearTimeout(twinklingTimeout);
    };
  }, [translateX, translateY, twinkleOpacity, scale, startX, startY, endX, endY, duration, delay, opacity]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transform: [
          { translateX },
          { translateY },
          { scale },
        ],
        opacity: twinkleOpacity,
        zIndex: 5,
      }}
    >
      {/* Star with glow effect */}
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: '#ffffff',
          borderRadius: size / 2,
          shadowColor: '#ffffff',
          shadowOpacity: 1,
          shadowRadius: size * 3,
          elevation: 8,
        }}
      />
      
      {/* Additional glow layers for flying stars */}
      <View
        style={{
          position: 'absolute',
          top: -size / 2,
          left: -size / 2,
          width: size * 2,
          height: size * 2,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: size,
        }}
      />
      
      {/* Outer glow */}
      <View
        style={{
          position: 'absolute',
          top: -size,
          left: -size,
          width: size * 3,
          height: size * 3,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: size * 1.5,
        }}
      />
    </Animated.View>
  );
};

export default StarBackground;