import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  PixelRatio,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import P from "./P";
import H4 from "./H4";
import Button from "./Button";
import { SvgXml } from "react-native-svg";
import { svg } from "../Config/Svg";

const { width, height } = Dimensions.get("window");

// Responsive utilities
const isSmallDevice = width < 375;
const fontScale = PixelRatio.getFontScale();
const isLargeFontScale = fontScale > 1.2;

// Responsive sizing functions
const responsiveSize = (size: number) => {
  if (isSmallDevice) return size * 0.9;
  if (isLargeFontScale) return size * 0.85;
  return size;
};

const responsiveCalendarDaySize = () => {
  const containerPadding = isSmallDevice ? responsiveSize(4) : responsiveSize(8);
  const totalPadding = containerPadding * 2 + responsiveSize(20) * 2; // container padding + modal padding
  const availableWidth = width - totalPadding;
  const dayWidth = availableWidth / 7;

  const minSize = 32;
  const maxSize = 48;

  return Math.max(minSize, Math.min(maxSize, dayWidth));
};

interface DatePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
  selectedDate?: string;
}

export default function DatePickerModal({
  isVisible,
  onClose,
  onSelect,
  selectedDate,
}: DatePickerModalProps) {
  // Parse the selected date if it exists, otherwise use current date
  const parseDate = () => {
    if (selectedDate) {
      try {
        // First, try to parse as ISO date (YYYY-MM-DDTHH:mm:ss.sssZ)
        if (selectedDate.includes("T")) {
          const date = new Date(selectedDate);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }

        // Handle both YYYY-MM-DD and DD-MM-YYYY formats
        if (selectedDate.includes("-")) {
          // Check if it's YYYY-MM-DD format
          if (selectedDate.substring(0, 4).match(/^\d{4}$/)) {
            const [year, month, day] = selectedDate.split("-").map(Number);
            return new Date(year, month - 1, day);
          } else {
            // It's DD-MM-YYYY format
            const [day, month, year] = selectedDate.split("-").map(Number);
            return new Date(year, month - 1, day);
          }
        } else if (selectedDate.includes("/")) {
          // Handle DD/MM/YYYY format
          const [day, month, year] = selectedDate.split("/").map(Number);
          return new Date(year, month - 1, day);
        }

        // If all else fails, try direct parsing
        const directDate = new Date(selectedDate);
        if (!isNaN(directDate.getTime())) {
          return directDate;
        }
      } catch (error) {
        console.error("Error parsing date:", error, selectedDate);
      }
    }
    return new Date();
  };

  // Log the selected date for debugging
  console.log("Selected date before parsing:", selectedDate);

  const initialParsedDate = parseDate();

  // Log the parsed date for debugging
  console.log("Parsed date:", initialParsedDate);

  const [currentMonth, setCurrentMonth] = useState(
    initialParsedDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    initialParsedDate.getFullYear()
  );
  const [selectedDay, setSelectedDay] = useState(initialParsedDate.getDate());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // Track the currently selected date as a single state object
  const [selectedDate_internal, setSelectedDate_internal] = useState({
    day: selectedDay,
    month: currentMonth,
    year: currentYear,
  });

  const yearScrollRef = useRef(null);

  // Update internal selected date when month or year changes
  useEffect(() => {
    setSelectedDate_internal((prev) => ({
      ...prev,
      month: currentMonth,
      year: currentYear,
    }));
  }, [currentMonth, currentYear]);

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Day names for weekday header
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate years (100 years back from current year)
  const currentYearNow = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYearNow - i);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  // Check if a day is the selected day
  const isSelectedDay = (day: number) => {
    return (
      day === selectedDate_internal.day &&
      currentMonth === selectedDate_internal.month &&
      currentYear === selectedDate_internal.year
    );
  };

  // Handle day selection
  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setSelectedDate_internal({
      day,
      month: currentMonth,
      year: currentYear,
    });
  };

  // Handle year selection
  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowYearSelector(false);
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
    setShowMonthSelector(false);
  };

  // Toggle year selector
  const toggleYearSelector = () => {
    setShowYearSelector(!showYearSelector);
    setShowMonthSelector(false);

    // Scroll to the selected year when opening the selector
    if (!showYearSelector && yearScrollRef.current) {
      setTimeout(() => {
        yearScrollRef.current?.scrollTo({
          y:
            Math.floor(years.findIndex((year) => year === currentYear) / 4) *
            50,
          animated: true,
        });
      }, 100);
    }
  };

  // Toggle month selector
  const toggleMonthSelector = () => {
    setShowMonthSelector(!showMonthSelector);
    setShowYearSelector(false);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    // Format date as YYYY-MM-DD
    const formattedDate = `${selectedDate_internal.year}-${(
      selectedDate_internal.month + 1
    )
      .toString()
      .padStart(2, "0")}-${selectedDate_internal.day
      .toString()
      .padStart(2, "0")}`;
    onSelect(formattedDate);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <H4 style={styles.modalTitle}>Select Date</H4>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <SvgXml
                    xml={
                      svg.close ||
                      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                    }
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.calendarContainer}>
                {/* Month and Year Navigation */}
                <View style={styles.monthYearContainer}>
                  <TouchableOpacity
                    onPress={goToPreviousMonth}
                    style={styles.monthNavButton}
                  >
                    <SvgXml
                      xml={
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                      }
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>

                  <View style={styles.monthYearSelectorContainer}>
                    <TouchableOpacity
                      onPress={toggleMonthSelector}
                      style={styles.monthYearButton}
                    >
                      <P style={styles.monthYearText}>
                        {monthNames[currentMonth]}
                      </P>
                      <SvgXml
                        xml={
                          svg.arrowDown ||
                          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                        }
                        width={16}
                        height={16}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={toggleYearSelector}
                      style={styles.monthYearButton}
                    >
                      <P style={styles.monthYearText}>{currentYear}</P>
                      <SvgXml
                        xml={
                          svg.arrowDown ||
                          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                        }
                        width={16}
                        height={16}
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={goToNextMonth}
                    style={styles.monthNavButton}
                  >
                    <SvgXml
                      xml={
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                      }
                      width={24}
                      height={24}
                    />
                  </TouchableOpacity>
                </View>

                {/* Year Selector */}
                {showYearSelector && (
                  <View style={styles.yearSelectorContainer}>
                    <ScrollView
                      ref={yearScrollRef}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      style={styles.yearScrollView}
                    >
                      <View style={styles.yearGrid}>
                        {years.map((year) => (
                          <TouchableOpacity
                            key={`year-${year}`}
                            style={[
                              styles.yearItem,
                              currentYear === year && styles.selectedYearItem,
                            ]}
                            onPress={() => handleYearSelect(year)}
                          >
                            <P
                              style={[
                                styles.yearItemText,
                                currentYear === year &&
                                  styles.selectedYearItemText,
                              ]}
                            >
                              {year}
                            </P>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                  </View>
                )}

                {/* Month Selector */}
                {showMonthSelector && (
                  <View style={styles.monthSelectorContainer}>
                    <View style={styles.monthGrid}>
                      {monthNames.map((month, index) => (
                        <TouchableOpacity
                          key={`month-${index}`}
                          style={[
                            styles.monthItem,
                            currentMonth === index && styles.selectedMonthItem,
                          ]}
                          onPress={() => handleMonthSelect(index)}
                        >
                          <P
                            style={[
                              styles.monthItemText,
                              currentMonth === index &&
                                styles.selectedMonthItemText,
                            ]}
                          >
                            {month.substring(0, 3)}
                          </P>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Calendar View (only show when year/month selectors are hidden) */}
                {!showYearSelector && !showMonthSelector && (
                  <>
                    {/* Weekday Headers */}
                    <View style={styles.weekdayHeaderContainer}>
                      {dayNames.map((day, index) => (
                        <View
                          key={`weekday-${index}`}
                          style={styles.weekdayHeader}
                        >
                          <P style={styles.weekdayText}>{day}</P>
                        </View>
                      ))}
                    </View>

                    {/* Calendar Grid */}
                    <View style={styles.calendarGrid}>
                      {generateCalendarDays().map((day, index) => (
                        <TouchableOpacity
                          key={`day-${index}`}
                          style={[
                            styles.calendarDay,
                            day && isSelectedDay(day) && styles.selectedDay,
                          ]}
                          onPress={() => day && handleDaySelect(day)}
                          disabled={!day}
                        >
                          {day && (
                            <P
                              style={[
                                styles.calendarDayText,
                                isSelectedDay(day) && styles.selectedDayText,
                              ]}
                            >
                              {day}
                            </P>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  btnText="Confirm"
                  onPress={handleConfirm}
                  style={styles.confirmButton}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: responsiveSize(24),
    borderTopRightRadius: responsiveSize(24),
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(30),
    maxHeight: height * (isSmallDevice ? 0.85 : 0.8),
    minHeight: height * (isSmallDevice ? 0.45 : 0.5),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSize(16),
    paddingBottom: responsiveSize(8),
  },
  modalTitle: {
    fontFamily: fonts.onestBold,
    fontSize: responsiveSize(16),
  },
  closeButton: {
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    maxHeight: height * (isSmallDevice ? 0.55 : 0.6),
  },
  calendarContainer: {
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(4),
  },
  monthYearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  monthYearSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  monthYearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.white,
    marginHorizontal: 4,
  },
  monthNavButton: {
    padding: 8,
  },
  monthYearText: {
    fontFamily: fonts.kameronRegular,
    fontSize: responsiveSize(14),
    marginRight: responsiveSize(4),
  },
  weekdayHeaderContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayHeader: {
    width: "14.28%", // 100/7 = 14.285714...
    alignItems: "center",
    paddingVertical: 8,
  },
  weekdayText: {
    fontFamily: fonts.dmSansMedium,
    fontSize: responsiveSize(12),
    color: colors.gray1,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: isSmallDevice ? responsiveSize(4) : responsiveSize(8),
  },
  calendarDay: {
    width: "14.28%", // 100/7 = 14.285714...
    height: responsiveCalendarDaySize(),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: isSmallDevice || isLargeFontScale ? 1 : 2,
  },
  selectedDay: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  calendarDayText: {
    fontFamily: fonts.dmSansRegular,
    fontSize: responsiveSize(12),
  },
  selectedDayText: {
    color: colors.white,
    fontFamily: fonts.dmSansBold,
  },
  yearSelectorContainer: {
    height: 200,
    marginBottom: 16,
  },
  yearScrollView: {
    flex: 1,
  },
  yearGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  yearItem: {
    width: (width - responsiveSize(48)) / 4 - responsiveSize(8),
    height: responsiveSize(40),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: responsiveSize(4),
    borderRadius: responsiveSize(8),
  },
  selectedYearItem: {
    backgroundColor: colors.primary,
  },
  yearItemText: {
    fontFamily: fonts.onestBold,
    fontSize: responsiveSize(12),
  },
  selectedYearItemText: {
    fontFamily: fonts.onestLight,
    color: colors.primary,
  },
  monthSelectorContainer: {
    marginBottom: 14,
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monthItem: {
    width: (width - responsiveSize(48)) / 3 - responsiveSize(8),
    height: responsiveSize(40),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: responsiveSize(4),
    borderRadius: responsiveSize(8),
  },
  selectedMonthItem: {
    backgroundColor: colors.red,
  },
  monthItemText: {
    fontFamily: fonts.kameronRegular,
    fontSize: responsiveSize(12),
  },
  selectedMonthItemText: {
    fontFamily: fonts.kameronSemibold,
    color: colors.primary,
  },
  buttonContainer: {
    marginTop: responsiveSize(20),
    paddingHorizontal: responsiveSize(4),
  },
  confirmButton: {
    width: "100%",
    height: responsiveSize(56),
    borderRadius: responsiveSize(28),
  },
});