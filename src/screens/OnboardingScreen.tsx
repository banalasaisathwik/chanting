import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import StarBackground from './StarBackground';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from 'contexts/AuthContext';

// 🆕 Import Premanand Maharaj image
const premanandImage = require('../../assets/premanandji.jpg');

const { height } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showRedirectText, setShowRedirectText] = useState(false);

  // Use useRef to prevent recreation on every render
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const imageFadeAnim = useRef(new Animated.Value(0)).current;

  const quotes = [
    { text: 'Repeating the names of God has wonderful power.', author: 'Swami Vivekananda' },
    { text: "You get whatever you want just by chanting God's name.", author: 'Premanand Maharaj' },
  ];

  const { user, loading } = useAuth();


  useEffect(() => {
    const animateQuote = () => {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    };

    animateQuote();

    if (currentQuote === 0) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentQuote(1);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentQuote, fadeAnim, scaleAnim]);

  useEffect(() => {
    let animationTimer: NodeJS.Timeout | null = null;
    let autoNavTimer: NodeJS.Timeout | null = null;

    if (currentQuote === 1) {
      animationTimer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(buttonFadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(imageFadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]).start();

        // ✅ Show "Already signed in..." text and auto-navigate if signed in
        if (!loading && user) {
          setShowRedirectText(true);
          autoNavTimer = setTimeout(() => {
            navigation.replace('MainApp');
          }, 1000);
        }
      }, 500);
    }

    // Cleanup timers
    return () => {
      if (animationTimer) clearTimeout(animationTimer);
      if (autoNavTimer) clearTimeout(autoNavTimer);
    };
  }, [currentQuote, buttonFadeAnim, imageFadeAnim, user, loading, navigation]);

  const handleBeginJourney = () => {
    navigation.replace('Welcome'); // Navigate to HomeScreen
  };

  return (
    <StarBackground>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 32,
            paddingVertical: 40,
            minHeight: height * 0.8,
          }}>
          {/* Quote Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
              marginBottom: 40,
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 64,
                marginBottom: 32,
                textAlign: 'center',
              }}>
              🕉️
            </Text>

            <Text
              style={{
                color: '#ffffff',
                fontSize: 24,
                fontWeight: '300',
                textAlign: 'center',
                marginBottom: 16,
                lineHeight: 32,
                paddingHorizontal: 16,
              }}>
              "{quotes[currentQuote].text}"
            </Text>

            <Text
              style={{
                color: '#fbbf24',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              - {quotes[currentQuote].author}
            </Text>
          </Animated.View>

          {/* 🆕 Premanand Maharaj Image - Only show with second quote */}
          {currentQuote === 1 && (
            <Animated.View
              style={{
                opacity: imageFadeAnim,
                transform: [{ scale: imageFadeAnim }],
                marginBottom: 132,
                alignItems: 'center',
              }}>
              <Image
                source={premanandImage}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  borderWidth: 3,
                  borderColor: '#fbbf24',
                  shadowColor: '#d4af37',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 8,
                }}
                resizeMode="cover"
              />
            </Animated.View>
          )}

          {/* Button Section */}
          {currentQuote === 1 && (
            <Animated.View
              style={{
                opacity: buttonFadeAnim,
                transform: [{ scale: buttonFadeAnim }],
                marginBottom: 40,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#eab308',
                  paddingHorizontal: 48,
                  paddingVertical: 16,
                  borderRadius: 9999,
                  shadowColor: '#d4af37',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
                }}
                onPress={handleBeginJourney}
                activeOpacity={0.8}>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Begin Your Journey
                </Text>
              </TouchableOpacity>
              {showRedirectText && (
                <Text
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    color: '#d4d4d4',
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                  Already signed in, redirecting...
                </Text>
              )}
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </StarBackground>
  );
};

export default OnboardingScreen;
