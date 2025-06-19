// File: types/profile.ts
import { StackNavigationProp } from '@react-navigation/stack';

export interface UserData {
  name: string;
  email: string;
  totalChants: number;
  totalCycles: number;
  currentStreak: number;
  longestStreak: number;
  wallet: number;
  weeklyData: number[];
  weekLabels: string[];
}

export interface ProfileScreenProps {
  navigation: StackNavigationProp<any>;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  gradientColors: [string, string];
  iconColor?: string;
}

export interface PremiumCardProps {
  children: React.ReactNode;
  style?: any;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  index: number;
  fadeAnims: any[];
  slideAnims: any[];
}

export interface UserProfileHeaderProps {
  userData: UserData;
  navigation: StackNavigationProp<any>;
}

export interface StatsCardsProps {
  userData: UserData;
}

export interface ChartSectionProps {
  userData: UserData;
  chartVisible: boolean;
}

export interface WalletSectionProps {
  userData: UserData;
  onWalletPress: () => void;
}

export interface ContactSectionProps {
  onEmailPress: () => void;
  onWhatsAppPress: () => void;
}