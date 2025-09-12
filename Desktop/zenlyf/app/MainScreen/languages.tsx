import AppHeader from '@/components/AppHeader';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const Languages = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTextSize, setSelectedTextSize] = useState('Medium');
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [voicePrompts, setVoicePrompts] = useState(false);

  const handleBackPress = () => {
    console.log('Back pressed');
  };

  const handleSavePreferences = () => {
    console.log('Save preferences pressed');
  };

  const handleLanguageSelect = () => {
    console.log('Language dropdown pressed');
  };

  const textSizeOptions = ['Small', 'Medium', 'Large'];

  const renderTextSizeOption = (size: string) => (
    <TouchableOpacity 
      key={size}
      style={styles.radioButtonRow} 
      onPress={() => setSelectedTextSize(size)}
    >
      <View style={styles.radioButtonContainer}>
        <View style={[
          styles.radioButton,
          selectedTextSize === size && styles.radioButtonSelected
        ]}>
          {selectedTextSize === size && <View style={styles.radioButtonInner} />}
        </View>
      </View>
      <Text style={styles.radioButtonText}>{size}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <AppHeader text="Language & Accessibility" contStyle={{}} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Choose Your Preferred Language & Accessibility Options
        </Text>

        {/* App Language Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>App Language</Text>
          <TouchableOpacity style={styles.dropdownButton} onPress={handleLanguageSelect}>
            <Text style={styles.dropdownText}>{selectedLanguage}</Text>
            <Ionicons name="chevron-down" size={20} color={colors.gray1} />
          </TouchableOpacity>
        </View>

        {/* Text Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Text Size</Text>
          <View style={styles.radioButtonGroup}>
            {textSizeOptions.map(renderTextSizeOption)}
          </View>
        </View>

        {/* High Contrast Mode Section */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.sectionLabel}>High Contrast Mode</Text>
            </View>
            <Switch
              value={highContrastMode}
              onValueChange={setHighContrastMode}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor={highContrastMode ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Voice Prompts Section */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.sectionLabel}>Voice Prompts</Text>
              <Text style={styles.toggleDescription}>Toggle for visually impaired caregivers</Text>
            </View>
            <Switch
              value={voicePrompts}
              onValueChange={setVoicePrompts}
              trackColor={{ false: '#E5E7EB', true: '#007AFF' }}
              thumbColor={voicePrompts ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Languages;

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
    paddingTop: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 30,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  radioButtonGroup: {
    gap: 8,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioButtonContainer: {
    marginRight: 12,
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
  radioButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabelContainer: {
    flex: 1,
  },
  toggleDescription: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginTop: 4,
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
