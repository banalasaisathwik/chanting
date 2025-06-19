// File: components/leaderboard/GapIndicator.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { GapIndicatorProps } from '../../types/leaderboard';

const GapIndicator: React.FC<GapIndicatorProps> = ({ currentUserRank }) => {
  return (
    <View style={{
      alignItems: 'center',
      paddingVertical: 20,
    }}>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 24,
        fontWeight: 'bold',
      }}>
        ⋮
      </Text>
      <Text style={{
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        marginTop: 8,
      }}>
        {(currentUserRank - 11).toLocaleString()} more devotees
      </Text>
    </View>
  );
};

export default GapIndicator;