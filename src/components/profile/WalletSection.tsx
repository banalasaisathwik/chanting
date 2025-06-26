// File: components/profile/WalletSection.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { WalletSectionProps } from '../../types/profile';
import { useAuth } from 'contexts/AuthContext';

const WalletSection: React.FC<WalletSectionProps> = ({ onWalletPress }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user) return;

      try {
        const res = await fetch('http://192.168.29.32:3000/api/balance', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await res.json();
        setBalance(data.balance);
        setError(null);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Error fetching balance');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user]);

  return (
    <View style={{ marginBottom: 32 }}>
      <TouchableOpacity onPress={onWalletPress} activeOpacity={0.9}>
        <LinearGradient
          colors={['#FFD700', '#FFA000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            padding: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#FFD700',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.5,
            shadowRadius: 24,
            elevation: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: 'rgba(0, 0, 0, 0.7)',
                fontSize: 14,
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              💰 WALLET BALANCE
            </Text>

            {loading ? (
              <ActivityIndicator size="small" color="#000" style={{ marginVertical: 10 }} />
            ) : error ? (
              <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text>
            ) : (
              <Text
                style={{
                  color: '#000000',
                  fontSize: 32,
                  fontWeight: 'bold',
                  marginVertical: 4,
                }}
              >
                ₹{balance?.toFixed(2)}
              </Text>
            )}

            <Text style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 16 }}>
              Tap to manage your recharge
            </Text>
          </View>

          <View
            style={{
              width: 72,
              height: 72,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="wallet" size={36} color="#000" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default WalletSection;
