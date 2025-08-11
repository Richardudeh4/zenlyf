import { Entypo, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const Reports = () => {
  const router = useRouter();
  // Sample medical reports data
  const medicalReports = [
    {
      id: 1,
      title: 'CT Abdomen',
      date: 'Apr 16, 2024',
      status: 'Insight Ready',
      statusColor: colors.primary,
      iconColor: colors.primary,
      icon: 'document-text',
    },
    {
      id: 2,
      title: 'Blood Test',
      date: 'Mar 28, 2024',
      status: 'Insight Ready',
      statusColor: colors.primary,
      iconColor: colors.primary,
      icon: 'images',
    },
    {
      id: 3,
      title: 'MRI Brain',
      date: 'Feb 5, 2024',
      status: 'No insight',
      statusColor: '#FF9800',
      iconColor: '#FF9800',
      icon: 'document-text',
    },
    {
      id: 4,
      title: 'ECG',
      date: 'Jan 20, 2024',
      status: 'pending...',
      statusColor: colors.gray1,
      iconColor: colors.gray1,
      icon: 'images',
    },
  ];

  const handleUploadReport = () => {
    console.log('Upload new report');
    router.push('/MainScreen/uploadNewReport');
    // Here you would typically open file picker or camera
  };

  const handleMarkAsTaken = () => {
    console.log('Medication marked as taken');
    // Here you would typically update medication status
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="My Medical Reports" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medical Reports List */}
        <View style={styles.reportsSection}>
          {medicalReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportInfo}>
                <View style={[styles.reportIcon, { backgroundColor: report.iconColor }]}>
                  <Ionicons name={report.icon as any} size={20} color={colors.white} />
                </View>
                <View style={styles.reportDetails}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
              </View>
              <View style={[styles.statusButton, { backgroundColor: `${report.statusColor}20` }]}>
                <Text style={[styles.statusText, { color: report.statusColor }]}>
                  {report.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Upload New Report Button */}
        <View style={styles.uploadSection}>
          <TouchableOpacity 
          
          style={styles.uploadButton} onPress={handleUploadReport}>
          <Entypo name="share-alternative" size={24} color="black" />
            <Text style={styles.uploadButtonText}>Upload New Report</Text>
          </TouchableOpacity>
        </View>

        {/* Medication Reminder Card */}
        <View style={styles.medicationCard}>
          <View style={styles.medicationInfo}>
            <View style={styles.medicationIcon}>
              <Ionicons name="medical" size={20} color="#FF9800" />
            </View>
            <View style={styles.medicationDetails}>
              <Text style={styles.medicationTime}>9:00 AM</Text>
              <Text style={styles.medicationTitle}>Medication</Text>
              <Text style={styles.medicationName}>Amlodipine</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.markAsTakenButton} 
            onPress={handleMarkAsTaken}
          >
            <Text style={styles.markAsTakenText}>Mark as Taken</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  reportsSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  reportCard: {
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
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportDetails: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
  },
  uploadSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B3DAFF",
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    fontSize: 18,
    fontFamily: fonts.onestMedium,
    color:"#050505",
    marginLeft: 8,
  },
  medicationCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationTime: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 2,
  },
  medicationTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  medicationName: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  markAsTakenButton: {
    backgroundColor: '#FFF9C4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  markAsTakenText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: '#F57C00',
  },
});
