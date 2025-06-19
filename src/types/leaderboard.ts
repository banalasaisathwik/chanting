// File: types/leaderboard.ts
import { StackNavigationProp } from '@react-navigation/stack';
import { Animated } from 'react-native';

export interface LeaderUser {
  id: number;
  name: string;
  weeklyCount: number;
  totalCount: number;
  avatar: string;
  streak: number;
}

export interface CurrentUser {
  name: string;
  rank: number;
  weeklyCount: number;
  totalCount: number;
  avatar: string;
  streak: number;
}

export interface LeaderboardScreenProps {
  navigation: StackNavigationProp<any>;
}

export interface HeaderWithTabsProps {
  navigation: StackNavigationProp<any>;
  activeTab: 'radha' | 'krishnaya';
  onTabSwitch: (tab: 'radha' | 'krishnaya') => void;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  tabIndicatorAnim: Animated.Value;
}

export interface TopThreePodiumProps {
  leaders: LeaderUser[];
  fadeAnim: Animated.Value;
}

export interface LeaderboardItemProps {
  user: LeaderUser;
  rank: number;
  index: number;
  isCurrentUser?: boolean;
  activeTab: 'radha' | 'krishnaya';
}

export interface UserRankCardProps {
  currentUser: CurrentUser;
  userCardAnim: Animated.Value;
}

export interface GapIndicatorProps {
  currentUserRank: number;
}

export type TabType = 'radha' | 'krishnaya';