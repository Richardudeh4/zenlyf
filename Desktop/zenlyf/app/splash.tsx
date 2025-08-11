import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Config/colors';
import { fonts } from '../Config/Fonts';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcomescreen');
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

    return (
    <View style={styles.container}>
      {/* Meditative Figure Icon */}
      <View style={styles.iconContainer}>
        {/* Head */}
        <View style={styles.head} />
        
        {/* Body - flowing meditative pose */}
       
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, // Bright blue background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  bodyContainer: {
    width: 120,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyLine: {
    width: 4,
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  baseContainer: {
    width: 140,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseLine: {
    width: 100,
    height: 4,
    backgroundColor: colors.white,
    borderRadius: 2,
  },
  brandName: {
    fontSize: 32,
    fontFamily: fonts.onestBold,
    color: colors.white,
    letterSpacing: 2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.white,
    letterSpacing: 1,
  },
});

export default SplashScreen;
