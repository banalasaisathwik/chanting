// File: screens/ProfileScreen.tsx (Alternative with cleaner imports)
import React, { useRef, useEffect, useState } from 'react';
import { ScrollView, Animated, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarBackground from './StarBackground';

// Types and Data
import { ProfileScreenProps } from '../types/profile';
import { userData } from '../data/userData';

// Components (using barrel export)
import {
  AnimatedSection,
  UserProfileHeader,
  StatsCards,
  ChartSection,
  WalletSection,
  AboutSection,
  ContactSection,
} from '../components/profile';

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const fadeAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
  const slideAnims = useRef(Array.from({ length: 6 }, () => new Animated.Value(40))).current;
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const animations = fadeAnims.map((fadeAnim, index) => 
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          delay: index * 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: 700,
          delay: index * 200,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.stagger(150, animations).start(() => {
      setTimeout(() => setChartVisible(true), 400);
    });
  }, []);

  const handleWalletPress = () => navigation.navigate('Wallet');
  const handleContactEmail = () => Linking.openURL('mailto:support@radheapp.com?subject=🙏 Support Request - Radhe Radhe');
  const handleContactWhatsApp = () => Linking.openURL('whatsapp://send?phone=+919876543210&text=🙏 Radhe Radhe! I need assistance with the app.');

  const sections = [
    <UserProfileHeader userData={userData} navigation={navigation} />,
    <StatsCards />,
    <ChartSection userData={userData} chartVisible={chartVisible} />,
    <WalletSection userData={userData} onWalletPress={handleWalletPress} />,
    <AboutSection />,
    <ContactSection onEmailPress={handleContactEmail} onWhatsAppPress={handleContactWhatsApp} />,
  ];

  return (
    <StarBackground>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ 
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {sections.map((section, index) => (
            <AnimatedSection 
              key={index} 
              index={index} 
              fadeAnims={fadeAnims} 
              slideAnims={slideAnims}
            >
              {section}
            </AnimatedSection>
          ))}
        </ScrollView>
      </SafeAreaView>
    </StarBackground>
  );
};

export default ProfileScreen;