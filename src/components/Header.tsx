// components/Header.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  title?: string;
  user: { name: string; photo?: string } | null;
}

const Header: React.FC<HeaderProps> = ({ title = 'DailyGita', user }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {user?.photo && (
        <Image
          source={{ uri: user.photo }}
          style={styles.avatar}
          resizeMode="cover"
        />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
});
