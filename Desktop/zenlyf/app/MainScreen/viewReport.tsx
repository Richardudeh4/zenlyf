import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const ViewReport = () => {
    const router = useRouter();
  const [currentView, setCurrentView] = useState<'original' | 'parsed'>('original');

  const handleGetAIInsight = () => {
    console.log('Get AI Insight pressed');
    router.push('/MainScreen/getAIInsight');
    // Here you would typically navigate to AI insight screen
  };

  const toggleView = () => {
    setCurrentView(currentView === 'original' ? 'parsed' : 'original');
  };

  const renderOriginalDocument = () => (
    <View style={styles.documentCard}>
      {/* Header */}
      <Text style={styles.hospitalName}>ANYTOW MEDICAL CENTER</Text>
      <Text style={styles.hospitalAddress}>Fdle Mestionw; be Anviown, USA</Text>
      
      {/* Title */}
      <Text style={styles.documentTitle}>MEDICAL REPORT</Text>
      
      {/* Patient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Patient:</Text>
          <Text style={styles.infoValue}>John, Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>02/29/2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date of Birth:</Text>
          <Text style={styles.infoValue}>08/16/1950</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dref:</Text>
          <Text style={styles.infoValue}>Jones</Text>
        </View>
      </View>

      {/* History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>HISTORY</Text>
        <Text style={styles.paragraphText}>
          72-year-old male with a history of type 2 diabetes and hypertension. Presented with fatigue and increased thirst.
        </Text>
      </View>

      {/* Medications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MEDICATIONS</Text>
        <Text style={styles.medicationText}>• Metformin 500 mg twice daily</Text>
        <Text style={styles.medicationText}>• Lisinopril 10 mg daily</Text>
      </View>

      {/* Allergies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ALLERGIES</Text>
        <Text style={styles.paragraphText}>NKDA (No Known Drug Allergies)</Text>
      </View>

      {/* Vitals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VITALS</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Blood Pressure:</Text>
          <Text style={styles.infoValue}>145/90 mmHg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Pulse:</Text>
          <Text style={styles.infoValue}>79 bpm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>BMI:</Text>
          <Text style={styles.infoValue}>28.6</Text>
        </View>
      </View>

      {/* Assessment and Plan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ASSESSMENT AND PLAN</Text>
        <Text style={styles.paragraphText}>
          Poorly controlled diabetes and hypertension. Discussed lifestyle modifications. Increased Metformin to 1000 mg twice daily. Follow-up in 3 months.
        </Text>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navArrowDisabled}>
          <Ionicons name="chevron-back" size={20} color={colors.gray1} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navArrow} onPress={toggleView}>
          <Ionicons name="chevron-forward" size={20} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderParsedData = () => (
    <View style={styles.documentCard}>
      {/* Title */}
      <Text style={styles.parsedTitle}>Parsed Data</Text>
      
      {/* Patient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Patient:</Text>
          <Text style={styles.infoValue}>John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date of Birth:</Text>
          <Text style={styles.infoValue}>03/16/1950</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoValue}>02/20/2024</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Referring Physician:</Text>
          <Text style={styles.infoValue}>Dr. Jones</Text>
        </View>
      </View>

      {/* History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>
        <Text style={styles.paragraphText}>
          70-year-old male with a history of type 2 diabetes and hypertension. Presented with fatigue and increased thirst.
        </Text>
      </View>

      {/* Medications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medications</Text>
        <Text style={styles.medicationText}>• Metformin 500 mg twice daily</Text>
        <Text style={styles.medicationText}>• Lisinopril 10 mg daily</Text>
      </View>

      {/* Allergies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies</Text>
        <Text style={styles.paragraphText}>NKDA (No Known Drug Allergies)</Text>
      </View>

      {/* Vitals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vitals</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Blood Pressure:</Text>
          <Text style={styles.infoValue}>145/90 mmHg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Pulse:</Text>
          <Text style={styles.infoValue}>79 bpm</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>BMI:</Text>
          <Text style={styles.infoValue}>28.6</Text>
        </View>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navArrow} onPress={toggleView}>
          <Ionicons name="chevron-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navArrowDisabled}>
          <Ionicons name="chevron-forward" size={20} color={colors.gray1} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Original Document" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentView === 'original' ? renderOriginalDocument() : renderParsedData()}
      </ScrollView>

      {/* Get AI Insight Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 

        style={styles.getAIInsightButton} onPress={handleGetAIInsight}>
          <Text style={styles.getAIInsightText}>Get AI Insight</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default ViewReport;

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
  documentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    textAlign: 'center',
    marginBottom: 20,
  },
  documentTitle: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  parsedTitle: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  paragraphText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
  },
  medicationText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    marginBottom: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navArrowDisabled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  getAIInsightButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  getAIInsightText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});