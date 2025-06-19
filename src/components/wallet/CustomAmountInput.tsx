// File: components/wallet/CustomAmountInput.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomAmountInputProps } from '../../types/wallet';

const CustomAmountInput: React.FC<CustomAmountInputProps> = ({ 
  customAmount, 
  onAmountChange, 
  onClear, 
  fadeAnim, 
  slideAnim 
}) => {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 24,
      }}
    >
      <Text style={{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
      }}>
        💫 Enter Custom Amount
      </Text>
      
      <View style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: customAmount ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
        shadowColor: customAmount ? '#FFD700' : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: customAmount ? 0.2 : 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 'bold',
            marginRight: 8,
          }}>
            ₹
          </Text>
          
          <TextInput
            style={{
              flex: 1,
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: '600',
            }}
            value={customAmount}
            onChangeText={onAmountChange}
            placeholder="Enter amount"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            keyboardType="numeric"
            maxLength={5}
          />
          
          {customAmount && (
            <TouchableOpacity
              onPress={onClear}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="close" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default CustomAmountInput;