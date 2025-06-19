// File: components/chantingSession/SessionHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SessionHeaderProps } from '../../types/chantingSession';

const SessionHeader: React.FC<SessionHeaderProps> = ({ mantraData, onBackPress }) => {
  return (
    <View style={{
      paddingTop: 60,
      paddingHorizontal: 24,
      alignItems: 'center',
      marginBottom: 40,
    }}>
      <TouchableOpacity
        onPress={onBackPress}
        style={{
          position: 'absolute',
          left: 24,
          top: 60,
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
      </TouchableOpacity>

      <Text style={{
        color: '#ffffff',
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        letterSpacing: 1,
      }}>
        {mantraData.name}
      </Text>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 4,
      }}>
        {mantraData.sanskrit}
      </Text>
    </View>
  );
};

export default SessionHeader;