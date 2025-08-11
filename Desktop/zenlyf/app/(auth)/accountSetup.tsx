import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useUser } from '../../contexts/UserContext';

type UserRole = 'myself' | 'caregiver' | 'doctor';

const AccountSetup = () => {
  const { selectedRole, setSelectedRole, setHasCompletedSetup } = useUser();
  const router = useRouter();
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    console.log('Continue pressed for role:', selectedRole);
    if (selectedRole) {
      // Set hasCompletedSetup to true since role selection is the only setup step
      setHasCompletedSetup(true);
      // Redirect to getStarted screen with the selected role as a query parameter
      router.push(`/(auth)/getstarted?role=${selectedRole}`);
    }
    // Here you would navigate to the next step based on selected role
  };

  const renderRoleButton = (role: UserRole, label: string) => (
    <TouchableOpacity
      style={[
        styles.roleButton,
        selectedRole === role && styles.roleButtonSelected
      ]}
      onPress={() => handleRoleSelect(role)}
    >
      <Text style={[
        styles.roleButtonText,
        selectedRole === role && styles.roleButtonTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderIllustration = () => {
    switch (selectedRole) {
      case 'myself':
        return (
          <View style={styles.illustrationContainer}>
           <Image source={require("../../assets/images/myself.png")} style={{width:140,height:248}}/>
          </View>
        );
      
      case 'caregiver':
        return (
          <View style={styles.illustrationContainer}>
            <Image source={require("../../assets/images/caregiver.png")} style={{width:179,height:248}}/>
          </View>
        );
      
      case 'doctor':
        return (
          <View style={styles.illustrationContainer}>
             <Image source={require("../../assets/images/doctor.png")} style={{width:169,height:248}}/>
          </View>
        );
      
      default:
        // Show a default illustration when no role is selected
        return (
          <View style={styles.illustrationContainer}>
            <Image source={require("../../assets/images/myself.png")} style={{width:140,height:248}}/>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Who are you{'\n'}
          <Text style={{}}>setting</Text>
          {' '}this up{' '}
          <Text style={{}}>for?</Text>
        </Text>
        <Text style={styles.description}>
          Zenlyf works for you or someone you love. Tell us who this profile is for so we can personalize the experience.
        </Text>
      </View>

      {/* Role Selection Buttons */}
      <View style={styles.roleSelection}>
        {renderRoleButton('myself', 'Myself')}
        {renderRoleButton('caregiver', 'Caregiver')}
        {renderRoleButton('doctor', "I'm a Doctor")}
      </View>

      {/* 3D Illustration */}
      {renderIllustration()}

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'left',
    marginBottom: 16,
    fontWeight:"700",
  },
 
  description: {
    fontSize: 18,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    textAlign: 'left',
    lineHeight: 24,
    fontWeight:"400",
  },
  roleSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  roleButton: {
    width: 100,
    height: 79,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.black,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: 'center',
  },
  roleButtonTextSelected: {
    color: colors.white,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  // Woman Illustration (Myself)
  womanIllustration: {
    position: 'relative',
    alignItems: 'center',
    width: 200,
    height: 300,
  },
  womanHead: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D4A574',
    marginBottom: 12,
    position: 'relative',
  },
  womanHair: {
    position: 'absolute',
    top: -5,
    left: 5,
    right: 5,
    height: 25,
    backgroundColor: '#2C1810',
    borderRadius: 15,
  },
  womanFace: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    backgroundColor: '#D4A574',
    borderRadius: 15,
  },
  womanBody: {
    alignItems: 'center',
  },
  womanTop: {
    width: 100,
    height: 80,
    backgroundColor: '#FFB6C1',
    borderRadius: 25,
    marginBottom: 12,
  },
  womanArms: {
    width: 120,
    height: 25,
    backgroundColor: '#D4A574',
    borderRadius: 12,
    marginBottom: 12,
  },
  womanPhone: {
    width: 40,
    height: 60,
    backgroundColor: '#4A4A4A',
    borderRadius: 8,
  },
  notificationBubble: {
    position: 'absolute',
    top: 30,
    right: -30,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Caregiver and Patient Illustration
  caregiverIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    width: 300,
    height: 250,
  },
  caregiverWoman: {
    alignItems: 'center',
  },
  caregiverWomanHead: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#D4A574',
    marginBottom: 10,
    position: 'relative',
  },
  caregiverWomanHair: {
    position: 'absolute',
    top: -3,
    left: 3,
    right: 3,
    height: 20,
    backgroundColor: '#2C1810',
    borderRadius: 12,
  },

  caregiverWomanTop: {
    width: 60,
    height: 40,
    backgroundColor: '#FFB6C1',
    borderRadius: 15,
    marginBottom: 6,
  },
  caregiverWomanArms: {
    width: 70,
    height: 15,
    backgroundColor: '#D4A574',
    borderRadius: 8,
  },
  patientMan: {
    alignItems: 'center',
  },
  patientManHead: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B4513',
    marginBottom: 10,
    position: 'relative',
  },
  patientManHair: {
    position: 'absolute',
    top: -3,
    left: 3,
    right: 3,
    height: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  patientManGlasses: {
    position: 'absolute',
    top: 20,
    left: 8,
    right: 8,
    height: 8,
    backgroundColor: '#000000',
    borderRadius: 4,
  },
  patientManFace: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    backgroundColor: '#8B4513',
    borderRadius: 15,
  },
  patientManBody: {
    alignItems: 'center',
  },
  patientManTop: {
    width: 70,
    height: 50,
    backgroundColor: '#F5DEB3',
    borderRadius: 18,
    marginBottom: 6,
  },
  patientManArms: {
    width: 80,
    height: 15,
    backgroundColor: '#8B4513',
    borderRadius: 8,
    marginBottom: 8,
  },
  patientManTablet: {
    width: 50,
    height: 40,
    backgroundColor: '#4A4A4A',
    borderRadius: 6,
  },
  // Doctor Illustration
  doctorIllustration: {
    alignItems: 'center',
    width: 200,
    height: 300,
  },
  doctorHead: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D4A574',
    marginBottom: 15,
    position: 'relative',
  },
  doctorHair: {
    position: 'absolute',
    top: -5,
    left: 5,
    right: 5,
    height: 20,
    backgroundColor: '#2C1810',
    borderRadius: 12,
  },
  doctorFace: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    backgroundColor: '#D4A574',
    borderRadius: 18,
  },
  doctorBody: {
    alignItems: 'center',
    position: 'relative',
  },
  doctorLabCoat: {
    width: 110,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginBottom: 10,
  },
  doctorShirt: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    height: 30,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
  },
  doctorTie: {
    position: 'absolute',
    top: 25,
    left: 40,
    right: 40,
    height: 20,
    backgroundColor: '#000080',
    borderRadius: 2,
  },
  doctorStethoscope: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    height: 8,
    backgroundColor: '#C0C0C0',
    borderRadius: 4,
  },
  doctorArms: {
    width: 100,
    height: 20,
    backgroundColor: '#D4A574',
    borderRadius: 10,
    marginBottom: 8,
  },
  doctorClipboard: {
    width: 60,
    height: 50,
    backgroundColor: '#4A4A4A',
    borderRadius: 6,
  },
  buttonContainer: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
});