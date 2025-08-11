import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const MyMedication = () => {
  const router = useRouter();
  // Sample medication data
  const medications = [
    {
      id: 1,
      name: 'Amlodipine',
      dosage: '10 mg 9:00 AM',
      status: 'taken',
    },
    {
      id: 2,
      name: 'Ibuprofen',
      dosage: '200 mg 3:00 PM',
      status: 'missed',
    },
    {
      id: 3,
      name: 'Metformin',
      dosage: '8:00 PM',
      status: 'taken',
    },
    {
      id: 4,
      name: 'Amlodipine',
      dosage: '9:00 PM',
      status: 'taken',
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'taken':
        return {
          backgroundColor: '#E8F5E8',
          textColor: colors.success,
          icon: 'checkmark-circle',
        };
      case 'missed':
        return {
          backgroundColor: '#FFEBEE',
          textColor: colors.error,
          icon: 'close-circle',
        };
      default:
        return {
          backgroundColor: '#F5F5F5',
          textColor: colors.gray1,
          icon: 'time',
        };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="My Medications" />

      {/* Medication List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.medicationList}>
          {medications.map((medication) => {
            const statusStyle = getStatusStyle(medication.status);
            return (
              <View key={medication.id} style={styles.medicationCard}>
                <View style={styles.medicationInfo}>
                  <Text style={styles.medicationName}>{medication.name}</Text>
                  <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                </View>
                <View style={[styles.statusButton, { backgroundColor: statusStyle.backgroundColor }]}>
                  <Ionicons 
                    name={statusStyle.icon as any} 
                    size={16} 
                    color={statusStyle.textColor} 
                  />
                  <Text style={[styles.statusText, { color: statusStyle.textColor }]}>
                    {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
        onPress={() => router.push('/MainScreen/addMymedication')}
        style={styles.addMedicationButton}>
          <Text style={styles.addMedicationText}>Add Medication</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        onPress={() => router.push('/MainScreen/setRemainder')}
        style={styles.setReminderButton}>
          <Text style={styles.setReminderText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyMedication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  medicationList: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  medicationCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    marginLeft: 4,
  },
  actionButtons: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  addMedicationButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  addMedicationText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  setReminderButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  setReminderText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
});