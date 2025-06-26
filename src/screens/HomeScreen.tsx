// File: screens/HomeScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GoogleSignin,
  statusCodes as GoogleSigninStatusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { z } from 'zod';
import StarBackground from './StarBackground';

import { HomeScreenProps } from '../types/home';
import { keyFeatures } from '../data/homeData';
import { HeaderBanner, FeatureCard, PremiumButton, DividerWithText } from '../components/home';
import { createParallelEntranceAnimation } from '../utils/animationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from 'contexts/AuthContext';
import { registerForPushNotificationsAsync } from '~/utils/notifications';

const baseURL = 'http://192.168.29.32:3000'; // Local server

// 🛡️ Define Zod schema
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  photo: z.string().url().optional(),
});

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    createParallelEntranceAnimation({ fadeAnim, slideAnim, scaleAnim }).start();
  }, []);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigation.replace('MainApp');
    }
  }, [user, loading]);

  // Optional: show loader while checking session
  if (loading) return null;

  const handleGoogleSignIn = async () => {
    try {
      setSubmitting(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (isSuccessResponse(userInfo)) {
        const { name, email, id: googleId, photo } = userInfo.data.user;

        // ✅ Validate with Zod
        const parsed = userSchema.safeParse({ name, email, photo });

        if (!parsed.success) {
          console.warn('Validation failed:', parsed.error.flatten().fieldErrors);
          Alert.alert('Invalid data', 'Google profile missing required info.');
          return;
        }

        // ✅ Proceed to send
        const response = await axios.post(
          `${baseURL}/api/user`,
          {
            name,
            email,
            photo,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.status === 200) {
          const { token, user } = response.data;

          // Save token and user in AsyncStorage
          await AsyncStorage.setItem(
            'session',
            JSON.stringify({
              token,
              email: user.email,
              name: user.name,
              photo: user.photo,
            })
          );
          // AsyncStorage.getItem('session').then((session) => {
          //   console.log('Session saved:', session);
          // });

          Alert.alert('Success', 'User logged IN');
          navigation.replace('MainApp');
        } else {
          Alert.alert('Error', 'Failed to save user');
        }
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case GoogleSigninStatusCodes.SIGN_IN_CANCELLED:
            console.warn('User cancelled sign-in');
            break;
          case GoogleSigninStatusCodes.IN_PROGRESS:
            console.warn('Sign-in in progress');
            break;
          default:
            console.error('Google Sign-In error:', error);
        }
      } else {
        console.error('Google Sign-In error:', error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{
            flex: 1,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}>
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
            disabled={submitting}
          />
          <PremiumButton
            icon="logo-google"
            text="call push notifications"
            colors={['#4285F4', '#1976D2']}
            onPress={registerForPushNotificationsAsync}
            disabled={submitting}
          />
        </Animated.ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default HomeScreen;
