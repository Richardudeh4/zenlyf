import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import DatePickerModal from '../../components/DatePickerModal';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const AddMyMedication = () => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleStartDateSelect = (date: string) => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };

  const handleEndDateSelect = (date: string) => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  const handleAddMedication = () => {
    if (name.trim() && dosage.trim()) {
      console.log('Adding medication:', {
        name: name.trim(),
        dosage: dosage.trim(),
        startDate,
        endDate,
        notes: notes.trim(),
        image: selectedImage,
      });
      // Here you would typically save the medication to your data store
      // For now, we'll just log it
    } else {
      alert('Please fill in the name and dosage fields');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Add Medications" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter medication name"
            placeholderTextColor={colors.gray1}
          />
        </View>

        {/* Dosage Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Dosage</Text>
          <TextInput
            style={styles.textInput}
            value={dosage}
            onChangeText={setDosage}
            placeholder="Enter dosage"
            placeholderTextColor={colors.gray1}
          />
        </View>

        {/* Frequency Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Frequency</Text>
          <View style={styles.dateInputsContainer}>
            {/* Start Date */}
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={[styles.dateInputText, !startDate && styles.placeholderText]}>
                {startDate || 'Start Date'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.gray1} />
            </TouchableOpacity>

            {/* End Date */}
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={[styles.dateInputText, !endDate && styles.placeholderText]}>
                {endDate || 'End Date'}
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.gray1} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Image Button */}
        <View style={styles.inputSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="arrow-up" size={20} color={colors.primary} />
            <Text style={styles.uploadButtonText}>Upload Image photo</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Text style={styles.imageSelectedText}>Image selected ✓</Text>
          )}
        </View>

        {/* Notes Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            style={[styles.textInput, styles.notesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Enter any additional notes"
            placeholderTextColor={colors.gray1}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Add Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
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
    </SafeAreaView>
  );
};

export default AddMyMedication;

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
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: fonts.onestLight,
    backgroundColor: colors.white,
    color: colors.black,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  dateInputText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  placeholderText: {
    color: colors.gray1,
  },
  uploadButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    marginLeft: 8,
  },
  imageSelectedText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.success,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});