import AppHeader from '@/components/AppHeader';
import P from '@/components/P';
import SwitchInput from '@/components/SwitchInput';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SuicideRisk = () => {
    const [feltHomeless, setFeltHomeless] = useState<boolean>(true);
    const [thoughtsOfSelfHarm, setThoughtsOfSelfHarm] = useState<boolean>(true);
    const [haveSomeoneToTalkTo, setHaveSomeoneToTalkTo] = useState<boolean>(true);
    
    const router = useRouter();

    const handleSaveAndContinue = () => {
        // Handle form submission here
        console.log('Suicide Risk Assessment:', {
            feltHomeless,
            thoughtsOfSelfHarm,
            haveSomeoneToTalkTo
        });
        // Navigate to next screen
        // router.push('/(auth)/threeTierSetup/nextScreen');
    };

    const handleViewSupportResources = () => {
        // Handle support resources navigation
        console.log('View Support Resources');
        // This could open a modal or navigate to a support resources screen
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
                            <Text style={styles.title}>Suicide Risk Assessment</Text>
                        </View>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <P style={styles.infoText}>
                            This section contains sensitive questions.{'\n'}
                            Your responses stay private and help Zenlyf{'\n'}
                            trigger alerts if needed.
                        </P>
                    </View>

                    {/* Form Content */}
                    <View style={styles.formSection}>
                        {/* Question 1 */}
                        <View style={styles.questionItem}>
                            <View style={styles.questionContent}>
                                <P style={styles.questionText}>
                                    Have you felt homeless in the past 2 weeks?
                                </P>
                                <SwitchInput
                                    value={feltHomeless}
                                    onValueChange={setFeltHomeless}
                                />
                            </View>
                        </View>

                        {/* Question 2 */}
                        <View style={styles.questionItem}>
                            <View style={styles.questionContent}>
                                <P style={styles.questionText}>
                                    Have you had thoughts of self-harm recently
                                </P>
                                <SwitchInput
                                    value={thoughtsOfSelfHarm}
                                    onValueChange={setThoughtsOfSelfHarm}
                                />
                            </View>
                        </View>

                        {/* Question 3 */}
                        <View style={styles.questionItem}>
                            <View style={styles.questionContent}>
                                <P style={styles.questionText}>
                                    Do you feel you have someone to talk to?
                                </P>
                                <SwitchInput
                                    value={haveSomeoneToTalkTo}
                                    onValueChange={setHaveSomeoneToTalkTo}
                                />
                            </View>
                        </View>

                        {/* Support Resources Button */}
                        <TouchableOpacity
                            style={styles.supportButton}
                            onPress={handleViewSupportResources}
                        >
                            <Text style={styles.supportButtonText}>View Support Resources</Text>
                        </TouchableOpacity>

                        {/* Save & Continue Button */}
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

export default SuicideRisk;

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
        marginBottom: 24,
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
    infoBox: {
        backgroundColor: '#E8F4FD',
        borderRadius: 12,
        padding: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#D1E9F6',
    },
    infoText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#0066CC',
        lineHeight: 20,
        textAlign: 'left',
    },
    formSection: {
        gap: 0,
    },
    questionItem: {
        backgroundColor: 'white',
        marginBottom: 1,
    },
    questionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#050505',
        flex: 1,
        marginRight: 16,
        lineHeight: 22,
    },
    supportButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderRadius: 10,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    supportButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#050505',
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
});
