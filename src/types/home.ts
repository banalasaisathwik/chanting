// File: types/home.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';

export interface HomeScreenProps {
  navigation: StackNavigationProp<any>;
}

export interface Feature {
  icon: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
  description: string;
}

export interface HeaderBannerProps {
  scaleAnim: Animated.Value;
}

export interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export interface PremiumButtonProps {
  onPress: () => void;
  icon: string;
  text: string;
  variant?: 'primary' | 'secondary';
  colors?: [string, string];
}

export interface DividerWithTextProps {
  text: string;
}