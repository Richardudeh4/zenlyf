import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const SuccessReportUpload = () => {
  const router = useRouter();

  const handleGetAIInsight = () => {
    console.log('Get AI Insight pressed');
    router.push('/MainScreen/getAIInsight');
    // Here you would typically navigate to AI insight screen
  };

  const handleViewReport = () => {
    console.log('View Report pressed');
    router.push('/MainScreen/viewReport');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <View style={styles.outerRing}>
            <View style={styles.innerCircle}>
              <Ionicons name="checkmark" size={48} color={colors.white} />
            </View>
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.successMessage}>
            Report uploaded{'\n'}successfully!
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.getAIInsightButton} onPress={handleGetAIInsight}>
            <Text style={styles.getAIInsightText}>Get AI Insight</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.viewReportButton} onPress={handleViewReport}>
            <Text style={styles.viewReportText}>View Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SuccessReportUpload;

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
  messageContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  successMessage: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 32,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getAIInsightButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  getAIInsightText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  viewReportButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  viewReportText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
});