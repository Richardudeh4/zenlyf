import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import DatePickerModal from '../../components/DatePickerModal';
import MedicationModal from '../../components/MedicationModal';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const PredictionMedication = () => {
  const router = useRouter();
  const [medicationName, setMedicationName] = useState('');
  const [dosageFrequency, setDosageFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showMedicationModal, setShowMedicationModal] = useState(false);

  const handleStartDateSelect = (date: string) => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };

  const handleEndDateSelect = (date: string) => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  const handleMedicationSelect = (medication: string) => {
    setMedicationName(medication);
    setShowMedicationModal(false);
  };

    const handleSubmit = () => {
    if (medicationName && dosageFrequency && startDate && endDate) {
      console.log('Prescribing medication:', {
        medicationName,
        dosageFrequency,
        startDate,
        endDate
      });
      
      // Navigate to success screen
      router.push('/MainScreen/prescriptionSuccess');
    } else {
      alert('Please fill in all fields');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMedicationLabel = (medicationId: string) => {
    const medicationOptions = [
      { id: 'aspirin', label: 'Aspirin' },
      { id: 'ibuprofen', label: 'Ibuprofen' },
      { id: 'acetaminophen', label: 'Acetaminophen' },
      { id: 'lisinopril', label: 'Lisinopril' },
      { id: 'metformin', label: 'Metformin' },
      { id: 'atorvastatin', label: 'Atorvastatin' },
      { id: 'amlodipine', label: 'Amlodipine' },
      { id: 'omeprazole', label: 'Omeprazole' },
      { id: 'losartan', label: 'Losartan' },
      { id: 'carvedilol', label: 'Carvedilol' },
      { id: 'furosemide', label: 'Furosemide' },
      { id: 'warfarin', label: 'Warfarin' },
    ];
    
    const medication = medicationOptions.find(option => option.id === medicationId);
    return medication ? medication.label : medicationId;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Prescribe Medication" contStyle={{paddingLeft:24}}/>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medication Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Medication name</Text>
          <TouchableOpacity
            style={styles.dropdownContainer}
            onPress={() => setShowMedicationModal(true)}
          >
            <Text style={[styles.dropdownText, !medicationName && styles.placeholderText]}>
              {medicationName ? getMedicationLabel(medicationName) : 'Select medication'}
            </Text>
            <Ionicons 
              name="chevron-down" 
              size={20} 
              color={colors.black} 
            />
          </TouchableOpacity>
        </View>

        {/* Dosage & Frequency Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Dosage & frequency</Text>
          <TextInput
            style={styles.textInput}
            value={dosageFrequency}
            onChangeText={setDosageFrequency}
            placeholder="Enter dosage and frequency"
            placeholderTextColor={colors.gray1}
          />
        </View>

        {/* Start Date Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Start date</Text>
          <TouchableOpacity
            style={styles.dateInputContainer}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={[styles.dateInputText, !startDate && styles.placeholderText]}>
              {startDate ? formatDate(startDate) : 'Select start date'}
            </Text>
            <Ionicons name="calendar" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* End Date Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>End date</Text>
          <TouchableOpacity
            style={styles.dateInputContainer}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={[styles.dateInputText, !endDate && styles.placeholderText]}>
              {endDate ? formatDate(endDate) : 'Select end date'}
            </Text>
            <Ionicons name="calendar" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button
          btnText="Submit"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>

      {/* Date Picker Modals */}
      <DatePickerModal
        isVisible={showStartDatePicker}
        onClose={() => setShowStartDatePicker(false)}
        onSelect={handleStartDateSelect}
        selectedDate={startDate}
      />

      <DatePickerModal
        isVisible={showEndDatePicker}
        onClose={() => setShowEndDatePicker(false)}
        onSelect={handleEndDateSelect}
        selectedDate={endDate}
      />

      {/* Medication Modal */}
      <MedicationModal
        isVisible={showMedicationModal}
        onClose={() => setShowMedicationModal(false)}
        onSelect={handleMedicationSelect}
        selectedMedication={medicationName}
      />
    </SafeAreaView>
  );
};

export default PredictionMedication;

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
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    backgroundColor: colors.white,
  },
  dropdownContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    flex: 1,
  },
  placeholderText: {
    color: colors.gray1,
  },

  dateInputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  dateInputText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  submitButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
  },
});