// File: components/profile/UserProfileHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfileHeaderProps } from '../../types/profile';

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userData, navigation }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        {/* Enhanced User Profile Card */}
        <View style={{ flex: 1, marginRight: 16 }}>
          <LinearGradient
            colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 152, 0, 0.05)']}
            style={{
              borderRadius: 24,
              padding: 20,
              borderWidth: 1,
              borderColor: 'rgba(255, 215, 0, 0.3)',
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.2,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text style={{ 
                  color: '#000000', 
                  fontSize: 22, 
                  fontWeight: 'bold',
                }}>
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </LinearGradient>
              
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: 20, 
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}>
                  {userData.name}
                </Text>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: 14,
                  marginBottom: 8,
                }}>
                  {userData.email}
                </Text>
                <View style={{
                  width: 40,
                  height: 3,
                  backgroundColor: '#FFD700',
                  borderRadius: 2,
                }} />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Premium Leaderboard Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Leaderboard')}
          activeOpacity={0.8}
          style={{ width: 64, height: 64 }}
        >
          <LinearGradient
            colors={['#FFD700', '#FFA000']}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#FFD700',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <Ionicons name="trophy" size={28} color="#000" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Welcome Message */}
      <View style={{ alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ 
          color: '#FFFFFF', 
          fontSize: 16, 
          textAlign: 'center',
          opacity: 0.8,
        }}>
          🙏 Radha Radha! Welcome to your spiritual journey
        </Text>
      </View>
    </View>
  );
};

export default UserProfileHeader;