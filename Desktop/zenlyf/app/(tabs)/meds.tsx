import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const Meds = () => {
  const router = useRouter();
  const handleViewFullAnalysis = () => {
    console.log('View Full Analysis pressed');
    // Here you would implement full analysis view
  };

  const handleUploadNewPrescription = () => {
    console.log('Upload New Prescription pressed');
    // Here you would implement prescription upload
    router.push('/MainScreen/prescriptionAnalysis');
  };

  const renderMedicationCard = (
    medications: string,
    status: 'safe' | 'interaction',
    detail?: string
  ) => (
    <View style={styles.medicationCard}>
      <Text style={styles.medicationTitle}>{medications}</Text>
      <View style={styles.statusContainer}>
        {status === 'safe' ? (
          <>
            <View style={styles.safeIcon}>
              <Ionicons name="checkmark" size={16} color={colors.white} />
            </View>
            <Text style={styles.statusText}>Safe</Text>
          </>
        ) : (
          <>
            <View style={styles.warningIcon}>
              <Ionicons name="warning" size={16} color={colors.white} />
            </View>
            <Text style={styles.statusText}>Interaction</Text>
          </>
        )}
      </View>
      {detail && <Text style={styles.detailText}>{detail}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Prescription AI Insights" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medication Interaction Cards */}
        <View style={styles.cardsContainer}>
          {renderMedicationCard('Amlodipine + Ibuprofen', 'safe')}
          
          {renderMedicationCard(
            'Metformin, Lisinopril and Warfarin',
            'interaction',
            '1 conflict found - Lisinopril may increase bleeding risk with Warfarin'
          )}
          
          {renderMedicationCard(
            'Losartan, Simvastatin',
            'interaction',
            '1 conflict found - Losartan may increase Simvastatin levels'
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewAnalysisButton} onPress={handleViewFullAnalysis}>
          <Text style={styles.viewAnalysisText}>View Full Analysis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadNewPrescription}>
          <Text style={styles.uploadButtonText}>Upload New Prescription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Meds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  medicationCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  warningIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  detailText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    lineHeight: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 12,
  },
  viewAnalysisButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  viewAnalysisText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  uploadButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
});
