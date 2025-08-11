import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const PrescriptionAnalysis = () => {
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleUploadPrescription = () => {
    console.log('Upload Prescription pressed');
    setHasUploaded(true);
    // Here you would implement prescription upload
  };

  const handleUploadPhoto = () => {
    console.log('Upload Photo pressed');
    setHasUploaded(true);
    // Here you would implement photo upload
  };

  const handleEnterTextManually = () => {
    console.log('Enter Text Manually pressed');
    setHasUploaded(true);
    // Here you would implement manual text entry
  };

  const handleAnalyzePrescription = () => {
    console.log('Analyze Prescription pressed');
    // Here you would implement prescription analysis
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
      <AppHeader text="Prescription Analysis" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload Prescription Section */}
        <View style={styles.uploadSection}>
          <View style={styles.uploadArea}>
            <Ionicons name="cloud-upload" size={48} color={colors.gray1} />
            <Text style={styles.uploadText}>Upload your prescription for instant AI insights</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPrescription}>
              <Text style={styles.uploadButtonText}>Upload Prescription</Text>
            </TouchableOpacity>
            <Text style={styles.supportedFormats}>PDF, JPG, PNG</Text>
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Alternative Input Options */}
        <View style={styles.alternativeOptions}>
          <TouchableOpacity style={styles.alternativeButton} onPress={handleUploadPhoto}>
            <Text style={styles.alternativeButtonText}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.alternativeButton} onPress={handleEnterTextManually}>
            <Text style={styles.alternativeButtonText}>Enter Text Manually</Text>
          </TouchableOpacity>
        </View>

        {/* Analyze Button */}
        <View style={styles.analyzeContainer}>
          <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyzePrescription}>
            <Text style={styles.analyzeButtonText}>Analyze Prescription</Text>
          </TouchableOpacity>
        </View>

        {/* AI Analysis Report Section */}
        {hasUploaded && (
          <View style={styles.analysisSection}>
            <Text style={styles.analysisTitle}>AI Analysis Report</Text>
            
            {renderMedicationCard(
              'Metformin, Lisinopril and Warfarin',
              'interaction',
              '1 conflict found - Lisinopril may increase bleeding risk with Warfarin'
            )}
            
            {renderMedicationCard('Amlodipine + Ibuprofen', 'safe')}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrescriptionAnalysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: colors.gray1,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  supportedFormats: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray1,
  },
  separatorText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginHorizontal: 16,
  },
  alternativeOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  alternativeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  alternativeButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  analyzeContainer: {
    marginBottom: 32,
  },
  analyzeButton: {
    backgroundColor: colors.lightBlue,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  analyzeButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
  analysisSection: {
    marginBottom: 20,
  },
  analysisTitle: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
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
});