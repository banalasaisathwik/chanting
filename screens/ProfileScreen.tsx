// File: screens/ProfileScreen.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Linking,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart } from 'react-native-chart-kit';
import StarBackground from './StarBackground';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const userData = {
  name: 'Radha Devotee',
  email: 'radha.bhakt@example.com',
  totalChants: 3247,
  totalCycles: 30,
  currentStreak: 8,
  longestStreak: 21,
  wallet: 210,
  weeklyData: [30, 45, 62, 40, 80, 1000, 90],
  weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

type Props = {
  navigation: StackNavigationProp<any>;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(40))).current;
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const animations = fadeAnims.map((fadeAnim, index) => 
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          delay: index * 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 700,
          delay: index * 200,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(150, animations).start(() => {
      setTimeout(() => setChartVisible(true), 400);
    });
  }, []);

  const handleWalletPress = () => {
    navigation.navigate('Wallet'); 
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:support@radheapp.com?subject=🙏 Support Request - Radhe Radhe');
  };

  const handleContactWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=+919876543210&text=🙏 Radhe Radhe! I need assistance with the app.');
  };

  const AnimatedSection = ({ children, index }: { children: React.ReactNode; index: number }) => (
    <Animated.View
      style={{
        opacity: fadeAnims[index],
        transform: [{ translateY: slideAnims[index] }],
      }}
    >
      {children}
    </Animated.View>
  );

  const PremiumCard = ({ children, style = {} }: { children: React.ReactNode; style?: any }) => (
    <View
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.2)',
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
        ...style,
      }}
    >
      {children}
    </View>
  );

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon, 
    gradientColors,
    iconColor = '#FFD700'
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: string;
    gradientColors: [string, string];
    iconColor?: string;
  }) => {
    const cardScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View
        style={{
          flex: 1,
          marginHorizontal: 6,
          transform: [{ scale: cardScale }],
        }}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={gradientColors}
            style={{
              height: 140,
              borderRadius: 20,
              padding: 16,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: 'rgba(255, 215, 0, 0.3)',
              shadowColor: iconColor,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <View style={{ alignItems: 'flex-end' }}>
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Ionicons name={icon as any} size={24} color={iconColor} />
              </View>
            </View>
            
            <View>
              <Text style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: 12, 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 4,
              }}>
                {title}
              </Text>
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 24, 
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
                {value}
              </Text>
              {subtitle && (
                <Text style={{ 
                  color: iconColor, 
                  fontSize: 11, 
                  fontWeight: '600',
                }}>
                  {subtitle}
                </Text>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const chartConfig = {
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

  const chartData = {
    labels: userData.weekLabels,
    datasets: [{
      data: userData.weeklyData,
      colors: userData.weeklyData.map(() => () => '#FFD700'),
    }],
  };

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Premium Header */}
          <AnimatedSection index={0}>
            <View style={{ marginBottom: 32 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                {/* Enhanced User Profile Card */}
                <View style={{ flex: 1, marginRight: 16 }}>
                  <LinearGradient
                    colors={['rgba(255, 215, 0, 0.15)', 'rgba(255, 152, 0, 0.05)']}
                    style={{
                      borderRadius: 24,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 215, 0, 0.3)',
                      shadowColor: '#FFD700',
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.2,
                      shadowRadius: 16,
                      elevation: 8,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <LinearGradient
                        colors={['#FFD700', '#FFA000']}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 16,
                          borderWidth: 2,
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Text style={{ 
                          color: '#000000', 
                          fontSize: 22, 
                          fontWeight: 'bold',
                        }}>
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </Text>
                      </LinearGradient>
                      
                      <View style={{ flex: 1 }}>
                        <Text style={{ 
                          color: '#FFFFFF', 
                          fontSize: 20, 
                          fontWeight: 'bold',
                          marginBottom: 4,
                        }}>
                          {userData.name}
                        </Text>
                        <Text style={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          fontSize: 14,
                          marginBottom: 8,
                        }}>
                          {userData.email}
                        </Text>
                        <View style={{
                          width: 40,
                          height: 3,
                          backgroundColor: '#FFD700',
                          borderRadius: 2,
                        }} />
                      </View>
                    </View>
                  </LinearGradient>
                </View>

                {/* Premium Leaderboard Button */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Leaderboard')}
                  activeOpacity={0.8}
                  style={{ width: 64, height: 64 }}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFA000']}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      shadowColor: '#FFD700',
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.4,
                      shadowRadius: 12,
                      elevation: 8,
                    }}
                  >
                    <Ionicons name="trophy" size={28} color="#000" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Welcome Message */}
              <View style={{ alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontSize: 16, 
                  textAlign: 'center',
                  opacity: 0.8,
                }}>
                  🙏 Radhe Radhe! Welcome to your spiritual journey
                </Text>
              </View>
            </View>
          </AnimatedSection>

          {/* Premium Stats Cards */}
          <AnimatedSection index={1}>
            <View style={{ marginBottom: 32 }}>
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 22, 
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
                🕉️ Your Sacred Progress
              </Text>
              
              <View style={{ flexDirection: 'row', marginHorizontal: -6 }}>
                <StatCard
                  title="Total Chants"
                  value={userData.totalChants.toLocaleString()}
                  icon="musical-notes"
                  gradientColors={['rgba(255, 215, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']}
                  iconColor="#FFD700"
                />
                <StatCard
                  title="Cycles"
                  value={userData.totalCycles}
                  subtitle="Completed"
                  icon="refresh-circle"
                  gradientColors={['rgba(76, 175, 80, 0.2)', 'rgba(56, 142, 60, 0.1)']}
                  iconColor="#4CAF50"
                />
                <StatCard
                  title="Streak"
                  value={userData.currentStreak}
                  subtitle={`${userData.currentStreak} days`}
                  icon="flame"
                  gradientColors={['rgba(244, 67, 54, 0.2)', 'rgba(211, 47, 47, 0.1)']}
                  iconColor="#FF6B6B"
                />
              </View>
            </View>
          </AnimatedSection>

          {/* Premium Chart Section */}
          <AnimatedSection index={2}>
            <View style={{ marginBottom: 32 }}>
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 22, 
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
                📊 Weekly Sacred Practice
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
          </AnimatedSection>

          {/* Premium Wallet Section */}
          <AnimatedSection index={3}>
            <View style={{ marginBottom: 32 }}>
              <TouchableOpacity
                onPress={handleWalletPress}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA000']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 24,
                    padding: 24,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.5,
                    shadowRadius: 24,
                    elevation: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      color: 'rgba(0, 0, 0, 0.7)', 
                      fontSize: 14, 
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}>
                      💰 WALLET BALANCE
                    </Text>
                    <Text style={{ 
                      color: '#000000', 
                      fontSize: 32, 
                      fontWeight: 'bold',
                      marginVertical: 4,
                    }}>
                      ₹{userData.wallet}
                    </Text>
                    <Text style={{ 
                      color: 'rgba(0, 0, 0, 0.6)', 
                      fontSize: 16,
                    }}>
                      Tap to manage your recharge
                    </Text>
                  </View>
                  
                  <View style={{
                    width: 72,
                    height: 72,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Ionicons name="wallet" size={36} color="#000" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </AnimatedSection>

          {/* Premium About Section */}
          <AnimatedSection index={4}>
            <View style={{ marginBottom: 32 }}>
              <Text style={{ 
                color: '#FFFFFF', 
                fontSize: 22, 
                fontWeight: 'bold',
                marginBottom: 20,
                textAlign: 'center',
              }}>
                🙏 Our Sacred Mission
              </Text>
              
              <PremiumCard>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <View style={{
                    width: 60,
                    height: 60,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  }}>
                    <Text style={{ fontSize: 32 }}>🕉️</Text>
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      color: '#FFFFFF', 
                      fontSize: 20, 
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}>
                      Inspired by Premanand Maharaj
                    </Text>
                    <Text style={{ 
                      color: '#FFD700', 
                      fontSize: 16, 
                      fontWeight: '600',
                      fontStyle: 'italic',
                    }}>
                      "Radhe Radhe" - Path to Divine Love ❤️
                    </Text>
                  </View>
                </View>
                
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontSize: 16, 
                  lineHeight: 26,
                  textAlign: 'justify',
                }}>
                  Our sacred app spreads the divine teachings and spiritual practices inspired by the profound wisdom of Premanand Maharaj. Through the transformative power of mantra chanting and deep meditation, we guide souls on their journey toward inner peace, unwavering devotion, and spiritual awakening in the divine love of Radha Krishna.
                </Text>
              </PremiumCard>
            </View>
          </AnimatedSection>

          {/* Premium Contact Section */}
          <AnimatedSection index={5}>
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
                  onPress={handleContactEmail}
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
                  onPress={handleContactWhatsApp}
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
          </AnimatedSection>
        </ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default ProfileScreen;