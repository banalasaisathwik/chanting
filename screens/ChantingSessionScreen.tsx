import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  PanResponder, 
  TouchableOpacity, 
  Dimensions, 
  Animated,
  Platform,
  BackHandler,
  Modal 
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import StarBackground from './StarBackground';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Haptics from 'expo-haptics';

// VOLUME BUTTON SETUP FOR PRODUCTION:
// 1. Install: npm install react-native-volume-manager
// 2. iOS: Add permissions to Info.plist if needed
// 3. Replace volume simulation below with:
/*
import VolumeManager from 'react-native-volume-manager';

useEffect(() => {
  let lastVolume = 0;
  VolumeManager.getVolume().then(vol => lastVolume = vol.volume);
  
  const subscription = VolumeManager.addVolumeListener((result) => {
    if (result.volume > lastVolume) {
      incrementCount();
    }
    lastVolume = result.volume;
  });
  
  return () => subscription?.remove();
}, []);
*/

const { width, height } = Dimensions.get('window');

// Type definitions
type RouteParams = {
  mantra: string;
  mode: 'guided' | 'own';
};

type ChantingSessionScreenRouteProp = RouteProp<{ Screen: RouteParams }, 'Screen'>;

const mantraAudio: Record<string, any> = {
  radha: require('../assets/audio/radhe.mp3'),
  krishna: require('../assets/audio/radhe.mp3'),
  om: require('../assets/audio/radhe.mp3'),
};

const mantraNames: Record<string, { name: string; sanskrit: string }> = {
  radha: { name: 'Radha Radha', sanskrit: 'राधा राधा' },
  krishna: { name: 'Krishnaya Vasudevaya', sanskrit: 'कृष्णाय वासुदेवाय' },
};

