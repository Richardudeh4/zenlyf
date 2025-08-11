import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import Input from '@/components/Input';
import { colors } from '@/Config/colors';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SurgeryEntry {
  id: string;
  procedureName: string;
  dateOfSurgery: string;
  hospitalName: string;
  notes: string;
}

const SurgeryHistory = () => {
  const [surgeries, setSurgeries] = useState<SurgeryEntry[]>([
    {
      id: '1',
      procedureName: '',
      dateOfSurgery: '',
      hospitalName: '',
      notes: ''
    }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();

  const updateSurgery = (id: string, field: keyof SurgeryEntry, value: string) => {
    setSurgeries(prev => 
      prev.map(surgery => 
        surgery.id === id ? { ...surgery, [field]: value } : surgery
      )
    );
  };

  const addAnotherSurgery = () => {
    const newSurgery: SurgeryEntry = {
      id: Date.now().toString(),
      procedureName: '',
      dateOfSurgery: '',
      hospitalName: '',
      notes: ''
    };
    setSurgeries(prev => [...prev, newSurgery]);
  };

  const removeSurgery = (id: string) => {
    if (surgeries.length > 1) {
      setSurgeries(prev => prev.filter(surgery => surgery.id !== id));
    }
  };

  const handleSaveAndContinue = () => {
    setLoading(true);
    // Add save logic here
    setTimeout(() => {
      setLoading(false);
      // Navigate to next screen
      router.push("/(auth)/threeTierSetup");
    }, 1000);
  };

  const renderSurgeryForm = (surgery: SurgeryEntry, index: number) => (
    <View key={surgery.id} style={styles.surgeryCard}>
      {surgeries.length > 1 && (
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Surgery {index + 1}</Text>
          <TouchableOpacity 
            onPress={() => removeSurgery(surgery.id)}
            style={styles.removeButton}
          >
            <AntDesign name="close" size={16} color="#666" />
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.formFields}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Procedure Name</Text>
          <Input
            placeholder="Hip Replacement"
            value={surgery.procedureName}
            onChangeText={(text) => updateSurgery(surgery.id, 'procedureName', text)}
            contStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.fieldContainer}>
          <DateInput
            label="Date of Surgery"
            placeholder="DD/MM/YYYY"
            value={surgery.dateOfSurgery}
            onSelect={(date) => updateSurgery(surgery.id, 'dateOfSurgery', date)}
            contStyle={styles.dateInputContainer}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Hospital / Facility Name</Text>
          <Input
            placeholder=""
            value={surgery.hospitalName}
            onChangeText={(text) => updateSurgery(surgery.id, 'hospitalName', text)}
            contStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Notes</Text>
          <View style={styles.notesInputContainer}>
            <TextInput
              placeholder=""
              value={surgery.notes}
              onChangeText={(text) => updateSurgery(surgery.id, 'notes', text)}
              style={styles.notesInput}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <AppHeader
              goToScreen="/(auth)/threeTierSetup"
              showBackArrow
            />
            <View style={styles.titleSection}>
              <Text style={styles.title}>Surgery & Implants</Text>
              <Text style={styles.subtitle}>Have you had any surgeries or implants?</Text>
            </View>
          </View>

          {/* Surgery Forms */}
          <View style={styles.formsSection}>
            {surgeries.map((surgery, index) => renderSurgeryForm(surgery, index))}
          </View>

          {/* Add Another Button */}
          <TouchableOpacity 
            onPress={addAnotherSurgery}
            style={styles.addAnotherButton}
          >
            <AntDesign name="plus" size={16} color={colors.primary} />
            <Text style={styles.addAnotherText}>Add Another</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <View style={styles.buttonSection}>
            <Button
              btnText="Save & Continue"
              onPress={handleSaveAndContinue}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SurgeryHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 24,
  },
  headerSection: {
    gap: 16,
  },
  titleSection: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#050505',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#888888',
    lineHeight: 20,
  },
  formsSection: {
    gap: 24,
  },
  surgeryCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#050505',
  },
  removeButton: {
    padding: 4,
  },
  formFields: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#050505',
  },
  inputContainer: {
    marginBottom: 0,
  },
  dateInputContainer: {
    marginBottom: 0,
  },
  notesInputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 100,
  },
  notesInput: {
    fontSize: 16,
    color: '#050505',
    textAlignVertical: 'top',
    flex: 1,
  },
  addAnotherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  addAnotherText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  buttonSection: {
    marginTop: 20,
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
  },
});
