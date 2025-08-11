import AppHeader from '@/components/AppHeader';
import P from '@/components/P';
import RadioButton from '@/components/RadioButton';
import SelectInput from '@/components/SelectInput';
import SwitchInput from '@/components/SwitchInput';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const diagnosisTypes = [
    { value: "depression", label: "Depression" },
    { value: "anxiety", label: "Anxiety" },
    { value: "bipolar", label: "Bipolar Disorder" },
    { value: "ptsd", label: "PTSD" },
    { value: "adhd", label: "ADHD" },
    { value: "ocd", label: "OCD" },
    { value: "schizophrenia", label: "Schizophrenia" },
    { value: "eating_disorder", label: "Eating Disorder" },
    { value: "other", label: "Other" }
];

const MentalHealthInfo = () => {
    const [hasMentalHealthCondition, setHasMentalHealthCondition] = useState<string>("");
    const [diagnosisType, setDiagnosisType] = useState<string[]>([]);
    const [onMedication, setOnMedication] = useState<string>("");
    const [seeingTherapist, setSeeingTherapist] = useState<string>("");
    const [moodCheckIns, setMoodCheckIns] = useState<boolean>(false);
    
    const router = useRouter();

    const handleSaveAndContinue = () => {
        // Handle form submission here
        console.log('Mental Health Info:', {
            hasMentalHealthCondition,
            diagnosisType,
            onMedication,
            seeingTherapist,
            moodCheckIns
        });
        // Navigate to next screen
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
                            goToScreen="/(auth)/threeTierSetup"
                            showBackArrow
                        />
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>Mental Health Info</Text>
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formSection}>
                        {/* Mental Health Condition Question */}
                        <View style={styles.questionSection}>
                            <P style={styles.questionText}>
                                Have you ever been diagnosed with a mental health condition?
                            </P>
                            <View style={styles.radioGroup}>
                                <RadioButton
                                    selected={hasMentalHealthCondition === "yes"}
                                    onPress={() => setHasMentalHealthCondition("yes")}
                                    label="Yes"
                                    labelStyle={styles.radioLabel}
                                />
                                
                                <RadioButton
                                    selected={hasMentalHealthCondition === "no"}
                                    onPress={() => setHasMentalHealthCondition("no")}
                                    label="No"
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                        </View>

                        {/* Diagnosis Type - Show only if Yes is selected */}
                        {hasMentalHealthCondition === "yes" && (
                            <View style={styles.questionSection}>
                                <P style={styles.label}>Diagnosis Type</P>
                                <SelectInput
                                    placeholder="Depression"
                                    options={diagnosisTypes}
                                    multiSelect={true}
                                    selectedValues={diagnosisType}
                                    onSelect={(values) => setDiagnosisType(values)}
                                />
                            </View>
                        )}

                        {/* Medication Question */}
                        <View style={styles.questionSection}>
                            <P style={styles.questionText}>On medication?</P>
                            <View style={styles.radioGroup}>
                                <RadioButton
                                    selected={onMedication === "yes"}
                                    onPress={() => setOnMedication("yes")}
                                    label="Yes"
                                    labelStyle={styles.radioLabel}
                                />
                                
                                <RadioButton
                                    selected={onMedication === "no"}
                                    onPress={() => setOnMedication("no")}
                                    label="No"
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                        </View>

                        {/* Therapist Question */}
                        <View style={styles.questionSection}>
                            <P style={styles.questionText}>
                                Are you seeing a therapist or psychiatrist?
                            </P>
                            <View style={styles.radioGroup}>
                                <RadioButton
                                    selected={seeingTherapist === "yes"}
                                    onPress={() => setSeeingTherapist("yes")}
                                    label="Yes"
                                    labelStyle={styles.radioLabel}
                                />
                                
                                <RadioButton
                                    selected={seeingTherapist === "no"}
                                    onPress={() => setSeeingTherapist("no")}
                                    label="No"
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                        </View>

                        {/* Mood Check-ins Switch */}
                        <View style={styles.switchSection}>
                            <P style={styles.switchLabel}>Enable mood check-ins</P>
                            <SwitchInput
                                value={moodCheckIns}
                                onValueChange={setMoodCheckIns}
                            />
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

export default MentalHealthInfo;

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
        marginBottom: 40,
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
        flex: 1,
        gap: 32,
    },
    questionSection: {
        gap: 16,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#050505',
        lineHeight: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#050505',
        marginBottom: 8,
    },
    radioGroup: {
        flexDirection: 'row',
        gap: 24,
    },
    radioLabel: {
        fontSize: 18,
        fontWeight: '400',
        color: '#050505',
    },
    switchSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    switchLabel: {
        fontSize: 18,
        fontWeight: '500',
        color: '#050505',
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
