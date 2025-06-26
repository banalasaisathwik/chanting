// File: screens/ChantModeScreen.tsx (Updated with Cross-Platform Popup)
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './StarBackground';

// Types and Data
import { ChantModeScreenProps, EditingSection } from '../types/chantMode';
import { mantras, modes } from '../data/chantModeData';

// Components
import {
  StepHeader,
  MantraItem,
  ModeCard,
  SummaryCard,
  StartButton,
} from '../components/chantMode';

// 🆕 Import the Cross-Platform FirstTimeInfoPopup
import FirstTimeInfoPopup from '../components/chantMode/FirstTimeInfoPopup';

// Animation Utils
import { 
  createParallelEntryAnimation, 
  createSectionTransitionAnimation,
  ANIMATION_VALUES 
} from '../utils/chantModeAnimations';
import { useAuth } from 'contexts/AuthContext';

const ChantModeScreen: React.FC<ChantModeScreenProps> = ({ navigation }) => {
  // State
  const [selectedMantra, setSelectedMantra] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [editingSection, setEditingSection] = useState<EditingSection>('mantra');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(ANIMATION_VALUES.SLIDE_DISTANCE)).current;
  const buttonScale = useRef(new Animated.Value(ANIMATION_VALUES.INITIAL_SCALE)).current;
  const modesSectionAnim = useRef(new Animated.Value(0)).current;

  // Initialize animations
  useEffect(() => {
    createParallelEntryAnimation({ fadeAnim, slideAnim, buttonScale }).start();
  }, []);

  // Animation flow management
  useEffect(() => {
    if (selectedMantra && !selectedMode) {
      setEditingSection('mode');
      createSectionTransitionAnimation(modesSectionAnim).start();
    }
  }, [selectedMantra, selectedMode]);

  useEffect(() => {
    if (selectedMantra && selectedMode) setEditingSection(null);
  }, [selectedMantra, selectedMode]);

  // Handlers
  const handleMantraSelect = (mantraId: string) => {
    setSelectedMantra(mantraId);
    setEditingSection(selectedMode ? null : 'mode');
  };

  const handleModeSelect = (modeId: string) => {
    setSelectedMode(modeId);
    setEditingSection(null);
  };

  const handleEditMantra = () => {
    setEditingSection('mantra');
    modesSectionAnim.setValue(0);
  };

  const handleEditMode = () => {
    setEditingSection('mode');
    createSectionTransitionAnimation(modesSectionAnim, 400).start();
  };

  const [checkingBalance, setCheckingBalance] = useState(false);
const { user, loading } = useAuth();

const handleStartChanting = async () => {
  if (loading) return;

  if (!user) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    });
    return;
  }

  if (!selectedMode || !selectedMantra) return;

  setCheckingBalance(true);

  try {
    const res = await fetch('http://192.168.29.32:3000/api/balance', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch balance');

    const data = await res.json();
    const balance = data.balance;

    if (balance < 1) {
      navigation.navigate('Wallet');
    } else {
      console.log('Start Chanting:', { selectedMode, selectedMantra });
      navigation.navigate('ChantingSession', { mantra: selectedMantra, mode: selectedMode });
    }
  } catch (error) {
    console.error('❌ Error fetching balance:', error);
  } finally {
    setCheckingBalance(false);
  }
};



  // Data
  const selectedMantraData = mantras.find(m => m.id === selectedMantra);
  const selectedModeData = modes.find(m => m.id === selectedMode);
  const isSelectionComplete = Boolean(selectedMantra && selectedMode);

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <StepHeader
            editingSection={editingSection}
            selectedMantra={selectedMantra}
            selectedMode={selectedMode}
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
          />

          {/* Mantra Section */}
          {editingSection === 'mantra' ? (
            <Animated.View style={{ opacity: fadeAnim, marginBottom: 36 }}>
              <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '600', marginBottom: 20, letterSpacing: 0.5 }}>
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

          {/* Mode Section */}
          {editingSection === 'mode' && selectedMantra ? (
            <Animated.View
              style={{
                opacity: modesSectionAnim,
                transform: [{ translateY: modesSectionAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
                marginBottom: 36,
              }}
            >
              <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '600', marginBottom: 20, letterSpacing: 0.5 }}>
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

          <StartButton
            isSelectionComplete={isSelectionComplete}
            onPress={handleStartChanting}
            fadeAnim={fadeAnim}
            buttonScale={buttonScale}
          />
          {checkingBalance && (
  <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
)}

        </ScrollView>

        {/* 🆕 Cross-Platform First Time Info Popup */}
        {/* Works on Web (localStorage) and Mobile (AsyncStorage) */}
        <FirstTimeInfoPopup />
      </SafeAreaView>
    </StarBackground>
  );
};

export default ChantModeScreen;