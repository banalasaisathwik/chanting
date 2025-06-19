// File: utils/walletUtils.ts
import { Alert } from 'react-native';

export const QUICK_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

export const validateRechargeAmount = (amount: number): boolean => {
  if (amount < 10) {
    Alert.alert(
      '💰 Minimum Recharge',
      'Minimum recharge amount is ₹10. Please enter a valid amount to support our divine mission.',
      [{ text: 'OK', style: 'default' }]
    );
    return false;
  }

  if (amount > 10000) {
    Alert.alert(
      '🙏 Maximum Limit',
      'Maximum recharge amount is ₹10,000 per transaction. Please enter a smaller amount.',
      [{ text: 'OK', style: 'default' }]
    );
    return false;
  }

  return true;
};

export const showRechargeConfirmation = (
  amount: number,
  onConfirm: () => void
): void => {
  Alert.alert(
    '💫 Confirm Recharge',
    `Are you sure you want to recharge ₹${amount.toLocaleString()} to your sacred wallet?\n\n🙏 Your contribution helps us spread divine love and maintain our spiritual services.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Recharge', 
        style: 'default',
        onPress: onConfirm
      }
    ]
  );
};

export const showRechargeSuccess = (amount: number): void => {
  Alert.alert(
    '✨ Recharge Successful!',
    `₹${amount.toLocaleString()} has been added to your wallet.\n\n🙏 Thank you for supporting our divine mission!`,
    [{ text: 'Continue Chanting', style: 'default' }]
  );
};

export const sanitizeAmountInput = (text: string): string => {
  // Only allow numbers
  return text.replace(/[^0-9]/g, '');
};