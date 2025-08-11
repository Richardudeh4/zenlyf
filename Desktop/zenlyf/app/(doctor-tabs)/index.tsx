import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const DoctorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Today');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header with Profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>D</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.greeting}>Hello Doctor Ezegbogu!</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="mail" size={20} color={colors.black} />
              <View style={styles.messageBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications" size={20} color={colors.black} />
              <View style={styles.alertBadge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownButton}>
              <Text style={styles.dropdownText}>Doctor</Text>
              <Ionicons name="chevron-down" size={16} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Metric Cards */}
        <View style={styles.metricsContainer}>
          <View style={[styles.metricCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Patients Under Care</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor:"#FF7C7C"}]}>
            <Text style={styles.metricNumber}>4</Text>
            <Text style={styles.metricLabel}>Urgent Alerts Today</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor:"#FFA500" }]}>
            <Text style={styles.metricNumber}>26%</Text>
            <Text style={styles.metricLabel}>Avg. Med Adherence</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor:"#00C853"}]}>
            <Text style={styles.metricNumber}>85</Text>
            <Text style={styles.metricLabel}>Avg. Vitals Score</Text>
          </View>
        </View>

        {/* Upcoming Consultations */}
        <View style={styles.consultationsSection}>
          <Text style={styles.sectionTitle}>Upcoming Consultations</Text>
          
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'Today' && styles.activeTab]}
              onPress={() => setSelectedTab('Today')}
            >
              <Text style={[styles.tabText, selectedTab === 'Today' && styles.activeTabText]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'Tomorrow' && styles.activeTab]}
              onPress={() => setSelectedTab('Tomorrow')}
            >
              <Text style={[styles.tabText, selectedTab === 'Tomorrow' && styles.activeTabText]}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, selectedTab === 'Next 7 Days' && styles.activeTab]}
              onPress={() => setSelectedTab('Next 7 Days')}
            >
              <Text style={[styles.tabText, selectedTab === 'Next 7 Days' && styles.activeTabText]}>Next 7 Days</Text>
            </TouchableOpacity>
          </View>

          {/* Consultation List */}
          <View style={styles.consultationList}>
            <View style={styles.consultationCard}>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientInitial}>E</Text>
              </View>
              <View style={styles.consultationInfo}>
                <Text style={styles.patientName}>Ebere Madu</Text>
                <Text style={styles.patientAge}>42 years old</Text>
              </View>
              <View style={styles.appointmentTime}>
                <Text style={styles.timeText}>9:00 AM</Text>
              </View>
            </View>

            <View style={styles.consultationCard}>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientInitial}>S</Text>
              </View>
              <View style={styles.consultationInfo}>
                <Text style={styles.patientName}>Smith Joe</Text>
                <Text style={styles.patientAge}>72 years old</Text>
              </View>
              <View style={styles.appointmentTime}>
                <Text style={styles.timeText}>11:00 AM</Text>
              </View>
            </View>

            <View style={styles.consultationCard}>
              <View style={styles.patientAvatar}>
                <Text style={styles.patientInitial}>C</Text>
              </View>
              <View style={styles.consultationInfo}>
                <Text style={styles.patientName}>Catrina Beino</Text>
                <Text style={styles.patientAge}>65 years old</Text>
              </View>
              <View style={styles.appointmentTime}>
                <Text style={styles.timeText}>1:00 PM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDashboard;

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInitial: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
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
  alertBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  metricCard: {
    width: '47%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricNumber: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.white,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.white,
    textAlign: 'center',
  },
  consultationsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
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
  consultationList: {
    gap: 12,
  },
  consultationCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  patientInitial: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  consultationInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  patientAge: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  appointmentTime: {
    backgroundColor: colors.orange + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.orange,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
