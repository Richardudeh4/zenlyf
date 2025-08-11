import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import OtpInput from '../../../components/OtpInput';
import { colors } from '../../../Config/colors';
import { fonts } from '../../../Config/Fonts';

const EmailOtpSent = () => {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds countdown
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpComplete = (code: string) => {
    // Simulate OTP verification
    setTimeout(() => {
      // Navigate to success screen (you can replace this with your actual success screen route)
      router.push('/(auth)/signin/verifiedUser');
    }, 500);
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimeLeft(20);
      setCanResend(false);
      // Add your resend code logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        text="Enter the code we sent"
        showBackArrow={true}
      />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter the code we sent to ***956
        </Text>

        <View style={styles.otpContainer}>
          <OtpInput
            length={6}
            onComplete={handleOtpComplete}
            onCodeChange={setOtpCode}
          />
        </View>

        <View style={styles.resendContainer}>
          {canResend ? (
            <Text style={styles.resendText} onPress={handleResendCode}>
              Resend code
            </Text>
          ) : (
            <Text style={styles.timerText}>
              Resend code in {formatTime(timeLeft)}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailOtpSent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'left',
  },
  otpContainer: {
    marginBottom: 40,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
});