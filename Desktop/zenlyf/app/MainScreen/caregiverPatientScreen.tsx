import AppHeader from '@/components/AppHeader';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const { width, height } = Dimensions.get("window");

const CaregiverPatientScreen = () => {
  const router = useRouter();
  const { patient } = useLocalSearchParams();
  const patientData = patient ? JSON.parse(patient as string) : null;
  const [activeTab, setActiveTab] = useState('Today');

  const tabs = ['Today', 'Vitals', 'Medications', 'Upcoming Events', "Observation"];

  const vitalsData = [
    {
      title: 'Blood Pressure',
      value: patientData?.bloodPressure || '132/78 mmHg',
     image: require("../../assets/images/chart1.png")
    },
    {
      title: 'Heart Rate',
      value: patientData?.heartRate || '67 bpm',
      image: require("../../assets/images/chart2.png")
    },
    {
      title: 'Glucose',
      value: 'Average 11 g/l',
      image: require("../../assets/images/chart3.png")
    }
  ];

  const complianceData = [
    { day: 'S', compliant: true },
    { day: 'M', compliant: true },
    { day: 'T', compliant: true },
    { day: 'W', compliant: false },
    { day: 'T', compliant: true },
    { day: 'F', compliant: true },
    { day: 'S', compliant: true }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
        <AppHeader text="Profile" contStyle={{}} />
        </View>

        {/* Patient Info */}
        <View style={styles.patientInfo}>
          <Image source={patientData?.image || require('../../assets/images/avatar.png')} style={styles.patientImage} />
          <View style={styles.patientDetails}>
            <Text style={styles.patientName}>{patientData?.name || 'Patient Name'}</Text>
            <Text style={styles.patientAge}>42 years old</Text>
           <Text style={{color:"#050505",fontWeight:"400",fontSize:12}}>Cared for since: Jul 15, 2023</Text>
          </View>
        </View>

       

        {/* Navigation Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabScrollContainer}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>



        {/* Today's section */}
        {activeTab === 'Today' && (
          <View style={styles.todaySection}>
            {/* Medication List */}
            <View style={styles.medicationListSection}>
              <Text style={styles.sectionTitle}>Medication List</Text>
              <View style={styles.medicationList}>
                <TouchableOpacity style={styles.medicationItem}>
                  <View style={[styles.medicationCheckbox, styles.medicationChecked]}>
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  </View>
                  <Text style={styles.medicationName}>Lisinopril</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.medicationItem}>
                  <View style={styles.medicationCheckbox}>
                  </View>
                  <Text style={styles.medicationName}>Metformin</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.medicationItem}>
                  <View style={styles.medicationCheckbox}>
                  </View>
                  <Text style={styles.medicationName}>Amlodipine</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Mood Tracker */}
            <View style={styles.moodTrackerSection}>
              <Text style={styles.sectionTitle}>Mood Tracker</Text>
              <View style={styles.moodTracker}>
                <TouchableOpacity style={styles.moodEmoji}>
                  <Text style={styles.emoji}>😐</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodEmoji}>
                  <Text style={styles.emoji}>😕</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodEmoji}>
                  <Text style={styles.emoji}>🙂</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodEmoji}>
                  <Text style={styles.emoji}>😊</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moodEmoji}>
                  <Text style={styles.emoji}>😄</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Daily Feelings */}
            <View style={styles.feelingsSection}>
              <Text style={styles.feelingsTitle}>How are you feeling today?</Text>
              <View style={styles.textInputContainer}>
                <Text style={styles.textInputPlaceholder}>Share your thoughts...</Text>
              </View>
            </View>
          </View>
        )}

        {/* Vitals Section */}
        {activeTab === 'Vitals' && (
          <View style={styles.vitalsSection}>
            {/* Blood Pressure and Heart Rate side by side */}
            <View style={styles.vitalsRow}>
              {vitalsData.slice(0, 2).map((vital, index) => (
                <View key={index} style={styles.vitalCard}>
                  <View style={{display:"flex", flexDirection:"row",  alignItems:"center", justifyContent:"space-between", width:"100%"}}>

                  </View>
                  <View style={styles.vitalHeader}>
                    <View style={{display:"flex", flexDirection:"column", gap:4}}>
                      <Text style={styles.vitalTitle}>{vital.title}</Text>
                      <Text style={styles.vitalValue}>{vital.value}</Text>
                    </View>
                    <Image source={vital.image} style={{width:187, height:57}} alt=""/>
                  </View>
                </View>
              ))}
            </View>
            
            {/* Glucose full width */}
            <View style={styles.vitalCard}>
              <View style={styles.vitalHeader}>
                <View style={{display:"flex", flexDirection:"column", gap:4}}>
                  <Text style={styles.vitalTitle}>{vitalsData[2].title}</Text>
                  <Text style={styles.vitalValue}>{vitalsData[2].value}</Text>
                </View>
                
                <Image source={vitalsData[2].image}  style={{width:187, height:57}} alt=""/>
              </View>
            </View>
          </View>
        )}

        {/* Medication Section */}
        {activeTab === 'Medications' && (
          <View style={styles.medicationSection}>
            <Text style={styles.sectionTitle}>Read-only</Text>
            <View style={styles.medicationCard}>
              <View style={styles.medicationIcon}>
                <MaterialIcons name="description" size={24} color={colors.primary} />
              </View>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationTitle}>Cardiac Evaluation</Text>
                <Text style={styles.medicationSubtitle}>AI-generated summary</Text>
              </View>
              <TouchableOpacity style={styles.medicationDate}>
                <Text style={styles.dateText}>April 2025</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.medicationCard}>
              <View style={styles.medicationIcon}>
                <MaterialIcons name="description" size={24} color={colors.primary} />
              </View>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationTitle}>Cardiac Evaluation</Text>
                <Text style={styles.medicationSubtitle}>AI-generated summary</Text>
              </View>
              <TouchableOpacity style={styles.medicationDate}>
                <Text style={styles.dateText}>April 2025</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.medicationCard}>
              <View style={styles.medicationIcon}>
                <MaterialIcons name="description" size={24} color={colors.primary} />
              </View>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationTitle}>Cardiac Evaluation</Text>
                <Text style={styles.medicationSubtitle}>AI-generated summary</Text>
              </View>
              <TouchableOpacity style={styles.medicationDate}>
                <Text style={styles.dateText}>April 2025</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upcoming Section */}
        {activeTab === 'Upcoming Events' && (
          <View style={styles.upcomingSection}>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-back" size={20} color={colors.black} />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>July 2025</Text>
              <TouchableOpacity style={styles.calendarNavButton}>
                <Ionicons name="chevron-forward" size={20} color={colors.black} />
              </TouchableOpacity>
            </View>

            {/* Days of Week */}
            <View style={styles.daysOfWeek}>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
                <Text key={day} style={styles.dayOfWeek}>{day}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {/* First row - starts on Thursday */}
              <View style={styles.calendarRow}>
                <View style={styles.calendarCell}></View>
                <View style={styles.calendarCell}></View>
                <View style={styles.calendarCell}></View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>1</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>2</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>3</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>4</Text>
                </View>
              </View>

              {/* Second row */}
              <View style={styles.calendarRow}>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>5</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.green }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>6</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>7</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>8</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>9</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.orange }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>10</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.orange }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>11</Text>
                </View>
              </View>

              {/* Third row */}
              <View style={styles.calendarRow}>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>12</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>13</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
                </View>
                <View style={[styles.calendarCell, styles.selectedDate]}>
                  <Text style={[styles.calendarDate, styles.selectedDateText]}>14</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>15</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>16</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>17</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>18</Text>
                </View>
              </View>

              {/* Fourth row */}
              <View style={styles.calendarRow}>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>19</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>20</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.green }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>21</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.primary }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>22</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.green }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>23</Text>
                  <View style={[styles.eventDot, { backgroundColor: colors.green }]} />
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>24</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>25</Text>
                </View>
              </View>

              {/* Fifth row */}
              <View style={styles.calendarRow}>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>26</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>27</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>28</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>29</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>30</Text>
                </View>
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarDate}>31</Text>
                </View>
                <View style={styles.calendarCell}></View>
              </View>
            </View>

            {/* Daily Schedule */}
            <View style={styles.dailySchedule}>
              <Text style={styles.scheduleTitle}>Wednesday, July 14</Text>
              
              <View style={styles.scheduleList}>
                {/* Med Reminder */}
                <View style={styles.scheduleItem}>
                 <Image source={require("../../assets/images/cardio.svg")} width={40} height={40}/>
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleItemTitle}>Med reminder</Text>
                    <Text style={styles.scheduleItemDescription}>Paracetamol</Text>
                  </View>
                  <Text style={styles.scheduleTime}>9:00 AM</Text>
                </View>

                {/* Exercise */}
                <View style={styles.scheduleItem}>
                <Image source={require("../../assets/images/workout.svg")} width={40} height={40}/>
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleItemTitle}>Exercise</Text>
                    <Text style={styles.scheduleItemDescription}>Walk 30 mins</Text>
                  </View>
                  <Text style={styles.scheduleTime}>5:00 PM</Text>
                </View>

                {/* Upload Weight Selfie */}
                <View style={styles.scheduleItem}>
                <Image source={require("../../assets/images/upYellow.svg")} width={40} height={40}/>
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleItemTitle}>Upload weight selfie</Text>
                    <Text style={styles.scheduleItemDescription}>Upload weight</Text>
                  </View>
                  <Text style={styles.scheduleTime}>7:00 PM</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Observation Section */}
        {activeTab === 'Observation' && (
          <View style={styles.observationSection}>
            <View style={styles.observationGrid}>
              {/* Row 1 */}
              <View style={styles.observationRow}>
                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: May 10, 2025</Text>
                  <Text style={styles.observationContent}>
                    Patient appeared more fatigued than usual this morning. He mentioned feeling lightheaded after breakfast and skipped his mid-morning walk. Vitals were slightly off — blood pressure was 146/92. Medication was taken on time, but he seemed forgetful when recalling recent events. Will continue to monitor hydration and suggest a lighter meal plan for the next few days. Doctor has been notified via Zenlyf chat for review.
                  </Text>
                  <View style={styles.observationActions}>
                  
                  </View>
                </View>

                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: May 31, 2025</Text>
                  <Text style={styles.observationContent}>
                    Patient was in good spirits this afternoon. Mood rated as 'happy' on the Zenlyf check-in. Appetite is stable, and all prescribed meds were taken as scheduled. No dizziness or signs of confusion observed. Encouraged her to do light stretches, which she completed successfully.
                  </Text>
                </View>
              </View>

              {/* Row 2 */}
              <View style={styles.observationRow}>
                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: June 5, 2025</Text>
                  <Text style={styles.observationContent}>
                    Patient appeared more fatigued than usual this morning. She mentioned feeling lightheaded after breakfast and skipped her mid-morning walk. Vitals were slightly off — blood pressure was 146/92. Medication was taken on time, but she seemed forgetful when recalling recent...
                  </Text>
                </View>

                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: June 13, 2025</Text>
                  <Text style={styles.observationContent}>
                    Mrs. Ebere experienced a brief coughing episode around noon. Oxygen saturation dropped to 92% but returned to normal after rest. I've noted this for the doctor's attention. Medication adherence is good, and hydration has improved. Advised her to avoid cold drinks for now.
                  </Text>
                </View>
              </View>

              {/* Row 3 */}
              <View style={styles.observationRow}>
                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: June 24, 2025</Text>
                  <Text style={styles.observationContent}>
                    She showed signs of anxiety today — pacing and repeated hand movements. She was reluctant to eat lunch and avoided interaction. Vitals are within normal range. Scheduled a virtual check-in with her doctor for further support. Will monitor her mood again this evening.
                  </Text>
                </View>

                <View style={styles.observationCard}>
                  <Text style={styles.observationDate}>Date: July 13, 2025</Text>
                  <Text style={styles.observationContent}>
                    No major concerns today. Patient completed all daily routines independently — including morning hygiene and exercises. She expressed interest in going outdoors, so we took a 10-minute supervised walk. Medication was delayed by 20 mins but has been logged.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/MainScreen/newObservation")}>
        <Ionicons name="add" size={24} color="#0077FF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CaregiverPatientScreen;

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    fontWeight: '700',
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  patientDetails: {
    flex: 1,
  },
  patientName: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  patientAge: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    width: (width - 48 - 36) / 4,
    aspectRatio: 1,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  activeActionButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  actionButtonText: {
    fontSize: 10,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  tabScrollContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: fonts.onestBold,
  },
  vitalsSection: {
    gap: 16,
    marginBottom: 24,
  },
  vitalsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  vitalCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vitalHeader: {
    display:"flex",
    flexDirection: 'column',
    gap:6,
    alignItems: 'center',
  },
  vitalTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  vitalValue: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  graph: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 50,
    gap: 2,
  },
  graphBar: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 2,
    minHeight: 4,
  },
  complianceContainer: {
    marginLeft: 16,
    alignItems: 'center',
  },
  complianceLabel: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginBottom: 8,
  },
  complianceDays: {
    flexDirection: 'row',
    gap: 4,
  },
  complianceDay: {
    alignItems: 'center',
  },
  complianceDayText: {
    fontSize: 10,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginBottom: 4,
  },
  complianceIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compliant: {
    backgroundColor: colors.success,
  },
  nonCompliant: {
    backgroundColor: colors.red,
  },
  nonCompliantText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  medicationSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  medicationCard: {
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
  medicationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  medicationSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  medicationDate: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  aiInsightsSection: {
    marginBottom: 30,
  },
  aiInsightText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    lineHeight: 24,
  },
  timelineSection: {
    marginBottom: 30,
  },
  timelineCard: {
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
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  // Today Tab Styles
  todaySection: {
    gap: 24,
    marginBottom: 30,
  },
  medicationListSection: {
    marginBottom: 8,
  },
  medicationList: {
    gap: 4,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  
  medicationName: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  medicationCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationChecked: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  moodTrackerSection: {
    marginBottom: 8,
  },
  moodTracker: {
    flexDirection: 'row',

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
  moodEmoji: {
    padding: 8,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  feelingsSection: {
    marginBottom: 8,
  },
  feelingsTitle: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 12,
  },
  textInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  textInputPlaceholder: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  // Upcoming Tab Styles
  upcomingSection: {
    gap: 20,
    marginBottom: 30,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  
    marginBottom: 16,
  },
  calendarNavButton: {
    padding: 8,
  },
  calendarTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  daysOfWeek: {
    flexDirection: 'row',
 
    marginBottom: 8,
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    paddingVertical: 8,
  },
  calendarGrid: {

  },
  calendarRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  calendarCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 8,
  },
  selectedDate: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  calendarDate: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  selectedDateText: {
    color: colors.white,
    fontFamily: fonts.onestBold,
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dailySchedule: {
    marginTop: 20,
  },
  scheduleTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  
  },
  scheduleList: {
    gap: 12,

  },
  scheduleItem: {
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
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleItemTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  scheduleItemDescription: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  scheduleTime: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  // Observation Tab Styles
  observationSection: {
    marginBottom: 30,
  },
  observationGrid: {
    gap: 16,
  },
  observationRow: {
    flexDirection: 'row',
    gap: 12,
  },
  observationCard: {
    flex: 1,
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
  observationDate: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  observationContent: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 16,
  },
  observationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  observationActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  observationActionButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#B3DAFF",
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
