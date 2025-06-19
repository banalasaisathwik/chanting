// File: components/wallet/InfoNote.tsx
import React from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InfoNoteProps } from '../../types/wallet';

const InfoNote: React.FC<InfoNoteProps> = ({ fadeAnim, slideAnim }) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 32,
      }}
    >
      <View style={{
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <Ionicons name="information-circle" size={24} color="#FFD700" />
          </View>
          <Text style={{
            color: '#FFD700',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
            Sacred Contribution
          </Text>
        </View>
        
        <Text style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 16,
          lineHeight: 24,
          textAlign: 'justify',
        }}>
          ₹1 will be deducted once in a day only you do chanting in the app. This small contribution helps us maintain our servers and support our team .
        </Text>
        
        <View style={{
          marginTop: 12,
          padding: 12,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 12,
        }}>
          <Text style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 14,
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
            🙏 "Your support helps us"
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default InfoNote;