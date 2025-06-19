// File: components/profile/ContactSection.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ContactSectionProps } from '../../types/profile';

const ContactSection: React.FC<ContactSectionProps> = ({ onEmailPress, onWhatsAppPress }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 22, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        💬 Connect With Us
      </Text>
      
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <TouchableOpacity
          onPress={onEmailPress}
          activeOpacity={0.8}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={['rgba(33, 150, 243, 0.2)', 'rgba(21, 101, 192, 0.1)']}
            style={{
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(33, 150, 243, 0.4)',
              shadowColor: '#2196F3',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Ionicons name="mail" size={28} color="#2196F3" />
            <Text style={{ 
              color: '#2196F3', 
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 8,
            }}>
              Email Support
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onWhatsAppPress}
          activeOpacity={0.8}
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={['rgba(76, 175, 80, 0.2)', 'rgba(56, 142, 60, 0.1)']}
            style={{
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'rgba(76, 175, 80, 0.4)',
              shadowColor: '#4CAF50',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6,
            }}
          >
            <Ionicons name="logo-whatsapp" size={28} color="#4CAF50" />
            <Text style={{ 
              color: '#4CAF50', 
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 8,
            }}>
              WhatsApp
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactSection;