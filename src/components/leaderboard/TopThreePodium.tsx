// File: components/leaderboard/TopThreePodium.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TopThreePodiumProps } from '../../types/leaderboard';
import { getPodiumHeight, getPodiumColor } from '../../utils/leaderboardUtils';

const TopThreePodium: React.FC<TopThreePodiumProps> = ({ leaders, fadeAnim }) => {
  const topThree = leaders.slice(0, 3);
  const orderedForPodium = [topThree[1], topThree[0], topThree[2]]; // 2nd, 1st, 3rd

  return (
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
    </View>
  );
};

export default TopThreePodium;