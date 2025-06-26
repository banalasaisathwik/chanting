import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import StatCard from './StatCard';
import StreakNote from './streakNote';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsCards: React.FC = () => {
  const [userData, setUserData] = useState({
    totalChants: 0,
    totalCycles: 0,
    currentStreak: 8, // default until fetched
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionStr = await AsyncStorage.getItem('session');
        if (!sessionStr) {
          console.error('No session found in AsyncStorage');
          return;
        }

        const session = JSON.parse(sessionStr);
        const token = session.token;
        if (!token) {
          console.error('No token found in session');
          return;
        }

        const response = await fetch('http://192.168.29.32:3000/api/profileStats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();

        setUserData(prev => ({
          ...prev,
          totalChants: Number(data.totalCounts),
          totalCycles: Number(data.totalCycles),
          currentStreak: Number(data.currentStreak) || prev.currentStreak,
        }));
      } catch (err) {
        console.error('Failed to fetch profile stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ marginBottom: 32 }}>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        🕉️ Your Sacred Progress
      </Text>

      <View style={{ flexDirection: 'row', marginHorizontal: -6 }}>
        <StatCard
          title="Total Chants"
          value={userData.totalChants.toLocaleString()}
          loading={loading}
          icon="musical-notes"
          gradientColors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']}
          iconColor="#FFD700"
        />
        <StatCard
          title="Cycles"
          value={userData.totalCycles.toString()}
          subtitle="Completed"
          loading={loading}
          icon="refresh-circle"
          gradientColors={['rgba(76, 175, 80, 0.2)', 'rgba(56, 142, 60, 0.1)']}
          iconColor="#4CAF50"
        />
        <StatCard
          title="Streak"
          value={userData.currentStreak.toString()}
          subtitle={`${userData.currentStreak} days`}
          loading={loading}
          icon="flame"
          gradientColors={['rgba(244, 67, 54, 0.2)', 'rgba(211, 47, 47, 0.1)']}
          iconColor="#FF6B6B"
        />
      </View>

      <StreakNote />
    </View>
  );
};

export default StatsCards;
