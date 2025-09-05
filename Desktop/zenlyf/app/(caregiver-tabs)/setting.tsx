import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const Profile = () => {
  const [familyName, setFamilyName] = useState('');
  const [familyPhone, setFamilyPhone] = useState('');

  const handleSwitchRoles = () => {
    console.log('Switch roles pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu pressed');
  };

  const handleEditBasicInfo = () => {
    console.log('Edit basic info pressed');
  };

  const handleCall = (contact: string) => {
    console.log(`Call ${contact} pressed`);
  };

  const handleText = (contact: string) => {
    console.log(`Text ${contact} pressed`);
  };

  const handleAddFamilyMember = (type: 'name' | 'phone') => {
    if (type === 'name' && familyName.trim()) {
      console.log('Add family member name:', familyName);
      setFamilyName('');
    } else if (type === 'phone' && familyPhone.trim()) {
      console.log('Add family member phone:', familyPhone);
      setFamilyPhone('');
    }
  };

  const renderSection = (title: string, children: React.ReactNode, accentColor?: string, showEdit?: boolean) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, accentColor && { color: accentColor }]}>{title}</Text>
        {showEdit && (
          <TouchableOpacity style={styles.editButton} onPress={handleEditBasicInfo}>
            <Text style={styles.editText}>Tap to edit</Text>
            <Ionicons name="pencil" size={16} color={colors.gray1} />
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );

  const renderMetricCard = (title: string, icon: string, iconColor: string, backgroundColor: string, children: React.ReactNode) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricTitle}>{title}</Text>
        <View style={[styles.iconContainer, { backgroundColor }]}>
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
              <Ionicons name="ellipsis-vertical" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
           
              <Image source={require('../../assets/images/avatar.png')} alt="avatar" style={styles.profileImage} />
            <Text style={styles.profileName}>Ebere Madu, 75</Text>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:10}}>
            <Text style={styles.wellnessScoreLabel}>Zenlyf Wellness Score</Text>
            <View style={styles.wellnessScoreBadge}>
              <Text style={styles.wellnessScoreText}>85%</Text>
            </View>
            </View>
           
            <TouchableOpacity style={styles.switchRolesButton} onPress={handleSwitchRoles}>
              <Text style={styles.switchRolesText}>Switch roles</Text>
              <Ionicons name="chevron-down" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Info Section */}
        {renderSection('Basic Info', (
          <View style={styles.basicInfoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>ebere.madu@gmail.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone No.:</Text>
              <View style={styles.phoneContainer}>
                <Text style={styles.infoValue}>+234 812 345 5678</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.gray1} />
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Caregiver:</Text>
              <Text style={styles.infoValue}>Assigned</Text>
            </View>
          </View>
        ), undefined, true)}

        {/* Health Conditions Section */}
        {renderSection('Health Conditions', (
          <View style={styles.healthConditionsContent}>
            <View style={styles.conditionItem}>
              <View style={styles.conditionIcon}>
                <Ionicons name="radio-button-on" size={16} color={colors.primary} />
              </View>
              <Text style={styles.conditionText}>Hypertension</Text>
            </View>
            <View style={styles.conditionItem}>
              <View style={styles.conditionIcon}>
                <Ionicons name="radio-button-on" size={16} color={colors.primary} />
              </View>
              <Text style={styles.conditionText}>Asthma</Text>
            </View>
            <View style={styles.conditionItem}>
              <View style={styles.conditionIcon}>
                <Ionicons name="radio-button-on" size={16} color={colors.primary} />
              </View>
              <Text style={styles.conditionText}>Type 2 Diabetes</Text>
            </View>
            <View style={styles.conditionItem}>
              <View style={styles.conditionIcon}>
                <Ionicons name="radio-button-on" size={16} color={colors.primary} />
              </View>
              <Text style={styles.conditionText}>Mobility Challenges</Text>
            </View>
            <TouchableOpacity style={styles.seeFullHistoryButton}>
              <Text style={styles.seeFullHistoryText}>See Full Health History</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Medication Section */}
        {renderSection('Medication', (
          <View style={styles.medicationContent}>
            <Text style={styles.medicationSubtitle}>Med. Adherence</Text>
            <View style={styles.adherenceContainer}>
              <View style={styles.adherenceCircle}>
                <Text style={styles.adherenceText}>6/7</Text>
                <Text style={styles.adherenceLabel}>taken</Text>
              </View>
            </View>
            <View style={styles.nextMedicationContainer}>
              <Text style={styles.nextMedicationLabel}>Next Medication</Text>
              <Text style={styles.nextMedicationText}>Metformin • 4:00 PM</Text>
            </View>
          </View>
        ))}

        {/* Activity Overview Section */}
        {renderMetricCard('Activity Overview', 'footsteps', colors.orange, colors.lightOrange, (
          <View style={styles.activityContent}>
            <View style={styles.activityMetric}>
              <Text style={styles.metricLabel}>Steps Today:</Text>
              <Text style={styles.metricValue}>1,210</Text>
            </View>
            <View style={styles.activityMetric}>
              <Text style={styles.metricLabel}>Sedentary Alerts Triggered:</Text>
              <Text style={styles.metricValue}>2</Text>
            </View>
            <View style={styles.activityMetric}>
              <Text style={styles.metricLabel}>Inactivity Duration:</Text>
              <Text style={styles.metricValue}>3.5 hrs</Text>
            </View>
            <View style={styles.activityMetric}>
              <Text style={styles.metricLabel}>Last Movement Detected:</Text>
              <Text style={styles.metricValue}>45 min ago</Text>
            </View>
            <TouchableOpacity style={styles.stretchButton}>
              <Text style={styles.stretchButtonText}>Would you like to stretch now?</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Wellness Habits Section */}
        {renderMetricCard('Wellness Habits', 'heart', colors.green, colors.lightBlue, (
          <View style={styles.wellnessContent}>
            <View style={styles.wellnessMetric}>
              <Text style={styles.metricLabel}>Mood Today:</Text>
              <Text style={styles.metricValue}>🙂 (Happy)</Text>
            </View>
            <View style={styles.wellnessMetric}>
              <Text style={styles.metricLabel}>Sleep Quality:</Text>
              <Text style={styles.metricValue}>7.5 hrs</Text>
            </View>
            <View style={styles.wellnessMetric}>
              <Text style={styles.metricLabel}>Hydration:</Text>
              <Text style={styles.metricValue}>4/6 glasses</Text>
            </View>
            <View style={styles.wellnessMetric}>
              <Text style={styles.metricLabel}>Last Check-in:</Text>
              <Text style={styles.metricValue}>9AM</Text>
            </View>
            <TouchableOpacity style={styles.checkInButton}>
              <Text style={styles.checkInButtonText}>You haven't checked in today Check in now</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Vitals Summary Section */}
        {renderMetricCard('Vitals Summary', 'medical', colors.red, colors.lightRed, (
          <View style={styles.vitalsContent}>
            <View style={styles.vitalsMetric}>
              <Text style={styles.metricLabel}>BP:</Text>
              <Text style={styles.metricValue}>135/85 mmHg</Text>
            </View>
            <View style={styles.vitalsMetric}>
              <Text style={styles.metricLabel}>Blood Sugar:</Text>
              <Text style={styles.metricValue}>145mg/dL</Text>
            </View>
            <View style={styles.vitalsMetric}>
              <Text style={styles.metricLabel}>Heart Rate:</Text>
              <Text style={styles.metricValue}>76 bpm</Text>
            </View>
            <View style={styles.vitalsMetric}>
              <Text style={styles.metricLabel}>Oxygen Sat:</Text>
              <Text style={styles.metricValue}>98%</Text>
            </View>
            <TouchableOpacity style={styles.medicalReportsButton}>
              <Text style={styles.medicalReportsText}>See Medical Reports</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Environmental Conditions Section */}
        {renderMetricCard('Environmental Conditions', 'leaf', colors.green, colors.lightGreen, (
          <View style={styles.environmentalContent}>
            <View style={styles.environmentalMetric}>
              <Text style={styles.metricLabel}>Temperature:</Text>
              <Text style={styles.metricValue}>30°C (Feels like 33°C)</Text>
            </View>
            <View style={styles.environmentalMetric}>
              <Text style={styles.metricLabel}>Humidity:</Text>
              <Text style={styles.metricValue}>78% - Moderately high</Text>
            </View>
            <View style={styles.environmentalMetric}>
              <Text style={styles.metricLabel}>Air Quality Index:</Text>
              <Text style={styles.metricValue}>95 - Moderate</Text>
            </View>
            <View style={styles.environmentalMetric}>
              <Text style={styles.metricLabel}>Pollen Count:</Text>
              <Text style={styles.metricValue}>High (tree pollen)</Text>
            </View>
          </View>
        ))}

        {/* Care Team Access Section */}
        {renderSection('Care Team Access', (
          <View style={styles.careTeamContent}>
            <View style={styles.careTeamMember}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Dr. Ezegbogu</Text>
                <Text style={styles.memberRole}>(Doctor)</Text>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleCall('Dr. Ezegbogu')}>
                  <Ionicons name="call" size={16} color={colors.primary} />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleText('Dr. Ezegbogu')}>
                  <Ionicons name="chatbubble" size={16} color={colors.primary} />
                  <Text style={styles.actionText}>Text</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.careTeamMember}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>Ozioma</Text>
                <Text style={styles.memberRole}>(Caregiver)</Text>
              </View>
              <View style={styles.memberActions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleCall('Ozioma')}>
                  <Ionicons name="call" size={16} color={colors.primary} />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleText('Ozioma')}>
                  <Ionicons name="chatbubble" size={16} color={colors.primary} />
                  <Text style={styles.actionText}>Text</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Add Family to Team Access Section */}
        {renderSection('Add Family to Team Access', (
          <View style={styles.addFamilyContent}>
            <View style={styles.addFamilyHeader}>
              <Text style={styles.addFamilyTitle}>Add Family to Team Access</Text>
              <TouchableOpacity style={styles.closeButton}>
                <Ionicons name="close" size={20} color={colors.gray1} />
              </TouchableOpacity>
            </View>
            <View style={styles.addFamilyInput}>
              <Text style={styles.inputLabel}>Enter Full Name</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputPlaceholder}>Enter full name</Text>
                <TouchableOpacity 
                  style={styles.addButton} 
                  onPress={() => handleAddFamilyMember('name')}
                >
                  <Text style={styles.addButtonText}>Add +</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.addFamilyInput}>
              <Text style={styles.inputLabel}>Enter Phone Number</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputPlaceholder}>Enter phone number</Text>
                <TouchableOpacity 
                  style={styles.addButton} 
                  onPress={() => handleAddFamilyMember('phone')}
                >
                  <Text style={styles.addButtonText}>Add +</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 32,
    fontFamily: fonts.onestBold,
    color: colors.black,
    fontWeight:"500",
    marginBottom: 8,
  },
  wellnessScoreLabel: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginBottom: 8,
  },
  wellnessScoreBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  wellnessScoreText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  switchRolesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent:"space-between",
    borderRadius: 20,
    borderColor:"#0077FF",
    width: 222,
    gap: 8,
  },
  switchRolesText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  basicInfoContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthConditionsContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  conditionIcon: {
    marginRight: 12,
  },
  conditionText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  seeFullHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  seeFullHistoryText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  medicationContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  medicationSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 12,
  },
  adherenceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  adherenceCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adherenceText: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  adherenceLabel: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.white,
  },
  nextMedicationContainer: {
    alignItems: 'center',
  },
  nextMedicationLabel: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginBottom: 4,
  },
  nextMedicationText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  metricCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    gap: 12,
  },
  activityMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  metricValue: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  stretchButton: {
    backgroundColor: colors.lightBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  stretchButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  wellnessContent: {
    gap: 12,
  },
  wellnessMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkInButton: {
    backgroundColor: colors.lightBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  checkInButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  vitalsContent: {
    gap: 12,
  },
  vitalsMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicalReportsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    gap: 8,
  },
  medicalReportsText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  environmentalContent: {
    gap: 12,
  },
  environmentalMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  careTeamContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  careTeamMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  memberRole: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  memberActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  addFamilyContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  addFamilyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addFamilyTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFamilyInput: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray1,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
});
