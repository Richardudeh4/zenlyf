import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const AddRoutine = () => {
  const [fitnessGoal, setFitnessGoal] = useState('Strength');
  const [availableEquipment, setAvailableEquipment] = useState('Dumbbells');
  const [duration, setDuration] = useState('30 mins');

  const handleFitnessGoalSelect = () => {
    console.log('Fitness goal selection pressed');
    // Here you would implement fitness goal selection
  };

  const handleEquipmentSelect = () => {
    console.log('Equipment selection pressed');
    // Here you would implement equipment selection
  };

  const handleDurationSelect = () => {
    console.log('Duration selection pressed');
    // Here you would implement duration selection
  };

  const handleGenerateRoutine = () => {
    console.log('Generate Routine pressed');
    console.log('Selected options:', { fitnessGoal, availableEquipment, duration });
    // Here you would implement routine generation
  };

  const renderInputField = (
    label: string,
    value: string,
    onPress: () => void,
    icon: string
  ) => (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.inputField} onPress={onPress}>
        <Text style={styles.inputValue}>{value}</Text>
        <Ionicons name={icon as any} size={20} color={colors.gray1} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Generate Routine" />

      <View style={styles.content}>
        {/* Input Sections */}
        {renderInputField(
          'Fitness goal',
          fitnessGoal,
          handleFitnessGoalSelect,
          'chevron-forward'
        )}

        {renderInputField(
          'Available equipment',
          availableEquipment,
          handleEquipmentSelect,
          'chevron-forward'
        )}

        {renderInputField(
          'Duration',
          duration,
          handleDurationSelect,
          'chevron-forward'
        )}
      </View>

      {/* Generate Routine Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateRoutine}>
          <Text style={styles.generateButtonText}>Generate Routine</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddRoutine;

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
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputValue: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});