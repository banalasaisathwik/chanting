// File: screens/WalletScreen.tsx (Ultra Clean Version)
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './StarBackground';

// Types and Utils
import { WalletScreenProps } from '../types/wallet';
import {
  QUICK_AMOUNTS,
  validateRechargeAmount,
  showRechargeConfirmation,
  showRechargeSuccess,
  sanitizeAmountInput,
} from '../utils/walletUtils';

// Components
import {
  Header,
  BalanceCard,
  InfoNote,
  CustomAmountInput,
  QuickAmountGrid,
  RechargeButton,
  SupportMessage,
} from '../components/wallet';

const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  // State
  const [currentBalance, setCurrentBalance] = useState(210);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const balanceScaleAnim = useRef(new Animated.Value(1)).current;

  // Initialize animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // Animation helpers
  const animateBalance = () => {
    Animated.sequence([
      Animated.timing(balanceScaleAnim, { toValue: 1.1, duration: 200, useNativeDriver: true }),
      Animated.timing(balanceScaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  // Event handlers
  const handleQuickAmountPress = (amount: number) => {
    setSelectedQuickAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(sanitizeAmountInput(text));
    setSelectedQuickAmount(null);
  };

  const handleClearAmount = () => {
    setCustomAmount('');
    setSelectedQuickAmount(null);
  };

  const handleRechargeNow = () => {
    const amount = parseInt(customAmount) || 0;
    if (validateRechargeAmount(amount)) {
      showRechargeConfirmation(amount, () => processRecharge(amount));
    }
  };

  const processRecharge = (amount: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentBalance(prev => prev + amount);
      setCustomAmount('');
      setSelectedQuickAmount(null);
      setIsProcessing(false);
      animateBalance();
      showRechargeSuccess(amount);
    }, 2000);
  };

  // Common animation props
  const animationProps = { fadeAnim, slideAnim };

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Header navigation={navigation} {...animationProps} />

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <BalanceCard
              currentBalance={currentBalance}
              balanceScaleAnim={balanceScaleAnim}
              {...animationProps}
            />

            <InfoNote {...animationProps} />

            <CustomAmountInput
              customAmount={customAmount}
              onAmountChange={handleCustomAmountChange}
              onClear={handleClearAmount}
              {...animationProps}
            />

            <QuickAmountGrid
              quickAmounts={QUICK_AMOUNTS}
              selectedAmount={selectedQuickAmount}
              onAmountPress={handleQuickAmountPress}
              {...animationProps}
            />

            <RechargeButton
              customAmount={customAmount}
              isProcessing={isProcessing}
              onRecharge={handleRechargeNow}
              {...animationProps}
            />

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default WalletScreen;