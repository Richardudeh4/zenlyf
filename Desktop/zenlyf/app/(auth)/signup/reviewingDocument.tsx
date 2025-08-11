import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../Config/colors';
import { fonts } from '../../../Config/Fonts';

const ReviewingDocument = () => {
  const router = useRouter();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // 2 seconds per rotation
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    // Auto-navigate after 5 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/signin'); // Use replace to prevent going back to this screen
    }, 5000); // 5 seconds

    return () => {
      clearTimeout(timer);
      spinAnimation.stop();
    };
  }, [router, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>We're reviewing{'\n'}your documents</Text>
        <Text style={styles.message}>
          Thanks! Your documents are been{'\n'}submitted for review. You'll be notified{'\n'}within 24-48 hours.
        </Text>

        <View style={styles.loadingContainer}>
          {/* Semi-circular loading animation */}
          <Animated.View 
            style={[
              styles.semiCircleLoader,
              { transform: [{ rotate: spin }] }
            ]} 
          />
          <Text style={styles.statusText}>Manual Review in Progress...</Text>
        </View>

        <TouchableOpacity style={styles.dashboardButton}>
          <Text style={styles.dashboardButtonText}>Go to Limited Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.smallText}>(no patient linking yet)</Text>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  semiCircleLoader: {
    width: 80,
    height: 40, // Half of width to make it a semi-circle
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderWidth: 6,
    borderColor: colors.primary, // Blue color
    borderBottomColor: 'transparent', // Make bottom transparent
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: 'center',
  },
  dashboardButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  dashboardButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.onestBold,
  },
  smallText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary, // Blue border
  },
  logoutButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.onestBold,
  },
});

export default ReviewingDocument;