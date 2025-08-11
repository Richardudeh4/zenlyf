import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import RepeatModal from '../../components/RepeatModal';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

// Custom Time Picker Component
const TimePicker = ({ 
  selectedHour, 
  selectedMinute, 
  selectedPeriod, 
  onHourChange, 
  onMinuteChange, 
  onPeriodChange 
}: {
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: 'AM' | 'PM';
  onHourChange: (hour: string) => void;
  onMinuteChange: (minute: string) => void;
  onPeriodChange: (period: 'AM' | 'PM') => void;
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const renderPickerColumn = (
    data: string[],
    selectedValue: string,
    onValueChange: (value: string) => void,
    width: number
  ) => (
    <ScrollView
      style={[styles.pickerColumn, { width }]}
      showsVerticalScrollIndicator={false}
      snapToInterval={50}
      decelerationRate="fast"
    >
      {/* Add empty space at top for centering */}
      <View style={styles.pickerSpacer} />
      
             {data.map((item, index) => {
         const isSelected = selectedValue === item;
         const selectedIndex = data.indexOf(selectedValue);
         const isAboutToBeSelected = Math.abs(index - selectedIndex) <= 1;
         
         return (
           <TouchableOpacity
             key={index}
             style={[
               styles.pickerItem,
               isSelected && styles.selectedPickerItem
             ]}
             onPress={() => onValueChange(item)}
           >
             <Text style={[
               styles.pickerItemText,
               (isSelected || isAboutToBeSelected) && styles.selectedPickerItemText
             ]}>
               {item}
             </Text>
           </TouchableOpacity>
         );
       })}
      
      {/* Add empty space at bottom for centering */}
      <View style={styles.pickerSpacer} />
    </ScrollView>
  );

  return (
    <View style={styles.timePickerContainer}>
      {/* AM/PM Selector */}
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 'AM' && styles.selectedPeriodButton
          ]}
          onPress={() => onPeriodChange('AM')}
        >
          <Text style={[
            styles.periodText,
            selectedPeriod === 'AM' && styles.selectedPeriodText
          ]}>
            AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.periodButton,
            selectedPeriod === 'PM' && styles.selectedPeriodButton
          ]}
          onPress={() => onPeriodChange('PM')}
        >
          <Text style={[
            styles.periodText,
            selectedPeriod === 'PM' && styles.selectedPeriodText
          ]}>
            PM
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hour Selector */}
      {renderPickerColumn(hours, selectedHour, onHourChange, 60)}

      {/* Minute Selector */}
      {renderPickerColumn(minutes, selectedMinute, onMinuteChange, 60)}

      {/* Selection indicator overlay */}
      <View style={styles.selectionIndicator} />
    </View>
  );
};

const SetReminder = () => {
  const [selectedHour, setSelectedHour] = useState('03');
  const [selectedMinute, setSelectedMinute] = useState('30');
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('PM');
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);
  const [selectedRepeat, setSelectedRepeat] = useState('Once');
  const [showRepeatModal, setShowRepeatModal] = useState(false);

  const handleSave = () => {
    const time = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
    console.log('Reminder set for:', time, 'Repeat:', selectedRepeat);
    // Here you would typically save the reminder settings
    // For now, we'll just log it
  };

  const handleRepeatSelect = (repeatOption: string) => {
    setSelectedRepeat(repeatOption);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Set Reminder" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Time Picker */}
        <View style={styles.timePickerSection}>
          <TimePicker
            selectedHour={selectedHour}
            selectedMinute={selectedMinute}
            selectedPeriod={selectedPeriod}
            onHourChange={setSelectedHour}
            onMinuteChange={setSelectedMinute}
            onPeriodChange={setSelectedPeriod}
          />
        </View>

        {/* Reminder Options */}
        <View style={styles.optionsSection}>
          {/* Ringtone Option */}
          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionLabel}>Ringtone</Text>
            <View style={styles.optionValue}>
              <Text style={styles.optionValueText}>Default ringtone</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray1} />
            </View>
          </TouchableOpacity>

          {/* Repeat Option */}
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => setShowRepeatModal(true)}
          >
            <Text style={styles.optionLabel}>Repeat</Text>
            <View style={styles.optionValue}>
              <Text style={styles.optionValueText}>{selectedRepeat}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray1} />
            </View>
          </TouchableOpacity>

          {/* Vibration Option */}
          <View style={styles.optionItem}>
            <Text style={styles.optionLabel}>Vibrate when alarm sounds</Text>
            <Switch
              value={isVibrationEnabled}
              onValueChange={setIsVibrationEnabled}
              trackColor={{ false: '#E5E5E5', true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Repeat Modal */}
      <RepeatModal
        isVisible={showRepeatModal}
        onClose={() => setShowRepeatModal(false)}
        onSelect={handleRepeatSelect}
        selectedRepeat={selectedRepeat}
      />
    </SafeAreaView>
  );
};

export default SetReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  timePickerSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  timePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    position: 'relative',
  },
  periodSelector: {
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPeriodButton: {
    backgroundColor: 'transparent',
  },
  periodText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  selectedPeriodText: {
    fontFamily: fonts.onestBold,
    color: colors.black,
    fontSize: 18,
  },
  pickerColumn: {
    height: 200,
  },
  pickerItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPickerItem: {
    backgroundColor: 'transparent',
  },
  pickerItemText: {
    fontSize: 18,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  selectedPickerItemText: {
    fontFamily: fonts.onestBold,
    color: colors.black,
    fontSize: 40,
    fontWeight: '700',
  },
  pickerSpacer: {
    height: 75, // Half of the picker height to center items
  },
  selectionIndicator: {
    position: 'absolute',
    top: 75,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 8,
    zIndex: -1,
  },
  optionsSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  optionValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValueText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginRight: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 20,
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