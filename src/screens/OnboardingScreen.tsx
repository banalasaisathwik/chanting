import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import StarBackground from './StarBackground';
import type { StackNavigationProp } from '@react-navigation/stack';

// 🆕 Import Premanand Maharaj image
const premanandImage = require('../../assets/premanandji.jpg');

const { height } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: StackNavigationProp<any>;
};

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  // Use useRef to prevent recreation on every render
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const imageFadeAnim = useRef(new Animated.Value(0)).current; // 🆕 Added image animation

  const quotes = [
    { text: "Repeating the names of God has wonderful power.", author: "Swami Vivekananda" },
    { text: "You get whatever you want just by chanting God's name.", author: "Premanand Maharaj" },
  ];

  useEffect(() => {
    const animateQuote = () => {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, { 
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true 
        }),
        Animated.timing(scaleAnim, { 
          toValue: 1, 
          duration: 1000, 
          useNativeDriver: true 
        }),
      ]).start();
    };

    animateQuote();

    // Show second quote after 3 seconds
    if (currentQuote === 0) {
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, { 
            toValue: 0, 
            duration: 500, 
            useNativeDriver: true 
          }),
          Animated.timing(scaleAnim, { 
            toValue: 0.8, 
            duration: 500, 
            useNativeDriver: true 
          }),
        ]).start(() => {
          setCurrentQuote(1);
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentQuote, fadeAnim, scaleAnim]);

  // Animate button and image when second quote appears
  useEffect(() => {
    if (currentQuote === 1) {
      setTimeout(() => {
        // 🆕 Animate both button and image together
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
      }, 500);
    }
  }, [currentQuote, buttonFadeAnim, imageFadeAnim]); // 🆕 Added imageFadeAnim dependency

  const handleBeginJourney = () => {
    navigation.replace('Welcome'); // Navigate to HomeScreen
  };

  return (
    <StarBackground>
      <StatusBar barStyle="light-content" backgroundColor="#000000" translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          paddingHorizontal: 32,
          paddingVertical: 40,
          minHeight: height * 0.8 // Ensure minimum height for centering
        }}>
          
          {/* Quote Section */}
          <Animated.View 
            style={{ 
              opacity: fadeAnim, 
              transform: [{ scale: scaleAnim }],
              marginBottom: 40, // 🆕 Reduced margin to make space for image
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Text style={{ 
              fontSize: 64, 
              marginBottom: 32, 
              textAlign: 'center' 
            }}>
              🕉️
            </Text>
            
            <Text style={{ 
              color: '#ffffff', 
              fontSize: 24, 
              fontWeight: '300', 
              textAlign: 'center', 
              marginBottom: 16, 
              lineHeight: 32,
              paddingHorizontal: 16
            }}>
              "{quotes[currentQuote].text}"
            </Text>
            
            <Text style={{ 
              color: '#fbbf24', 
              fontSize: 18, 
              textAlign: 'center', 
              fontWeight: '500' 
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
                alignItems: 'center'
              }}
            >
              <Animated.Image
                source={premanandImage}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60, // Make it perfectly circular
                  borderWidth: 3,
                  borderColor: '#fbbf24', // Golden border matching the theme
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
                marginBottom: 40
              }}
            >
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
                activeOpacity={0.8}
              >
                <Text style={{ 
                  color: '#000000', 
                  fontSize: 18, 
                  fontWeight: '600' 
                }}>
                  Begin Your Journey
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </StarBackground>
  );
};

export default OnboardingScreen;