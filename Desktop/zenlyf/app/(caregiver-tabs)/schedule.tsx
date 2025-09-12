import AppHeader from '@/components/AppHeader';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/Config/Svg';

const Schedule = () => {
  const { alertType } = useLocalSearchParams<{ alertType?: string }>();
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

  // Mock data for different alert types
  const mockScheduleData = {
    'Falls': [
      {
        id: 1,
        date: 'Tuesday, Apr 16',
        time: '2:00 PM',
        patient: 'Sophie Lewis',
        type: 'Falls',
        description: 'Fall incident reported - patient fell in bathroom',
        priority: 'High',
        status: 'Pending Review'
      },
      {
        id: 2,
        date: 'Wednesday, Apr 17',
        time: '10:30 AM',
        patient: 'John Smith',
        type: 'Falls',
        description: 'Minor fall in bedroom - no injuries reported',
        priority: 'Medium',
        status: 'Under Investigation'
      }
    ],
    'Missed Meds': [
      {
        id: 3,
        date: 'Tuesday, Apr 16',
        time: '8:00 AM',
        patient: 'Mary Johnson',
        type: 'Missed Meds',
        description: 'Morning medication not taken - blood pressure medication',
        priority: 'High',
        status: 'Follow-up Required'
      },
      {
        id: 4,
        date: 'Tuesday, Apr 16',
        time: '2:00 PM',
        patient: 'Robert Davis',
        type: 'Missed Meds',
        description: 'Afternoon medication missed - diabetes medication',
        priority: 'High',
        status: 'Contacted Patient'
      },
      {
        id: 5,
        date: 'Monday, Apr 15',
        time: '6:00 PM',
        patient: 'Sarah Wilson',
        type: 'Missed Meds',
        description: 'Evening medication not taken - heart medication',
        priority: 'Critical',
        status: 'Emergency Contact Made'
      }
    ],
    'Inactivity': [
      {
        id: 6,
        date: 'Tuesday, Apr 16',
        time: '11:00 AM',
        patient: 'Michael Brown',
        type: 'Inactivity',
        description: 'No movement detected for 4 hours - unusual pattern',
        priority: 'Medium',
        status: 'Monitoring'
      },
      {
        id: 7,
        date: 'Monday, Apr 15',
        time: '3:00 PM',
        patient: 'Emma Taylor',
        type: 'Inactivity',
        description: 'Extended inactivity period - 6 hours without movement',
        priority: 'High',
        status: 'Welfare Check Scheduled'
      }
    ],
    'Wandering': [
      {
        id: 8,
        date: 'Tuesday, Apr 16',
        time: '7:30 PM',
        patient: 'David Miller',
        type: 'Wandering',
        description: 'Patient left designated area - GPS tracking activated',
        priority: 'Critical',
        status: 'Search Initiated'
      },
      {
        id: 9,
        date: 'Sunday, Apr 14',
        time: '1:15 PM',
        patient: 'Lisa Anderson',
        type: 'Wandering',
        description: 'Wandering behavior detected - returned safely',
        priority: 'Medium',
        status: 'Resolved'
      }
    ]
  };

  // Get filtered data based on alert type
  const getFilteredData = () => {
    if (!alertType || !mockScheduleData[alertType as keyof typeof mockScheduleData]) {
      return []; // Return empty array if no alert type or invalid type
    }
    return mockScheduleData[alertType as keyof typeof mockScheduleData];
  };

  const filteredData = getFilteredData();

  // Mock data for inactivity alerts based on the image
  const inactivityAlerts = [
    {
      id: 1,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 2,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 3,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 4,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 5,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 6,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    }
  ];

  const handleAcknowledge = (alertId: number) => {
    console.log('Acknowledge alert:', alertId);
    // Handle acknowledge action
  };

  const handleContactSupport = (alertId: number) => {
    console.log('Contact support for alert:', alertId);
    // Handle contact support action
  };

  // Mock data for missed meds alerts based on the image
  const missedMedsAlerts = [
    {
      id: 1,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 2,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 3,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 4,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 5,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 6,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    }
  ];

  // Mock data for falls alerts based on the image
  const fallsAlerts = [
    {
      id: 1,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      buttonText: 'Resolved',
      acknowledged: true
    },
    {
      id: 2,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      buttonText: 'Acknowledge',
      acknowledged: true
    },
    {
      id: 3,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      buttonText: 'Acknowledge',
      acknowledged: true
    },
    {
      id: 4,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      buttonText: 'Acknowledge',
      acknowledged: true
    },
    {
      id: 5,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      buttonText: 'Acknowledge',
      acknowledged: true
    },
    {
      id: 6,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      buttonText: 'Acknowledge',
      acknowledged: true
    }
  ];

  // Mock data for wandering alerts based on the image
  const wanderingAlerts = [
    {
      id: 1,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 2,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 3,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 4,
      time: '9:20 AM',
      patientName: 'Ebere Madu',
      status: 'Pending',
      acknowledged: true
    },
    {
      id: 5,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    },
    {
      id: 6,
      time: '8:00 AM',
      patientName: 'Smith Joe',
      status: 'Resolved',
      acknowledged: true
    }
  ];

  const renderInactivityAlerts = () => {
    return (
      <View style={styles.inactivityContainer}>
        {inactivityAlerts.map((alert, index) => (
          <View key={alert.id} style={styles.inactivityAlertItem}>
            {/* Alert Icon */}
            <View style={styles.alertIconContainer}>
              <SvgXml xml={svg.inactivity}/>
            </View>

            {/* Alert Content */}
            <View style={styles.alertContentContainer}>
              {/* Time and Status Row */}
              <View style={styles.alertHeaderRow}>
                <Text style={styles.inactivityAlertTime}>{alert.time}</Text>
                <View style={[
                  styles.inactivityStatusBadge,
                  alert.status === 'Pending' ? styles.inactivityPendingBadge : styles.inactivityResolvedBadge
                ]}>
                  <Text style={[styles.inactivityStatusText, alert.status === 'Resolved' && styles.inactivityResolvedStatusText]}>{alert.status}</Text>
                </View>
              </View>

              {/* Patient Name */}
              <Text style={styles.inactivityPatientName}>{alert.patientName}</Text>

              {/* Action Buttons */}
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity 
                  style={[
                    styles.acknowledgeButton,
                    alert.acknowledged && styles.acknowledgedButton
                  ]}
                  onPress={() => handleAcknowledge(alert.id)}
                >
                
                  <Text style={[
                    styles.acknowledgeText,
                    alert.acknowledged && styles.acknowledgedText
                  ]}>
                    Acknowledge
                  </Text>
                  <SvgXml xml={svg.mark} width={14} height={14}/>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.contactSupportButton}
                  onPress={() => handleContactSupport(alert.id)}
                >
                 
                  <Text style={styles.contactSupportText}>Contact Support</Text>
                  <SvgXml xml={svg.phone} width={14} height={14}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderMissedMedsAlerts = () => {
    return (
      <View style={styles.missedMedsContainer}>
        {missedMedsAlerts.map((alert, index) => (
          <View key={alert.id} style={styles.missedMedsAlertItem}>
            {/* Blue Pill Icon */}
            <View style={styles.missedMedsIconContainer}>
             <SvgXml xml={svg.missedMed}/>
            </View>

            {/* Alert Content */}
            <View style={styles.missedMedsContentContainer}>
              {/* Time and Status Row */}
              <View style={styles.missedMedsHeaderRow}>
                <Text style={styles.missedMedsAlertTime}>{alert.time}</Text>
                <View style={[
                  styles.missedMedsStatusBadge,
                  alert.status === 'Pending' ? styles.missedMedsPendingBadge : styles.missedMedsResolvedBadge
                ]}>
                  <Text style={[styles.missedMedsStatusText, alert.status === 'Resolved' && styles.missedMedsResolvedStatusText]}>{alert.status}</Text>
                </View>
              </View>

              {/* Patient Name */}
              <Text style={styles.missedMedsPatientName}>{alert.patientName}</Text>

              {/* Action Buttons */}
              <View style={styles.missedMedsActionButtonsRow}>
                <TouchableOpacity 
                  style={[
                    styles.missedMedsAcknowledgeButton,
                    alert.acknowledged && styles.missedMedsAcknowledgedButton
                  ]}
                  onPress={() => handleAcknowledge(alert.id)}
                >
                  <Text style={[
                    styles.missedMedsAcknowledgeText,
                    alert.acknowledged && styles.missedMedsAcknowledgedText
                  ]}>
                    Acknowledge
                  </Text>
                  <SvgXml xml={svg.mark} width={14} height={14}/>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.missedMedsContactSupportButton}
                  onPress={() => handleContactSupport(alert.id)}
                >
                  <Text style={[
                    styles.missedMedsContactSupportText,
                    alert.acknowledged ? styles.missedMedsAcknowledgedText : styles.missedMedsContactSupportText
                  ]}>
                    Contact Support
                  </Text>
                  <SvgXml xml={svg.phone} width={14} height={14}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderFallsAlerts = () => {
    return (
      <View style={styles.fallsContainer}>
        {fallsAlerts.map((alert, index) => (
          <View key={alert.id} style={styles.fallsAlertItem}>
            {/* Red Warning Icon */}
            <View style={styles.fallsIconContainer}>
              <SvgXml xml={svg.falls}/>
            </View>

            {/* Alert Content */}
            <View style={styles.fallsContentContainer}>
              {/* Time and Status Row */}
              <View style={styles.fallsHeaderRow}>
                <Text style={styles.fallsAlertTime}>{alert.time}</Text>
                <View style={[
                  styles.fallsStatusBadge,
                  alert.status === 'Pending' ? styles.fallsPendingBadge : styles.fallsResolvedBadge
                ]}>
                  <Text style={[styles.fallsStatusText, alert.status === 'Resolved' &&  styles.fallsResolvedStatusText]}>{alert.status}</Text>
                </View>
              </View>

              {/* Patient Name */}
              <Text style={styles.fallsPatientName}>{alert.patientName}</Text>

              {/* Action Buttons */}
              <View style={styles.fallsActionButtonsRow}>
                <TouchableOpacity 
                  style={[
                    styles.fallsAcknowledgeButton,
                    alert.acknowledged && styles.fallsAcknowledgedButton
                  ]}
                  onPress={() => handleAcknowledge(alert.id)}
                >
                  <Text style={[
                    styles.fallsAcknowledgeText,
                    alert.acknowledged && styles.fallsAcknowledgedText
                  ]}>
                    {alert.buttonText}
                  </Text>
                  <SvgXml xml={svg.mark} width={14} height={14} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.fallsContactSupportButton}
                  onPress={() => handleContactSupport(alert.id)}
                >
                  <Text style={styles.fallsContactSupportText}>Contact Support</Text>
                  <SvgXml xml={svg.phone} width={14} height={14}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderWanderingAlerts = () => {
    return (
      <View style={styles.wanderingContainer}>
        {wanderingAlerts.map((alert, index) => (
          <View key={alert.id} style={styles.wanderingAlertItem}>
            {/* Blue Person/Arrow Icon */}
            <View style={styles.wanderingIconContainer}>
             <SvgXml xml={svg.wandering}/>
            </View>

            {/* Alert Content */}
            <View style={styles.wanderingContentContainer}>
              {/* Time and Status Row */}
              <View style={styles.wanderingHeaderRow}>
                <Text style={styles.wanderingAlertTime}>{alert.time}</Text>
                <View style={[
                  styles.wanderingStatusBadge,
                  alert.status === 'Pending' ? styles.wanderingPendingBadge : styles.wanderingResolvedBadge
                ]}>
                  <Text style={[styles.wanderingStatusText, alert.status === 'Resolved' && styles.wanderingResolvedStatusText]}>{alert.status}</Text>
                </View>
              </View>

              {/* Patient Name */}
              <Text style={styles.wanderingPatientName}>{alert.patientName}</Text>

              {/* Action Buttons */}
              <View style={styles.wanderingActionButtonsRow}>
                <TouchableOpacity 
                  style={[
                    styles.wanderingAcknowledgeButton,
                    alert.acknowledged && styles.wanderingAcknowledgedButton
                  ]}
                  onPress={() => handleAcknowledge(alert.id)}
                >
                  <Text style={[
                    styles.wanderingAcknowledgeText,
                    alert.acknowledged && styles.wanderingAcknowledgedText
                  ]}>
                    Acknowledge
                  </Text>
                  <SvgXml xml={svg.mark} width={14} height={14}/>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.wanderingContactSupportButton}
                  onPress={() => handleContactSupport(alert.id)}
                >
                  <Text style={styles.wanderingContactSupportText}>Contact Support</Text>
                 <SvgXml xml={svg.phone} width={14} height={14}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <AppHeader 
          text={alertType ? `${alertType} Alerts` : "Appointments Schedule"} 
          contStyle={{}} 
        />
        
        {alertType === 'Inactivity' && renderInactivityAlerts()}
        {alertType === 'Missed Meds' && renderMissedMedsAlerts()}
        {alertType === 'Falls' && renderFallsAlerts()}
        {alertType === 'Wandering' && renderWanderingAlerts()}
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
  fallsResolvedStatusText:{
    color: "#00C853"
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
  inactivityResolvedStatusText: {
    color:"#00C853"
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
  missedMedsResolvedStatusText: {
    color:"#00C853",
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
  // New styles for alert cards
  alertsListContainer: {
    gap: 16,
  },
  alertCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertInfo: {
    flex: 1,
  },
  alertDate: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  criticalBadge: {
    backgroundColor: '#FF3B3B',
  },
  highBadge: {
    backgroundColor: '#FFA500',
  },
  mediumBadge: {
    backgroundColor: '#FFD700',
  },
  priorityText: {
    fontSize: 10,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  priorityTextWhite: {
    color: colors.white,
  },
  alertContent: {
    marginBottom: 16,
  },
  alertDescription: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
  noAlertsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noAlertsText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    textAlign: 'center',
  },
  // Inactivity Alert Styles
  inactivityContainer: {
    paddingTop: 20,
  },
  inactivityAlertItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    alignItems: 'flex-start',
  },
  alertIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  alertIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIconText: {
    fontSize: 14,
    color: colors.black,
  },
  alertContentContainer: {
    flex: 1,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  inactivityAlertTime: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  inactivityStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inactivityPendingBadge: {
    backgroundColor: '#FFECD1',
  },
  inactivityResolvedBadge: {
    backgroundColor: '#DBFFEA',
  },
  inactivityStatusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color:"#FF9706",
  },
  inactivityPatientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  acknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  acknowledgedButton: {
    backgroundColor: "white",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    fontSize: 10,
    color: colors.white,
    fontWeight: 'bold',
  },
  acknowledgeText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: '#007AFF',
  },
  acknowledgedText: {
    color: '#007AFF',
  },
  contactSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  phoneIcon: {
    fontSize: 14,
    color: colors.white,
  },
  contactSupportText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  // Missed Meds Alert Styles
  missedMedsContainer: {
    paddingTop: 20,
  },
  missedMedsAlertItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBE3FE',
    alignItems: 'flex-start',
  },
  missedMedsIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  missedMedsIcon: {
    width: 32,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  missedMedsIconText: {
    fontSize: 12,
    color: colors.white,
  },
  missedMedsContentContainer: {
    flex: 1,
  },
  missedMedsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  missedMedsAlertTime: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  missedMedsStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  missedMedsPendingBadge: {
    backgroundColor: '#FFECD1',
  },
  missedMedsResolvedBadge: {
    backgroundColor: '#DBFFEA',
  },
  missedMedsStatusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: "#FF9706",
  },
  missedMedsPatientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  missedMedsActionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  missedMedsAcknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#0077FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  missedMedsAcknowledgedButton: {
    backgroundColor: 'white',
  },
  missedMedsAcknowledgeText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: '#007AFF',
  },
  missedMedsAcknowledgedText: {
    color: '#0077FF',
  },
  missedMedsCheckmark: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  missedMedsContactSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  missedMedsContactSupportText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  missedMedsPhoneIcon: {
    fontSize: 14,
    color: colors.white,
  },
  // Falls Alert Styles
  fallsContainer: {
    paddingTop: 20,
  },
  fallsAlertItem: {
    flexDirection: 'row',

    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBE3FE',
    alignItems: 'flex-start',
  },
  fallsIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  fallsIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF3B3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallsIconText: {
    fontSize: 14,
    color: colors.white,
  },
  fallsContentContainer: {
    flex: 1,
  },
  fallsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fallsAlertTime: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  fallsStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fallsPendingBadge: {
    backgroundColor: '#FFECD1',
  },
  fallsResolvedBadge: {
    backgroundColor: '#DBFFEA',
  },
  fallsStatusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: "#FF9706",
  },
  fallsPatientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  fallsActionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fallsAcknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  fallsAcknowledgedButton: {
    backgroundColor: '#F0F8FF',
  },
  fallsAcknowledgeText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: '#007AFF',
  },
  fallsAcknowledgedText: {
    color: '#007AFF',
  },
  fallsCheckmark: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  fallsContactSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  fallsContactSupportText: {
    fontSize: 10,
    fontFamily: fonts.onestMedium,
    color: "#E0F0FF",
  },
  fallsPhoneIcon: {
    fontSize: 14,
    color: colors.white,
  },
  // Wandering Alert Styles
  wanderingContainer: {
    paddingTop: 20,
  },
  wanderingAlertItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DBE3FE',
    alignItems: 'flex-start',
  },
  wanderingIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  wanderingIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wanderingIconText: {
    fontSize: 12,
    color: colors.white,
  },
  wanderingContentContainer: {
    flex: 1,
  },
  wanderingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  wanderingAlertTime: {
    fontSize: 14,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  wanderingStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  wanderingPendingBadge: {
    backgroundColor: '#FFECD1',
  },
  wanderingResolvedBadge: {
    backgroundColor: '#DBFFEA',
  },
  wanderingStatusText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: "#FF9706",
  },
  wanderingResolvedStatusText: {
    color: "#00C853",
  },
  wanderingPatientName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 12,
  },
  wanderingActionButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  wanderingAcknowledgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  wanderingAcknowledgedButton: {
    backgroundColor: 'white',
  },
  wanderingAcknowledgeText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: '#007AFF',
  },
  wanderingAcknowledgedText: {
    color: '#007AFF',
  },
  wanderingCheckmark: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  wanderingContactSupportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  wanderingContactSupportText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  wanderingPhoneIcon: {
    fontSize: 14,
    color: colors.white,
  },
});