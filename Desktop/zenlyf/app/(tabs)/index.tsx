import { svg } from '@/Config/Svg';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import P from '@/components/P';
import { getMe } from '../Requesthandler/Auth';


const { height, width } = Dimensions.get("window");
export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(14);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState('User');
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

const getUserData = async () => {
try{
const response = await getMe();
console.log("UserData", response);
setUserData(response);
}
catch(error:any){
console.log("Error", error);
}
}
  
useEffect(() => {
  getUserData();
}, []);
  // Floating logo animation
  const floatingAnimation = React.useRef(new Animated.Value(0)).current;

  const userOptions = [
    { label: 'Caregiver', value: 'Caregiver' },
    { label: 'User', value: 'User' },
  ];

  const moods = [
    { id: 1, emoji: '😐', label: 'Neutral' },
    { id: 2, emoji: '🙂', label: 'Good' },
    { id: 3, emoji: '😊', label: 'Great' },
  ];

  const calendarDays = Array.from({ length: 18 }, (_, i) => i + 1);

  // Start floating animation
  React.useEffect(() => {
    const startFloatingAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatingAnimation, {
            toValue: -10,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(floatingAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startFloatingAnimation();
  }, [floatingAnimation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image source={require('../../assets/images/avatar.png')} alt="profile" style={styles.profileImage} />
              <View style={styles.moodIndicator}>
                <Text style={styles.moodEmoji}>😊</Text>
              </View>
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.greeting}>Good day, {userData?.first_name}!</Text>
              <Text style={styles.subGreeting}>You're doing great today!</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity 
                style={styles.userButton}
                onPress={() => setShowUserDropdown(!showUserDropdown)}
              >
                <Text style={styles.userButtonText}>{selectedUser}</Text>
                <Ionicons 
                  name={showUserDropdown ? "chevron-up" : "chevron-down"} 
                  size={16} 
                  color={colors.black} 
                />
              </TouchableOpacity>
              
              {showUserDropdown && (
                <View style={styles.dropdownContainer}>
                  {userOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.dropdownOption,
                        selectedUser === option.value && styles.selectedOption
                      ]}
                      onPress={() => {
                        setSelectedUser(option.value);
                        setShowUserDropdown(false);
                      }}
                    >
                      <Text style={[
                        styles.dropdownOptionText,
                        selectedUser === option.value && styles.selectedOptionText
                      ]}>
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Mood Tracker */}
        <View style={styles.moodTracker}>
          <View style={{display:"flex", width:"100%", flexDirection:"row", justifyContent:"space-between"}}>
          <View>
          <Text style={styles.sectionTitle}>Mood Tracker</Text>
          <Text style={styles.sectionSubtitle}>(Let us know how you are feeling today)</Text>
          </View>
          <View style={{display:"flex", flexDirection:"row", gap:4}}>
          <Image source={require("../../assets/images/notification.png")} style={{width:43, height:42}}/>
          <Image source={require("../../assets/images/alarm.png")} style={{width:43, height:44}}/>
          </View>
          </View>
            <View style={{display:"flex", flexDirection:"row", gap:10}}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmojiLarge}>{mood.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        
        </View>

        {/* Today's Overview Button */}
        <TouchableOpacity style={styles.overviewButton}
        onPress={() => router.push('/MainScreen')}
        >
         <Image source={require("../../assets/images/monitoring.png")} style={{width:24, height:24}}/>
          <Text style={styles.overviewButtonText}>See Today's Overview</Text>
        </TouchableOpacity>

        {/* Health Metrics */}
        <View style={styles.healthMetrics}>
          <View style={styles.metricCard}>
            <View style={styles.metricItem}>
              <View style={styles.metricIcon}>
                <Ionicons name="heart" size={20} color={colors.red} />
              </View>
              <Text style={styles.metricValue}>72 bpm</Text>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricIcon}>
                <Ionicons name="fitness-outline" size={20} color={colors.primary} />
              </View>
              <Text style={styles.metricValue}>6.53 hrs</Text>
            </View>
          </View>
        </View>

        {/* Daily Schedule */}
        <View style={styles.scheduleSection}>
          <TouchableOpacity 
          onPress={() => router.push('/MainScreen/myMedication')}
          style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>9:00 AM</Text>
            <View style={styles.scheduleIcon}>
              <Ionicons name="medical-outline" size={20} color="#FFB74D" />
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleTitle}>Medication</Text>
              <Text style={styles.scheduleDetail}>Amlodipine</Text>
            </View>
            <TouchableOpacity style={styles.markButton}>
              <Text style={styles.markButtonText}>Mark as Taken</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>11:00 AM</Text>
            <View style={styles.scheduleIcon}>
              <Ionicons name="fitness-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.scheduleContent}>
              <Text style={styles.scheduleTitle}>Exercise</Text>
              <Text style={styles.scheduleDetail}>Stretching routine</Text>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>July 2025</Text>
            <View style={styles.calendarNavigation}>
              <TouchableOpacity style={styles.navButton}>
                <Ionicons name="chevron-back" size={16} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <Ionicons name="chevron-forward" size={16} color={colors.black} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.calendarDays}>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
              <Text key={day} style={styles.dayHeader}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {calendarDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.calendarDay,
                  selectedDate === day && styles.selectedDay,
                  day === 13 && styles.eventDay
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[
                  styles.dayNumber,
                  selectedDate === day && styles.selectedDayText
                ]}>
                  {day}
                </Text>
                {day === 13 && <View style={styles.eventDot} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
       
          <Animated.View 
          style={[
            styles.floatingLogo,
            {
              transform: [{ translateY: floatingAnimation }]
            }
          ]}
        >
          <TouchableOpacity 
            style={{position:"relative"}}
            onPress={() => router.push("/MainScreen/zenlyfAi")}
          >
            <View style={{position:"absolute", top:-11, right:-6, width:10, height:10, borderWidth:2, borderColor:colors.white,borderRadius:"50%", backgroundColor:"#10C85F"}}/>
            <SvgXml xml={svg.zenlyf}/>
          </TouchableOpacity>
        </Animated.View> 
         
       
        {/* Prescription Insight */}
        <TouchableOpacity style={styles.prescriptionSection}>
          <View style={styles.prescriptionCard}>
            <View style={styles.prescriptionHeader}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              <Text style={styles.prescriptionTitle}>Last Prescription Insight</Text>
            </View>
            <View style={styles.prescriptionContent}>
              <Text style={styles.prescriptionText}>Amlodipine + Ibuprofen</Text>
              <Text style={styles.prescriptionWarning}>Ibuprofen may reduce Amlodipine effects</Text>
            </View>
            <View style={styles.warningIcon}>
              <Ionicons name="warning" size={20} color="#FFB74D" />
            </View>
            <TouchableOpacity style={styles.analysisButton}>
              <Text style={styles.analysisButtonText}>View Full Analysis</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Streaks & Rewards */}
        {/* <TouchableOpacity style={styles.rewardsSection}>
          <View style={styles.rewardsCard}>
            <View style={styles.rewardsHeader}>
              <Ionicons name="flame" size={20} color="#FF9800" />
              <Text style={styles.rewardsTitle}>Your Streaks & Rewards</Text>
            </View>
            <Text style={styles.streakText}>5-day medication streak</Text>
            <TouchableOpacity style={styles.rewardsButton}>
              <Text style={styles.rewardsButtonText}>View Rewards</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity> */}

        <View style={{padding:10, borderRadius:20, backgroundColor:"#EFF6FD", marginHorizontal:24, marginBottom:20}}>
            <TouchableOpacity style={{display:"flex", flexDirection:"row", gap:24, alignItems:"center", width:"100%", paddingVertical:20}}>
              <View style={{width:60, height:60, borderRadius:16, backgroundColor:"#B3DAFF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <SvgXml xml={svg.suggest}/>
              </View>
              <View style={{display:"flex",  flexDirection:"row", gap:16, alignItems:"center",borderBottomWidth:1, borderBottomColor:"#050505", paddingBottom:20}}>
                <View style={{display:"flex", flexDirection:"column", gap:4}}>
                  <Text style={{color:"#050505", fontSize:20, fontWeight:"700"}}>Need help?</Text>
                  <Text style={{color:"#050505",fontSize:14, fontWeight:"400" }}>Let us know how we may help you</Text>
                </View>
                <Entypo name="chevron-thin-right" size={20} color="#050505" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
            onPress= {() => setShowFeedbackModal(true)}
             style={{display:"flex", flexDirection:"row", gap:24, alignItems:"center", width:"100%", paddingVertical:20}}>
              <View style={{width:60, height:60, borderRadius:16, backgroundColor:"#B3DAFF", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <SvgXml xml={svg.feedBack}/>
              </View>
              <View style={{display:"flex",  flexDirection:"row", gap:16, alignItems:"center"}}>
                <View style={{display:"flex", flexDirection:"column", gap:4}}>
                  <Text style={{color:"#050505", fontSize:20, fontWeight:"700"}}>Have any feedbacks?</Text>
                  <Text style={{color:"#050505",fontSize:14, fontWeight:"400" }}>Help shape the future of Zenlyf</Text>
                </View>
                <Entypo name="chevron-thin-right" size={20} color="#050505" />
              </View>
            </TouchableOpacity>

        <Modal
        visible={showFeedbackModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFeedbackModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFeedbackModal(false)}
        >
          <View style={styles.attachmentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}></Text>
              <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:60}}>
            <View style={{display:"flex", flexDirection:"column", gap:24}}>
            <View style={{display:"flex", flexDirection:"column", gap:8, borderBottomWidth:1,borderBottomColor:"#888888", paddingBottom:20}}>
            <P style={{fontSize:24, fontWeight:"700",lineHeight:28}}>Your Feedback Matters</P>
            <Text style={{fontSize:18, fontWeight:"300",color:"#050505"}}>It takes less than 60 seconds to complete</Text>
            </View> 
            <View style={{display:"flex", flexDirection:"column", gap:8,  paddingBottom:20}}>
            <P style={{fontSize:20, fontWeight:"700",lineHeight:28}}>How is your overall experience?</P>
            <View style={{display:"flex", flexDirection:"row", gap:7, alignItems:"center"}}>
            <Entypo name="star" size={24} color="#FDD836"/>
            <Entypo name="star" size={24} color="#FDD836"/>
            <Entypo name="star" size={24} color="#FDD836"/>
            <Entypo name="star" size={24} color="#FDD836"/>
            <Entypo name="star" size={24} color="#FDD836"/>
            </View>
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:8,  paddingBottom:20}}>
            <P style={{fontSize:20, fontWeight:"700",lineHeight:28}}>What could have been done better?</P>
           <TextInput
             multiline={true}
             numberOfLines={4} 
            placeholder='Share your thoughts with us here' style={{borderWidth:1,backgroundColor:"#F6F6F6", borderColor:"#F6F6F6", height:186, borderRadius:6, padding:12}}/>
            </View>
           
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:12,}}>
            <TouchableOpacity style={{backgroundColor:"#0077FF",height:52, borderRadius:10, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:colors.white, fontSize:18, fontWeight:"700",lineHeight:24}}>Submit feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"white",height:52, borderRadius:10, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:"#050505", fontSize:18, fontWeight:"700",lineHeight:24}}>Cancel</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position:"relative",
  },
  scrollView: {
    flex: 1,
    position:"relative",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  moodIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 12,
  },
  greetingSection: {
    marginLeft: 12,
  },
  greeting: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  userButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginRight: 4,
  },
  moodTracker: {
    paddingHorizontal: 24,
    marginBottom: 20,
    display:"flex",
    flexDirection:"column",
    gap:12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginBottom: 16,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: colors.primary,
  },
  moodEmojiLarge: {
    fontSize: 30,
  },
  overviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  overviewButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
    marginLeft: 8,
  },
  healthMetrics: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    marginRight: 8,
  },
  metricValue: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  scheduleSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleTime: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    width: 60,
  },
  scheduleIcon: {
    marginRight: 12,
  },
  scheduleContent: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  scheduleDetail: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  markButton: {
    backgroundColor: '#F5F5DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  markButtonText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  calendarSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  calendarNavigation: {
    flexDirection: 'row',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  attachmentModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  attachmentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  attachmentOption: {
    alignItems: 'center',
    flex: 1,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  calendarDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayNumber: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  selectedDay: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  selectedDayText: {
    color: colors.white,
  },
  eventDay: {
    position: 'relative',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  prescriptionSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  prescriptionCard: {
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
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prescriptionTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginLeft: 8,
  },
  prescriptionContent: {
    marginBottom: 12,
  },
  prescriptionText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 4,
  },
  prescriptionWarning: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  warningIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  analysisButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  analysisButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  rewardsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  rewardsCard: {
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
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardsTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginLeft: 8,
  },
  streakText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 12,
  },
  rewardsButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rewardsButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  dropdownWrapper: {
    position: 'relative',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 8,
    minWidth: 120,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  dropdownOptionText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  selectedOptionText: {
    color: colors.white,
  },
  floatingLogo: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    top: (78 * height) / 100,
    left: (86 * width) / 100,
    zIndex: 1000,
  },
});
