import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const UploadReport = () => {
  const router = useRouter();
  const [annotation, setAnnotation] = useState('');

  const handleApprove = () => {
    console.log('Approve pressed');
    // Handle approve action
  };

  const handleForwardToPatient = () => {
    console.log('Forward to patient pressed');
    // Handle forward action
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Medical Report Details" contStyle={{paddingLeft:24}}/>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Medical Report Card */}
        <View style={styles.reportCard}>
          {/* PDF Tag */}
          <View style={styles.pdfTag}>
            <Text style={styles.pdfTagText}>PDF</Text>
          </View>
          
          {/* Report Title */}
          <Text style={styles.reportTitle}>MEDICAL REPORT</Text>
          
          {/* Report Sections */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Examination</Text>
            <View style={styles.placeholderLines}>
              <View style={[styles.placeholderLine, { width: '85%' }]} />
              <View style={[styles.placeholderLine, { width: '70%' }]} />
              <View style={[styles.placeholderLine, { width: '90%' }]} />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical History</Text>
            <View style={styles.placeholderLines}>
              <View style={[styles.placeholderLine, { width: '75%' }]} />
              <View style={[styles.placeholderLine, { width: '60%' }]} />
              <View style={[styles.placeholderLine, { width: '80%' }]} />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Impression</Text>
            <View style={styles.placeholderLines}>
              <View style={[styles.placeholderLine, { width: '65%' }]} />
              <View style={[styles.placeholderLine, { width: '55%' }]} />
              <View style={[styles.placeholderLine, { width: '70%' }]} />
            </View>
          </View>
        </View>

        {/* AI Generated Summary */}
        <View style={styles.aiSummaryContainer}>
          <View style={styles.aiSummaryHeader}>
            <Image source={require("../../assets/images/clinicalnote.png")} style={{width:24, height:24}} alt=""/>
            {/* <Ionicons name="document-text" size={20} color={colors.primary} /> */}
            <Text style={styles.aiSummaryTitle}>AI-generated summary</Text>
          </View>
          <Text style={styles.aiSummaryText}>
            Normal cardiovascular and respiratory findings. Recommend follow-up in 1 year.
          </Text>
        </View>

        {/* Annotation Input */}
        <View style={styles.annotationContainer}>
          <TextInput
            style={styles.annotationInput}
            placeholder="Add annotation / comment"
            placeholderTextColor={colors.gray1}
            value={annotation}
            onChangeText={setAnnotation}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
          <Text style={styles.approveButtonText}>Approve</Text>
        <Image source={require("../../assets/images/thumb.png")} style={{width:24, height:24}} alt=""/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forwardButton} onPress={handleForwardToPatient}>
          <Text style={styles.forwardButtonText}>Forward to patient</Text>
        <Image source={require("../../assets/images/forward.png")} style={{width:24, height:24}} alt=""/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  reportCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pdfTag: {
    backgroundColor: colors.gray1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  pdfTagText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  reportTitle: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  placeholderLines: {
    gap: 8,
  },
  placeholderLine: {
    height: 12,
    backgroundColor: "#ECEEF0",
    borderRadius: 6,
  },
  aiSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  aiSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiSummaryTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginLeft: 8,
  },
  aiSummaryText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
  },
  annotationContainer: {
    marginBottom: 24,
  },
  annotationInput: {
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    gap:12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  forwardButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap:12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});