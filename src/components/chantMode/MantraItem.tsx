// File: components/chantMode/MantraItem.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MantraItemProps } from '../../types/chantMode';

const MantraItem: React.FC<MantraItemProps> = ({ mantra, isSelected, onPress }) => {
  const itemScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(itemScale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(itemScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const gradientColors: [string, string] = isSelected 
    ? ['rgba(255, 193, 7, 0.15)', 'rgba(255, 152, 0, 0.05)']
    : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'];

  return (
    <Animated.View
      style={{
        transform: [{ scale: itemScale }],
        marginBottom: 12,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={gradientColors}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 20,
            borderRadius: 16,
            borderWidth: isSelected ? 1.5 : 1,
            borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Custom Radio Button */}
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
            marginRight: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelected ? '#FFD700' : 'transparent',
          }}>
            {isSelected && (
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#000',
              }} />
            )}
          </View>
          
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.5,
                flex: 1,
              }}>
                {mantra.name}
              </Text>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: 16,
                fontWeight: '400',
              }}>
                {mantra.sanskrit}
              </Text>
            </View>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 14,
              lineHeight: 20,
            }}>
              {mantra.description}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MantraItem;