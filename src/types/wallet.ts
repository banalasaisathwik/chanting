// File: types/wallet.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';

export interface WalletScreenProps {
  navigation: StackNavigationProp<any>;
}

export interface HeaderProps {
  navigation: StackNavigationProp<any>;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export interface BalanceCardProps {
  currentBalance: number;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  balanceScaleAnim: Animated.Value;
}

export interface InfoNoteProps {
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export interface CustomAmountInputProps {
  customAmount: string;
  onAmountChange: (text: string) => void;
  onClear: () => void;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export interface QuickAmountButtonProps {
  amount: number;
  isSelected: boolean;
  onPress: (amount: number) => void;
}

export interface QuickAmountGridProps {
  quickAmounts: number[];
  selectedAmount: number | null;
  onAmountPress: (amount: number) => void;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export interface RechargeButtonProps {
  customAmount: string;
  isProcessing: boolean;
  onRecharge: () => void;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
}

export interface SupportMessageProps {
  // No props needed for static content
}