// File: components/home/DividerWithText.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { DividerWithTextProps } from '../../types/home';

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20 
      }}>
        <View style={{ 
          flex: 1, 
          height: 1, 
          backgroundColor: 'rgba(255, 255, 255, 0.2)' 
        }} />
        <Text style={{ 
          color: 'rgba(255, 255, 255, 0.8)', 
          fontSize: 16, 
          fontWeight: '500',
          marginHorizontal: 16,
          letterSpacing: 0.5
        }}>
          {text}
        </Text>
        <View style={{ 
          flex: 1, 
          height: 1, 
          backgroundColor: 'rgba(255, 255, 255, 0.2)' 
        }} />
      </View>
    </View>
  );
};

export default DividerWithText;