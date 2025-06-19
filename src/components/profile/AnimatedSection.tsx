// File: components/profile/AnimatedSection.tsx
import React from 'react';
import { Animated } from 'react-native';
import { AnimatedSectionProps } from '../../types/profile';

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  index, 
  fadeAnims, 
  slideAnims 
}) => (
  <Animated.View
    style={{
      opacity: fadeAnims[index],
      transform: [{ translateY: slideAnims[index] }],
    }}
  >
    {children}
  </Animated.View>
);

export default AnimatedSection;