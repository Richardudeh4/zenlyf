import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Config/colors';
import { fonts } from '../Config/Fonts';

interface CalendarProps {
  selectedDate?: number;
  onDateSelect?: (date: number) => void;
  events?: number[]; // Array of dates that have events
  showNavigation?: boolean;
  maxDays?: number; // For partial months like July 2025 (1-18)
  initialMonth?: string;
  initialYear?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  events = [],
  showNavigation = true,
  maxDays = 31,
  initialMonth = 'July',
  initialYear = 2025,
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: string, year: number) => {
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) return 31;
    
    const date = new Date(year, monthIndex + 1, 0);
    return Math.min(date.getDate(), maxDays);
  };

  const getFirstDayOfMonth = (month: string, year: number) => {
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) return 0;
    
    const date = new Date(year, monthIndex, 1);
    return date.getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const currentMonthIndex = monthNames.indexOf(currentMonth);
    let newMonthIndex: number;
    let newYear = currentYear;

    if (direction === 'prev') {
      if (currentMonthIndex === 0) {
        newMonthIndex = 11;
        newYear = currentYear - 1;
      } else {
        newMonthIndex = currentMonthIndex - 1;
      }
    } else {
      if (currentMonthIndex === 11) {
        newMonthIndex = 0;
        newYear = currentYear + 1;
      } else {
        newMonthIndex = currentMonthIndex + 1;
      }
    }

    setCurrentMonth(monthNames[newMonthIndex]);
    setCurrentYear(newYear);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    // Adjust for Monday start (0 = Sunday, 1 = Monday, etc.)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Add empty cells to complete the grid (6 rows * 7 columns = 42 cells)
    while (days.length < 42) {
      days.push(null);
    }

    return days;
  };

  const handleDateSelect = (date: number) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const renderCalendarDay = (day: number | null, index: number) => {
    if (day === null) {
      return <View key={`empty-${index}`} style={styles.calendarDay} />;
    }

    const isSelected = selectedDate === day;
    const hasEvent = events.includes(day);

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          isSelected && styles.selectedDay,
        ]}
        onPress={() => handleDateSelect(day)}
      >
        <Text style={[
          styles.dayText,
          isSelected && styles.selectedDayText
        ]}>
          {day}
        </Text>
        {hasEvent && <View style={styles.eventDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.calendarContainer}>
      {/* Calendar Header */}
      <View style={styles.calendarHeader}>
        <Text style={styles.calendarTitle}>{`${currentMonth} ${currentYear}`}</Text>
        {showNavigation && (
          <View style={styles.calendarNavigation}>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigateMonth('prev')}
            >
              <Ionicons name="chevron-back" size={20} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigateMonth('next')}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Days of Week */}
      <View style={styles.daysOfWeek}>
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day, index) => (
          <Text key={index} style={styles.dayOfWeek}>{day}</Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {generateCalendarDays().map((day, index) => renderCalendarDay(day, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarTitle: {
    fontSize: 20,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  calendarNavigation: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    padding: 8,
  },
  daysOfWeek: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
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
    marginVertical: 2,
    position: 'relative',
  },
  selectedDay: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  selectedDayText: {
    color: colors.white,
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
});

export default Calendar;
