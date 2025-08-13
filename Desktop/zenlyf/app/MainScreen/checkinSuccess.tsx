import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const CheckinSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate back to previous screen after 3 seconds
    const timer = setTimeout(() => {
      router.push("/MainScreen/patientProfile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.successContainer}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconGlow}>
            <View style={styles.iconCircle}>
              <Ionicons name="checkmark" size={48} color={colors.white} />
            </View>
          </View>
        </View>

        {/* Success Text */}
        <View style={styles.textContainer}>
          <Text style={styles.successText}>
            <Text style={styles.firstLine}>Check-in</Text>{'\n'}
            <Text style={styles.secondLine}>Scheduled!</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CheckinSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(0, 119, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  successText: {
    textAlign: 'center',
    lineHeight: 40,
  },
  firstLine: {
    fontSize: 28,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  secondLine: {
    fontSize: 28,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
});