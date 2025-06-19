// File: components/leaderboard/HeaderWithTabs.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderWithTabsProps } from '../../types/leaderboard';
import { getTabDisplayName } from '../../utils/leaderboardUtils';

const { width } = Dimensions.get('window');

const HeaderWithTabs: React.FC<HeaderWithTabsProps> = ({
  navigation,
  activeTab,
  onTabSwitch,
  fadeAnim,
  slideAnim,
  tabIndicatorAnim,
}) => {
  return (
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
          onPress={() => onTabSwitch('radha')}
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
            {getTabDisplayName('radha')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onTabSwitch('krishnaya')}
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
            {getTabDisplayName('krishnaya')}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default HeaderWithTabs;