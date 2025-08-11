import AppHeader from '@/components/AppHeader';
import Input from '@/components/Input';
import P from '@/components/P';
import SwitchInput from '@/components/SwitchInput';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SmartAlert = () => {
    const [noMovementEnabled, setNoMovementEnabled] = useState<boolean>(true);
    const [noMovementDuration, setNoMovementDuration] = useState<string>("8 hours");
    const [heartRateEnabled, setHeartRateEnabled] = useState<boolean>(true);
    const [heartRateValue, setHeartRateValue] = useState<string>("90");
    const [medicationAlertEnabled, setMedicationAlertEnabled] = useState<boolean>(true);
    const [medicationAlertValue, setMedicationAlertValue] = useState<string>("Min");
    const [deviceOfflineEnabled, setDeviceOfflineEnabled] = useState<boolean>(true);
    const [deviceOfflineDuration, setDeviceOfflineDuration] = useState<string>("20 mins");
    const [caregiverNotificationEnabled, setCaregiverNotificationEnabled] = useState<boolean>(true);
    
    const router = useRouter();

    const handleSave = () => {
        // Handle form submission here
        console.log('Smart Alert Settings:', {
            noMovement: { enabled: noMovementEnabled, duration: noMovementDuration },
            heartRate: { enabled: heartRateEnabled, value: heartRateValue },
            medicationAlert: { enabled: medicationAlertEnabled, value: medicationAlertValue },
            deviceOffline: { enabled: deviceOfflineEnabled, duration: deviceOfflineDuration },
            caregiverNotification: caregiverNotificationEnabled
        });
        // Navigate to next screen
        // router.push('/(auth)/threeTierSetup/nextScreen');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.headerSection}>
                        <AppHeader
                            goToScreen="/(auth)/threeTierSetup/index"
                            showBackArrow
                        />
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>Smart Alert Settings</Text>
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formSection}>
                        {/* No Movement Alert */}
                        <View style={styles.alertItem}>
                            <View style={styles.alertHeader}>
                                <P style={styles.alertLabel}>No movement for</P>
                                <SwitchInput
                                    value={noMovementEnabled}
                                    onValueChange={setNoMovementEnabled}
                                />
                            </View>
                            <Input
                                value={noMovementDuration}
                                onChangeText={setNoMovementDuration}
                                placeholder="8 hours"
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                editable={noMovementEnabled}
                            />
                        </View>

                        {/* Heart Rate Alert */}
                        <View style={styles.alertItem}>
                            <View style={styles.alertHeader}>
                                <P style={styles.alertLabel}>Heart rate above/below</P>
                                <SwitchInput
                                    value={heartRateEnabled}
                                    onValueChange={setHeartRateEnabled}
                                />
                            </View>
                            <Input
                                value={heartRateValue}
                                onChangeText={setHeartRateValue}
                                placeholder="90"
                                keyboardType="numeric"
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                editable={heartRateEnabled}
                            />
                        </View>

                        {/* Missed Medication Alert */}
                        <View style={styles.alertItem}>
                            <View style={styles.alertHeader}>
                                <P style={styles.alertLabel}>Missed medication alert</P>
                                <SwitchInput
                                    value={medicationAlertEnabled}
                                    onValueChange={setMedicationAlertEnabled}
                                />
                            </View>
                            <Input
                                value={medicationAlertValue}
                                onChangeText={setMedicationAlertValue}
                                placeholder="Min"
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                editable={medicationAlertEnabled}
                            />
                        </View>

                        {/* Device Offline Alert */}
                        <View style={styles.alertItem}>
                            <View style={styles.alertHeader}>
                                <P style={styles.alertLabel}>Device offline for</P>
                                <SwitchInput
                                    value={deviceOfflineEnabled}
                                    onValueChange={setDeviceOfflineEnabled}
                                />
                            </View>
                            <Input
                                value={deviceOfflineDuration}
                                onChangeText={setDeviceOfflineDuration}
                                placeholder="20 mins"
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                                editable={deviceOfflineEnabled}
                            />
                        </View>

                        {/* Caregiver Notification */}
                        <View style={styles.alertItem}>
                            <View style={styles.alertHeader}>
                                <P style={styles.alertLabel}>Caregiver Notification</P>
                                <SwitchInput
                                    value={caregiverNotificationEnabled}
                                    onValueChange={setCaregiverNotificationEnabled}
                                />
                            </View>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SmartAlert;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    headerSection: {
        marginBottom: 32,
    },
    titleSection: {
        marginTop: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#050505',
        lineHeight: 38,
    },
    formSection: {
        gap: 24,
    },
    alertItem: {
        gap: 12,
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    alertLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#050505',
        flex: 1,
    },
    inputContainer: {
        height: 48,
        marginTop: 0,
    },
    inputStyle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#050505',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
});
