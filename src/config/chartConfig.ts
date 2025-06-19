// config/chartConfig.ts
import { UserData } from '../types/profile';

export const chartConfig = {
  backgroundGradientFrom: 'transparent',
  backgroundGradientTo: 'transparent',
  color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.7,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    stroke: 'rgba(255, 255, 255, 0.1)',
    strokeWidth: 1,
  },
  propsForLabels: {
    fontSize: 14,
    fill: '#FFFFFF',
    fontWeight: 'bold',
  },
  propsForVerticalLabels: {
    fontSize: 14,
    fill: '#FFFFFF',
    fontWeight: 'bold',
  },
};

export const createChartData = (userData: UserData) => ({
  labels: userData.weekLabels,
  datasets: [{
    data: userData.weeklyData,
    colors: userData.weeklyData.map(() => () => '#FFD700'),
  }],
});