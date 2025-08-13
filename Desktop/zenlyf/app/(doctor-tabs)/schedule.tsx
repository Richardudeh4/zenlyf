import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Calendar from '../../components/Calendar';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(14);
  const [miniSelectedDate, setMiniSelectedDate] = useState(16);

  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
  };

  const handleMiniDateSelect = (date: number) => {
    setMiniSelectedDate(date);
  };

  const handleReschedule = () => {
    console.log('Reschedule pressed');
    // Handle reschedule action
  };

  const handleCancel = () => {
    console.log('Cancel pressed');
    // Handle cancel action
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Calendar Section */}
        <View style={styles.calendarCard}>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            events={[13]}
            showNavigation={true}
            initialMonth="July"
            initialYear={2025}
          />
        </View>

        {/* Appointments Section */}
        <View style={styles.appointmentsCard}>
          <Text style={styles.appointmentsTitle}>Appointments / Schedule</Text>

          {/* Mini Calendar */}
          <View style={styles.miniCalendarContainer}>
            <Text style={styles.miniCalendarTitle}>April 2024</Text>
            <View style={styles.miniDaysOfWeek}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <Text key={index} style={styles.miniDayOfWeek}>{day}</Text>
              ))}
            </View>
            <View style={styles.miniCalendarGrid}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.miniCalendarDay,
                    miniSelectedDate === day && styles.miniSelectedDay,
                  ]}
                  onPress={() => handleMiniDateSelect(day)}
                >
                  <Text style={[
                    styles.miniDayText,
                    miniSelectedDate === day && styles.miniSelectedDayText
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Agenda and Patient Info */}
          <View style={styles.agendaContainer}>
            <View style={styles.agendaSection}>
              <Text style={styles.agendaTitle}>Agenda</Text>
              <Text style={styles.agendaDate}>Tuesday, Apr 16</Text>
              <Text style={styles.agendaTime}>2:00 PM</Text>
              <Text style={styles.agendaPatient}>Sophie Lewis</Text>
            </View>

            <View style={styles.patientCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }}
                style={styles.patientImage}
              />
              <Text style={styles.patientName}>Sophie Lewis</Text>
              <Text style={styles.patientInfo}>Patient info</Text>
            </View>
          </View>

          {/* Visit Notes */}
          <View style={styles.visitNotesContainer}>
            <Text style={styles.visitNotesTitle}>Visit notes</Text>
            <Text style={styles.visitNotesText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleReschedule}>
              <Text style={styles.actionButtonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  calendarCard: {
    marginBottom: 16,
  },
  appointmentsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentsTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 20,
  },
  miniCalendarContainer: {
    marginBottom: 20,
  },
  miniCalendarTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  miniDaysOfWeek: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  miniDayOfWeek: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  miniCalendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  miniCalendarDay: {
    width: '14.28%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
  miniSelectedDay: {
    backgroundColor: colors.gray1,
    borderRadius: 15,
  },
  miniDayText: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  miniSelectedDayText: {
    color: colors.white,
  },
  agendaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  agendaSection: {
    flex: 1,
  },
  agendaTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 8,
  },
  agendaDate: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 4,
  },
  agendaTime: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 4,
  },
  agendaPatient: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  patientCard: {
    alignItems: 'center',
    marginLeft: 20,
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  patientName: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 4,
  },
  patientInfo: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  visitNotesContainer: {
    marginBottom: 20,
  },
  visitNotesTitle: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 8,
  },
  visitNotesText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
});