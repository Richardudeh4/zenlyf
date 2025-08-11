import AppHeader from '@/components/AppHeader';
import Checkbox from '@/components/Checkbox';
import P from '@/components/P';
import { colors } from '@/Config/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MedicalCondition {
    id: string;
    name: string;
    selected: boolean;
}

const FamilyHistory = () => {
    const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>([
        { id: '1', name: 'Diabetes', selected: true },
        { id: '2', name: 'Hypertension', selected: true },
        { id: '3', name: 'Cancer', selected: true },
        { id: '4', name: 'Heart Disease', selected: true },
        { id: '5', name: 'Alzheimers', selected: true },
    ]);
    
    const router = useRouter();

    const handleConditionToggle = (id: string) => {
        setMedicalConditions(prev => 
            prev.map(condition => 
                condition.id === id 
                    ? { ...condition, selected: !condition.selected }
                    : condition
            )
        );
    };

    const handleAddAnother = () => {
        // Handle adding another condition
        console.log('Add Another condition');
        // This could open a modal or input field for custom conditions
    };

    const handleSaveAndContinue = () => {
        // Handle form submission here
        const selectedConditions = medicalConditions.filter(condition => condition.selected);
        console.log('Family Medical History:', selectedConditions);
        // Navigate to dashboard or next screen
        router.push('/'); // Navigate to main dashboard
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
                            <Text style={styles.title}>Family Medical History</Text>
                            <P style={styles.subtitle}>
                                List any conditions that run in your family.
                            </P>
                        </View>
                    </View>

                    {/* Medical Conditions List */}
                    <View style={styles.conditionsSection}>
                        {medicalConditions.map((condition) => (
                            <TouchableOpacity
                                key={condition.id}
                                style={styles.conditionItem}
                                onPress={() => handleConditionToggle(condition.id)}
                                activeOpacity={0.7}
                            >
                                <Checkbox
                                    checked={condition.selected}
                                    onPress={() => handleConditionToggle(condition.id)}
                                />
                                <P style={styles.conditionText}>{condition.name}</P>
                            </TouchableOpacity>
                        ))}

                        {/* Add Another Button */}
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddAnother}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.addButtonIcon}>+</Text>
                            <P style={styles.addButtonText}>Add Another</P>
                        </TouchableOpacity>
                    </View>

                    {/* Save & Continue Button */}
                    <View style={styles.bottomSection}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSaveAndContinue}
                        >
                            <Text style={styles.saveButtonText}>Save & Continue to Dashboard</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FamilyHistory;

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
    conditionsSection: {
        gap: 24,
        marginBottom: 60,
    },
    conditionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 4,
    },
    conditionText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#050505',
        flex: 1,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 4,
        marginTop: 8,
    },
    addButtonIcon: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.primary,
        width: 24,
        textAlign: 'center',
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.primary,
    },
    bottomSection: {
        marginTop: 'auto',
        paddingTop: 40,
    },
    saveButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
});
