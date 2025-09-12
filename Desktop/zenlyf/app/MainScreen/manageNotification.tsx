import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import AppHeader from '@/components/AppHeader';

const ManageNotification = () => {
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: boolean}>({});

  const handleBackPress = () => {
    console.log('Back pressed');
  };

  const handleSavePreferences = () => {
    console.log('Save preferences pressed');
  };

  const toggleOption = (optionKey: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionKey]: !prev[optionKey]
    }));
  };

  const renderSection = (title: string, options: string[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.optionRow} 
          onPress={() => toggleOption(option)}
        >
          <View style={styles.radioButtonContainer}>
            <View style={[
              styles.radioButton,
              selectedOptions[option] && styles.radioButtonSelected
            ]}>
              {selectedOptions[option] && <View style={styles.radioButtonInner} />}
            </View>
          </View>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
         <AppHeader text="Notification Preferences" contStyle={{paddingLeft:24}}/>
        </View>

        {/* Introductory Text */}
        <Text style={styles.introText}>
          Customize which alerts to receive via app, email or SMS:
        </Text>

        {/* Patient Activity Alerts Section */}
        {renderSection('Patient Activity Alerts', [
          'Inactivity detected',
          'Missed medication',
          'Fall detected',
          'Abnormal vitals'
        ])}

        {/* Reminders Section */}
        {renderSection('Reminders', [
          'Check-in Reminders',
          'Medication Follow-ups',
          'Appointment Reminders'
        ])}

        {/* Reports & Updates Section */}
        {renderSection('Reports & Updates', [
          'New report uploaded by doctor',
          'Health score update',
          'New messages from doctor or patient'
        ])}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Compensate for back button width
  },
  introText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButtonContainer: {
    marginRight: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});
