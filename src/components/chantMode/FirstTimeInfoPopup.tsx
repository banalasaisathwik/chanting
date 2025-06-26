// File: components/FirstTimeInfoPopup.tsx (Cross-Platform Version)
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const POPUP_STORAGE_KEY = 'chant_popup_seen';

const FirstTimeInfoPopup: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    checkIfPopupSeen();
  }, []);

  const checkIfPopupSeen = async () => {
    try {
      let hasSeenPopup = null;

      if (Platform.OS === 'web') {
        // Web: Use localStorage
        hasSeenPopup = localStorage.getItem(POPUP_STORAGE_KEY);
      } else {
        // Mobile: Use AsyncStorage
        hasSeenPopup = await AsyncStorage.getItem(POPUP_STORAGE_KEY);
      }

      if (!hasSeenPopup) {
        setShowModal(true);
      }
    } catch (error) {
      console.warn('Storage error:', error);
      // If storage fails, show popup as fallback
      setShowModal(true);
    }
  };

  const handleDismiss = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web: Save to localStorage
        localStorage.setItem(POPUP_STORAGE_KEY, 'true');
      } else {
        // Mobile: Save to AsyncStorage
        await AsyncStorage.setItem(POPUP_STORAGE_KEY, 'true');
      }
    } catch (error) {
      console.warn('Could not save to storage:', error);
    }

    setShowModal(false);
  };

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
        <View style={{
          backgroundColor: 'rgba(20, 20, 30, 0.98)',
          borderRadius: 24,
          padding: 28,
          marginHorizontal: 20,
          maxWidth: 400,
          width: '100%',
          borderWidth: 2,
          borderColor: 'rgba(255, 215, 0, 0.3)',
          shadowColor: '#FFD700',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              width: 56,
              height: 56,
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <Ionicons name="information-circle" size={28} color="#FFD700" />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 4,
              }}>
                🙏 Welcome to Jaapam
              </Text>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 14,
                fontWeight: '500',
              }}>
                Important Information
              </Text>
            </View>
          </View>

          {/* Content */}
          <View style={{
            backgroundColor: 'rgba(255, 215, 0, 0.08)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 215, 0, 0.2)',
          }}>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              lineHeight: 24,
              textAlign: 'left',
            }}>
              <Text style={{ fontWeight: 'bold', color: '#FFD700' }}>₹1</Text>will be deducted daily only when you do the chanting, to support the system and the team.
              {'\n\n'}
              You can see your balance and recharge in the{' '}
              <Text style={{ fontWeight: 'bold', color: '#FFD700' }}>Profile tab</Text>.
              {'\n\n'}
              You can use the app for{' '}
              <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>free for 3 days</Text>{' '}
              without recharging.
            </Text>
          </View>

          {/* Benefits */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14,
              marginBottom: 12,
              fontWeight: '600',
            }}>
              💝 Your contribution helps:
            </Text>
            <View style={{ paddingLeft: 12 }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, marginBottom: 4 }}>
                • Maintain our sacred platform
              </Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, marginBottom: 4 }}>
                • Support our development team
              </Text>
              <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>
                • Keep the app running smoothly 
                </Text>
            </View>
          </View>

          {/* Platform Info (for debugging) */}
          <Text style={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 16,
          }}>
            Running on {Platform.OS} • Using {Platform.OS === 'web' ? 'localStorage' : 'AsyncStorage'}
          </Text>

          {/* Dismiss Button */}
          <TouchableOpacity
            onPress={handleDismiss}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA000']}
              style={{
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 24,
                alignItems: 'center',
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{
                color: '#000000',
                fontSize: 16,
                fontWeight: 'bold',
                letterSpacing: 0.5,
              }}>
                🙏 Got it, Radha Radha!
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FirstTimeInfoPopup;