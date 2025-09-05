import { svg } from '@/Config/Svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';


const {width, height} = Dimensions.get("window");
const CaregiverDashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState({
    takeMeds: false,
    joinAppointment: false,
    exerciseSession: false,
  });
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState('Caregiver');
  
  const floatingAnimation = React.useRef(new Animated.Value(0)).current;

  const userOptions = [
    { label: 'Caregiver', value: 'Caregiver' },
    { label: 'User', value: 'User' },
  ];


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

  const handleTaskToggle = (task: keyof typeof tasks) => {
    setTasks(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  const handleMessagePress = () => {
    console.log('Messages pressed');
  };

  const handleAlertPress = () => {
    console.log('Alerts pressed');
  };

  const handleDropdownPress = () => {
    console.log('Dropdown pressed');
  };

  const handleAlertButtonPress = (alertType: string) => {
    console.log(`${alertType} alert pressed`);
  };

  const handleFABPress = () => {
    console.log('FAB pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image source={require('../../assets/images/avatar.png')} alt="profile" style={styles.profileImage} />
              <View style={styles.moodIndicator}>
              </View>
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.greeting}>Good day, Ebere!</Text>
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
        {/* <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={{position: "relative", width:60,height:62, borderRadius:"50%", backgroundColor: colors.primary, paddingLeft:-10,}}>
              <Image source={require("../../assets/images/avatar.png")} style={{width: "100%", height: "100%", borderRadius: "50%"}} />
              <View style={{width:26, height:26, borderRadius:"50%",position:"absolute", bottom:0, right:0, display:"flex",justifyContent:"center", alignItems:"center",backgroundColor:"#EFF6FD"}}>
              <MaterialIcons name="edit" size={16} color="#0077FF" />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>Hello, Jennifer! 👋</Text>
              <Text style={styles.careCount}>You’re caring for 3 people {"\n"}today</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <View style={{display:"flex", flexDirection:"row", gap:4,alignItems:"center"}}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="mail" size={20} color={colors.black} />
              <View style={styles.messageBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={20} color={colors.black} />
              <View style={styles.messageBadge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>Doctor</Text>
              <Ionicons name="chevron-down" size={16} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View> */}
        {/* Today's Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Alerts</Text>
          <View style={styles.alertsContainer}>
            <TouchableOpacity 
              style={[styles.alertButton, styles.fallsButton]} 
              onPress={() => handleAlertButtonPress('Falls')}
            >
              <Text style={styles.alertButtonText}>Falls</Text>
              <View style={[styles.alertBadge, {backgroundColor:"#004DA4"}]}>
                <Text style={styles.alertBadgeText}>1</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.alertButton, styles.missedMedsButton, {borderBottomColor:"#7B0000"}]} 
              onPress={() => handleAlertButtonPress('Missed Meds')}
            >
              <Text style={styles.alertButtonText}>Missed {"\n"} Meds</Text>
              <View style={[styles.alertBadge, {backgroundColor:"#FD4242"}]}>
                <Text style={styles.alertBadgeText}>6</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.alertButton, styles.inactivityButton,{borderBottomColor:"#875800"}]} 
              onPress={() => handleAlertButtonPress('Inactivity')}
            >
              <Text style={styles.alertButtonText}>Inactivity</Text>
              <View style={[styles.alertBadge, {backgroundColor:"#9E6600"}]}>
                <Text style={styles.alertBadgeText}>7</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.alertButton, styles.wanderingButton,{borderBottomColor:"#005E80"}]} 
              onPress={() => handleAlertButtonPress('Wandering')}
            >
              <Text style={styles.alertButtonText}>Wandering</Text>
              <View style={[styles.alertBadge, {backgroundColor:"#007BA8"}]}>
                <Text style={styles.alertBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.tasksContainer}>
            <TouchableOpacity 
              style={styles.taskItem} 
              onPress={() => handleTaskToggle('takeMeds')}
            >
              <View style={[styles.radioButton, tasks.takeMeds && styles.radioButtonSelected]}>
                {tasks.takeMeds && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.taskText}>Take meds (3)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.taskItem} 
              onPress={() => handleTaskToggle('joinAppointment')}
            >
              <View style={[styles.radioButton, tasks.joinAppointment && styles.radioButtonSelected]}>
                {tasks.joinAppointment && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.taskText}>Join Dr. appointment (1)</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.taskItem} 
              onPress={() => handleTaskToggle('exerciseSession')}
            >
              <View style={[styles.radioButton, tasks.exerciseSession && styles.radioButtonSelected]}>
                {tasks.exerciseSession && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.taskText}>Exercise session (3)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Caregiver Care Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caregiver Care Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Care Tip #1: Encourage Routine</Text>
            <Text style={styles.tipText}>
              Help your patient stick to a daily routine — consistent meals, medication times, and sleep patterns reduce confusion and promote wellness.
            </Text>
          </View>
          <View style={styles.paginationDots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </ScrollView>

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
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={handleFABPress}>
        <Ionicons name="add" size={24} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CaregiverDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
   
  },
 
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: "#EFF6FD",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
   
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
    paddingTop: 20,
    paddingBottom: 20,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
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
  careCount: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  headerIcons: {
    alignItems: 'flex-start',
    gap: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  notificationButton: {
    position: 'relative',
    width: 43,
    height: 43,
    borderRadius: "50%",
    borderWidth:1,
    borderColor:"#A4A4A4",
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth:1,
    borderColor:"#EFF6FD",
    backgroundColor:"#EFF6FD",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerAlertBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.black,
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
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: "#050505",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  alertsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  alertButton: {
    flex: 1,
    minWidth: '45%',
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderBottomWidth:4,
    borderBottomColor:"#03448F",
  },
  fallsButton: {
    backgroundColor: "#0077FF",
  },
  missedMedsButton: {
    backgroundColor: "#FF7C7C",
  },
  inactivityButton: {
    backgroundColor: "#FFA500",
  },
  wanderingButton: {
    backgroundColor: "#00BBFF",
  },
  alertButtonText: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: "#FFFFFF",
    fontStyle:"italic",
    fontWeight:"500",
  },
  alertBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderWidth:3,
    borderColor:colors.white,
    backgroundColor: colors.white,
    borderRadius: "50%",
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadgeText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  tasksContainer: {
    gap: 4,
    display:"flex",
    flexDirection:"column",
    
  },
      taskItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      width:"100%",
      height:44,
      borderRadius:10,
      padding:10,
      backgroundColor: colors.white,
      elevation: 10,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  taskText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  tipCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.white,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.white,
    lineHeight: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray1,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
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
  dropdownWrapper: {
    position: 'relative',
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
});
