// File: screens/HomeScreen.tsx (Optimized with Utils)
import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './StarBackground';

// Types and Data
import { HomeScreenProps } from '../types/home';
import { keyFeatures } from '../data/homeData';

// Components
import {
  HeaderBanner,
  FeatureCard,
  PremiumButton,
  DividerWithText,
} from '../components/home';

// Animation Utilities
import { createParallelEntranceAnimation } from '../utils/animationUtils';

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  // Initialize animations
  useEffect(() => {
    createParallelEntranceAnimation({ fadeAnim, slideAnim, scaleAnim }).start();
  }, []);

  // Handlers
  const handleGoogleSignIn = () => {
    console.log('Google Sign In Pressed');
    navigation.replace('MainApp');
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
          <HeaderBanner scaleAnim={scaleAnim} />

          <View style={{ marginBottom: 32 }}>
            {keyFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </View>

          <DividerWithText text="Get Started" />

          <PremiumButton
            icon="logo-google"
            text="Sign in with Google"
            colors={['#4285F4', '#1976D2']}
            onPress={handleGoogleSignIn}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default HomeScreen;