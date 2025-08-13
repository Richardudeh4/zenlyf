import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import Button from '../../components/Button';
import DatePickerModal from '../../components/DatePickerModal';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const CheckinSchedule = () => {
  const router = useRouter();
  const [dateTime, setDateTime] = useState('');
  const [mode, setMode] = useState<'video' | 'physical'>('physical');
  const [reasonNotes, setReasonNotes] = useState('');
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const handleDateTimeSelect = (date: string) => {
    setDateTime(date);
    setShowDateTimePicker(false);
  };

  const handleConfirm = () => {
    if (dateTime && reasonNotes.trim()) {
      console.log('Scheduling check-in:', {
        dateTime,
        mode,
        reasonNotes: reasonNotes.trim()
      });
      router.push("/MainScreen/checkinSuccess");
    } else {
      alert('Please fill in all required fields');
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Schedule check-in" contStyle={{paddingLeft:24}} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date & Time Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Date & Time</Text>
          <TouchableOpacity
            style={styles.dateTimeInputContainer}
            onPress={() => setShowDateTimePicker(true)}
          >
            <Text style={[styles.dateTimeInputText, !dateTime && styles.placeholderText]}>
              {dateTime ? formatDateTime(dateTime) : 'Select date and time'}
            </Text>
            <Ionicons name="calendar" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Mode Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Mode</Text>
          <View style={styles.modeButtonContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === 'video' && styles.modeButtonSelected
              ]}
              onPress={() => setMode('video')}
            >
              <Text style={[
                styles.modeButtonText,
                mode === 'video' && styles.modeButtonTextSelected
              ]}>
                Video
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modeButton,
                mode === 'physical' && styles.modeButtonSelected
              ]}
              onPress={() => setMode('physical')}
            >
              <Text style={[
                styles.modeButtonText,
                mode === 'physical' && styles.modeButtonTextSelected
              ]}>
                Physical Visit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reason / Notes Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Reason / Notes</Text>
          <TextInput
            style={styles.notesInput}
            value={reasonNotes}
            onChangeText={setReasonNotes}
            placeholder="Enter reason or notes for the check-in"
            placeholderTextColor={colors.gray1}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <Button
          btnText="Confirm"
          onPress={handleConfirm}
          style={styles.confirmButton}
        />
      </View>

      {/* Date Time Picker Modal */}
      <DatePickerModal
        isVisible={showDateTimePicker}
        onClose={() => setShowDateTimePicker(false)}
        onSelect={handleDateTimeSelect}
        selectedDate={dateTime}
      />
    </SafeAreaView>
  );
};

export default CheckinSchedule;

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
  dateTimeInputContainer: {
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
  dateTimeInputText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    flex: 1,
  },
  placeholderText: {
    color: colors.gray1,
  },
  modeButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modeButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  modeButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  modeButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  modeButtonTextSelected: {
    color: colors.white,
    fontFamily: fonts.onestBold,
  },
  notesInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  confirmButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
  },
});