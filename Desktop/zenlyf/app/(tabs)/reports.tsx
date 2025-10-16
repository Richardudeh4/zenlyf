import P from '@/components/P';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { getMe } from '../Requesthandler/Auth';
import { Getreports } from '../Requesthandler/questions';

const Reports = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [reportData, setReportData] = useState<any>(null);


  const getUserData = async() => {
    try{
      const response = await getMe();
      console.log("response",response);
      setUserData(response);
    }
    catch(error:any){
      console.log("Error fetching user data",error);
    }
  }
  const getUsersReports = async() => {
    try{
      setLoading(true);
      const response = await Getreports(userData?.id);
      setLoading(false);
      setReportData(response);
      console.log("Reports",response);
    }
    catch(error:any){
      console.log("Error fetching reports",error);
      setLoading(false);
    } 
    }

    useEffect(() => {
      getUserData();
    }, [])

    useEffect(() => {
      if (userData?.id) {
        getUsersReports();
      }
    }, [userData])


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
      <View style={{paddingHorizontal: 24}}>
      <AppHeader text="My Medical Reports" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Medical Reports List */}
        <View style={styles.reportsSection}>
          {!reportData || reportData.length === 0 ? (
            <>
              <P>
                No reports found
              </P>
            </>
          ) : (
            <>
              {
                reportData.map((item:any) => (
                  <P key={item?.id}>
                    {item?.hospital_name}
                  </P>
                ))
              }
            </>
          )}
        </View>

        {/* Upload New Report Button */}
        {/* <View style={styles.uploadSection}>
          <TouchableOpacity 
          
          style={styles.uploadButton} onPress={handleUploadReport}>
          <Entypo name="share-alternative" size={24} color="black" />
            <Text style={styles.uploadButtonText}>Upload New Report</Text>
          </TouchableOpacity>
        </View> */}

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
