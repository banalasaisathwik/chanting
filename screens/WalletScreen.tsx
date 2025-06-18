// File: screens/WalletScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StarBackground from './StarBackground';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any>;
};

const WalletScreen: React.FC<Props> = ({ navigation }) => {
  const [currentBalance, setCurrentBalance] = useState(210);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const balanceScaleAnim = useRef(new Animated.Value(1)).current;

  const quickAmounts = [50, 100, 200, 500, 1000, 2000];

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
    ]).start();
  }, []);

  const animateBalance = () => {
    Animated.sequence([
      Animated.timing(balanceScaleAnim, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(balanceScaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleQuickAmountPress = (amount: number) => {
    setSelectedQuickAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setCustomAmount(numericText);
    setSelectedQuickAmount(null);
  };

  const handleRechargeNow = async () => {
    const amount = parseInt(customAmount) || 0;
    
    if (amount < 10) {
      Alert.alert(
        '💰 Minimum Recharge',
        'Minimum recharge amount is ₹10. Please enter a valid amount to support our divine mission.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    if (amount > 10000) {
      Alert.alert(
        '🙏 Maximum Limit',
        'Maximum recharge amount is ₹10,000 per transaction. Please enter a smaller amount.',
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }

    Alert.alert(
      '💫 Confirm Recharge',
      `Are you sure you want to recharge ₹${amount.toLocaleString()} to your sacred wallet?\n\n🙏 Your contribution helps us spread divine love and maintain our spiritual services.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Recharge', 
          style: 'default',
          onPress: () => processRecharge(amount)
        }
      ]
    );
  };

  const processRecharge = async (amount: number) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentBalance(prev => prev + amount);
      setCustomAmount('');
      setSelectedQuickAmount(null);
      setIsProcessing(false);
      animateBalance();
      
      Alert.alert(
        '✨ Recharge Successful!',
        `₹${amount.toLocaleString()} has been added to your wallet.\n\n🙏 Thank you for supporting our divine mission!`,
        [{ text: 'Continue Chanting', style: 'default' }]
      );
    }, 2000);
  };

  const QuickAmountButton = ({ amount }: { amount: number }) => {
    const isSelected = selectedQuickAmount === amount;
    
    return (
      <TouchableOpacity
        onPress={() => handleQuickAmountPress(amount)}
        activeOpacity={0.8}
        style={{ flex: 1, marginHorizontal: 4 }}
      >
        <LinearGradient
          colors={isSelected 
            ? ['#FFD700', '#FFA000'] 
            : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderRadius: 16,
            alignItems: 'center',
            borderWidth: isSelected ? 2 : 1,
            borderColor: isSelected ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
            shadowColor: isSelected ? '#FFD700' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: isSelected ? 0.3 : 0.1,
            shadowRadius: 8,
            elevation: isSelected ? 6 : 2,
          }}
        >
          <Text style={{
            color: isSelected ? '#000000' : '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
            +₹{amount}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 16,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
                💰 Sacred Wallet
              </Text>

              <View style={{ width: 44 }} />
            </View>
          </Animated.View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Current Balance Card */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: balanceScaleAnim }
                ],
                marginBottom: 32,
              }}
            >
              <LinearGradient
                colors={['#FFD700', '#FFA000']}
                style={{
                  borderRadius: 24,
                  padding: 32,
                  alignItems: 'center',
                  shadowColor: '#FFD700',
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.4,
                  shadowRadius: 24,
                  elevation: 12,
                }}
              >
                <Text style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: 16,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 8,
                }}>
                  🙏 Current Balance
                </Text>
                
                <Text style={{
                  color: '#000000',
                  fontSize: 48,
                  fontWeight: 'bold',
                  marginBottom: 8,
                }}>
                  ₹{currentBalance.toLocaleString()}
                </Text>
                
                <View style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                }}>
                  <Text style={{
                    color: 'rgba(0, 0, 0, 0.7)',
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                    ✨ Ready for spiritual journey
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Information Note */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginBottom: 32,
              }}
            >
              <View style={{
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderRadius: 20,
                padding: 20,
                borderWidth: 1,
                borderColor: 'rgba(255, 215, 0, 0.3)',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}>
                    <Ionicons name="information-circle" size={24} color="#FFD700" />
                  </View>
                  <Text style={{
                    color: '#FFD700',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                    Sacred Contribution
                  </Text>
                </View>
                
                <Text style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: 'justify',
                }}>
                  ₹1 will be deducted every time you open the app. This small contribution helps us maintain our servers and support our team in spreading divine love and spiritual guidance.
                </Text>
                
                <View style={{
                  marginTop: 12,
                  padding: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 12,
                }}>
                  <Text style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: 14,
                    fontStyle: 'italic',
                    textAlign: 'center',
                  }}>
                    🙏 "Your support helps thousands find peace through sacred chanting"
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Custom Amount Input */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginBottom: 24,
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
              }}>
                💫 Enter Custom Amount
              </Text>
              
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: customAmount ? '#FFD700' : 'rgba(255, 255, 255, 0.2)',
                shadowColor: customAmount ? '#FFD700' : '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: customAmount ? 0.2 : 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginRight: 8,
                  }}>
                    ₹
                  </Text>
                  
                  <TextInput
                    style={{
                      flex: 1,
                      color: '#FFFFFF',
                      fontSize: 20,
                      fontWeight: '600',
                    }}
                    value={customAmount}
                    onChangeText={handleCustomAmountChange}
                    placeholder="Enter amount"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  
                  {customAmount && (
                    <TouchableOpacity
                      onPress={() => {
                        setCustomAmount('');
                        setSelectedQuickAmount(null);
                      }}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="close" size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Animated.View>

            {/* Quick Amount Buttons */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginBottom: 32,
              }}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
              }}>
                ⚡ Quick Recharge
              </Text>
              
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: -4,
                marginBottom: 16,
              }}>
                {quickAmounts.slice(0, 3).map((amount) => (
                  <QuickAmountButton key={amount} amount={amount} />
                ))}
              </View>
              
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: -4,
              }}>
                {quickAmounts.slice(3).map((amount) => (
                  <QuickAmountButton key={amount} amount={amount} />
                ))}
              </View>
            </Animated.View>

            {/* Recharge Now Button */}
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleRechargeNow}
                disabled={isProcessing || !customAmount || parseInt(customAmount) < 10}
                activeOpacity={0.8}
                style={{
                  opacity: (!customAmount || parseInt(customAmount) < 10) ? 0.5 : 1,
                }}
              >
                <LinearGradient
                  colors={isProcessing 
                    ? ['rgba(255, 215, 0, 0.5)', 'rgba(255, 152, 0, 0.5)']
                    : ['#FFD700', '#FFA000']}
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center',
                    shadowColor: '#FFD700',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                  }}
                >
                  {isProcessing ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Animated.View
                        style={{
                          marginRight: 12,
                          transform: [{
                            rotate: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0deg', '360deg'],
                            })
                          }]
                        }}
                      >
                        <Ionicons name="refresh" size={24} color="#000" />
                      </Animated.View>
                      <Text style={{
                        color: '#000000',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                        Processing Sacred Payment...
                      </Text>
                    </View>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="card" size={24} color="#000" style={{ marginRight: 12 }} />
                      <Text style={{
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                        🙏 Recharge Now
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Support Message */}
            <View style={{
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}>
              <Text style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 16,
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: 8,
              }}>
                🕉️ "Every contribution spreads divine love"
              </Text>
              <Text style={{
                color: '#FFD700',
                fontSize: 14,
                fontWeight: '600',
              }}>
                - Premanand Maharaj
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default WalletScreen;