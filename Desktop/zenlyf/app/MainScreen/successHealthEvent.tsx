import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const SuccessHealthEvent = () => {
  const router = useRouter();

  // Auto-navigate back after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          {/* Outer glow ring */}
          <View style={styles.outerRing}>
            {/* Inner blue circle */}
            <View style={styles.innerCircle}>
              <Ionicons name="checkmark" size={48} color={colors.white} />
            </View>
          </View>
        </View>

        {/* Success Text */}
        <View style={styles.textContainer}>
          <Text style={styles.successText}>
            Event added{'\n'}successfully!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessHealthEvent;

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
  successIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  outerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 119, 255, 0.2)', // Light blue translucent ring
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary, // Solid blue circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 32,
  },
});