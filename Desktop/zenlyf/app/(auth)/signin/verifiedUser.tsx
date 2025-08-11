import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ShieldIcon from '../../../components/ShieldIcon';
import { colors } from '../../../Config/colors';
import { fonts } from '../../../Config/Fonts';

const VerifiedUser = () => {
  const router = useRouter();

  const handleContinueToDashboard = useCallback(() => {
    // Navigate to dashboard or main app screen
    router.replace('/(tabs)');
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Shield Icon */}
        <View style={styles.iconContainer}>
          <ShieldIcon />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>You are verified!</Text>
          <Text style={styles.description}>
            You're protected. Zenlyf will ask for a code when you log in on a new device.
          </Text>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinueToDashboard}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifiedUser;

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
  iconContainer: {
    marginBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
    maxWidth: 300,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});