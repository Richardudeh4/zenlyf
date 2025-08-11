import AppHeader from '@/components/AppHeader';
import Input from '@/components/Input';
import P from '@/components/P';
import RadioButton from '@/components/RadioButton';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InsuranceAndHospital = () => {
    const [hasInsurance, setHasInsurance] = useState<string>("yes");
    const [providerName, setProviderName] = useState<string>("");
    const [insuranceId, setInsuranceId] = useState<string>("");
    const [preferredHospital, setPreferredHospital] = useState<string>("");
    const [hospitalPhone, setHospitalPhone] = useState<string>("");
    
    const router = useRouter();

    const handleSave = () => {
        // Handle form submission here
        console.log('Insurance & Hospital Info:', {
            hasInsurance,
            providerName,
            insuranceId,
            preferredHospital,
            hospitalPhone
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
                            <Text style={styles.title}>Insurance & Hospital</Text>
                        </View>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formSection}>
                        {/* Insurance Question */}
                        <View style={styles.questionSection}>
                            <P style={styles.questionText}>
                                Do you have health insurance?
                            </P>
                            <View style={styles.radioGroup}>
                                <RadioButton
                                    selected={hasInsurance === "yes"}
                                    onPress={() => setHasInsurance("yes")}
                                    label="Yes"
                                    labelStyle={styles.radioLabel}
                                />
                                
                                <RadioButton
                                    selected={hasInsurance === "no"}
                                    onPress={() => setHasInsurance("no")}
                                    label="No"
                                    labelStyle={styles.radioLabel}
                                />
                            </View>
                        </View>

                        {/* Insurance Details - Show only if Yes is selected */}
                        {hasInsurance === "yes" && (
                            <>
                                {/* Provider Name */}
                                <View style={styles.inputSection}>
                                    <P style={styles.inputLabel}>Provider Name</P>
                                    <Input
                                        value={providerName}
                                        onChangeText={setProviderName}
                                        placeholder=""
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>

                                {/* Insurance ID Number */}
                                <View style={styles.inputSection}>
                                    <P style={styles.inputLabel}>Insurance ID Number</P>
                                    <Input
                                        value={insuranceId}
                                        onChangeText={setInsuranceId}
                                        placeholder=""
                                        contStyle={styles.inputContainer}
                                        inputStyle={styles.inputStyle}
                                    />
                                </View>
                            </>
                        )}

                        {/* Preferred Hospital */}
                        <View style={styles.inputSection}>
                            <P style={styles.inputLabel}>Preferred Hospital</P>
                            <Input
                                value={preferredHospital}
                                onChangeText={setPreferredHospital}
                                placeholder=""
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                            />
                        </View>

                        {/* Hospital Phone */}
                        <View style={styles.inputSection}>
                            <P style={styles.inputLabel}>Hospital Phone / Location (optional)</P>
                            <Input
                                value={hospitalPhone}
                                onChangeText={setHospitalPhone}
                                placeholder=""
                                keyboardType="phone-pad"
                                contStyle={styles.inputContainer}
                                inputStyle={styles.inputStyle}
                            />
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

export default InsuranceAndHospital;

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
    questionSection: {
        gap: 16,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#050505',
        lineHeight: 24,
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
    inputSection: {
        gap: 8,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#050505',
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
