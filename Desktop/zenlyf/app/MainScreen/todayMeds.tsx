import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddEventModal from '../../components/AddEventModal';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const TodayMeds = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [currentMonth, setCurrentMonth] = useState('July 2025');
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
   const router = useRouter();
  // Calendar data with event indicators
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Event indicators for different dates
  const eventIndicators = {
    5: 'blue', 6: 'blue', 7: 'blue', 9: 'yellow', 10: 'yellow',
    12: 'blue', 13: 'blue', 19: 'teal', 20: 'teal', 21: 'blue',
    22: 'teal', 23: 'teal'
  };

  // Daily events for July 14
  const dailyEvents = [
    {
      id: 1,
      icon: 'medical',
      title: 'Med reminder',
      subtitle: 'Paracetamol',
      time: '9:00 AM',
      iconColor: colors.primary
    },
    {
      id: 2,
      icon: 'fitness',
      title: 'Exercise',
      subtitle: 'Walk 30 mins',
      time: '5:00 PM',
      iconColor: '#20B2AA'
    },
    {
      id: 3,
      icon: 'arrow-up',
      title: 'Upload weight selfie',
      subtitle: 'Upload weight',
      time: '7:00 PM',
      iconColor: '#FFD700'
    }
  ];

  const getEventColor = (color: string) => {
    switch (color) {
      case 'blue': return colors.primary;
      case 'yellow': return '#FFD700';
      case 'teal': return '#20B2AA';
      default: return colors.primary;
    }
  };

  const handleAddEvent = (eventData: { title: string; dateTime: string; type: string }) => {
    console.log('New event added:', eventData);
    // Here you would typically save the event to your data store
    // For now, we'll just log it
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Meds to take today" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>{currentMonth}</Text>
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
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[
                  styles.dayNumber,
                  selectedDate === day && styles.selectedDayText
                ]}>
                  {day}
                </Text>
                {eventIndicators[day as keyof typeof eventIndicators] && (
                  <View style={[
                    styles.eventDot,
                    { backgroundColor: getEventColor(eventIndicators[day as keyof typeof eventIndicators]) }
                  ]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Daily Events Section */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>Wednesday, July 14</Text>
          <View style={styles.eventsCard}>
            {dailyEvents.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <View style={[styles.eventIcon, { backgroundColor: `${event.iconColor}20` }]}>
                  <Ionicons name={event.icon as any} size={20} color={event.iconColor} />
                </View>
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                </View>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Health Event Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.addEventButton}
          onPress={() => setIsAddEventModalVisible(true)}
        >
          <Ionicons name="add" size={24} color={colors.black} />
          <Text style={styles.addEventText}>Add Health Event</Text>
        </TouchableOpacity>
      </View>

      {/* Add Event Modal */}
      <AddEventModal
        isVisible={isAddEventModalVisible}
        onClose={() => setIsAddEventModalVisible(false)}
        onAddEvent={handleAddEvent}
      />
    </SafeAreaView>
  );
};

export default TodayMeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  calendarSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
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
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventsSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  eventsTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  eventsCard: {
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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 2,
  },
  eventSubtitle: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  eventTime: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addEventText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginLeft: 8,
  },
});