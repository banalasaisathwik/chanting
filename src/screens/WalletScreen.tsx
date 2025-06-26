// File: screens/WalletScreen.tsx (Ultra Clean Version)
import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Animated, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

// If using Razorpay
import RazorpayCheckout from 'react-native-razorpay';

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
    const amount = parseInt(customAmount);
    if (validateRechargeAmount(amount)) {
      showRechargeConfirmation(amount, () => processRecharge(amount));
    }
  };

  // Razorpay recharge logic
  const processRecharge = async (amount: number) => {
    setIsProcessing(true);
    try {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODU2NTA3MThlZDNjYmQ2ZDUxOWVkMzgiLCJuYW1lIjoiU2Fpc2F0aHdpayBCYW5hbGEiLCJlbWFpbCI6ImJhbmFsYXNhaXNhdGh3aWtAZ21haWwuY29tIiwiaWF0IjoxNzUwNzAwMTExLCJleHAiOjE3NTEzMDQ5MTF9.DhgLBLpEz3xWkgSestsQ2PXURQU_Vpab4sxJ-00MRrs"

      const orderRes = await fetch('http://192.168.29.32:3000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const order = await orderRes.json();
      if (!order?.id) throw new Error('Order creation failed');

      const options = {
        description: 'Recharge your Wallet',
        image: 'https://your-logo.com/logo.png',
        currency: 'INR',
        key: "rzp_test_QgiGGkjrNxiBPG",
        amount: amount * 100,
        name: 'YourAppName',
        order_id: order.id,
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: { color: '#FFA000' },
      };

      RazorpayCheckout.open(options)
        .then(async (response: any) => {
          const dbRes = await fetch('http://192.168.29.32:3000/api/payments?action=mobile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ amountAdded: amount, status: 'success' }),
          });

          const dbData = await dbRes.json();
          if (!dbRes.ok) throw new Error(dbData.error || 'DB update failed');

          setCurrentBalance((prev) => prev + amount);
          animateBalance();
          setCustomAmount('');
          setSelectedQuickAmount(null);
          showRechargeSuccess(amount);
        })
        .catch((err: any) => {
          Alert.alert('Payment Failed', err.description || 'Try again later');
        });
    } catch (err: any) {
      Alert.alert('Recharge Error', err.message || 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
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