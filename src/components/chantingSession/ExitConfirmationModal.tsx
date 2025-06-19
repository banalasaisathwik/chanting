// File: components/chantingSession/ExitConfirmationModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ExitConfirmationModalProps } from '../../types/chantingSession';

const ExitConfirmationModal: React.FC<ExitConfirmationModalProps> = ({
  visible,
  count,
  cycles,
  onSaveAndExit,
  onStayInSession,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onStayInSession}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
        <View style={{
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          borderRadius: 24,
          padding: 32,
          width: '100%',
          maxWidth: 350,
          borderWidth: 1,
          borderColor: 'rgba(255, 215, 0, 0.2)',
        }}>
          {/* Modal Header */}
          <View style={{
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
              <Text style={{ fontSize: 32 }}>🙏</Text>
            </View>
            <Text style={{
              color: '#ffffff',
              fontSize: 22,
              fontWeight: '600',
              textAlign: 'center',
              letterSpacing: 0.5,
            }}>
              Save Your Progress?
            </Text>
          </View>

          {/* Session Summary */}
          <View style={{
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 215, 0, 0.2)',
          }}>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14,
              textAlign: 'center',
              marginBottom: 12,
            }}>
              Current Session
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}>
              <Text style={{
                color: '#ffffff',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Count:
              </Text>
              <Text style={{
                color: '#FFD700',
                fontSize: 16,
                fontWeight: '600',
              }}>
                {count}
              </Text>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                color: '#ffffff',
                fontSize: 16,
                fontWeight: '500',
              }}>
                Cycles:
              </Text>
              <Text style={{
                color: '#FFD700',
                fontSize: 16,
                fontWeight: '600',
              }}>
                {cycles}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={{ gap: 12 }}>
            {/* Save & Exit Button */}
            <TouchableOpacity
              onPress={onSaveAndExit}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                style={{
                  paddingVertical: 16,
                  paddingHorizontal: 24,
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="save" size={20} color="#000" />
                <Text style={{
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: '700',
                  marginLeft: 8,
                  letterSpacing: 0.5,
                }}>
                  Save & Exit
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Stay Button */}
            <TouchableOpacity
              onPress={onStayInSession}
              activeOpacity={0.8}
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#ffffff" />
              <Text style={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: '600',
                marginLeft: 8,
                letterSpacing: 0.5,
              }}>
                Continue Session
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExitConfirmationModal;