import AppHeader from '@/components/AppHeader'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../../Config/colors'
import { fonts } from '../../Config/Fonts'

const NewObservation = () => {
  const router = useRouter()
  const [caregiver, setCaregiver] = useState('Jennifer Smith')
  const [patient, setPatient] = useState('Ebere Madu')
  const [date, setDate] = useState('July 15, 2025')
  const [notes, setNotes] = useState('')

  const handleSaveDraft = () => {
    console.log('Save as draft')
    // Implement save as draft functionality
  }

  const handleSubmitToDoctor = () => {
    console.log('Submit to doctor')
    // Implement submit to doctor functionality
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppHeader text="New Observation" contStyle={{paddingLeft:24}} />
      </View>

      <View style={styles.content}>
        {/* Information Fields */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoField}>
              <Text style={styles.fieldLabel}>Caregiver</Text>
              <Text style={styles.fieldValue}>{caregiver}</Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.fieldLabel}>Date</Text>
              <Text style={styles.fieldValue}>{date}</Text>
            </View>
          </View>
          <View style={styles.infoField}>
            <Text style={styles.fieldLabel}>Patient</Text>
            <Text style={styles.fieldValue}>{patient}</Text>
          </View>
        </View>

        {/* Notes Input Area */}
        <View style={styles.notesSection}>
          <TextInput
            style={styles.notesInput}
            placeholder="Note any change, behaviour, complaint"
            placeholderTextColor={colors.gray1}
            multiline
            numberOfLines={10}
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.draftButton} onPress={handleSaveDraft}>
            <Text style={styles.draftButtonText}>Save as draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitToDoctor}>
            <Text style={styles.submitButtonText}>Submit to Doctor</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NewObservation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoField: {
    flex: 1,
    marginRight: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  notesSection: {
    flex: 1,
    marginBottom: 24,
  },
  notesInput: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 200,
  },
  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 30,
  },
  draftButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  draftButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
})