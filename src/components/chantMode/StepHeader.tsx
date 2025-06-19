// File: components/chantMode/StepHeader.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { StepHeaderProps } from '../../types/chantMode';

const StepHeader: React.FC<StepHeaderProps> = ({
  editingSection,
  selectedMantra,
  selectedMode,
  fadeAnim,
  slideAnim,
}) => {
  const getStepText = () => {
    if (editingSection === 'mantra') {
      return 'Step 1: Select your preferred mantra';
    } else if (editingSection === 'mode') {
      return 'Step 2: Choose your chanting style';
    } else if (selectedMantra && selectedMode) {
      return 'Ready to begin your spiritual journey';
    } else {
      return 'Complete your selections to continue';
    }
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        alignItems: 'center',
        marginBottom: 40,
      }}
    >
      <Text style={{
        color: '#ffffff',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 1,
      }}>
        Choose Your Practice
      </Text>
      <View style={{
        height: 2,
        width: 60,
        backgroundColor: '#FFD700',
        marginBottom: 12,
        borderRadius: 1,
      }} />
      <Text style={{
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
      }}>
        {getStepText()}
      </Text>
    </Animated.View>
  );
};

export default StepHeader;