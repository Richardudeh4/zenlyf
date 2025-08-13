import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const { width, height } = Dimensions.get("window");

const PatientsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const patients = [
    {
      id: 1,
      name: 'Ebere Madu',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    },
    {
      id: 2,
      name: 'Smith Joe',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '150/95',
      heartRate: '120',
      status: 'Attention Needed',
      statusColor: '#FF9800'
    },
    {
      id: 3,
      name: 'Catrina Beino',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    },
    {
      id: 4,
      name: 'Ebere Madu',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    },
    {
      id: 5,
      name: 'Ebere Madu',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    },
    {
      id: 6,
      name: 'Catrina Beino',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    },
    {
      id: 7,
      name: 'Smith Joe',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '150/95',
      heartRate: '120',
      status: 'Attention Needed',
      statusColor: '#FF9800'
    },
    {
      id: 8,
      name: 'Catrina Beino',
      image: require('../../assets/images/avatar.png'),
      bloodPressure: '120/80',
      heartRate: '72',
      status: 'Stable',
      statusColor: '#00C853'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Patients</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.gray1} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search name, ID, age"
              placeholderTextColor={colors.gray1}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Patients List */}
        <View style={styles.patientsList}>
          {patients.map((patient) => (
            <TouchableOpacity 
              key={patient.id} 
              style={styles.patientCard}
              onPress={() => router.push({
                pathname: "/MainScreen/patientProfile",
                params: { patient: JSON.stringify(patient) }
              })}
              activeOpacity={0.7}
            >
              <Image source={patient.image} style={styles.patientImage} />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientVitals}>
                  BP: {patient.bloodPressure} mmHg • HR: {patient.heartRate} bpm
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: patient.statusColor }]}>
                <Text style={styles.statusText}>{patient.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.onestBold,
    color: '#050505',
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientsList: {
    gap: 16,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  patientVitals: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});