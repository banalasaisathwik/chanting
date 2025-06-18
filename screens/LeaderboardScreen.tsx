// File: screens/LeaderboardScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StarBackground from './StarBackground';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

// Sample weekly leaderboard data
const radhaWeeklyLeaders = [
  { id: 1, name: 'Priya Devotee', weeklyCount: 1240, totalCount: 15420, avatar: '🌸', streak: 7 },
  { id: 2, name: 'Arjun Bhakt', weeklyCount: 1180, totalCount: 14230, avatar: '🕉️', streak: 6 },
  { id: 3, name: 'Sita Mata', weeklyCount: 1120, totalCount: 13890, avatar: '🦚', streak: 7 },
  { id: 4, name: 'Krishna Das', weeklyCount: 980, totalCount: 12750, avatar: '🙏', streak: 5 },
  { id: 5, name: 'Radha Rani', weeklyCount: 940, totalCount: 11980, avatar: '🌺', streak: 4 },
  { id: 6, name: 'Gopal Swami', weeklyCount: 890, totalCount: 10850, avatar: '🪈', streak: 7 },
  { id: 7, name: 'Meera Devi', weeklyCount: 820, totalCount: 9840, avatar: '💫', streak: 3 },
  { id: 8, name: 'Hanuman Das', weeklyCount: 780, totalCount: 8920, avatar: '🚩', streak: 6 },
  { id: 9, name: 'Ganga Devi', weeklyCount: 720, totalCount: 8450, avatar: '🌊', streak: 2 },
  { id: 10, name: 'Tulsi Mata', weeklyCount: 680, totalCount: 7890, avatar: '🌿', streak: 5 },
];

const krishnayaWeeklyLeaders = [
  { id: 1, name: 'Krishna Das', weeklyCount: 1350, totalCount: 18950, avatar: '🪈', streak: 7 },
  { id: 2, name: 'Gopal Swami', weeklyCount: 1290, totalCount: 16780, avatar: '🙏', streak: 7 },
  { id: 3, name: 'Arjun Bhakt', weeklyCount: 1220, totalCount: 15420, avatar: '🕉️', streak: 6 },
  { id: 4, name: 'Priya Devotee', weeklyCount: 1150, totalCount: 14650, avatar: '🌸', streak: 5 },
  { id: 5, name: 'Radha Rani', weeklyCount: 1080, totalCount: 13290, avatar: '🌺', streak: 4 },
  { id: 6, name: 'Sita Mata', weeklyCount: 1020, totalCount: 12180, avatar: '🦚', streak: 7 },
  { id: 7, name: 'Meera Devi', weeklyCount: 950, totalCount: 11560, avatar: '💫', streak: 3 },
  { id: 8, name: 'Hanuman Das', weeklyCount: 890, totalCount: 10890, avatar: '🚩', streak: 6 },
  { id: 9, name: 'Ganga Devi', weeklyCount: 830, totalCount: 9670, avatar: '🌊', streak: 4 },
  { id: 10, name: 'Tulsi Mata', weeklyCount: 780, totalCount: 8920, avatar: '🌿', streak: 2 },
];

// Current user data (example: user is ranked 5000)
const currentUser = {
  name: 'Radha Devotee', // This would be the logged-in user
  rank: 5247,
  weeklyCount: 45,
  totalCount: 3247,
  avatar: '🙏',
  streak: 2,
};

type Props = {
  navigation: StackNavigationProp<any>;
};

const LeaderboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'radha' | 'krishnaya'>('radha');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const tabIndicatorAnim = useRef(new Animated.Value(0)).current;
  const userCardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate user card after main content
    setTimeout(() => {
      Animated.spring(userCardAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, 1000);
  }, []);

  const switchTab = (tab: 'radha' | 'krishnaya') => {
    setActiveTab(tab);
    Animated.spring(tabIndicatorAnim, {
      toValue: tab === 'radha' ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 80;
      case 2: return 60;
      case 3: return 40;
      default: return 0;
    }
  };

  const getPodiumColor = (rank: number): [string, string] => {
    switch (rank) {
      case 1: return ['#FFD700', '#FFA000'];
      case 2: return ['#C0C0C0', '#A0A0A0'];
      case 3: return ['#CD7F32', '#A0522D'];
      default: return ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
    }
  };

  const TopThreePodium = ({ leaders }: { leaders: any[] }) => {
    const topThree = leaders.slice(0, 3);
    const orderedForPodium = [topThree[1], topThree[0], topThree[2]]; // 2nd, 1st, 3rd

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        height: 160,
      }}>
        {orderedForPodium.map((user, index) => {
          const actualRank = index === 1 ? 1 : index === 0 ? 2 : 3;
          const podiumHeight = getPodiumHeight(actualRank);
          
          return (
            <Animated.View
              key={user.id}
              style={{
                flex: 1,
                alignItems: 'center',
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  })
                }],
              }}
            >
              {/* User Avatar and Info */}
              <View style={{
                alignItems: 'center',
                marginBottom: 12,
                zIndex: 10,
              }}>
                <LinearGradient
                  colors={getPodiumColor(actualRank)}
                  style={{
                    width: actualRank === 1 ? 70 : 60,
                    height: actualRank === 1 ? 70 : 60,
                    borderRadius: actualRank === 1 ? 35 : 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                    borderWidth: 3,
                    borderColor: actualRank === 1 ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Text style={{ fontSize: actualRank === 1 ? 28 : 24 }}>
                    {user.avatar}
                  </Text>
                </LinearGradient>
                
                {actualRank === 1 && (
                  <Text style={{ fontSize: 24, marginBottom: 4 }}>👑</Text>
                )}
                
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: actualRank === 1 ? 16 : 14,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 4,
                }}>
                  {user.name.split(' ')[0]}
                </Text>
                
                <Text style={{
                  color: '#FFD700',
                  fontSize: actualRank === 1 ? 18 : 16,
                  fontWeight: 'bold',
                }}>
                  {user.weeklyCount}
                </Text>
              </View>

              {/* Podium Base */}
              <LinearGradient
                colors={getPodiumColor(actualRank)}
                style={{
                  width: '80%',
                  height: podiumHeight,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: actualRank === 1 ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text style={{
                  color: actualRank === 1 ? '#000' : '#FFFFFF',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                  {actualRank}
                </Text>
              </LinearGradient>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  const LeaderboardItem = ({ 
    user, 
    rank, 
    index,
    isCurrentUser = false,
  }: { 
    user: any; 
    rank: number;
    index: number;
    isCurrentUser?: boolean;
  }) => {
    const itemAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(itemAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 80,
        useNativeDriver: true,
      }).start();
    }, [activeTab]);

    return (
      <Animated.View
        style={{
          opacity: itemAnim,
          transform: [{ 
            translateX: itemAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            })
          }],
        }}
      >
        <LinearGradient
          colors={isCurrentUser 
            ? ['rgba(255, 215, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']
            : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']}
          style={{
            marginHorizontal: 20,
            marginBottom: 8,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: isCurrentUser ? 2 : 1,
            borderColor: isCurrentUser ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
            shadowColor: isCurrentUser ? '#FFD700' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isCurrentUser ? 0.3 : 0.1,
            shadowRadius: 8,
            elevation: isCurrentUser ? 8 : 4,
          }}
        >
          {/* Rank */}
          <View style={{
            width: 40,
            alignItems: 'center',
          }}>
            <Text style={{
              color: isCurrentUser ? '#FFD700' : '#FFFFFF',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
              #{rank}
            </Text>
          </View>

          {/* Avatar */}
          <View style={{
            width: 44,
            height: 44,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            borderWidth: isCurrentUser ? 2 : 1,
            borderColor: isCurrentUser ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
          }}>
            <Text style={{ fontSize: 18 }}>{user.avatar}</Text>
          </View>

          {/* User Info */}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 8,
              }}>
                {user.name}
              </Text>
              {isCurrentUser && (
                <View style={{
                  backgroundColor: '#FFD700',
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 8,
                }}>
                  <Text style={{
                    color: '#000',
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                    YOU
                  </Text>
                </View>
              )}
            </View>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 12,
              marginTop: 2,
            }}>
              {user.streak} day streak • {user.totalCount.toLocaleString()} total
            </Text>
          </View>

          {/* Weekly Count */}
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{
              color: isCurrentUser ? '#FFD700' : '#FFFFFF',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
              {user.weeklyCount}
            </Text>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 10,
            }}>
              this week
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const currentLeaders = activeTab === 'radha' ? radhaWeeklyLeaders : krishnayaWeeklyLeaders;

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 215, 0, 0.1)',
          }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 44,
                height: 44,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
                🏆 Weekly Champions
              </Text>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 14,
                marginTop: 4,
              }}>
                This Week's Sacred Journey
              </Text>
            </View>

            <View style={{ width: 44 }} />
          </View>

          {/* Premium Tab Selector */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 16,
            padding: 4,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: 'rgba(255, 215, 0, 0.2)',
          }}>
            <Animated.View
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                right: 4,
                height: 44,
                transform: [{
                  translateX: tabIndicatorAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, (width - 48) / 2],
                  })
                }],
              }}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  width: (width - 48) / 2,
                }}
              />
            </Animated.View>

            <TouchableOpacity
              onPress={() => switchTab('radha')}
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              <Text style={{
                color: activeTab === 'radha' ? '#000000' : '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
                🌸 Radha Mantra
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => switchTab('krishnaya')}
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              <Text style={{
                color: activeTab === 'krishnaya' ? '#000000' : '#FFFFFF',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
                🪈 Krishnaya Mantra
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingTop: 8,
            paddingBottom: 140 
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Top 3 Podium */}
          <View style={{ marginTop: 32, marginBottom: 20 }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 24,
            }}>
              🏆 Top 3 Champions
            </Text>
            <TopThreePodium leaders={currentLeaders} />
          </View>

          {/* Remaining Top 10 */}
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
              />
            ))}
          </View>

          {/* Gap Indicator */}
          <View style={{
            alignItems: 'center',
            paddingVertical: 20,
          }}>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
              ⋮
            </Text>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 14,
              marginTop: 8,
            }}>
              {(currentUser.rank - 11).toLocaleString()} more devotees
            </Text>
          </View>
        </ScrollView>

        {/* Floating User Position Card */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            opacity: userCardAnim,
            transform: [{
              translateY: userCardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              })
            }],
          }}
        >
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.9)', 'rgba(255, 152, 0, 0.8)']}
            style={{
              borderRadius: 20,
              padding: 20,
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
              borderWidth: 2,
              borderColor: '#FFD700',
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}>
                  🙏 Your Position This Week
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{
                    color: '#000000',
                    fontSize: 32,
                    fontWeight: 'bold',
                    marginRight: 12,
                  }}>
                    #{currentUser.rank.toLocaleString()}
                  </Text>
                  <View>
                    <Text style={{
                      color: 'rgba(0, 0, 0, 0.7)',
                      fontSize: 14,
                    }}>
                      {currentUser.weeklyCount} chants this week
                    </Text>
                    <Text style={{
                      color: 'rgba(0, 0, 0, 0.7)',
                      fontSize: 12,
                    }}>
                      {currentUser.streak} day streak
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={{
                width: 60,
                height: 60,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 28 }}>{currentUser.avatar}</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </SafeAreaView>
    </StarBackground>
  );
};

export default LeaderboardScreen;