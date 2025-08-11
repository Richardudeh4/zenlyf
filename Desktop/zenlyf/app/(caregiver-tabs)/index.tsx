import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const CaregiverDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning, Sarah</Text>
            <Text style={styles.subtitle}>Here's your care dashboard</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="people" size={24} color={colors.primary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Active Clients</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Tasks Completed</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Ionicons name="time" size={24} color={colors.orange} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statNumber}>6.5</Text>
              <Text style={styles.statLabel}>Hours Today</Text>
            </View>
          </View>
        </View>

        {/* Today's Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.taskList}>
            <View style={styles.taskItem}>
              <View style={styles.taskIcon}>
                <Ionicons name="medical" size={20} color={colors.primary} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Medication Reminder</Text>
                <Text style={styles.taskClient}>Mrs. Johnson - 9:00 AM</Text>
              </View>
              <TouchableOpacity style={styles.taskStatus}>
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              </TouchableOpacity>
            </View>

            <View style={styles.taskItem}>
              <View style={styles.taskIcon}>
                <Ionicons name="walk" size={20} color={colors.success} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Morning Walk</Text>
                <Text style={styles.taskClient}>Mr. Davis - 10:30 AM</Text>
              </View>
              <TouchableOpacity style={styles.taskStatus}>
                <Ionicons name="ellipse-outline" size={24} color={colors.gray1} />
              </TouchableOpacity>
            </View>

            <View style={styles.taskItem}>
              <View style={styles.taskIcon}>
                <Ionicons name="restaurant" size={20} color={colors.orange} />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>Lunch Preparation</Text>
                <Text style={styles.taskClient}>Mrs. Wilson - 12:00 PM</Text>
              </View>
              <TouchableOpacity style={styles.taskStatus}>
                <Ionicons name="ellipse-outline" size={24} color={colors.gray1} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Client Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Status</Text>
          <View style={styles.clientList}>
            <View style={styles.clientCard}>
              <View style={styles.clientAvatar}>
                <Text style={styles.clientInitial}>M</Text>
              </View>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>Mrs. Johnson</Text>
                <Text style={styles.clientStatus}>Medication taken</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
              </View>
            </View>

            <View style={styles.clientCard}>
              <View style={styles.clientAvatar}>
                <Text style={styles.clientInitial}>D</Text>
              </View>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>Mr. Davis</Text>
                <Text style={styles.clientStatus}>Ready for walk</Text>
              </View>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="add-circle" size={32} color={colors.primary} />
              </View>
              <Text style={styles.actionText}>New Task</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="calendar-outline" size={32} color={colors.success} />
              </View>
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="document-text-outline" size={32} color={colors.orange} />
              </View>
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Ionicons name="settings-outline" size={32} color={colors.gray1} />
              </View>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  notificationButton: {
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  section: {
    marginBottom: 30,
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
  seeAllText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  taskList: {
    gap: 12,
  },
  taskItem: {
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
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  taskClient: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  taskStatus: {
    padding: 4,
  },
  clientList: {
    gap: 12,
  },
  clientCard: {
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
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  clientInitial: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  clientStatus: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  statusIndicator: {
    padding: 4,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionCard: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: 'center',
  },
});
