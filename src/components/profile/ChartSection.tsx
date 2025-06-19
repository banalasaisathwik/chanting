// File: components/profile/ChartSection.tsx
import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import PremiumCard from './PremiumCard';
import { getChartConfig, getChartData } from '../../utils/profileChart';
import { ChartSectionProps } from '../../types/profile';

const { width } = Dimensions.get('window');

const ChartSection: React.FC<ChartSectionProps> = ({ userData, chartVisible }) => {
  const chartConfig = getChartConfig();
  const chartData = getChartData(userData);

  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ 
        color: '#FFFFFF', 
        fontSize: 22, 
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      }}>
        📊 Weekly Practice
      </Text>
      
      <PremiumCard style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(255, 215, 0, 0.3)',
      }}>
        {chartVisible && (
          <>
            <BarChart
              data={chartData}
              width={width - 80}
              height={240}
              chartConfig={chartConfig}
              style={{
                borderRadius: 16,
                marginHorizontal: -10,
              }}
              showValuesOnTopOfBars={true}
              fromZero={true}
              withInnerLines={true}
              yAxisLabel=""
              yAxisSuffix=""
            />
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: 14, 
              textAlign: 'center',
              marginTop: 16,
              fontStyle: 'italic',
            }}>
              Your daily devotion reflected in numbers ✨
            </Text>
          </>
        )}
      </PremiumCard>
    </View>
  );
};

export default ChartSection;