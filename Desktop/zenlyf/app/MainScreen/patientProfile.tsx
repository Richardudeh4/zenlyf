import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const { width, height } = Dimensions.get("window");

const PatientProfile = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const patientData = patient ? JSON.parse(patient as string) : null;
  const [activeTab, setActiveTab] = useState('Vitals');

  const tabs = ['Vitals', 'Medication', 'AI Insights', 'Timeline'];

  const vitalsData = [
    {
      title: 'Blood Pressure',
      value: '132/78 mmHg',
     image: require("../../assets/images/chart1.png")
    },
    {
      title: 'Heart Rate',
      value: '67 bpm',
      image: require("../../assets/images/chart2.png")
    },
    {
      title: 'Glucose',
      value: 'Average 11 g/l',
      image: require("../../assets/images/chart3.png")
    }
  ];

  const complianceData = [
    { day: 'S', compliant: true },
    { day: 'M', compliant: true },
    { day: 'T', compliant: true },
    { day: 'W', compliant: false },
    { day: 'T', compliant: true },
    { day: 'F', compliant: true },
    { day: 'S', compliant: true }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Patient's Profile</Text>
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfo}>
          <Image source={patientData?.image || require('../../assets/images/avatar.png')} style={styles.patientImage} />
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patientData?.name || 'Patient Name'}</Text>
            <Text style={styles.patientAge}>42 years old</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
          onPress={() => router.push("/MainScreen/uploadReport")}
          style={[styles.actionButton,]}>
           <Image source={require("../../assets/images/upload.png")} style={{width:24, height:24}} alt=""/>
            <Text style={styles.actionButtonText}>Upload Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          onPress={() => router.push("/MainScreen/predictionMedication")}
          style={styles.actionButton}>
          <Image source={require("../../assets/images/prescriptions.png")} style={{width:24, height:24}} alt=""/>
            <Text style={styles.actionButtonText}>Prescribe Medication</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          onPress={() => router.push("/MainScreen/checkinSchedule")}
          style={styles.actionButton}>
          <Image source={require("../../assets/images/pending.png")} style={{width:24, height:24}} alt=""/>
            <Text style={styles.actionButtonText}>Schedule Check-in</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
          <Image source={require("../../assets/images/chat.png")} style={{width:24, height:24}} alt=""/>
            <Text style={styles.actionButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

                {/* Vitals Section */}
        {activeTab === 'Vitals' && (
          <View style={styles.vitalsSection}>
            {/* Blood Pressure and Heart Rate side by side */}
            <View style={styles.vitalsRow}>
              {vitalsData.slice(0, 2).map((vital, index) => (
                <View key={index} style={styles.vitalCard}>
                  <View style={{display:"flex", flexDirection:"row",  alignItems:"center", justifyContent:"space-between", width:"100%"}}>

                  </View>
                  <View style={styles.vitalHeader}>
                    <View style={{display:"flex", flexDirection:"column", gap:4}}>
                      <Text style={styles.vitalTitle}>{vital.title}</Text>
                      <Text style={styles.vitalValue}>{vital.value}</Text>
                    </View>
                    <Image source={vital.image} style={{width:187, height:57}} alt=""/>
                  </View>
                </View>
              ))}
            </View>
            
            {/* Glucose full width */}
            <View style={styles.vitalCard}>
              <View style={styles.vitalHeader}>
                <View style={{display:"flex", flexDirection:"column", gap:4}}>
                  <Text style={styles.vitalTitle}>{vitalsData[2].title}</Text>
                  <Text style={styles.vitalValue}>{vitalsData[2].value}</Text>
                </View>
                
                <Image source={vitalsData[2].image}  style={{width:187, height:57}} alt=""/>
              </View>
            </View>
          </View>
        )}

        {/* Medication Section */}
        <View style={styles.medicationSection}>
          <Text style={styles.sectionTitle}>Medication</Text>
          <View style={styles.medicationCard}>
            <View style={styles.medicationIcon}>
              <MaterialIcons name="description" size={24} color={colors.primary} />
            </View>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationTitle}>Cardiac Evaluation</Text>
              <Text style={styles.medicationSubtitle}>AI-generated summary</Text>
            </View>
            <TouchableOpacity style={styles.medicationDate}>
              <Text style={styles.dateText}>April 2025</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Insights Section */}
        <View style={styles.aiInsightsSection}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Text style={styles.aiInsightText}>
            Recommend regular aerobic exercise to help manage heart health
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    fontWeight: '700',
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  patientAge: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    width: (width - 48 - 36) / 4,
    aspectRatio: 1,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  activeActionButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  actionButtonText: {
    fontSize: 10,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: fonts.onestBold,
  },
  vitalsSection: {
    gap: 16,
    marginBottom: 24,
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  vitalCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vitalHeader: {
    display:"flex",
    flexDirection: 'column',
    gap:6,
    alignItems: 'center',
  },
  vitalTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  vitalValue: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  graph: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 50,
    gap: 2,
  },
  graphBar: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 2,
    minHeight: 4,
  },
  complianceContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
  complianceLabel: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginBottom: 8,
  },
  complianceDays: {
    flexDirection: 'row',
    gap: 4,
  },
  complianceDay: {
    alignItems: 'center',
  },
  complianceDayText: {
    fontSize: 10,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginBottom: 4,
  },
  complianceIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compliant: {
    backgroundColor: colors.success,
  },
  nonCompliant: {
    backgroundColor: colors.red,
  },
  nonCompliantText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  medicationSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  medicationSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  medicationDate: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  aiInsightsSection: {
    marginBottom: 30,
  },
  aiInsightText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    lineHeight: 24,
  },
});
