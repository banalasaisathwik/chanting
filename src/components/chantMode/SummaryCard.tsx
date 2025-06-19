// File: components/chantMode/SummaryCard.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SummaryCardProps, Mantra, Mode } from '../../types/chantMode';

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  selectedItem, 
  icon, 
  onEdit, 
  type 
}) => {
  const summaryScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(summaryScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(summaryScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const displayName = type === 'mantra' 
    ? (selectedItem as Mantra).name 
    : (selectedItem as Mode).title;

  const showSanskrit = type === 'mantra' && (selectedItem as Mantra).sanskrit;

  return (
    <Animated.View style={{ transform: [{ scale: summaryScale }], marginBottom: 16 }}>
      <TouchableOpacity
        onPress={onEdit}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['rgba(255, 193, 7, 0.15)', 'rgba(255, 152, 0, 0.05)']}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#FFD700',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        >
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}>
            <Text style={{ fontSize: 20 }}>{icon}</Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 12,
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 2,
            }}>
              {title}
            </Text>
            <Text style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: '600',
              letterSpacing: 0.5,
            }}>
              {displayName}
            </Text>
            {showSanskrit && (
              <Text style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 14,
                marginTop: 2,
              }}>
                {(selectedItem as Mantra).sanskrit}
              </Text>
            )}
          </View>
          
          <View style={{
            padding: 8,
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}>
            <Ionicons name="pencil" size={16} color="#FFD700" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SummaryCard;