import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import Button from '../../../components/Button';
import CountrySelector from '../../../components/CountrySelector';
import Input from '../../../components/Input';
import { colors } from '../../../Config/colors';
import { fonts } from '../../../Config/Fonts';
import { countries, Country } from '../../../utils/countries';

const VerifyPhonenumber = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find((c: Country) => c.code === 'GB') || countries[0]);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendVerificationCode = async () => {
    if (!phoneNumber.trim()) {
      // Show error or validation message
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP verification screen
      router.push('/(auth)/signin/emailOtpSent');
    }, 2000);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  const isButtonDisabled = !phoneNumber.trim() || isLoading;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        text="Verify your phone number"
        showBackArrow={true}
      />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          We'll text you a 6-digit code to make sure it's really you.
        </Text>

        <View style={styles.inputContainer}>
          <Input
            type="phone"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text) => {
              // Only allow numbers
              const numericText = text.replace(/[^0-9]/g, '');
              setPhoneNumber(numericText);
            }}
            defaultCountryCode={`${selectedCountry.flag} ${selectedCountry.dialCode}`}
            onDefualtCodePress={() => setShowCountrySelector(true)}
            keyboardType="numeric"
            maxLenght={15}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            btnText="Send verification code"
            onPress={handleSendVerificationCode}
            disabled={isButtonDisabled}
            loading={isLoading}
            style={styles.button}
          />
        </View>
      </View>

      <CountrySelector
        selectedCountry={selectedCountry}
        onCountrySelect={handleCountrySelect}
        visible={showCountrySelector}
        onClose={() => setShowCountrySelector(false)}
      />
    </SafeAreaView>
  );
};

export default VerifyPhonenumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'left',
  },
  inputContainer: {
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  button: {
    height: 56,
    borderRadius: 12,
  },
});