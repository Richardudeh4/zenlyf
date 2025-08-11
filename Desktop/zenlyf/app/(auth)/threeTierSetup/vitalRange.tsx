import AppHeader from '@/components/AppHeader';
import Input from '@/components/Input';
import P from '@/components/P';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const VitalRange = () => {
    const [heartRateMin, setHeartRateMin] = useState<string>('60');
    const [heartRateMax, setHeartRateMax] = useState<string>('100');
    const [bloodPressureMin, setBloodPressureMin] = useState<string>('90');
    const [systolic, setSystolic] = useState<string>('120');
    const [diastolic, setDiastolic] = useState<string>('60');
    const [oxygenSaturationMin, setOxygenSaturationMin] = useState<string>('');
    const [oxygenSaturationMax, setOxygenSaturationMax] = useState<string>('95');
    const [bloodGlucoseMin, setBloodGlucoseMin] = useState<string>('70');
    const [bloodGlucoseMax, setBloodGlucoseMax] = useState<string>('140');
    
    const router = useRouter();

    const handleSaveAndContinue = () => {
        // Handle form submission here
        console.log('Vital Ranges:', {
            heartRate: { min: heartRateMin, max: heartRateMax },
            bloodPressure: { min: bloodPressureMin, systolic, diastolic },
            oxygenSaturation: { min: oxygenSaturationMin, max: oxygenSaturationMax },
            bloodGlucose: { min: bloodGlucoseMin, max: bloodGlucoseMax }
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
                            <Text style={styles.title}>Set Vital Ranges</Text>
                            <P style={styles.subtitle}>
                                Define safe zones for vitals like BP,{'\n'}
                                heart rate, glucose.
                            </P>
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formSection}>
                        {/* Heart Rate */}
                        <View style={styles.vitalGroup}>
                            <P style={styles.vitalLabel}>Heart Rate</P>
                            <View style={styles.rangeContainer}>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Min</P>
                                    <Input
                                        value={heartRateMin}
                                        onChangeText={setHeartRateMin}
                                        placeholder="60"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Max</P>
                                    <Input
                                        value={heartRateMax}
                                        onChangeText={setHeartRateMax}
                                        placeholder="100"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Blood Pressure */}
                        <View style={styles.vitalGroup}>
                            <P style={styles.vitalLabel}>Blood Pressure</P>
                            <View style={styles.bloodPressureContainer}>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Min</P>
                                    <Input
                                        value={bloodPressureMin}
                                        onChangeText={setBloodPressureMin}
                                        placeholder="90"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Systolic</P>
                                    <Input
                                        value={systolic}
                                        onChangeText={setSystolic}
                                        placeholder="120"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Diastolic</P>
                                    <Input
                                        value={diastolic}
                                        onChangeText={setDiastolic}
                                        placeholder="60"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Oxygen Saturation */}
                        <View style={styles.vitalGroup}>
                            <P style={styles.vitalLabel}>Oxygen Saturation</P>
                            <View style={styles.rangeContainer}>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Min</P>
                                    <Input
                                        value={oxygenSaturationMin}
                                        onChangeText={setOxygenSaturationMin}
                                        placeholder=""
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Max</P>
                                    <Input
                                        value={oxygenSaturationMax}
                                        onChangeText={setOxygenSaturationMax}
                                        placeholder="95"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Blood Glucose */}
                        <View style={styles.vitalGroup}>
                            <P style={styles.vitalLabel}>Blood Glucose (Optional)</P>
                            <View style={styles.rangeContainer}>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Min</P>
                                    <Input
                                        value={bloodGlucoseMin}
                                        onChangeText={setBloodGlucoseMin}
                                        placeholder="70"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                                <View style={styles.inputGroup}>
                                    <P style={styles.inputLabel}>Max</P>
                                    <Input
                                        value={bloodGlucoseMax}
                                        onChangeText={setBloodGlucoseMax}
                                        placeholder="140"
                                        keyboardType="numeric"
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Note */}
                        <View style={styles.noteSection}>
                            <P style={styles.noteText}>
                                <Text style={styles.noteBold}>Note:</Text> Auto-fill suggested ranges based on age if user skips
                            </P>
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveAndContinue}
                        >
                            <Text style={styles.saveButtonText}>Save & Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VitalRange;

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
        gap: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#050505',
        lineHeight: 38,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#888888',
        lineHeight: 22,
    },
    formSection: {
        gap: 32,
    },
    vitalGroup: {
        gap: 16,
    },
    vitalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#050505',
    },
    rangeContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    bloodPressureContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    inputGroup: {
        flex: 1,
        gap: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666666',
    },
    inputContainer: {
        height: 48,
        marginTop: 0,
    },
    inputStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#050505',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    noteSection: {
        marginTop: 8,
    },
    noteText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#666666',
        lineHeight: 20,
    },
    noteBold: {
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
});