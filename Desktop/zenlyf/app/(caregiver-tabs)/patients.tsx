import AppHeader from '@/components/AppHeader'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../Config/colors'
import { fonts } from '../../Config/Fonts'

interface Patient {
  id: string
  name: string
  bloodPressure: string
  heartRate: string
  status: 'Checked-in' | 'Needs Attention' | 'Stable'
  statusColor: string
  profileImage: any
}

const patients = () => {
  const router = useRouter()

  const patientsData: Patient[] = [
    {
      id: '1',
      name: 'Ebere Madu',
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      status: 'Checked-in',
      statusColor: "#FFBC40",
      profileImage: require('../../assets/images/avatar.png')
    },
    {
      id: '2',
      name: 'Smith Joe',
      bloodPressure: '150/95 mmHg',
      heartRate: '120 bpm',
      status: 'Needs Attention',
      statusColor: "#FF3B3B",
      profileImage: require('../../assets/images/avatar.png')
    },
    {
      id: '3',
      name: 'Catrina Beino',
      bloodPressure: '120/80 mmHg',
      heartRate: '72 bpm',
      status: 'Stable',
      statusColor: "#00C853",
      profileImage: require('../../assets/images/avatar.png')
    }
  ]

  const handleBackPress = () => {
    router.back()
  }

  const handlePatientPress = (patient: Patient) => {
    console.log('Patient pressed:', patient.name)
    // Navigate to caregiver patient screen with patient data
    router.push({
      pathname: '/MainScreen/caregiverPatientScreen',
      params: {
        patient: JSON.stringify({
          id: patient.id,
          name: patient.name,
          bloodPressure: patient.bloodPressure,
          heartRate: patient.heartRate,
          status: patient.status,
          image: patient.profileImage
        })
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <AppHeader text="Dependents List" contStyle={{}} navStyle={{fontSize:24, fontWeight:"700"}} />
        <View style={styles.headerSpacer} />
      </View>

      {/* Patients List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {patientsData.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            style={styles.patientItem}
            onPress={() => handlePatientPress(patient)}
          >
            <View style={styles.patientInfo}>
              <Image source={patient.profileImage} style={styles.profileImage} />
              <View style={styles.patientDetails}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.vitalSigns}>
                  BP: {patient.bloodPressure} • HR: {patient.heartRate}
                </Text>
              </View>
            </View>
            <View style={[styles.statusButton, { backgroundColor: patient.statusColor }]}>
              <Text style={styles.statusText}>{patient.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default patients

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginLeft: -40, // Offset for centering with back button
  },
  headerSpacer: {
    width: 40, // Same width as back button to balance the layout
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 8,
    backgroundColor: colors.white,
    borderBottomWidth:1,
    borderColor:"#CBCBCB",
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: "#050505",
    marginBottom: 4,
    fontWeight:"700",
  },
  vitalSigns: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
    textAlign: 'center',
  },
})