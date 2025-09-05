import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const NotificationPreferences = () => {
  const router = useRouter();

  // Alert types state
  const [alertTypes, setAlertTypes] = useState({
    patientFallAlert: false,
    abnormalVitalsAlerts: false,
    newMessageFromPatient: false,
    appointmentReminders: false,
    reportUploaded: false,
    aiInsightsAvailable: true, // This one is selected by default
  });

  const handleRadioToggle = (key: keyof typeof alertTypes) => {
    setAlertTypes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePreferences = () => {
    console.log('Saving notification preferences:', alertTypes);
    // Here you would typically save the preferences to backend
    alert('Notification preferences saved successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Notification Preferences" contStyle={{paddingLeft:24}} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Channels Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
          <AntDesign name="bells" size={24} color="#0077FF" />
            <Text style={styles.sectionTitle}>Notification Channels</Text>
          </View>
          
          <View style={styles.channelItem}>
            <Text style={styles.channelText}>Push notifications</Text>
          </View>
          
          <View style={styles.channelItem}>
            <Text style={styles.channelText}>Email alerts</Text>
          </View>
          
          <View style={styles.channelItem}>
            <Text style={styles.channelText}>SMS alerts (if configured)</Text>
          </View>
        </View>

        {/* Alert Types Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
          <AntDesign name="bells" size={24} color="#0077FF" />
            <Text style={styles.sectionTitle}>Alerts Types</Text>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>Patient fall alert</Text>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>Abnormal vitals alerts</Text>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>New message from patient</Text>
            <TouchableOpacity 
              style={[styles.radioButton, alertTypes.newMessageFromPatient && styles.radioButtonSelected]}
              onPress={() => handleRadioToggle('newMessageFromPatient')}
            >
              {alertTypes.newMessageFromPatient && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>Appointment reminders</Text>
            <TouchableOpacity 
              style={[styles.radioButton, alertTypes.appointmentReminders && styles.radioButtonSelected]}
              onPress={() => handleRadioToggle('appointmentReminders')}
            >
              {alertTypes.appointmentReminders && <View style={styles.radioButtonInner} />}
            </TouchableOpacity>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>Report uploaded/ready for review</Text>
          </View>
          
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>AI insights available</Text>
            <TouchableOpacity 
              style={[styles.checkbox, alertTypes.aiInsightsAvailable && styles.checkboxSelected]}
              onPress={() => handleRadioToggle('aiInsightsAvailable')}
            >
              {alertTypes.aiInsightsAvailable && (
                <Ionicons name="checkmark" size={16} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NotificationPreferences;

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
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 24,
paddingVertical:20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    fontWeight:"600",
    marginLeft: 8,
    color:"#050505",
  },
  channelItem: {
    paddingVertical: 12,
    paddingLeft:32,
  
  },
  channelText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
   
    paddingLeft:32,
  },
  alertText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    flex: 1,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});