const ChantingSessionScreen: React.FC = () => {
  const route = useRoute<ChantingSessionScreenRouteProp>();
  const navigation = useNavigation();
  const { mantra, mode } = route.params;
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isPlaying, setIsPlaying] = useState(mode === 'guided');
  const [showExitPopup, setShowExitPopup] = useState(false);

  const CYCLE_LENGTH = 108;

  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const circleGlow = useRef(new Animated.Value(0.3)).current;

  // Handle back button press to show exit confirmation
  useEffect(() => {
    const handleBackPress = () => {
      setShowExitPopup(true);
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  // Volume button handling with better simulation
  useEffect(() => {
    let volumeCheckInterval: NodeJS.Timeout | undefined = undefined;
    let lastVolumeTime = 0;
    
    // Simple volume button simulation - tap anywhere on screen edges
    const handleVolumeSimulation = () => {
      const now = Date.now();
      if (now - lastVolumeTime > 300) { // Debounce volume presses
        lastVolumeTime = now;
        incrementCount();
      }
    };

    // For development - simulate volume with screen edge taps
    // In production, replace with react-native-volume-manager
    if (__DEV__) {
      // This is a development simulation
      const simulateVolumePress = () => {
        if (Math.random() < 0.1) { // 10% chance every interval when debugging
          // handleVolumeSimulation();
        }
      };
      
      // Uncomment to test volume simulation
      // volumeCheckInterval = setInterval(simulateVolumePress, 2000);
    }

    return () => {
      if (volumeCheckInterval) {
        clearInterval(volumeCheckInterval);
      }
    };
  }, []);

  // Continuous glow animation for spiritual ambiance
  useEffect(() => {
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(circleGlow, {
          toValue: 0.8,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(circleGlow, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );
    glowAnimation.start();

    return () => glowAnimation.stop();
  }, []);

  // Initialize audio
  useEffect(() => {
    const loadAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });

        const { sound: audioSound } = await Audio.Sound.createAsync(
          mantraAudio[mantra],
          { 
            isLooping: true,
            volume: 0.7,
          }
        );
        setSound(audioSound);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [mantra]);

  // Handle guided mode audio playback
  useEffect(() => {
    if (mode === 'guided' && sound && isPlaying) {
      sound.playAsync();
    } else if (sound) {
      sound.pauseAsync();
    }

    return () => {
      if (sound) {
        sound.stopAsync();
      }
    };
  }, [mode, sound, isPlaying]);

  const incrementCount = async () => {
    // Enhanced haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Visual feedback animations (removed slow count scale)
    Animated.parallel([
      // Quick pulse animation
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]),
      // Glow effect
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]),
      // Ripple effect (keep the wavy effect)
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    setCount(prev => {
      const newCount = prev + 1;
      if (newCount >= CYCLE_LENGTH) {
        setCycles(c => c + 1);
        // Special celebration for cycle completion
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        return 0;
      }
      return newCount;
    });
  };

  const toggleAudio = async () => {
    if (mode === 'guided' && sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleSaveAndExit = async () => {
    console.log('Saving chanting session data:', {
      mantra,
      mode,
      finalCount: count,
      completedCycles: cycles,
      totalCounts: cycles * CYCLE_LENGTH + count,
      sessionDuration: Date.now(), // You can track actual session time
    });
    
    // Close popup and navigate back
    setShowExitPopup(false);
    if (sound) {
      await sound.stopAsync();
    }
    navigation.goBack();
  };

  const handleStayInSession = () => {
    setShowExitPopup(false);
  };

  const handleHeaderBackPress = () => {
    setShowExitPopup(true);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        // Visual feedback during swipe - lighter effect
        if (gesture.dy < -20) {
          pulseAnim.setValue(1 + Math.min(Math.abs(gesture.dy) / 300, 0.05));
        }
      },
      onPanResponderRelease: (_, gesture) => {
        pulseAnim.setValue(1);
        if (gesture.dy < -50) {
          incrementCount();
        }
      },
    })
  ).current;

  const progress = (count / CYCLE_LENGTH) * 100;
  const mantraData = mantraNames[mantra];

  return (
    <StarBackground>
      <View style={{ flex: 1 }} {...panResponder.panHandlers}>
        {/* Header */}
        <View style={{
          paddingTop: 60,
          paddingHorizontal: 24,
          alignItems: 'center',
          marginBottom: 40,
        }}>
          <TouchableOpacity
            onPress={handleHeaderBackPress}
            style={{
              position: 'absolute',
              left: 24,
              top: 60,
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>

          <Text style={{
            color: '#ffffff',
            fontSize: 28,
            fontWeight: '300',
            textAlign: 'center',
            letterSpacing: 1,
          }}>
            {mantraData.name}
          </Text>
          <Text style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 4,
          }}>
            {mantraData.sanskrit}
          </Text>
        </View>

        {/* Main Counting Circle */}
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
          {/* Ripple Effect */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 320,
              height: 320,
              borderRadius: 160,
              borderWidth: 2,
              borderColor: '#FFD700',
              opacity: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
              transform: [
                {
                  scale: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            }}
          />

          {/* Outer Glow Ring */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: 150,
              opacity: circleGlow,
            }}
          >
            <LinearGradient
              colors={['rgba(255, 215, 0, 0.3)', 'transparent', 'rgba(255, 215, 0, 0.2)']}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 150,
              }}
            />
          </Animated.View>

          {/* Main Circle Container */}
          <View>
            <TouchableOpacity
              onPress={incrementCount}
              activeOpacity={0.9}
              style={{
                width: 280,
                height: 280,
                borderRadius: 140,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Animated.View
                style={{
                  transform: [{ scale: pulseAnim }],
                }}
              >
                <AnimatedCircularProgress
                  size={280}
                  width={8}
                  fill={progress}
                  tintColor="#FFD700"
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  rotation={0}
                  lineCap="round"
                  backgroundWidth={6}
                  style={{
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.6,
                    shadowRadius: 10,
                    elevation: 8,
                  }}
                />
              </Animated.View>

              {/* Numbers Container - No Animation */}
              <View style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <View style={{ alignItems: 'center' }}>
                  {/* Main Count */}
                  <View style={{ alignItems: 'center' }}>
                    <LinearGradient
                      colors={['#FFD700', '#FFA000']}
                      style={{
                        borderRadius: 60,
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        minWidth: 120,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{
                        color: '#000000',
                        fontSize: 52,
                        fontWeight: '700',
                        textAlign: 'center',
                        letterSpacing: 2,
                      }}>
                        {count}
                      </Text>
                    </LinearGradient>
                  </View>

                  {/* Progress Text */}
                  <Text style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 16,
                    marginTop: 16,
                    letterSpacing: 1,
                  }}>
                    {count} / {CYCLE_LENGTH}
                  </Text>

                  {/* Cycles Counter */}
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    backgroundColor: 'rgba(255, 215, 0, 0.15)',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                  }}>
                    <Text style={{
                      color: '#FFD700',
                      fontSize: 16,
                      fontWeight: '600',
                      letterSpacing: 0.5,
                    }}>
                      Cycles: {cycles}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Active Glow Overlay */}
              <Animated.View
                style={{
                  position: 'absolute',
                  width: 280,
                  height: 280,
                  borderRadius: 140,
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  opacity: glowAnim,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Controls */}
        <View style={{
          paddingHorizontal: 24,
          paddingBottom: 40,
          alignItems: 'center',
        }}>
          {/* Audio Control (for guided mode) */}
          {mode === 'guided' && (
            <TouchableOpacity
              onPress={toggleAudio}
              style={{
                marginBottom: 24,
                paddingHorizontal: 20,
                paddingVertical: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 25,
                borderWidth: 1,
                borderColor: 'rgba(255, 215, 0, 0.3)',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons 
                name={isPlaying ? 'pause' : 'play'} 
                size={20} 
                color="#FFD700" 
              />
              <Text style={{
                color: '#FFD700',
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 8,
              }}>
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Instructions */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 14,
              textAlign: 'center',
              lineHeight: 20,
              letterSpacing: 0.5,
            }}>
              🙏 Tap circle • Swipe up to count
            </Text>
            <Text style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 4,
              letterSpacing: 0.5,
            }}>
              Each cycle completes at 108 counts
            </Text>
            {__DEV__ && (
              <Text style={{
                color: 'rgba(255, 193, 7, 0.8)',
                fontSize: 11,
                textAlign: 'center',
                marginTop: 8,
                fontStyle: 'italic',
              }}>
                Volume buttons: Install react-native-volume-manager for production
              </Text>
            )}
          </View>
        </View>

        {/* Exit Confirmation Modal */}
        <Modal
          visible={showExitPopup}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowExitPopup(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}>
            <View style={{
              backgroundColor: 'rgba(20, 20, 20, 0.95)',
              borderRadius: 24,
              padding: 32,
              width: '100%',
              maxWidth: 350,
              borderWidth: 1,
              borderColor: 'rgba(255, 215, 0, 0.2)',
            }}>
              {/* Modal Header */}
              <View style={{
                alignItems: 'center',
                marginBottom: 24,
              }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Text style={{ fontSize: 32 }}>🙏</Text>
                </View>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 22,
                  fontWeight: '600',
                  textAlign: 'center',
                  letterSpacing: 0.5,
                }}>
                  Save Your Progress?
                </Text>
              </View>

              {/* Session Summary */}
              <View style={{
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: 16,
                padding: 20,
                marginBottom: 24,
                borderWidth: 1,
                borderColor: 'rgba(255, 215, 0, 0.2)',
              }}>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 14,
                  textAlign: 'center',
                  marginBottom: 12,
                }}>
                  Current Session
                </Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <Text style={{
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                    Count:
                  </Text>
                  <Text style={{
                    color: '#FFD700',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                    {count}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <Text style={{
                    color: '#ffffff',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                    Cycles:
                  </Text>
                  <Text style={{
                    color: '#FFD700',
                    fontSize: 16,
                    fontWeight: '600',
                  }}>
                    {cycles}
                  </Text>
                </View>
              </View>

              {/* Buttons */}
              <View style={{ gap: 12 }}>
                {/* Save & Exit Button */}
                <TouchableOpacity
                  onPress={handleSaveAndExit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFD700', '#FFA000']}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 24,
                      borderRadius: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="save" size={20} color="#000" />
                    <Text style={{
                      color: '#000000',
                      fontSize: 18,
                      fontWeight: '700',
                      marginLeft: 8,
                      letterSpacing: 0.5,
                    }}>
                      Save & Exit
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Stay Button */}
                <TouchableOpacity
                  onPress={handleStayInSession}
                  activeOpacity={0.8}
                  style={{
                    paddingVertical: 16,
                    paddingHorizontal: 24,
                    borderRadius: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="arrow-back" size={20} color="#ffffff" />
                  <Text style={{
                    color: '#ffffff',
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 8,
                    letterSpacing: 0.5,
                  }}>
                    Continue Session
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </StarBackground>
  );
};

export default ChantingSessionScreen;