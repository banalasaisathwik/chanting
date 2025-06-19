// File: screens/LeaderboardScreen.tsx (Ultra Clean Version)
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './StarBackground';

// Types and Data
import { LeaderboardScreenProps, TabType } from '../types/leaderboard';
import { radhaWeeklyLeaders, krishnayaWeeklyLeaders, currentUser } from '../data/leaderboardData';

// Components
import {
  HeaderWithTabs,
  TopThreePodium,
  LeaderboardItem,
  GapIndicator,
  UserRankCard,
} from '../components/leaderboard';

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ navigation }) => {
  // State
  const [activeTab, setActiveTab] = useState<TabType>('radha');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
  const userCardAnim = useRef(new Animated.Value(0)).current;

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.spring(userCardAnim, { toValue: 1, useNativeDriver: true }).start();
    }, 1000);
  }, []);

  // Tab switching
  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    Animated.spring(tabIndicatorAnim, {
      toValue: tab === 'radha' ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  // Current data
  const currentLeaders = activeTab === 'radha' ? radhaWeeklyLeaders : krishnayaWeeklyLeaders;

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderWithTabs
          navigation={navigation}
          activeTab={activeTab}
          onTabSwitch={switchTab}
          fadeAnim={fadeAnim}
          slideAnim={slideAnim}
          tabIndicatorAnim={tabIndicatorAnim}
        />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <TopThreePodium leaders={currentLeaders} fadeAnim={fadeAnim} />

          <View style={{ marginTop: 32 }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 16,
            }}>
              📊 Ranks 4-10
            </Text>
            
            {currentLeaders.slice(3).map((user, index) => (
              <LeaderboardItem
                key={`${activeTab}-${user.id}`}
                user={user}
                rank={index + 4}
                index={index}
                activeTab={activeTab}
              />
            ))}
          </View>

          <GapIndicator currentUserRank={currentUser.rank} />
        </ScrollView>

        <UserRankCard currentUser={currentUser} userCardAnim={userCardAnim} />
      </SafeAreaView>
    </StarBackground>
  );
};

export default LeaderboardScreen;