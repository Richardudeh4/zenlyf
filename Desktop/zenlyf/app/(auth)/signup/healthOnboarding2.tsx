import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import RadioButton from '@/components/RadioButton';
import Select from '@/components/Select';
import SwitchInput from '@/components/SwitchInput';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const mentalHealthDiagnoses = [
  { value: "depression", label: "Depression" },
  { value: "anxiety", label: "Anxiety" },
  { value: "bipolar", label: "Bipolar Disorder" },
  { value: "adhd", label: "ADHD" },
  { value: "ptsd", label: "PTSD" },
  { value: "ocd", label: "OCD" },
  { value: "schizophrenia", label: "Schizophrenia" },
  { value: "eating_disorder", label: "Eating Disorder" },
  { value: "autism", label: "Autism Spectrum Disorder" },
  { value: "panic_disorder", label: "Panic Disorder" },
  { value: "social_anxiety", label: "Social Anxiety" },
  { value: "other", label: "Other" }
];

interface CircularProgressProps {
  currentStep: number;
  totalSteps?: number;
  size?: number;
  strokeWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  textStyle?: any;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  currentStep,
  totalSteps = 2,
  size = 45,
  strokeWidth = 3,
  activeColor = '#007AFF',
  inactiveColor = '#E5E5E5',
  backgroundColor = 'transparent',
  textStyle,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const stepProgress = circumference / totalSteps;
  const currentProgress = stepProgress * currentStep;

  const center = size / 2;

  return (
    <View style={[styles.progressContainer, { width: size, height: size}]}>
      <Svg width={size} height={size} style={styles.svg}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={inactiveColor}
            strokeWidth={strokeWidth}
            fill={backgroundColor}
            strokeLinecap="round"
          />
          
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={activeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - currentProgress}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      
      <View style={styles.textContainer}>
        <Text style={[styles.progressText, textStyle]}>
         <Text style={{fontWeight:"900"}}>{currentStep}</Text>/{totalSteps}
        </Text>
      </View>
    </View>
  );
};

const HealthOnboardingTwo = () => {
  const [hasMentalHealthDiagnosis, setHasMentalHealthDiagnosis] = useState<string>("");
  const [diagnosisType, setDiagnosisType] = useState<string>("");
  const [onMedication, setOnMedication] = useState<string>("");
  const [seeingTherapist, setSeeingTherapist] = useState<string>("");
  const [enableMoodCheckins, setEnableMoodCheckins] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();

  const handleSaveAndContinue = () => {
    setLoading(true);
    // Add save logic here
    setTimeout(() => {
      setLoading(false);
      // Navigate to next screen
      router.push("/(auth)/signup/AccountCreated");
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerRow}>
              <AppHeader
                goToScreen="/(auth)/signup/healthOnboarding2"
                showBackArrow
              />
              <CircularProgress
                currentStep={2}
                totalSteps={2}
              />
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Mental Health Info</Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Mental Health Diagnosis Question */}
            <View style={styles.questionSection}>
              <Text style={styles.questionText}>
                Have you ever been diagnosed with a mental health condition?
              </Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  selected={hasMentalHealthDiagnosis === "yes"}
                  onPress={() => setHasMentalHealthDiagnosis("yes")}
                  label="Yes"
                  labelStyle={styles.radioLabel}
                />
                <RadioButton
                  selected={hasMentalHealthDiagnosis === "no"}
                  onPress={() => setHasMentalHealthDiagnosis("no")}
                  label="No"
                  labelStyle={styles.radioLabel}
                />
              </View>
            </View>

            {/* Diagnosis Type - Only show if "Yes" is selected */}
            {hasMentalHealthDiagnosis === "yes" && (
              <View style={styles.questionSection}>
                <Text style={styles.sectionLabel}>Diagnosis Type</Text>
                <Select
                  searchable={false}
                  value={diagnosisType}
                  onChange={(selectedValue) => setDiagnosisType(selectedValue)}
                  options={mentalHealthDiagnoses}
                  placeholder="Depression"
                  style={styles.selectInput}
                />
              </View>
            )}

            {/* On Medication Question */}
            <View style={styles.questionSection}>
              <Text style={styles.questionText}>On medication?</Text>
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
              <Text style={styles.questionText}>
                Are you seeing a therapist or psychiatrist?
              </Text>
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
            <View style={styles.questionSection}>
              <SwitchInput
                label="Enable mood check-ins"
                value={enableMoodCheckins}
                onValueChange={setEnableMoodCheckins}
                contStyle={styles.switchContainer}
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttonSection}>
            <Button
              btnText="Save & Continue"
              onPress={handleSaveAndContinue}
              loading={loading}
              style={styles.saveButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthOnboardingTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 40,
  },
  headerSection: {
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleSection: {
    gap: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#050505',
    lineHeight: 38,
  },
  formSection: {
    gap: 32,
  },
  questionSection: {
    gap: 16,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#050505',
    lineHeight: 28,
  },
  sectionLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: '#050505',
    lineHeight: 28,
  },
  radioGroup: {
    gap: 8,
  },
  radioLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: '#050505',
  },
  selectInput: {
    marginBottom: 0,
  },
  switchContainer: {
    paddingVertical: 4,
  },
  buttonSection: {
    marginTop: 20,
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
  },
  progressContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  progressText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});