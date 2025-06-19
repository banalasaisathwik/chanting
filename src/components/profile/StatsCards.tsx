// File: components/profile/StatsCards.tsx
import React from 'react';
import { View, Text } from 'react-native';
import StatCard from './StatCard';
import { StatsCardsProps } from '../../types/profile';

const StatsCards: React.FC<StatsCardsProps> = ({ userData }) => {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 22, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        🕉️ Your Sacred Progress
      </Text>
      
      <View style={{ flexDirection: 'row', marginHorizontal: -6 }}>
        <StatCard
          title="Total Chants"
          value={userData.totalChants.toLocaleString()}
          icon="musical-notes"
          gradientColors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']}
          iconColor="#FFD700"
        />
        <StatCard
          title="Cycles"
          value={userData.totalCycles}
          subtitle="Completed"
          icon="refresh-circle"
          gradientColors={['rgba(76, 175, 80, 0.2)', 'rgba(56, 142, 60, 0.1)']}
          iconColor="#4CAF50"
        />
        <StatCard
          title="Streak"
          value={userData.currentStreak}
          subtitle={`${userData.currentStreak} days`}
          icon="flame"
          gradientColors={['rgba(244, 67, 54, 0.2)', 'rgba(211, 47, 47, 0.1)']}
          iconColor="#FF6B6B"
        />
      </View>
    </View>
  );
};

export default StatsCards;