// File: types/chantMode.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';

export interface ChantModeScreenProps {
  navigation: StackNavigationProp<any>;
}

export interface Mantra {
  id: string;
  name: string;
  description: string;
  sanskrit: string;
  color: [string, string];
}

export interface Mode {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  gradient: [string, string];
}

export interface MantraItemProps {
  mantra: Mantra;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export interface ModeCardProps {
  mode: Mode;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}

export interface SummaryCardProps {
  title: string;
  selectedItem: Mantra | Mode;
  icon: string;
  onEdit: () => void;
  type: 'mantra' | 'mode';
}

export interface StartButtonProps {
  isSelectionComplete: boolean;
  onPress: () => void;
  fadeAnim: Animated.Value;
  buttonScale: Animated.Value;
}

export interface StepHeaderProps {
  editingSection: 'mantra' | 'mode' | null;
  selectedMantra: string;
  selectedMode: string;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export type EditingSection = 'mantra' | 'mode' | null;