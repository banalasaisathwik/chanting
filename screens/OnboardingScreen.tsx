import { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  StatusBar,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import StarBackground from './StarBackground';
import type { StackNavigationProp } from '@react-navigation/stack';

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

  const quotes = [
    { text: "Arise, awake, and stop not until the goal is reached.", author: "Swami Vivekananda" },
    { text: "In the divine name lies the power to transform the soul.", author: "Premanand Maharaj" },
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

  // Animate button when second quote appears
  useEffect(() => {
    if (currentQuote === 1) {
      setTimeout(() => {
        Animated.timing(buttonFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [currentQuote, buttonFadeAnim]);

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
              marginBottom: 80,
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