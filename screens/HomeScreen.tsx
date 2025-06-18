import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from 'screens/StarBackground';
import type { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');
type Props = {
  navigation: StackNavigationProp<any>;
};


const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const keyFeatures = [
    { 
      icon: '🔔', 
      title: 'Get Reminders', 
      subtitle: 'Even when offline',
      gradient: ['rgba(138, 43, 226, 0.15)', 'rgba(88, 28, 135, 0.1)'],
      description: 'Never miss your daily practice with smart offline notifications'
    },
    { 
      icon: '👆', 
      title: 'Swipe Up Counter', 
      subtitle: 'Increase your count',
      gradient: ['rgba(255, 193, 7, 0.15)', 'rgba(255, 152, 0, 0.1)'],
      description: 'Simple swipe gestures to track your chanting progress'
    },
  ];

  useEffect(() => {
    // Staggered entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
    const cardScale = useRef(new Animated.Value(1)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Staggered card animation
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }).start();
    }, []);

    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.96,
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
          opacity: cardOpacity,
          transform: [{ scale: cardScale }],
        }}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          style={{
            width: '100%',
            marginBottom: 20,
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={feature.gradient}
            style={{
              padding: 28,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.15)',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Subtle inner glow */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            />
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Text style={{ 
                fontSize: 48, 
                marginRight: 20
              }}>
                {feature.icon}
              </Text>
              
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: '#ffffff', 
                  fontSize: 22, 
                  fontWeight: '700', 
                  marginBottom: 4,
                  letterSpacing: 0.5
                }}>
                  {feature.title}
                </Text>
                
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.8)', 
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 8
                }}>
                  {feature.subtitle}
                </Text>
              </View>
            </View>
            
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: 15, 
              lineHeight: 22,
              fontWeight: '400',
              textAlign: 'left'
            }}>
              {feature.description}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const PremiumButton = ({ 
    onPress, 
    icon, 
    text, 
    variant = 'primary',
    colors = ['#3B82F6', '#1D4ED8']
  }: any) => {
    const buttonScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(buttonScale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(buttonScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          style={{ marginBottom: 16 }}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              paddingVertical: 16,
              paddingHorizontal: 24,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors[0],
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons 
              name={icon} 
              size={22} 
              color="white" 
              style={{ marginRight: 12 }} 
            />
            <Text style={{ 
              color: 'white', 
              fontSize: 18, 
              fontWeight: '600',
              letterSpacing: 0.5
            }}>
              {text}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ 
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
          contentContainerStyle={{ 
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 40
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: 40,
              transform: [{ scale: scaleAnim }]
            }}
          >
            <Text style={{ fontSize: 40, marginRight: 12 }}>🕉️</Text>
            <View>
              <Text style={{ 
                color: '#ffffff', 
                fontSize: 28, 
                fontWeight: '300',
                letterSpacing: 1
              }}>
                Chanting App
              </Text>
              <View 
                style={{
                  height: 2,
                  backgroundColor: '#FFD700',
                  marginTop: 4,
                  borderRadius: 1
                }}
              />
            </View>
          </Animated.View>

          {/* Key Features */}
          <View style={{ marginBottom: 32 }}>
            {keyFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </View>



          {/* Get Started Section */}
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
                Get Started
              </Text>
              <View style={{ 
                flex: 1, 
                height: 1, 
                backgroundColor: 'rgba(255, 255, 255, 0.2)' 
              }} />
            </View>
          </View>

          {/* Action Buttons */}
          <View>
    <PremiumButton
      icon="logo-google"
      text="Sign in with Google"
      colors={['#4285F4', '#1976D2']}
      onPress={() => {
        // Handle Google Sign In
        console.log('Google Sign In Pressed');
        navigation.replace('MainApp'); // Navigate to HomeScreen
      }}
    />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default HomeScreen;