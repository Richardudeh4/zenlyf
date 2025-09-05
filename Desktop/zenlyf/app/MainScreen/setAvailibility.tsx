import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const SetAvailability = () => {
  const router = useRouter();

  // Days of the week availability state
  const [daysAvailability, setDaysAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  });

  // Mode of consultation state
  const [consultationModes, setConsultationModes] = useState({
    physicalVisit: true,
    videoCall: true,
    phoneCall: true,
  });

  const handleDayToggle = (day: keyof typeof daysAvailability) => {
    setDaysAvailability(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleModeToggle = (mode: keyof typeof consultationModes) => {
    setConsultationModes(prev => ({
      ...prev,
      [mode]: !prev[mode]
    }));
  };

  const handleReset = () => {
    setDaysAvailability({
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    });
    setConsultationModes({
      physicalVisit: true,
      videoCall: true,
      phoneCall: true,
    });
  };

  const handleSaveAvailability = () => {
    console.log('Saving availability:', {
      days: daysAvailability,
      modes: consultationModes
    });
    // Here you would typically save the availability to backend
    alert('Availability saved successfully!');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Set Availability" contStyle={{paddingLeft:24}}/>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Days of the Week Section */}
        <View style={styles.section}>
          {Object.entries(daysAvailability).map(([day, isEnabled]) => (
            <View key={day} style={styles.row}>
              <Text style={styles.rowText}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </Text>
              <Switch
                value={isEnabled}
                onValueChange={() => handleDayToggle(day as keyof typeof daysAvailability)}
                trackColor={{ false: colors.gray1, true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray1}
              />
            </View>
          ))}
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Mode of Consultation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode of Consultation</Text>
          
          <View style={styles.row}>
            <Text style={styles.rowText}>Physical visit</Text>
            <Switch
              value={consultationModes.physicalVisit}
              onValueChange={() => handleModeToggle('physicalVisit')}
              trackColor={{ false: colors.gray1, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray1}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.rowText}>Video call</Text>
            <Switch
              value={consultationModes.videoCall}
              onValueChange={() => handleModeToggle('videoCall')}
              trackColor={{ false: colors.gray1, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray1}
            />
          </View>
          
          <View style={styles.row}>
            <Text style={styles.rowText}>Phone call</Text>
            <Switch
              value={consultationModes.phoneCall}
              onValueChange={() => handleModeToggle('phoneCall')}
              trackColor={{ false: colors.gray1, true: colors.primary }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.gray1}
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAvailability}>
          <Text style={styles.saveButtonText}>Save Availability</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetAvailability;

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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: "#050505",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    fontWeight:"600",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowText: {
    fontSize: 18,
    fontWeight:"500",
    fontFamily: fonts.onestMedium,
    color: "#050505",
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    opacity: 0.3,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
    gap: 12,
  },
  resetButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
  saveButton: {
    flex: 1,
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