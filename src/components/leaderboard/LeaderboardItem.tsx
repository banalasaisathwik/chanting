// File: components/leaderboard/LeaderboardItem.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LeaderboardItemProps } from '../../types/leaderboard';

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ 
  user, 
  rank, 
  index,
  isCurrentUser = false,
  activeTab,
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

export default LeaderboardItem;