import React from 'react';
import { View, Text } from 'react-native';

const StreakNote: React.FC = () => (
  <View style={{
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)'
  }}>
    <Text style={{
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center'
    }}>
      🔥 Streak Rule
    </Text>
    <Text style={{
      color: '#FFFFFF',
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.8
    }}>
      1 point every day you chant at least once. If you miss a day, your streak resets to 0.
    </Text>
  </View>
);

export default StreakNote;
