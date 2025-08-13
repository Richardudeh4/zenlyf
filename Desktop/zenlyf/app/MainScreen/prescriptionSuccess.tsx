import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';


const PrescriptionSuccess = () => {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Show loader for 5 seconds, then show success screen
    const loaderTimer = setTimeout(() => {
      setShowSuccess(true);
    }, 5000);

    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    // Navigate to patientProfile after 6 seconds of showing success screen
    if (showSuccess) {
      const navigationTimer = setTimeout(() => {
        router.push('/MainScreen/patientProfile');
      }, 6000);

      return () => clearTimeout(navigationTimer);
    }
  }, [showSuccess, router]);

  if (!showSuccess) {
    return (
      <SafeAreaView style={styles.container}>
                <View style={styles.loaderContainer}>
          <ActivityIndicator 
            size="large" 
            color={colors.primary}
            
          />
          <Text style={styles.loaderText}>Processing prescription...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.firstLine}>Medication</Text>{'\n'}
            <Text style={styles.secondLine}>Prescribed!</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PrescriptionSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loaderText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginTop: 24,
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
