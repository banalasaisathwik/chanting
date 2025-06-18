import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from 'screens/StarBackground';
import { StackNavigationProp } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

// Type definitions
type Props = {
  navigation: StackNavigationProp<any>;
};

type Mantra = {
  id: string;
  name: string;
  description: string;
  sanskrit: string;
  color: [string, string];
};

type Mode = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  gradient: [string, string];
};

type ModeCardProps = {
  mode: Mode;
  isSelected: boolean;
  onPress: () => void;
  index: number;
};

type MantraItemProps = {
  mantra: Mantra;
  isSelected: boolean;
  onPress: () => void;
  index: number;
};

type SummaryCardProps = {
  title: string;
  selectedItem: Mantra | Mode;
  icon: string;
  onEdit: () => void;
  type: 'mantra' | 'mode';
};

const ChantModeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedMantra, setSelectedMantra] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [editingSection, setEditingSection] = useState<'mantra' | 'mode' | null>('mantra');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(0.95)).current;
  const modesSectionAnim = useRef(new Animated.Value(0)).current;

  const mantras: Mantra[] = [
    { 
      id: 'radha', 
      name: 'Radha Radha', 
      description: 'Divine love and devotion chant',
      sanskrit: 'राधा राधा',
      color: ['#FF6B9D', '#E91E63']
    },
    { 
      id: 'krishna', 
      name: 'Krishnaya Vasudevaya', 
      description: 'Lord Krishna protection mantra',
      sanskrit: 'कृष्णाय वासुदेवाय',
      color: ['#4FC3F7', '#29B6F6']
    },

  ];

  const modes: Mode[] = [
    { 
      id: 'guided', 
      title: 'Guided Chanting', 
      subtitle: 'With beautiful audio guidance', 
      icon: '🎧',
      description: 'Perfect for beginners and meditation',
      gradient: ['rgba(76, 175, 80, 0.15)', 'rgba(56, 142, 60, 0.1)']
    },
    { 
      id: 'own', 
      title: 'Self Practice', 
      subtitle: 'Your own rhythm and pace', 
      icon: '🧘',
      description: 'Tap, swipe, or use volume controls',
      gradient: ['rgba(156, 39, 176, 0.15)', 'rgba(103, 58, 183, 0.1)']
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, buttonScale]);

  // Show modes section when mantra is selected
  useEffect(() => {
    if (selectedMantra && !selectedMode) {
      setEditingSection('mode');
      Animated.timing(modesSectionAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedMantra, selectedMode, modesSectionAnim]);

  // Clear editing section when both are selected
  useEffect(() => {
    if (selectedMantra && selectedMode) {
      setEditingSection(null);
    }
  }, [selectedMantra, selectedMode]);

  const ModeCard: React.FC<ModeCardProps> = ({ mode, isSelected, onPress }) => {
    const cardScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(cardScale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const gradientColors: [string, string] = isSelected 
      ? ['rgba(255, 193, 7, 0.2)', 'rgba(255, 152, 0, 0.1)']
      : mode.gradient;

    return (
      <Animated.View
        style={{
          transform: [{ scale: cardScale }],
          marginBottom: 16,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={gradientColors}
            style={{
              borderRadius: 20,
              padding: 24,
              borderWidth: isSelected ? 2 : 1,
              borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Glow effect for selected */}
            {isSelected && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 60,
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}
              />
            )}
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Text style={{ fontSize: 28 }}>{mode.icon}</Text>
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: '700',
                  marginBottom: 4,
                  letterSpacing: 0.5,
                }}>
                  {mode.title}
                </Text>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: 15,
                  fontWeight: '500',
                  marginBottom: 8,
                }}>
                  {mode.subtitle}
                </Text>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 13,
                  lineHeight: 18,
                }}>
                  {mode.description}
                </Text>
              </View>
              
              {isSelected && (
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#FFD700',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Ionicons name="checkmark" size={20} color="#000" />
                </View>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const SummaryCard: React.FC<SummaryCardProps> = ({ 
    title, 
    selectedItem, 
    icon, 
    onEdit, 
    type 
  }) => {
    const summaryScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(summaryScale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(summaryScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const displayName = type === 'mantra' 
      ? (selectedItem as Mantra).name 
      : (selectedItem as Mode).title;

    const showSanskrit = type === 'mantra' && (selectedItem as Mantra).sanskrit;

    return (
      <Animated.View style={{ transform: [{ scale: summaryScale }], marginBottom: 16 }}>
        <TouchableOpacity
          onPress={onEdit}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['rgba(255, 193, 7, 0.15)', 'rgba(255, 152, 0, 0.05)']}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#FFD700',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          >
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}>
              <Text style={{ fontSize: 20 }}>{icon}</Text>
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 12,
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 2,
              }}>
                {title}
              </Text>
              <Text style={{
                color: '#ffffff',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.5,
              }}>
                {displayName}
              </Text>
              {showSanskrit && (
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 14,
                  marginTop: 2,
                }}>
                  {(selectedItem as Mantra).sanskrit}
                </Text>
              )}
            </View>
            
            <View style={{
              padding: 8,
              borderRadius: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}>
              <Ionicons name="pencil" size={16} color="#FFD700" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const MantraItem: React.FC<MantraItemProps> = ({ mantra, isSelected, onPress }) => {
    const itemScale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      Animated.spring(itemScale, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(itemScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    const gradientColors: [string, string] = isSelected 
      ? ['rgba(255, 193, 7, 0.15)', 'rgba(255, 152, 0, 0.05)']
      : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'];

    return (
      <Animated.View
        style={{
          transform: [{ scale: itemScale }],
          marginBottom: 12,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={gradientColors}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 16,
              borderWidth: isSelected ? 1.5 : 1,
              borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Custom Radio Button */}
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
              marginRight: 16,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isSelected ? '#FFD700' : 'transparent',
            }}>
              {isSelected && (
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#000',
                }} />
              )}
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{
                  color: '#ffffff',
                  fontSize: 18,
                  fontWeight: '600',
                  letterSpacing: 0.5,
                  flex: 1,
                }}>
                  {mantra.name}
                </Text>
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 16,
                  fontWeight: '400',
                }}>
                  {mantra.sanskrit}
                </Text>
              </View>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: 14,
                lineHeight: 20,
              }}>
                {mantra.description}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const handleMantraSelect = (mantraId: string) => {
    setSelectedMantra(mantraId);
    if (selectedMode) {
      setEditingSection(null);
    } else {
      setEditingSection('mode');
    }
  };

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    setEditingSection(null);
  };

  const handleEditMantra = () => {
    setEditingSection('mantra');
    // Reset modes section animation for smooth reopening
    modesSectionAnim.setValue(0);
  };

  const handleEditMode = () => {
    setEditingSection('mode');
    // Animate modes section back in
    Animated.timing(modesSectionAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const handleStartChanting = () => {
    console.log('Start Chanting:', { selectedMode, selectedMantra });
    // Add your navigation or next step logic here
    navigation.navigate('ChantingSession', { mantra: selectedMantra, mode: selectedMode });

  };

  const getStepText = () => {
    if (editingSection === 'mantra') {
      return 'Step 1: Select your preferred mantra';
    } else if (editingSection === 'mode') {
      return 'Step 2: Choose your chanting style';
    } else if (selectedMantra && selectedMode) {
      return 'Ready to begin your spiritual journey';
    } else {
      return 'Complete your selections to continue';
    }
  };

  const selectedMantraData = mantras.find(m => m.id === selectedMantra);
  const selectedModeData = modes.find(m => m.id === selectedMode);
  const isSelectionComplete = Boolean(selectedMantra && selectedMode);

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingHorizontal: 24,
            paddingTop: 20,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <Text style={{
              color: '#ffffff',
              fontSize: 32,
              fontWeight: '300',
              textAlign: 'center',
              marginBottom: 8,
              letterSpacing: 1,
            }}>
              Choose Your Practice
            </Text>
            <View style={{
              height: 2,
              width: 60,
              backgroundColor: '#FFD700',
              marginBottom: 12,
              borderRadius: 1,
            }} />
            <Text style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 16,
              textAlign: 'center',
              fontWeight: '400',
            }}>
              {getStepText()}
            </Text>
          </Animated.View>

          {/* Mantra Selection or Summary */}
          {editingSection === 'mantra' ? (
            <Animated.View
              style={{
                opacity: fadeAnim,
                marginBottom: 36,
              }}
            >
              <Text style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '600',
                marginBottom: 20,
                letterSpacing: 0.5,
              }}>
                Select Mantra
              </Text>
              
              {mantras.map((mantra, index) => (
                <MantraItem
                  key={mantra.id}
                  mantra={mantra}
                  isSelected={selectedMantra === mantra.id}
                  onPress={() => handleMantraSelect(mantra.id)}
                  index={index}
                />
              ))}
            </Animated.View>
          ) : selectedMantraData ? (
            <View style={{ marginBottom: 20 }}>
              <SummaryCard
                title="Selected Mantra"
                selectedItem={selectedMantraData}
                icon="🕉️"
                onEdit={handleEditMantra}
                type="mantra"
              />
            </View>
          ) : null}

          {/* Chanting Mode Section or Summary */}
          {editingSection === 'mode' && selectedMantra ? (
            <Animated.View
              style={{
                opacity: modesSectionAnim,
                transform: [
                  {
                    translateY: modesSectionAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
                marginBottom: 36,
              }}
            >
              <Text style={{
                color: '#ffffff',
                fontSize: 22,
                fontWeight: '600',
                marginBottom: 20,
                letterSpacing: 0.5,
              }}>
                Choose Chanting Mode
              </Text>
              
              {modes.map((mode, index) => (
                <ModeCard
                  key={mode.id}
                  mode={mode}
                  isSelected={selectedMode === mode.id}
                  onPress={() => handleModeSelect(mode.id)}
                  index={index}
                />
              ))}
            </Animated.View>
          ) : selectedModeData ? (
            <View style={{ marginBottom: 24 }}>
              <SummaryCard
                title="Chanting Mode"
                selectedItem={selectedModeData}
                icon={selectedModeData.icon}
                onEdit={handleEditMode}
                type="mode"
              />
            </View>
          ) : null}

          {/* Start Button - Always visible but conditionally active */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: buttonScale }],
            }}
          >
            <TouchableOpacity
              onPress={isSelectionComplete ? handleStartChanting : undefined}
              activeOpacity={isSelectionComplete ? 0.9 : 1}
              disabled={!isSelectionComplete}
            >
              <LinearGradient
                colors={
                  isSelectionComplete
                    ? ['#FFD700', '#FFA000']
                    : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  paddingVertical: 18,
                  paddingHorizontal: 32,
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: isSelectionComplete ? '#FFD700' : 'transparent',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: isSelectionComplete ? 0.4 : 0,
                  shadowRadius: 12,
                  elevation: isSelectionComplete ? 8 : 0,
                  borderWidth: isSelectionComplete ? 0 : 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Text style={{
                  color: isSelectionComplete ? '#000000' : 'rgba(255, 255, 255, 0.5)',
                  fontSize: 20,
                  fontWeight: '700',
                  marginRight: 12,
                  letterSpacing: 0.5,
                }}>
                  {isSelectionComplete 
                    ? 'Start Chanting' 
                    : 'Complete Your Selection'
                  }
                </Text>
                <Ionicons 
                  name="arrow-forward" 
                  size={24} 
                  color={isSelectionComplete ? '#000' : 'rgba(255, 255, 255, 0.5)'} 
                />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default ChantModeScreen;