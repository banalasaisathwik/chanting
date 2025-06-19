// File: components/leaderboard/UserRankCard.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserRankCardProps } from '../../types/leaderboard';

const UserRankCard: React.FC<UserRankCardProps> = ({ currentUser, userCardAnim }) => {
  return (
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
  );
};

export default UserRankCard;